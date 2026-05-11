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

async function scrapeCandidate({ url, candidateRoot, gameType, timeoutMs, verbose }) {
	const puppeteer = loadPuppeteer();
	const totalTimeout = Math.max(15_000, timeoutMs || DEFAULT_TIMEOUT);
	const log = (...a) => { if (verbose) console.log('   [scrape]', ...a); };

	fs.mkdirSync(candidateRoot, { recursive: true });

	let browser;
	try {
		browser = await puppeteer.launch({
			headless: 'new',
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-web-security',
				'--disable-features=IsolateOrigins,site-per-process',
				'--window-size=1280,800',
			],
		});

		const page = await browser.newPage();
		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
		await page.setViewport({ width: 1280, height: 800 });
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
		const navStart = Date.now();
		try {
			await page.goto(url, { waitUntil: 'domcontentloaded', timeout: Math.min(60_000, totalTimeout) });
		} catch (e) {
			log(`portal navigation timed out: ${e.message}`);
		}

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
				await page.goto(iframeUrl, { waitUntil: 'domcontentloaded', timeout: Math.min(60_000, totalTimeout - (Date.now() - navStart)) });
			} catch (e) {
				log(`iframe navigation timed out: ${e.message}`);
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
