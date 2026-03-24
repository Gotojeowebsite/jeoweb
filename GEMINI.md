# Jeoweb - Unblocked Games & Media Portal

Jeoweb is a comprehensive, self-hosted portal for unblocked games (HTML5, WebGL, Flash, Retro) and a media pipeline for movies and TV shows. It features a modern, customizable frontend and an extensive suite of automation scripts for game scraping, importing, and long-term archival.

## Project Overview

- **Purpose:** Provide a seamless gaming and media experience, specifically designed for "unblocked" environments (e.g., schools).
- **Architecture:** 
  - **Frontend:** A SPA-style interface (`index.html`, `app.js`, `styles.css`) with game carousels, search, filtering, and a "Tab Cloaker" for privacy.
  - **Backend:** A Node.js server (`server.js`) that serves static assets and provides a dynamic game API by scanning the `Assets/` directory.
  - **Game Storage:** Games are hosted locally in the `Assets/` directory, each in its own subfolder.
  - **Automation:** Extensive use of PowerShell, Bash, and Python for importing games from various sources and repairing broken assets.

## Key Technologies

- **Backend:** Node.js (HTTP, FS, Path)
- **Frontend:** Vanilla JavaScript, CSS3 (Custom Properties), HTML5
- **Emulators:** 
  - **Flash:** [Ruffle](https://ruffle.rs/)
  - **Retro:** [EmulatorJS](https://emulatorjs.org/) (supports GBA, SNES, etc.)
- **Automation/Scraping:** 
  - PowerShell & Bash scripts
  - Python (Testing/Deep Archival)
  - Puppeteer & Playwright (Headless browsing and asset interception)
- **Media Pipeline:** Git LFS for large file management, automated ingestion via `scripts/media-ingest.js`.

## Getting Started

### Prerequisites

- **Node.js:** Version 16.0.0 or higher.
- **PowerShell (pwsh):** Recommended for full automation pipeline support.
- **Git LFS:** Required for media files.

### Commands

| Command | Description |
| :--- | :--- |
| `npm start` | Start the local Node.js server on port 3000. |
| `npm run game:scan` | Manually rebuild the `games_list.json` catalog. |
| `npm run flash:import` | Import a web/flash game using `import-flash.ps1`. |
| `bash ./repair-games.sh` | Run the repair script for known broken games. |
| `npm run media:ingest` | Process media files from the inbox to the library. |
| `pwsh ./chaos-batch-runner.ps1` | Run the deep archival/asset-scraping pipeline. |

## Development Conventions

### Game Assets Structure

Games are stored in `Assets/<game-slug>/`. The scanner (`scan.js`) expects:
- An entry point (ideally `index.html`).
- A thumbnail image (autodetected: `logo`, `icon`, `thumb`, etc.).
- Metadata markers: `<!--REQUESTED GAME-->` in HTML to mark as requested.

### Importing Games

- **Web Games:** Use `import-flash.ps1` or `import-flash.sh`. It supports single URLs or batch imports via `flash-batch.txt`.
- **Retro ROMs:** Use `import-gba-batch.sh` or `import-snes-batch.sh`. Drop `.gba` or `.smc` files into the root and run the script.
- **Deep Archival:** For modern games that load assets dynamically, use the "Chaos Monkey" pipeline (`chaos-batch-runner.ps1`) to intercept and download missing 404 assets.

### Media Pipeline

Refer to `MEDIA_WORKFLOW.md` for detailed instructions on naming conventions and ingestion.
- **Inbox:** `Assets/media/inbox/`
- **Library:** `Assets/media/library/<type>/<slug>/`
- **Catalog:** `media_catalog.json`

### Coding Style

- **Frontend:** Keep it dependency-free (Vanilla JS/CSS). Use CSS variables for theming.
- **Backend:** Use standard Node.js built-in modules where possible.
- **Scripts:** Documentation for most scripts can be found in `scripts-index.txt`.
