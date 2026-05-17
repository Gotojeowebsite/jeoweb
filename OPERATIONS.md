# Jeoweb Operations Runbook

Short, repeatable procedures for keeping the catalog healthy. All steps use existing repo scripts; do not hand-edit generated JSON.

## Status authority (single source of truth)

Status resolution in the frontend (`app.js`, `resolveMaintenanceStatusMap` / `resolveScanStatusMap`):

1. `game_health.json` — canonical merged verdict (schema 2, written by `scripts/build-game-health.js`).
2. `scan_results.json` — scanner fallback (written by `broken_game_scanner.py`).
3. `games_list.json` `status` field — final fallback (comes from `<!--GAME BROKEN-->` markers read by `scan.js`).

Only `broken_game_scanner.py`, `scripts/build-game-health.js`, and `scripts/static-health-scan.js` are allowed to write these files. `scripts/qa.js` and `scripts/qa-tester.js` are **diagnostic-only** — they write `reports/qa_diagnostics.json` and never mutate `games_list.json`.

## Daily (≈5 min)

1. **Regenerate the catalog** from `Assets/`:
   ```bash
   node scan.js
   ```
   This updates `games_list.json` and `recently_added.json` and picks up any `<!--REQUESTED GAME-->` / `<!--GAME BROKEN-->` marker edits.
2. **Spot-scan** newly added or recently touched games:
   ```bash
   python3 broken_game_scanner.py --only <slug-a> <slug-b> ... --sync-markers
   ```
3. **Commit** the generated deltas if anything changed:
   ```bash
   git add games_list.json recently_added.json scan_results.json
   git commit -m "catalog: daily refresh"
   ```

## Weekly (≈30–60 min)

1. **Full offline scan** (regenerates `scan_results.json`, `broken_games.json`):
   ```bash
   python3 broken_game_scanner.py --resume --state-file scan_state.json --sync-markers
   ```
   Use `--resume` so partial runs pick up from the last checkpoint.
2. **Rebuild the canonical health verdict**:
   ```bash
   npm run health:refresh
   ```
   Runs `scan.js` → `scripts/static-health-scan.js` → `scripts/build-game-health.js` and writes the merged `game_health.json`.
3. **Run recovery** against the fresh broken set:
   ```bash
   npm run recover:all
   ```
   The canonical recovery engine (`scripts/recover-all-broken.js`) reads `game_health.json`, filters by cooldown, searches DDG/Bing/Brave/GitHub/Wayback for working copies, atomically swaps validated candidates in, and writes `reports/recovery_summary_<date>.json`.
4. **Re-scan recovered games** to confirm healing:
   ```bash
   python3 broken_game_scanner.py --only $(jq -r '.recovered[]' reports/recovery_summary_*.json | paste -sd' ' -) --sync-markers
   ```
5. **Regenerate catalog and commit**:
   ```bash
   node scan.js
   git add games_list.json recently_added.json scan_results.json game_health.json reports/recovery_summary_*.json
   git commit -m "weekly: recovery + scan refresh"
   ```

## On demand: deep-recovery a single game

For games the engine can't recover via search, pass a known-good URL directly:

```bash
npm run recover -- <slug> --url <portal-url>
python3 broken_game_scanner.py --only <slug>
node scan.js
```

For finer manual control, use the asset scraper directly:

```bash
node scripts/deep-asset-scraper.js <source-URL> <slug>
python3 broken_game_scanner.py --only <slug>
node scan.js
```

## Maintenance overrides

`maintenance_overrides.json` is the manual override file. It has two lists:

- `force_healthy` — even if scanner says broken, treat as healthy.
- `force_maintenance` — force a game into maintenance state regardless of scan result.

Edit this file, then re-run `npm run health:refresh` to apply. Commit the override along with a short rationale in the commit message.

## Reports directory

Machine-readable reports land in `reports/`:

- `recovery_log.jsonl` — append-only log of every recovery attempt.
- `recovery_cooldown.json` — per-slug backoff state.
- `recovery_summary_<date>.json` — per-run recovery summaries.
- `qa_diagnostics.json` — (optional) diagnostic output from `scripts/qa.js` / `qa-tester.js`.

## Validation checklist before publishing

- `node scan.js` completes with expected counts (~596 games).
- `python3 broken_game_scanner.py --only <sample>` passes for a few known-healthy titles.
- `node server.js` boots and `/` serves with `GAMES_LIST` populated and no console errors.
- GitHub Pages workflow (`.github/workflows/static.yml`) runs `node scan.js` before upload, so a green CI run is the publish signal.
