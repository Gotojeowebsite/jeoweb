#!/usr/bin/env bash
# ============================================================
#  SNES GAME IMPORTER
#
#  Takes a SNES ROM file and creates a fully self-contained
#  game folder under Assets/ with an HTML-based SNES emulator.
#
#  Usage:
#    ./import-snes.sh <rom-file> [game-name]
#
#  Examples:
#    ./import-snes.sh ~/roms/SuperMarioWorld.sfc
#    ./import-snes.sh ~/roms/SuperMarioWorld.sfc super-mario-world
#    ./import-snes.sh ~/roms/Zelda.smc zelda-link-to-the-past
#
#  Supported ROM extensions: .sfc, .smc, .fig, .swc, .zip, .7z
#
#  The generated folder will contain:
#    - index.html  (EmulatorJS-powered SNES emulator page)
#    - The ROM file
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASSETS_DIR="$SCRIPT_DIR/Assets"
GAMES_LIST="$SCRIPT_DIR/games_list.json"

# ---- Validate arguments ----
if [ $# -lt 1 ]; then
    echo "Usage: $0 <rom-file> [game-name]"
    echo ""
    echo "Examples:"
    echo "  $0 ~/roms/SuperMarioWorld.sfc"
    echo "  $0 ~/roms/SuperMarioWorld.sfc super-mario-world"
    exit 1
fi

ROM_FILE="$1"

if [ ! -f "$ROM_FILE" ]; then
    echo "Error: ROM file not found: $ROM_FILE"
    exit 1
fi

# ---- Validate ROM extension ----
ROM_BASENAME="$(basename "$ROM_FILE")"
ROM_EXT="${ROM_BASENAME##*.}"
ROM_EXT_LOWER="$(echo "$ROM_EXT" | tr '[:upper:]' '[:lower:]')"

VALID_EXTS=("sfc" "smc" "fig" "swc" "zip" "7z")
VALID=false
for ext in "${VALID_EXTS[@]}"; do
    if [ "$ROM_EXT_LOWER" = "$ext" ]; then
        VALID=true
        break
    fi
done

if [ "$VALID" = false ]; then
    echo "Error: Unsupported ROM extension '.$ROM_EXT'"
    echo "Supported extensions: ${VALID_EXTS[*]}"
    exit 1
fi

# ---- Determine game name ----
if [ $# -ge 2 ]; then
    GAME_NAME="$2"
else
    # Derive from filename: remove extension, lowercase, replace spaces/special chars with hyphens
    GAME_NAME="${ROM_BASENAME%.*}"
    GAME_NAME="$(echo "$GAME_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')"
fi

if [ -z "$GAME_NAME" ]; then
    echo "Error: Could not determine game name. Please provide one as the second argument."
    exit 1
fi

GAME_DIR="$ASSETS_DIR/$GAME_NAME"

# ---- Create game directory ----
if [ -d "$GAME_DIR" ]; then
    echo "Warning: Directory already exists: $GAME_DIR"
    read -r -p "Overwrite? [y/N] " response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
fi

mkdir -p "$GAME_DIR"

# ---- Copy ROM file ----
cp "$ROM_FILE" "$GAME_DIR/$ROM_BASENAME"
echo "Copied ROM: $ROM_BASENAME -> $GAME_DIR/"

# ---- Search for game thumbnail image ----
SEARCH_NAME="$(echo "$GAME_NAME" | sed 's/-/ /g')"
IMAGE_FOUND=false

echo "Searching for thumbnail image..."
for QUERY_SUFFIX in "snes game logo" "snes game thumbnail" "snes game" "game"; do
    SEARCH_QUERY="${SEARCH_NAME} ${QUERY_SUFFIX}"
    ENCODED_QUERY="$(python3 -c "import urllib.parse; print(urllib.parse.quote('$SEARCH_QUERY'))" 2>/dev/null || echo "$SEARCH_QUERY")"
    SEARCH_URL="https://www.bing.com/images/search?q=${ENCODED_QUERY}&first=1&count=8&qft=+filterui:imagesize-medium"

    PAGE_HTML="$(curl -s -L --max-time 15 \
        -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' \
        "$SEARCH_URL" 2>/dev/null || true)"

    if [ -z "$PAGE_HTML" ]; then
        continue
    fi

    # Extract image URLs from Bing results
    IMG_URLS="$(echo "$PAGE_HTML" | grep -oP 'murl&quot;:&quot;\Khttps?://[^&]+?\.(jpg|jpeg|png|gif|webp)' | head -5)"

    for IMG_URL in $IMG_URLS; do
        # Download to a temp file first, then validate
        TEMP_IMG="$(mktemp)"
        HTTP_CODE="$(curl -s -L --max-time 10 -o "$TEMP_IMG" -w '%{http_code}' "$IMG_URL" 2>/dev/null || echo "000")"

        if [ "$HTTP_CODE" = "200" ] && [ -s "$TEMP_IMG" ]; then
            FILE_SIZE="$(stat -c%s "$TEMP_IMG" 2>/dev/null || echo 0)"
            if [ "$FILE_SIZE" -gt 1024 ]; then
                # Determine extension from URL
                IMG_EXT="$(echo "$IMG_URL" | grep -oP '\.(jpg|jpeg|png|gif|webp)$' | head -1)"
                if [ -z "$IMG_EXT" ]; then
                    IMG_EXT=".png"
                fi
                cp "$TEMP_IMG" "$GAME_DIR/logo${IMG_EXT}"
                rm -f "$TEMP_IMG"
                echo "Downloaded thumbnail: logo${IMG_EXT}"
                IMAGE_FOUND=true
                break 2
            fi
        fi
        rm -f "$TEMP_IMG"
    done
done

if [ "$IMAGE_FOUND" = false ]; then
    echo "Could not find a thumbnail image. You can manually add logo.png to $GAME_DIR/"
fi

# ---- Generate display name from game name ----
DISPLAY_NAME="$(echo "$GAME_NAME" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')"

# ---- Generate index.html ----
cat > "$GAME_DIR/index.html" << HTMLEOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="color-scheme" content="light dark">
    <title>${DISPLAY_NAME} | SNES</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }
        #game {
            width: 100%;
            height: 100%;
            max-width: 100vw;
            max-height: 100vh;
        }
    </style>
