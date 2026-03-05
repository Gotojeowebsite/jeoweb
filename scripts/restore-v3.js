// restore-v3.js - Comprehensive restore with many CDN/GitHub mirror patterns
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ASSETS = path.join(__dirname, '..', 'Assets');
const manifest = require('./broken-manifest.json');

// Games already restored
const DONE = new Set(['cannon-basketball-4','motox3m-pool','HexGL','angry-sharks','vex5',
  'motox3m-spooky','basketball-stars','grindcraft','vex6','bobtherobber2','eggycar',
  'om-bounce','webretro-local','Five-Nights-At-Epstein','sand-game','sm64','sort-the-court','CrazyCattle3D']);

// Specific known sources for games
const KNOWN_SOURCES = {
  'wolf3d': [
    'https://nicholaschiasson.github.io/wolf3d/',
    'https://raw.githubusercontent.com/nicholaschiasson/wolf3d/gh-pages/',
    'https://nicholaschiasson.dev/wolf3d/',
  ],
  'mario': [
    'https://raw.githubusercontent.com/FullScreenShenanigans/FullScreenMario/master/',
    'https://raw.githubusercontent.com/nicholaschiasson/Mario-HTML5/master/',
    'https://raw.githubusercontent.com/nicholaschiasson/Mario-HTML5/gh-pages/',
  ],
  'flappy-bird': [
    'https://3kh0.github.io/flappy-bird/',
    'https://raw.githubusercontent.com/nicholaschiasson/flappy-bird/gh-pages/',
  ],
  'google-snake': [
    'https://3kh0.github.io/google-snake/',
    'https://raw.githubusercontent.com/nicholaschiasson/google-snake/gh-pages/',
  ],
  'Dogeminer2': [
    'https://dogeminer2.com/',
    'https://3kh0.github.io/Dogeminer2/',
  ],
  'retro-bowl': [
    'https://3kh0.github.io/retro-bowl/',
  ],
  'idle-breakout': [
    'https://3kh0.github.io/idle-breakout/',
  ],
  'among-us': [
    'https://3kh0.github.io/among-us/',
  ],
  'superhot': [
    'https://3kh0.github.io/superhot/',
  ],
  'motox3m': [
    'https://3kh0.github.io/motox3m/',
  ],
  'motox3m-winter': [
    'https://3kh0.github.io/motox3m-winter/',
  ],
  'bacon-may-die': [
    'https://3kh0.github.io/bacon-may-die/',
  ],
  'fridaynightfunkin': [
    'https://3kh0.github.io/fridaynightfunkin/',
  ],
  'craftmine': [
    'https://3kh0.github.io/craftmine/',
  ],
  'tank-trouble-2': [
    'https://3kh0.github.io/tank-trouble-2/',
  ],
};

// Generic CDN patterns to try for ALL games
// {game} is replaced with the game name
const GENERIC_PATTERNS = [
  'https://3kh0.github.io/{game}/',
  'https://raw.githubusercontent.com/nicholaschiasson/{game}/gh-pages/',
  'https://raw.githubusercontent.com/nicholaschiasson/{game}/main/',
  'https://raw.githubusercontent.com/nicholaschiasson/{game}/master/',
  'https://d3rtzzzsiu7gdr.cloudfront.net/files/{game}/',
  'https://wanted5games.com/games/{game}/',
  'https://play-lh.googleusercontent.com/{game}/',
];

