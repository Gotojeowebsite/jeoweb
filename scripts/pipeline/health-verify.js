'use strict';

// scripts/pipeline/health-verify.js
//
// PHASE 4: Post-patch health verification.
// Re-runs a headless browser check on a patched game to confirm it's working,
// then updates game-health.json with the result.
//
// Exports:
//   verifyGame({ slug, assetsDir, baseUrl, timeoutMs, verbose })
//   updateHealthRegistry({ slug, status, failures, timestamp, source })

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const HEALTH_PATH = path.join(ROOT, 'game_health.json');

/**
 * Classify canvas rendering context health.
 * @param {import('playwright').Page} page
 * @returns {Promise<{hasCanvas: boolean, contextOk: boolean, pixelData: boolean}>}
 */
async function checkCanvasHealth(page) {
	try {
		return await page.evaluate(() => {
			const canvases = document.querySelectorAll('canvas');
			if (canvases.length === 0) return { hasCanvas: false, contextOk: false, pixelData: false };

			let contextOk = false;
			let pixelData = false;

			for (const canvas of canvases) {
				// Try WebGL first, then 2D
				let ctx = null;
				try { ctx = canvas.getContext('webgl2'); } catch {}
				if (!ctx) { try { ctx = canvas.getContext('webgl'); } catch {} }
				if (!ctx) { try { ctx = canvas.getContext('2d'); } catch {} }

				if (ctx) {
					contextOk = true;

					// Check if any pixels are drawn (non-transparent)
					try {
						if (ctx instanceof CanvasRenderingContext2D) {
							const imgData = ctx.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100));
							const hasColor = imgData.data.some((v, i) => i % 4 === 3 && v > 0); // alpha channel
							if (hasColor) pixelData = true;
						} else {
							// WebGL — check if framebuffer has content
							const pixels = new Uint8Array(4);
							ctx.readPixels(
								Math.floor(canvas.width / 2), Math.floor(canvas.height / 2),
								1, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, pixels
							);
							if (pixels[3] > 0) pixelData = true;
						}
					} catch {
						// readPixels/getImageData can fail in some security contexts
					}
				}
			}

			return { hasCanvas: true, contextOk, pixelData };
		});
	} catch {
		return { hasCanvas: false, contextOk: false, pixelData: false };
	}
}

/**
 * Check DOM population depth and meaningful content.
 * @param {import('playwright').Page} page
 * @returns {Promise<{elementCount: number, hasContent: boolean, bodyTextLength: number}>}
 */
async function checkDomContent(page) {
	try {
		return await page.evaluate(() => {
			const body = document.body;
			if (!body) return { elementCount: 0, hasContent: false, bodyTextLength: 0 };

			const allElements = body.querySelectorAll('*');
			const textLen = (body.innerText || '').trim().length;
			const hasCanvas = !!body.querySelector('canvas');
			const hasEmbed = !!body.querySelector('embed, object, iframe');
			const hasVideo = !!body.querySelector('video');
			const hasSvg = !!body.querySelector('svg');

			return {
				elementCount: allElements.length,
				hasContent: textLen > 50 || hasCanvas || hasEmbed || hasVideo || hasSvg,
				bodyTextLength: textLen,
			};
		});
	} catch {
		return { elementCount: 0, hasContent: false, bodyTextLength: 0 };
	}
}

/**
 * Run a comprehensive health verification on a single game after patching.
 *
 * @param {Object} opts
 * @param {string} opts.slug - Game slug
 * @param {string} opts.assetsDir - Path to Assets/<slug>
 * @param {string} [opts.baseUrl] - If set, use HTTP url instead of file://
 * @param {number} [opts.timeoutMs=15000] - Max time to wait for game
 * @param {boolean} [opts.verbose=false]
 * @returns {Promise<{slug, status, checks, failures, timestamp, durationMs}>}
 */
