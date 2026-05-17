// scripts/recovery/portal-probe.js
//
// Probes a curated list of known unblocked-games portals with direct URL
// templates rendered from a slug/name. Each template is HEAD-probed in
// parallel; 200 responses with text/html become high-priority exact
// candidates that bypass the DDG/Bing/Brave search-engine fan-out (which is
// frequently rate-limited and the silent reason recovery "doesn't find
// anything" for games that obviously exist on the open web).
//
// Public API:
//   probePortals(displayName, opts) -> Promise<Array<{
//     url, source, title, snippet, score, match_type
//   }>>
//   loadPortalTemplates() -> { portals: [...] }
//
// opts:
//   timeoutMs        per-request timeout (default 3000)
//   userAgent        override the spoofed User-Agent
//   skipHosts        Set<string> of hosts to skip (e.g. previously failed)
//   verbose          log each probe outcome

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const { normalizeName } = require('./atomic-swap');

const TEMPLATES_PATH = path.join(__dirname, 'portal-templates.json');

const DEFAULT_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const DEFAULT_TIMEOUT_MS = 3000;
const MAX_REDIRECTS = 3;

let _templatesCache = null;

function loadPortalTemplates() {
	if (_templatesCache) return _templatesCache;
	try {
		const raw = JSON.parse(fs.readFileSync(TEMPLATES_PATH, 'utf-8'));
		if (raw && Array.isArray(raw.portals)) {
			_templatesCache = raw;
			return _templatesCache;
		}
	} catch (e) {
		// Not fatal — recovery degrades to search-engine fan-out only.
		console.warn(`portal-probe: could not load ${TEMPLATES_PATH}: ${e.message}`);
	}
	_templatesCache = { schema: 1, portals: [] };
	return _templatesCache;
}

// Slug variants used to fill template placeholders. Mirrors what real
// portal URLs look like across the field — some use "snake-eater", some
// "snakeeater", some "snake_eater".
function slugVariants(displayName) {
	const norm = normalizeName(displayName || '').trim();
	if (!norm) return null;
	const dash = norm.replace(/\s+/g, '-');
	const flat = norm.replace(/\s+/g, '');
	const underscore = norm.replace(/\s+/g, '_');
	return { slug: dash, slugDash: dash, slugFlat: flat, slugUnder: underscore };
}

function renderTemplate(tpl, vars) {
	return tpl.replace(/\{(slug|slugDash|slugFlat|slugUnder)\}/g, (_, key) => {
		const v = vars[key];
		return v === undefined || v === null ? '' : encodeURIComponent(v).replace(/%20/g, '-');
	});
}

// HEAD probe with a fallback to GET (some hosts return 405 on HEAD).
function probeUrl(url, opts) {
	const timeoutMs = opts.timeoutMs || DEFAULT_TIMEOUT_MS;
	const userAgent = opts.userAgent || DEFAULT_UA;
	return new Promise((resolve) => {
		let parsed;
		try { parsed = new URL(url); } catch { return resolve({ url, ok: false, reason: 'bad_url' }); }
		const lib = parsed.protocol === 'http:' ? http : https;
		const doRequest = (method, urlObj, redirectsLeft) => {
			const req = lib.request(
				{
					method,
					hostname: urlObj.hostname,
					path: urlObj.pathname + urlObj.search,
					port: urlObj.port || (urlObj.protocol === 'http:' ? 80 : 443),
					headers: {
						'User-Agent': userAgent,
						'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
						'Accept-Language': 'en-US,en;q=0.9',
					},
					timeout: timeoutMs,
				},
				(res) => {
					// Follow up to MAX_REDIRECTS redirects.
					if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
						let next;
						try { next = new URL(res.headers.location, urlObj); } catch {
							return resolve({ url, ok: false, status: res.statusCode, reason: 'bad_redirect' });
						}
						res.resume();
						return doRequest(method, next, redirectsLeft - 1);
					}
					if (method === 'HEAD' && res.statusCode === 405) {
						res.resume();
						return doRequest('GET', urlObj, redirectsLeft);
					}
					const status = res.statusCode;
					const ctype = String(res.headers['content-type'] || '').toLowerCase();
					const isHtml = ctype.includes('text/html') || ctype.includes('application/xhtml');
					res.resume();
					const finalUrl = urlObj.toString();
					if (status === 200 && isHtml) {
						resolve({ url: finalUrl, ok: true, status, contentType: ctype });
					} else {
						resolve({ url: finalUrl, ok: false, status, contentType: ctype, reason: status === 200 ? 'not_html' : 'bad_status' });
					}
				},
			);
			req.on('timeout', () => {
				try { req.destroy(new Error('timeout')); } catch {}
			});
			req.on('error', (err) => {
				resolve({ url: urlObj.toString(), ok: false, reason: `error:${err.code || err.message}` });
			});
			req.end();
		};
		doRequest('HEAD', parsed, MAX_REDIRECTS);
	});
}

async function probePortals(displayName, opts = {}) {
	const vars = slugVariants(displayName);
	if (!vars) return [];
	const tpls = loadPortalTemplates();
	const skipHosts = opts.skipHosts instanceof Set ? opts.skipHosts : new Set(opts.skipHosts || []);
	const tasks = [];
	for (const portal of tpls.portals || []) {
		if (!portal || !portal.host || !Array.isArray(portal.templates)) continue;
		if (skipHosts.has(portal.host)) continue;
		const score = Number.isFinite(portal.score) ? portal.score : 50;
		const seen = new Set();
		for (const tpl of portal.templates) {
			const url = renderTemplate(tpl, vars);
			if (!url || seen.has(url)) continue;
			seen.add(url);
			tasks.push(
				probeUrl(url, opts).then((r) => ({ ...r, portal: portal.host, score })),
			);
		}
	}
	const settled = await Promise.allSettled(tasks);
	const hits = [];
	for (const s of settled) {
		if (s.status !== 'fulfilled') continue;
		const r = s.value;
		if (opts.verbose) {
			const tag = r.ok ? `200 ${r.contentType || ''}` : (r.reason || `status=${r.status}`);
			console.log(`  portal-probe ${r.portal || '?'}: ${r.url} → ${tag}`);
		}
		if (!r.ok) continue;
		// Bump score slightly so portal hits outrank similarly-scored search hits.
		hits.push({
			url: r.url,
			source: 'portal-template',
			title: `[portal:${r.portal}] ${displayName}`,
			snippet: '',
			score: (r.score || 50) + 5,
			match_type: 'exact',
			portal_host: r.portal,
		});
	}
	// De-dup by URL (preserve order so the first portal hit wins).
	const seen = new Set();
	const out = [];
	for (const h of hits) {
		if (seen.has(h.url)) continue;
		seen.add(h.url);
		out.push(h);
	}
	return out;
}

module.exports = { probePortals, loadPortalTemplates, slugVariants, renderTemplate };
