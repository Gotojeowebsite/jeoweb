#!/usr/bin/env node
/**
 * restore-games.js  (v2 — uses found-sources.json)
 * ================================================
 * Re-downloads broken LFS pointer files using discovered source URLs.
 *
 * Usage:  node scripts/restore-games.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'Assets');
const MANIFEST = JSON.parse(fs.readFileSync(path.join(__dirname, 'broken-manifest.json'), 'utf8'));
const SOURCES = JSON.parse(fs.readFileSync(path.join(__dirname, 'found-sources.json'), 'utf8'));

const CONCURRENCY = 6;
const DELAY_MS = 80;
const MAX_RETRIES = 3;

// ─── HTTP download ──────────────────────────────────────────────────────────

function download(url, maxRedirects = 8) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Encoding': 'identity'
      },
      timeout: 30000
    };
    mod.get(url, opts, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = new URL(res.headers.location, url).href;
        res.resume();
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
    try {
      return await download(url);
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
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

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const games = Object.keys(MANIFEST);
  console.log(`\n🎮 Restoring ${games.length} games\n`);

  const stats = { restored: 0, failed: 0, skipped: 0 };
  const failedFiles = [];
  const sem = new Semaphore(CONCURRENCY);

  for (const game of games) {
    const files = MANIFEST[game];
    const baseURL = SOURCES[game];

    if (!baseURL) {
      console.log(`[${game}] ❌ No source URL — skipping ${files.length} files`);
      stats.skipped += files.length;
      continue;
    }

    console.log(`[${game}] Downloading ${files.length} files from ${baseURL.substring(0, 60)}...`);

    const downloadPromises = files.map(async (file) => {
      await sem.acquire();
      try {
        // URL-encode path segments (but not slashes)
        const encodedPath = file.path.split('/').map(s => encodeURIComponent(s)).join('/');
        const url = baseURL + encodedPath;
        const destPath = path.join(ASSETS, game, ...file.path.split('/'));
        const destDir = path.dirname(destPath);

        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        const data = await downloadWithRetry(url);

        // Sanity check: downloaded data should be > 200 bytes (not another pointer/error page)
        if (data.length < 100 && file.size > 200) {
          throw new Error(`Too small: got ${data.length} expected ~${file.size}`);
        }

        // Check it's not an HTML error page for what should be a binary file
        const header = data.slice(0, 15).toString('utf8').toLowerCase();
        if (header.includes('<!doctype') || header.includes('<html')) {
          if (file.path.match(/\.(ogg|mp3|wav|webm|mp4|m4a|wma|flac|aac)$/i)) {
            throw new Error('Got HTML instead of audio/video');
          }
        }

        fs.writeFileSync(destPath, data);
        stats.restored++;
        return true;
      } catch (e) {
        stats.failed++;
        failedFiles.push({ game, path: file.path, error: e.message });
        return false;
      } finally {
        if (DELAY_MS) await new Promise(r => setTimeout(r, DELAY_MS));
        sem.release();
      }
    });

    const results = await Promise.all(downloadPromises);
    const ok = results.filter(Boolean).length;
    const fail = results.length - ok;
    console.log(`  → ${ok}/${files.length} restored${fail > 0 ? ` (${fail} failed)` : ''}`);
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`✅ Restored: ${stats.restored}`);
  console.log(`❌ Failed:   ${stats.failed}`);
  console.log(`⏭  Skipped:  ${stats.skipped}`);

  if (failedFiles.length > 0) {
    console.log(`\nFailed files:`);
    failedFiles.forEach(f => console.log(`  ${f.game}/${f.path}: ${f.error}`));
    fs.writeFileSync(path.join(__dirname, 'failed-files.json'), JSON.stringify(failedFiles, null, 2));
    console.log('\nFailed files saved to scripts/failed-files.json');
  }

  console.log();
}

main().catch(e => { console.error(e); process.exit(1); });
