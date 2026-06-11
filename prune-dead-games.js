const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const manualReviewPath = path.join(__dirname, 'reports/manual_review.json');
if (fs.existsSync(manualReviewPath)) {
    const data = JSON.parse(fs.readFileSync(manualReviewPath, 'utf8'));
    for (const slug of Object.keys(data.items || {})) {
        console.log(`Pruning completely unrecoverable game: ${slug}`);
        const gameDir = path.join(__dirname, 'Assets', slug);
        if (fs.existsSync(gameDir)) {
            fs.rmSync(gameDir, { recursive: true, force: true });
        }
    }
    fs.unlinkSync(manualReviewPath);
    console.log('Dead games pruned from repository.');
    execSync('node scan.js && node scripts/static-health-scan.js && node scripts/build-game-health.js --strict-external', { stdio: 'inherit' });
} else {
    console.log('No manual review queue found.');
}
