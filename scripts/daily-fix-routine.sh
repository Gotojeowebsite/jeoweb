#!/usr/bin/env bash
# daily-fix-routine.sh
#
# Designed to be invoked by a Claude scheduled routine. Self-contained:
#   1. Refresh the catalog and game_health.json (with strict-external mode so
#      games that rely on outside hosts at runtime count as broken).
#   2. Count actionable broken games (non-override, source=signals).
#   3. If zero -> print NOTHING_TO_DO and exit 0 (Claude exits its turn).
#   4. Otherwise -> run the auto-fix bot against the broken set.
#   5. Garbage-collect old quarantine entries and stdout debug logs.
#   6. Print a structured summary the routine prompt can act on.
#
# All output is grep-friendly. The routine prompt only needs the trailing
# DAILY_RESULT block to decide whether to commit.

set -uo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

LOG="$ROOT_DIR/.daily-fix-last.log"
: > "$LOG"

log() {
	printf '%s %s\n' "$(date -u +%H:%M:%S)" "$*" | tee -a "$LOG"
}

# ---------------------------------------------------------------- 1. refresh
log "[1/6] regenerating catalog + game_health.json (strict-external)"
if ! node scan.js >> "$LOG" 2>&1; then
	echo "DAILY_RESULT: error stage=scan"
	exit 2
fi
if ! node scripts/static-health-scan.js >> "$LOG" 2>&1; then
	echo "DAILY_RESULT: error stage=static-health"
	exit 2
fi
if ! node scripts/build-game-health.js --strict-external >> "$LOG" 2>&1; then
	echo "DAILY_RESULT: error stage=build-game-health"
	exit 2
fi

# ---------------------------------------------------------------- 2. count
BROKEN_JSON="$ROOT_DIR/game_health.json"
BROKEN_COUNT=$(node -e "
const d = require('$BROKEN_JSON');
const n = Object.values(d.games).filter(v => v.verdict === 'broken' && v.source !== 'override').length;
process.stdout.write(String(n));
")
log "[2/6] actionable broken (non-override): $BROKEN_COUNT"

# ---------------------------------------------------------------- 3. early-exit
if [ "$BROKEN_COUNT" = "0" ]; then
	log "[3/6] no broken games — early exit"
	echo "DAILY_RESULT: NOTHING_TO_DO broken=0"
	exit 0
fi

# ---------------------------------------------------------------- 4. fix
# Cap per-run so the routine completes in reasonable time. The bot itself
# enforces a per-game budget so this is a soft ceiling on attempts.
MAX_GAMES="${DAILY_FIX_MAX:-25}"
log "[4/6] running auto-fix-bot --max $MAX_GAMES"
if ! timeout 1800 node scripts/auto-fix-bot.js \
	--max "$MAX_GAMES" \
	--probe-timeout 5000 \
	--scrape-timeout 90000 \
	--search-budget-ms 12000 \
	>> "$LOG" 2>&1; then
	log "auto-fix-bot exited non-zero (timeout or error); continuing to cleanup"
fi

# ---------------------------------------------------------------- 5. cleanup
log "[5/6] cleanup: pruning .quarantine entries older than 14d and debug logs over 1MB"
QUAR="$ROOT_DIR/.quarantine"
PRUNED_DIRS=0
PRUNED_LOGS=0
if [ -d "$QUAR" ]; then
	# Old quarantine backups (rollback windows we no longer need).
	while IFS= read -r d; do
		rm -rf -- "$d" && PRUNED_DIRS=$((PRUNED_DIRS+1))
	done < <(find "$QUAR" -maxdepth 1 -mindepth 1 -type d -mtime +14)
	# Per-attempt debug logs that grow unbounded.
	while IFS= read -r f; do
		rm -f -- "$f" && PRUNED_LOGS=$((PRUNED_LOGS+1))
	done < <(find "$QUAR" -maxdepth 1 -type f \( -name '*-scraper-stdout.log' -o -name '*-repair-debug.log' \) -size +1M)
fi
log "[5/6] pruned $PRUNED_DIRS quarantine dirs, $PRUNED_LOGS debug logs"

# ---------------------------------------------------------------- 6. summary
# Re-run health to get the post-fix counts.
log "[6/6] re-scanning after fix attempts"
node scripts/static-health-scan.js >> "$LOG" 2>&1 || true
node scripts/build-game-health.js --strict-external >> "$LOG" 2>&1 || true

POST_BROKEN=$(node -e "
const d = require('$BROKEN_JSON');
const n = Object.values(d.games).filter(v => v.verdict === 'broken' && v.source !== 'override').length;
process.stdout.write(String(n));
")

# Structured summary the routine prompt can grep for.
FIXED=$((BROKEN_COUNT - POST_BROKEN))
if [ "$FIXED" -lt 0 ]; then FIXED=0; fi

# git status: did anything change?
CHANGED_FILES=$(git -C "$ROOT_DIR" status --porcelain | wc -l | tr -d ' ')

echo "DAILY_RESULT: ran broken_before=$BROKEN_COUNT broken_after=$POST_BROKEN fixed=$FIXED changed_files=$CHANGED_FILES pruned_dirs=$PRUNED_DIRS pruned_logs=$PRUNED_LOGS"
