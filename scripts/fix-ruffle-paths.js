#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.resolve(__dirname, '../Assets');
const DRY_RUN = process.argv.includes('--dry-run');

function main() {
    if (!fs.existsSync(ASSETS_DIR)) {
        console.error('Assets directory not found');
        return;
    }

    const games = fs.readdirSync(ASSETS_DIR).filter(f => fs.statSync(path.join(ASSETS_DIR, f)).isDirectory() && !f.startsWith('.'));
    let fixedCount = 0;

    for (const game of games) {
        const indexFile = path.join(ASSETS_DIR, game, 'index.html');
        if (!fs.existsSync(indexFile)) continue;

        let content = fs.readFileSync(indexFile, 'utf8');
        let modified = false;

        // Fix ruffle path
        if (content.includes('ruffle.js') && !content.includes('../zzruffle/ruffle.js')) {
            const regex = /["']([^"']*ruffle\.js)["']/g;
            content = content.replace(regex, (match, p1) => {
                if (p1 === '../zzruffle/ruffle.js' || p1.startsWith('http')) return match;
                return '"../zzruffle/ruffle.js"';
            });
            modified = true;
        }

        // Remove broken marker if it was a ruffle path issue
        if (modified && content.includes('<!--GAME BROKEN-->')) {
            content = content.replace('<!--GAME BROKEN-->', '');
        }

        if (modified) {
            console.log(`[Fix Ruffle Path] ${game}`);
            if (!DRY_RUN) {
                fs.writeFileSync(indexFile, content, 'utf8');
            }
            fixedCount++;
        }
    }

    console.log(`\nFinished! Fixed ${fixedCount} games${DRY_RUN ? ' (DRY RUN)' : ''}.`);
}

main();