async function verifyGame({ slug, assetsDir, baseUrl, timeoutMs = 15000, verbose = false }) {
	const log = (...a) => { if (verbose) console.log('  [verify]', ...a); };
	const startTime = Date.now();
	const failures = [];
	const checks = {};

	// Determine entry HTML
	const indexPath = path.join(assetsDir, 'index.html');
	if (!fs.existsSync(indexPath)) {
		// Try to find any .html file
		let found = null;
		try {
			const files = fs.readdirSync(assetsDir);
			found = files.find(f => /\.html?$/i.test(f));
		} catch {}
		if (!found) {
			return {
				slug,
				status: 'broken',
				checks: { entry_exists: false },
				failures: ['NO_ENTRY_HTML'],
				timestamp: Date.now(),
				durationMs: Date.now() - startTime,
			};
		}
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
				'--disable-gpu',
			],
		});

		const context = await browser.newContext({
			viewport: { width: 1280, height: 800 },
			ignoreHTTPSErrors: true,
		});

		const page = await context.newPage();

		// Collect console errors
		const consoleErrors = [];
		const networkErrors = [];
		let failedRequests = 0;

		page.on('pageerror', (err) => {
			consoleErrors.push(err.message || String(err));
		});

		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				consoleErrors.push(msg.text());
			}
		});

		page.on('requestfailed', (req) => {
			failedRequests++;
			networkErrors.push({
				url: req.url().slice(0, 200),
				error: req.failure()?.errorText || 'unknown',
			});
		});

		// Navigate
		const gameUrl = baseUrl
			? `${baseUrl.replace(/\/$/, '')}/Assets/${slug}/index.html`
			: `file://${indexPath}`;

		log(`navigating to ${gameUrl}`);

		let response;
		try {
			response = await page.goto(gameUrl, {
				timeout: timeoutMs,
				waitUntil: 'domcontentloaded',
			});
		} catch (err) {
			failures.push('LOAD_TIMEOUT');
			checks.navigation = false;
			log(`navigation failed: ${err.message}`);
			return {
				slug,
				status: 'broken',
				checks,
				failures,
				timestamp: Date.now(),
				durationMs: Date.now() - startTime,
			};
		}

		checks.navigation = true;

		// Check HTTP status (only for http:// URLs)
		if (response) {
			const status = response.status();
			checks.httpStatus = status;
			if (status === 404) {
				failures.push('HTTP_404');
			} else if (status >= 400) {
				failures.push(`HTTP_${status}`);
			}
		}

		// Wait for game to initialize
		log('waiting 8s for game initialization...');
		await new Promise(r => setTimeout(r, 8000));

		// Click through start screens (similar to scrape-engines.js pattern)
		try {
			await page.evaluate(() => {
				const TEXT_HITS = ['accept all', 'accept', 'agree', 'got it', 'ok', 'continue',
					'click to play', 'click to start', 'tap to play', 'start', 'play', 'play game',
					'begin', 'enter', 'launch'];
				let clicked = 0;
				const buttons = document.querySelectorAll('button, a, div[role="button"], .play-button, .start-button');
				for (const el of buttons) {
					if (clicked > 3) break;
					const text = (el.innerText || '').trim().toLowerCase();
					if (!text || text.length > 50) continue;
					if (TEXT_HITS.some(t => text === t || text.startsWith(t + ' '))) {
						try { el.click(); clicked++; } catch {}
					}
				}
				// Also click canvas if present
				const c = document.querySelector('canvas');
				if (c) {
					const r = c.getBoundingClientRect();
					if (r.width > 0 && r.height > 0) {
						c.dispatchEvent(new MouseEvent('click', {
							bubbles: true, cancelable: true,
							clientX: r.left + r.width / 2,
							clientY: r.top + r.height / 2,
						}));
					}
				}
			});
		} catch {}

		// Wait a bit more after clicking
		await new Promise(r => setTimeout(r, 3000));

		// --- Verification Checks ---

		// 1. DOM Content check
		const domResult = await checkDomContent(page);
		checks.domContent = domResult;
		if (!domResult.hasContent && domResult.elementCount < 5) {
			failures.push('WHITE_SCREEN');
		}
		if (domResult.elementCount === 0) {
			failures.push('EMPTY_DOM');
		}

		// 2. Canvas/WebGL check
		const canvasResult = await checkCanvasHealth(page);
		checks.canvas = canvasResult;
		if (canvasResult.hasCanvas && !canvasResult.contextOk) {
			failures.push('CANVAS_CONTEXT_FAIL');
		}

		// 3. Console errors check
		checks.consoleErrorCount = consoleErrors.length;
		checks.consoleErrors = consoleErrors.slice(0, 10); // Keep first 10
		if (consoleErrors.length >= 5) {
			failures.push('EXCESSIVE_CONSOLE_ERRORS');
		}

		// 4. Network errors check
		checks.failedRequestCount = failedRequests;
		checks.networkErrors = networkErrors.slice(0, 10);
		if (failedRequests >= 5) {
			failures.push('EXCESSIVE_NETWORK_ERRORS');
		}

		// 5. Page title sanity
		const title = await page.title().catch(() => '');
		checks.title = title;
		if (/not found|404|error/i.test(title)) {
			failures.push('ERROR_TITLE');
		}

		// 6. Check for specific error overlays
		try {
			const hasErrorOverlay = await page.evaluate(() => {
				const body = document.body;
				if (!body) return false;
				const text = body.innerText.toLowerCase();
				return text.includes('failed to load') ||
					text.includes('error loading') ||
					text.includes('could not load') ||
					text.includes('something went wrong');
			});
			checks.hasErrorOverlay = hasErrorOverlay;
			if (hasErrorOverlay) {
				failures.push('ERROR_OVERLAY_DETECTED');
			}
		} catch {}

		await page.close();
		await context.close();

		// Determine final status
		const criticalFailures = ['WHITE_SCREEN', 'EMPTY_DOM', 'HTTP_404', 'LOAD_TIMEOUT', 'NO_ENTRY_HTML'];
		const hasCritical = failures.some(f => criticalFailures.includes(f));
		const status = failures.length === 0 ? 'healthy'
			: hasCritical ? 'broken'
			: 'degraded';

		log(`verification complete: ${status} (${failures.length} failures)`);

		return {
			slug,
			status,
			checks,
			failures,
			timestamp: Date.now(),
			durationMs: Date.now() - startTime,
		};
	} catch (err) {
		log(`verification error: ${err.message}`);
		return {
			slug,
			status: 'broken',
			checks,
			failures: [...failures, 'VERIFICATION_ERROR'],
			error: err.message,
			timestamp: Date.now(),
			durationMs: Date.now() - startTime,
		};
	} finally {
		try { if (browser) await browser.close(); } catch {}
	}
}

