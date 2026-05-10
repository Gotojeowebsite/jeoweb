#!/usr/bin/env node
// auto-fix-bot.js
//
// For every "broken" game in game_health.json, try to download a fresh,
// working copy from one of the unblocked-game mirrors listed in
// recovery_sources.json, drop it in place of the broken folder, and re-run
// the static health check to confirm it's actually better.
//
// Safety:
//   - The broken folder is moved into .quarantine/<slug>-<ts>/ first so we
//     can roll back when no candidate works.
//   - Override-source verdicts (force_maintenance / force_healthy) are skipped
//     unless --include-overrides is passed.
//   - Each attempt is logged to auto_fix_bot.jsonl (JSON-per-line).
//   - --dry-run probes candidates without downloading.
//
// CLI:
//   node scripts/auto-fix-bot.js                 # try up to 10 games
//   node scripts/auto-fix-bot.js --max 5         # cap batch
//   node scripts/auto-fix-bot.js --only slug-a slug-b
//   node scripts/auto-fix-bot.js --dry-run
//   node scripts/auto-fix-bot.js --probe-timeout 10000

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const https = require('https');
const http = require('http');
const { spawn } = require('child_process');
const { URL } = require('url');

const { scanGame } = require('./static-health-scan');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const QUARANTINE_DIR = path.join(ROOT, '.quarantine');
const HEALTH_PATH = path.join(ROOT, 'game_health.json');
const SOURCES_PATH = path.join(ROOT, 'recovery_sources.json');
const ALIASES_PATH = path.join(ROOT, 'slug_aliases.json');
const LOG_PATH = path.join(ROOT, 'auto_fix_bot.jsonl');
const SUMMARY_PATH = path.join(ROOT, 'auto_fix_bot_summary.json');
const SCRAPER = path.join(__dirname, 'deep-asset-scraper.js');
const CATALOG_PATH = path.join(ROOT, 'games_list.json');
const LOCK_PATH = path.join(ROOT, '.auto_fix_and_recover.lock');

// Shared lock file with auto_fix_and_recover_games.py — same JSON shape so
// neither writer can clobber the other's state. Format: {pid,started_at,cwd}.
function pidAlive(pid) {
	if (!pid || pid <= 0) return false;
	try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; }
}

function acquireLock(force) {
	if (fs.existsSync(LOCK_PATH) && !force) {
		let payload = {};
		try { payload = JSON.parse(fs.readFileSync(LOCK_PATH, 'utf-8')); } catch {}
		const otherPid = Number(payload.pid) || 0;
		if (otherPid && otherPid !== process.pid && pidAlive(otherPid)) {
			throw new Error(`Another auto-fix run is active (pid=${otherPid}). Stop it or pass --force-lock.`);
		}
	}
	fs.writeFileSync(LOCK_PATH, JSON.stringify({
		pid: process.pid,
		started_at: Math.floor(Date.now() / 1000),
		cwd: ROOT,
		owner: 'auto-fix-bot.js',
	}, null, 2));
}

function releaseLock() {
	if (!fs.existsSync(LOCK_PATH)) return;
	let payload = {};
	try { payload = JSON.parse(fs.readFileSync(LOCK_PATH, 'utf-8')); } catch {}
	if (!payload.pid || Number(payload.pid) === process.pid) {
		try { fs.unlinkSync(LOCK_PATH); } catch {}
	}
}

const DEFAULT_HEADERS = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Encoding': 'identity',
	'Accept-Language': 'en-US,en;q=0.9',
};

// Game-runtime fingerprints. If a candidate page contains none of these in
// the first ~32 KB, it's almost certainly a "not found" landing page rather
// than a playable game and we shouldn't waste a full puppeteer scrape on it.
const GAME_RUNTIME_MARKERS = [
	'<canvas', 'unity', 'createunityinstance', 'unityloader',
	'ruffle', 'ruffle-player', 'ruffle-embed',
	'ejs_pathtodata', 'ejs_player', 'emulatorjs',
	'<iframe', 'godot', 'phaser', 'pixi.js', 'webassembly',
	'.wasm', '.unityweb', '.swf', '.pck',
];

function parseArgs(argv) {
	const args = {
		max: 10,
		only: null,
		dryRun: false,
		probeTimeout: 6000,
		scrapeTimeout: 90000,
		includeOverrides: false,
		webSearch: true,
		wayback: false,           // off by default — IA's CDX API timed out on us reliably
		webSearchMax: 10,
		waybackSeedMax: 2,
		maxViable: 4,
		searchBudgetMs: 25000,    // hard cap on per-game candidate discovery
		gameBudgetMs: 240000,     // hard cap on per-game total time
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--max') args.max = Number(argv[++i]) || args.max;
		else if (a === '--only') {
			args.only = new Set();
			while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) args.only.add(argv[++i]);
		}
		else if (a === '--dry-run') args.dryRun = true;
		else if (a === '--probe-timeout') args.probeTimeout = Number(argv[++i]) || args.probeTimeout;
		else if (a === '--scrape-timeout') args.scrapeTimeout = Number(argv[++i]) || args.scrapeTimeout;
		else if (a === '--include-overrides') args.includeOverrides = true;
		else if (a === '--no-web-search') args.webSearch = false;
		else if (a === '--wayback') args.wayback = true;
		else if (a === '--no-wayback') args.wayback = false;
		else if (a === '--web-search-max') args.webSearchMax = Number(argv[++i]) || args.webSearchMax;
		else if (a === '--wayback-seed-max') args.waybackSeedMax = Number(argv[++i]) || args.waybackSeedMax;
		else if (a === '--max-viable') args.maxViable = Number(argv[++i]) || args.maxViable;
		else if (a === '--search-budget-ms') args.searchBudgetMs = Number(argv[++i]) || args.searchBudgetMs;
		else if (a === '--game-budget-ms') args.gameBudgetMs = Number(argv[++i]) || args.gameBudgetMs;
		else if (a === '--force-lock') args.forceLock = true;
	}
	return args;
}

