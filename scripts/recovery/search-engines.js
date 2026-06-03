// scripts/recovery/search-engines.js
//
// Search backends for finding a working copy of a broken game on the open
// web. Each backend exports searchXxx(query, opts) returning
// [{ url, title, snippet, source }]. Errors are swallowed and an empty
// array is returned — discovery is best-effort and the engine is expected
// to fan out across several backends in parallel.
//
// Backends:
//   - DuckDuckGo HTML (no API key; scrape lite endpoint)
//   - Bing (scrape b1 results)
//   - Brave Search API (BRAVE_SEARCH_API_KEY env var)
//   - GitHub Code Search (GITHUB_TOKEN env var; cheap + high-signal)
//   - Wayback CDX (archive.org)
//
// Usage:
//   const { discoverCandidates } = require('./search-engines');
//   const hits = await discoverCandidates({ name: 'Snake Battle', type: 'webgl' });

'use strict';

const https = require('https');
const { URL } = require('url');

const DEFAULT_TIMEOUT_MS = 8000;

function httpsGet(rawUrl, { headers = {}, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
	return new Promise((resolve, reject) => {
		let u;
		try { u = new URL(rawUrl); } catch (e) { return reject(e); }
		const req = https.request({
			method: 'GET',
			hostname: u.hostname,
			port: u.port || 443,
			path: u.pathname + (u.search || ''),
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
				'Accept': 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.9',
				...headers,
			},
		}, (res) => {
			// Follow up to 3 redirects.
			if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
				const loc = res.headers.location.startsWith('http')
					? res.headers.location
					: u.origin + res.headers.location;
				res.resume();
				return resolve(httpsGet(loc, { headers, timeoutMs }));
			}
			const chunks = [];
			res.on('data', c => chunks.push(c));
			res.on('end', () => {
				resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf-8') });
			});
		});
		req.on('error', reject);
		req.setTimeout(timeoutMs, () => { req.destroy(new Error('search timeout')); });
		req.end();
	});
}

function stripTags(s) {
	return String(s || '')
		.replace(/<[^>]*>/g, '')
		.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ').trim();
}

function dedupeBy(arr, keyFn) {
	const seen = new Set();
	const out = [];
	for (const x of arr) {
		const k = keyFn(x);
		if (!k || seen.has(k)) continue;
		seen.add(k); out.push(x);
	}
	return out;
}