// Game name aliases (folder name -> CDN name variations)
const ALIASES = {
  'Dogeminer2': ['DogeMiner2', 'dogeminer2', 'doge-miner-2'],
  'DOOMORI': ['doomori', 'Doomori'],
  'fridaynightfunkin': ['friday-night-funkin', 'fnf', 'FridayNightFunkin'],
  'motox3m': ['moto-x3m', 'motox3m'],
  'motox3m-winter': ['moto-x3m-winter', 'motox3m-winter'],
  'there-is-no-game': ['thereisno-game', 'thereisnogame'],
  'generic-fishing-game': ['fishing-game', 'genericfishing'],
  'soldier-legend': ['soldierlegend', 'soldier-legend'],
  'burger-and-frights': ['burger-frights', 'burgerandfrights'],
  'dragon-vs-bricks': ['dragon-bricks', 'dragonvsbricks'],
  'doctor-acorn2': ['doctor-acorn-2', 'doctoracorn2'],
  'defend-the-tank': ['defendthetank', 'defend-tank'],
  'push-your-luck': ['pushyourluck', 'push-luck'],
  'precision-client': ['eaglercraft', 'precision'],
  'idle-breakout': ['idlebreakout', 'idle-breakout'],
  'amazing-rope-police': ['rope-police', 'amazing-rope'],
  'animal-stacking': ['animalstacking'],
  'bacon-may-die': ['baconmaydie'],
  'btts': ['btts', 'bigtowertinysquare'],
  'ctr': ['cut-the-rope', 'cuttherope'],
  'ctr-holiday': ['cut-the-rope-holiday', 'ctr-holiday'],
  'ctr-tr': ['cut-the-rope-time-travel', 'ctr-tr'],
  'flappy-bird': ['flappybird', 'flappy'],
  'polybranch': ['poly-branch'],
  'circlo': ['circlo'],
  'fairsquares': ['fair-squares', 'fairsquares'],
  'rolly-vortex': ['rollyvortex', 'rolly'],
  'tank-trouble-2': ['tanktrouble2', 'tank-trouble'],
  'temple-run-2': ['templerun2', 'temple-run'],
  'vex3': ['vex-3'],
  'vex4': ['vex-4'],
  'solitaire': ['solitaire'],
  'btd4': ['btd4', 'bloons-td-4'],
  'wolf3d': ['wolfenstein3d', 'wolfenstein', 'wolf3d'],
  'google-snake': ['snake', 'google-snake'],
};

const CONCURRENCY = 8;
let activeDownloads = 0;

function download(url, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout, headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        if (loc.includes('accounts.google.com') || loc.includes('login')) {
          res.destroy();
          return reject(new Error('auth redirect'));
        }
        res.destroy();
        return download(loc.startsWith('http') ? loc : new URL(loc, url).href, timeout).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.destroy();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        // Validate: not HTML error, not XML error, not too small
        const str = buf.toString('utf8', 0, Math.min(200, buf.length));
        if (str.includes('Not found at origin') || str.includes('<html') || str.includes('<!DOCTYPE') || str.includes('AccessDenied')) {
          return reject(new Error('HTML/XML error response'));
        }
        if (str.startsWith('version https://git-lfs')) {
          return reject(new Error('LFS pointer'));
        }
        resolve(buf);
      });
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function tryDownloadFile(game, filePath) {
  // Build list of URLs to try
  const urls = [];
  
  // Known sources first
  if (KNOWN_SOURCES[game]) {
    for (const base of KNOWN_SOURCES[game]) {
      urls.push(base + filePath);
      // Try URL-encoded version for filenames with spaces
      if (filePath.includes(' ')) {
        urls.push(base + filePath.split('/').map(p => encodeURIComponent(p)).join('/'));
      }
    }
  }
  
  // Generic patterns with game name
  const names = [game, ...(ALIASES[game] || [])];
  for (const name of names) {
    for (const pattern of GENERIC_PATTERNS) {
      urls.push(pattern.replace('{game}', name) + filePath);
      if (filePath.includes(' ')) {
        urls.push(pattern.replace('{game}', name) + filePath.split('/').map(p => encodeURIComponent(p)).join('/'));
      }
    }
  }
  
  // Try each URL
  for (const url of urls) {
    try {
      const buf = await download(url);
      if (buf.length > 100) { // Must be meaningful content
        return { url, buf };
      }
    } catch (e) {
      // try next
    }
  }
  return null;
}

