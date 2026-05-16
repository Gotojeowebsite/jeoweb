#!/usr/bin/env bash
# One-shot Cloudflare deploy for the Jeoweb backend.
#
# What it does:
#   1) Verifies Cloudflare API credentials.
#   2) Creates the D1 database "jeoweb" (idempotent).
#   3) Patches backend/wrangler.toml with the printed database_id.
#   4) Applies backend/schema.sql to the remote D1.
#   5) Deploys backend/worker.js as the "jeoweb-backend" Worker.
#   6) Probes /api/health and prints the Worker URL.
#   7) Patches index.html's <meta name="jeo-backend"> to point at the new URL.
#   8) Leaves you with a clean `git status` to review and commit.
#
# Usage (from the repo root):
#   CLOUDFLARE_API_TOKEN=...   CLOUDFLARE_ACCOUNT_ID=...   bash scripts/deploy-backend.sh
#
# The script is idempotent: re-running after a successful deploy will just
# re-apply the schema (safe — all statements are IF NOT EXISTS) and re-publish.
#
# It NEVER writes credentials to the repo. Wrangler stores nothing under
# the project; it caches token-derived state under $HOME/.config/.wrangler.
set -euo pipefail

# ────────────── env validation ──────────────
: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN before running}"
: "${CLOUDFLARE_ACCOUNT_ID:?Set CLOUDFLARE_ACCOUNT_ID before running}"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if [ ! -f backend/wrangler.toml ] || [ ! -f backend/worker.js ] || [ ! -f backend/schema.sql ]; then
	echo "✘ backend/ files missing — are you running from the wrong directory?"
	exit 1
fi

# ────────────── ensure wrangler ──────────────
if [ ! -x node_modules/.bin/wrangler ]; then
	echo "→ installing wrangler locally…"
	npm install --no-audit --no-fund --silent --save-dev wrangler@latest >/dev/null
fi
WRANGLER="node_modules/.bin/wrangler"

echo "→ wrangler $($WRANGLER --version | tail -1)"

# ────────────── verify token ──────────────
echo "→ verifying Cloudflare token…"
if ! $WRANGLER whoami 2>&1 | tee /tmp/jeo-whoami.log | grep -q -E 'You are logged in|Account ID|associated with'; then
	cat /tmp/jeo-whoami.log
	echo "✘ wrangler whoami failed — check CLOUDFLARE_API_TOKEN."
	exit 1
fi

# ────────────── create or reuse D1 ──────────────
DB_NAME=jeoweb
echo "→ creating D1 database \"$DB_NAME\" (or reusing existing)…"
CREATE_OUT="$(cd backend && $REPO_ROOT/$WRANGLER d1 create "$DB_NAME" 2>&1 || true)"
echo "$CREATE_OUT" | sed 's/^/    /'

DB_ID="$(echo "$CREATE_OUT" | grep -oE 'database_id = "[^"]+"' | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
if [ -z "$DB_ID" ]; then
	# Already exists — query for the id instead.
	LIST_OUT="$(cd backend && $REPO_ROOT/$WRANGLER d1 list --json 2>/dev/null || true)"
	DB_ID="$(echo "$LIST_OUT" | node -e "
		let s=''; process.stdin.on('data', c => s += c); process.stdin.on('end', () => {
			try {
				const arr = JSON.parse(s);
				const hit = arr.find(d => d.name === '$DB_NAME');
				if (hit) process.stdout.write(hit.uuid || hit.database_id || '');
			} catch (_) {}
		});
	")"
fi
if [ -z "$DB_ID" ]; then
	echo "✘ Could not determine database_id."
	exit 1
fi
echo "→ D1 database_id: $DB_ID"

# ────────────── patch wrangler.toml ──────────────
if grep -q 'REPLACE_WITH_YOUR_D1_DATABASE_ID' backend/wrangler.toml; then
	sed -i.bak -E "s|database_id = \"REPLACE_WITH_YOUR_D1_DATABASE_ID\"|database_id = \"$DB_ID\"|" backend/wrangler.toml
	rm -f backend/wrangler.toml.bak
	echo "→ patched backend/wrangler.toml database_id"
fi

# ────────────── apply schema ──────────────
echo "→ applying schema.sql to remote D1…"
(cd backend && $REPO_ROOT/$WRANGLER d1 execute "$DB_NAME" --file=schema.sql --remote --yes 2>&1) | sed 's/^/    /'

# ────────────── deploy ──────────────
echo "→ deploying worker…"
DEPLOY_OUT="$(cd backend && $REPO_ROOT/$WRANGLER deploy 2>&1 || true)"
echo "$DEPLOY_OUT" | sed 's/^/    /'

WORKER_URL="$(echo "$DEPLOY_OUT" | grep -oE 'https://[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev' | head -1)"
if [ -z "$WORKER_URL" ]; then
	echo "✘ deploy succeeded but couldn't parse worker URL. Look above."
	exit 1
fi
echo "→ Worker URL: $WORKER_URL"

# ────────────── health probe ──────────────
echo "→ health probe…"
HEALTH="$(curl -sS --max-time 15 "$WORKER_URL/api/health")"
echo "    $HEALTH"
if ! echo "$HEALTH" | grep -q '"ok"[[:space:]]*:[[:space:]]*true'; then
	echo "✘ /api/health didn't return ok=true. Inspect logs:"
	echo "    $WRANGLER tail jeoweb-backend"
	exit 1
fi

# ────────────── wire frontend ──────────────
echo "→ patching index.html meta tag…"
node -e "
	const fs = require('fs');
	const file = 'index.html';
	let src = fs.readFileSync(file, 'utf8');
	const before = src;
	src = src.replace(
		/<meta name=\"jeo-backend\" content=\"[^\"]*\" \/>/,
		'<meta name=\"jeo-backend\" content=\"$WORKER_URL\" />'
	);
	if (src === before) {
		console.error('✘ could not patch <meta name=\"jeo-backend\"> in index.html');
		process.exit(1);
	}
	fs.writeFileSync(file, src);
	console.log('    updated <meta name=\"jeo-backend\">');
"

echo ""
echo "✅ Deploy complete."
echo ""
echo "  Worker URL : $WORKER_URL"
echo "  D1 ID      : $DB_ID"
echo "  Health     : $HEALTH"
echo ""
echo "Next:"
echo "  git diff backend/wrangler.toml index.html"
echo "  git add backend/wrangler.toml index.html"
echo "  git commit -m 'backend: deploy Cloudflare Worker, wire jeo-backend meta'"
echo "  git push"
