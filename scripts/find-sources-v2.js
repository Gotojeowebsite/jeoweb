#!/usr/bin/env node
/**
 * find-sources-v2.js
 * ==================
 * More aggressive search for game asset sources.
 * Checks multiple CDNs and GitHub repos.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'Assets');
const MANIFEST = JSON.parse(fs.readFileSync(path.join(__dirname, 'broken-manifest.json'), 'utf8'));

function download(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 12000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        res.resume();
        // If redirect goes to accounts.google.com, it's auth-required → fail
        if (loc.includes('accounts.google.com') || loc.includes('ServiceLogin')) {
          return reject(new Error('Auth required'));
        }
        const next = new URL(loc, url).href;
        return download(next, maxRedirects - 1).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ data: Buffer.concat(chunks), ct: res.headers['content-type'] || '' }));
      res.on('error', reject);
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')); });
  });
}

function findFilesRecursive(dir, pattern, maxSize = 10000000) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) results.push(...findFilesRecursive(full, pattern, maxSize));
      else if (pattern.test(e.name)) {
        try { const s = fs.statSync(full); if (s.size > 200 && s.size < maxSize) results.push(full); } catch {}
      }
    }
  } catch {}
  return results;
}

// Extract ALL possible GD UUIDs from game files
function findGDIds(gameDir) {
  const ids = new Set();
  const files = findFilesRecursive(gameDir, /\.(js|html|json)$/i);
  for (const f of files) {
    try {
      const c = fs.readFileSync(f, 'utf8');
      // gameId patterns
      for (const m of c.matchAll(/gameId['":\s]+['"]([a-f0-9]{32})['"]/gi)) ids.add(m[1]);
      for (const m of c.matchAll(/GD_OPTIONS\s*=?\s*\{[^}]*?gameId[:\s'"]+([a-f0-9]{32})/g)) ids.add(m[1]);
      for (const m of c.matchAll(/gamedistribution\.com\/(?:rvvASMiM\/)?([a-f0-9]{32})/g)) ids.add(m[1]);
      for (const m of c.matchAll(/GAME_KEY\s*=\s*"([a-f0-9]{32})"/g)) ids.add(m[1]);
    } catch {}
  }
  return [...ids];
}

async function testURL(url) {
  try {
    const { data, ct } = await download(url);
    if (data.length < 100) return false;
    // Check it's not HTML
    const head = data.slice(0, 30).toString('utf8').toLowerCase().trim();
    if (head.includes('<!doctype') || head.includes('<html') || head.includes('<!DOCTYPE')) return false;
    return true;
  } catch {
    return false;
  }
}

// GitHub repos known to host game mirrors
const GITHUB_MIRRORS = [
  // [owner, repo, branch, gamePath] - gamePath can use {game} placeholder
  ['nicm42', '3kh0-Assets', 'main', '{game}'],
  ['nicm42', 'WebGames', 'main', '{game}'],
  ['nicm42', 'games', 'main', '{game}'],
  ['AyushSehrawat', 'games', 'main', '{game}'],
  ['3kh0', '3kh0-Assets', 'main', '{game}'],
  ['AyushSehrawat', 'GameAssets', 'main', '{game}'],
  ['interstellarnetwork', 'interstellar-assets', 'main', '{game}'],
  ['nicm42', 'game-assets', 'main', '{game}'],
];

// Known game-specific alternative URLs
const GAME_CDNS = {
  // FullScreenMario on GitHub
  'mario': [
    'https://raw.githubusercontent.com/nicm42/FullScreenMario/master/',
    'https://raw.githubusercontent.com/IodineGBA/nicm42/FullScreenMario/master/',
  ],
  // wolf3d on GitHub
  'wolf3d': [
    'https://raw.githubusercontent.com/nicm42/wolf3d/master/',
  ],
  // HexGL on GitHub
  'HexGL': [
    'https://raw.githubusercontent.com/nicm42/HexGL/master/',
    'https://raw.githubusercontent.com/BKcore/HexGL/master/',
  ],
  // Construct games
  'there-is-no-game': [],
  'soldier-legend': [],
  'among-us': [],
};

async function findSourceForGame(game, samplePath) {
  // 1. @source.txt
  const srcFile = path.join(ASSETS, game, '@source.txt');
  if (fs.existsSync(srcFile)) {
    const url = fs.readFileSync(srcFile, 'utf8').trim().split('\n')[0].replace(/\/?$/, '/');
    if (await testURL(url + samplePath)) return { type: '@source', url };
  }

  // 2. GameDistribution
  const gdIds = findGDIds(path.join(ASSETS, game));
  for (const id of gdIds) {
    const base = `https://html5.gamedistribution.com/rvvASMiM/${id}/`;
    if (await testURL(base + samplePath)) return { type: 'GD', url: base };
    // Also try without rvvASMiM prefix
    const base2 = `https://html5.gamedistribution.com/${id}/`;
    if (await testURL(base2 + samplePath)) return { type: 'GD', url: base2 };
  }

  // 3. Game-specific CDNs
  if (GAME_CDNS[game]) {
    for (const base of GAME_CDNS[game]) {
      if (await testURL(base + samplePath)) return { type: 'CDN', url: base };
    }
  }

  // 4. GitHub mirrors  
  for (const [owner, repo, branch, pathTemplate] of GITHUB_MIRRORS) {
    const gamePath = pathTemplate.replace('{game}', game);
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${gamePath}/`;
    if (await testURL(url + samplePath)) return { type: 'GitHub', url };
  }

  // 5. Alternative CDN patterns
  const altCDNs = [
    `https://cdn.wanted5games.com/files/${game}/`,
    `https://d3rtzzzsiu7gdr.cloudfront.net/files/${game}/`,
    `https://cdn.htmlgames.com/games/${game}/`,
    `https://cdn.poki.com/game-assets/${game}/`,
  ];
  for (const base of altCDNs) {
    if (await testURL(base + samplePath)) return { type: 'CDN', url: base };
  }

  return null;
}

async function main() {
  // Only process games that still have broken files
  const results = {};
  const oldSources = (() => {
    try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'found-sources.json'), 'utf8')); }
    catch { return {}; }
  })();

  // Check which games still have broken files
  const stillBroken = {};
  for (const [game, files] of Object.entries(MANIFEST)) {
    const broken = files.filter(f => {
      const fp = path.join(ASSETS, game, ...f.path.split('/'));
      try {
        const c = fs.readFileSync(fp, 'utf8');
        return c.includes('version https://git-lfs');
      } catch { return true; }
    });
    if (broken.length > 0) stillBroken[game] = broken;
  }

  console.log(`\n🔍 ${Object.keys(stillBroken).length} games still need sources\n`);

  for (const [game, files] of Object.entries(stillBroken)) {
    const samplePath = files[0].path;
    process.stdout.write(`[${game}] (${files.length} files) `);

    // If we already have a working GD/CDN source (non-Google Sites), skip
    const existing = oldSources[game];
    if (existing && !existing.includes('sites.google.com')) {
      if (await testURL(existing + samplePath)) {
        results[game] = existing;
        console.log(`✅ Existing: ${existing.substring(0, 60)}`);
        continue;
      }
    }

    const source = await findSourceForGame(game, samplePath);
    if (source) {
      results[game] = source.url;
      console.log(`✅ ${source.type}: ${source.url.substring(0, 60)}`);
    } else {
      console.log('❌ No source found');
    }
  }

  console.log(`\n=== Results: ${Object.keys(results).length}/${Object.keys(stillBroken).length} ===`);
  for (const [g, u] of Object.entries(results)) {
    console.log(`  ${g}: ${u}`);
  }

  // Save
  fs.writeFileSync(path.join(__dirname, 'found-sources-v2.json'), JSON.stringify(results, null, 2));
  console.log('\nSaved to scripts/found-sources-v2.json');
}

main().catch(e => { console.error(e); process.exit(1); });
