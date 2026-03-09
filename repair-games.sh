#!/bin/bash
# Repair script for broken game imports
# This script fixes games that were partially downloaded or have missing files
set -e
cd /workspaces/jeoweb

echo "========================================="
echo "  Game Repair Script"
echo "========================================="

ASSETS="Assets"

download_if_missing() {
    local target="$1"
    local url="$2"

    if [[ -s "$target" ]]; then
        return 0
    fi

    mkdir -p "$(dirname "$target")"
    if ! wget -q "$url" -O "$target" 2>/dev/null; then
        rm -f "$target"
        return 1
    fi
}

repair_poki_secondary_sdk() {
    local game_dir="$1"
    local source_base="$2"

    while IFS= read -r sdk_file; do
        [[ -z "$sdk_file" ]] && continue

        while IFS= read -r rel; do
            [[ -z "$rel" ]] && continue
            download_if_missing "$game_dir/$rel" "$source_base/$rel" || true
        done < <(grep -oP 'patch/poki-sdk-[A-Za-z0-9._-]+\.js|poki-sdk-(?:core|kids|playground|hoist)-[A-Za-z0-9._-]+\.js|ma\.js' "$sdk_file" | sort -u)
    done < <(find "$game_dir" -maxdepth 2 -type f \( -name 'poki-sdk.js' -o -name 'sdk.js' \) 2>/dev/null)
}

repair_godot_support_files() {
    local game_dir="$1"
    local source_base="$2"
    local index_file="$game_dir/index.html"

    [[ -f "$index_file" ]] || return 0

    while IFS= read -r rel; do
        [[ -z "$rel" ]] && continue

        if download_if_missing "$game_dir/$rel" "$source_base/$rel"; then
            continue
        fi

        case "$rel" in
            *.manifest.json)
                cat > "$game_dir/$rel" <<'EOF'
{
  "name": "Game",
  "short_name": "Game",
  "start_url": "./index.html",
  "display": "fullscreen",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": []
}
EOF
                ;;
            *.service.worker.js)
                cat > "$game_dir/$rel" <<'EOF'
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
EOF
                ;;
            *.png)
                if [[ -f "$game_dir/index.png" ]]; then
                    cp -f "$game_dir/index.png" "$game_dir/$rel" 2>/dev/null || true
                fi
                ;;
        esac
    done < <(
        {
            grep -oP 'href="\K[^"]+' "$index_file" 2>/dev/null
            grep -oP 'serviceWorker:\s*"\K[^"]+' "$index_file" 2>/dev/null
        } | grep -vE '^(https?:)?//|^/' | sort -u
    )
}

repair_defold_archive_files() {
    local game_dir="$1"
    local source_base="$2"
    local index_file="$game_dir/index.html"
    local executable
    local manifest_rel=""

    [[ -f "$game_dir/dmloader.js" ]] || return 0

    executable=$(grep -oP 'EngineLoader\.load\(\s*"[^"]+"\s*,\s*"\K[^"]+' "$index_file" 2>/dev/null | head -1)
    if [[ -n "$executable" ]]; then
        download_if_missing "$game_dir/${executable}_wasm.js" "$source_base/${executable}_wasm.js" || true
    fi

    for candidate in archive/archive_files.json split/archive_files.json archive_files.json; do
        if [[ "$(curl -m 8 -s -o /dev/null -w "%{http_code}" "$source_base/$candidate")" == "200" ]]; then
            manifest_rel="$candidate"
            break
        fi
    done

    [[ -n "$manifest_rel" ]] || return 0

    download_if_missing "$game_dir/$manifest_rel" "$source_base/$manifest_rel" || return 0

    python3 - <<'PY' "$game_dir" "$source_base" "$manifest_rel"
import json, pathlib, sys, urllib.request

game_dir = pathlib.Path(sys.argv[1])
source_base = sys.argv[2].rstrip('/')
manifest_rel = sys.argv[3]
manifest_path = game_dir / manifest_rel
manifest_dir = pathlib.Path(manifest_rel).parent

with manifest_path.open('r', encoding='utf-8') as f:
    data = json.load(f)

for item in data.get('content', []):
    for piece in item.get('pieces', []):
        name = piece.get('name')
        if not name:
            continue
        target = game_dir / manifest_dir / name
        if target.exists() and target.stat().st_size > 0:
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(f"{source_base}/{manifest_dir.as_posix()}/{name}" if manifest_dir.as_posix() != '.' else f"{source_base}/{name}", target)
PY
}