</head>
<body>
    <div id="game"></div>

    <script>
        EJS_player = '#game';
        EJS_core = 'snes9x';
        EJS_gameUrl = '${ROM_BASENAME}';
        EJS_pathtodata = '/emulatorjs/';
        EJS_startOnLoaded = true;
        EJS_color = '#1a1a2e';
    </script>
    <script src="/emulatorjs/loader.js"></script>
</body>
</html>
HTMLEOF

echo "Created: $GAME_DIR/index.html"

# ---- Update games_list.json ----
if [ -f "$GAMES_LIST" ] && command -v node >/dev/null 2>&1; then
    node -e "
        const fs = require('fs');
        const listFile = process.argv[1];
        const gameName = process.argv[2];
        const gameDir = process.argv[3];

        let games = [];
        try { games = JSON.parse(fs.readFileSync(listFile, 'utf8')); } catch(e) {}

        // Find the actual logo file extension
        const fs2 = require('path');
        const dir = 'Assets/' + gameName + '/';
        let logoFile = 'logo.png';
        try {
            const files = fs.readdirSync(dir);
            const logo = files.find(f => f.startsWith('logo.'));
            if (logo) logoFile = logo;
        } catch(e) {}

        // Check if already exists
        const exists = games.some(g => g.name === gameName);
        if (!exists) {
            games.push({
                name: gameName,
                url: 'Assets/' + gameName + '/index.html',
                image: 'Assets/' + gameName + '/' + logoFile,
                type: 'snes'
            });
            games.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            fs.writeFileSync(listFile, JSON.stringify(games, null, 2) + '\n');
            console.log('Added \"' + gameName + '\" to games_list.json');
        } else {
            console.log('Game \"' + gameName + '\" already in games_list.json');
        }
    " "$GAMES_LIST" "$GAME_NAME" "$GAME_DIR"
else
    echo "Note: Install Node.js to auto-update games_list.json, or add the entry manually."
fi

echo ""
echo "=== SNES game imported successfully! ==="
echo "  Folder:  Assets/$GAME_NAME/"
echo "  Play at: Assets/$GAME_NAME/index.html"
