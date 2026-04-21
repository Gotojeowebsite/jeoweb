# Jeoweb Operations Runbook

Short, repeatable procedures for keeping the catalog healthy. All steps use existing repo scripts; do not hand-edit generated JSON.

## Status authority (single source of truth)

Status resolution in the frontend (`app.js`, `resolveMaintenanceStatusMap` / `resolveScanStatusMap`):

1. `maintenance_status.json` — authoritative (written by `auto_fix_and_recover_games.py`).
2. `scan_results.json` — scanner fallback (written by `broken_game_scanner.py`).
3. `games_list.json` `status` field — final fallback (comes from `<!--GAME BROKEN-->` markers read by `scan.js`).

Only `broken_game_scanner.py` and `auto_fix_and_recover_games.py` are allowed to write these files. The `scripts/qa.js` and `scripts/qa-tester.js` scripts are **diagnostic-only** as of 2026-04-21 — they write `reports/qa_diagnostics.json` and never mutate `games_list.json`.

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
2. **Triage the unresolved set** by failure class:
   ```bash
   python3 triage_unresolved.py
   ```
   Reads the most recent supervisor summary + `scan_results.json`, writes `reports/triage.json` with bucket counts and a recommended strategy per game.
3. **Run the supervisor** against the fresh broken set:
   ```bash
   python3 auto_fix_and_recover_games.py \
     --scan-report broken_games.json \
     --summary-json auto_fix_recovery_summary.$(date +%Y%m%d).json \
     --providers-file recovery_sources.json
   ```
   The supervisor now honors `priority`, `disabled`, `health_probe_url`, and `applies_to` fields in `recovery_sources.json`, and fast-fails on dead hosts after 3 failed requests per run (`dead_host_cache` in the summary).
4. **Re-scan recovered games** to confirm healing:
   ```bash
   python3 broken_game_scanner.py --only $(jq -r '.recovered[]' auto_fix_recovery_summary.*.json | paste -sd' ' -) --sync-markers
   ```
5. **Regenerate catalog and commit**:
   ```bash
   node scan.js
   git add games_list.json recently_added.json scan_results.json maintenance_status.json auto_fix_recovery_summary.*.json
   git commit -m "weekly: supervisor + scan refresh"
   ```

## On demand: deep-recovery a single game

For games the supervisor can't recover via configured providers, use the deep asset scraper directly:

```bash
node scripts/deep-asset-scraper.js <source-URL> <slug>
python3 broken_game_scanner.py --only <slug>
node scan.js
```

If the source is an unblocked portal, try the Chaos Monkey pipeline:

```bash
pwsh ./chaos-batch-runner.ps1
```

## Maintenance overrides

`maintenance_overrides.json` is the manual override file. It has two lists:

- `force_healthy` — even if scanner/supervisor says broken, treat as healthy.
- `force_maintenance` — force a game into maintenance state regardless of scan result.

Edit this file, then re-run `auto_fix_and_recover_games.py` (or manually regenerate `maintenance_status.json`) to apply. Commit the override along with a short rationale in the commit message.

## Reports directory

Machine-readable reports land in `reports/`:

- `baseline_before.json` — snapshot of the catalog + supervisor state at last baseline.
- `triage.json` — latest failure-class triage.
- `qa_diagnostics.json` — (optional) diagnostic output from `scripts/qa.js` / `qa-tester.js`.

## Validation checklist before publishing

- `node scan.js` completes with expected counts (573 games at last baseline).
- `python3 broken_game_scanner.py --only <sample>` passes for a few known-healthy titles.
- `node server.js` boots and `/` serves with `GAMES_LIST` populated and no console errors.
- GitHub Pages workflow (`.github/workflows/static.yml`) runs `node scan.js` before upload, so a green CI run is the publish signal.
