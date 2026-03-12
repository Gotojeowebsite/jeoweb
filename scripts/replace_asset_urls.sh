#!/usr/bin/env bash
set -euo pipefail

AZ_BASE_URL="$1"
TARGET_DIR="$2"

if [[ -z "$AZ_BASE_URL" || -z "$TARGET_DIR" ]]; then
  echo "Usage: $0 <AZURE_BLOB_BASE_URL> <target-dir>"
  exit 1
fi

# Remove trailing slash if present
AZ_BASE_URL="${AZ_BASE_URL%/}"

echo "Replacing asset references in $TARGET_DIR to use $AZ_BASE_URL/Assets/"

find "$TARGET_DIR" -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.json' \) -print0 | while IFS= read -r -d '' file; do
  sed -i "s|\"/Assets/|\"${AZ_BASE_URL}/Assets/|g; s|'\/Assets\/'|'${AZ_BASE_URL}/Assets/|g; s|\"Assets/|\"${AZ_BASE_URL}/Assets/|g; s|'Assets/|'${AZ_BASE_URL}/Assets/|g" "$file" || true
done

echo "Done."