// ----- DuckDuckGo HTML -------------------------------------------------------
async function searchDuckDuckGo(query, opts = {}) {
	const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
	try {
		const r = await httpsGet(url, { timeoutMs: opts.timeoutMs });
		if (!r || r.status !== 200) return [];
		const results = [];
		// DDG HTML wraps each result in <a class="result__a" href="...">title</a>
		const re = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>([\s\S]*?)<a[^>]+class="result__snippet"/gi;
		let m;
		while ((m = re.exec(r.body)) !== null) {
			let href = m[1];
			// DDG often wraps target in a redirect: //duckduckgo.com/l/?uddg=<encoded>
			const wrap = href.match(/uddg=([^&]+)/);
			if (wrap) try { href = decodeURIComponent(wrap[1]); } catch {}
			if (!/^https?:\/\//.test(href)) continue;
			results.push({
				url: href,
				title: stripTags(m[2]).slice(0, 240),
				snippet: '',
				source: 'duckduckgo',
			});
			if (results.length >= 25) break;
		}
		return results;
	} catch { return []; }
}

// ----- Bing scrape ----------------------------------------------------------
async function searchBing(query, opts = {}) {
	const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}&count=20&format=rss`;
	try {
		const r = await httpsGet(url, { timeoutMs: opts.timeoutMs });
		if (!r || r.status !== 200) return [];
		const out = [];
		// Bing RSS feed: <item><title>x</title><link>https://...</link>
		const itemRe = /<item>([\s\S]*?)<\/item>/gi;
		let m;
		while ((m = itemRe.exec(r.body)) !== null) {
			const block = m[1];
			const t = block.match(/<title>([\s\S]*?)<\/title>/i);
			const l = block.match(/<link>([\s\S]*?)<\/link>/i);
			if (!l) continue;
			out.push({
				url: stripTags(l[1]),
				title: t ? stripTags(t[1]).slice(0, 240) : '',
				snippet: '',
				source: 'bing',
			});
			if (out.length >= 25) break;
		}
		if (out.length) return out;
		// Fallback: HTML scrape.
		const url2 = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
		const r2 = await httpsGet(url2, { timeoutMs: opts.timeoutMs });
		if (!r2 || r2.status !== 200) return [];
		const linkRe = /<li class="b_algo"[^>]*>\s*<h2><a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
		while ((m = linkRe.exec(r2.body)) !== null) {
			if (!/^https?:\/\//.test(m[1])) continue;
			out.push({ url: m[1], title: stripTags(m[2]).slice(0, 240), snippet: '', source: 'bing' });
			if (out.length >= 25) break;
		}
		return out;
	} catch { return []; }
}

// ----- Brave Search API -----------------------------------------------------
async function searchBrave(query, opts = {}) {
	const key = process.env.BRAVE_SEARCH_API_KEY || process.env.BRAVE_API_KEY;
	if (!key) return [];
	const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=20`;
	try {
		const r = await httpsGet(url, {
			headers: { 'Accept': 'application/json', 'X-Subscription-Token': key },
			timeoutMs: opts.timeoutMs,
		});
		if (!r || r.status !== 200) return [];
		const data = JSON.parse(r.body);
		const items = (data && data.web && Array.isArray(data.web.results)) ? data.web.results : [];
		return items.map(it => ({
			url: it.url,
			title: (it.title || '').slice(0, 240),
			snippet: (it.description || '').slice(0, 320),
			source: 'brave',
		})).filter(x => x.url && /^https?:\/\//.test(x.url));
	} catch { return []; }
}

// ----- GitHub Code Search ---------------------------------------------------
async function searchGithubCode(query, opts = {}) {
	const tok = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
	if (!tok) return [];
	const q = encodeURIComponent(`${query} extension:html`);
	const url = `https://api.github.com/search/code?q=${q}&per_page=15`;
	try {
		const r = await httpsGet(url, {
			headers: {
				'Accept': 'application/vnd.github+json',
				'Authorization': `Bearer ${tok}`,
				'X-GitHub-Api-Version': '2022-11-28',
			},
			timeoutMs: opts.timeoutMs,
		});
		if (!r || r.status !== 200) return [];
		const data = JSON.parse(r.body);
		const items = Array.isArray(data.items) ? data.items : [];
		const out = [];
		for (const it of items) {
			if (!it.html_url) continue;
			const repo = it.repository && it.repository.full_name;
			out.push({
				url: it.html_url,
				title: `${repo} — ${it.name}`.slice(0, 240),
				snippet: it.path || '',
				source: 'github-code',
			});
		}
		return out;
	} catch { return []; }
}

// ----- Wayback CDX ----------------------------------------------------------
async function searchWayback(query, opts = {}) {
	// Use Wayback search via CDX with a wildcard hostname-less query is messy,
	// so prefer the Wayback "Open Search" endpoint that returns JSON.
	const url = `https://archive.org/wayback/available?url=${encodeURIComponent(query)}`;
	try {
		const r = await httpsGet(url, { timeoutMs: opts.timeoutMs });
		if (!r || r.status !== 200) return [];
		const data = JSON.parse(r.body);
		const snap = data && data.archived_snapshots && data.archived_snapshots.closest;
		if (!snap || !snap.url) return [];
		return [{ url: snap.url, title: `wayback ${snap.timestamp || ''}`, snippet: '', source: 'wayback' }];
	} catch { return []; }
}

// ----- Wayback CDX deep-walk -------------------------------------------------
// Single "closest snapshot" call misses older known-good copies of games whose
// most recent snapshot is itself broken. Walk the CDX index for the query
// term and surface multiple snapshots (oldest, middle, newest) ranked by
// timestamp so the candidate pool gets diverse archive points.
async function searchWaybackDeep(query, opts = {}) {
	const url = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(query)}&output=json&limit=80&filter=statuscode:200&filter=mimetype:text/html&fl=timestamp,original`;
	try {
		const r = await httpsGet(url, { timeoutMs: opts.timeoutMs });
		if (!r || r.status !== 200) return [];
		// CDX JSON output is [[header...], [row...], ...].
		const rows = JSON.parse(r.body);
		if (!Array.isArray(rows) || rows.length < 2) return [];
		const data = rows.slice(1).map(([ts, original]) => ({ ts, original }));
		if (!data.length) return [];
		// Pick up to 5 snapshots: oldest, 25%, middle, 75%, newest.
		const picks = [];
		const at = (frac) => data[Math.min(data.length - 1, Math.max(0, Math.floor(frac * (data.length - 1))))];
		for (const frac of [0, 0.25, 0.5, 0.75, 1]) picks.push(at(frac));
		const seen = new Set();
		const out = [];
		for (const p of picks) {
			if (!p || !p.original || seen.has(p.ts)) continue;
			seen.add(p.ts);
			out.push({
				url: `https://web.archive.org/web/${p.ts}/${p.original}`,
				title: `wayback ${p.ts}`,
				snippet: p.original,
				source: 'wayback-deep',
			});
		}
		return out;
	} catch { return []; }
}