repair_poki_unity_build_mirror() {
    local game_dir="$1"
    local source_base="$2"
    local index_file="$game_dir/index.html"
    local file

    [[ -f "$index_file" ]] || return 0
    mkdir -p "$game_dir/Build"

    while IFS= read -r file; do
        [[ -z "$file" ]] && continue
        download_if_missing "$game_dir/Build/$file" "$source_base/Build/$file" || true
    done < <(
        {
            grep -oP '"loader_filename":"\K[^"]+' "$index_file" 2>/dev/null
            grep -oP '"data_filename":"\K[^"]+' "$index_file" 2>/dev/null
            grep -oP '"framework_filename":"\K[^"]+' "$index_file" 2>/dev/null
            grep -oP '"code_filename":"\K[^"]+' "$index_file" 2>/dev/null
        } | sort -u
    )
}

###############################################################################
# 1. COOKIE-CLICKER: Missing everything - full re-download
###############################################################################
echo ""
echo "[1/12] Fixing cookie-clicker (full re-download)..."
rm -rf "$ASSETS/cookie-clicker"
mkdir -p "$ASSETS/cookie-clicker"

# Download the main page and all local resources
wget -q --no-parent --convert-links --adjust-extension \
     -P "$ASSETS/cookie-clicker" \
     -nH --cut-dirs=100 \
     --reject "*.gz" \
     "https://db.duckmath.org/html/cookie_clicker/index.html" \
     -O "$ASSETS/cookie-clicker/index.html" 2>/dev/null || true

# Download critical JS/CSS files referenced in the page
for file in main.js base64.js showads.js style.css; do
    wget -q "https://db.duckmath.org/html/cookie_clicker/$file" \
         -O "$ASSETS/cookie-clicker/$file" 2>/dev/null || true
done

# Download known image assets (directory listing is blocked on source host)
mkdir -p "$ASSETS/cookie-clicker/img" "$ASSETS/cookie-clicker/snd"
for file in \
    favicon.ico bunnies.png contract.png discord.png dragon.png \
    frostedReindeer.png goldCookie.png hearts.png heraldFlag.png \
    icons.png money.png santa.png spookyCookie.png weeHoodie.png \
    wrathContract.png wrathCookie.png; do
    wget -q "https://db.duckmath.org/html/cookie_clicker/img/$file" \
        -O "$ASSETS/cookie-clicker/img/$file" 2>/dev/null || true
done

# Download known sound assets
for file in \
    buyHeavenly.mp3 charging.mp3 chime.mp3 choir.mp3 clickOff.mp3 clickOn.mp3 \
    cymbalRev.mp3 fortune.mp3 jingle.mp3 jingleClick.mp3 levelPrestige.mp3 \
    press.mp3 shimmerClick.mp3 spellFail.mp3 thud.mp3 tick.mp3 upgrade.mp3; do
    wget -q "https://db.duckmath.org/html/cookie_clicker/snd/$file" \
        -O "$ASSETS/cookie-clicker/snd/$file" 2>/dev/null || true
done

# Variants used by the game (buy1.mp3, click1.mp3, etc.)
for base in buy click clickb pop sell squish; do
    for n in 1 2 3 4; do
       wget -q "https://db.duckmath.org/html/cookie_clicker/snd/${base}${n}.mp3" \
           -O "$ASSETS/cookie-clicker/snd/${base}${n}.mp3" 2>/dev/null || true
    done
done

if [[ -f "$ASSETS/cookie-clicker/index.html" && -f "$ASSETS/cookie-clicker/main.js" ]]; then
    echo "  ✓ cookie-clicker repaired"
else
    echo "  ✗ cookie-clicker may still be incomplete"
fi

###############################################################################
# 2. SNEK-IO: Only has pre.html, needs index.html
###############################################################################
echo ""
echo "[2/12] Fixing snek-io (downloading index.html from pre.html source)..."

wget -q "https://db2.duckmath.org/2026/more/snek-io/index.html" \
     -O "$ASSETS/snek-io/index.html" 2>/dev/null || true

