# Offline Game Repair Workflow

This document explains how to identify and fix games that don't work offline (missing local assets or external dependencies).

## Components Overview

### 1. Offline Audit Script (`scripts/audit-offline-readiness.js`)
**Purpose:** Detects games with offline-readiness issues (missing assets, external dependencies)

**Checks:**
- Missing critical local assets referenced in game HTML  
- External runtime links (fetch, script, iframe) that will fail when blocked
- Integrates dynamic scan reports (`scan_results*.json`) to merge known runtime failures

**Outputs:**
- `offline_broken_games.txt` → Plain text list, one game name per line  
- `offline_broken_games.json` → JSON format for frontend filtering  
- `offline_broken_games_details.json` → Per-game issue breakdown

**Usage:**
```bash
npm run game:offline:audit
```

### 2. Homepage Filtering
**Updated in:** `app.js`  
**Behavior:** Loads `offline_broken_games.json` at startup and automatically hides games from the homepage that aren't offline-ready.

**Related code:**
- `resolveOfflineBlockedSet()` → Fetches offline blocklist
- `normalizeGameName()` → Case-insensitive name matching
- Hidden games excluded from carousels and search results

**Override:** Games can still be found by direct URL; users aren't prevented from trying them.

### 3. Offline Fixer Script (`scripts/fix-offline-games.js`)
**Purpose:** Orchestrates automatic repair of offline-broken games using the supervisor pipeline

**Flow:**
1. Pre-audit: Refreshes `offline_broken_games.txt` (unless `--skip-pre-audit`)
2. Loads details and builds a scan report from the blocklist
3. Runs `auto_fix_and_recover_games.py` supervisor with strict offline validation
4. Post-audit: Regenerates blocklist to measure impact
5. Writes `offline_fixed_games.txt` and `offline_unresolved_games.txt`

**Repair Strategies Applied (in order):**
1. Strip nonessential external refs (trackers, ads)
2. Mirror critical external assets locally
3. Mirror external refs from text files (JS/CSS/HTML)
4. Create optional global stubs (for ads/probes)
5. Fill missing local files from issue URLs
6. Refill missing generated mirror files
7. Download missing GamePush bundle assets
8. Create placeholders for optional assets (audio/save/config)
9. Repair emulatorjs core files
10. Recovery: Try snapshots from configured backup providers

**Outputs:**
- `offline_fixed_games.txt` → Games successfully fixed (local + recovered)
- `offline_unresolved_games.txt` → Games that still need manual intervention
- `offline_fix_summary.json` → Detailed outcome per game
- `offline_fix_log.jsonl` → Step-by-step action log

**Usage:**
```bash
# Quick run: fix up to 50 games
npm run game:offline:fix -- --max-games 50

# Full run with supervision feedback
npm run game:offline:fix

# Dry run (no changes)
npm run game:offline:fix -- --dry-run

# Disable strict offline validation (allow external calls that load)
npm run game:offline:fix -- --no-strict-external-test

# Custom settings
npm run game:offline:fix -- \
  --max-games 30 \
  --test-wait-seconds 8 \
  --hard-timeout-seconds 90
```

**Command-line Options:**
```
--max-games <n>                 Limit games to process
--dry-run                       Log planned actions without changing files
--force-lock                    Override supervisor lock if stale
--skip-pre-audit                Don't regenerate blocklist before fix
--skip-post-audit               Don't regenerate blocklist after fix
--no-strict-external-test       Disable strict-external validation in supervisor
--test-wait-seconds <seconds>   Scanner bootstrap wait (default: 5)
--test-timeout-ms <ms>          Scanner timeout (default: 20000)
--hard-timeout-seconds <sec>    Hard timeout per game (default: 60)
--validation-timeout-seconds <s> Subprocess timeout (default: 240)
--report <file>                 Scan report output (default: offline_fix_targets.scan_report.json)
--summary <file>                Summary output (default: offline_fix_summary.json)
--log <file>                    Execution log (default: offline_fix_log.jsonl)
--fixed-list <file>             Fixed games txt (default: offline_fixed_games.txt)
--unresolved-list <file>        Unresolved games txt (default: offline_unresolved_games.txt)
--help                          Show help
```

## Common Workflows

### Identify all offline-broken games
```bash
npm run game:offline:audit
cat offline_broken_games.txt
```

### Fix a small batch to test the pipeline
```bash
npm run game:offline:fix -- --max-games 10 --dry-run
# Review the output, then run for real:
npm run game:offline:fix -- --max-games 10
```

### Fix all remaining games
```bash
npm run game:offline:fix
# Monitor progress in offline_fix_log.jsonl and offline_fix_summary.json
```

### Check which games were fixed
```bash
cat offline_fixed_games.txt
# and which still need manual work:
cat offline_unresolved_games.txt
```

### Refresh the homepage blocklist after fixes
```bash
npm run game:offline:audit
# The homepage will auto-refresh when the next user loads it
```

### Re-run the full detection + fix pipeline from scratch
```bash
npm run game:offline:refresh
npm run game:offline:fix
```

## Integration with Existing Tools

**Scanner Scripts:**
- `broken_game_scanner.py` – Validates each game during fix attempts
- All `scan_results*.json` reports are merged into the offline audit

**Recovery:**
- Uses existing `auto_fix_and_recover_games.py` supervisor
- Applies configured recovery providers from `recovery_sources.json`
- Creates `maintenance_status.json` for the homepage

**HTML Markers:**
- Can sync `<!--GAME BROKEN-->` markers via scanner with `--sync-markers`
- Audit script respects these markers as part of classification

## Output Files Reference

| File | Purpose | Format |
|------|---------|--------|
| `offline_broken_games.txt` | All offline-unready games | Plain text |
| `offline_broken_games.json` | Game names for frontend | JSON array |
| `offline_broken_games_details.json` | Issue breakdown | JSON objects with issues array |
| `offline_fixed_games.txt` | Successfully fixed | Plain text |
| `offline_unresolved_games.txt` | Manual fix needed | Plain text |
| `offline_fix_summary.json` | Stats & per-game details | JSON summary |
| `offline_fix_log.jsonl` | Step-by-step actions | JSONL lines |
| `offline_fix_targets.scan_report.json` | Input to supervisor | JSON array |
| `maintenance_status.json` | Homepage status (sourced from supervisor) | JSON object |

## Troubleshooting

**"Nothing to fix" after audit**
- All games already offline-ready, or audit didn't find issues
- Run `npm run game:offline:audit` to check counts

**Supervisor lock is stale**
- Run with `--force-lock` to override
- Or manually remove `.auto_fix_and_recover.lock`

**A game won't fix despite multiple strategies**
- It's unresolved; listed in `offline_unresolved_games.txt`
- May need manual asset download from provider or code patch
- Use `offline_fix_summary.json` per-game details to debug which strategy failed

**Homepage still shows broken games**
- Audit results are read at load time
- Wait for page refresh, or manually refresh with F5
- Verify `offline_broken_games.json` exists and is readable

**Python dependency issues**
- Supervisor requires Python 3 + Playwright
- Install: `pip install -r requirements.txt && playwright install chromium`

## Performance Notes

- Audit is fast (static analysis only)
- Fix run is **slow**: ~2–5 minutes per game depending on size and strategies
- Use `--max-games` to test on a small batch first
- Leave `--strict-external-test` enabled for production runs to ensure offline readiness
