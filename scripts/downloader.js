#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { chromium } = require('playwright');
const crypto = require('crypto');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const { pipeline } = require('stream').promises;
const { createWriteStream, existsSync } = require('fs');

// Configuration
const CONFIG = {
    concurrency: 8,
    timeout: 60000,
    maxRetries: 3,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

// Utility functions
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function extractGameInfo(url) {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    // Extract from URL parameters or path
    const title = params.get('title') || path.basename(urlObj.pathname, '.html') || 'unknown';
    const author = params.get('author') || 'Unknown';
    const link = params.get('link') || slugify(title);

    return {
        title: decodeURIComponent(title),
        author: decodeURIComponent(author),
        slug: slugify(link || title),
        originalUrl: url
    };
}

async function downloadFile(url, filepath, retries = CONFIG.maxRetries) {
    try {
        await fs.mkdir(path.dirname(filepath), { recursive: true });

        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https') ? https : http;

            protocol.get(url, { headers: { 'User-Agent': CONFIG.userAgent } }, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    // Handle redirects
                    downloadFile(response.headers.location, filepath, retries).then(resolve).catch(reject);
                    return;
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                    return;
                }

                const fileStream = createWriteStream(filepath);
                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(filepath);
                });

                fileStream.on('error', reject);
            }).on('error', reject);
        });
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying download of ${url} (${retries} retries left)`);
            await new Promise(r => setTimeout(r, 1000));
            return downloadFile(url, filepath, retries - 1);
        }
        throw error;
    }
}

async function captureAllAssets(page, baseUrl) {
    const assets = new Map();
    const interceptedRequests = new Set();

    // Intercept all network requests
    page.on('request', request => {
        const url = request.url();
        if (!url.startsWith('data:') && !interceptedRequests.has(url)) {
            interceptedRequests.add(url);
            const resourceType = request.resourceType();
            assets.set(url, { type: resourceType, url });
        }
    });

    page.on('response', async response => {
        const url = response.url();
        if (response.ok() && !url.startsWith('data:')) {
            try {
                const buffer = await response.body();
                if (buffer && assets.has(url)) {
                    assets.get(url).buffer = buffer;
                }
            } catch (e) {
                // Some responses can't be captured
            }
        }
    });

    // Navigate to page
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: CONFIG.timeout });

    // Wait for dynamic content
    await page.waitForTimeout(5000);

    // Try to trigger any lazy-loaded content
    await page.evaluate(() => {
        // Scroll to trigger lazy loading
        window.scrollTo(0, document.body.scrollHeight);

        // Click play buttons if they exist
        const playButtons = document.querySelectorAll('button, .play-button, [onclick*="play"], [onclick*="start"]');
        playButtons.forEach(btn => {
            try { btn.click(); } catch(e) {}
        });
    });

    await page.waitForTimeout(3000);

    // Extract additional assets from CSS and inline styles
    const cssAssets = await page.evaluate(() => {
        const assets = [];

        // Parse stylesheets
        for (const sheet of document.styleSheets) {
            try {
                for (const rule of sheet.cssRules) {
                    const text = rule.cssText || '';
                    const urls = text.match(/url\(['"]?([^'")]+)['"]?\)/g) || [];
                    urls.forEach(match => {
                        const url = match.match(/url\(['"]?([^'")]+)['"]?\)/)[1];
                        if (!url.startsWith('data:')) {
                            assets.push(url);
                        }
                    });
                }
            } catch(e) {}
        }

        // Parse inline styles
        document.querySelectorAll('[style]').forEach(el => {
            const style = el.getAttribute('style');
            const urls = style.match(/url\(['"]?([^'")]+)['"]?\)/g) || [];
            urls.forEach(match => {
                const url = match.match(/url\(['"]?([^'")]+)['"]?\)/)[1];
                if (!url.startsWith('data:')) {
                    assets.push(url);
                }
            });
        });

        return assets;
    });

    // Add CSS assets to collection
    cssAssets.forEach(url => {
        const absoluteUrl = new URL(url, baseUrl).href;
        if (!assets.has(absoluteUrl)) {
            assets.set(absoluteUrl, { type: 'css-asset', url: absoluteUrl });
        }
    });

    return assets;
}

function rewriteUrls(html, assetMap, gameSlug) {
    let rewritten = html;

    // Sort URLs by length (longest first) to avoid partial replacements
    const urls = Array.from(assetMap.keys()).sort((a, b) => b.length - a.length);

    urls.forEach(originalUrl => {
        const localPath = assetMap.get(originalUrl);
        if (localPath) {
            // Replace all occurrences of the original URL
            const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedUrl, 'g');
            rewritten = rewritten.replace(regex, localPath);
        }
    });

    return rewritten;
}

function injectLauncherHooks(html) {
    const hookScript = `
