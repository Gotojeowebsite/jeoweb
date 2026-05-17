// scripts/recovery/scrape-engines.js
//
// Engine-aware scraper for a single candidate URL. Builds on the
// header-spoofing approach from scripts/deep-asset-scraper.js but writes
// the captured assets into a sandbox folder (NOT the live Assets/<slug>/)
// and follows iframes to the real game source.
//
// Usage:
//   const { scrapeCandidate } = require('./scrape-engines');
//   const r = await scrapeCandidate({
//     url: 'https://kbhgames.com/game/foo',
//     candidateRoot: '/abs/path/to/Assets/.recovery/foo-2026...',
//     gameType: 'webgl',           // 'webgl' | 'flash' | 'retro' | undefined
//     timeoutMs: 90000,
//   });
//   r = { ok, asset_count, captured_bytes, entry, engine, source_url, error? }

'use strict';

const fs = require('fs');
const path = require('path');
const { URL } = require('url');

let puppeteerCache = null;
function loadPuppeteer() {
	if (puppeteerCache) return puppeteerCache;
	try { puppeteerCache = require('puppeteer'); }
	catch (e) { throw new Error(`puppeteer not available: ${e.message}`); }
	return puppeteerCache;
}

const DEFAULT_TIMEOUT = 180_000;
const POST_LOAD_WAIT_MS = 25_000;
const IFRAME_POST_LOAD_WAIT_MS = 40_000;
const NO_IFRAME_INLINE_WAIT_MS = 45_000;
const MAX_BYTES_PER_FILE = 200 * 1024 * 1024;
const CLICK_THROUGH_JS = `
	() => {
		const TEXT_HITS = ['accept all','accept','agree','got it','ok','okay','continue',
			'click to play','click to start','tap to play','tap to start','press start',
			'start','start game','play','play game','begin','enter','launch'];
		let clicked = 0;
		const visit = (root) => {
			if (!root || clicked > 6) return;
			let els = [];
			try { els = root.querySelectorAll('button, a, div[role="button"], .play-button, .start-button'); } catch(_) {}
			for (const el of els) {
				if (clicked > 6) break;
				try {
					const text = (el.innerText || el.textContent || '').trim().toLowerCase();
					if (!text || text.length > 50) continue;
					if (!TEXT_HITS.some(t => text === t || text.startsWith(t + ' '))) continue;
					const r = el.getBoundingClientRect();
					if (r.width < 8 || r.height < 8) continue;
					el.click(); clicked += 1;
				} catch(_) {}
			}
			try {
				const all = root.querySelectorAll ? root.querySelectorAll('*') : [];
				for (const el of all) if (el.shadowRoot) visit(el.shadowRoot);
			} catch(_) {}
		};
		visit(document);
		try {
			const c = document.querySelector('canvas, #unity-canvas, #game canvas');
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
		} catch(_) {}
		return clicked;
	}
`;
const SKIP_HOST_PATTERNS = [
	/(?:^|\.)google-analytics\.com$/i,
	/(?:^|\.)googletagmanager\.com$/i,
	/(?:^|\.)googlesyndication\.com$/i,
	/(?:^|\.)googleadservices\.com$/i,
	/(?:^|\.)doubleclick\.net$/i,
	/(?:^|\.)facebook\.(?:net|com)$/i,
	/(?:^|\.)twitter\.com$/i,
	/(?:^|\.)cmp\.gatekeeperconsent\.com$/i,
	/(?:^|\.)ezojs\.com$/i,
];

function shouldSkipUrl(u) {
	try {
		const p = new URL(u);
		if (!/^https?:$/.test(p.protocol)) return true;
		for (const re of SKIP_HOST_PATTERNS) if (re.test(p.hostname)) return true;
		// Skip ad-style paths even on otherwise-allowed hosts.
		if (/\/ads?\/|\/ad\?|\/track|\/beacon|\/analytics/i.test(p.pathname)) return true;
		return false;
	} catch { return true; }
}

