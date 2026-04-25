# Handoff: Ethanyo downloader + Reset-progress button + Offline account system

This is a single self-contained handoff. Build the three features below into the Jeoweb repo, in the order listed. Each section has acceptance tests at the end — do not move on until they pass.

---

## Repo context you must respect (do not violate)

- Frontend stays vanilla JS / CSS variables. Never add a framework.
- `server.js` uses Node built-ins only (`http`, `fs`, `path`). Do not add deps to it.
- Games live as sibling folders under `Assets/<slug>/`. Each folder needs an HTML entry (`index.html` preferred) and a cover image picked by `scan.js`/`server.js` priority (`logo` > `icon` > `splash` > `thumb` > `thumbnail` > folder name > root images > first image anywhere).
- `games_list.json` and `recently_added.json` are **generated** — you regenerate by running `node scan.js` (or restarting `server.js`). Do not hand-edit them.
- HTML markers the scanner reads: `<!--REQUESTED GAME-->`, `<!--GAME BROKEN-->`. Type is **inferred**, not declared (presence of `.swf`, `EJS_pathtodata`, etc.).
- Status authority order in the frontend: `maintenance_status.json` > `scan_results.json` > `games_list.json` `status` field. Do not bypass.
- New scripts get an entry in `scripts-index.txt`.
- Existing imports of these same games (balatro, amongus, brawl, etc.) are **broken** — they used a flat site-mirror that captured every third-party domain (`a.poki.com`, `accounts.google.com`, `ad-delivery.net`, …) and the cover paths point to the wrong game's logo (`balatro/_archived_site/ethanyo.freetls.fastly.net/misc/twitchtetris/logo.png`). The new downloader must produce a clean per-game folder, not a flat mirror, and must resolve the correct cover from the source. Plan to overwrite these folders.

---

## URL shapes you will be given

The user drops URLs into `games.txt` (one per line, `#` comments allowed). Two shapes appear:

1. **Wrapper page** — `https://ethanyo.freetls.fastly.net/misc/play/?title=Balatro&author=LocalThunk&link=balatro`
   - Query params: `title` (display name), `author` (credit), `link` (slug used to resolve the actual game directory on the host).
   - The wrapper page loads the real game from a path keyed off `link` (typically `/misc/play/<link>/` or `/misc/<link>/`). You must fetch the wrapper, parse it, and follow whatever it embeds (iframe, script-loaded path, etc.) — do not hardcode the resolution.

2. **Direct page** — `https://ethanyo.freetls.fastly.net/misc/play/astrosurvivor.html` or `https://ethanyo.freetls.fastly.net/misc/brawl/index.html`
   - Treat as the entry HTML; slug is the filename stem (`astrosurvivor`) or the parent folder name (`brawl`) — prefer the parent folder when it isn't `play`.

The slug you produce is the folder name under `Assets/`. Sanitize: lowercase, `[a-z0-9-]` only, collapse runs of `-`.

---

## Feature 1 — `scripts/ethanyo-downloader.js`

A Node + Puppeteer script that takes a URL (or `--batch games.txt`) and produces a fully offline-playable game folder under `Assets/<slug>/`.

### Requirements

- **Single canonical script.** Do not duplicate `deep-asset-scraper.js` — call into it if helpful, but the entry point and CLI must be `scripts/ethanyo-downloader.js`. Add `npm run ethanyo:import` (single URL) and `npm run ethanyo:batch` (reads `games.txt`) to `package.json`.
- **Resolve URL → entry → asset graph** by actually loading the page in headless Chromium (Puppeteer). Intercept every network request (HTML, JS, CSS, images, fonts, audio, video, JSON, WASM, `.unityweb`, `.data`, `.mem`, `.pck` for Godot, `.bundle`, source maps off). Save each response to disk under `Assets/<slug>/` mirroring the URL path **relative to the host root**, e.g. `https://ethanyo.freetls.fastly.net/misc/play/balatro/main.js` → `Assets/balatro/misc/play/balatro/main.js`.
- **Rewrite absolute URLs** in saved HTML/JS/CSS to repo-relative paths so the game loads from `file://` / the local server with the network disabled. Strip `<base href>` if present, or rewrite it.
- **Wrapper resolution** for `?link=X` URLs: load the wrapper, wait for `networkidle0` (cap 30s), then identify the game frame by finding the largest `<iframe>` or the `<canvas>`-bearing document. Persist the resolved entry as `Assets/<slug>/index.html` — either the rewritten wrapper or a thin shim that `location.replace`s into the resolved file. The shim style already used in `Assets/balatro/index.html` is fine; just point it at the right inner file.
- **Cover image** must be the *game's own* logo, not another game's. Look for, in order:
  1. `<meta property="og:image">` on the wrapper page.
  2. `<link rel="icon">` / `apple-touch-icon` on the resolved game page.
  3. The largest image (`> 64px` on both axes) loaded from the same path prefix as the game (`/misc/play/<link>/…` or `/misc/<slug>/…`). Reject images from `/misc/twitchtetris/`, `/misc/play/`'s shared assets, ad domains, or any domain other than `ethanyo.freetls.fastly.net`.
  4. If none qualifies, leave no cover and write `cover_status: "needs_review"` into the manifest — `scan.js` will fall back to its priority logic, but you should also append the slug to `needs_review_games.txt`.
  Save the cover as `Assets/<slug>/logo.<ext>` so `scan.js`'s `logo` priority picks it up first.