<script id="launcher-hooks">
// Launcher hooks for save/load functionality
(function() {
    const GAME_SLUG = window.location.pathname.split('/').filter(p => p).pop() || 'unknown';

    // Load saved progress on startup
    window.__launcher_load = function(progress) {
        if (!progress) return;

        // Restore localStorage
        if (progress.localStorage) {
            Object.keys(progress.localStorage).forEach(key => {
                try {
                    localStorage.setItem(key, progress.localStorage[key]);
                } catch(e) {
                    console.warn('Failed to restore localStorage key:', key);
                }
            });
        }

        // Restore IndexedDB
        if (progress.indexedDB) {
            // This would need more complex implementation for IndexedDB restoration
            window.__indexedDB_data = progress.indexedDB;
        }

        console.log('[Launcher] Progress loaded for', GAME_SLUG);
    };

    // Save current progress
    window.__launcher_save = function() {
        const progress = {
            localStorage: {},
            indexedDB: {},
            lastSavedAt: new Date().toISOString()
        };

        // Save localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            progress.localStorage[key] = localStorage.getItem(key);
        }

        console.log('[Launcher] Progress saved for', GAME_SLUG);
        return progress;
    };

    // Auto-save periodically
    setInterval(() => {
        const progress = window.__launcher_save();
        // Send to parent if in iframe
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'save-progress',
                slug: GAME_SLUG,
                progress: progress
            }, '*');
        }
    }, 30000); // Save every 30 seconds

    // Save on page unload
    window.addEventListener('beforeunload', () => {
        const progress = window.__launcher_save();
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'save-progress',
                slug: GAME_SLUG,
                progress: progress
            }, '*');
        }
    });

    // Load progress if available
    if (window.parent !== window) {
        window.parent.postMessage({
            type: 'request-progress',
            slug: GAME_SLUG
        }, '*');
    }
})();
</script>
`;

    // Inject before first script or at end of head
    if (html.includes('<script')) {
        return html.replace('<script', hookScript + '\n<script');
    } else if (html.includes('</head>')) {
        return html.replace('</head>', hookScript + '\n</head>');
    } else {
        return hookScript + '\n' + html;
    }
}

async function downloadGame(gameUrl, outputDir) {
    console.log(`\nDownloading: ${gameUrl}`);

    const gameInfo = extractGameInfo(gameUrl);
    console.log(`  Title: ${gameInfo.title}`);
    console.log(`  Author: ${gameInfo.author}`);
    console.log(`  Slug: ${gameInfo.slug}`);

    const gameDir = path.join(outputDir, gameInfo.slug);
    const assetsDir = path.join(gameDir, 'assets');

    // Create directories
    await fs.mkdir(gameDir, { recursive: true });
    await fs.mkdir(assetsDir, { recursive: true });

    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const context = await browser.newContext({
            userAgent: CONFIG.userAgent,
            viewport: { width: 1920, height: 1080 }
        });

        const page = await context.newPage();

        // Capture all assets
        console.log('  Capturing assets...');
        const assets = await captureAllAssets(page, gameUrl);
        console.log(`  Found ${assets.size} assets`);

        // Get the main HTML
        const html = await page.content();

        // Download assets and create mapping
        const assetMap = new Map();
        let downloadCount = 0;

        for (const [url, asset] of assets) {
            try {
                const urlObj = new URL(url);
                const ext = path.extname(urlObj.pathname) || '.bin';
                const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
                const filename = `${hash}${ext}`;
                const localPath = path.join(assetsDir, filename);
                const relativePath = `assets/${filename}`;

                if (asset.buffer) {
                    // Use captured buffer
                    await fs.writeFile(localPath, asset.buffer);
                } else {
                    // Download the file
                    await downloadFile(url, localPath);
                }

                assetMap.set(url, relativePath);
                downloadCount++;

                if (downloadCount % 10 === 0) {
                    console.log(`    Downloaded ${downloadCount}/${assets.size} assets...`);
                }
            } catch (error) {
                console.warn(`    Failed to download ${url}:`, error.message);
            }
        }

        console.log(`  Downloaded ${downloadCount} assets`);

        // Try to capture thumbnail
        console.log('  Capturing thumbnail...');
        const thumbnail = await page.evaluate(() => {
            // Try various methods to find the game logo/thumbnail
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) return ogImage.content;

            const logo = document.querySelector('img.logo, img#logo, img[alt*="logo"], .game-logo img');
            if (logo) return logo.src;

            const firstImg = document.querySelector('img');
            if (firstImg) return firstImg.src;

            return null;
        });

        if (thumbnail) {
            try {
                const thumbnailPath = path.join(gameDir, 'thumbnail.png');

                if (thumbnail.startsWith('data:')) {
                    // Handle data URLs
                    const base64Data = thumbnail.split(',')[1];
                    await fs.writeFile(thumbnailPath, Buffer.from(base64Data, 'base64'));
                } else {
                    // Download thumbnail
                    await downloadFile(thumbnail, thumbnailPath);
                }
                console.log('  Thumbnail saved');
            } catch (error) {
                console.warn('  Failed to save thumbnail:', error.message);
            }
        }

        // Rewrite HTML with local paths
        console.log('  Rewriting HTML...');
        let rewrittenHtml = rewriteUrls(html, assetMap, gameInfo.slug);

        // Inject launcher hooks
        rewrittenHtml = injectLauncherHooks(rewrittenHtml);

        // Save the HTML
        await fs.writeFile(path.join(gameDir, 'index.html'), rewrittenHtml);

        // Create initial progress file
        const progressFile = {
            localStorage: {},
            indexedDB: {},
            files: {},
            lastSavedAt: null
        };
        await fs.writeFile(
            path.join(gameDir, 'progress.json'),
            JSON.stringify(progressFile, null, 2)
        );

        // Create metadata file
        const metadata = {
            title: gameInfo.title,
            author: gameInfo.author,
            slug: gameInfo.slug,
            originalUrl: gameUrl,
            downloadedAt: new Date().toISOString(),
            assetCount: downloadCount
        };
        await fs.writeFile(
            path.join(gameDir, 'metadata.json'),
            JSON.stringify(metadata, null, 2)
        );

        console.log(`  ✅ Game downloaded successfully to ${gameDir}`);

    } finally {
        await browser.close();
    }

    return gameInfo;
}

async function main() {
    const args = process.argv.slice(2);

    // Parse arguments
    const inputFile = args.includes('--input')
        ? args[args.indexOf('--input') + 1]
        : 'games.txt';

    const outputDir = args.includes('--out')
        ? args[args.indexOf('--out') + 1]
        : './games';

    const concurrency = args.includes('--concurrency')
        ? parseInt(args[args.indexOf('--concurrency') + 1])
        : CONFIG.concurrency;

    console.log('Jeoweb Offline Game Downloader');
    console.log('================================');
    console.log(`Input file: ${inputFile}`);
    console.log(`Output directory: ${outputDir}`);
    console.log(`Concurrency: ${concurrency}`);

    // Read games list
    let gameUrls;
    try {
        const content = await fs.readFile(inputFile, 'utf-8');
        gameUrls = content.split('\n')
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('#'));

        console.log(`Found ${gameUrls.length} games to download\n`);
    } catch (error) {
        console.error(`Failed to read ${inputFile}:`, error.message);
        process.exit(1);
    }

    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    // Download games with concurrency control
    const results = [];
    for (let i = 0; i < gameUrls.length; i += concurrency) {
        const batch = gameUrls.slice(i, i + concurrency);
        const batchResults = await Promise.allSettled(
            batch.map(url => downloadGame(url, outputDir))
        );
        results.push(...batchResults);
    }

    // Summary
    console.log('\n================================');
    console.log('Download Summary:');
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);

    if (failed > 0) {
        console.log('\nFailed downloads:');
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.log(`  - ${gameUrls[index]}: ${result.reason.message}`);
            }
        });
    }

    console.log('\nDone! Games are ready for offline play.');
}

// Install check
async function checkDependencies() {
    try {
        require('playwright');
    } catch (error) {
        console.error('Missing dependency: playwright');
        console.log('Install with: npm install playwright');
        console.log('Then install browser: npx playwright install chromium');
        process.exit(1);
    }
}

// Run
checkDependencies().then(() => {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
});