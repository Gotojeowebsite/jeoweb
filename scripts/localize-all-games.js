#!/usr/bin/env node
// Sweep every Assets/<slug>/ folder and:
//   1. Auto-inject /poki-offline-shim.js into any HTML that references PokiSDK
//      or poki.com but doesn't already load the shim.
//   2. Stub out non-essential runtime externals (analytics, ad networks) by
//      rewriting their <script src=...> to a 1-line offline shim file.
//   3. Re-build the offline manifest for any folder we touched.
//
// CLI:
//   node scripts/localize-all-games.js                # dry run
//   node scripts/localize-all-games.js --apply
//   node scripts/localize-all-games.js --slug 2048 --apply
//
// Output: reports/localize_summary.json with per-slug changes.

'use strict';

const fs = require('fs');
const path = require('path');
const { buildForSlug } = require('./build-offline-manifest');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const REPORTS_DIR = path.join(ROOT, 'reports');
const POKI_SHIM_PATH = '/poki-offline-shim.js';

// Hosts whose <script src="..."> should be stubbed out to avoid runtime
// failures when offline. None of these are required for gameplay.
const STUB_HOSTS = [
	'poki.com', 'cdn.poki.io', 'a.poki.io', 'cdn.poki.com', 'i.poki.io',
	'game-cdn.poki.com', 'static.poki.io', 'webgames.poki.com',
	'gamepush.com', 'cdn.gamepush.com',
	'gamemonetize.com', 'gamemonetize.co',
	'crazygames.com', 'cdn.crazygames.com',
	'kongregate.com', 'cdn1.kongregate.com',
	'plinkergames.com',
];

function parseArgs(argv) {
	const args = { apply: false, slug: null, verbose: false };
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--apply') args.apply = true;
		else if (a === '--slug') args.slug = argv[++i];
		else if (a === '--verbose' || a === '-v') args.verbose = true;
	}
	return args;
}

function listSlugs() {
	return fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
		.filter(d => d.isDirectory() && !d.name.startsWith('.'))
		.map(d => d.name).sort();
}

function findHtmls(folder) {
	const out = [];
	const stack = [folder];
	while (stack.length) {
		const cur = stack.pop();
		let entries;
		try { entries = fs.readdirSync(cur, { withFileTypes: true }); } catch { continue; }
		for (const ent of entries) {
			if (ent.name.startsWith('.')) continue;
			const p = path.join(cur, ent.name);
			if (ent.isDirectory()) stack.push(p);
			else if (ent.isFile() && /\.html?$/i.test(ent.name)) out.push(p);
		}
	}
	return out;
}

function injectPokiShim(html) {
	// Only inject when game actually references PokiSDK / poki.com but doesn't
	// already load the shim.
	const lower = html.toLowerCase();
	const needsShim = /pokisdk|poki\.com|poki\.io/.test(lower);
	const hasShim = lower.includes('poki-offline-shim.js');
	if (!needsShim || hasShim) return { html, changed: false };

	const headMatch = html.match(/<head[^>]*>/i);
	const tag = `<script src="${POKI_SHIM_PATH}"></script>`;
	if (headMatch) {
		const insertAt = headMatch.index + headMatch[0].length;
		return {
			html: html.slice(0, insertAt) + '\n' + tag + html.slice(insertAt),
			changed: true,
			action: 'injected_after_head',
		};
	}
	// No <head> — prepend the shim.
	return { html: tag + '\n' + html, changed: true, action: 'prepended' };
}

function hostMatches(url, hosts) {
	try {
		let u = url;
		if (u.startsWith('//')) u = 'https:' + u;
		const host = new URL(u).hostname.toLowerCase();
		for (const h of hosts) {
			if (host === h || host.endsWith('.' + h)) return true;
		}
	} catch {}
	return false;
}

function stubExternalScripts(html) {
	// Replace <script src="https://(stub-host)/..."></script> with a comment.
	// Keep the page parseable; don't try to rewrite inline scripts that USE the
	// SDK — the Poki shim handles those.
	let changed = 0;
	const out = html.replace(
		/<script\b([^>]*?)\bsrc\s*=\s*(["'])([^"']+)\2([^>]*)>\s*<\/script>/gi,
		(match, pre, q, src, post) => {
			if (hostMatches(src, STUB_HOSTS)) {
				changed += 1;
				return `<!-- jeoweb: stubbed external runtime dep src="${src}" -->`;
			}
			return match;
		}
	);
	return { html: out, changed };
}

function processGame(slug, args) {
	const folder = path.join(ASSETS_DIR, slug);
	const htmls = findHtmls(folder);
	const change = { slug, htmls_touched: 0, poki_injected: 0, external_stubbed: 0, manifest_rebuilt: false };

	for (const html of htmls) {
		let text;
		try { text = fs.readFileSync(html, 'utf-8'); } catch { continue; }
		const original = text;

		const inj = injectPokiShim(text);
		text = inj.html;
		if (inj.changed) change.poki_injected += 1;

		const stub = stubExternalScripts(text);
		text = stub.html;
		if (stub.changed) change.external_stubbed += stub.changed;

		if (text !== original) {
			change.htmls_touched += 1;
			if (args.apply) fs.writeFileSync(html, text);
			if (args.verbose) console.log(`  [${slug}] ${path.relative(folder, html)}: poki=${inj.changed?1:0} stubbed=${stub.changed}`);
		}
	}

	if (args.apply && change.htmls_touched > 0) {
		try { buildForSlug(slug, {}); change.manifest_rebuilt = true; }
		catch (e) { change.manifest_error = e.message; }
	}
	return change;
}

function main() {
	const args = parseArgs(process.argv);
	const slugs = args.slug ? [args.slug] : listSlugs();
	const results = [];
	for (const slug of slugs) {
		try { results.push(processGame(slug, args)); }
		catch (e) { results.push({ slug, error: e.message }); }
	}
	const totals = {
		slugs: results.length,
		touched: results.filter(r => r.htmls_touched > 0).length,
		poki_injected: results.reduce((a, r) => a + (r.poki_injected || 0), 0),
		external_stubbed: results.reduce((a, r) => a + (r.external_stubbed || 0), 0),
	};
	console.log(`localize-all-games: ${totals.slugs} games scanned${args.apply ? '' : ' (DRY RUN)'}`);
	console.log(`  htmls touched:  ${totals.touched}`);
	console.log(`  poki injected:  ${totals.poki_injected}`);
	console.log(`  ext stubbed:    ${totals.external_stubbed}`);

	if (args.apply) {
		try { fs.mkdirSync(REPORTS_DIR, { recursive: true }); } catch {}
		const outPath = path.join(REPORTS_DIR, 'localize_summary.json');
		fs.writeFileSync(outPath, JSON.stringify({
			schema: 1,
			generated_at: Math.floor(Date.now() / 1000),
			apply: true,
			totals,
			results,
		}, null, 2));
		console.log(`Summary written to ${path.relative(ROOT, outPath)}`);
	}
}

if (require.main === module) {
	try { main(); }
	catch (e) { console.error(String(e && e.stack || e)); process.exit(1); }
}

module.exports = { processGame, injectPokiShim, stubExternalScripts };