function safeFilenameFromUrl(rawUrl) {
	try {
		const u = new URL(rawUrl);
		let p = decodeURIComponent(u.pathname || '/');
		if (!p || p === '/' || p.endsWith('/')) p += 'index.html';
		// Avoid escaping out of root; collapse %2e and ".." segments.
		p = p.replace(/\.\.+/g, '_').replace(/\\/g, '/').replace(/\/+/g, '/');
		if (!p.startsWith('/')) p = '/' + p;
		return path.posix.join('/', u.hostname, p).replace(/^\//, '');
	} catch { return null; }
}

function detectEngineFromHtml(text) {
	const t = (text || '').toLowerCase();
	if (/createunityinstance|unityloader|unity\.loader\.js|unity-canvas/.test(t)) return 'unity';
	if (/ruffle\.newest\(\)|window\.ruffleplayer|ruffle-player|ruffle-embed/.test(t)) return 'ruffle';
	if (/ejs_pathtodata|ejs_player|ejs_core|emulatorjs/.test(t)) return 'emulatorjs';
	if (/createcordovacontext|construct|c2runtime|c3runtime/.test(t)) return 'construct';
	if (/phaser/.test(t)) return 'phaser';
	if (/godot|engine\.startgame/.test(t)) return 'godot';
	return 'html5';
}

function detectEngineFromUrls(urls) {
	for (const u of urls) {
		if (/\.unityweb(\?|$)|\.data(\?|$)|loader\.js(\?|$)|framework\.js(\?|$)/i.test(u)) return 'unity';
		if (/\.swf(\?|$)/i.test(u)) return 'flash';
		if (/\.pck(\?|$)/i.test(u)) return 'godot';
		if (/c2runtime|c3runtime/i.test(u)) return 'construct';
		if (/phaser/i.test(u)) return 'phaser';
	}
	return null;
}

// Realistic UA strings rotated per scrape so a single host doesn't see the
// same fingerprint hitting every game we try to recover. Each entry carries
// the matching Sec-CH-UA client hints so we never send a Chromium-only
// Sec-CH-UA alongside a Safari or Firefox UA (which is itself a fingerprint).
// Chromium entries get full Sec-CH-UA; Safari + Firefox entries leave
// hints undefined so we OMIT those headers entirely on the request — real
// non-Chromium browsers don't send them.
const REAL_USER_AGENTS = [
	{
		ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
		secChUa: '"Not_A Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
		secChUaMobile: '?0',
		secChUaPlatform: '"Windows"',
	},
	{
		ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Safari/605.1.15',
		// Safari does NOT send Sec-CH-UA.
	},
	{
		ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0',
		// Firefox does NOT send Sec-CH-UA by default.
	},
	{
		ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:135.0) Gecko/20100101 Firefox/135.0',
	},
	{
		ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
		secChUa: '"Not_A Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
		secChUaMobile: '?0',
		secChUaPlatform: '"Linux"',
	},
];
const REAL_VIEWPORTS = [
	{ width: 1280, height: 800 },
	{ width: 1440, height: 900 },
	{ width: 1536, height: 864 },
	{ width: 1920, height: 1080 },
	{ width: 1366, height: 768 },
];

