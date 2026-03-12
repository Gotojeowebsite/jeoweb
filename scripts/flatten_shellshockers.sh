#!/usr/bin/env bash
set -euo pipefail

# Flatten nested js/js/... copies under Assets/shellshockers into a single canonical folder
# Creates a compressed backup, moves files, removes empty dirs. Safe to inspect before commit.

ROOT="Assets/shellshockers"
if [[ ! -d "$ROOT" ]]; then
  echo "Error: $ROOT not found"
  exit 1
fi

TS=$(date +%Y%m%d%H%M%S)
BACKUP="$HOME/shellshockers-backup-$TS.tgz"
echo "Creating backup $BACKUP"
tar czf "$BACKUP" "$ROOT"

TARGET="$ROOT/scripts/js_flattened"
mkdir -p "$TARGET"

echo "Moving files from nested 'js' paths into $TARGET (preserving relative structure)"
find "$ROOT" -type f -path '*/js/*' -print0 | while IFS= read -r -d '' f; do
  # relative path after the first occurrence of 'js/'
  rel="${f#*js/}"
  dest="$TARGET/$rel"
  mkdir -p "$(dirname "$dest")"
  if [[ -e "$dest" ]]; then
    # avoid overwrite: append a unique suffix
    suffix=".$(date +%s%N)"
    dest="$dest$suffix"
  fi
  mv "$f" "$dest"
done

echo "Removing empty directories under $ROOT"
find "$ROOT" -type d -empty -delete || true

echo "Summary (new flattened tree):"
du -sh "$TARGET"
echo
echo "Next steps (recommended):"
echo " 1) Inspect $TARGET to ensure files moved correctly." 
echo " 2) If OK, move or rename $TARGET to the canonical path you want, e.g. $ROOT/scripts/js"
echo "    mv $TARGET $ROOT/scripts/js.tmp && mv $ROOT/scripts/js.tmp $ROOT/scripts/js"
echo " 3) Commit changes: git add -A Assets/shellshockers && git commit -m 'Flatten shellshockers js tree'"
echo " 4) If anything goes wrong, restore from backup: tar xzf $BACKUP -C /"

echo "Done. Backup saved at $BACKUP"
