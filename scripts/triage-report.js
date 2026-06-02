#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HEALTH_FILE = path.join(ROOT, 'game_health.json');
const GAMES_LIST = path.join(ROOT, 'games_list.json');

function main() {
    if (!fs.existsSync(HEALTH_FILE)) {
        console.error(`Error: ${HEALTH_FILE} not found.`);
        process.exit(1);
    }

    const healthData = JSON.parse(fs.readFileSync(HEALTH_FILE, 'utf8'));
    const gamesData = fs.existsSync(GAMES_LIST) ? JSON.parse(fs.readFileSync(GAMES_LIST, 'utf8')) : [];

    const gamesMap = new Map();
    for (const g of gamesData) {
        gamesMap.set(g.name, g);
    }

    const tier1 = [];
    const tier2 = [];
    const tier3 = [];
    const tier4 = [];

    const games = healthData.games || {};
    
    for (const [slug, info] of Object.entries(games)) {
        const isBroken = info.verdict === 'broken' || info.verdict === 'probable_broken';
        const isFailing = isBroken || info.verdict === 'unknown' || info.verdict === 'unverified';
        
        if (!isFailing) continue;

        const gameDef = gamesMap.get(slug) || { type: 'unknown' };
        const reason = info.reason || '';

        // Triage categorization
        if (reason.includes('MISSING_CRITICAL_FILE') && (reason.includes('ruffle.js') || reason.includes('emulator.js'))) {
            tier1.push({ slug, type: gameDef.type, reason, fix: 'Fix shared runtime path' });
        } else if (reason.includes('EMPTY_ENTRY') || reason.includes('NO_HTML')) {
            tier2.push({ slug, type: gameDef.type, reason, fix: 'Regenerate index.html' });
        } else if (reason.includes('LOCAL_HTTP_ERROR') || reason.includes('INIT_RUNTIME_ERROR') || reason.includes('MISSING_CRITICAL_FILE')) {
            tier3.push({ slug, type: gameDef.type, reason, fix: 'Manual fix / Recover missing files' });
        } else {
            tier4.push({ slug, type: gameDef.type, reason: reason || 'Unknown error', fix: 'Unknown/Unrecoverable' });
        }
    }

    console.log('# Game Health Triage Report\n');
    console.log(`**Generated:** ${new Date().toISOString()}`);
    console.log(`**Total Failing Games:** ${tier1.length + tier2.length + tier3.length + tier4.length}\n`);

    const printTier = (tierNum, name, desc, list) => {
        console.log(`## Tier ${tierNum}: ${name} (${list.length} games)`);
        console.log(`*${desc}*\n`);
        if (list.length === 0) {
            console.log('*None*\n');
            return;
        }
        console.log('| Game | Type | Reason | Fix Strategy |');
        console.log('|---|---|---|---|');
        for (const item of list) {
            console.log(`| \`${item.slug}\` | ${item.type} | ${item.reason} | ${item.fix} |`);
        }
        console.log('\n');
    };

    printTier(1, 'Quick Wins', 'Path issues to shared runtimes (ruffle.js, emulatorjs)', tier1);
    printTier(2, 'Recoverable', 'Missing entry points but game data might exist', tier2);
    printTier(3, 'Manual Fix', 'Missing specific assets, dead external URLs', tier3);
    printTier(4, 'Uncategorized', 'Other or unknown errors', tier4);
}

main();
