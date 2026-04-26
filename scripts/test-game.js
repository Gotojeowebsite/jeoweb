// Stream errors as they happen and exit on first PAGE_ERR or after timeout.
const puppeteer = require('puppeteer');

const slug = process.argv[2] || 'bendy';
const waitMs = parseInt(process.argv[3] || '60000', 10);
const url = `http://localhost:3000/Assets/${slug}/index.html`;

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    protocolTimeout: 240000
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);

  let pageErr = null;
  page.on('pageerror', e => { pageErr = e.message; console.log('PAGE_ERR:', e.message); });
  page.on('console', m => {
    const t = m.text();
    if (m.type() === 'error' && /unity|range|dataview|exception/i.test(t)) {
      console.log(`[${m.type()}]`, t.slice(0, 300));
    }
  });
  page.on('requestfailed', r => {
    const u = r.url();
    if (!/undefined\/|chrome-extension/.test(u)) {
      console.log('REQ_FAIL:', u.slice(0, 120), r.failure().errorText);
    }
  });
  page.on('response', r => {
    if (r.status() >= 400) {
      const u = r.url();
      if (!/undefined\/|chrome-extension/.test(u)) console.log('HTTP', r.status(), u.slice(0, 120));
    }
  });

  console.log('GOTO', url);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (e) { console.log('GOTO_FAIL:', e.message); }

  console.log('WAIT', waitMs, 'ms ...');
  await new Promise(r => setTimeout(r, waitMs));

  // Take screenshot to disk
  const screenshotPath = `/tmp/test-${slug}.png`;
  try {
    await page.screenshot({ path: screenshotPath });
    console.log('SCREENSHOT:', screenshotPath);
  } catch (e) { console.log('SCREENSHOT_FAIL:', e.message); }

  console.log('FINAL_PAGE_ERR:', pageErr || 'none');
  await browser.close().catch(() => {});
  process.exit(0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
