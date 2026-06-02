#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IN_FILE = path.join(ROOT, 'game_health.json');
const OUT_FILE = path.join(ROOT, 'game_health_slim.json');

function main() {
    if (!fs.existsSync(IN_FILE)) {
        console.error(`${IN_FILE} not found`);
        process.exit(1);
    }

    const inSize = fs.statSync(IN_FILE).size;
    const data = JSON.parse(fs.readFileSync(IN_FILE, 'utf8'));

    if (data.schema !== 2) {
        console.error(`Unexpected schema: ${data.schema}`);
        process.exit(1);
    }

    const outData = {
        schema: data.schema,
        generated_at: data.generated_at,
        max_age_days: data.max_age_days,
        counts: data.counts,
        confidence: data.confidence,
        games: {}
    };

    for (const [slug, info] of Object.entries(data.games || {})) {
        outData.games[slug] = {
            verdict: info.verdict || 'unknown',
            confidence: info.confidence || 'low',
            source: info.source || '',
            reason: info.reason || ''
        };
    }

    const outStr = JSON.stringify(outData);
    fs.writeFileSync(OUT_FILE, outStr, 'utf8');

    const outSize = fs.statSync(OUT_FILE).size;
    console.log(`Slimmed game_health.json: ${(inSize/1024).toFixed(1)}KB -> ${(outSize/1024).toFixed(1)}KB`);
}

main();