- **Block third-party domains** during capture. Allowlist exactly: `ethanyo.freetls.fastly.net`. Anything else gets `request.abort()`. This avoids the `a.poki.com` / `accounts.google.com` / `ad-delivery.net` mess that polluted the previous imports. If the game genuinely needs a third-party file, log it to `Assets/<slug>/_external_blocked.txt` so a human can decide.
- **Drive the game** for ~15s after `networkidle0`: scroll, click center of canvas, send `Space`, `ArrowRight`, `Enter`, `KeyZ`, `KeyX`. This forces lazy-loaded chunks (Unity bundles, music, level packs) to register so they get captured. Configurable via `--play-seconds N`.
- **Manifest** at `Assets/<slug>/import_manifest.json`:
  ```json
  {
    "slug": "balatro",
    "title": "Balatro",
    "author": "LocalThunk",
    "source_url": "https://ethanyo.freetls.fastly.net/misc/play/?title=Balatro&author=LocalThunk&link=balatro",
    "resolved_entry_url": "https://ethanyo.freetls.fastly.net/misc/play/balatro/index.html",
    "launcher": "Assets/balatro/index.html",
    "entry_file": "Assets/balatro/misc/play/balatro/index.html",
    "cover": "Assets/balatro/logo.png",
    "captured_assets": 142,
    "blocked_third_party": 7,
    "failed_requests": 0,
    "play_seconds": 15,
    "downloader_version": "ethanyo@1",
    "timestamp": 1777064262
  }
  ```
- **Idempotent + resumable.** If `Assets/<slug>/import_manifest.json` exists and `--force` is not passed, skip. With `--force`, wipe the folder first. Honor `--resume` for batch mode by skipping completed slugs.
- **Logging.** Print one summary line per game (`✓ balatro — 142 assets, 0 failed, cover ok`) and write a JSONL append-log at `ethanyo_import_log.jsonl`.
- **CLI**:
  ```
  node scripts/ethanyo-downloader.js <URL>
  node scripts/ethanyo-downloader.js --batch games.txt
  node scripts/ethanyo-downloader.js --batch games.txt --resume
  node scripts/ethanyo-downloader.js <URL> --force --play-seconds 30
  ```

### After the import runs

- Run `node scan.js` to regenerate `games_list.json` and `recently_added.json`.
- Run `python broken_game_scanner.py --resume` against the new slugs to confirm offline readiness; expected outcome is each new slug ends up in `working_games.txt` with no entries in `broken_games.txt`.
- Update `scripts-index.txt` with a one-line entry for the new script.

### Acceptance tests for Feature 1

1. `Assets/balatro/`, `Assets/amongus/`, `Assets/brawl/`, `Assets/cookie/`, `Assets/crossyroad/`, `Assets/geometrydash/`, `Assets/subwaysurfers/`, `Assets/templerun2/` each contain a `logo.*` file that visually matches the right game (no twitchtetris bleed). Spot-check the rendered card on `index.html`.
2. None of the new game folders contain a directory named `accounts.google.com`, `a.poki.com`, `ad-delivery.net`, or any non-`ethanyo.freetls.fastly.net` host directory.
3. Disconnect network (`sudo ip link set <iface> down` in a sandbox, or use the Chaos Monkey quarantine server) and load each game through `npm start`. Each game must reach a playable state with zero failed network requests (DevTools Network tab — Failed: 0).
4. `games_list.json` after `node scan.js` includes each slug with the right `cover`, `title`, and inferred `type` (`webgl` for these — none should be misclassified as `flash` or `retro`).
5. Re-running `npm run ethanyo:batch -- --resume` on the same `games.txt` is a no-op (prints "skipped" for every slug).

