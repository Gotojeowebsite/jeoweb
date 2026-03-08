#!/usr/bin/env bash
# ============================================================
#  GBA BATCH IMPORTER
#
#  Scans the Assets/GBA folder for ROM files and imports
#  each one using import-gba.sh automatically.
#
#  Usage:
#    1. Drop your .gba / .gb / .gbc ROM files into Assets/GBA/
#    2. Run: ./import-gba-batch.sh [--skip-existing] [--no-images]
#
#  Options:
#    --skip-existing   Skip games that already have a folder in Assets/
#    --no-images       Skip thumbnail image search (much faster)
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GBA_DIR="$SCRIPT_DIR/Assets/GBA"
ASSETS_DIR="$SCRIPT_DIR/Assets"
IMPORT_SCRIPT="$SCRIPT_DIR/import-gba.sh"

# ---- Parse flags ----
SKIP_EXISTING=false
NO_IMAGES=false
for arg in "$@"; do
    case "$arg" in
        --skip-existing) SKIP_EXISTING=true ;;
        --no-images) NO_IMAGES=true ;;
    esac
done

# ---- Validate ----
if [ ! -d "$GBA_DIR" ]; then
    echo "Error: GBA ROM folder not found: $GBA_DIR"
    echo ""
    echo "Create it and drop your ROMs in:"
    echo "  mkdir -p Assets/GBA"
    echo "  cp ~/roms/*.gba Assets/GBA/"
    exit 1
fi

if [ ! -f "$IMPORT_SCRIPT" ]; then
    echo "Error: import-gba.sh not found: $IMPORT_SCRIPT"
    exit 1
fi

chmod +x "$IMPORT_SCRIPT"

# ---- Collect ROM files ----
VALID_EXTS="gba|gb|gbc|zip|7z"
ROMS=()
while IFS= read -r -d '' f; do
    ROMS+=("$f")
done < <(find "$GBA_DIR" -maxdepth 1 -type f -regextype posix-extended -iregex ".*\\.($VALID_EXTS)$" -print0 | sort -z)

TOTAL=${#ROMS[@]}
if [ "$TOTAL" -eq 0 ]; then
    echo "No ROM files found in $GBA_DIR"
    echo ""
    echo "Drop your .gba, .gb, .gbc, .zip, or .7z files into Assets/GBA/ and run again."
    exit 0
fi

echo "=========================================="
echo "  GBA Batch Importer"
echo "  Found $TOTAL ROM files in Assets/GBA/"
echo "=========================================="
echo ""

# ---- Derive game name from filename ----
derive_game_name() {
    local basename="$1"
    local name="${basename%.*}"
    # Remove common parenthetical tags: (USA), (Rev 2), (English v2.0), etc.
    name="$(echo "$name" | sed -E 's/\s*\([^)]*\)//g')"
    # Lowercase, replace non-alphanumeric with hyphens, collapse, trim
    name="$(echo "$name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')"
    echo "$name"
}

IMPORTED=0
SKIPPED=0
FAILED=0

for ROM in "${ROMS[@]}"; do
    ROM_BASENAME="$(basename "$ROM")"
    GAME_NAME="$(derive_game_name "$ROM_BASENAME")"

    if [ -z "$GAME_NAME" ]; then
        echo "[SKIP] Could not derive name from: $ROM_BASENAME"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    COUNTER=$((IMPORTED + SKIPPED + FAILED + 1))
    echo "[$COUNTER/$TOTAL] $ROM_BASENAME -> $GAME_NAME"

    # Skip if folder already exists
    if [ -d "$ASSETS_DIR/$GAME_NAME" ]; then
        if [ "$SKIP_EXISTING" = true ]; then
            echo "  Already exists, skipping."
            SKIPPED=$((SKIPPED + 1))
            continue
        else
            echo "  Already exists, overwriting."
        fi
    fi

    # Run import-gba.sh non-interactively (pipe 'y' for overwrite prompt)
    if echo "y" | "$IMPORT_SCRIPT" "$ROM" "$GAME_NAME" > /dev/null 2>&1; then
        echo "  Imported successfully."
        IMPORTED=$((IMPORTED + 1))
    else
        echo "  FAILED to import."
        FAILED=$((FAILED + 1))
    fi
done

echo ""
echo "=========================================="
echo "  Batch import complete!"
echo "  Imported: $IMPORTED"
echo "  Skipped:  $SKIPPED"
echo "  Failed:   $FAILED"
echo "=========================================="

# ---- Re-run scan.js to update types ----
if command -v node >/dev/null 2>&1 && [ -f "$SCRIPT_DIR/scan.js" ]; then
    echo ""
    echo "Running scan.js to refresh games_list.json..."
    node "$SCRIPT_DIR/scan.js"
fi
