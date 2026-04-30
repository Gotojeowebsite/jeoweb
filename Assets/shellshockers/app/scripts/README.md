# Build Scripts

## Workflow

```
1. python sync.py
2. bash makeShell.sh $(git rev-parse --short HEAD)
3. git add -A && git commit -m "BUILD shell"
4. python update-build.py
5. git add -A && git commit -m "UPDATE build"
```

## Scripts

### `makeShell.sh <short-hash>`
Prepares `index.html` for CDN delivery:
- Injects `window.JSCDN` and `checker.js` script tags
- Strips unwanted meta tags, `<title>`, and `<script type="application/ld+json">`
- Rewrites asset paths to use jsDelivr CDN via `cdnSearchReplace.js`

Run from the `app/scripts/` directory.

### `update-build.py`
Updates the commit hash after committing:
- Replaces the old hash with the new hash in all CDN URLs in `index.html`
- Updates `build.json` with the new hash and increments the build number

Supports `--dry-run` to preview changes.

### `cdnSearchReplace.js`
Called by `makeShell.sh`. Rewrites relative asset paths (js, css, images, etc.) to CDN URLs in `index.html`.