function readJsonSafe(p) {
	try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return null; }
}

function appendLog(entry) {
	const line = JSON.stringify({ ts: Math.floor(Date.now() / 1000), ...entry }) + '\n';
	fs.appendFileSync(LOG_PATH, line);
}

function loadBrokenGames(args) {
	const health = readJsonSafe(HEALTH_PATH);
	if (!health || !health.games) {
		console.error('No game_health.json — run `npm run health:refresh` first.');
		process.exit(2);
	}
	const catalog = readJsonSafe(CATALOG_PATH) || [];
	const typeBySlug = new Map();
	const titleBySlugLower = new Map();
	for (const g of catalog) {
		if (!g || !g.name) continue;
		typeBySlug.set(g.name, g.type || 'webgl');
		const display = String(g.title || g.displayName || g.label || g.name);
		titleBySlugLower.set(String(g.name).toLowerCase(), display);
	}
	const out = [];
	for (const [slug, entry] of Object.entries(health.games)) {
		if (entry.verdict !== 'broken') continue;
		if (!args.includeOverrides && entry.source === 'override') continue;
		if (args.only && !args.only.has(slug)) continue;
		const displayName = titleBySlugLower.get(String(slug).toLowerCase()) || humanizeSlug(slug);
		out.push({ slug, displayName, gameType: typeBySlug.get(slug) || 'webgl', healthEntry: entry });
	}
	if (args.only) {
		// Preserve the order the user specified.
		const order = [...args.only];
		out.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
	}
	return args.only ? out : out.slice(0, args.max);
}