// ----- GitHub repository search ---------------------------------------------
// Distinct from searchGithubCode — that one greps file contents. This one
// matches repository names + descriptions. Many HTML5 games live on a
// GitHub Pages site whose repo name contains the game title; surfacing the
// repo gives us the canonical source even if no code-grep hit fires.
async function searchGithubRepos(query, opts = {}) {
	const tok = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
	if (!tok) return [];
	const q = encodeURIComponent(`${query} in:name,description game`);
	const url = `https://api.github.com/search/repositories?q=${q}&per_page=15&sort=stars`;
	try {
		const r = await httpsGet(url, {
			headers: {
				'Accept': 'application/vnd.github+json',
				'Authorization': `Bearer ${tok}`,
				'X-GitHub-Api-Version': '2022-11-28',
			},
			timeoutMs: opts.timeoutMs,
		});
		if (!r || r.status !== 200) return [];
		const data = JSON.parse(r.body);
		const items = Array.isArray(data.items) ? data.items : [];
		const out = [];
		for (const it of items) {
			if (!it.html_url) continue;
			let pagesUrl = null;
			const m = String(it.html_url).match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)/);
			if (m) {
				const owner = m[1];
				const repo = m[2];
				// Special case: user/org Pages repos named "<owner>.github.io"
				// serve at the root of <owner>.github.io, NOT under /<repo>/.
				// The legacy inference produced dead URLs like
				// https://foo.github.io/foo.github.io/ for those.
				if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
					pagesUrl = `https://${owner}.github.io/`;
				} else {
					pagesUrl = `https://${owner}.github.io/${repo}/`;
				}
			}
			// Prefer the repo's declared `homepage` when it points at a Pages
			// URL — that's authoritative when the repo has been published.
			if (it.homepage && /^https?:\/\/[^/]+\.github\.io/i.test(it.homepage)) {
				pagesUrl = it.homepage;
			}
			out.push({
				url: pagesUrl || it.html_url,
				title: (it.full_name || '').slice(0, 240),
				snippet: (it.description || '').slice(0, 320),
				source: 'github-repos',
			});
		}
		return out;
	} catch { return []; }
}

