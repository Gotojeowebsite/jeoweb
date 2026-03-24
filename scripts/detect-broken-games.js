// scripts/detect-broken-games.js
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const path = require('path');

const GAMES_LIST_PATH = path.join(__dirname, '../games_list.json');
const SERVER_URL = 'http://localhost:3000';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkGame(browser, game) {
    const page = await browser.newPage();
    let isBroken = false;
    let reason = '';

    try {
        const url = game.url.startsWith('/') ? `${SERVER_URL}${game.url}` : `${SERVER_URL}/${game.url}`;
        console.log(`\nTesting: ${game.name} (${url})`);
        
        // Hook 1: Intercept network requests to catch 404s on critical assets
        let critical404s = 0;
        page.on('response', response => {
            if (response.status() === 404) {
                const reqUrl = response.url();
                if (reqUrl.endsWith('.wasm') || reqUrl.endsWith('.pck') || reqUrl.endsWith('.data') || reqUrl.endsWith('.json')) {
                    critical404s++;
                }
            }
        });

        // Hook 2: Catch fatal console errors (WebGL context loss, memory aborts)
        let fatalErrors = 0;
        page.on('console', msg => {
            const text = msg.text().toLowerCase();
            if (msg.type() === 'error' && (text.includes('webgl') || text.includes('abort') || text.includes('memory') || text.includes('exception'))) {
                fatalErrors++;
            }
        });

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait 10 seconds for initial engine boot
        await delay(10000);

        // We simulate a human user click in the center to bypass "Click to Start" screens
        await page.mouse.click(200, 200);
        await delay(5000); // wait after click to see if engine responds

        // Analyze test results
        if (critical404s > 0) {
            isBroken = true;
            reason = `Critical engine file missing (404 Not Found)`;
        } else if (fatalErrors > 0) {
            isBroken = true;
            reason = `Fatal engine crash detected (WebGL/Memory Exception)`;
        }

    } catch (e) {
        console.log(`❌ Timeout or crash loading ${game.name}: ${e.message}`);
        isBroken = true;
        reason = `Crash or Timeout: ${e.message}`;
    } finally {
        await page.close();
    }

    if (isBroken) {
        console.log(`🔴 FLAG AS BROKEN: ${game.name} - Reason: ${reason}`);
    } else {
        console.log(`🟢 PASS: ${game.name} operating normally.`);
    }

    return { ...game, status: isBroken ? 'broken' : 'ok' };
}

async function run() {
    console.log('🚀 Starting Foolproof Broken Game Detection...');
    
    // Read games list
    const raw = await fs.readFile(GAMES_LIST_PATH, 'utf-8');
    const games = JSON.parse(raw);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-web-security']
    });

    const updatedGames = [];
    
    // Test games sequentially
    for (const game of games) {
        // Skip flash and retro emulators as we only want to test modern web engines
        if (game.type === 'flash' || game.type === 'snes' || game.type === 'gba') {
            updatedGames.push(game);
            continue;
        }

        const result = await checkGame(browser, game);
        updatedGames.push(result);
    }

    await browser.close();

    // Save flags back to JSON
    await fs.writeFile(GAMES_LIST_PATH, JSON.stringify(updatedGames, null, 4));
    console.log('\n✅ Scan complete. games_list.json updated. The UI will now gray out broken games.');
}

run().catch(console.error);