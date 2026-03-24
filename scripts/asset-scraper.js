// asset-scraper.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

async function downloadGame(targetUrl, localBaseDir) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // 1 & 2. Network Interception Enablement
  await page.setRequestInterception(true);
  
  page.on('request', (request) => {
    const url = request.url();
    // Block known third-party analytics to optimize download
    if (url.includes('google-analytics') || url.includes('doubleclick')) {
      request.abort();
    } else {
      request.continue();
    }
  });

  // 3. Dynamic Asset Buffering
  // Specifically targeting dynamically loaded assets essential for modern web games,
  // including .wasm binaries, compressed .data files, .mem files, and XHR requests.
  // 4. Recreation of Directory Architecture
  page.on('response', async (response) => {
    const url = new URL(response.url());
    
    // Ignore data URIs and strictly process HTTP/HTTPS traffic
    if (!url.protocol.startsWith('http')) return;

    try {
      // Capture their raw data buffers directly from the network stream
      const buffer = await response.buffer();
      
      // Determine relative path structure
      const relativePath = url.pathname === '/' ? '/index.html' : url.pathname;
      const localFilePath = path.join(localBaseDir, url.hostname, relativePath);
      const localDirPath = path.dirname(localFilePath);

      // Recreate original external server's directory tree locally
      fs.mkdirSync(localDirPath, { recursive: true });
      fs.writeFileSync(localFilePath, buffer);
      
      console.log(`[Buffered Asset] Saved: ${localFilePath}`);
    } catch (error) {
      console.error(`[Buffer Error] Failed to read/write ${url.href}:`, error.message);
    }
  });

  console.log(`Starting asset acquisition for: ${targetUrl}`);
  await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 60000 });
  
  await browser.close();
  console.log('Asset acquisition complete.');
}

module.exports = { downloadGame };
