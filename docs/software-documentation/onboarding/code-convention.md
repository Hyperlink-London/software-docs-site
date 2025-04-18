# Code Quality and Naming Conventions

To maintain consistency and clarity in our codebase, we follow these naming conventions:

## Naming Conventions

- **Objects**:  
  - Use **Capital Camel Case** (also known as Pascal Case).  
  - Example: `CapitalObject`, `UserAccount`

- **Functions**:  
  - Use **Lower Camel Case** for function names.  
  - Example: `fooFunc1`, `calculateTotal`

- **Variables**:  
  - Use **Lower Camel Case** for variable names.  
  - Example: `userName`, `totalAmount`
  - **Python**: Snake case is also acceptable.  
  - Example: `user_name`, `total_amount`

- **IDs**:  
  - Use both captialised ID for names
  - Example: `userID`, `orderID`, `transactionID`

- **Curly Brackets**
  - New curly brackets should start on the same line
  - Example:
    ```java
    public static void main(String[] args) {
      System.out.println("Hello world!");
    }
    ```

## Additional Guidelines

- **Clarity**:  
  Choose descriptive names that convey the purpose of the object, function, or variable.

- **Consistency**:  
  Maintain the same naming convention throughout the codebase to improve readability and reduce confusion.

- **Avoid abbreviations**:  
  Unless they're well-known and universally accepted (e.g., `id`, `URL`), avoid abbreviating names in functions, objects, and variables.

- **Method Naming**:  
  Methods that perform an action should usually be named with a verb.  
  Example: `getUserData`, `saveToDatabase`.

- **Constants**:  
  Use **UPPERCASE_WITH_UNDERSCORES** for constant values.  
  Example: `MAX_RETRY_COUNT`, `PI`
 
- **Units**  
  When dealing with variables that contain units e.g. Seconds, included in the variable name or a comment are both acceptable

- **NO SINGLE CHARACTER VARIABLE NAMES**  
  Exception for loop counter variables

---

# Commenting Guidelines

## General Rules

- **Avoid Redundant Comments**:  
  Don't write comments that are obvious or redundant. For example:
  ```python
  int count = 5; # Declaring a variable called count with a value of 5.
  ```
- **Explain Why, not What**:
  The code should generally explain what is happening.
    ```python
  # We need to reverse the array to preserve order in the final output.
  reverseArray(arr)
  ```
- **Single-Line vs Multi-Line**
  Single line comments are for short explanations or reminders. Multi line comments
  are used for larger explanations or when describing larger blocks of code.
  ```python
    """
    This function calculates the Fibonacci sequence using dynamic programming.
    It stores previously calculated values to avoid redundant computations,
    improving performance.
    """
    def fibonacci(n): ...
  ```
  
- **Todo Comments**:
  When you know something needs to be done later, use TODO comments to mark it. Some IDEs also automatically detect 
  TODO comments before pushing.
    ```python
    # TODO: Add input validation
  ```
  
- **Comment Style**
  - Start comments with capital letters for readability
  - Avoid unnecessary comments that clutter the code. Ideally your code should be simple enough to be self-explanatory

# Commit Message Convention Guide

To ensure consistency and clarity in our commit history, we follow the **Conventional Commits** standard. Below is the list of commit types and their purposes:

| Type      | Purpose                                                             | Example                               |
|-----------|---------------------------------------------------------------------|---------------------------------------|
| `feat:`   | A new feature added to the codebase                                | `feat: add user signup form`          |
| `fix:`    | A bug fix that addresses an issue                                   | `fix: resolve navbar alignment bug`   |
| `chore:`  | Routine tasks, project setup, and non-functional updates            | `chore: install eslint`               |
| `refactor:` | Code improvements that don't add functionality                   | `refactor: clean up API calls`        |
| `docs:`   | Documentation updates (README, comments, etc.)                      | `docs: update project setup guide`    |
| `style:`  | Changes related to code formatting (Prettier, etc.)                 | `style: apply prettier formatting`    |

---

## Additional Notes

- **`chore:`**  
  Used for updates or maintenance tasks that don't affect the app’s functionality (e.g., installing dependencies, updating config files, or folder structure changes).

- **`feat:`** and **`fix:`**  
  Should be used when adding new features or fixing bugs that impact the functionality of the app.

- **`refactor:`**  
  Reserved for changes to the codebase that do **not** affect functionality but improve structure or readability.

- **`docs:`**  
  Applies only to changes in documentation files (e.g., updating the README).

- **`style:`**  
  For changes that don't affect the logic of the code, such as formatting or minor code style tweaks.
