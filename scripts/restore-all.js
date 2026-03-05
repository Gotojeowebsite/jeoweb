#!/usr/bin/env node
/**
 * restore-all.js
 * ==============
 * Final comprehensive restore script with all known CDN sources.
 * Tests multiple CDN patterns for each game and downloads broken files.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'Assets');
const MANIFEST = JSON.parse(fs.readFileSync(path.join(__dirname, 'broken-manifest.json'), 'utf8'));

const CONCURRENCY = 6;
const DELAY_MS = 60;
const MAX_RETRIES = 3;

// ─── ALL Known GameDistribution IDs ─────────────────────────────────────────
const GD_IDS = {
  'vex3': '762c932b4db74c6da0c1d101b2da8be6',
  'vex4': '80e6a5ae477f4d4fbcd1ea293d10087d',
  'vex5': 'f120262ab72743039fbce88c1f370df8',
  'vex6': '4925e12574364121a48c61c35f649c36',
  'bobtherobber2': '34d6aae0257d4e4c8068cbdfc11a8758',
  'eggycar': '59a98bf799ef499d9d7b9285bccaa196',
  'om-bounce': 'c60593d7d3434def9ac80eed7f315208',
  'basketball-stars': '69d78d071f704fa183d75b4114ae40ec',
  'motox3m-pool': 'f804d079d19f44d3b951ead4588e974a',
  'motox3m-spooky': 'b8a342904608470a9f3382337aca3558',
  'cannon-basketball-4': '4910b9f4ac5847ca9762dde4ae8f9baf',
  'angry-sharks': '76681228c1134b7aa57ab4db8fc45477',
  'grindcraft': '92a81cc3a9da4cde89a418ae6bd4b4c4',
};

// ─── Known GitHub repos for specific games ──────────────────────────────────
const GITHUB_SOURCES = {
  'HexGL': 'https://raw.githubusercontent.com/BKcore/HexGL/master/',
  'mario': 'https://raw.githubusercontent.com/nicm42/FullScreenMario/master/',
  'wolf3d': 'https://raw.githubusercontent.com/nicm42/wolf3d/master/',
};

// ─── Build candidate base URLs for a game ───────────────────────────────────
function getCandidateBaseURLs(game) {
  const urls = [];

  // 1. GameDistribution CDN (most reliable)
  if (GD_IDS[game]) {
    urls.push(`https://html5.gamedistribution.com/rvvASMiM/${GD_IDS[game]}/`);
    urls.push(`https://html5.gamedistribution.com/${GD_IDS[game]}/`);
  }

  // 2. Known GitHub sources
  if (GITHUB_SOURCES[game]) {
    urls.push(GITHUB_SOURCES[game]);
  }

  // 3. Common CDN patterns
  urls.push(`https://d3rtzzzsiu7gdr.cloudfront.net/files/${game}/`);
  urls.push(`https://cdn.wanted5games.com/files/${game}/`);

  // 4. GitHub mirrors
  const ghRepos = [
    ['nicm42', '3kh0-Assets', 'main'],
    ['3kh0', '3kh0-Assets', 'main'],
    ['AyushSehrawat', 'games', 'main'],
    ['nicm42', 'WebGames', 'main'],
  ];
  for (const [owner, repo, branch] of ghRepos) {
    urls.push(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${game}/`);
  }

  return urls;
}

// ─── HTTP helpers ───────────────────────────────────────────────────────────

function download(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Accept': '*/*' },
      timeout: 20000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        res.resume();
        if (loc.includes('accounts.google.com') || loc.includes('ServiceLogin')) {
          return reject(new Error('Auth redirect'));
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
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')); });
  });
}

async function downloadWithRetry(url, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try { return await download(url); }
    catch (e) { if (i === retries - 1) throw e; await sleep(500 * (i + 1)); }
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Validate downloaded content is not HTML error page
function isValidBinary(data, expectedSize) {
  if (data.length < 50 && expectedSize > 200) return false;
  const head = data.slice(0, 20).toString('utf8').toLowerCase().trim();
  if (head.includes('<!doctype') || head.includes('<html')) return false;
  if (head.includes('version https://git-lfs')) return false;
  return true;
}

// ─── Semaphore ──────────────────────────────────────────────────────────────
class Semaphore {
  constructor(max) { this.max = max; this.count = 0; this.queue = []; }
  acquire() {
    return new Promise(resolve => {
      if (this.count < this.max) { this.count++; resolve(); }
      else this.queue.push(resolve);
    });
  }
  release() {
    if (this.queue.length > 0) this.queue.shift()();
    else this.count--;
  }
}

// ─── Find working base URL for a game ───────────────────────────────────────
async function findWorkingBaseURL(game, samplePath) {
  const candidates = getCandidateBaseURLs(game);
  for (const base of candidates) {
    try {
      const url = base + encodeFilePath(samplePath);
      const data = await download(url);
      if (isValidBinary(data, 100)) {
        return base;
      }
    } catch { /* next */ }
  }
  return null;
}

function encodeFilePath(p) {
  return p.split('/').map(s => encodeURIComponent(s)).join('/');
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  // Find which games still have broken files
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

  const totalBroken = Object.values(stillBroken).reduce((s, a) => s + a.length, 0);
  console.log(`\n🎮 ${Object.keys(stillBroken).length} games, ${totalBroken} files still broken\n`);

  const stats = { restored: 0, failed: 0, noSource: 0 };
  const failedGames = [];
  const failedFiles = [];
  const sem = new Semaphore(CONCURRENCY);

  for (const [game, files] of Object.entries(stillBroken)) {
    process.stdout.write(`[${game}] (${files.length}) Searching... `);
    const baseURL = await findWorkingBaseURL(game, files[0].path);

    if (!baseURL) {
      console.log('❌ No source');
      stats.noSource += files.length;
      failedGames.push(game);
      continue;
    }

    console.log(`✅ ${baseURL.substring(0, 65)}`);

    const promises = files.map(async (file) => {
      await sem.acquire();
      try {
        const url = baseURL + encodeFilePath(file.path);
        const destPath = path.join(ASSETS, game, ...file.path.split('/'));
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        const data = await downloadWithRetry(url);
        if (!isValidBinary(data, file.size)) {
          throw new Error(`Invalid content (${data.length} bytes)`);
        }

        fs.writeFileSync(destPath, data);
        stats.restored++;
        return true;
      } catch (e) {
        stats.failed++;
        failedFiles.push({ game, path: file.path, error: e.message });
        return false;
      } finally {
        await sleep(DELAY_MS);
        sem.release();
      }
    });

    const results = await Promise.all(promises);
    const ok = results.filter(Boolean).length;
    if (ok < files.length) {
      console.log(`  → ${ok}/${files.length} restored`);
    } else {
      console.log(`  → ${ok}/${files.length} ✓`);
    }
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`✅ Restored: ${stats.restored}`);
  console.log(`❌ Failed:   ${stats.failed}`);
  console.log(`⏭  No source: ${stats.noSource}`);

  if (failedGames.length > 0) {
    console.log(`\nGames with no source (${failedGames.length}):`);
    failedGames.forEach(g => {
      const count = stillBroken[g].length;
      console.log(`  - ${g} (${count} files)`);
    });
  }

  if (failedFiles.length > 0) {
    console.log(`\nSpecific file failures: ${failedFiles.length}`);
    fs.writeFileSync(path.join(__dirname, 'failed-files.json'), JSON.stringify(failedFiles, null, 2));
  }

  console.log();
}

main().catch(e => { console.error(e); process.exit(1); });
