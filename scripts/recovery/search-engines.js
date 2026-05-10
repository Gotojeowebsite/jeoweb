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

// ----- Public API -----------------------------------------------------------
function buildQueries(name, type) {
	const variants = new Set();
	if (!name) return [];
	const base = name.replace(/[_-]+/g, ' ').trim();
	variants.add(`${base} unblocked`);
	variants.add(`${base} play online`);
	variants.add(`${base} html5 game`);
	if (type === 'webgl' || !type) variants.add(`${base} webgl`);
	if (type === 'flash') variants.add(`${base} swf flash`);
	if (type === 'retro' || type === 'gba') variants.add(`${base} gba rom`);
	if (type === 'snes') variants.add(`${base} snes rom`);
	if (type === 'nes') variants.add(`${base} nes rom`);
	variants.add(`"${base}" site:github.com`);
	return Array.from(variants).slice(0, 6);
}

async function discoverCandidates({ name, type } = {}, opts = {}) {
	const queries = buildQueries(name, type);
	if (!queries.length) return [];

	const timeoutMs = opts.timeoutMs || DEFAULT_TIMEOUT_MS;
	const tasks = [];
	for (const q of queries) {
		tasks.push(searchDuckDuckGo(q, { timeoutMs }));
		tasks.push(searchBing(q, { timeoutMs }));
		tasks.push(searchBrave(q, { timeoutMs }));
	}
	// GitHub code search and Wayback only on the base name to save quota.
	tasks.push(searchGithubCode(name, { timeoutMs }));
	tasks.push(searchWayback(name, { timeoutMs }));

	const settled = await Promise.allSettled(tasks);
	const all = [];
	for (const s of settled) {
		if (s.status === 'fulfilled' && Array.isArray(s.value)) all.push(...s.value);
	}
	return dedupeBy(all, x => x.url);
}

module.exports = {
	discoverCandidates,
	buildQueries,
	searchDuckDuckGo,
	searchBing,
	searchBrave,
	searchGithubCode,
	searchWayback,
};
