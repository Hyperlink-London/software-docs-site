---
sidebar_position: 15
---

# OBC Communications

This section covers the On-Board Computer (OBC) communication stack: how the OBC talks to ESPs over serial, to the Hyperlink API over WebSockets, and how the **Comms** layer orchestrates the main loop and background tasks.

## Communication Protocols

### Overview

The OBC has two main communication paths:

1. **Serial (ESP)** – The OBC connects to two ESPs over serial: one for braking and one for propulsion. Sensor and button data flows **ESP → OBC**; brake/propulsion commands flow **OBC → ESP**.
2. **WebSocket (API)** – The OBC maintains a WebSocket connection to the Hyperlink API. It forwards incoming sensor/state data and FSM output to the API, and can receive commands (e.g. abort) from the API.

All of this is coordinated by the **Comms** class in `src/comms/comms.py`.

### Comms architecture

```
                    ┌─────────────────────────────────────────────────┐
                    │                    Comms                        │
                    │  • StateMachine (FSM)                            │
                    │  • WebSocketClient                               │
                    │  • espHandler (braking, propulsion)              │
                    │  • current_data (MessageIn)                       │
                    └──────────────┬──────────────────┬────────────────┘
                                   │                  │
              Serial (pyserial)    │                  │    WebSocket (websockets)
                                   ▼                  ▼
                    ┌──────────────────┐   ┌──────────────────┐
                    │  esp-braking      │   │  Hyperlink API    │
                    │  esp-propulsion  │   │  (server)         │
                    └──────────────────┘   └──────────────────┘
```

### Serial (ESP)

- **Library**: `pyserial`
- **Layer**: `serialInterface` (`src/comms/serialInterface.py`) wraps the serial port; **espHandler** (`src/comms/espHandler.py`) wraps each ESP (braking / propulsion) and uses the interface for read/write and timeout checks.
- **Ports**: Configured via `.env` – `BRAKING_ESP_PORT` and `PROPULSION_ESP_PORT` (e.g. `/dev/ttyUSB0`, `/dev/ttyUSB1`). Baud rate, timeout, retry interval, and health-check interval come from `ESPConstants`.
- **Flow**: Each main-loop iteration, Comms reads from both ESPs concurrently, merges results into a single **MessageIn**, runs the FSM, then sends the resulting **MessageOut** to **all** ESPs. If the abort flag is set, `send_message_to_esp` does not send FSM output (the abort handler sends abort messages instead).

### WebSocket (API)

- **Library**: `websockets`
- **Class**: `WebSocketClient` (`src/comms/WebsocketClient.py`) – connects to `WEBSOCKET_IP`, send/receive with a configurable `WEBSOCKET_CLOSE_TIMEOUT`.
- **Flow**: Comms forwards every **MessageIn** (sensor/state from ESPs) to the API via `send_message(message, run_id)`, and every **MessageOut** (FSM result) via `send_output_message(fsm_return_data, run_id)`. Incoming WebSocket messages are handled in `handle_websocket_messages` (e.g. for future API-driven abort or commands); JSON parse errors are logged.

### Main loop and background tasks

**Comms.start()**:

1. Starts five background tasks: WebSocket health check, serial health check, message timeout check, abort handler, WebSocket message handler.
2. Connects to all ESPs (serial).
3. Runs the main loop: read from all ESPs → `process_messages` (merge data, send to API, run FSM, send **MessageOut** to ESPs and API) → sleep (`ASYNCIO_SLEEP`).

On shutdown, background tasks are cancelled and **cleanup** closes the WebSocket and all serial connections.

---

## Message Formats

### MessageIn (ESP → OBC, OBC → API)

**MessageIn** (`src/datamodels/message_in.py`) is the aggregated input to the FSM and what is sent to the API. It holds sensor values, button states, and metadata.

| Field | Type | Description |
|-------|------|-------------|
| `temperature_celsius_brake` | float | Brake temperature (°C) |
| `temperature_celsius_propulsion_1` | float | Propulsion 1 temperature (°C) |
| `temperature_celsius_propulsion_2` | float | Propulsion 2 temperature (°C) |
| `rpm` | float | RPM |
| `speed_m_per_s` | float | Speed (m/s) |
| `safety_checks_button_pressed` | bool | Safety checks button |
| `safety_checks_passed` | bool | Result of safety checks (or None) |
| `arm_button_pressed` | bool | Arm button |
| `abort_button_pressed` | bool | Abort button |
| `launch_button_pressed` | bool | Launch button |
| `fault_condition` | bool | Fault flag |
| `disarm_button_pressed` | bool | Disarm button |
| `distance` | int | Distance (e.g. for waypoints) |
| `primary_brakes_on` | bool | Primary brakes status |
| `secondary_brakes_on` | bool | Secondary brakes status |
| `demo` | float | Demo/test value |
| `timestamp` | float | Time when the object was created/updated |

**Merge behaviour**: ESPs send **individual sensor updates** as JSON. Each update is parsed with `add_data_from_json` and only updates the matching attribute. Comms merges multiple **MessageIn** instances with `fill_from_data`, so the FSM sees one combined snapshot per loop.

