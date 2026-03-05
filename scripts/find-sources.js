#!/usr/bin/env node
/**
 * find-sources.js
 * Find working source URLs for games with broken LFS pointer files.
 * Tests multiple CDN patterns and GitHub mirrors.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'Assets');
const MANIFEST = JSON.parse(fs.readFileSync(path.join(__dirname, 'broken-manifest.json'), 'utf8'));

function headCheck(url, timeout = 8000) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const u = new URL(url);
    const req = mod.request({
      method: 'HEAD',
      hostname: u.hostname,
      path: u.pathname + u.search,
      port: u.port,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout
    }, (res) => {
      res.resume();
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        const next = new URL(res.headers.location, url).href;
        headCheck(next, timeout).then(resolve);
      } else {
        resolve(res.statusCode === 200);
      }
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

function getContent(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return getContent(new URL(res.headers.location, url).href, timeout).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')); });
  });
}

// Try to find GameDistribution UUID from game files
function findGDId(gameDir) {
  const ids = new Set();
  try {
    const files = findFilesRecursive(gameDir, /\.(js|html)$/i, 5000000);
    for (const f of files) {
      const content = fs.readFileSync(f, 'utf8');
      // Look for patterns like gameId: "abc123...", "gameId":"abc123..."
      const matches = content.matchAll(/game[_\-]?[Ii]d['":\s]+['"]([a-f0-9]{32})['"]/g);
      for (const m of matches) ids.add(m[1]);
      // Also look for GD_OPTIONS patterns
      const gd = content.matchAll(/GD_OPTIONS\s*=\s*\{[^}]*?gameId[:\s'"]+([a-f0-9]{32})/g);
      for (const m of gd) ids.add(m[1]);
      // Look for gamedistribution.com URLs with UUID
      const gdUrls = content.matchAll(/gamedistribution\.com\/(?:rvvASMiM\/)?([a-f0-9]{32})/g);
      for (const m of gdUrls) ids.add(m[1]);
    }
  } catch {}
  return [...ids];
}

function findFilesRecursive(dir, pattern, maxSize) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        results.push(...findFilesRecursive(full, pattern, maxSize));
      } else if (pattern.test(e.name)) {
        const stat = fs.statSync(full);
        if (stat.size > 200 && stat.size < maxSize) results.push(full);
      }
    }
  } catch {}
  return results;
}

// Common GitHub repos that host game mirrors
const GITHUB_REPOS = [
  // Format: [user, repo, branch, pathPrefix]
  ['nicm42', '3kh0-Assets', 'main', ''],
  ['AyushSehrawat', 'games', 'main', ''],
  ['nicm42', 'WebGames', 'main', ''],
];

async function testGDId(uuid, samplePath) {
  const url = `https://html5.gamedistribution.com/rvvASMiM/${uuid}/${samplePath}`;
  return await headCheck(url);
}

async function main() {
  const games = Object.keys(MANIFEST);
  const results = {};

  for (const game of games) {
    const files = MANIFEST[game];
    const samplePath = files[0].path;
    const gameDir = path.join(ASSETS, game);
    let found = false;

    process.stdout.write(`[${game}] `);

    // 1. Check @source.txt
    const srcFile = path.join(gameDir, '@source.txt');
    if (fs.existsSync(srcFile)) {
      const srcUrl = fs.readFileSync(srcFile, 'utf8').trim().split('\n')[0];
      const testUrl = srcUrl.replace(/\/?$/, '/') + samplePath;
      if (await headCheck(testUrl)) {
        results[game] = srcUrl.replace(/\/?$/, '/');
        console.log(`@source.txt → ${results[game]}`);
        continue;
      }
    }

    // 2. Try GameDistribution IDs from game files
    const gdIds = findGDId(gameDir);
    for (const id of gdIds) {
      if (await testGDId(id, samplePath)) {
        results[game] = `https://html5.gamedistribution.com/rvvASMiM/${id}/`;
        console.log(`GD:${id}`);
        found = true;
        break;
      }
    }
    if (found) continue;

    // 3. Try well-known GitHub repos
    for (const [user, repo, branch, prefix] of GITHUB_REPOS) {
      const p = prefix ? `${prefix}/${game}` : game;
      const url = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${p}/${samplePath}`;
      if (await headCheck(url)) {
        results[game] = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${p}/`;
        console.log(`GitHub:${user}/${repo}`);
        found = true;
        break;
      }
    }
    if (found) continue;

    // 4. Try some common CDN patterns
    const cdnPatterns = [
      `https://cdn.wanted5games.com/games/${game}/${samplePath}`,
      `https://play-lh.googleusercontent.com/games/${game}/${samplePath}`,
    ];
    for (const url of cdnPatterns) {
      if (await headCheck(url)) {
        const base = url.slice(0, url.length - samplePath.length);
        results[game] = base;
        console.log(`CDN:${base}`);
        found = true;
        break;
      }
    }
    if (found) continue;

    // 5. Try common game mirror sites
    const mirrorSites = [
      `https://ubg77.github.io/${game}/${samplePath}`,
      `https://sites.google.com/site/unblokedgames76/${game}/${samplePath}`,
    ];
    for (const url of mirrorSites) {
      if (await headCheck(url)) {
        const base = url.slice(0, url.length - samplePath.length);
        results[game] = base;
        console.log(`Mirror:${base}`);
        found = true;
        break;
      }
    }
    if (found) continue;

    console.log('❌ No source');
  }

  console.log(`\n\n=== FOUND SOURCES: ${Object.keys(results).length}/${games.length} ===`);
  for (const [game, url] of Object.entries(results)) {
    console.log(`  ${game}: ${url}`);
  }

  // Save results
  fs.writeFileSync(path.join(__dirname, 'found-sources.json'), JSON.stringify(results, null, 2));
  console.log('\nSaved to scripts/found-sources.json');
}

main().catch(e => { console.error(e); process.exit(1); });
