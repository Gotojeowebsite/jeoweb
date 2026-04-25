#!/usr/bin/env node
/* Triage and repair (or hide / delete) broken games in recently_added.json.
 *
 * Categories detected and handled:
 *
 *   EMPTY        index.html is 0 bytes / folder has no playable assets
 *                  → delete the folder
 *
 *   ETHANYO_TRAP root index.html just redirects to _archived_site/.../l.html
 *                  (the bouncing-bars loader page) and the deep
 *                  _archived_site/<host>/misc/<slug>/ has no real index.html
 *                  → mark broken + force_maintenance + rewrite root index
 *                    to a clean "Game unavailable offline" page (no spinner)
 *
 *   REBASEABLE   root redirect points at l.html BUT a real entry exists at
 *                  _archived_site/<host>/misc/<slug>/index.html AND its
 *                  <base href> CDN path is archived locally
 *                  → rewrite root index.html to launch the rebased entry
 *
 *   UNRECOVERABLE_BASE
 *                deep entry exists but its <base href> is to an unarchived
 *                CDN path → mark broken + force_maintenance, friendly stub
 *
 *   PSEUDO_GAME  folder is a recovery / scaffolding folder (e.g. "index")
 *                  → mark broken + force_maintenance (don't delete; it's
 *                    referenced by other tooling)
 *
 *   OK           launcher loads something playable directly
 *
 * Usage:
 *   node scripts/fix-broken-recents.js           # dry run, prints plan
 *   node scripts/fix-broken-recents.js --apply   # execute
 *   node scripts/fix-broken-recents.js --apply --only=brawl,balatro
 *
 * After --apply you must rerun `node scan.js` (the script does this for you).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'Assets');
const RECENTS = path.join(ROOT, 'recently_added.json');
const OVR = path.join(ROOT, 'maintenance_overrides.json');

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const ONLY = (args.find(a => a.startsWith('--only=')) || '').slice('--only='.length).split(',').filter(Boolean);

function read(p, fb) { try { return fs.readFileSync(p, 'utf8'); } catch { return fb; } }
function readJson(p, fb) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fb; } }
function writeJson(p, o) { fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n'); }
function exists(p) { try { return fs.existsSync(p); } catch { return false; } }
function size(p) { try { return fs.statSync(p).size; } catch { return -1; } }
function listdir(p) { try { return fs.readdirSync(p); } catch { return []; } }

function rmrf(target) {
  if (!exists(target)) return;
  try { fs.rmSync(target, { recursive: true, force: true }); }
  catch { execSync(`rm -rf ${JSON.stringify(target)}`); }
}

// Any root index.html that just bounces into _archived_site/ — either to the
// generic l.html loader trap OR to a deep misc/<slug>/index.html — is a stub
// we should re-evaluate (often the deep entry needs <base href> rebasing).
const TRAP_RE = /location\.(replace|href\s*=)\s*\(?\s*['"]_archived_site\/[^'"]+\.html['"]/;
const BASE_RE = /<base\s+href=["']([^"']+)["']/i;

function detectCategory(slug) {
  const folder = path.join(ASSETS, slug);
  if (!exists(folder)) return { cat: 'MISSING' };

  const root = path.join(folder, 'index.html');
  const sz = size(root);

  // PSEUDO_GAME — scaffolding folders we never want to play but shouldn't delete
  if (slug === 'index' || slug === '__shared__') return { cat: 'PSEUDO_GAME' };

  // EMPTY — 0 byte (or trivially small) and no other playable assets
  if (sz === 0) {
    const others = listdir(folder).filter(n => !/^(logo|icon|splash|thumb|thumbnail)\.(svg|png|jpe?g|webp|ico)$/i.test(n) && n !== 'index.html');
    if (others.length === 0) return { cat: 'EMPTY' };
  }

  const html = read(root, '');
  const isTrap = TRAP_RE.test(html);

  // Look for a real entry deeper under _archived_site/<host>/misc/<slug>/index.html
  let deepEntry = null;
  const archive = path.join(folder, '_archived_site');
  if (exists(archive)) {
    for (const host of listdir(archive)) {
      const cand = path.join(archive, host, 'misc', slug, 'index.html');
      if (exists(cand) && size(cand) > 1500) { deepEntry = cand; break; }
      // also check direct host/<slug>/index.html
      const cand2 = path.join(archive, host, slug, 'index.html');
      if (exists(cand2) && size(cand2) > 1500) { deepEntry = cand2; break; }
    }
  }

  if (!isTrap && sz > 200) return { cat: 'OK' };

  // tiny/empty launcher but folder has playable assets and no _archived_site
  // → this is a busted Unity/Flash launcher, not an ethanyo trap. Skip with
  // a distinct category so we don't accidentally hide a recoverable game.
  if (!isTrap) {
    const hasLocalGameAssets = listdir(folder).some(n =>
      /\.(swf|wasm|unityweb|data|pck)$/i.test(n) && size(path.join(folder, n)) > 1024);
    if (hasLocalGameAssets) return { cat: 'BROKEN_LAUNCHER_HAS_ASSETS' };
  }

  if (!deepEntry) return { cat: 'ETHANYO_TRAP' };

  // Inspect deep entry's <base href>
  const deepHtml = read(deepEntry, '');
  const m = deepHtml.match(BASE_RE);
  if (!m) {
    // No base href — assets are relative. Probably loadable directly via iframe.
    return { cat: 'REBASEABLE', deepEntry, baseHref: null, baseLocal: null };
  }
  const baseHref = m[1];
  // try to resolve baseHref against the local archive
  const baseLocal = resolveBaseLocally(folder, baseHref);
  if (baseLocal) return { cat: 'REBASEABLE', deepEntry, baseHref, baseLocal };
  return { cat: 'UNRECOVERABLE_BASE', deepEntry, baseHref };
}

function resolveBaseLocally(folder, baseHref) {
  // baseHref looks like https://cdn.jsdelivr.net/gh/genizy/google-class@main/brawl-3d/
  // Locally that's at folder/_archived_site/cdn.jsdelivr.net/gh/genizy/google-class_main/brawl-3d/
  // (the @ becomes _ in the archived layout)
  let url;
  try { url = new URL(baseHref); } catch { return null; }
  const hostDir = path.join(folder, '_archived_site', url.host);
  if (!exists(hostDir)) return null;
  const archivedPath = url.pathname.replace(/@/g, '_').replace(/^\/+/, '').replace(/\/$/, '');
  const candidate = path.join(hostDir, archivedPath);
  if (exists(candidate) && fs.statSync(candidate).isDirectory()) return candidate;
  // also try without @-substitution
  const candidate2 = path.join(hostDir, url.pathname.replace(/^\/+/, '').replace(/\/$/, ''));
  if (exists(candidate2) && fs.statSync(candidate2).isDirectory()) return candidate2;
  return null;
}

function rewriteDeepEntryWithLocalBase(deepEntry, baseLocalAbs, folder) {
  let html = read(deepEntry, '');
  const deepDir = path.dirname(deepEntry);
  const rel = path.relative(deepDir, baseLocalAbs).replace(/\\/g, '/') + '/';
  html = html.replace(BASE_RE, `<base href="${rel}"`);

  // Also rewrite absolute /assets/... and /img/... refs so they point at the
  // archived ethanyo origin (which sits next to the deep entry under
  // _archived_site/<host>/). Without this, scripts like /assets/js/script.js
  // 404 in offline mode and nothing initializes.
  // The archived host directory is the great-grandparent of the deep entry
  // (deepEntry = _archived_site/<host>/misc/<slug>/index.html → host dir is up 3)
  const hostDir = path.resolve(deepDir, '..', '..', '..');
  if (exists(hostDir)) {
    const hostRel = path.relative(deepDir, hostDir).replace(/\\/g, '/') + '/';
    // src="/assets/..." or href="/assets/..." or '/assets/...' inside scripts
    html = html.replace(/(\s(?:src|href)=["'])\/(assets|img|cdn-cgi)\//gi, `$1${hostRel}$2/`);
    // also catch new URL("/assets/...") style strings
    html = html.replace(/(["'(])\/(assets|img|cdn-cgi)\//g, `$1${hostRel}$2/`);
  }

  fs.writeFileSync(deepEntry, html);
  return rel;
}

function makeUnavailableStub(folder, slug, reason) {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${slug}</title>
<style>
  html,body{margin:0;height:100%;background:#0a0a14;color:#e7e7ee;font-family:system-ui,sans-serif}
  .wrap{display:grid;place-items:center;height:100%;padding:24px;text-align:center}
  h1{font-size:24px;margin:0 0 12px;background:linear-gradient(90deg,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
  p{color:#9aa0b4;max-width:520px;line-height:1.55;font-size:14px}
  code{background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-size:12px}
</style></head>
<body><!--GAME BROKEN--><div class="wrap"><div>
  <h1>${slug} is unavailable offline</h1>
  <p>${reason}</p>
  <p style="margin-top:18px">Run <code>npm run game:import-ethanyo</code> after wiring the network downloader to capture the playable assets, then this game will work.</p>
</div></div></body></html>`;
  fs.writeFileSync(path.join(folder, 'index.html'), html);
}

function makeRebasedLauncher(folder, slug, deepEntryAbs) {
  const rel = path.relative(folder, deepEntryAbs).replace(/\\/g, '/');
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${slug}</title>
<style>html,body{margin:0;height:100%;background:#000}iframe{border:0;width:100vw;height:100vh;display:block}</style>
</head><body><iframe src="${rel}" allow="autoplay; fullscreen; gamepad; pointer-lock; clipboard-read; clipboard-write" allowfullscreen></iframe></body></html>`;
  fs.writeFileSync(path.join(folder, 'index.html'), html);
}

function ensureForceMaintenance(slugs) {
  const ovr = readJson(OVR, { force_healthy: [], force_maintenance: [] });
  ovr.force_healthy ||= []; ovr.force_maintenance ||= [];
  for (const s of slugs) {
    const i = ovr.force_healthy.indexOf(s); if (i >= 0) ovr.force_healthy.splice(i, 1);
    if (!ovr.force_maintenance.includes(s)) ovr.force_maintenance.push(s);
  }
  ovr.force_healthy.sort(); ovr.force_maintenance.sort();
  writeJson(OVR, ovr);
}

function ensureForceHealthy(slugs) {
  const ovr = readJson(OVR, { force_healthy: [], force_maintenance: [] });
  ovr.force_healthy ||= []; ovr.force_maintenance ||= [];
  for (const s of slugs) {
    const i = ovr.force_maintenance.indexOf(s); if (i >= 0) ovr.force_maintenance.splice(i, 1);
    if (!ovr.force_healthy.includes(s)) ovr.force_healthy.push(s);
  }
  ovr.force_healthy.sort(); ovr.force_maintenance.sort();
  writeJson(OVR, ovr);
}

function main() {
  const ra = readJson(RECENTS, []);
  const slugs = ra.map(g => g.name).filter(Boolean);
  const targets = ONLY.length ? slugs.filter(s => ONLY.includes(s)) : slugs;

  const plan = [];
  for (const slug of targets) {
    const detection = detectCategory(slug);
    plan.push({ slug, ...detection });
  }

  console.log(`scanned ${targets.length} slugs:`);
  const byCat = {};
  for (const p of plan) { byCat[p.cat] ||= []; byCat[p.cat].push(p.slug); }
  for (const [cat, list] of Object.entries(byCat)) {
    console.log(`  ${cat.padEnd(22)} ${list.length}  ${list.slice(0, 8).join(', ')}${list.length > 8 ? ` (+${list.length - 8} more)` : ''}`);
  }

  if (!APPLY) {
    console.log('\n(dry run — pass --apply to make changes)');
    return;
  }

  console.log('\napplying...');
  const toForceMaintenance = [];
  const toForceHealthy = [];
  let deleted = 0, repaired = 0, hidden = 0;

  for (const p of plan) {
    const folder = path.join(ASSETS, p.slug);
    if (p.cat === 'EMPTY') {
      console.log(`  delete  ${p.slug}/  (empty stub)`);
      rmrf(folder);
      deleted++;
    } else if (p.cat === 'REBASEABLE') {
      if (p.baseLocal) {
        const rel = rewriteDeepEntryWithLocalBase(p.deepEntry, p.baseLocal, folder);
        console.log(`  repair  ${p.slug}/  base href -> ${rel}`);
      } else {
        console.log(`  repair  ${p.slug}/  (relative-asset deep entry)`);
      }
      makeRebasedLauncher(folder, p.slug, p.deepEntry);
      toForceHealthy.push(p.slug);
      repaired++;
    } else if (p.cat === 'ETHANYO_TRAP' || p.cat === 'UNRECOVERABLE_BASE' || p.cat === 'PSEUDO_GAME') {
      const reason = p.cat === 'UNRECOVERABLE_BASE'
        ? `The game's HTML loads its assets from <code>${p.baseHref || 'an external CDN'}</code>, which was not archived locally. Without those files we can't run it offline.`
        : p.cat === 'PSEUDO_GAME'
        ? `This folder is a recovery/scaffolding entry, not a real game.`
        : `The original import only captured the website wrapper, not the playable game assets. The actual game lives at the source URL but is not present locally.`;
      makeUnavailableStub(folder, p.slug, reason);
      console.log(`  hide    ${p.slug}/  (${p.cat})`);
      toForceMaintenance.push(p.slug);
      hidden++;
    } else {
      console.log(`  ok      ${p.slug}/  (no change)`);
    }
  }

  if (toForceMaintenance.length) ensureForceMaintenance(toForceMaintenance);
  if (toForceHealthy.length) ensureForceHealthy(toForceHealthy);

  console.log(`\nsummary: deleted ${deleted}, repaired ${repaired}, hidden ${hidden}`);
  console.log('rebuilding catalog...');
  execSync('node scan.js', { cwd: ROOT, stdio: 'inherit' });
}

main();