function _randomFrom(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// Apply stealth-grade browser fingerprint masking. Replaces / hides the
// signals Cloudflare / datadome / Akamai use to identify headless Chrome:
//   - navigator.webdriver => undefined
//   - navigator.plugins.length => 3 (mock plugins)
//   - navigator.languages => ['en-US', 'en']
//   - WebGL vendor + renderer strings spoofed to real values
//   - chrome.runtime / chrome.loadTimes shims
//   - Notification.permission set to 'default'
//   - hide CDP / automation overrides on AudioContext / window.outerHeight
//
// Done inline rather than via puppeteer-extra-plugin-stealth so we don't
// drag in a separate npm dep tree. The patches are the same ones that
// plugin applies; documented well enough that we can extend if a new
// detection vector shows up.
async function applyStealth(page) {
	await page.evaluateOnNewDocument(() => {
		// 1. webdriver flag.
		Object.defineProperty(navigator, 'webdriver', { get: () => undefined });

		// 2. navigator.plugins length (real browsers have at least 3).
		Object.defineProperty(navigator, 'plugins', {
			get: () => [
				{ name: 'PDF Viewer', filename: 'internal-pdf-viewer' },
				{ name: 'Chrome PDF Viewer', filename: 'internal-pdf-viewer' },
				{ name: 'Chromium PDF Viewer', filename: 'internal-pdf-viewer' },
			],
		});

		// 3. languages — real browsers return >=2.
		Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });

		// 4. WebGL vendor + renderer spoof. Headless Chrome reports
		// "Google Inc. (Google)" / "ANGLE (Google, Vulkan ...)"; real
		// Chrome reports something host-GPU specific.
		const getParam = WebGLRenderingContext.prototype.getParameter;
		WebGLRenderingContext.prototype.getParameter = function (param) {
			if (param === 37445) return 'Intel Inc.';               // UNMASKED_VENDOR_WEBGL
			if (param === 37446) return 'Intel(R) Iris(TM) Plus Graphics OpenGL Engine';  // UNMASKED_RENDERER_WEBGL
			return getParam.call(this, param);
		};

		// 5. chrome runtime shim — non-Chrome headless leaves this undefined.
		if (!window.chrome) window.chrome = {};
		window.chrome.runtime = window.chrome.runtime || {};

		// 6. Notification permission — headless reports 'denied' even with
		// no real notifications permission, which is a fingerprint signal.
		const origQuery = window.navigator.permissions && window.navigator.permissions.query;
		if (origQuery) {
			window.navigator.permissions.query = (parameters) =>
				parameters && parameters.name === 'notifications'
					? Promise.resolve({ state: Notification.permission })
					: origQuery(parameters);
		}

		// 7. Hide CDP-detection signals on window.outerWidth/Height (some
		// pages check that outer dimensions are sane).
		if (window.outerWidth === 0) Object.defineProperty(window, 'outerWidth', { get: () => window.innerWidth });
		if (window.outerHeight === 0) Object.defineProperty(window, 'outerHeight', { get: () => window.innerHeight });
	});
}

