#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.resolve(__dirname, '../Assets');
const DRY_RUN = process.argv.includes('--dry-run');

const DEAD_HOSTS = ['editmysite.com', 'wix.com'];

function main() {
    if (!fs.existsSync(ASSETS_DIR)) return;

    const games = fs.readdirSync(ASSETS_DIR).filter(f => fs.statSync(path.join(ASSETS_DIR, f)).isDirectory() && !f.startsWith('.'));
    let fixedCount = 0;

    for (const game of games) {
        const gameDir = path.join(ASSETS_DIR, game);
        const indexFile = path.join(gameDir, 'index.html');
        
        if (!fs.existsSync(indexFile)) continue;

        let content = fs.readFileSync(indexFile, 'utf8');
        let modified = false;

        for (const host of DEAD_HOSTS) {
            if (content.includes(host)) {
                // simple replace of script src
                const regex = new RegExp(`src=["'][^"']*${host}[^"']*["']`, 'gi');
                const matches = content.match(regex);
                if (matches) {
                    for (const match of matches) {
                        const stubFile = `stub_${Date.now()}.js`;
                        const stubPath = path.join(gameDir, '_external_mirror', stubFile);
                        const stubSrc = `_external_mirror/${stubFile}`;
                        
                        if (!DRY_RUN) {
                            if (!fs.existsSync(path.join(gameDir, '_external_mirror'))) {
                                fs.mkdirSync(path.join(gameDir, '_external_mirror'));
                            }
                            fs.writeFileSync(stubPath, '// Dead external stub\nconsole.log("Stubbed dead external dependency");\n');
                        }
                        
                        content = content.replace(match, `src="${stubSrc}"`);
                        modified = true;
                    }
                }
            }
        }

        if (modified) {
            console.log(`[Stub Dead Externals] ${game}`);
            if (!DRY_RUN) {
                fs.writeFileSync(indexFile, content, 'utf8');
            }
            fixedCount++;
        }
    }

    console.log(`\nFinished! Stubbed externals in ${fixedCount} games${DRY_RUN ? ' (DRY RUN)' : ''}.`);
}

main();
