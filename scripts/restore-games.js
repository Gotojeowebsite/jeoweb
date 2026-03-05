#!/usr/bin/env node
/**
 * restore-games.js
 * ================
 * Re-downloads broken LFS pointer files from common game CDNs and mirrors.
 * Tries multiple sources for each game until one works.
 *
 * Usage:  node scripts/restore-games.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'Assets');
const MANIFEST = path.join(__dirname, 'broken-manifest.json');

// ─── Concurrency ────────────────────────────────────────────────────────────
const CONCURRENCY = 4;
const DELAY_MS = 100;

// ─── Known source URLs for specific games ───────────────────────────────────
// Map game folder name → base URL where that game's files can be fetched.
// The file's relative path within the game folder is appended to this base URL.
const KNOWN_SOURCES = {
  'bobtherobber2': 'https://html5.gamedistribution.com/rvvASMiM/34d6aae0257d4e4c8068cbdfc11a8758/',
  'eggycar': 'https://html5.gamedistribution.com/rvvASMiM/59a98bf799ef499d9d7b9285bccaa196/',
};

// ─── CDN patterns to try (game name is substituted into {game}) ─────────────
// Each function receives (gameName, filePath) and returns a URL to try.
function buildCandidateURLs(game, filePath) {
  const candidates = [];

  // 1. If we have a known source, use it first
  if (KNOWN_SOURCES[game]) {
    candidates.push(KNOWN_SOURCES[game] + filePath);
  }

  // 2. Try GitHub-based game mirrors (these are common unblocked game repos)
  const ghMirrors = [
    `https://raw.githubusercontent.com/AyushSehrawat/games/main/${game}/${filePath}`,
    `https://raw.githubusercontent.com/nicm42/3kh0-Assets/main/${game}/${filePath}`,
    `https://raw.githubusercontent.com/3kh0/3kh0-Assets/main/${game}/${filePath}`,
    `https://raw.githubusercontent.com/IGameMaker/Assets/main/${game}/${filePath}`,
  ];
  candidates.push(...ghMirrors);

  // 3. CDN patterns
  candidates.push(`https://cdn.wanted5games.com/games/${game}/${filePath}`);

  // 4. Try raw.githack or jsdelivr CDN patterns from GitHub repos
  candidates.push(`https://cdn.jsdelivr.net/gh/nicm42/3kh0-Assets@main/${game}/${filePath}`);

  return candidates;
}

// ─── HTTP helpers ───────────────────────────────────────────────────────────

function get(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 15000
    };
    mod.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = new URL(res.headers.location, url).href;
        res.resume();
        return get(next, maxRedirects - 1).then(resolve, reject);
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

function headCheck(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const opts = {
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 8000
    };
    const u = new URL(url);
    opts.hostname = u.hostname;
    opts.path = u.pathname + u.search;
    opts.port = u.port;
    const req = mod.request(opts, (res) => {
      res.resume();
      resolve(res.statusCode === 200 || (res.statusCode >= 300 && res.statusCode < 400));
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

// ─── Find working base URL for a game ───────────────────────────────────────
// Tests the first broken file path against all candidate URLs.
// Returns the base URL prefix that works.
async function findWorkingSource(game, sampleFilePath) {
  const candidates = buildCandidateURLs(game, sampleFilePath);
  for (const url of candidates) {
    try {
      const ok = await headCheck(url);
      if (ok) {
        // Extract the base URL (URL minus the file path)
        const base = url.slice(0, url.length - sampleFilePath.length);
        return base;
      }
    } catch { /* next */ }
  }
  return null;
}

// ─── Semaphore for concurrency ──────────────────────────────────────────────
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

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(MANIFEST)) {
    console.error('Missing broken-manifest.json — run the assessment first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const games = Object.keys(manifest);
  console.log(`\n🎮 ${games.length} games with broken files to restore\n`);

  const stats = { restored: 0, failed: 0, noSource: 0 };
  const failedGames = [];
  const sem = new Semaphore(CONCURRENCY);

  for (const game of games) {
    const files = manifest[game];
    const sampleFile = files[0].path;

    process.stdout.write(`[${game}] Searching for source... `);
    const baseURL = await findWorkingSource(game, sampleFile);

    if (!baseURL) {
      console.log(`❌ No source found (${files.length} files stuck)`);
      stats.noSource += files.length;
      failedGames.push(game);
      continue;
    }

    console.log(`✅ Found: ${baseURL}`);

    // Download all broken files for this game
    const downloadPromises = files.map(async (file) => {
      await sem.acquire();
      try {
        const url = baseURL + file.path;
        const destPath = path.join(ASSETS, game, ...file.path.split('/'));
        const destDir = path.dirname(destPath);

        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        const data = await get(url);

        // Validate: file should be roughly the expected size (within 20% or at least > 200 bytes)
        if (data.length < 200 && file.size > 200) {
          throw new Error(`Size mismatch: got ${data.length}, expected ~${file.size}`);
        }

        fs.writeFileSync(destPath, data);
        stats.restored++;
        return true;
      } catch (e) {
        stats.failed++;
        console.log(`  ⚠ ${file.path}: ${e.message}`);
        return false;
      } finally {
        if (DELAY_MS) await new Promise(r => setTimeout(r, DELAY_MS));
        sem.release();
      }
    });

    const results = await Promise.all(downloadPromises);
    const ok = results.filter(Boolean).length;
    console.log(`  → ${ok}/${files.length} files restored`);
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`Restored: ${stats.restored}`);
  console.log(`Failed:   ${stats.failed}`);
  console.log(`No source: ${stats.noSource}`);
  if (failedGames.length > 0) {
    console.log(`\nGames with no source found (${failedGames.length}):`);
    failedGames.forEach(g => console.log(`  - ${g}`));
  }
  console.log();
}

main().catch(e => { console.error(e); process.exit(1); });
