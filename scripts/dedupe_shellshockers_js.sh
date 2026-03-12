#!/usr/bin/env bash
set -euo pipefail

ROOT="Assets/shellshockers"
JS_ROOT="$ROOT/scripts/js"
CANON="$ROOT/scripts/js_canonical"
TS=$(date +%Y%m%d%H%M%S)

if [[ ! -d "$ROOT" ]]; then
  echo "Error: $ROOT not found"
  exit 1
fi

if [[ ! -d "$ROOT/scripts" ]]; then
  echo "Error: $ROOT/scripts not found"
  exit 1
fi

if [[ -d "$CANON" ]]; then
  echo "Canonical dir $CANON already exists; aborting to avoid overwrite"
  exit 1
fi

echo "Building canonical set of unique files under nested js directories..."
mkdir -p "$CANON"
declare -A seen

# iterate all files under any js/* path
while IFS= read -r -d '' f; do
  # compute sha256
  sum=$(sha256sum "$f" | cut -d' ' -f1)
  if [[ -z "${seen[$sum]:-}" ]]; then
    seen[$sum]=1
    # relative path after the last 'js/' occurrence
    rel="${f#*js/}"
    dest="$CANON/$rel"
    mkdir -p "$(dirname "$dest")"
    cp -p "$f" "$dest"
  fi
done < <(find "$ROOT" -type f -path '*/js/*' -print0)

echo "Canonicalized $(find "$CANON" -type f | wc -l) files into $CANON"

echo "Backing up existing top-level js (if present)"
if [[ -d "$JS_ROOT" ]]; then
  mv "$JS_ROOT" "${JS_ROOT}.bak.$TS"
fi

echo "Replacing js tree with canonical set"
mv "$CANON" "$JS_ROOT"

echo "Removing remaining nested js directories (except $JS_ROOT)"
find "$ROOT" -type d -name js -print0 | while IFS= read -r -d '' d; do
  if [[ "$d" != "$JS_ROOT" ]]; then
    rm -rf "$d"
  fi
done

echo "Cleaning up empty dirs"
find "$ROOT" -type d -empty -delete || true

echo "Staging changes for git"
git add -A "$ROOT"
if git diff --staged --quiet; then
  echo "No staged changes to commit"
else
  git commit -m "Deduplicate shellshockers nested js copies"
  echo "Committed. Attempting git push origin main"
  git push origin main || echo "Push failed — check connectivity/errors"
fi

echo "Done. Backup of previous js (if any) at ${JS_ROOT}.bak.$TS"