async function findWorkingBase(game, files) {
  // Quick test: try first file with all sources to find working base URL
  const testFile = files[0].path;
  const urls = [];
  
  if (KNOWN_SOURCES[game]) {
    for (const base of KNOWN_SOURCES[game]) {
      urls.push({ base, url: base + testFile });
      if (testFile.includes(' ')) {
        urls.push({ base, url: base + testFile.split('/').map(p => encodeURIComponent(p)).join('/') });
      }
    }
  }
  
  const names = [game, ...(ALIASES[game] || [])];
  for (const name of names) {
    for (const pattern of GENERIC_PATTERNS) {
      const base = pattern.replace('{game}', name);
      urls.push({ base, url: base + testFile });
      if (testFile.includes(' ')) {
        urls.push({ base, url: base + testFile.split('/').map(p => encodeURIComponent(p)).join('/') });
      }
    }
  }
  
  for (const { base, url } of urls) {
    try {
      const buf = await download(url);
      if (buf.length > 100) {
        return base;
      }
    } catch (e) {
      // try next
    }
  }
  return null;
}

async function restoreGame(game, files) {
  process.stdout.write(`[${game}] (${files.length}) Searching... `);
  
  // First, find a working base URL
  const base = await findWorkingBase(game, files);
  if (!base) {
    console.log(`❌ No source found`);
    return { game, restored: 0, failed: files.length };
  }
  
  console.log(`✅ ${base.substring(0, 60)}`);
  
  let restored = 0;
  let failed = 0;
  
  // Download all files from that base
  const queue = [...files];
  
  async function worker() {
    while (queue.length > 0) {
      const file = queue.shift();
      const destPath = path.join(ASSETS, game, file.path);
      
      // Skip if file already exists and is not an LFS pointer
      if (fs.existsSync(destPath)) {
        const content = fs.readFileSync(destPath, 'utf8').substring(0, 50);
        if (!content.startsWith('version https://git-lfs')) {
          restored++;
          continue;
        }
      }
      
      let success = false;
      const filePath = file.path;
      const encodedPath = filePath.includes(' ') 
        ? filePath.split('/').map(p => encodeURIComponent(p)).join('/')
        : filePath;
      
      for (const tryPath of [filePath, encodedPath]) {
        try {
          const buf = await download(base + tryPath);
          if (buf.length > 100) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.writeFileSync(destPath, buf);
            restored++;
            success = true;
            break;
          }
        } catch (e) {
          // try next
        }
      }
      
      if (!success) failed++;
    }
  }
  
  const workers = Array.from({ length: Math.min(CONCURRENCY, files.length) }, () => worker());
  await Promise.all(workers);
  
  process.stdout.write(`  → ${restored}/${files.length} restored`);
  if (failed > 0) process.stdout.write(` (${failed} failed)`);
  console.log('');
  
  return { game, restored, failed };
}

async function main() {
  const games = Object.entries(manifest)
    .filter(([name]) => !DONE.has(name))
    .sort((a, b) => a[1].length - b[1].length); // Small games first
  
  console.log(`🔍 Trying to restore ${games.length} games, ${games.reduce((s, [,f]) => s + f.length, 0)} files\n`);
  
  const results = [];
  for (const [game, files] of games) {
    results.push(await restoreGame(game, files));
  }
  
  const totalRestored = results.reduce((s, r) => s + r.restored, 0);
  const totalFailed = results.reduce((s, r) => s + r.failed, 0);
  const noSource = results.filter(r => r.restored === 0);
  
  console.log('\n' + '═'.repeat(60));
  console.log(`✅ Restored: ${totalRestored}`);
  console.log(`❌ Failed:   ${totalFailed}`);
  console.log(`🚫 No source: ${noSource.length} games`);
  
  if (noSource.length > 0) {
    console.log('\nGames with no source:');
    noSource.forEach(r => {
      const files = manifest[r.game];
      console.log(`  - ${r.game} (${files.length} files)`);
    });
  }
  
  // Also show partial restores
  const partial = results.filter(r => r.restored > 0 && r.failed > 0);
  if (partial.length > 0) {
    console.log('\nPartially restored:');
    partial.forEach(r => console.log(`  - ${r.game}: ${r.restored} ok, ${r.failed} failed`));
  }
}

main().catch(console.error);