---

## Feature 2 — Per-game "Reset progress?" button

A button in the game-card overlay that wipes that game's `localStorage` / `IndexedDB` / `sessionStorage` state without touching the user's account or other games. It must be impossible to trigger by accident.

### Where it lives

- The card's existing **Play** button stays where it is. Add a small secondary control in the card's expanded/hover state — e.g. a kebab menu button that opens a tiny popover with one item: **"Reset progress…"** (note the ellipsis — signals it opens a confirm step, doesn't act immediately).
- After clicking **Play** and the game iframe is open, also expose the same control from the in-app launcher chrome (the toolbar that already wraps games via `scripts/game-launcher.js` / `scripts/launcher-hooks.js`). Same behavior, same confirm flow.

### Anti-misclick design

- One click opens a modal, not a destructive action.
- Modal copy: **"Reset progress for *{Game Title}*?"** with body text: "This deletes saves, settings, and unlocks for this game only. Other games and your account are not affected. This cannot be undone."
- Two buttons: **Cancel** (default, autofocused, `Esc` closes) and **Reset progress** (destructive style — red, requires the user to type the word `RESET` into a text input before the button enables). The button stays disabled until the input matches `RESET` exactly (case-sensitive).
- After confirm, show a 5-second toast with **Undo** (restores from a snapshot taken just before the wipe; snapshot lives in `localStorage` under `jeo:reset-undo:<slug>` and auto-expires after 60s).

### What "reset" actually deletes

For a game with slug `S`:
1. Every `localStorage` key matching `^jeo:game:${S}:`, `^game:${S}:`, or that the game itself wrote (see below).
2. Every `sessionStorage` key under the same prefixes.
3. Every IndexedDB database whose name starts with `S` or `jeo-${S}` (enumerate via `indexedDB.databases()` where supported, otherwise iterate a known list).
4. Cache Storage entries scoped to the game's path (`/Assets/${S}/…`) — call `caches.keys()`, then for each `caches.open(k).then(c => c.keys())`, delete entries whose URL contains `/Assets/${S}/`.
5. Cookies set on the game's path (`document.cookie` with `path=/Assets/${S}/`).
6. The per-slug entry inside the account blob (Feature 3) — `account.progress[S] = undefined`, then re-save the encrypted blob.

Because games run inside the launcher iframe, the reset must execute **inside the iframe's origin** (same-origin since it's all served from this host). Send a `postMessage({ type: 'jeo:reset-progress', slug: S })` from the launcher chrome; the launcher page (top frame) handles same-origin storage; the iframe handles its own `localStorage` / IndexedDB. Wait for an `ack` message before showing the success toast.

### Snapshot for Undo

Before deleting, serialize all matching keys/databases into a single object and stash it at `localStorage['jeo:reset-undo:' + slug] = { ts, data }`. On Undo, restore and clear the snapshot key. After 60s, auto-clear with `setTimeout`.

### Acceptance tests for Feature 2

1. Open Cookie Clicker, accumulate cookies, close the iframe, reopen — progress persists. Hit reset (with confirm), reopen — fresh start.
2. Reset balatro does not clear cookie clicker, geometrydash, or any account-level data (avatar, theme, favorites).
3. The reset button cannot be triggered with a single click anywhere in the UI — verified by clicking through the entire flow with a mouse-only macro that doesn't type.
4. Pressing **Esc** at any point in the modal cancels safely.
5. The Undo toast restores the previous state if clicked within 60s; after 60s, the snapshot is gone.
6. When logged in, after a reset the encrypted account blob no longer contains the per-game progress for that slug. (Verify by exporting the blob, base64-decoding, decrypting locally.)

---

## Feature 3 — Fully offline account system

A login + signup flow that never talks to a server. The "account" is a single encrypted blob the user keeps as text or a file. Pasting it (or uploading the file) restores everything: progress in every game, theme/accent/layout, avatar image, display name, favorites, custom settings.

### Pages

- `login.html` — paste-or-upload to sign in.
- `signup.html` — pick a display name, pick/upload an avatar, choose a passphrase, get the encrypted blob back to save.
- Both reuse `styles.css` variables for theme. No framework. Layout is a centered card on mobile, two-column hero+form on desktop.
- A header element ("Account" pill in the top nav of `index.html`) shows current login state. Clicking it opens a small menu: **Profile**, **Export account**, **Sign out**. When signed out it shows **Sign in** / **Create account**.