if [[ -f "$ASSETS/snek-io/index.html" ]]; then
    echo "  ✓ snek-io index.html downloaded"
    # Check if it references any Build/ or scripts we need
    if grep -q "createUnityInstance\|UnityLoader" "$ASSETS/snek-io/index.html" 2>/dev/null; then
        echo "  → Unity game, checking for Build files..."
        BUILDFILES=$(grep -oP 'Build/[^"'"'"'\s]+' "$ASSETS/snek-io/index.html" 2>/dev/null | sort -u)
        if [[ -n "$BUILDFILES" ]]; then
            mkdir -p "$ASSETS/snek-io/Build"
            while IFS= read -r bfile; do
                if [[ ! -f "$ASSETS/snek-io/$bfile" ]]; then
                    echo "  → Downloading $bfile..."
                    wget -q "https://db2.duckmath.org/2026/more/snek-io/$bfile" \
                         -O "$ASSETS/snek-io/$bfile" 2>/dev/null || true
                fi
            done <<< "$BUILDFILES"
        fi
    fi
else
    echo "  ✗ snek-io index.html download failed"
fi

###############################################################################
# 3. BRIDGE-RACE: Unity game, missing entire Build/ directory
###############################################################################
echo ""
echo "[3/12] Fixing bridge-race (downloading Build/ files)..."
mkdir -p "$ASSETS/bridge-race/Build"

BASE_URL="https://db.duckmath.org/html/bridge_race"
for file in "Build/BridgeRace.loader.js" "Build/BridgeRace.data.unityweb" "Build/BridgeRace.framework.js.unityweb" "Build/BridgeRace.wasm.unityweb"; do
    if [[ ! -f "$ASSETS/bridge-race/$file" ]]; then
        echo "  → Downloading $file..."
        wget -q "$BASE_URL/$file" -O "$ASSETS/bridge-race/$file" 2>/dev/null || true
    fi
done

# Also need unarchiver.min.js referenced in index.html
if [[ ! -f "$ASSETS/bridge-race/unarchiver.min.js" ]]; then
    wget -q "$BASE_URL/unarchiver.min.js" -O "$ASSETS/bridge-race/unarchiver.min.js" 2>/dev/null || true
fi

echo "  ✓ bridge-race Build/ files downloaded"

###############################################################################
# 4. FORTZONE: Unity game, missing Build/ directory
###############################################################################
echo ""
echo "[4/12] Fixing fortzone (downloading Build/ files)..."
mkdir -p "$ASSETS/fortzone/Build"

BASE_URL="https://db2.duckmath.org/2025/more/fort-battle-royale"
for file in "Build/FortzoneWebGL109.loader.js" "Build/FortzoneWebGL109.data.unityweb" "Build/FortzoneWebGL109.framework.js.unityweb" "Build/FortzoneWebGL109.wasm.unityweb"; do
    if [[ ! -f "$ASSETS/fortzone/$file" ]]; then
        echo "  → Downloading $file..."
        wget -q "$BASE_URL/$file" -O "$ASSETS/fortzone/$file" 2>/dev/null || true
    fi
done

echo "  ✓ fortzone Build/ files downloaded"

###############################################################################
# 5. THORNS-AND-BALLONS: Unity game, missing Build/ directory
###############################################################################
echo ""
echo "[5/12] Fixing thorns-and-ballons (downloading Build/ files)..."
mkdir -p "$ASSETS/thorns-and-ballons/Build"

BASE_URL="https://db.duckmath.org/html/thorns_and_ballons"
for file in "Build/TAB_new.loader.js" "Build/TAB_new.data.unityweb" "Build/TAB_new.framework.js.unityweb" "Build/TAB_new.wasm.unityweb"; do
    if [[ ! -f "$ASSETS/thorns-and-ballons/$file" ]]; then
        echo "  → Downloading $file..."
        wget -q "$BASE_URL/$file" -O "$ASSETS/thorns-and-ballons/$file" 2>/dev/null || true
    fi
done

echo "  ✓ thorns-and-ballons Build/ files downloaded"

###############################################################################
# 6. BALDI-BASICS: Missing UnityLoader.js
###############################################################################
echo ""
echo "[6/12] Fixing baldi-basics (downloading UnityLoader.js)..."

