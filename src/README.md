# src/ — Astro rebuild

Sprint 0+ rebuild of the Jeo frontend on Astro + Preact + TypeScript. See
`/root/.claude/plans/look-at-my-website-vivid-flamingo.md` for the full plan.

The legacy site (`index.html`, `app.js`, `styles.css` at the repo root) is the
production deploy. This tree builds alongside it; cutover lands in Sprint 7.

## Layout

```
src/
  layouts/Site.astro            Page shell — head, OG, JSON-LD, theme bootstrap
  pages/
    index.astro                 Homepage (hero, stats, rails, all-games grid)
    flash.astro / retro.astro / new.astro / requested.astro
    faq.astro / about.astro / status.astro / links.astro / make-your-own.astro
    legal/{privacy,terms,cookies,dmca}.astro
    game/[slug].astro           596 SSR detail pages w/ VideoGame schema + breadcrumbs
    play/[slug].astro           596 player routes — iframe + minimal chrome
  components/
    Icon.astro                  Inline Lucide SVG icons (zero JS)
    icons.ts                    Path data + IconName union
    chrome/                     TopBar, Footer, Logo
    discover/                   Hero, StatsStrip, FiltersBar, Rail, GameGrid
    card/                       GameCard
  lib/
    catalog.ts                  Typed wrapper over games_list.json / game_health.json
  scripts/
    grid-runtime.ts             Search / filter / density / lazy-reveal (deferred module)
  styles/
    tokens.css                  Design tokens (colors, type, space, radius, motion)
    reset.css                   Lightweight reset
    chrome.css                  Shared chrome (buttons, chips, status pills)
  assets/brand/                 Logo mark + wordmark SVGs
```

Public-served files (favicons, OG defaults) live in `public/` at the repo root.

## Build

```bash
npm run dev         # Astro dev server with HMR
npm run build       # → dist/ (596 game pages + 11 chrome pages, ~3.7s)
npm run typecheck   # astro check
```

## Notes

- The catalog loader uses `process.cwd()` to find the JSON artifacts. Run
  scripts from the repo root.
- gba/snes/nes types from EmulatorJS normalize to `retro` (see `normalizeType`
  in `lib/catalog.ts`).
- All icons inline as SVG paths from `components/icons.ts` — no Lucide
  runtime, no Font Awesome, no emoji in chrome.
