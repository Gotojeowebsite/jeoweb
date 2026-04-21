# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project summary

Jeoweb is a static-first, self-hosted unblocked-games portal with a Node server for local development and a large Python/PowerShell/Node automation pipeline for importing, repairing, and archiving games. A secondary media pipeline (movies/TV via Git LFS) lives alongside it.

Deployment target: GitHub Pages (see `.github/workflows/static.yml`). The catalog is regenerated at build time by `node scan.js`; the live server (`server.js`) also regenerates on each request in development.

## Common commands

Dev server and catalog:
- `npm start` — run `server.js` on port 3000. Auto-rescans `Assets/` every 30 s and serves `/api/games`.
- `npm run game:scan` — rebuild `games_list.json` and `recently_added.json` from `Assets/` (used by CI before Pages deploy).

Game import / repair:
- `npm run flash:import` — PowerShell website-game importer (`import-flash.ps1`). Use `--batch ./flash-batch.txt` for bulk.
- `bash ./import-gba-batch.sh` / `bash ./import-snes-batch.sh` — ROM imports; drop `.gba`/`.smc` in repo root first.
- `bash ./repair-games.sh` — known per-game fixes for previously broken imports.
- `pwsh ./chaos-batch-runner.ps1` — "Chaos Monkey" deep-archival pipeline (quarantine server + Playwright bot + patch step) for games that load assets dynamically.
- `node scripts/deep-asset-scraper.js <URL> <slug>` / `node scripts/deep-batch-runner.js` — Puppeteer-based deep downloader (nested iframes, spoofed Origin/Referer, WebAssembly/Unity/Godot stream interception).
- `node scripts/qa-tester.js` / `node scripts/detect-broken-games.js` — headless QA; flips `status: "broken"` in the catalog.
- `node scripts/remediation.js` — reads broken games, spoof-fetches missing 404 assets from origin, repairs in place.
- `npm run game:add` / `npm run game:download` / `npm run grab` — single-game add/download helpers.
- `npm run covers:audit` / `npm run covers:fix` — cover-image audit and repair (`fix_game_covers.py`).
- `npm run game:import-full` — `import_game_from_url.py`, end-to-end single-URL importer.