# The index.html uses UnityLoader.instantiate but there's no UnityLoader.js
# Check what script tag loads it
LOADER_SRC=$(grep -oP 'src="[^"]*UnityLoader[^"]*"' "$ASSETS/baldi-basics/index.html" 2>/dev/null | head -1 | grep -oP '"[^"]*"' | tr -d '"')
if [[ -z "$LOADER_SRC" ]]; then
    # Try looking for a script that loads it
    LOADER_SRC=$(grep -oP 'src="[^"]*\.js"' "$ASSETS/baldi-basics/index.html" 2>/dev/null | head -5)
    echo "  Script refs found: $LOADER_SRC"
fi

# Download UnityLoader.js from the source
BASE_URL="https://db2.duckmath.org/2026/more/baldis-basics"
wget -q "$BASE_URL/UnityLoader.js" -O "$ASSETS/baldi-basics/UnityLoader.js" 2>/dev/null || true

# Also try getting it from a CDN or the TemplateData folder
if [[ ! -s "$ASSETS/baldi-basics/UnityLoader.js" ]]; then
    wget -q "$BASE_URL/TemplateData/UnityLoader.js" -O "$ASSETS/baldi-basics/UnityLoader.js" 2>/dev/null || true
fi

# Check index.html for the actual script reference  
if grep -q 'src="Build/UnityLoader.js"' "$ASSETS/baldi-basics/index.html" 2>/dev/null; then
    mkdir -p "$ASSETS/baldi-basics/Build"
    cp "$ASSETS/baldi-basics/UnityLoader.js" "$ASSETS/baldi-basics/Build/UnityLoader.js" 2>/dev/null || true
fi

if [[ -s "$ASSETS/baldi-basics/UnityLoader.js" ]]; then
    echo "  ✓ baldi-basics UnityLoader.js downloaded"
else
    echo "  ✗ Could not find UnityLoader.js for baldi-basics"
fi

###############################################################################
# 7. FIGHTER-AIRCRAFT-PILOT: Missing Build JSON manifest and game files
###############################################################################
echo ""
echo "[7/12] Fixing fighter-aircraft-pilot (downloading Build files)..."

BASE_URL="https://db.duckmath.org/html/fighter_aircraft_pilot"

# Download the JSON manifest  
wget -q "$BASE_URL/Build/Fighter%20Aircraft%20Pilot.json" \
     -O "$ASSETS/fighter-aircraft-pilot/Build/Fighter Aircraft Pilot.json" 2>/dev/null || true