**ESP → OBC (serial) – single-sensor update**:

```json
{
  "espId": "esp-propulsion",
  "sensor": "demo",
  "value": 4.90
}
```

`sensor` must match a **MessageIn** attribute name; `value` is written to that attribute. Invalid sensor names are logged and ignored.

**OBC → API (WebSocket)**: Comms sends the full **MessageIn** dict plus `run_id` as JSON (same fields as above, plus `run_id`).

### MessageOut (OBC → ESP, OBC → API)

**MessageOut** (`src/datamodels/message_out.py`) is produced by the FSM and sent to ESPs and the API.

| Field | Type | Description |
|-------|------|-------------|
| `primary_brakes_on` | bool | Command: primary brakes engaged |
| `secondary_brakes_on` | bool | Command: secondary brakes engaged |
| `propulsion_on` | bool | Command: propulsion engaged |
| `current_state` | str | Current FSM state (for logging/API) |

**OBC → ESP (serial)** – line-based JSON, newline-terminated:

```json
{"primary_brakes_on": false, "secondary_brakes_on": false, "propulsion_on": true, "current_state": "acceleration"}
\n
```

Generated by `message_to_esp()`; sent to **all** ESPs each loop (unless abort flag is set).

**OBC → API (WebSocket)**: Same fields plus `run_id` as JSON.

---

## Error Handling

### Serial (ESP)

- **Connection failure**: `serialInterface.connect()` catches `serial.SerialException`, logs, sleeps `ESP_RETRY_INTERVAL`, and returns (no exception propagated). Comms’ **serial_health_check** task periodically checks each handler and calls `connect()` if the port is closed, so reconnection is retried in the background.
- **Read/write failure**: On `SerialException`, the interface calls `reconnect()` and then continues. Invalid or non-JSON data (e.g. not starting/ending with `{`/`}`) is logged and the read returns `None`; Comms still merges and runs the FSM with whatever data it has.
- **Null bytes**: Incoming data has `\x00` stripped before decode.
- **ESP timeout**: **message_timeout_check** compares `last_message` (timestamp of last successful read per ESP) to `ESP_TIMEOUT`. If any ESP exceeds the timeout, Comms sets **abort_flag** and keeps it set; the **abort_handler** then repeatedly sends abort **MessageOut** to all ESPs. Timeout is checked every `ASYNCIO_SLEEP`; health check interval is separate (`ESP_HEALTHCHECK_INTERVAL`).

### WebSocket (API)

- **Disconnection**: On send/receive failure or `ConnectionClosed`, `WebSocketClient` sets `is_connected = False`. The **websocket_health_check** task runs periodically (`WEBSOCKET_HEALTHCHECK_INTERVAL`); if not connected, it calls `attempt_websocket_connection()` (which uses `WEBSOCKET_RETRY_DELAY` on failure). Health check also sends a "health_check" message when connected; on exception it marks the client disconnected so the next cycle will reconnect.
- **Receive**: If not connected, receive tries to reconnect once and returns `None` on failure. Comms only processes non-null messages; JSON decode errors in `handle_websocket_messages` are logged and the message is skipped.

### Abort flag

- **Set when**: Any ESP fails the timeout check in **message_timeout_check**.
- **Effect**: `send_message_to_esp()` returns without sending when the flag is set; the **abort_handler** task sends an abort **MessageOut** to all ESPs every `ASYNCIO_SLEEP`. The flag is not cleared in the current implementation (run must be restarted to clear).

### Cleanup

On **Comms** shutdown (exception or loop exit), **cleanup** closes the WebSocket and calls `close()` on each espHandler (which closes the serial connection). Background tasks are cancelled in the `finally` block of **start()**.

---

## Best Practices

1. **Configure via .env**  
   Use `NetworkConstants`, `ESPConstants`, and `CommsConstants` for all timeouts, intervals, ports, and WebSocket URL. Avoid hardcoding so behaviour can change per environment without code changes.

2. **Keep MessageIn/MessageOut in sync with ESP/API**  
   When adding new sensors or commands, update the datamodels, the FSM (if it depends on them), and the docs. Invalid `sensor` names from ESPs are only logged; ensure ESP firmware uses the same attribute names as **MessageIn**.

3. **Run ID**  
   Every message sent to the API includes `run_id` (UUID per Comms instance). Use it to correlate logs and messages for a single run.

4. **Do not block the main loop**  
   Serial read is blocking; the main loop uses `asyncio.gather` for concurrent ESP reads and a short `ASYNCIO_SLEEP` after each iteration. Keep background tasks (health checks, abort handler, WebSocket handler) lightweight so they don’t starve the main loop.

5. **Abort semantics**  
   When the abort flag is set, the FSM is still run each loop, but its output is not sent to ESPs; the abort handler sends a single abort **MessageOut** to all ESPs. Ensure the abort **MessageOut** (e.g. brakes on, propulsion off) is appropriate for safe shutdown and document it in the API/ESP docs.

6. **Testing**  
   **MessageIn.fillout_for_testing()** fills missing attributes with defaults so the FSM can run without real ESP data. Remove or gate this in production so the OBC only acts on real sensor/button data.