### How the blob works

- The encrypted blob format is: `jeo1.<base64url-iv>.<base64url-ciphertext>`.
  - `jeo1` is the version tag (bump to `jeo2` on any breaking format change).
  - Encryption: `AES-GCM` 256-bit via `window.crypto.subtle`.
  - Key derivation: `PBKDF2-SHA256`, 250,000 iterations, 16-byte random salt **prepended to the ciphertext before base64-ing** (so ciphertext is `salt || gcm-output`). The IV is 12 bytes, separately encoded as the middle segment.
  - Plaintext is JSON, schema below.
- The user enters a **passphrase** to derive the key. The passphrase is never stored. If they lose it, the blob is unrecoverable — make this *very* clear on signup with a confirm-passphrase step and a checkbox: **"I understand that if I lose this passphrase, my progress cannot be recovered."**
- For convenience, on the *current device only*, after a successful login we store the derived key in `IndexedDB` (`jeo-account` DB, `keys` store) wrapped with a device-bound key generated via `crypto.subtle.generateKey({name:'AES-GCM', length:256}, false, …)` and stored as a `CryptoKey` object (non-extractable). This lets the user reopen the tab without re-entering the passphrase, while keeping the raw key off disk in a recoverable form. Sign-out wipes this.

### Plaintext JSON schema

```json
{
  "schema": "jeo-account/1",
  "createdAt": 1777000000,
  "updatedAt": 1777060000,
  "profile": {
    "displayName": "Jeova",
    "avatar": {
      "kind": "image" ,           // or "initials"
      "mime": "image/png",
      "dataUrl": "data:image/png;base64,…"   // capped at 256 KB after resize
    },
    "accentColor": "#7c5cff",
    "theme": "dark",              // matches theme-manager.js
    "layout": "grid"              // matches existing layout toggle
  },
  "preferences": {
    "hideMaintenance": true,
    "favorites": ["balatro","cookie"],
    "recents": [{"slug":"cookie","ts":1777060000}],
    "tabCloak": {"title":"Google Drive","favicon":"/cloaks/drive.png"}
  },
  "progress": {
    "cookie":   { "ts": 1777060000, "snapshot": { /* mirror of game's localStorage keys */ } },
    "balatro":  { "ts": 1777055000, "snapshot": { /* … */ } }
  }
}
```

- `progress[slug].snapshot` is a flat object of key→value pairs the game wrote to its own storage. Because the game runs same-origin in an iframe, the launcher can read those keys directly. Capture only keys matching the per-slug prefixes from Feature 2 — never read every key on the origin (would leak between users on a shared device).

### Sync behavior

