// qa-tester.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { jsonrepair } = require('jsonrepair'); 

const CATALOG_PATH = path.join(__dirname, '../games_list.json');

async function runQATesting() {
  const rawData = fs.readFileSync(CATALOG_PATH, 'utf-8');
  let catalog = JSON.parse(jsonrepair(rawData));

  const browser = await puppeteer.launch({ headless: 'new' });

  for (let game of catalog) {
    if (game.status === 'broken') continue; // Skip already broken games

    const page = await browser.newPage();
    let hasCriticalFailure = false;

    // 6. Diagnostic Heuristics (404/500 Errors)
    page.on('requestfailed', request => {
      const response = request.response();
      if (response && (response.status() === 404 || response.status() >= 500)) {
        hasCriticalFailure = true;
        console.warn(`[Critical Failure] ${game.title} - ${request.url()} failed with ${response.status()}`);
      }
    });

    try {
      // Localized testing URL; adjust to actual local server port
      const localUrl = `http://localhost:3000${game.url}`; 
      
      // waitUntil: 'networkidle0' ensures initialization completion
      await page.goto(localUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    } catch (error) {
      hasCriticalFailure = true;
      console.warn(`[Timeout/Crash] ${game.title} failed to reach idle state.`);
    }

    // 7. JSON Database Modification
    if (hasCriticalFailure) {
      game.status = 'broken';
      game.last_tested = new Date().toISOString();
      console.log(`[Status Updated] ${game.title} marked as broken.`);
    }

    await page.close();
  }

  // Safe Serialization
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
  await browser.close();
  console.log('QA Pipeline Completed.');
}

if (require.main === module) {
  runQATesting();
}

module.exports = { runQATesting };
