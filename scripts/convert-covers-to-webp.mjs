import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.resolve(__dirname, '../Assets');

function main() {
    if (!fs.existsSync(ASSETS_DIR)) return;

    const games = fs.readdirSync(ASSETS_DIR).filter(f => fs.statSync(path.join(ASSETS_DIR, f)).isDirectory() && !f.startsWith('.'));
    let converted = 0;

    for (const game of games) {
        const gameDir = path.join(ASSETS_DIR, game);
        const files = fs.readdirSync(gameDir);
        const image = files.find(f => f.match(/\.(png|jpg|jpeg)$/i));

        if (image) {
            const inPath = path.join(gameDir, image);
            const outPath = path.join(gameDir, image.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

            if (!fs.existsSync(outPath)) {
                try {
                    // Try using cwebp or sharp if available, but for now just use a simple copy as a stub 
                    // if cwebp is not installed on the system.
                    try {
                        execSync(`cwebp -q 80 "${inPath}" -o "${outPath}"`, { stdio: 'ignore' });
                        converted++;
                    } catch (e) {
                        // fallback: just copy the file if cwebp isn't available
                        console.warn(`cwebp failed or not installed, falling back to skip for ${game}`);
                    }
                } catch (e) {
                    console.error(`Failed to convert ${image} in ${game}`);
                }
            }
        }
    }
    console.log(`Converted ${converted} covers to WebP.`);
}

main();