- On login: decrypt blob → restore `localStorage` keys for each slug → restore profile + preferences → set `accent`/`theme`/`layout` via existing `theme-manager.js` setters → set avatar + name in the header.
- On any change (game progress, favorite toggled, theme switched, avatar uploaded): debounce 5s, then re-serialize, re-encrypt (need the unwrapped key in memory), and update the local copy. Show a small "Saved" pip in the header on successful update.
- **Auto-saved blob** lives at `localStorage['jeo:account:blob']` so a refresh restores without prompting. The user can still **Export** at any time to copy the current blob or download it as `jeo-account-<displayName>-<YYYYMMDD>.txt`.
- On sign-out: clear the device-bound key, clear the in-memory key, clear `jeo:account:blob`, and reload `index.html` so the UI returns to the signed-out default. Game-level `localStorage` keys are **not** cleared on sign-out (they persist as the device's anonymous state) — make this explicit in the Sign-out confirm dialog with a checkbox: **"Also clear all game progress on this device."** (default off).

### Signup page UX

- Step 1: **Display name** (1–24 chars).
- Step 2: **Avatar** — three options side by side: upload image (drag-and-drop, auto-cropped square, downscaled to 256×256, encoded as PNG data URL ≤ 256 KB), pick from a built-in gallery (8 placeholders under `assets/avatars/`), or initials-on-color (auto-generated from display name).
- Step 3: **Customization** — accent color picker (hex input + 8 swatches), theme (light/dark/auto), layout (grid/list).
- Step 4: **Passphrase** — input + confirm input + strength meter (zxcvbn-lite, inline; no external dep — implement a 60-line scorer based on length, character classes, and a small common-passwords blocklist). Require ≥10 chars. Confirm checkbox about lossy passphrase.
- Step 5: **Your account is ready** — show the blob in a `<textarea readonly>` with **Copy** and **Download as file** buttons. Big notice: "Save this somewhere safe. Without it (or your passphrase), you can't sign in on another device."
- After save, drop the user into `index.html` already logged in.

### Login page UX

- Two tabs: **Paste blob** (textarea + passphrase) and **Upload file** (drop zone + passphrase). Both call the same decrypt path.
- "Forgot passphrase?" link expands an explainer that says recovery is impossible by design and links to **Create account** instead.
- After a successful decrypt: redirect to `index.html` with the account hydrated.
- Failure modes: wrong passphrase → "Couldn't decrypt — wrong passphrase or corrupted blob." (don't leak which). Malformed blob → "That doesn't look like a Jeoweb account blob." Throttle: after 5 wrong tries in a row, add a 2s delay per attempt that doubles up to 30s. (No server, so this is a per-tab throttle — accept the limitation.)

### Header integration on `index.html`

- Show avatar (image or initials chip) + display name + a small chevron. Clicking opens the menu.
- When signed out, show a single **Sign in** button that links to `login.html`.

### Files you will add

- `login.html`, `signup.html`
- `styles/account.css` (loaded by both pages and by `index.html`)
- `scripts/account.js` — the public API: `signIn(blob, passphrase)`, `signUp(profile, passphrase)`, `exportBlob()`, `signOut(opts)`, `onChange(cb)`, `captureGameProgress(slug)`, `restoreGameProgress(slug)`. Browser-only; no Node deps.
- `scripts/account-crypto.js` — thin wrapper around `window.crypto.subtle` for the encrypt/decrypt/derive routines. Must be standalone and unit-testable.
- `scripts/account-ui.js` — the header chip + menu, the signup wizard, the login forms.
- `assets/avatars/` — 8 PNGs.

### Acceptance tests for Feature 3

1. Sign up → land on `index.html` logged in. Avatar + name show in the header.
2. Play Cookie Clicker for 30s, accumulate cookies. **Export account**, copy the blob. Open a fresh incognito window, go to `login.html`, paste the blob + passphrase. Cookie Clicker reopens with the same cookie count.
3. Same as (2) but using the **Download as file** path, then **Upload file** on login.
4. Wrong passphrase → friendly error, no stack trace, no blob contents leaked.
5. Modifying the blob (flip one base64 char) → "doesn't look like a Jeoweb account blob" or "couldn't decrypt", never a JS exception bubbling to console.
6. Theme/accent/layout/avatar all persist across the export-import round trip.
7. Sign out without the optional checkbox keeps anonymous progress; sign out *with* the checkbox wipes everything Feature-2-style for every slug present in `progress`.
8. After 5 wrong attempts, the 6th attempt is delayed by ≥2s.
9. Network tab during sign-up and login shows zero outbound requests beyond same-origin asset fetches. Disable Wi-Fi and confirm both flows still work.
10. Reset-progress (Feature 2) on a game while logged in updates the blob within 5s (debounced save) — verified by re-exporting and decrypting.

---

## Order of operations

1. **Feature 1 first.** You need the games actually playable offline before the account system has anything to save.
2. **Feature 2 second.** It's narrow, exercises the same-origin storage paths the account system needs, and provides a useful fallback before accounts ship.
3. **Feature 3 last.** It depends on the per-slug capture/restore primitives Feature 2 introduces.

After all three: regenerate `games_list.json` (`node scan.js`), update `scripts-index.txt`, and add a section to `OPERATIONS.md` describing the account format (blob version, schema version, migration policy: never break older blobs without a `jeo1 → jeo2` migrator).

---

## Things to *not* do

- Don't introduce a build step, bundler, framework, or a server-side account store.
- Don't fetch from any third-party CDN at runtime — the goal is full offline.
- Don't hand-edit `games_list.json` or `recently_added.json` — let `scan.js` produce them.
- Don't store the user's passphrase or the unwrapped CryptoKey in plain `localStorage` / `sessionStorage`. The device-bound wrapper goes in IndexedDB as a non-extractable `CryptoKey` object only.
- Don't add a "remember me" toggle — the device-bound key already serves that role, and the explicit toggle invites users to think there's a server-side session.
- Don't let the reset-progress button be reachable from a single click anywhere in the UI.
- Don't repeat the previous import's mistakes — no flat site mirrors, no cross-game cover bleed, no captured ad/auth domain folders inside `Assets/<slug>/`.
