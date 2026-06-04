'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const http = require('http');
const https = require('https');
const { ASSETS_DIR, nowStamp, rmSafe, sleep } = require('./utils');

async function probeUrl(url, { timeoutMs = 5000 } = {}) {
	return new Promise((resolve) => {
		try {
			const parsedUrl = new URL(url);
			const lib = parsedUrl.protocol === 'https:' ? https : http;
			const req = lib.request(url, {
				method: 'HEAD',
				timeout: timeoutMs,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
				}
			}, (res) => {
				resolve({ ok: res.statusCode === 200, status: res.statusCode, contentType: res.headers['content-type'] });
			});
			req.on('error', () => resolve({ ok: false, status: 0 }));
			req.on('timeout', () => { req.destroy(); resolve({ ok: false, status: 0 }); });
			req.end();
		} catch {
			resolve({ ok: false, status: 0 });
		}
	});
}

async function scrapeGameFromUrl({ url, destDir, timeoutMs = 30000, verbose = false }) {
	const log = (...a) => { if (verbose) console.log(`  [scrape]`, ...a); };
	let browser;
	try {
		browser = await chromium.launch({
			headless: true,
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-web-security',
				'--disable-features=IsolateOrigins,site-per-process',
			]
		});
		const context = await browser.newContext({ ignoreHTTPSErrors: true });
		const page = await context.newPage();

		let assetCount = 0;
		let totalBytes = 0;
		const downloaded = new Set();

		page.on('response', async res => {
			const status = res.status();
			if (status !== 200 && status !== 206) return;
			const reqUrl = res.url();
			try {
				const parsed = new URL(reqUrl);
				if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return;
				
				let relPath = parsed.pathname;
				if (relPath === '/' || relPath === '') relPath = '/index.html';
				relPath = decodeURIComponent(relPath).replace(/\.\.+/g, '_').replace(/^\//, '');
				
				// Optional: maintain host dir if it's an external asset
				const savePath = path.join(destDir, relPath);
				if (!downloaded.has(savePath)) {
					const buf = await res.body();
					if (buf && buf.length > 0) {
						fs.mkdirSync(path.dirname(savePath), { recursive: true });
						fs.writeFileSync(savePath, buf);
						downloaded.add(savePath);
						assetCount++;
						totalBytes += buf.length;
					}
				}
			} catch {}
		});

		await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
		
		// Wait to allow assets to load
		await page.waitForTimeout(15000);

		// If no index.html is written, capture the outer html
		const indexPath = path.join(destDir, 'index.html');
		if (!fs.existsSync(indexPath)) {
			const content = await page.content();
			fs.writeFileSync(indexPath, content);
			assetCount++;
			totalBytes += Buffer.byteLength(content);
		}

		return { ok: assetCount > 0, assetCount, totalBytes, entry: 'index.html' };
	} catch (err) {
		log(`Scrape error: ${err.message}`);
		return { ok: false, assetCount: 0, totalBytes: 0, entry: null };
	} finally {
		if (browser) await browser.close();
	}
}

async function healGame({ slug, gameType, failures, assetsDir, recoverySources, verbose = false, dryRun = false, rateLimitMs = 2000 }) {
	const log = (...a) => { if (verbose) console.log(`  [heal]`, ...a); };
	
	let candidatesTriedCount = 0;
	
	// Filter sources by gameType if applicable
	const sources = recoverySources.filter(s => !s.applies_to || s.applies_to.includes(gameType))
		.sort((a, b) => (a.priority || 100) - (b.priority || 100));

	for (const source of sources) {
		candidatesTriedCount++;
		const candidateUrl = source.url_template.replace('{slug}', slug);
		log(`Probing ${candidateUrl}`);
		
		await sleep(rateLimitMs);
		const probe = await probeUrl(candidateUrl);
		
		if (probe.ok) {
			log(`Source alive. Scraping...`);
			const stamp = nowStamp();
			const recoveryDir = path.join(ASSETS_DIR, '.recovery', `${slug}-${stamp}`);
			
			if (!dryRun) {
				const scrapeResult = await scrapeGameFromUrl({
					url: candidateUrl,
					destDir: recoveryDir,
					verbose
				});
				
				if (scrapeResult.ok && scrapeResult.assetCount > 0) {
					log(`Scrape successful. Attempting atomic swap.`);
					
					// Quarantine old
					const quarantineDir = path.join(ASSETS_DIR, '.quarantine', `${slug}-${stamp}`);
					fs.mkdirSync(path.dirname(quarantineDir), { recursive: true });
					if (fs.existsSync(assetsDir)) {
						fs.renameSync(assetsDir, quarantineDir);
					}
					
					// Move new
					fs.renameSync(recoveryDir, assetsDir);
					
					return {
						slug, healed: true, source: source.name,
						assetCount: scrapeResult.assetCount,
						candidatesTriedCount
					};
				} else {
					log(`Scrape failed or yielded 0 assets.`);
					rmSafe(recoveryDir);
				}
			} else {
				log(`Dry run: would have scraped and swapped from ${candidateUrl}`);
				return { slug, healed: true, source: source.name, assetCount: 0, candidatesTriedCount };
			}
		}
	}
	
	return { slug, healed: false, source: null, assetCount: 0, candidatesTriedCount };
}

module.exports = { healGame, probeUrl, scrapeGameFromUrl };
