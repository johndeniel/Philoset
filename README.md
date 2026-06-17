<div align="center">

### Philoset

A curated collection of programming philosophies, engineering principles, and development practices — distributed as standalone Markdown documents.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/philoset.svg)](https://www.npmjs.com/package/philoset)
[![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen.svg)](https://nodejs.org)

</div>

---

Every project is built on a set of decisions — how code is structured, how systems are designed, how trade-offs are made. Most of those decisions never get written down. Technical documentation explains **what** a system does.
Philoset documents explain **why** a team builds software a certain way.

- Document engineering principles
- Share development practices across teams
- Establish architectural guidelines
- Capture lessons learned and best practices
- Create a consistent engineering culture

### Usage
```bash
npm i philoset

npx philoset list                      # List available documents
npx philoset add                       # Open the interactive picker
npx philoset add --all                 # Add every available document
npx philoset add backend               # Add a specific document
npx philoset add backend --force       # Overwrite existing files
npx philoset --help                    # Show available commands and options
```

### Commands

| Command | Description |
| --- | --- |
| `philoset list` | List all available philosophy documents |
| `philoset add [name]` | Add a document. Omit `name` to open the interactive picker. |
| `philoset --version` | Print the installed version |
| `philoset --help` | Show help for any command |

---

Good software is built on good decisions. Clear principles help teams make consistent trade-offs as systems grow in complexity.