#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.resolve(__dirname, '../Assets');
const DRY_RUN = process.argv.includes('--dry-run');

function main() {
    if (!fs.existsSync(ASSETS_DIR)) return;

    const games = fs.readdirSync(ASSETS_DIR).filter(f => fs.statSync(path.join(ASSETS_DIR, f)).isDirectory() && !f.startsWith('.'));
    let fixedCount = 0;

    for (const game of games) {
        const indexFile = path.join(ASSETS_DIR, game, 'index.html');
        if (!fs.existsSync(indexFile)) continue;

        let content = fs.readFileSync(indexFile, 'utf8');
        
        if ((content.includes('poki-sdk') || content.includes('PokiBridge') || content.includes('window.PokiSDK')) && !content.includes('poki-offline-shim.js')) {
            // Find the first script tag to inject before
            const scriptIndex = content.indexOf('<script');
            if (scriptIndex !== -1) {
                content = content.slice(0, scriptIndex) + '<script src="/poki-offline-shim.js"></script>\n' + content.slice(scriptIndex);
                console.log(`[Inject Poki Shim] ${game}`);
                if (!DRY_RUN) {
                    fs.writeFileSync(indexFile, content, 'utf8');
                }
                fixedCount++;
            }
        }
    }

    console.log(`\nFinished! Injected shim in ${fixedCount} games${DRY_RUN ? ' (DRY RUN)' : ''}.`);
}

main();
