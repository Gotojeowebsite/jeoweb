// scripts/deep-batch-runner.js
const fs = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');

const BATCH_FILE = path.join(__dirname, '../deep-batch.txt');

async function runBatch() {
    try {
        const content = await fs.readFile(BATCH_FILE, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('#'));
        
        if (lines.length === 0) {
            console.log('⚠️ deep-batch.txt is empty or contains only comments. Add some links!');
            return;
        }

        for (const line of lines) {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length < 2) {
                console.log(`⚠️ Skipping invalid line (must be URL | SLUG): ${line}`);
                continue;
            }
            
            const [url, slug] = parts;
            console.log(`\n======================================================`);
            console.log(`🚀 BATCH JOB STARTING: [${slug}] from ${url}`);
            console.log(`======================================================\n`);
            
            await new Promise((resolve) => {
                const child = spawn('node', [path.join(__dirname, 'deep-asset-scraper.js'), url, slug], { stdio: 'inherit' });
                
                child.on('close', code => {
                    if (code === 0) {
                        console.log(`✅ Finished downloading: ${slug}. Registering game...`);
                        
                        // Automatically register the game and find its image
                        const addProcess = spawn('node', [path.join(__dirname, 'add-game.js'), slug], { stdio: 'inherit' });
                        addProcess.on('close', () => {
                            resolve();
                        });
                    } else {
                        console.log(`❌ Scraper failed for ${slug} with exit code ${code}`);
                        resolve(); // Continue to next game regardless of success/failure
                    }
                });
            });
        }
        
        console.log(`\n✅ All batch jobs complete. Updating games_list.json...`);
        
        const scanProcess = spawn('node', [path.join(__dirname, '../scan.js')], { stdio: 'inherit' });
        scanProcess.on('close', () => {
            console.log('🎉 Catalog updated! Your new batch of games is ready to play.');
        });
        
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.error(`❌ Batch file not found. Please create: ${BATCH_FILE}`);
        } else {
            console.error(`❌ Error executing batch runner:`, e);
        }
    }
}

runBatch();