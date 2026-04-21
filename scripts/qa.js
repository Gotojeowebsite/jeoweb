// qa.js — DIAGNOSTIC-ONLY as of 2026-04-21.
//
// Prior version wrote status: 'broken' / 'operational' into games_list.json,
// using a value ('operational') that the scanner and frontend did not
// recognize. It now spins up a loopback server, probes every game, and writes
// a diagnostic report. The canonical broken_game_scanner.py is still the only
// writer of the <!--GAME BROKEN--> marker that scan.js reads.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.join(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'games_list.json');
const REPORT_DIR = path.join(ROOT, 'reports');
const REPORT_PATH = path.join(REPORT_DIR, 'qa_diagnostics.json');
const PORT = 8080;

function startServer() {
  const server = http.createServer((req, res) => {
    const filePath = path.join(ROOT, decodeURIComponent(req.url));
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function runQATest() {
  const server = await startServer();
  const games = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'));
  const browser = await puppeteer.launch();
  const diagnostics = [];

  try {
    for (const game of games) {
      let isBroken = false;
      const failureDetails = [];
      const page = await browser.newPage();

      page.on('requestfailed', request => {
        const error = request.failure();
        if (error && (error.errorText.includes('net::ERR_ABORTED') || error.errorText.includes('404') || error.errorText.includes('500'))) {
          if (request.url().includes('favicon.ico')) return;
          console.error(`[fail] ${game.name}: ${request.url()} ${error.errorText}`);
          isBroken = true;
          failureDetails.push({ url: request.url(), error: error.errorText });
        }
      });

      const gameUrl = `http://localhost:${PORT}/${game.url}`;
      try {
        await page.goto(gameUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      } catch (e) {
        console.error(`[throw] ${game.name}: ${e.message}`);
        isBroken = true;
        failureDetails.push({ error: e.message });
      } finally {
        await page.close();
      }

      if (isBroken) {
        diagnostics.push({
          name: game.name,
          suspected_status: 'broken',
          observed_at: new Date().toISOString(),
          details: failureDetails,
        });
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify({
    generated_at: new Date().toISOString(),
    note: 'Diagnostic only; feed these names to broken_game_scanner.py --only <name> to confirm.',
    count: diagnostics.length,
    diagnostics,
  }, null, 2));

  console.log(`QA diagnostics written to ${REPORT_PATH} (${diagnostics.length} suspect entries).`);
}

if (require.main === module) {
  runQATest();
}

module.exports = { runQATest };