Python scanners & supervisors (require `pip install -r requirements.txt` then `playwright install chromium`):
- `python broken_game_scanner.py [--resume] [--state-file scan_state.json] [--sync-markers]` — canonical offline-readiness scanner; writes `broken_games.{txt,json}`, `needs_review_games.txt`, `working_games.txt`, `scan_results.json`. Syncs HTML markers on each game.
- `python auto_fix_and_recover_games.py [--scan-report broken_games.json] [--summary-json summary.json] [--providers-file recovery_sources.json]` — recovery supervisor. Reads 13 prioritized providers, honors per-provider health probes, fast-fails on dead hosts (threshold 3), writes `maintenance_status.json` (the frontend's authority).
- `python triage_unresolved.py` — groups unresolved games into buckets (local_missing_asset, external_dep_blocking, emulator_core, runtime_error, unknown) with remediation scripts per bucket. Writes `reports/triage.json`.
- `python deep_scan_games.py` — strict air-gap validator (blocks all external network requests).
- `python verify_game.py` + `python auto_play.py` — components of the Chaos Monkey pipeline.
- `python test_performance.py` / `python test_ruffle.py` — low-end-PC and Flash sanity tests.

Media pipeline (see `MEDIA_WORKFLOW.md`):
- `npm run media:init` — installs Git LFS and points `core.hooksPath` at `.githooks/` (the pre-commit hook blocks >20 MB non-LFS files via `scripts/media-precommit-check.js`).
- `npm run media:ingest` / `npm run media:validate` — move inbox → library and update `media_catalog.json`.

## Architecture

### Frontend (static SPA)
- `index.html` + `app.js` (`class App`) + `styles.css`. Vanilla JS, no framework. Carousels, search, filter, favorites (`localStorage`), tab cloaker, theme/accent/layout customization.
- Separate pages for `flash.html`, `retro.html`, `logs.html`, `links.html`, `make-your-own.html`, `new.html`, `requested.html`.
- `theme-manager.js`, `pointer-lock.js`, `sw.js` (service worker), `poki-offline-shim.js` (neutralizes Poki SDK calls for offline play).
- Maintenance mode: `hideMaintenance` toggle (default on, persisted via `localStorage: jeo-hide-maintenance`) filters out games under maintenance. `statusFreshness` pill shows age of `maintenance_status.json` with color coding.
- Data source at runtime: fetches `games_list.json` and `recently_added.json` from the static host. When served by `server.js`, `index.html` is patched in-flight to inline `window.GAMES_LIST` before `</head>`. Third-party scripts (gtag, consent, analytics) are async with error swallowing to prevent blocking startup.

### Assets layout (the contract the scanner enforces)
Each game is a sibling folder under `Assets/<slug>/` containing:
- An HTML entry (`index.html` preferred; first `.html` otherwise).
- A cover image; `scan.js`/`server.js` pick by priority name (`logo`, `icon`, `splash`, `thumb`, `thumbnail`, folder name), then root-folder images, then first image anywhere.
- Optional HTML markers that the scanner reads:
  - `<!--REQUESTED GAME-->` → sets `requested: true` on the catalog entry.
  - `<!--GAME BROKEN-->` → sets `status: "broken"`.
- Type is inferred, not declared:
  - Contains any `.swf` → `type: "flash"`.
  - Else HTML contains `EJS_pathtodata = '/emulatorjs/'` → retro. The value of `EJS_core` picks `"gba"` vs `"snes"` (default `"snes"`).
  - Else `type: "webgl"`.

When you add/rename/change a game folder you must rerun `node scan.js` (or restart `server.js`) for the catalog to reflect it. CI does this automatically on push to `main`.

### Local server (`server.js`)
Plain Node `http` server. Routes:
- `/` / `/index.html` — reads `index.html`, injects `window.GAMES_LIST` before `</head>`.
- `/api/games` — JSON of a fresh rescan.
- `/logs`, `/logs.html` — dashboard.
- Everything else — static file under repo root with a broad MIME map including `.wasm`, `.unityweb`, `.swf`, `.data`, fonts, audio, video.
- Transparent handling of pre-compressed siblings: responds with `Content-Encoding: br` / `gzip` when the request path ends in `.br` / `.gz`, and derives the inner `Content-Type` from the extension before the suffix.

### Automation pipeline (big picture)
Several overlapping toolchains, all converging on `Assets/<slug>/` + `games_list.json`:
1. **Importers** — `import-flash.ps1|sh`, `import-gba[-batch].sh`, `import-snes[-batch].sh`, `import_game_from_url.py`, `scripts/add-game.js`, `scripts/grab-game.js`, `scripts/download-game.js`. Fetch source, normalize into the folder contract above.
2. **Asset recovery / "Chaos Monkey"** — `chaos-batch-runner.ps1` orchestrates `verify_game.py` (quarantine server that blocks the internet and logs 404s) + `auto_play.py` (Playwright mash-and-click bot that produces `missing_assets.txt`) + `atch-missing.ps1`/`patch-missing.ps1` (downloads the missing files back into the right subfolders). Use this for modern games that refuse to work as a flat mirror.
3. **Deep scrapers** — `scripts/deep-asset-scraper.js` and `scripts/asset-scraper.js` intercept WebAssembly/Unity/Godot stream blobs at the network protocol layer; spoof Origin/Referer; traverse nested iframes. Use these on heavily protected sources (e.g., Poki).
4. **QA/remediation loop** — `scripts/remediation.js` tries to self-heal broken games by refetching 404s from origin. `scripts/qa-tester.js` is **diagnostic-only** (writes `reports/qa_diagnostics.json`; does not mutate catalog as of 2026-04-21). Python `broken_game_scanner.py` is the canonical offline-readiness scanner, writes `scan_results.json`, and supports `--resume` via `scan_state.json`.
5. **Repair scripts** — `repair-games.sh` and `fix_game_covers.py` are idempotent, game-specific fixes safe to rerun.

The many `auto_fix_recovery_*.json(l)`, `scan_results.*.json`, `broken_games.*.{json,txt}`, and `tmp_*` files at the repo root are **pipeline artifacts/checkpoints**, not source. Treat as regenerable; don't hand-edit unless the task is to curate them.

### Emulators
- Flash → Ruffle (assets vendored under `Assets/<slug>/ruffle/` where used and loaded from each game's HTML).
- Retro → EmulatorJS vendored at `/emulatorjs/` (the path the scanner looks for via `EJS_pathtodata`).

### Media pipeline
- Inbox `Assets/media/inbox/` → library `Assets/media/library/<type>/<slug>/` via `scripts/media-ingest.js`; catalog in `media_catalog.json`.
- Naming (see `MEDIA_WORKFLOW.md`): `movie__<Title>__<Year>.<ext>`, `show__<Title>__S01E01.<ext>`.
- Git LFS is required; pre-commit hook rejects any >20 MB file that isn't an LFS pointer.

## Status authority & configuration

**Single source of truth** — frontend resolves status in this order (see `app.js` `resolveMaintenanceStatusMap`):
1. `maintenance_status.json` (written by `auto_fix_and_recover_games.py` supervisor)
2. `scan_results.json` (written by `broken_game_scanner.py`)
3. `games_list.json` `status` field (read from HTML `<!--GAME BROKEN-->` markers by `scan.js`)

Only supervisor and scanner write these files. QA scripts are diagnostic-only as of 2026-04-21.

**Provider configuration** — `recovery_sources.json` contains 13 prioritized mirrors (3kh0.github.io, wanted5games, cloudfront, htmlgames, ubg77, 1games, s3, poki-cdn, etc). Each entry:
- `priority`: numeric order (lower = earlier)
- `disabled`: bool (skip if true)
- `health_probe_url`: fast HEAD check to confirm host alive
- `applies_to`: [list of game types] (skip if game type not in list)
- `notes`: why this provider is useful

Supervisor fast-fails on dead hosts after 3 consecutive request failures per run (dead-host cache resets each run).

**Manual overrides** — `maintenance_overrides.json`:
```json
{
  "force_healthy": ["slug-a", "slug-b"],
  "force_maintenance": ["slug-c"]
}
```
Edit and re-run supervisor or manually regenerate `maintenance_status.json` to apply.

## Conventions worth knowing

- Frontend stays dependency-free (vanilla JS, CSS variables for theming). Don't add a framework.
- Backend uses Node built-ins only (`http`, `fs`, `path`); keep it that way for `server.js`.
- To mark/unmark a game without code changes, add/remove `<!--REQUESTED GAME-->` or `<!--GAME BROKEN-->` in the game's HTML and rerun `scan.js`.
- `games_list.json` and `recently_added.json` are **generated**. Edit the source (folder contents or markers) and rerun `scan.js`, not the JSON.
- `scripts-index.txt` is the authoritative rundown of every automation script and its purpose; consult it before adding a new one.
- CI (`static.yml`) runs `node scan.js` before uploading the Pages artifact, so a green deploy requires `scan.js` to succeed against the current `Assets/`.