/**
 * Update the game_health.json registry with a new verification result.
 *
 * @param {Object} opts
 * @param {string} opts.slug
 * @param {'healthy'|'broken'|'degraded'} opts.status
 * @param {string[]} opts.failures
 * @param {number} opts.timestamp
 * @param {string} [opts.source='pipeline'] - Which tool produced this result
 * @param {string} [opts.healthPath] - Override path to game_health.json
 */
function updateHealthRegistry({ slug, status, failures, timestamp, source = 'pipeline', healthPath }) {
	const filePath = healthPath || HEALTH_PATH;

	let health = {};
	try {
		const raw = fs.readFileSync(filePath, 'utf-8');
		health = JSON.parse(raw);
	} catch {
		health = { schema: 2, generated_at: 0, games: {} };
	}

	if (!health.games) health.games = {};

	const signalValue = status === 'healthy' ? 'pass'
		: status === 'degraded' ? 'warn'
		: 'fail';

	const existing = health.games[slug] || {};
	const signals = existing.signals || {};
	signals.pipeline = signalValue;

	const signalHistory = existing.signal_history || {};
	const pipelineHistory = signalHistory.pipeline || [];
	pipelineHistory.unshift({
		at: Math.floor(timestamp / 1000),
		signal: signalValue,
	});
	// Keep last 10 entries
	signalHistory.pipeline = pipelineHistory.slice(0, 10);

	// Determine verdict from all available signals
	const signalValues = Object.values(signals).filter(Boolean);
	const passCount = signalValues.filter(s => s === 'pass').length;
	const failCount = signalValues.filter(s => s === 'fail').length;

	let verdict = 'unverified';
	let confidence = 'low';

	if (failCount > 0 && passCount === 0) {
		verdict = 'broken';
		confidence = failCount >= 2 ? 'high' : 'medium';
	} else if (passCount > 0 && failCount === 0) {
		verdict = 'healthy';
		confidence = passCount >= 2 ? 'high' : 'medium';
	} else if (passCount > 0 && failCount > 0) {
		// Mixed signals
		verdict = failCount > passCount ? 'probable_broken' : 'healthy';
		confidence = 'low';
	}

	health.games[slug] = {
		...existing,
		verdict,
		confidence,
		source: 'signals',
		signals,
		signal_history: signalHistory,
		critical_codes: failures.length > 0 ? failures : undefined,
		pipeline_last_check: {
			at: Math.floor(timestamp / 1000),
			status,
			failures,
			source,
		},
	};

	health.generated_at = Math.floor(Date.now() / 1000);

	try {
		fs.writeFileSync(filePath, JSON.stringify(health, null, 2));
	} catch (err) {
		console.error(`❌ Failed to write health registry: ${err.message}`);
	}
}

module.exports = { verifyGame, updateHealthRegistry, checkCanvasHealth, checkDomContent };
