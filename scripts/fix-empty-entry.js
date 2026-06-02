#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.resolve(__dirname, '../Assets');
const DRY_RUN = process.argv.includes('--dry-run');

function generateFlashLoader(swfFile) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Game</title>
    <style>body { margin: 0; background: #000; overflow: hidden; height: 100vh; display: flex; align-items: center; justify-content: center; } #player { width: 100%; height: 100%; }</style>
</head>
<body>
    <div id="player"></div>
    <script src="../zzruffle/ruffle.js"></script>
    <script>
        window.RufflePlayer = window.RufflePlayer || {};
        window.addEventListener("load", (event) => {
            const ruffle = window.RufflePlayer.newest();
            const player = ruffle.createPlayer();
            const container = document.getElementById("player");
            container.appendChild(player);
            player.load("${swfFile}");
            player.style.width = "100%";
            player.style.height = "100%";
        });
    </script>
</body>
</html>`;
}

function generateEmulatorJsLoader(romFile, ext) {
    let core = 'gba';
    if (['.sfc', '.smc'].includes(ext)) core = 'snes';
    else if (['.n64', '.z64'].includes(ext)) core = 'n64';
    else if (['.nes'].includes(ext)) core = 'nes';
    else if (['.nd'].includes(ext)) core = 'nds';

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Game</title>
    <style>body, html { margin: 0; padding: 0; width: 100%; height: 100%; background-color: #000; }</style>
</head>
<body>
    <div style="width:100%;height:100%;max-width:100%">
        <div id="game"></div>
    </div>
    <script>
        EJS_player = '#game';
        EJS_core = '${core}';
        EJS_gameUrl = '${romFile}';
        EJS_pathtodata = '/emulatorjs/';
    </script>
    <script src="/emulatorjs/loader.js"></script>
</body>
</html>`;
}

function main() {
    if (!fs.existsSync(ASSETS_DIR)) return;

    const games = fs.readdirSync(ASSETS_DIR).filter(f => fs.statSync(path.join(ASSETS_DIR, f)).isDirectory() && !f.startsWith('.'));
    let fixedCount = 0;

    for (const game of games) {
        const gameDir = path.join(ASSETS_DIR, game);
        const indexFile = path.join(gameDir, 'index.html');
        
        const hasIndex = fs.existsSync(indexFile);
        const isSizeZero = hasIndex && fs.statSync(indexFile).size === 0;

        if (!hasIndex || isSizeZero) {
            const files = fs.readdirSync(gameDir);
            let content = null;
            let fileToLoad = null;

            // Flash
            const swfFile = files.find(f => f.endsWith('.swf'));
            if (swfFile) {
                content = generateFlashLoader(swfFile);
                fileToLoad = swfFile;
            } else {
                // Emulator JS
                const romFile = files.find(f => ['.zip', '.7z', '.gba', '.sfc', '.smc', '.nes', '.n64', '.z64'].includes(path.extname(f).toLowerCase()));
                if (romFile) {
                    content = generateEmulatorJsLoader(romFile, path.extname(romFile).toLowerCase());
                    fileToLoad = romFile;
                } else {
                    // HTML5 Redirect
                    const htmlFile = files.find(f => f.endsWith('.html') && f !== 'index.html');
                    if (htmlFile) {
                        content = `<meta http-equiv="refresh" content="0; url=${htmlFile}" />`;
                        fileToLoad = htmlFile;
                    }
                }
            }

            if (content) {
                console.log(`[Fix Empty Entry] ${game} -> Using ${fileToLoad}`);
                if (!DRY_RUN) {
                    fs.writeFileSync(indexFile, content, 'utf8');
                }
                fixedCount++;
            }
        }
    }

    console.log(`\nFinished! Fixed ${fixedCount} games${DRY_RUN ? ' (DRY RUN)' : ''}.`);
}

main();
