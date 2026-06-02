#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IN_FILE = path.join(ROOT, 'games_list.json');
const OUT_FILE = path.join(ROOT, 'games_catalog.json');

function main() {
    if (!fs.existsSync(IN_FILE)) {
        console.error(`${IN_FILE} not found`);
        process.exit(1);
    }

    const inSize = fs.statSync(IN_FILE).size;
    const data = JSON.parse(fs.readFileSync(IN_FILE, 'utf8'));

    if (!Array.isArray(data)) {
        console.error(`Expected array, got ${typeof data}`);
        process.exit(1);
    }

    const outData = data.map(g => ({
        name: g.name,
        url: g.url,
        image: g.image,
        type: g.type,
        status: g.status,
        tags: g.tags,
        size: g.size,
        requested: g.requested,
        leaderboard: g.leaderboard
    }));

    const outStr = JSON.stringify(outData); // No pretty print for max minification
    fs.writeFileSync(OUT_FILE, outStr, 'utf8');

    const outSize = fs.statSync(OUT_FILE).size;
    console.log(`Slimmed games_list.json: ${(inSize/1024).toFixed(1)}KB -> ${(outSize/1024).toFixed(1)}KB`);
}

main();
