#!/usr/bin/env node
/**
 * Post-build route reachability check. Reads every non-dynamic page in
 * src/pages/ and asserts the corresponding dist/<route>/index.html
 * exists (or dist/<route>.<ext> for endpoints like /feed.xml).
 *
 * The build itself reports per-route output, but it doesn't fail when
 * a page silently goes missing — e.g. someone deletes a route but
 * forgets to drop the navigation link. This is the regression guard.
 *
 * Dynamic routes (`[slug].astro`, `[…].astro`) are sampled by counting
 * generated files; we don't enumerate every game route here, that's
 * what verify-catalog-parity.mjs is for.
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const ROOT = resolve(process.argv[1], '..', '..');
const SRC_PAGES = resolve(ROOT, 'src/pages');
const DIST = resolve(ROOT, 'dist');

if (!existsSync(DIST)) {
	console.error('::error::verify-routes: dist/ missing — run astro build first.');
	process.exit(1);
}

function walk(dir, base = '') {
	const out = [];
	for (const entry of readdirSync(dir)) {
		const abs = resolve(dir, entry);
		const rel = base ? `${base}/${entry}` : entry;
		if (statSync(abs).isDirectory()) {
			out.push(...walk(abs, rel));
		} else if (/\.(astro|md|mdx|ts|js)$/.test(entry)) {
			out.push(rel);
		}
	}
	return out;
}

const pages = walk(SRC_PAGES);
const missing = [];
const ok = [];

for (const p of pages) {
	// Skip dynamic routes — covered by catalog parity check.
	if (p.includes('[')) continue;
	// Skip Astro internals that aren't pages (none currently, but defensive).
	if (p.startsWith('_')) continue;

	// Map src/pages path to expected dist path.
	// index.astro       → dist/index.html
	// faq.astro         → dist/faq/index.html (Astro pretty URLs)
	// feed.xml.ts       → dist/feed.xml
	// legal/dmca.md     → dist/legal/dmca/index.html
	let expected;
	if (/\.(astro|md|mdx)$/.test(p)) {
		const route = p.replace(/\.(astro|md|mdx)$/, '');
		if (route === 'index') expected = 'index.html';
		// Astro emits the error page as 404.html, not 404/index.html.
		else if (route === '404') expected = '404.html';
		else if (route.endsWith('/index')) expected = route.replace(/\/index$/, '/index.html');
		else expected = `${route}/index.html`;
	} else if (/\.xml\.(ts|js)$/.test(p)) {
		expected = p.replace(/\.(ts|js)$/, '');
	} else if (/\.json\.(ts|js)$/.test(p)) {
		expected = p.replace(/\.(ts|js)$/, '');
	} else {
		// Unknown endpoint shape — skip; only the strict shapes above are checked.
		continue;
	}

	const abs = resolve(DIST, expected);
	if (existsSync(abs)) ok.push({ src: p, out: expected });
	else missing.push({ src: p, expected });
}

console.log(`verify-routes: checked ${ok.length + missing.length} static routes (${ok.length} present, ${missing.length} missing)`);

if (missing.length) {
	console.error('::error::Routes missing from dist/:');
	for (const m of missing) console.error(`  - src/pages/${m.src} → dist/${m.expected} (NOT FOUND)`);
	process.exit(1);
}
