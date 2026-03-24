
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const blockedDomains = [
  'googlesyndication.com',
  'google-analytics.com',
  'googletagmanager.com',
  'doubleclick.net',
  'adinplay.com',
  'crazygames.com',
  'poki.com'
];

async function downloadGame(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (request) => {
    const requestUrl = new URL(request.url());
    if (blockedDomains.some(domain => requestUrl.hostname.includes(domain))) {
      console.log(`Blocking request to: ${request.url()}`);
      request.abort();
    } else {
      request.continue();
    }
  });

  page.on('response', async (response) => {
    const responseUrl = new URL(response.url());
    const status = response.status();

    // Ignore redirects and unsuccessful requests
    if (status >= 300 && status <= 399) {
      return;
    }
    if (status !== 204 && status !== 200){
        console.warn(`Non-200 response for ${responseUrl.href}: ${status}`);
    }


    try {
        const buffer = await response.buffer();
        let pathname = responseUrl.pathname;

        // Create a slug from the URL to use as the root directory for the game
        const gameSlug = new URL(url).hostname.replace(/\./g, '-');
        const assetDir = path.join('Assets', gameSlug);

        // if the pathname is just a slash, save it as index.html
        if (pathname === '/') {
            pathname = '/index.html';
        }

        const filePath = path.join(assetDir, pathname);
        const dir = path.dirname(filePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filePath, buffer);
        console.log(`Saved: ${filePath}`);

    } catch (e) {
        console.error(`Could not get buffer for ${responseUrl.href}: ${e.message}`);
    }
  });

  try {
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    console.log('Navigation and asset loading complete.');
  } catch(e) {
    console.error(`Error navigating to ${url}: ${e.message}`);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  const url = process.argv[2];
  if (!url) {
    console.error('Please provide a URL as an argument.');
    process.exit(1);
  }
  downloadGame(url);
}

module.exports = { downloadGame };