// ----- Searx (privacy-preserving meta-search) -------------------------------
// Searx instances aggregate results from many backends and aren't aggressively
// rate-limited the way DDG/Bing are. We hit one of a small pool of public
// instances; opts.searxBase can override.
const SEARX_INSTANCES = [
	'https://search.bus-hit.me',
	'https://searx.be',
	'https://search.disroot.org',
];
async function searchSearx(query, opts = {}) {
	const base = opts.searxBase || SEARX_INSTANCES[Math.floor(Math.random() * SEARX_INSTANCES.length)];
	const url = `${base}/search?q=${encodeURIComponent(query)}&format=json&safesearch=0&categories=general`;
	try {
		const r = await httpsGet(url, {
			headers: { 'Accept': 'application/json' },
			timeoutMs: opts.timeoutMs,
		});
		if (!r || r.status !== 200) return [];
		const data = JSON.parse(r.body);
		const items = Array.isArray(data.results) ? data.results : [];
		return items.slice(0, 25).map((it) => ({
			url: it.url,
			title: (it.title || '').slice(0, 240),
			snippet: (it.content || '').slice(0, 320),
			source: 'searx',
		})).filter((x) => x.url && /^https?:\/\//.test(x.url));
	} catch { return []; }
}

// ----- Mojeek (independent crawler) -----------------------------------------
// Different result set from Google-derived backends; useful when DDG/Bing
// both miss a game because their crawlers haven't indexed the host.
async function searchMojeek(query, opts = {}) {
	const url = `https://www.mojeek.com/search?q=${encodeURIComponent(query)}&fmt=json`;
	try {
		const r = await httpsGet(url, {
			headers: { 'Accept': 'application/json' },
			timeoutMs: opts.timeoutMs,
		});
		if (!r || r.status !== 200) return [];
		const data = JSON.parse(r.body);
		const items = (data && data.response && Array.isArray(data.response.results)) ? data.response.results : [];
		return items.slice(0, 25).map((it) => ({
			url: it.url,
			title: (it.title || '').slice(0, 240),
			snippet: (it.desc || it.description || '').slice(0, 320),
			source: 'mojeek',
		})).filter((x) => x.url && /^https?:\/\//.test(x.url));
	} catch { return []; }
}

// ----- Yandex (Russian crawler with a distinct index) ----------------------
// Often the fastest way to find an Eastern European mirror of a game whose
// Western mirrors all 404'd. Hits the XML opensearch endpoint (no auth).
async function searchYandex(query, opts = {}) {
	const url = `https://yandex.com/search/?text=${encodeURIComponent(query)}&lr=10393`;
	try {
		const r = await httpsGet(url, { timeoutMs: opts.timeoutMs });
		if (!r || r.status !== 200) return [];
		// Yandex HTML results are wrapped in <a class="b-link" href="..."> or
		// <a class="organic__url" href="...">. Parse what we can.
		const out = [];
		const linkRe = /<a[^>]+class="[^"]*(?:OrganicTitle-Link|organic__url|b-link)[^"]*"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
		let m;
		while ((m = linkRe.exec(r.body)) !== null) {
			const href = m[1];
			if (!/^https?:\/\//.test(href)) continue;
			out.push({
				url: href,
				title: stripTags(m[2]).slice(0, 240),
				snippet: '',
				source: 'yandex',
			});
			if (out.length >= 25) break;
		}
		return out;
	} catch { return []; }
}

// ----- JSDelivr (npm CDN search) -------------------------------------------
// Some HTML5 games are packaged as npm modules and served from JSDelivr; if
// the package name matches the game slug, the canonical URL is right there.
async function searchJSDelivr(query, opts = {}) {
	const slugish = query.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
	if (!slugish) return [];
	const url = `https://data.jsdelivr.com/v1/search?query=${encodeURIComponent(slugish)}&limit=10`;
	try {
		const r = await httpsGet(url, {
			headers: { 'Accept': 'application/json' },
			timeoutMs: opts.timeoutMs,
		});
		if (!r || r.status !== 200) return [];
		const data = JSON.parse(r.body);
		const items = Array.isArray(data && data.results) ? data.results : [];
		return items.slice(0, 15).map((it) => ({
			// Canonical play URL: latest version's index.html, served via the
			// CDN. Works for most game packages that bundle a static entry.
			url: `https://cdn.jsdelivr.net/npm/${it.name}/index.html`,
			title: (it.name || '').slice(0, 240),
			snippet: (it.description || '').slice(0, 320),
			source: 'jsdelivr',
		})).filter((x) => x.title);
	} catch { return []; }
}

// ----- Itch.io (indie HTML5 builds) ----------------------------------------
// Many indie HTML5 games have an official itch.io page with a /play/<slug>
// URL or an embed iframe. The legacy site search returns ranked matches.
async function searchItch(query, opts = {}) {
	const url = `https://itch.io/search?q=${encodeURIComponent(query)}&classification=game`;
	try {
		const r = await httpsGet(url, { timeoutMs: opts.timeoutMs });
		if (!r || r.status !== 200) return [];
		// Itch search markup: <a class="title game_link" href="https://...">
		const out = [];
		const re = /<a[^>]+class="[^"]*\bgame_link\b[^"]*"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
		let m;
		while ((m = re.exec(r.body)) !== null) {
			let href = m[1];
			if (!/^https?:\/\//.test(href)) {
				if (href.startsWith('//')) href = 'https:' + href;
				else if (href.startsWith('/')) href = 'https://itch.io' + href;
				else continue;
			}
			out.push({
				url: href,
				title: stripTags(m[2]).slice(0, 240),
				snippet: '',
				source: 'itch',
			});
			if (out.length >= 20) break;
		}
		return out;
	} catch { return []; }
}

// ----- Public API -----------------------------------------------------------
function buildQueries(name, type) {
	const variants = new Set();
	if (!name) return [];
	const base = name.replace(/[_-]+/g, ' ').trim();
	const quoted = `"${base}"`;

	// Generic intent queries — most portals show up under these
	variants.add(`${base} unblocked`);
	variants.add(`${base} play online free`);
	variants.add(`${base} html5 game`);
	variants.add(`${base} browser game`);
	variants.add(`${quoted} play free`);

	// Portal-specific site: queries (high signal, cheap)
	variants.add(`${quoted} site:3kh0.github.io`);
	variants.add(`${quoted} site:kbhgames.com`);
	variants.add(`${quoted} site:crazygames.com`);
	variants.add(`${quoted} site:poki.com`);
	variants.add(`${quoted} site:y8.com`);
	variants.add(`${quoted} site:html5games.com`);

	if (type === 'webgl' || !type) {
		variants.add(`${base} webgl`);
		variants.add(`${base} unity webgl play`);
	}
	if (type === 'flash') {
		variants.add(`${base} swf flash`);
		variants.add(`${quoted} site:flashpointarchive.org`);
		variants.add(`${quoted} ruffle swf`);
		variants.add(`${quoted} flash game archive`);
	}
	if (type === 'gba' || type === 'retro') {
		variants.add(`${base} gba rom download`);
		variants.add(`${quoted} site:vimm.net`);
		variants.add(`${base} game boy advance rom`);
	}
	if (type === 'snes') {
		variants.add(`${base} snes rom download`);
		variants.add(`${quoted} site:vimm.net`);
		variants.add(`${base} super nintendo rom`);
	}
	if (type === 'nes') {
		variants.add(`${base} nes rom download`);
		variants.add(`${base} nintendo entertainment system rom`);
	}

	// GitHub Code Search — often surfaces forks of HTML5 / unblocked-portal repos
	variants.add(`${quoted} site:github.com`);
	variants.add(`${quoted} site:github.io`);

	// Archive.org — Flashpoint + old game pages
	variants.add(`${quoted} site:archive.org`);

	// Cap at 18 — DDG + Bing + Brave hit every variant in parallel.
	return Array.from(variants).slice(0, 18);
}

// Fuzzy query expansion — used as a fallback when buildQueries() returns
// zero validated candidates. Goes broader: drops the strict "unblocked"
// qualifier, accepts more terms in the URL path, and tries hostnames
// where games are typically rehosted (github.io forks, archive.org
// snapshots, itch.io builds, jsdelivr-cached npm packages).
//
// Caller is responsible for canonicalizing the name BEFORE passing it
// here (use atomic-swap.js#normalizeName). Variants returned still need
// to clear the fuzzy similarity threshold downstream.
function buildFuzzyQueries(normalizedName, type) {
	const variants = new Set();
	if (!normalizedName) return [];
	const base = normalizedName.replace(/[_-]+/g, ' ').trim();
	if (!base) return [];

	// Six broader variants per the plan.
	variants.add(`${base}`);
	variants.add(`${base} html5`);
	variants.add(`${base} unblocked`);
	variants.add(`${base} site:github.io`);
	variants.add(`${base} site:archive.org`);
	variants.add(`${base} port`);

	// Type-aware fuzzy extras — broader than buildQueries equivalents.
	if (type === 'webgl' || !type) {
		variants.add(`${base} webgl free`);
		variants.add(`${base} browser`);
		variants.add(`${base} site:itch.io`);
	}
	if (type === 'flash') {
		variants.add(`${base} swf`);
		variants.add(`${base} flashpoint`);
	}
	if (type === 'gba' || type === 'snes' || type === 'nes' || type === 'retro') {
		variants.add(`${base} rom`);
		variants.add(`${base} site:vimm.net`);
	}

	return Array.from(variants).slice(0, 18);
}

async function discoverCandidates({ name, type } = {}, opts = {}) {
	// opts.fuzzy: when true, use buildFuzzyQueries instead of buildQueries.
	// Caller passes the already-normalized name in that case. Backends are
	// the same — only the query phrasing differs.
	const queries = opts.fuzzy
		? buildFuzzyQueries(name, type)
		: buildQueries(name, type);
	if (!queries.length) return [];

	// Portal probing — direct URL HEAD requests against curated unblocked-games
	// portals (3kh0, classroom6x, tbg95, kbhgames, hoodamath, …). Deterministic
	// and not subject to DDG/Bing rate limits, so a working copy on a known
	// portal becomes a high-priority candidate even when search backends
	// return zero hits. Only runs on the exact pass to avoid wasting requests
	// on the fuzzy pass (which uses a normalized query that already differs
	// from the slug a portal URL would use).
	const portalHits = [];
	if (!opts.fuzzy && !opts.skipPortalProbe) {
		try {
			const { probePortals } = require('./portal-probe');
			const hits = await probePortals(name, {
				timeoutMs: Math.min(opts.timeoutMs || DEFAULT_TIMEOUT_MS, 4000),
				verbose: opts.verbose,
			});
			for (const h of hits) portalHits.push(h);
			if (opts.verbose) console.log(`  portal-probe: ${portalHits.length} hit(s)`);
		} catch (e) {
			if (opts.verbose) console.log(`  portal-probe error: ${e.message}`);
		}
	}

	const timeoutMs = opts.timeoutMs || DEFAULT_TIMEOUT_MS;
	const tasks = [];
	for (const q of queries) {
		tasks.push(searchDuckDuckGo(q, { timeoutMs }));
		tasks.push(searchBing(q, { timeoutMs }));
		tasks.push(searchBrave(q, { timeoutMs }));
		// Searx + Mojeek + Yandex surface results DDG/Bing miss. Run them
		// per-query since their indexes are independent. opt-out via
		// opts.skipMetaSearx / skipMojeek / skipYandex when instances are
		// down.
		if (!opts.skipMetaSearx) tasks.push(searchSearx(q, { timeoutMs }));
		if (!opts.skipMojeek) tasks.push(searchMojeek(q, { timeoutMs }));
		if (!opts.skipYandex) tasks.push(searchYandex(q, { timeoutMs }));
	}
	// Base-name-only backends to conserve API quota / avoid rate limits.
	tasks.push(searchGithubCode(name, { timeoutMs }));
	tasks.push(searchGithubRepos(name, { timeoutMs }));
	tasks.push(searchWayback(name, { timeoutMs }));
	tasks.push(searchWaybackDeep(name, { timeoutMs }));
	// Itch.io + JSDelivr are package/portal-specific — single-query suffices.
	tasks.push(searchItch(name, { timeoutMs }));
	tasks.push(searchJSDelivr(name, { timeoutMs }));

	const settled = await Promise.allSettled(tasks);
	const all = [];
	// Portal hits go first so they dedupe-win against any search-engine hit
	// of the same URL (preserving the portal_host metadata and slightly
	// higher score from portal-probe).
	for (const h of portalHits) all.push(h);
	for (const s of settled) {
		if (s.status === 'fulfilled' && Array.isArray(s.value)) all.push(...s.value);
	}
	// Tag each hit with match_type so downstream gates know to apply the
	// nameSimilarity >= 0.55 threshold before scraping. Portal hits already
	// set match_type='exact' but the iteration below idempotently re-confirms.
	for (const h of all) {
		if (!h.url) continue;
		const match = h.url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw|tree)\/[^/]+\/(.+)$/i);
		if (match) {
			h.url = `https://${match[1].toLowerCase()}.github.io/${match[2]}/${match[3]}`;
		}
	}
	const out = dedupeBy(all, (x) => x.url);
	if (opts.fuzzy) for (const h of out) h.match_type = 'fuzzy';
	else for (const h of out) { if (!h.match_type) h.match_type = 'exact'; }
	return out;
}

module.exports = {
	discoverCandidates,
	buildQueries,
	buildFuzzyQueries,
	searchDuckDuckGo,
	searchBing,
	searchBrave,
	searchGithubCode,
	searchGithubRepos,
	searchWayback,
	searchWaybackDeep,
	searchSearx,
	searchMojeek,
	searchYandex,
	searchJSDelivr,
	searchItch,
};