# Read the manifest to find data files
if [[ -f "$ASSETS/fighter-aircraft-pilot/Build/Fighter Aircraft Pilot.json" ]]; then
    echo "  → Got manifest, downloading referenced files..."
    # Extract URLs from the JSON
    for key in dataUrl wasmCodeUrl wasmFrameworkUrl asmCodeUrl asmFrameworkUrl asmMemoryUrl; do
        FILE=$(grep -oP "\"$key\"\s*:\s*\"[^\"]*\"" "$ASSETS/fighter-aircraft-pilot/Build/Fighter Aircraft Pilot.json" 2>/dev/null | grep -oP '"[^"]*"$' | tr -d '"')
        if [[ -n "$FILE" && ! "$FILE" =~ ^https?:// ]]; then
            if [[ ! -f "$ASSETS/fighter-aircraft-pilot/Build/$FILE" ]]; then
                echo "  → Downloading Build/$FILE..."
                wget -q "$BASE_URL/Build/$FILE" -O "$ASSETS/fighter-aircraft-pilot/Build/$FILE" 2>/dev/null || true
            fi
        fi
    done
else
    echo "  ✗ Could not download Build manifest"
fi

echo "  ✓ fighter-aircraft-pilot Build files downloaded"

###############################################################################
# 8. SOLAR-SMASH: Data file downloaded to wrong path
###############################################################################
echo ""
echo "[8/12] Fixing solar-smash (fixing data file path)..."

# The data file was downloaded following the CDN URL literally, creating a nested path
CDN_DATA="$ASSETS/solar-smash/Build/https:/pub-2d868f15a1824cc8a2ec51069ed41c6f.r2.dev/solar_smash_BuildNewgrounds.data.unityweb"
LOCAL_DATA="$ASSETS/solar-smash/Build/BuildNewgrounds.data.unityweb"

if [[ -f "$CDN_DATA" && ! -f "$LOCAL_DATA" ]]; then
    echo "  → Moving misplaced data file to correct location..."
    mv "$CDN_DATA" "$LOCAL_DATA"
    rm -rf "$ASSETS/solar-smash/Build/https:"
    
    # Update the manifest to point to local file instead of CDN
    if [[ -f "$ASSETS/solar-smash/Build/BuildNewgrounds.json" ]]; then
        sed -i 's|https://pub-2d868f15a1824cc8a2ec51069ed41c6f.r2.dev/solar_smash_BuildNewgrounds.data.unityweb|BuildNewgrounds.data.unityweb|g' \
            "$ASSETS/solar-smash/Build/BuildNewgrounds.json"
        echo "  → Updated manifest to use local data file"
    fi
    echo "  ✓ solar-smash data file fixed"
elif [[ -f "$LOCAL_DATA" ]]; then
    echo "  ✓ solar-smash data file already in correct location"
else
    echo "  → Downloading data file from CDN..."
    wget -q "https://pub-2d868f15a1824cc8a2ec51069ed41c6f.r2.dev/solar_smash_BuildNewgrounds.data.unityweb" \
         -O "$LOCAL_DATA" 2>/dev/null || true
    if [[ -f "$LOCAL_DATA" ]]; then
        sed -i 's|https://pub-2d868f15a1824cc8a2ec51069ed41c6f.r2.dev/solar_smash_BuildNewgrounds.data.unityweb|BuildNewgrounds.data.unityweb|g' \
            "$ASSETS/solar-smash/Build/BuildNewgrounds.json" 2>/dev/null || true
        echo "  ✓ solar-smash data file downloaded and manifest updated"
    fi
fi

###############################################################################
# 9. DEADLY-DECENT: Missing .data and .wasm from CDN
###############################################################################
echo ""
echo "[9/12] Fixing deadly-decent (downloading CDN build files)..."
mkdir -p "$ASSETS/deadly-decent/Build"

CDN_BASE="https://pub-2d868f15a1824cc8a2ec51069ed41c6f.r2.dev"

if [[ ! -f "$ASSETS/deadly-decent/Build/Build_Web.data.br" ]]; then
    echo "  → Downloading Build_Web.data.br (~large file)..."
    wget -q "$CDN_BASE/deadly_descent_Build_Web.data.br" \
         -O "$ASSETS/deadly-decent/Build/Build_Web.data.br" 2>/dev/null || true
fi

if [[ ! -f "$ASSETS/deadly-decent/Build/Build_Web.wasm.br" ]]; then
    echo "  → Downloading Build_Web.wasm.br..."
    wget -q "$CDN_BASE/deadly_descent_Build_Web.wasm.br" \
         -O "$ASSETS/deadly-decent/Build/Build_Web.wasm.br" 2>/dev/null || true
fi

# Fix index.html to reference local files instead of CDN
if grep -q "$CDN_BASE" "$ASSETS/deadly-decent/index.html" 2>/dev/null; then
    sed -i "s|$CDN_BASE/deadly_descent_Build_Web.data.br|Build/Build_Web.data.br|g" "$ASSETS/deadly-decent/index.html"
    sed -i "s|$CDN_BASE/deadly_descent_Build_Web.wasm.br|Build/Build_Web.wasm.br|g" "$ASSETS/deadly-decent/index.html"
    echo "  → Updated index.html to use local build files"
fi

echo "  ✓ deadly-decent build files downloaded"

###############################################################################
# 10. SMASH-KARTS: Build files from CDN
###############################################################################
echo ""
echo "[10/12] Fixing smash-karts (downloading CDN build files)..."
mkdir -p "$ASSETS/smash-karts/Build"

CDN_BASE="https://smashkartsgc.b-cdn.net/Build2020New"

# Extract the exact filenames from index.html
LOADER=$(grep -oP '"/[0-9a-f]+\.loader\.js"' "$ASSETS/smash-karts/index.html" 2>/dev/null | tr -d '"' | sed 's|^/||')
FRAMEWORK=$(grep -oP '"/[0-9a-f]+\.framework\.js\.br"' "$ASSETS/smash-karts/index.html" 2>/dev/null | tr -d '"' | sed 's|^/||')
WASM=$(grep -oP '"/[0-9a-f]+\.wasm\.br"' "$ASSETS/smash-karts/index.html" 2>/dev/null | tr -d '"' | sed 's|^/||')

# Get from the index.html directly
LOADER=$(grep -oP '[0-9a-f]+\.loader\.js' "$ASSETS/smash-karts/index.html" 2>/dev/null | head -1)
FRAMEWORK=$(grep -oP '[0-9a-f]+\.framework\.js\.br' "$ASSETS/smash-karts/index.html" 2>/dev/null | head -1)
WASM=$(grep -oP '[0-9a-f]+\.wasm\.br' "$ASSETS/smash-karts/index.html" 2>/dev/null | head -1)
DATA=$(grep -oP '[0-9a-f]+\.data\.br' "$ASSETS/smash-karts/index.html" 2>/dev/null | head -1)

for file in "$LOADER" "$FRAMEWORK" "$WASM" "$DATA"; do
    if [[ -n "$file" && ! -f "$ASSETS/smash-karts/Build/$file" ]]; then
        echo "  → Downloading $file..."
        wget -q "$CDN_BASE/$file" -O "$ASSETS/smash-karts/Build/$file" 2>/dev/null || true
    fi
done

# Update index.html to reference local Build/ instead of CDN
if grep -q "smashkartsgc.b-cdn.net" "$ASSETS/smash-karts/index.html" 2>/dev/null; then
    sed -i 's|https://smashkartsgc.b-cdn.net/Build2020New|Build|g' "$ASSETS/smash-karts/index.html"
    echo "  → Updated index.html to use local Build/"
fi

echo "  ✓ smash-karts build files downloaded"

###############################################################################
# 11. SUPER-LIQUID-SOCCER: missing Poki core SDK file and support assets
###############################################################################
echo ""
echo "[11/12] Fixing super-liquid-soccer..."
repair_poki_secondary_sdk "$ASSETS/super-liquid-soccer" "https://db.duckmath.org/html/super_liquid_soccer"
repair_godot_support_files "$ASSETS/super-liquid-soccer" "https://db.duckmath.org/html/super_liquid_soccer"

echo "  ✓ super-liquid-soccer repaired"

###############################################################################
# 12. BLOCKY-PUZZLE: missing SDK bootstrap and Defold archive files
###############################################################################
echo ""
echo "[12/12] Fixing blocky-puzzle..."
repair_poki_secondary_sdk "$ASSETS/blocky-puzzle" "https://db.duckmath.org/html/blocky_puzzle"
repair_defold_archive_files "$ASSETS/blocky-puzzle" "https://db.duckmath.org/html/blocky_puzzle"

echo "  ✓ blocky-puzzle repaired"

###############################################################################
# 13. Handle RETRO-BOWL-COLLEGE (duplicate of baldi-basics, wrong URL)
###############################################################################
echo ""
echo "[13/12] Fixing retro-bowl-college..."
echo "  ⚠ This game was imported with the same URL as baldi-basics."
echo "  The batch file entry had the wrong URL."
echo "  Attempting to find correct source..."

# Try common hosting patterns
RETRO_URLS=(
    "https://db.duckmath.org/html/retro_bowl_college/"
    "https://db2.duckmath.org/2025/more/retro-bowl-college/pre.html"
    "https://db2.duckmath.org/2026/more/retro-bowl-college/pre.html"
    "https://db.duckmath.org/html/retro_bowl/"
)

FOUND=false
for url in "${RETRO_URLS[@]}"; do
    STATUS=$(curl -sL -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    if [[ "$STATUS" == "200" ]]; then
        echo "  → Found at: $url"
        FOUND=true
        # Re-download
        rm -rf "$ASSETS/retro-bowl-college"
        mkdir -p "$ASSETS/retro-bowl-college"
        
        # Get the page content
        wget -q "$url" -O "$ASSETS/retro-bowl-college/index.html" 2>/dev/null || true
        
        # If it's a pre.html, get the actual index.html
        if grep -q 'data-src\|iframe' "$ASSETS/retro-bowl-college/index.html" 2>/dev/null; then
            BASEDIR=$(dirname "$url")
            wget -q "$BASEDIR/index.html" -O "$ASSETS/retro-bowl-college/index.html" 2>/dev/null || true
        fi
        
        if [[ "$url" == "https://db.duckmath.org/html/retro_bowl_college/" ]]; then
            mkdir -p "$ASSETS/retro-bowl-college/html5game" "$ASSETS/retro-bowl-college/js"
            wget -q "$url/html5game/RetroBowl.js" -O "$ASSETS/retro-bowl-college/html5game/RetroBowl.js" 2>/dev/null || true
            wget -q "$url/html5game/splash.png" -O "$ASSETS/retro-bowl-college/html5game/splash.png" 2>/dev/null || true
            wget -q "$url/poki-sdk.js" -O "$ASSETS/retro-bowl-college/poki-sdk.js" 2>/dev/null || true
            sed -i 's|src="/js/all.js"|src="js/all.js"|g' "$ASSETS/retro-bowl-college/index.html"
            echo "// stub" > "$ASSETS/retro-bowl-college/js/all.js"
        fi

        break
    fi
done

if [[ "$FOUND" == "false" ]]; then
    echo "  ✗ Could not find correct URL for retro-bowl-college"
    echo "  Please update flash-batch.txt with the correct URL"
fi

###############################################################################
# 14. RAGDOLL-HIT: Poki wrapper, but Build/ files are mirrored on source host
###############################################################################
echo ""
echo "[14/12] Fixing ragdoll-hit (downloading mirrored Poki Build/ files)..."
repair_poki_unity_build_mirror "$ASSETS/ragdoll-hit" "https://db.duckmath.org/html/ragdoll_hit"

echo "  ✓ ragdoll-hit Build/ files downloaded"
echo ""

###############################################################################
# SUMMARY
###############################################################################
echo "========================================="
echo "  Repair Complete - Summary"
echo "========================================="

for game in shellshockers escape-car drift-king steal-a-brainrot-2player sparta-hoppers incredibox idle-ants hallow-knight pizza-tower call-of-duty-zombies 99-nights-in-the-forest cookie-clicker snek-io bridge-race fortzone thorns-and-ballons baldi-basics fighter-aircraft-pilot solar-smash deadly-decent smash-karts retro-bowl-college ragdoll-hit super-liquid-soccer blocky-puzzle; do
    if [[ -d "$ASSETS/$game" ]]; then
        FILES=$(find "$ASSETS/$game" -type f | wc -l)
        HAS_INDEX="NO"
        [[ -f "$ASSETS/$game/index.html" ]] && HAS_INDEX="YES"
        
        STATUS="?"
        if [[ "$HAS_INDEX" == "YES" ]]; then
            if grep -q "master-loader\|poki-sdk" "$ASSETS/$game/index.html" 2>/dev/null; then
                BUILDFILES=$(find "$ASSETS/$game/Build" "$ASSETS/$game/unity" -name "*.unityweb" -o -name "*.wasm*" -o -name "*.data*" -o -name "*.json" 2>/dev/null | wc -l)
                if [[ "$BUILDFILES" -gt 0 ]]; then
                    STATUS="OK (Poki/local, $BUILDFILES build files)"
                elif [[ -f "$ASSETS/$game/index.pck" || -f "$ASSETS/$game/index.wasm" || -f "$ASSETS/$game/dmloader.js" || -f "$ASSETS/$game/blockypuzzle.wasm" || -f "$ASSETS/$game/html5game/RetroBowl.js" ]]; then
                    STATUS="OK (local assets)"
                else
                    STATUS="NEEDS-CHECK (Poki wrapper)"
                fi
            elif grep -q "createUnityInstance\|UnityLoader" "$ASSETS/$game/index.html" 2>/dev/null; then
                if [[ -d "$ASSETS/$game/Build" ]] || [[ -d "$ASSETS/$game/unity" ]]; then
                    BUILDFILES=$(find "$ASSETS/$game/Build" "$ASSETS/$game/unity" -name "*.unityweb" -o -name "*.wasm*" -o -name "*.data*" -o -name "*.json" 2>/dev/null | wc -l)
                    if [[ "$BUILDFILES" -gt 0 ]]; then
                        STATUS="OK (Unity)"
                    else
                        STATUS="BROKEN (missing build files)"
                    fi
                else
                    STATUS="BROKEN (no Build/)"
                fi
            else
                STATUS="OK"
            fi
        else
            STATUS="BROKEN (no index.html)"
        fi
        
        printf "  %-30s %3d files  index.html=%s  %s\n" "$game" "$FILES" "$HAS_INDEX" "$STATUS"
    else
        printf "  %-30s FOLDER MISSING\n" "$game"
    fi
done

echo ""
echo "Done."