async function scrapeCandidate({ url, candidateRoot, gameType, timeoutMs, verbose }) {
	const puppeteer = loadPuppeteer();
	const totalTimeout = Math.max(15_000, timeoutMs || DEFAULT_TIMEOUT);
	const log = (...a) => { if (verbose) console.log('   [scrape]', ...a); };

	fs.mkdirSync(candidateRoot, { recursive: true });

	const uaProfile = _randomFrom(REAL_USER_AGENTS);
	const userAgent = uaProfile.ua;
	const viewport = _randomFrom(REAL_VIEWPORTS);

	let browser;
	try {
		browser = await puppeteer.launch({
			headless: 'new',
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-web-security',
				'--disable-features=IsolateOrigins,site-per-process',
				'--disable-blink-features=AutomationControlled',  // hide CDP banner
				`--window-size=${viewport.width},${viewport.height}`,
				'--lang=en-US,en',
			],
		});

		const page = await browser.newPage();
		await applyStealth(page);
		await page.setUserAgent(userAgent);
		await page.setViewport(viewport);
		// Send Sec-CH-UA only when the chosen UA is a Chromium derivative;
		// Safari + Firefox don't send these in real life. The legacy code
		// always sent the Chromium hints, which alongside a Safari/Firefox
		// UA was itself a giveaway that the request was scripted.
		const headers = {
			'Accept-Language': 'en-US,en;q=0.9',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
		};
		if (uaProfile.secChUa) headers['Sec-Ch-Ua'] = uaProfile.secChUa;
		if (uaProfile.secChUaMobile) headers['Sec-Ch-Ua-Mobile'] = uaProfile.secChUaMobile;
		if (uaProfile.secChUaPlatform) headers['Sec-Ch-Ua-Platform'] = uaProfile.secChUaPlatform;
		await page.setExtraHTTPHeaders(headers);

		// Tiny per-request jitter — 0-250ms — to avoid burst-detection
		// heuristics on CDNs that rate-limit by request rate.
		await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 250)));

		await page.setRequestInterception(true);

		const portalOrigin = new URL(url).origin;
		const downloaded = new Set();
		const capturedHosts = new Set();
		let totalBytes = 0;
		let entryRel = null;

		page.on('request', async (req) => {
			try {
				const reqUrl = req.url();
				if (shouldSkipUrl(reqUrl)) {
					req.abort();
					return;
				}
				const headers = req.headers();
				// Anti-hotlink: spoof referer/origin to the portal host. This is
				// the trick that gets Poki/Crazygames CDNs to actually serve the
				// .data files.
				headers['referer'] = url;
				headers['origin'] = portalOrigin;
				req.continue({ headers });
			} catch {
				try { req.continue(); } catch {}
			}
		});

		page.on('response', async (res) => {
			try {
				const reqUrl = res.url();
				const status = res.status();
				if (status !== 200 && status !== 206) return;
				const ctype = String((res.headers() || {})['content-type'] || '').toLowerCase();
				if (/text\/(?:event-stream|vnd\.dlna\.adts)/i.test(ctype)) return;

				const rel = safeFilenameFromUrl(reqUrl);
				if (!rel) return;
				if (downloaded.has(rel)) return;

				let buf;
				try { buf = await res.buffer(); } catch { return; }
				if (!buf || buf.length === 0) return;
				if (buf.length > MAX_BYTES_PER_FILE) return;

				const dst = path.join(candidateRoot, rel);
				fs.mkdirSync(path.dirname(dst), { recursive: true });
				fs.writeFileSync(dst, buf);
				downloaded.add(rel);
				totalBytes += buf.length;
				capturedHosts.add(new URL(reqUrl).hostname);
			} catch {}
		});

		// Navigate to portal first.
		// Phase 3 smart wait-for-load: instead of capturing whatever's in
		// the DOM at domcontentloaded, wait for networkidle (gives the page
		// time to fetch all scripts), then a 3s settle, then scroll to bottom
		// + back to top to trigger any lazy-load observers. Falls back to
		// domcontentloaded if networkidle never resolves.
		const navStart = Date.now();
		try {
			await page.goto(url, { waitUntil: 'networkidle2', timeout: Math.min(45_000, totalTimeout) });
		} catch (e) {
			log(`portal networkidle2 timed out, falling back to domcontentloaded: ${e.message}`);
			try {
				await page.goto(url, { waitUntil: 'domcontentloaded', timeout: Math.min(30_000, totalTimeout) });
			} catch (e2) {
				log(`portal navigation failed: ${e2.message}`);
			}
		}

		// 3-second settle for post-hydration SPA tasks.
		await new Promise((r) => setTimeout(r, 3_000));

		// Scroll-to-bottom-and-back triggers IntersectionObserver-based
		// lazy loads (cover images, secondary iframes, ad slots). Best-effort.
		try {
			await page.evaluate(async () => {
				const h = document.body ? document.body.scrollHeight : 0;
				window.scrollTo(0, h);
				await new Promise((r) => setTimeout(r, 400));
				window.scrollTo(0, 0);
				await new Promise((r) => setTimeout(r, 200));
			});
		} catch { /* ignore */ }

		// Brief idle for portal scripts to inject iframe.
		await new Promise(r => setTimeout(r, 6_000));

		// Try to find a game iframe and dive into it.
		let iframeUrl = null;
		try {
			iframeUrl = await page.evaluate(() => {
				const frames = Array.from(document.querySelectorAll('iframe'));
				for (const f of frames) {
					if (!f.src) continue;
					if (/ads|popup|social|consent|gdpr/i.test(f.src)) continue;
					if (f.clientWidth >= 300 || f.offsetWidth >= 300) return f.src;
				}
				// Some portals lazy-load the iframe — try the first iframe regardless.
				for (const f of frames) {
					if (f.src && !/ads|consent/i.test(f.src)) return f.src;
				}
				return null;
			});
		} catch {}

		if (iframeUrl) {
			log(`iframe → ${iframeUrl}`);
			try {
				await page.goto(iframeUrl, { waitUntil: 'networkidle2', timeout: Math.min(45_000, totalTimeout - (Date.now() - navStart)) });
			} catch (e) {
				log(`iframe networkidle2 timed out, falling back to domcontentloaded: ${e.message}`);
				try {
					await page.goto(iframeUrl, { waitUntil: 'domcontentloaded', timeout: Math.min(30_000, totalTimeout - (Date.now() - navStart)) });
				} catch (e2) {
					log(`iframe navigation failed: ${e2.message}`);
				}
			}
			// Half-wait → click-through → second half-wait. Lets us advance
			// past a "Click to play" overlay so the audio context unlocks and
			// the engine fetches the rest of its assets.
			await new Promise(r => setTimeout(r, Math.floor(IFRAME_POST_LOAD_WAIT_MS / 2)));
			try { await page.evaluate(CLICK_THROUGH_JS); } catch {}
			await new Promise(r => setTimeout(r, Math.ceil(IFRAME_POST_LOAD_WAIT_MS / 2)));
		} else {
			log('no iframe — assuming inline');
			await new Promise(r => setTimeout(r, Math.floor(NO_IFRAME_INLINE_WAIT_MS / 2)));
			try { await page.evaluate(CLICK_THROUGH_JS); } catch {}
			await new Promise(r => setTimeout(r, Math.ceil(NO_IFRAME_INLINE_WAIT_MS / 2)));
		}

		// Capture the final document HTML directly to ensure we have an entry
		// point even if it was constructed in-JS rather than served.
		let finalUrl = page.url();
		let finalHtml = '';
		try { finalHtml = await page.content(); } catch {}
		try {
			const rel = safeFilenameFromUrl(finalUrl) || 'index.html';
			const dst = path.join(candidateRoot, rel);
			fs.mkdirSync(path.dirname(dst), { recursive: true });
			if (!fs.existsSync(dst) || fs.statSync(dst).size === 0) {
				fs.writeFileSync(dst, finalHtml);
				downloaded.add(rel);
				totalBytes += Buffer.byteLength(finalHtml);
			}
			entryRel = rel;
		} catch {}

		// Build a top-level wrapper index.html that redirects to the captured
		// entry if it's nested.
		if (entryRel && entryRel !== 'index.html') {
			const wrap = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${entryRel}"><title>Loading…</title></head><body style="margin:0;background:#000;color:#fff;font-family:system-ui;text-align:center;padding:40px"><a style="color:#fff" href="${entryRel}">Click to play</a></body></html>`;
			fs.writeFileSync(path.join(candidateRoot, 'index.html'), wrap);
		}

		// Decide the engine.
		const engine = detectEngineFromHtml(finalHtml) || detectEngineFromUrls([...downloaded].map(p => '/' + p)) || 'html5';

		await browser.close();
		browser = null;
		return {
			ok: downloaded.size > 0 && !!entryRel,
			asset_count: downloaded.size,
			captured_bytes: totalBytes,
			entry: 'index.html',
			engine,
			source_url: url,
			final_url: finalUrl,
			hosts: [...capturedHosts],
		};
	} catch (err) {
		try { if (browser) await browser.close(); } catch {}
		return { ok: false, asset_count: 0, captured_bytes: 0, error: String(err && err.message || err) };
	}
}

module.exports = {
	scrapeCandidate,
	detectEngineFromHtml,
	detectEngineFromUrls,
	safeFilenameFromUrl,
};
