// remediation.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { jsonrepair } = require('jsonrepair');

const CATALOG_PATH = path.join(__dirname, '../games_list.json');

// Helper to fetch and bypass anti-scraping
function downloadMissingAsset(remoteUrl, localDest) {
  return new Promise((resolve, reject) => {
    const client = remoteUrl.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Referer': new URL(remoteUrl).origin // Spoof origin check
      }
    };

    client.get(remoteUrl, options, (res) => {
      if (res.statusCode === 200) {
        fs.mkdirSync(path.dirname(localDest), { recursive: true });
        const fileStream = fs.createWriteStream(localDest);
        res.pipe(fileStream);
        fileStream.on('finish', () => { fileStream.close(); resolve(true); });
      } else {
        resolve(false);
      }
    }).on('error', reject);
  });
}

async function runDeepAnalysis() {
  const rawData = fs.readFileSync(CATALOG_PATH, 'utf-8');
  let catalog = JSON.parse(jsonrepair(rawData));
  const browser = await puppeteer.launch({ headless: 'new' });

  for (let game of catalog) {
    if (game.status !== 'broken' || !game.original_url) continue;

    console.log(`[Deep Analysis] Investigating broken game: ${game.title}`);
    const page = await browser.newPage();
    let missingPaths = [];

    // 9. 404 Interception and Extraction
    page.on('response', response => {
      if (response.status() === 404) {
        const url = new URL(response.url());
        missingPaths.push(url.pathname);
      }
    });

    try {
      await page.goto(`http://localhost:3000${game.url}`, { waitUntil: 'networkidle0', timeout: 30000 });
    } catch (e) { /* Ignore timeouts during initial failure check */ }

    // 10. Automated Asset Patching and Resolution
    if (missingPaths.length > 0) {
      console.log(`Found ${missingPaths.length} missing assets for ${game.title}. Attempting remediation...`);
      let allFixed = true;
      const remoteBase = new URL(game.original_url).origin;
      const localBaseDir = path.join(__dirname, '../Assets', game.id);

      for (let missingPath of missingPaths) {
        const remoteTarget = `${remoteBase}${missingPath}`;
        const localDest = path.join(localBaseDir, missingPath);
        
        const success = await downloadMissingAsset(remoteTarget, localDest);
        if (!success) {
          allFixed = false;
          console.warn(`[Remediation Failed] Could not fetch: ${remoteTarget}`);
        } else {
          console.log(`[Remediated] Saved missing asset: ${localDest}`);
        }
      }

      if (allFixed) {
        game.status = 'operational';
        game.last_repaired = new Date().toISOString();
        console.log(`[Status Updated] ${game.title} completely repaired and marked operational.`);
      }
    }

    await page.close();
  }

  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
  await browser.close();
}

if (require.main === module) {
  runDeepAnalysis();
}

module.exports = { runDeepAnalysis };
