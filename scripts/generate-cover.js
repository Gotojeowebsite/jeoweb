#!/usr/bin/env node
// Generates a clean gradient SVG cover for a slug that's missing one.
// Deterministic palette derived from the slug name so the same game always
// gets the same colors. Writes Assets/<slug>/logo.svg, which scan.js picks up
// by priority name.
//
// Usage:
//   node scripts/generate-cover.js <slug> [<displayName>]
//   node scripts/generate-cover.js --all-missing      (scans recently_added.json + games_list.json)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'Assets');

const PALETTES = [
  ['#7a5cff', '#22d3ee'], ['#ff6b9d', '#7a5cff'], ['#22c55e', '#0ea5e9'],
  ['#f59e0b', '#ef4444'], ['#06b6d4', '#8b5cf6'], ['#ec4899', '#f43f5e'],
  ['#10b981', '#3b82f6'], ['#f97316', '#dc2626'], ['#a78bfa', '#22d3ee'],
  ['#facc15', '#fb7185'], ['#14b8a6', '#6366f1'], ['#fb923c', '#a855f7'],
];

function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }

function pickPalette(slug) { return PALETTES[hash(slug) % PALETTES.length]; }

function prettyName(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

function svgFor(slug, displayName) {
  const [c1, c2] = pickPalette(slug);
  const title = displayName || prettyName(slug);
  const initials = title.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  // size title to fit
  const titleSize = title.length > 18 ? 36 : title.length > 12 ? 46 : 56;
  const wrappedTitle = title.length > 22
    ? title.slice(0, 22).trimEnd() + '…'
    : title;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
      <stop offset="60%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.45)"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <g opacity="0.18" fill="#fff">
    <circle cx="80" cy="80" r="42"/>
    <circle cx="430" cy="120" r="28"/>
    <circle cx="60" cy="430" r="24"/>
    <circle cx="450" cy="430" r="60"/>
  </g>
  <rect width="512" height="512" fill="url(#vignette)"/>
  <text x="50%" y="46%" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Inter,Helvetica,Arial,sans-serif"
        font-size="180" font-weight="800" fill="rgba(255,255,255,0.18)" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  <text x="50%" y="78%" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Inter,Helvetica,Arial,sans-serif"
        font-size="${titleSize}" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="middle">${escapeXml(wrappedTitle)}</text>
</svg>`;
}

function escapeXml(s) {
  return String(s).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));
}

function writeCover(slug, displayName) {
  const dir = path.join(ASSETS, slug);
  if (!fs.existsSync(dir)) {
    console.error(`skip ${slug}: no Assets/${slug}/ folder`);
    return false;
  }
  const out = path.join(dir, 'logo.svg');
  fs.writeFileSync(out, svgFor(slug, displayName));
  console.log(`wrote ${path.relative(ROOT, out)}  "${displayName || prettyName(slug)}"`);
  return true;
}

function findMissing() {
  const need = new Set();
  for (const f of ['recently_added.json', 'games_list.json']) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    const list = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const g of list) {
      const img = g.image || g.cover || '';
      const slug = g.name || g.slug;
      if (!slug) continue;
      const folder = path.join(ASSETS, slug);
      if (!fs.existsSync(folder)) continue;
      // already has a real logo.* at root?
      const hasGoodLogo = ['logo.svg','logo.png','logo.jpg','logo.jpeg','logo.webp']
        .some(n => fs.existsSync(path.join(folder, n)) && fs.statSync(path.join(folder, n)).size > 1500);
      if (hasGoodLogo) continue;
      // current cover broken/placeholder?
      const broken = !img
        || img.includes('img/no.webp')
        || img === 'notavailable.svg'
        || (() => { const p2 = path.join(ROOT, img); return !fs.existsSync(p2) || fs.statSync(p2).size < 2000; })();
      if (broken) need.add(slug);
    }
  }
  return [...need];
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('usage: generate-cover.js <slug> [displayName]   |   --all-missing');
    process.exit(1);
  }
  if (args[0] === '--all-missing') {
    const missing = findMissing();
    console.log(`generating covers for ${missing.length} games:`);
    for (const slug of missing) writeCover(slug);
    return;
  }
  writeCover(args[0], args.slice(1).join(' ') || undefined);
}

main();
