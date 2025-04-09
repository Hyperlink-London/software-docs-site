# Hyperlink London Software Documentation

This repository contains the software documentation for Hyperlink London, built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Overview

This documentation site serves as the central hub for all software-related documentation for Hyperlink London. It includes:

- Software system architecture and components
- API documentation
- Development guidelines
- Tutorials and examples



## Getting Started

### Prerequisites

- Node.js (version 18.0 or above)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hyperlink-London/software-docs-site.git
cd software-docs-site
```

2. Install dependencies:
```bash
npm install
```

### Local Development

Start the development server:
```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Building for Production

Generate static content for production:
```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

### Deployment

The site is automatically deployed to Cloudflare Workers using GitHub Actions. The deployment URL is:
https://hyperlink-software-docs.barnish-harry-c30.workers.dev

## Project Structure

```
software-docs-site/
├── docs/                    # Documentation files
│   ├── software-documentation/  # Software-specific documentation
│   └── docusaurus-tutorial/     # Docusaurus tutorial documentation
├── src/                     # Source files
│   ├── components/          # React components
│   ├── css/                 # Custom CSS
│   └── pages/               # Additional pages
├── static/                  # Static assets
└── docusaurus.config.ts     # Docusaurus configuration
```

## Documentation Structure

### Markdown Files
All documentation is written in Markdown (`.md`) files located in the `docs` directory. The structure is as follows:

```
docs/
├── software-documentation/
│   ├── _category_.json
│   ├── onboarding/
│   │   ├── _category_.json
│   │   └── system-overview.md
│   └── api/
│       ├── _category_.json
│       └── endpoints.md
└── docusaurus-tutorial/
    └── ...
```

### _category_.json Files
The `_category_.json` files are used to define category metadata and control the sidebar structure. They contain:

```json
{
  "label": "Category Name",
  "position": 1,
  "link": {
    "type": "generated-index",
    "description": "Category description"
  }
}
```

- `label`: The name shown in the sidebar
- `position`: The order in which categories appear
- `link`: Optional configuration for category index pages

### Frontmatter
Each Markdown file starts with frontmatter (between `---` lines) that defines metadata:

```markdown
---
title: Page Title
sidebar_position: 1
---
```

- `title`: The page title
- `sidebar_position`: The order in the sidebar
- Other metadata can be added as needed


## Contributing

1. Create a new branch for your changes
2. Make your changes and commit them
3. Push your changes to the repository
4. Create a pull request