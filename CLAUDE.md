Jeoweb — developer reference  
Jeoweb is a static-first, self-hosted unblocked-games portal with a Node server for local development and a large Python/PowerShell/Node automation pipeline for importing, repairing, and archiving games.
Deployment target: GitHub Pages (see .github/workflows/static.yml).

Purpose
Jeoweb provides a reproducible, offline-friendly catalog of browser and retro games with tooling for importing, repairing, and archiving. This document explains the repo layout, common commands, automation pipeline, and contribution conventions so new contributors can get productive quickly.

Quick links
Live site: https://jeoweb.app/

Repository: https://github.com/Gotojeowebsite/jeoweb

CI: .github/workflows/static.yml (runs node scan.js before Pages deploy)

At-a-glance commands
Dev server and catalog

npm start — run server.js on port 3000; auto-rescans Assets/ every 30s and serves /api/games.

npm run game:scan — regenerate games_list.json and recently_added.json (CI runs this before Pages deploy).

Import / repair / QA

npm run flash:import — PowerShell flash importer (import-flash.ps1); use --batch ./flash-batch.txt for bulk.

bash ./import-gba-batch.sh / bash ./import-snes-batch.sh — ROM imports (drop .gba/.smc in repo root first).

pwsh ./chaos-batch-runner.ps1 — Chaos Monkey archival pipeline (quarantine server + Playwright + patch).

node scripts/deep-asset-scraper.js <URL> <slug> — Puppeteer-based deep downloader.

node scripts/qa-tester.js / node scripts/detect-broken-games.js — headless QA.

python broken_game_scanner.py — canonical offline-readiness scanner (requires pip install -r requirements.txt and playwright install chromium).

Media

npm run media:init — install Git LFS and set up pre-commit hooks.

npm run media:ingest / npm run media:validate — move inbox → library and update media_catalog.json.

Architecture (high level)
Frontend
Vanilla JS SPA: index.html, app.js (class App), styles.css. No framework. Features: carousels, search, filters, favorites (localStorage), theme/accent/layout customization, tab cloaker, service worker (sw.js), and poki-offline-shim.js to neutralize Poki SDK calls.

Local server
server.js — plain Node http server. Routes:

/ / /index.html — inlines window.GAMES_LIST for dev.

/api/games — JSON of a fresh rescan.

static assets — broad MIME map including .wasm, .unityweb, .swf, .data.

Pre-compressed siblings: responds with Content-Encoding: br / gzip when .br / .gz are requested.

Assets contract
Each game is a sibling folder under Assets/<slug>/ containing:

An HTML entry (index.html preferred).

A cover image (scanner picks by priority: logo, icon, splash, thumb, thumbnail, folder name).

Optional HTML markers:

<!--REQUESTED GAME--> → sets requested: true.

<!--GAME BROKEN--> → sets status: "broken".

Type inference:

Any .swf → type: "flash".

HTML containing EJS_pathtodata = '/emulatorjs/' → retro; EJS_core picks gba vs snes.

Otherwise type: "webgl".

When you add/rename/change a game folder, rerun node scan.js (or restart server.js) for the catalog to reflect it. CI runs scan.js automatically on push to main.

Automation pipeline (concise)
Importers — normalize sources into Assets/<slug>/ (import-flash.ps1, import_game_from_url.py, scripts/grab-game.js, etc.).

Recovery / Chaos Monkey — verify_game.py (quarantine + 404 logging) + auto_play.py (Playwright bot) → missing_assets.txt; patch scripts rehydrate assets.

Deep scrapers — deep-asset-scraper.js intercepts WebAssembly/Unity/Godot streams and spoofs headers for protected sources.

QA / remediation — broken_game_scanner.py (canonical scanner) → scan_results.json; auto_fix_and_recover_games.py (supervisor) writes maintenance_status.json; scripts/remediation.js attempts self-heal.

Repair scripts — repair-games.sh, fix_game_covers.py are idempotent, safe to rerun.

Pipeline artifacts (scan_results.*, broken_games.*, auto_fix_recovery_*) are regenerable checkpoints — do not hand-edit unless curating.

Status authority & provider config
Status resolution order (frontend):

maintenance_status.json (supervisor)

scan_results.json (scanner)

games_list.json status field (HTML markers)

recovery_sources.json lists prioritized mirrors with priority, disabled, health_probe_url, and applies_to. Supervisor fast-fails on dead hosts after 3 consecutive failures per run.

Manual overrides: maintenance_overrides.json:

json
{
  "force_healthy": ["slug-a"],
  "force_maintenance": ["slug-b"]
}
Conventions and rules
No frontend frameworks. Keep the frontend dependency-free.

Backend: server.js should use Node built-ins only.

Mark/unmark games by adding/removing HTML markers and rerunning node scan.js.

Media files: use Git LFS; pre-commit hook rejects >20 MB non-LFS files. See MEDIA_WORKFLOW.md.

CI: ensure node scan.js succeeds locally before pushing for a green Pages deploy.

Quickstart: add a game
Create Assets/<slug>/ folder.

Add index.html (or first .html) and a cover image named logo|icon|splash|thumb|thumbnail if possible.

Add <!--REQUESTED GAME--> or <!--GAME BROKEN--> markers if relevant.

Run npm run game:scan and verify the entry appears in games_list.json.

Commit the new folder and push.

Troubleshooting (common fixes)
Game shows broken in UI: run python broken_game_scanner.py to generate scan_results.json, then inspect reports/triage.json.

Missing assets / 404s: run pwsh ./chaos-batch-runner.ps1 for deep recovery or node scripts/deep-asset-scraper.js for protected sources.

Ruffle issues (Flash): ensure Assets/<slug>/ruffle/ is present and the game HTML loads the vendored Ruffle build.

Large media blocked by pre-commit: add files to Git LFS and run npm run media:init.

CONTRIBUTING (short outline)
Code style: keep frontend vanilla; prefer Node built-ins for server.js.

Pipeline artifacts: do not hand-edit scan_results.*, broken_games.*, or auto_fix_recovery_* unless curating.

New scripts: add to scripts-index.txt with purpose and idempotency notes.

Onboarding: add a short diagram (architecture + pipeline) and a CONTRIBUTING.md that documents:

How to run the scanner and supervisor locally.

How to run Chaos Monkey safely (quarantine server instructions).

Provider health-probe behavior and how to add a provider.

Suggested commit message
Code
docs: improve CLAUDE.md — concise project overview, quickstart, troubleshooting, contributing
I included two lines pulled from the repository guidance to preserve the original project summary and deployment target:
"Jeoweb is a static-first, self-hosted unblocked-games portal with a Node server for local development and a large Python/PowerShell/Node automation pipeline for importing, repairing, and archiving games."  
"Deployment target: GitHub Pages (see .github/workflows/static.yml)."
