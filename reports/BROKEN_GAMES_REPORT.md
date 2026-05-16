# Broken Games Report
**Generated:** 2026-05-16  
**Run by:** Automated maintenance assistant  
**Catalog size:** 580 games (post-fix)

---

## Summary of Fixes Applied This Run

| Fix | Items |
|-----|-------|
| Created GBA emulator wrapper (index.html) | batman-rise-of-sin-tzu, pokemon-water-blue, zelda-sacred-paradox |
| Created redirect wrapper for .htm game | fake-cup-head |
| Regenerated games_list.json | +4 games added (576 → 580) |

---

## Critical Issue — ROM File is 0 Bytes (Requires Manual Re-download)

**`dragon-ball-advanced-adventure`** — The ROM file `Dragon Ball - Advanced Adventure (USA).zip` is **0 bytes**.  
The game has a valid `index.html` emulator wrapper but will fail at runtime because the ROM is empty.  
The `.offline-manifest.json` records it as `required: false` (size 0), so CI does not fail, but the game is unplayable.

**Action required:** Re-download the ROM from a trusted source and replace `Assets/dragon-ball-advanced-adventure/Dragon Ball - Advanced Adventure (USA).zip`.  
After replacement, run: `node scripts/build-offline-manifest.js --slug dragon-ball-advanced-adventure`

---

## Incomplete WebGL Imports — Missing Unity Game Bundle (13 games)

These folders contain Unity WebGL support files (draco decoder, ammo physics WASM, font) but are missing the main game bundle files (`.data`, `.framework.js`, `.loader.js`, `.wasm`). They cannot be played and are **not registered in games_list.json**. A full re-import from the original source is required.

| Slug | Files Present | Missing |
|------|--------------|---------|
| animal-craft | draco_decoder.js, draco_decoder.wasm, draco_wasm_wrapper.js, lib/ammo.wasm.js, logo.jpg | index.html, Build/*.data, Build/*.framework.js |
| arcade-tennis | same as above | same |
| bat-smash | same as above | same |
| brain-lines | same as above | same |
| car-chaos | same as above | same |
| cat-and-granny | same as above | same |
| chase-run | same as above | same |
| city-brawl | same as above | same |
| cowboy-safari | same as above | same |
| dancing-beat | same as above | same |
| deer-adventures | same as above | same |
| sprinter | draco + ruffle.js (no HTML) | index.html, Build bundle |
| 1v1space | favicon.ico only | Everything |

**Action required:** Re-run the original importer (`npm run grab` or `python3 import_game_from_url.py`) for each slug, or use `npm run recover -- <slug>` to attempt automated recovery.

---

## Non-Game Utility Folders in Assets/ (3 items)

These folders exist under `Assets/` but are not games. They are correctly excluded from `games_list.json` because they have no `index.html`. No action required, but they generate noise in health scanners.

| Folder | Contents | Notes |
|--------|----------|-------|
| `promo/` | promo.js | Promotional assets |
| `scripts/` | game.js | Utility scripts |
| `zzruffle/` | Ruffle JS engine files | Vendored Ruffle library |

---

## Broken Games With Existing HTML (40 games — tracked by recovery engine)

These games have `index.html` files but are flagged `broken` in `game_health.json` (verdict: `static_fail` or `force_maintenance`). The automated recovery engine (`scripts/recover-game.js`) attempts nightly repairs. Recent nightly runs timed out without successful recoveries.

Games flagged `force_maintenance` (manually overridden in `maintenance_overrides.json`):
- `99-nights-in-the-forest`, `amongus`, `subwaysurfers`

Games flagged `static_fail` (broken content/broken CDN links):

| Slug | Notes |
|------|-------|
| 0v0 | Static health fail |
| Dogeminer2 | Static health fail |
| amazing-rope-police | Static health fail |
| among-us | Static health fail |
| angelunder | Static health fail |
| angry-bird | Static health fail |
| aqua-park | Static health fail |
| aquapark-slides | Static health fail |
| astray | Static health fail |
| btd3 | Static health fail |
| capybara-clicker | Static health fail |
| chess | `<!--GAME BROKEN-->` marker present in HTML |
| chicken-jockey-clicker | Static health fail |
| chill-guy-clicker | Static health fail |
| cluster-rush | Static health fail |
| cookie-clicker | Static health fail |
| core-ball | Static health fail |
| ctr | Static health fail |
| ctr-holiday | Static health fail |
| ctr-tr | Static health fail |
| fighter-aircraft-pilot | Static health fail |
| fishing.io | Static health fail |
| hangman | Static health fail |
| highway | Static health fail |
| hole.io | Static health fail |
| jelly-truck | Static health fail |
| motox3m | Static health fail |
| n-gon | Static health fail |
| ns-shaft | Static health fail |
| push-your-luck | Static health fail |
| race-survival-arena-king | Static health fail |
| smash-karts | Static health fail |
| snowbattle | Static health fail |
| sort-the-court | Static health fail |
| steal-a-brainrot | Static health fail |
| superhot | Static health fail |
| twerk-race-3d | Static health fail |

**Action required:** Run `npm run recover -- <slug>` per game, or `npm run recover:all` for batch recovery. Review `reports/recovery_cooldown.json` for backoff status.

---

## JSON File Health

| File | Status | Notes |
|------|--------|-------|
| games_list.json | ✓ Valid | 580 games after this run's fixes |
| recently_added.json | ✓ Valid | 30 entries, all folders exist on disk |
| qa_baseline.json | ✓ Valid | baseline: 69 broken |
| recovery_sources.json | ✓ Valid | 30 sources configured |
| game_health.json | ✓ Valid | Schema 2, 604 entries (includes stale junk entries for `.quarantine`, `.recovery`, `1`, `9007199254740992`) |
| maintenance_overrides.json | ✓ Valid | 19 force_healthy, 8 force_maintenance |

**Note on stale health entries:** `game_health.json` contains entries for non-game slugs: `.quarantine`, `.recovery`, `1`, `9007199254740992`, `cookie`, `crossyroad`, `geometrydash`, `index`, `templerun2`. These should be removed from health tracking by re-running `node scripts/build-game-health.js` after the recovery engine cleans up.
