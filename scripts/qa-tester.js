// qa-tester.js — DIAGNOSTIC-ONLY as of 2026-04-21.
//
// This script used to mutate games_list.json in place, which competed with the
// canonical scanner (broken_game_scanner.py). It now records suspected failures
// into reports/qa_diagnostics.json and never edits the catalog. Use
// broken_game_scanner.py to sync <!--GAME BROKEN--> markers.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { jsonrepair } = require('jsonrepair');

const CATALOG_PATH = path.join(__dirname, '..', 'games_list.json');
const REPORT_DIR = path.join(__dirname, '..', 'reports');
const REPORT_PATH = path.join(REPORT_DIR, 'qa_diagnostics.json');

async function runQATesting() {
  const rawData = fs.readFileSync(CATALOG_PATH, 'utf-8');
  const catalog = JSON.parse(jsonrepair(rawData));
  const diagnostics = [];

  const browser = await puppeteer.launch({ headless: 'new' });

  for (const game of catalog) {
    const page = await browser.newPage();
    let hasCriticalFailure = false;
    const failureDetails = [];

    page.on('requestfailed', request => {
      const response = request.response();
      if (response && (response.status() === 404 || response.status() >= 500)) {
        hasCriticalFailure = true;
        failureDetails.push({ url: request.url(), status: response.status() });
        console.warn(`[Critical Failure] ${game.name} - ${request.url()} -> ${response.status()}`);
      }
    });

    try {
      const localUrl = `http://localhost:3000/${game.url}`;
      await page.goto(localUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    } catch (error) {
      hasCriticalFailure = true;
      failureDetails.push({ error: error.message });
      console.warn(`[Timeout/Crash] ${game.name} failed to reach idle state: ${error.message}`);
    }

    if (hasCriticalFailure) {
      diagnostics.push({
        name: game.name,
        suspected_status: 'broken',
        observed_at: new Date().toISOString(),
        details: failureDetails,
      });
    }

    await page.close();
  }

  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify({
    generated_at: new Date().toISOString(),
    note: 'Diagnostic only; feed these names to broken_game_scanner.py --only <name> to confirm.',
    count: diagnostics.length,
    diagnostics,
  }, null, 2));

  await browser.close();
  console.log(`QA diagnostics written to ${REPORT_PATH} (${diagnostics.length} suspect entries).`);
}

if (require.main === module) {
  runQATesting();
}

module.exports = { runQATesting };
