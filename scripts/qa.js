
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { jsonrepair } = require('jsonrepair');

const port = 8080;
const gamesListPath = path.join(__dirname, '..', 'games_list.json');
const assetsDir = path.join(__dirname, '..', 'Assets');

// Simple static server
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, '..', req.url);

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

async function runQATest() {
    server.listen(port, async () => {
        console.log(`Server running at http://localhost:${port}`);
        
        const games = JSON.parse(fs.readFileSync(gamesListPath, 'utf-8'));
        const browser = await puppeteer.launch();

        for (const game of games) {
            let isBroken = false;
            const page = await browser.newPage();
            
            page.on('requestfailed', request => {
                const error = request.failure();
                if (error && (error.errorText.includes('net::ERR_ABORTED') || error.errorText.includes('404') || error.errorText.includes('500'))) {
                    console.error(`Request failed for ${game.name}: ${request.url()} with error: ${error.errorText}`);
                    if (!request.url().includes('favicon.ico')) { // Ignore missing favicons
                        isBroken = true;
                    }
                }
            });

            const gameUrl = `http://localhost:${port}/${game.url}`;
            console.log(`Testing ${game.name} at ${gameUrl}`);
            
            try {
                await page.goto(gameUrl, { waitUntil: 'networkidle0', timeout: 30000 });
                if (isBroken) {
                    game.status = 'broken';
                } else if (game.status === 'broken' && !isBroken) {
                    // If it was broken but no errors were found, mark it as operational
                    game.status = 'operational'; 
                }
            } catch (e) {
                console.error(`Error testing ${game.name}: ${e.message}`);
                game.status = 'broken';
            } finally {
                await page.close();
            }
        }

        await browser.close();
        server.close();

        try {
            const repairedJson = jsonrepair(JSON.stringify(games, null, 2));
            fs.writeFileSync(gamesListPath, repairedJson);
            console.log('games_list.json has been updated.');
        } catch(e) {
            console.error('Error writing updated games_list.json:', e);
        }
    });
}

if (require.main === module) {
    runQATest();
}

module.exports = { runQATest };
