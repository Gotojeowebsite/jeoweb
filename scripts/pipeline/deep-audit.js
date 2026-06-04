'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { checkEntryHtml } = require('./utils');

function classifyAssetType(url) {
	try {
		const u = new URL(url);
		const pathname = u.pathname.toLowerCase();
		if (/\.js(\?|$)/.test(pathname)) return 'script';
		if (/\.css(\?|$)/.test(pathname)) return 'stylesheet';
		if (/\.(png|jpe?g|gif|webp|svg|ico)(\?|$)/.test(pathname)) return 'image';
		if (/\.(woff2?|ttf|otf|eot)(\?|$)/.test(pathname)) return 'font';
		if (/\.(mp3|wav|ogg|m4a)(\?|$)/.test(pathname)) return 'audio';
		if (/\.wasm(\?|$)/.test(pathname)) return 'wasm';
		if (/\.(data|pck|json)(\?|$)/.test(pathname)) return 'data';
		return 'other';
	} catch {
		return 'other';
	}
}

async function auditGame({ slug, assetsDir, baseUrl, timeoutMs = 15000, verbose = false }) {
	const log = (...a) => { if (verbose) console.log(`  [audit]`, ...a); };
	const startTime = Date.now();

	const entryHtmlInfo = checkEntryHtml(slug);
	if (!entryHtmlInfo.exists) {
		return {
			slug,
			status: 'broken',
			failures: ['CRITICAL_404'],
			assets: { local: [], external: [] },
			consoleErrors: [],
			timestamp: Date.now(),
			durationMs: Date.now() - startTime
		};
	}

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

		const context = await browser.newContext({
			ignoreHTTPSErrors: true,
		});

		const page = await context.newPage();

		const localAssets = [];
		const externalAssets = [];
		const consoleErrors = [];
		const failedRequests = [];

		page.on('console', msg => {
			if (msg.type() === 'error') {
				consoleErrors.push(msg.text());
			}
		});

		page.on('pageerror', err => {
			consoleErrors.push(err.message || String(err));
		});

		page.on('request', request => {
			const url = request.url();
			if (!url.startsWith('data:') && !url.startsWith('blob:')) {
				const type = classifyAssetType(url);
				let isExternal = false;
				if (baseUrl) {
					isExternal = !url.startsWith(baseUrl);
				} else {
					isExternal = url.startsWith('http://') || url.startsWith('https://');
				}

				if (isExternal) {
					externalAssets.push({ url, type });
				} else {
					localAssets.push({ url, type });
				}
			}
		});

		page.on('requestfailed', request => {
			failedRequests.push(request.url());
		});

		page.on('response', response => {
			if (response.status() >= 400) {
				failedRequests.push(response.url());
			}
		});

		const targetUrl = baseUrl ? `${baseUrl.replace(/\/$/, '')}/Assets/${slug}/index.html` : `file://${entryHtmlInfo.path}`;

		let loadSuccess = true;
		try {
			await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
			// Allow up to 15s total for execution to sniff assets
			const executionTimeLeft = 15000 - (Date.now() - startTime);
			if (executionTimeLeft > 0) {
				await page.waitForTimeout(executionTimeLeft);
			}
		} catch (err) {
			log(`Navigation or execution timed out: ${err.message}`);
			loadSuccess = false;
		}

		// Analysis
		const failures = [];
		
		if (!loadSuccess) failures.push('LOAD_TIMEOUT');

		const domContent = await page.evaluate(() => {
			const body = document.body;
			if (!body) return { textLen: 0, childCount: 0, hasCanvas: false, hasEmbed: false };
			return {
				textLen: (body.innerText || '').trim().length,
				childCount: body.childElementCount,
				hasCanvas: !!body.querySelector('canvas'),
				hasEmbed: !!body.querySelector('embed, object, iframe')
			};
		});

		if (domContent.childCount === 0) failures.push('EMPTY_DOM');
		if (domContent.textLen < 100 && !domContent.hasCanvas && !domContent.hasEmbed) failures.push('WHITE_SCREEN');

		if (domContent.hasCanvas) {
			const canvasContextOk = await page.evaluate(() => {
				const canvases = document.querySelectorAll('canvas');
				for (const c of canvases) {
					if (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('2d')) return true;
				}
				return false;
			});
			if (!canvasContextOk) failures.push('CANVAS_FAIL');
		}

		if (failedRequests.length > 3) failures.push('MISSING_ASSETS');
		if (consoleErrors.length >= 5) failures.push('CONSOLE_ERRORS');

		const status = failures.length > 0 ? 'broken' : 'healthy';

		return {
			slug,
			status,
			failures,
			assets: { local: localAssets, external: externalAssets },
			consoleErrors,
			timestamp: Date.now(),
			durationMs: Date.now() - startTime
		};
	} catch (err) {
		return {
			slug,
			status: 'broken',
			failures: ['AUDIT_ERROR'],
			error: err.message,
			assets: { local: [], external: [] },
			consoleErrors: [],
			timestamp: Date.now(),
			durationMs: Date.now() - startTime
		};
	} finally {
		if (browser) await browser.close();
	}
}

module.exports = { auditGame, classifyAssetType };