function humanizeSlug(slug) {
	const withSpaces = String(slug)
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[_-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return withSpaces.replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

function loadSources() {
	const raw = readJsonSafe(SOURCES_PATH);
	if (!Array.isArray(raw)) return [];
	return raw
		.filter(s => s && s.type === 'pattern' && typeof s.url_template === 'string' && !s.disabled)
		.sort((a, b) => (a.priority || 999) - (b.priority || 999));
}

function loadAliases() {
	// slug_aliases.json shape:
	// {
	//   "DOOMORI": ["doomori-1.0", "doom-original"],
	//   "Five Nights at Epstein": ["fnaepstein", "fnae"]
	// }
	const raw = readJsonSafe(ALIASES_PATH);
	if (!raw || typeof raw !== 'object') return new Map();
	const out = new Map();
	for (const [slug, val] of Object.entries(raw)) {
		if (Array.isArray(val)) out.set(slug, val.filter(s => typeof s === 'string'));
		else if (typeof val === 'string') out.set(slug, [val]);
	}
	return out;
}

function normalizeVariant(v) {
	return String(v || '')
		.trim()
		.replace(/\s+/g, ' ')
		.replace(/^['"]+|['"]+$/g, '');
}

function addVariantForms(out, value) {
	const base = normalizeVariant(value);
	if (!base) return;
	out.add(base);
	out.add(base.toLowerCase());
	out.add(base.replace(/[_\s]+/g, '-').toLowerCase());
	out.add(base.replace(/[-\s]+/g, '_').toLowerCase());
	out.add(base.replace(/[\s_-]+/g, '').toLowerCase());
	out.add(base.replace(/[()'":]/g, '').replace(/\s+/g, '-').toLowerCase());

	const strippedVersion = base
		.replace(/[-_\s]v?\d+(?:\.\d+){0,2}$/i, '')
		.replace(/[-_\s](?:html5|webgl|flash)$/i, '')
		.trim();
	if (strippedVersion && strippedVersion !== base) addVariantForms(out, strippedVersion);
}

function slugVariants(slug, aliases, displayName) {
	const out = new Set();
	addVariantForms(out, slug);
	addVariantForms(out, displayName);
	addVariantForms(out, humanizeSlug(slug));
	const list = aliases.get(slug) || [];
	for (const a of list) addVariantForms(out, a);
	return [...out].filter(v => v && v.length <= 90);
}

function buildCandidates(sources, slug, displayName, gameType, aliases) {
	const out = [];
	const variants = slugVariants(slug, aliases, displayName);
	for (const src of sources) {
		const applies = Array.isArray(src.applies_to) ? src.applies_to : null;
		if (applies && !applies.includes(gameType)) continue;
		for (const v of variants) {
			const url = src.url_template.replace('{slug}', encodeURIComponent(v));
			out.push({ url, source: src.name, priority: src.priority || 999, variant: v });
		}
	}
	const seen = new Set();
	return out.filter(c => (seen.has(c.url) ? false : (seen.add(c.url), true)));
}

function httpGetText(url, timeoutMs = 8000, maxFollow = 4, headers = null) {
	return new Promise((resolve) => {
		const visit = (currentUrl, hops) => {
			let parsed;
			try { parsed = new URL(currentUrl); } catch { return resolve({ ok: false, status: 0, body: '' }); }
			const lib = parsed.protocol === 'https:' ? https : http;
			const req = lib.request({
				method: 'GET',
				hostname: parsed.hostname,
				port: parsed.port,
				path: parsed.pathname + (parsed.search || ''),
				headers: headers || DEFAULT_HEADERS,
				timeout: timeoutMs,
			}, (res) => {
				const status = res.statusCode || 0;
				if ((status === 301 || status === 302 || status === 303 || status === 307 || status === 308) && hops < maxFollow && res.headers.location) {
					try { res.destroy(); } catch {}
					const next = new URL(res.headers.location, currentUrl).toString();
					visit(next, hops + 1);
					return;
				}
				const chunks = [];
				let total = 0;
				res.on('data', (c) => {
					chunks.push(c);
					total += c.length;
					if (total > 1024 * 1024) { try { res.destroy(); } catch {} }
				});
				const done = () => resolve({
					ok: status >= 200 && status < 400,
					status,
					body: Buffer.concat(chunks).toString('utf-8'),
					finalUrl: currentUrl,
				});
				res.on('end', done);
				res.on('close', done);
			});
			req.on('timeout', () => { try { req.destroy(); } catch {} resolve({ ok: false, status: 0, body: '', error: 'timeout' }); });
			req.on('error', (err) => resolve({ ok: false, status: 0, body: '', error: String(err.code || err.message) }));
			req.end();
		};
		visit(url, 0);
	});
}

function decodePossibleDdgRedirect(rawUrl) {
	try {
		const parsed = new URL(rawUrl, 'https://duckduckgo.com');
		if (parsed.hostname.endsWith('duckduckgo.com')) {
			const uddg = parsed.searchParams.get('uddg');
			if (uddg) return decodeURIComponent(uddg);
		}
		return parsed.toString();
	} catch {
		return null;
	}
}

function isLikelyGameResultUrl(url, variants) {
	if (!url) return false;
	let parsed;
	try { parsed = new URL(url); } catch { return false; }
	if (!/^https?:$/.test(parsed.protocol)) return false;
	const host = parsed.hostname.toLowerCase();
	if (host.includes('duckduckgo.com') || host.includes('google.com') || host.includes('bing.com')) return false;
	const hay = (parsed.hostname + parsed.pathname).toLowerCase();
	if (hay.includes('/game/') || hay.includes('/games/') || hay.endsWith('.html') || hay.includes('unblocked')) return true;
	for (const v of variants) {
		const needle = String(v).toLowerCase().replace(/[\s_]+/g, '-');
		if (needle.length >= 4 && hay.includes(needle)) return true;
	}
	return false;
}

// Verified-working search backends (tested 2026-05-04). DuckDuckGo HTML and
// 1games.io return either anti-bot challenges or 403s without a real browser,
// so they were dropped. Brave Search returns real result URLs in plain HTML.
// Bing returns 200 but wraps result URLs in r.bing.com — we follow one hop
// to extract the underlying URL.

function extractBraveResults(body) {
	// Brave search results live in <a class="result-header" href="..."> and
	// <a href="https://..." class="..."> blocks. Pull every external https URL.
	const out = [];
	const re = /href=["'](https?:\/\/[^"'\s]+)["']/gi;
	let m;
	while ((m = re.exec(body)) !== null) {
		const url = m[1];
		if (/brave\.com|bravesearch\.com/i.test(url)) continue;
		out.push(url);
	}
	return out;
}

async function followBingRedirect(rUrl, timeoutMs) {
	// r.bing.com/?u=<base64-ish>&p=... — issue a HEAD and read the Location header.
	return new Promise((resolve) => {
		let parsed;
		try { parsed = new URL(rUrl); } catch { return resolve(null); }
		const req = https.request({
			method: 'HEAD',
			hostname: parsed.hostname,
			port: parsed.port,
			path: parsed.pathname + (parsed.search || ''),
			headers: DEFAULT_HEADERS,
			timeout: timeoutMs,
		}, (res) => {
			const loc = res.headers && res.headers.location;
			try { res.destroy(); } catch {}
			resolve(loc || null);
		});
		req.on('timeout', () => { try { req.destroy(); } catch {} resolve(null); });
		req.on('error', () => resolve(null));
		req.end();
	});
}

async function searchBrave(query, timeoutMs) {
	const url = `https://search.brave.com/search?q=${encodeURIComponent(query)}&source=web`;
	const res = await httpGetText(url, timeoutMs);
	if (!res.ok || !res.body) return [];
	return extractBraveResults(res.body);
}

async function searchBing(query, timeoutMs, redirectBudget = 6) {
	const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
	const res = await httpGetText(url, timeoutMs);
	if (!res.ok || !res.body) return [];
	const out = [];
	const re = /href=["'](https?:\/\/[^"'\s]+)["']/gi;
	let m;
	const rRedirects = [];
	while ((m = re.exec(res.body)) !== null) {
		const u = m[1];
		if (/bing\.com|microsoft\.com|microsofttranslator|live\.com/i.test(u)) {
			if (/^https:\/\/(?:www\.)?bing\.com\/ck\//i.test(u) && rRedirects.length < redirectBudget) {
				rRedirects.push(u);
			}
			continue;
		}
		out.push(u);
	}
	// Follow a few r.bing.com /ck/ redirects in parallel for additional URLs.
	const followed = await Promise.all(rRedirects.map(r => followBingRedirect(r, Math.min(timeoutMs, 4000))));
	for (const f of followed) if (f) out.push(f);
	return out;
}

// Score candidate URL: higher = more likely to be a playable game page for
// this slug. Used to rank and to filter obviously-bad results (search engines,
// social media, video sites — but NOT real game-host sites; those are the
// whole point even if they wrap games in portal iframes).
function scoreCandidate(url, variants) {
	let parsed;
	try { parsed = new URL(url); } catch { return -999; }
	if (!/^https?:$/.test(parsed.protocol)) return -999;
	const host = parsed.hostname.toLowerCase();
	const blockedHosts = ['youtube.com', 'youtu.be', 'twitter.com', 'x.com', 'facebook.com',
		'reddit.com', 'pinterest.com', 'tiktok.com', 'instagram.com', 'amazon.com',
		'wikipedia.org', 'apple.com', 'play.google.com', 'discord.com',
		'store.steampowered.com',
	];
	for (const b of blockedHosts) if (host.includes(b)) return -999;
	const hay = (parsed.hostname + parsed.pathname).toLowerCase();
	let score = 0;
	if (/\b(unblocked|html5|games?|play)\b/.test(hay)) score += 2;
	if (hay.includes('/game/') || hay.includes('/games/') || hay.includes('/play/')) score += 3;
	if (hay.endsWith('.html') || hay.endsWith('/')) score += 1;
	for (const v of variants) {
		const needle = String(v).toLowerCase().replace(/[\s_]+/g, '-');
		if (needle.length >= 4 && hay.includes(needle)) { score += 5; break; }
	}
	if (score === 0) return -1;
	return score;
}

// Real game-portal hosts that respond to direct URLs (no anti-bot challenge
// for a plain GET). Each yields one synthetic candidate per slug variant —
// effectively "search without a search engine," and reliable when the slug
// roughly matches the portal's URL convention.
const SEARCH_PORTAL_PATTERNS = [
	{ name: 'crazygames-direct',  url: 'https://www.crazygames.com/game/{slug}' },
	{ name: 'kbhgames-direct',    url: 'https://www.kbhgames.com/game/{slug}' },
	{ name: 'now-gg-direct',      url: 'https://now.gg/play/games/{slug}' },
	{ name: 'gamemonetize-embed', url: 'https://html5.gamemonetize.com/{slug}/' },
	{ name: 'gamedist-embed',     url: 'https://html5.gamedistribution.com/{slug}/' },
];

async function findWebSearchCandidates(slug, displayName, variants, args) {
	if (!args.webSearch) return [];
	const t0 = Date.now();
	const seen = new Set();
	const ranked = [];

	// Phase 1 — synthetic portal-direct candidates from slug variants. Always
	// runs; cheap (just URL composition) and not subject to search-engine
	// anti-bot blocking. Most actual fixes will come from this path.
	const variantsToTry = variants.slice(0, 6); // cap to keep candidate set sane
	for (const portal of SEARCH_PORTAL_PATTERNS) {
		for (const v of variantsToTry) {
			const url = portal.url.replace('{slug}', encodeURIComponent(v));
			if (seen.has(url)) continue;
			seen.add(url);
			ranked.push({ url, score: 4, _src: portal.name });
		}
	}

	// Phase 2 — best-effort search engines. Both rate-limit periodically; each
	// call is short-timed and non-fatal. If they return zero we still have the
	// phase-1 candidates.
	const queries = [
		`${displayName} unblocked game play online`,
		`${displayName} html5 game`,
	];
	if (Date.now() - t0 < args.searchBudgetMs) {
		for (const q of queries) {
			if (Date.now() - t0 > args.searchBudgetMs) break;
			const [brave, bing] = await Promise.all([
				searchBrave(q, args.probeTimeout).catch(() => []),
				searchBing(q, args.probeTimeout).catch(() => []),
			]);
			for (const url of brave.concat(bing)) {
				if (seen.has(url)) continue;
				seen.add(url);
				const score = scoreCandidate(url, variants);
				if (score <= 0) continue;
				ranked.push({ url, score, _src: 'search:web' });
			}
		}
	}

	ranked.sort((a, b) => b.score - a.score);
	return ranked.slice(0, args.webSearchMax).map((r, i) => ({
		url: r.url,
		source: r._src || 'search:web',
		priority: 80 + i,
		variant: slug,
		score: r.score,
	}));
}

async function findWaybackCandidates(slug, seedCandidates, args) {
	if (!args.wayback) return [];
	const seeds = seedCandidates.slice(0, args.waybackSeedMax);
	const out = [];
	const seen = new Set();
	
	// Add a direct slug search to Wayback as a high-priority seed
	const slugSearch = { url: `https://3kh0.github.io/${slug}/`, source: 'wayback-direct' };
	const allSeeds = [slugSearch, ...seeds];

	for (const seed of allSeeds) {
		const cdx = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(seed.url)}*&output=json&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&filter=mimetype:text/html&limit=3`;
		const res = await httpGetText(cdx, args.probeTimeout);
		if (!res.ok || !res.body || res.body.includes('503 Service Unavailable')) continue;
		let rows = null;
		try { rows = JSON.parse(res.body); } catch { rows = null; }
		if (!Array.isArray(rows) || rows.length < 2) continue;
		for (let i = 1; i < rows.length; i++) {
			const row = rows[i] || [];
			const ts = row[0];
			const original = row[1];
			if (!ts || !original) continue;
			const wb = `https://web.archive.org/web/${ts}if_/${original}`;
			if (seen.has(wb)) continue;
			seen.add(wb);
			out.push({
				url: wb,
				source: `wayback:${seed.source}`,
				priority: 180,
				variant: seed.variant || slug,
			});
		}
	}
	return out;
}

// Lightweight reachability probe: HEAD first, fall back to GET with a small
// byte limit if HEAD isn't supported. Returns { ok, status, contentType, length }.
function probeUrl(url, timeoutMs) {
	return new Promise((resolve) => {
		let parsed;
		try { parsed = new URL(url); } catch { return resolve({ ok: false, status: 0 }); }
		const lib = parsed.protocol === 'https:' ? https : http;
		const finish = (result) => { try { req.destroy(); } catch {} resolve(result); };
		const req = lib.request({
			method: 'HEAD',
			hostname: parsed.hostname,
			port: parsed.port,
			path: parsed.pathname + (parsed.search || ''),
			headers: { 'User-Agent': 'Mozilla/5.0 jeoweb-fix-bot' },
			timeout: timeoutMs,
		}, (res) => {
			const status = res.statusCode || 0;
			// Some hosts 405 on HEAD; treat as "try GET" by falling through to a small GET.
			if (status === 405 || status === 501) {
				probeUrlGet(url, timeoutMs).then(resolve);
				return;
			}
			finish({
				ok: status >= 200 && status < 400,
				status,
				contentType: String(res.headers['content-type'] || ''),
				length: Number(res.headers['content-length'] || 0),
			});
		});
		req.on('timeout', () => finish({ ok: false, status: 0, error: 'timeout' }));
		req.on('error', (err) => finish({ ok: false, status: 0, error: String(err.code || err.message) }));
		req.end();
	});
}

function probeUrlGet(url, timeoutMs, captureBody = false, maxFollow = 4, useRange = true) {
	return new Promise((resolve) => {
		const visit = (currentUrl, hops) => {
			let parsed;
			try { parsed = new URL(currentUrl); } catch { return resolve({ ok: false, status: 0 }); }
			const lib = parsed.protocol === 'https:' ? https : http;
			const reqHeaders = { ...DEFAULT_HEADERS };
			if (useRange) reqHeaders.Range = captureBody ? 'bytes=0-32767' : 'bytes=0-2047';
			const req = lib.request({
				method: 'GET',
				hostname: parsed.hostname,
				port: parsed.port,
				path: parsed.pathname + (parsed.search || ''),
				headers: reqHeaders,
				timeout: timeoutMs,
			}, (res) => {
				const status = res.statusCode || 0;
				if (status === 416 && useRange) {
					try { res.destroy(); } catch {}
					probeUrlGet(currentUrl, timeoutMs, captureBody, maxFollow, false).then(resolve);
					return;
				}
				// Follow a couple of redirects so wanted5games.com (301 → game page) is fairly evaluated.
				if ((status === 301 || status === 302 || status === 303 || status === 307 || status === 308) && hops < maxFollow && res.headers.location) {
					try { res.destroy(); } catch {}
					const next = new URL(res.headers.location, currentUrl).toString();
					visit(next, hops + 1);
					return;
				}
				const chunks = [];
				let total = 0;
				res.on('data', (c) => {
					if (captureBody) chunks.push(c);
					total += c.length;
					if (total > 65536) { try { res.destroy(); } catch {} }
				});
				const finish = () => resolve({
					ok: (status >= 200 && status < 400) || status === 206,
					status,
					contentType: String(res.headers['content-type'] || ''),
					length: total,
					body: captureBody ? Buffer.concat(chunks).toString('utf-8').toLowerCase() : '',
					finalUrl: currentUrl,
				});
				res.on('end', finish);
				res.on('close', finish);
			});
			req.on('timeout', () => { try { req.destroy(); } catch {} resolve({ ok: false, status: 0, error: 'timeout' }); });
			req.on('error', (err) => resolve({ ok: false, status: 0, error: String(err.code || err.message) }));
			req.end();
		};
		visit(url, 0);
	});
}

function extractIframeCandidates(html, baseUrl) {
	if (!html) return [];
	const out = [];
	const re = /<iframe[^>]+src=["']([^"']+)["'][^>]*>/gi;
	let m;
	while ((m = re.exec(html)) !== null) {
		const raw = String(m[1] || '').trim();
		if (!raw || raw.startsWith('javascript:') || raw.startsWith('data:')) continue;
		try {
			const abs = new URL(raw, baseUrl).toString();
			const low = abs.toLowerCase();
			if (low.includes('ads') || low.includes('doubleclick') || low.includes('googlesyndication')) continue;
			out.push(abs);
		} catch {}
	}
	return [...new Set(out)];
}

async function resolvePortalTarget(url, timeoutMs) {
	let current = url;
	const visited = new Set([current]);
	const chain = [current];
	for (let depth = 0; depth < 5; depth++) {
		const page = await probeUrlGet(current, timeoutMs, true);
		if (!page.ok || !page.body) return { url: current, chain, resolved: current !== url, depth };
		const frames = extractIframeCandidates(page.body, current);
		if (!frames.length) return { url: current, chain, resolved: current !== url, depth };
		const preferred = frames.sort((a, b) => {
			const score = (u) => {
				const l = u.toLowerCase();
				let s = 0;
				if (l.includes('/game/')) s += 4;
				if (l.includes('play')) s += 2;
				if (l.endsWith('.html')) s += 2;
				if (l.includes('embed')) s += 1;
				return s;
			};
			return score(b) - score(a);
		})[0];
		if (!preferred || visited.has(preferred)) break;
		visited.add(preferred);
		chain.push(preferred);
		current = preferred;
	}
	return { url: current, chain, resolved: current !== url, depth: chain.length - 1 };
}

function bodyLooksLikeGame(body) {
	if (!body) return false;
	let hits = 0;
	for (const m of GAME_RUNTIME_MARKERS) if (body.includes(m)) hits += 1;
	// Lenient check: if we see a strong engine marker, one is enough.
	if (body.includes('unityloader') || body.includes('ruffle-player') || body.includes('emulatorjs') || body.includes('phaser.js')) {
		return true;
	}
	return hits >= 2;
}

function bodyLooksLikeNotFound(body) {
	if (!body) return false;
	const tells = ['game not found', 'page not found', '404 not found', 'no results', 'error 404'];
	for (const t of tells) if (body.includes(t)) return true;
	return false;
}

async function backupGame(slug) {
	const src = path.join(ASSETS_DIR, slug);
	if (!fs.existsSync(src)) return null;
	await fsp.mkdir(QUARANTINE_DIR, { recursive: true });
	const stamp = new Date().toISOString().replace(/[:.]/g, '-');
	const dest = path.join(QUARANTINE_DIR, `${slug}-${stamp}`);
	await fsp.rename(src, dest);
	return dest;
}

async function restoreGame(slug, backupPath) {
	if (!backupPath) return;
	const dest = path.join(ASSETS_DIR, slug);
	// If the scraper produced a partial folder, throw it out before restoring.
	if (fs.existsSync(dest)) {
		await fsp.rm(dest, { recursive: true, force: true });
	}
	await fsp.rename(backupPath, dest);
}

// After a scrape, the deep-asset-scraper sometimes downloads all the game
// assets (Unity loader.js, .unityweb, etc.) but fails to write a top-level
// index.html because the source portal didn't use a literal <iframe>. This
// post-scrape repair walks the captured folder, locates the inner game entry
// point, and writes a top-level wrapper so the static scanner finds the game.
async function postScrapeRepair(slug) {
	const dest = path.join(ASSETS_DIR, slug);
	if (!fs.existsSync(dest)) return { ok: false, reason: 'no_folder' };
	const topHtml = path.join(dest, 'index.html');
	if (fs.existsSync(topHtml)) return { ok: true, reason: 'already_has_index' };

	// Walk to find candidates for the entry HTML and engine artifacts.
	const candidates = { html: [], unityLoader: [], swf: [], emulatorJs: [], allFiles: [] };
	const walk = (dir, depth = 0) => {
		if (depth > 8) return;
		let entries;
		try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
		for (const ent of entries) {
			const p = path.join(dir, ent.name);
			if (ent.isDirectory()) { walk(p, depth + 1); continue; }
			candidates.allFiles.push(p);
			const lower = ent.name.toLowerCase();
			if (lower.endsWith('.html') || lower.endsWith('.htm')) candidates.html.push(p);
			else if (/\.loader\.js$/i.test(ent.name)) candidates.unityLoader.push(p);
			else if (lower.endsWith('.swf')) candidates.swf.push(p);
		}
	};
	walk(dest);
	// Also check directly with fs.readdirSync at depth 0 — debug for the case
	// where walk might silently miss something due to permissions.
	try {
		const dbgPath = path.join(ROOT, '.quarantine', `${slug}-repair-debug.log`);
		fs.appendFileSync(dbgPath, `\n${new Date().toISOString()} dest=${dest} files=${candidates.allFiles.length} html=${candidates.html.length} loaders=${candidates.unityLoader.length} swf=${candidates.swf.length}\n${candidates.allFiles.slice(0, 12).join('\n')}\n`);
	} catch {}

	const relFromDest = (abs) => path.relative(dest, abs).replace(/\\/g, '/');

	// Pick a sensible inner HTML: prefer one named index.html, then shortest path.
	const innerIndex = candidates.html.find(p => path.basename(p).toLowerCase() === 'index.html')
		|| candidates.html.sort((a, b) => relFromDest(a).length - relFromDest(b).length)[0];

	if (innerIndex) {
		const target = relFromDest(innerIndex);
		const wrapper = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>${slug}</title>
<style>html,body{margin:0;padding:0;height:100%;background:#000;}iframe{border:0;width:100%;height:100%;display:block;}</style>
</head><body>
<iframe src="${target}" allow="autoplay; fullscreen; gamepad; pointer-lock" allowfullscreen></iframe>
</body></html>`;
		fs.writeFileSync(topHtml, wrapper);
		return { ok: true, reason: 'wrapped_inner_html', target };
	}

	if (candidates.unityLoader.length) {
		// Build a minimal Unity bootstrap by reading a sibling JSON if present,
		// otherwise infer the build name from the loader filename.
		const loader = candidates.unityLoader[0];
		const loaderRel = relFromDest(loader);
		const buildDir = path.dirname(loaderRel);
		const baseName = path.basename(loader).replace(/\.loader\.js$/i, '');
		// Probe sibling files to find the right extensions used by this build.
		const sibling = (suffixes) => {
			for (const sfx of suffixes) {
				const f = path.join(path.dirname(loader), baseName + sfx);
				if (fs.existsSync(f)) return path.posix.join(buildDir, baseName + sfx);
			}
			return null;
		};
		const dataUrl = sibling(['.data.unityweb', '.data.gz', '.data.br', '.data']);
		const frameworkUrl = sibling(['.framework.js.unityweb', '.framework.js.gz', '.framework.js.br', '.framework.js']);
		const codeUrl = sibling(['.wasm.unityweb', '.wasm.gz', '.wasm.br', '.wasm']);
		if (dataUrl && frameworkUrl && codeUrl) {
			const wrapper = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>${slug}</title>
<style>html,body{margin:0;padding:0;height:100%;background:#000;display:flex;justify-content:center;align-items:center;}canvas{width:100%;height:100%;}</style>
</head><body>
<canvas id="unity-canvas"></canvas>
<script src="${loaderRel}"></script>
<script>
createUnityInstance(document.querySelector("#unity-canvas"), {
  dataUrl: "${dataUrl}",
  frameworkUrl: "${frameworkUrl}",
  codeUrl: "${codeUrl}",
  streamingAssetsUrl: "StreamingAssets",
  productName: "${slug}",
  productVersion: "1.0",
});
</script>
</body></html>`;
			fs.writeFileSync(topHtml, wrapper);
			return { ok: true, reason: 'wrapped_unity_build', loader: loaderRel };
		}
	}

	if (candidates.swf.length) {
		const swf = candidates.swf.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size)[0];
		const swfRel = relFromDest(swf);
		const wrapper = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>${slug}</title>
<script src="../../ruffle/ruffle.js"></script>
<style>html,body{margin:0;padding:0;height:100%;background:#000;}ruffle-player{width:100%;height:100%;}</style>
</head><body>
<ruffle-player><source src="${swfRel}"></source></ruffle-player>
</body></html>`;
		fs.writeFileSync(topHtml, wrapper);
		return { ok: true, reason: 'wrapped_swf', swf: swfRel };
	}

	return { ok: false, reason: 'no_engine_found', html_count: candidates.html.length };
}

function runScraper(url, slug, timeoutMs) {
	return new Promise((resolve) => {
		const child = spawn(process.execPath, [SCRAPER, url, slug], {
			cwd: ROOT,
			stdio: ['ignore', 'pipe', 'pipe'],
		});
		let stdout = '', stderr = '';
		const killTimer = setTimeout(() => {
			try { child.kill('SIGKILL'); } catch {}
		}, timeoutMs);
		child.stdout.on('data', d => { stdout += d.toString(); });
		child.stderr.on('data', d => { stderr += d.toString(); });
		child.on('close', (code, signal) => {
			clearTimeout(killTimer);
			resolve({ ok: code === 0 && !signal, code, signal, stdout, stderr });
		});
		child.on('error', (err) => {
			clearTimeout(killTimer);
			resolve({ ok: false, code: -1, error: String(err.message) });
		});
	});
}

async function fixOne(slug, displayName, gameType, sources, args) {
	const t0 = Date.now();
	const elapsed = () => Math.round((Date.now() - t0) / 100) / 10;
	console.log(`\n[${slug}] type=${gameType} display="${displayName}" — discovering candidates…`);
	const before = scanGame(slug);
	const patternCandidates = buildCandidates(sources, slug, displayName, gameType, args._aliases);
	const variants = slugVariants(slug, args._aliases, displayName);

	// Run web + wayback in parallel against a hard discovery budget.
	const discoveryDeadline = new Promise(resolve => setTimeout(() => resolve('__deadline__'), args.searchBudgetMs));
	const webPromise = findWebSearchCandidates(slug, displayName, variants, args).catch(() => []);
	const waybackPromise = args.wayback
		? findWaybackCandidates(slug, patternCandidates, args).catch(() => [])
		: Promise.resolve([]);

	const webCandidates = await Promise.race([webPromise, discoveryDeadline]);
	const waybackCandidates = await Promise.race([waybackPromise, discoveryDeadline]);
	const safeWeb = Array.isArray(webCandidates) ? webCandidates : [];
	const safeWayback = Array.isArray(waybackCandidates) ? waybackCandidates : [];

	console.log(`  discovered: pattern=${patternCandidates.length} web=${safeWeb.length} wayback=${safeWayback.length} (${elapsed()}s)`);

	const candidates = patternCandidates
		.concat(safeWeb, safeWayback)
		.sort((a, b) => a.priority - b.priority);
	if (!candidates.length) {
		appendLog({ slug, action: 'no_candidates', sources_count: sources.length });
		return { slug, status: 'no_candidates', candidates: 0 };
	}

	console.log(`[${slug}] candidates=${candidates.length} prior_verdict=${before.verdict}`);
	// Probe budget with category quotas: take the top-K from each source
	// bucket so a long tail of low-priority pattern variants doesn't starve
	// out the high-signal synthetic portal-direct or web-search candidates.
	const QUOTA_PER_SOURCE = 6;
	const counts = new Map();
	const candidatesToProbe = [];
	for (const c of candidates) {
		const k = c.source || '_';
		const n = counts.get(k) || 0;
		if (n >= QUOTA_PER_SOURCE) continue;
		counts.set(k, n + 1);
		candidatesToProbe.push(c);
	}
	if (candidatesToProbe.length < candidates.length) {
		console.log(`  probing ${candidatesToProbe.length}/${candidates.length} (${counts.size} sources × up to ${QUOTA_PER_SOURCE})`);
	}

	// Two-stage probe:
	//   stage 1 — cheap HEAD / small-GET to filter obvious 404s
	//   stage 2 — body-content GET on plausible candidates to confirm a game
	//             page (canvas / unity / ruffle / etc.), not a "not found" landing.
	const viable = [];
	for (const c of candidatesToProbe) {
		const p = await probeUrl(c.url, args.probeTimeout);
		const isHtml = !p.contentType || /text\/html|application\/xhtml/i.test(p.contentType);
		const isRaw = /githubusercontent/i.test(c.url) || /text\/plain/i.test(p.contentType);
		const stage1Ok = p.ok && (isHtml || isRaw);
		if (!stage1Ok) {
			console.log(`  probe ${c.source.padEnd(30)} status=${p.status || '-'} skip(stage1)`);
			appendLog({ slug, action: 'probe', source: c.source, url: c.url, variant: c.variant, status: p.status, ok: false, stage: 1, error: p.error });
			continue;
		}
		const body = await probeUrlGet(c.url, args.probeTimeout, true);
		const markerHit = body.ok && bodyLooksLikeGame(body.body) && !bodyLooksLikeNotFound(body.body);
		const weakPortalHit = body.ok && (body.length || 0) < 128 && /\/game\//i.test(c.url);
		const isGame = markerHit || weakPortalHit;
		console.log(`  probe ${c.source.padEnd(30)} status=${body.status || p.status} ${isGame ? 'GAME' : 'skip(stage2)'}`);
		appendLog({ slug, action: 'probe', source: c.source, url: c.url, variant: c.variant, status: body.status || p.status, ok: isGame, stage: 2, body_size: body.length });
		if (isGame) viable.push(c);
		if (viable.length >= args.maxViable) break;
	}

	if (!viable.length) {
		appendLog({ slug, action: 'no_viable_candidates' });
		return { slug, status: 'no_viable_candidates', candidates: candidates.length };
	}

	if (args.dryRun) {
		appendLog({ slug, action: 'dry_run', viable_count: viable.length, candidates: viable.map(c => c.url) });
		return { slug, status: 'dry_run', viable: viable.length, urls: viable.map(c => c.url) };
	}

	// Backup the broken folder, then attempt each viable candidate in turn.
	const backup = await backupGame(slug);
	try {
		for (const c of viable) {
			const dest = path.join(ASSETS_DIR, slug);
			// Hard clean-slate for every attempt so stale files from prior tries never poison the result.
			if (fs.existsSync(dest)) await fsp.rm(dest, { recursive: true, force: true });

			const resolved = await resolvePortalTarget(c.url, args.probeTimeout);
			const scrapeUrl = resolved.url;
			if (resolved.resolved) {
				appendLog({ slug, action: 'iframe_resolve', source: c.source, from: c.url, to: scrapeUrl, chain: resolved.chain });
			}

			console.log(`  scraping ${c.source} -> ${scrapeUrl}`);
			const result = await runScraper(scrapeUrl, slug, args.scrapeTimeout);
			// Save scraper stdout to a per-attempt file for debugging.
			try {
				const dbgPath = path.join(ROOT, '.quarantine', `${slug}-scraper-stdout.log`);
				fs.appendFileSync(dbgPath, `\n===== ${new Date().toISOString()} ${scrapeUrl} =====\n${result.stdout || ''}\n${result.stderr || ''}\n`);
			} catch {}
			// Many portals (1games.io, anything that loads Unity in-page rather
			// than via <iframe>) leave the dest folder full of game assets but
			// no top-level index.html. Walk the folder, find a sensible entry
			// point, and synthesize one.
			const repair = await postScrapeRepair(slug);
			appendLog({ slug, action: 'post_scrape_repair', source: c.source, repair });
			console.log(`    repair: ${repair.ok ? 'ok' : 'fail'} reason=${repair.reason}${repair.target ? ' target=' + repair.target : ''}${repair.loader ? ' loader=' + repair.loader : ''}`);
			const after = scanGame(slug);
			const improved = (after.verdict === 'pass') || (before.verdict === 'fail' && after.verdict === 'warn');
			appendLog({
				slug,
				action: 'scrape_attempt',
				source: c.source,
				url: c.url,
				scrape_url: scrapeUrl,
				scraper_ok: result.ok,
				scraper_code: result.code,
				before_verdict: before.verdict,
				after_verdict: after.verdict,
				before_critical_misses: before.critical_misses || 0,
				after_critical_misses: after.critical_misses || 0,
				kept: improved,
			});
			console.log(`    scraper exit=${result.code} verdict ${before.verdict} -> ${after.verdict} ${improved ? 'KEEP' : 'REJECT'}`);
			if (improved) {
				return { slug, status: 'fixed', source: c.source, url: scrapeUrl, before: before.verdict, after: after.verdict, backup };
			}
		}
	} catch (err) {
		await restoreGame(slug, backup);
		throw err;
	}

	await restoreGame(slug, backup);
	appendLog({ slug, action: 'all_candidates_failed', tried: viable.length });
	return { slug, status: 'all_candidates_failed', tried: viable.length };
}

async function copyDir(src, dst) {
	await fsp.mkdir(dst, { recursive: true });
	for (const entry of await fsp.readdir(src, { withFileTypes: true })) {
		const sp = path.join(src, entry.name);
		const dp = path.join(dst, entry.name);
		if (entry.isDirectory()) await copyDir(sp, dp);
		else await fsp.copyFile(sp, dp);
	}
}

async function main() {
	const args = parseArgs(process.argv);
	try {
		acquireLock(args.forceLock);
	} catch (err) {
		console.error(String(err && err.message || err));
		process.exit(2);
	}
	process.on('exit', releaseLock);
	process.on('SIGINT', () => { releaseLock(); process.exit(130); });
	process.on('SIGTERM', () => { releaseLock(); process.exit(143); });

	const sources = loadSources();
	if (!sources.length) {
		console.error('No usable patterns in recovery_sources.json.');
		releaseLock();
		process.exit(2);
	}
	args._aliases = loadAliases();
	const broken = loadBrokenGames(args);
	console.log(`auto-fix-bot: ${broken.length} broken games to attempt (sources=${sources.length} aliases=${args._aliases.size} dry_run=${args.dryRun})`);
	if (!broken.length) {
		console.log('Nothing to do.');
		releaseLock();
		process.exit(0);
	}
	const results = [];
	const startedAt = Math.floor(Date.now() / 1000);
	for (const g of broken) {
		try {
			const deadline = new Promise((_, reject) => setTimeout(
				() => reject(new Error(`per-game budget exceeded (${args.gameBudgetMs}ms)`)),
				args.gameBudgetMs
			));
			const r = await Promise.race([
				fixOne(g.slug, g.displayName, g.gameType, sources, args),
				deadline,
			]);
			results.push(r);
		} catch (err) {
			const status = /budget exceeded/.test(String(err && err.message)) ? 'timeout' : 'error';
			results.push({ slug: g.slug, status, error: String(err && err.message || err) });
			appendLog({ slug: g.slug, action: status, error: String(err && err.message || err) });
			console.log(`  [${g.slug}] ${status}: ${err && err.message}`);
		}
	}
	const tally = results.reduce((a, r) => { a[r.status] = (a[r.status] || 0) + 1; return a; }, {});
	const summary = {
		started_at: startedAt,
		finished_at: Math.floor(Date.now() / 1000),
		attempted: results.length,
		tally,
		results,
	};
	fs.writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2));
	console.log(`\nDone. ${results.length} attempted. Tally:`, tally);
	console.log(`Summary: ${path.relative(ROOT, SUMMARY_PATH)}`);
	console.log(`Log:     ${path.relative(ROOT, LOG_PATH)}`);
	console.log(`Tip: rerun with --include-overrides to also try force_maintenance slugs.`);
	// Tear down keep-alive sockets so node exits promptly even if some search
	// backend left a connection idle.
	try { https.globalAgent.destroy(); http.globalAgent.destroy(); } catch {}
	releaseLock();
	process.exit(0);
}

if (require.main === module) {
	main().catch((err) => { console.error(err); process.exit(1); });
}
