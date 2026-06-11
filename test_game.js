const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (response.status() === 404) console.log('404 URL:', response.url());
  });
  await page.goto('http://localhost:8083/Assets/bad-ice-cream-2/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000); // Wait for loading
  await browser.close();
})();
