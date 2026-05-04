// scripts/deep-asset-scraper.js
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const path = require('path');
const { URL } = require('url');

async function downloadGame(portalUrl, gameSlug) {
    console.log(`\n🕵️ Initiating Deep Scrape for: ${portalUrl}`);
    
    const assetsDir = path.join(__dirname, '../Assets', gameSlug);
    await fs.mkdir(assetsDir, { recursive: true });

    const browser = await puppeteer.launch({
        headless: "new",
        // Anti-Detection: Spoofing the browser to look completely legitimate
        args: [
            '--no-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--window-size=1920,1080'
        ]
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Enable deep network interception
    await page.setRequestInterception(true);
    
    const downloadedAssets = new Set();

    page.on('request', async req => {
        // Spoof Referer & Origin headers to bypass aggressive hotlink protection (e.g. Poki Site-locks)
        const headers = req.headers();
        headers['referer'] = portalUrl;
        headers['origin'] = new URL(portalUrl).origin;
        
        await req.continue({ headers });
    });

    page.on('response', async res => {
        const resUrl = res.url();
        const status = res.status();

        // Filter out ad networks and analytics, capture ONLY game data
        if (status === 200 && !resUrl.includes('google-analytics') && !resUrl.includes('doubleclick') && !resUrl.includes('ads')) {
            try {
                const parsedUrl = new URL(resUrl);
                let relativePath = parsedUrl.pathname;
                if (relativePath === '/') relativePath = '/index.html';
                
                // Decode URI components to preserve exactly how the engine expects paths
                relativePath = decodeURIComponent(relativePath);
                
                const savePath = path.join(assetsDir, relativePath);
                
                if (!downloadedAssets.has(savePath)) {
                    downloadedAssets.add(savePath);
                    const buffer = await res.buffer();
                    
                    await fs.mkdir(path.dirname(savePath), { recursive: true });
                    await fs.writeFile(savePath, buffer);
                    console.log(`📥 Captured: ${relativePath}`);
                }
            } catch (err) {
                // Handle aborted streaming buffers silently
            }
        }
    });

    console.log('Navigating to portal and hunting for hidden game iframe...');
    try {
        await page.goto(portalUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (err) {
        console.log(`⚠️ Portal navigation timed out, but DOM might be ready. Continuing...`);
    }

    console.log('Waiting for portal scripts to inject the game iframe...');
    // Give the portal some time to run its JavaScript and build the iframe
    await new Promise(r => setTimeout(r, 8000));

    // DOM Traversal & Iframe Penetration
    const iframeUrl = await page.evaluate(() => {
        // Find the most likely game iframe bypassing UI wrappers
        const frames = document.querySelectorAll('iframe');
        for (let frame of frames) {
            if (frame.src && !frame.src.includes('ads') && frame.clientWidth > 300) {
                return frame.src;
            }
        }
        return null;
    });

    if (iframeUrl) {
        console.log(`🎯 True Game URL located! Penetrating iframe directly: ${iframeUrl}`);
        
        try {
            // Navigate directly to the naked game URL to strip away the portal wrapper
            // Using domcontentloaded instead of networkidle0 because games constantly ping analytics
            await page.goto(iframeUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        } catch (err) {
            console.log(`⚠️ Navigation timed out (expected for games with constant telemetry streams). Continuing...`);
        }
        
        // Crucial Wait: Wait 25s to ensure heavy WebAssembly modules and multi-part Data blobs finish streaming
        console.log('⏳ Waiting 25 seconds for deep engine assets to stream...');
        await new Promise(r => setTimeout(r, 25000));
        
        // Create an entry point index.html that redirects to the inner game folder
        const iframePath = new URL(iframeUrl).pathname.substring(1); // e.g. "458768/0e9dcadf-..." or similar, but the actual index.html is often the pathname itself or in a subfolder
        // Let's find the deepest index.html we downloaded to use as the redirect target
        let gameEntryPoint = '';
        for (const assetPath of downloadedAssets) {
            if (assetPath.endsWith('index.html') && assetPath !== path.join(assetsDir, 'index.html') && !assetPath.includes('en/g/')) {
                // Find the relative path from assetsDir
                gameEntryPoint = path.relative(assetsDir, assetPath).replace(/\\/g, '/');
                break;
            }
        }
        
        if (gameEntryPoint) {
            const wrapperHtml = `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=${gameEntryPoint}" />
</head>
<body style="background: black;"></body>
</html>`;
            await fs.writeFile(path.join(assetsDir, 'index.html'), wrapperHtml);
            console.log(`🔗 Created wrapper redirecting to: ${gameEntryPoint}`);
        }

        console.log(`\n✅ Deep scrape complete for [${gameSlug}].`);
        console.log(`📦 Total unblockable assets captured: ${downloadedAssets.size}`);
    } else {
        // 1games.io and similar portals load the game directly into the page
        // (Unity WebGL embedded inline) instead of using an <iframe>. In that
        // case, just wait longer so the large .data / .wasm assets finish
        // streaming — they're easily 30+ MB and the 8-second initial wait is
        // not enough.
        console.log('No iframe detected — assuming inline game; waiting 30s for asset stream…');
        await new Promise(r => setTimeout(r, 30000));
        console.log(`⏬ Inline-mode capture complete. Total assets: ${downloadedAssets.size}`);
    }

    await browser.close();
}

// CLI Execution
if (require.main === module) {
    const targetUrl = process.argv[2];
    const slug = process.argv[3];
    if (!targetUrl || !slug) {
        console.log("Usage: node scripts/deep-asset-scraper.js <Portal_URL> <Game_Slug>");
        process.exit(1);
    }
    downloadGame(targetUrl, slug).catch(console.error);
}