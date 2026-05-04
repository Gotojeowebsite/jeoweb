#!/usr/bin/env node
// Static health signal: cheap, deterministic, runs on every push.
// For each Assets/<slug>/ folder, check that the entry HTML's referenced
// scripts/styles/runtime files exist on disk and that no obvious bug strings
// (literal "undefined" in src) are present. Writes static_health.json.
//
// Verdict per game: "pass" | "fail" | "warn"
//   fail = a critical local file referenced from HTML doesn't exist, or
//          /undefined/ appears in a src/href, or the engine signature has
//          its required runtime file missing (Unity .data, Ruffle build,
//          EmulatorJS core).
//   warn = optional/non-runtime miss (image, missing favicon, etc.)
//   pass = everything we can statically prove is in order.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const OUTFILE = path.join(ROOT, 'static_health.json');

const CRITICAL_EXT = new Set(['.js', '.mjs', '.wasm', '.data', '.unityweb', '.pck', '.swf', '.bin', '.pak', '.mem']);
const WARN_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.mp3', '.ogg', '.wav', '.css']);

const SRC_HREF_RE = /\b(?:src|href|data-src)\s*=\s*["']([^"'#?]+)(?:[?#][^"']*)?["']/gi;
const CSS_URL_RE = /url\(\s*["']?([^)"'#?]+)(?:[?#][^)"']*)?["']?\s*\)/gi;
const UNDEFINED_PATH_RE = /\/undefined(?:\/|\.)/i;
const NULL_PATH_RE = /\/null(?:\/|\.)/i;

// Mirror of IGNORED_LOCAL_404_PATTERNS in broken_game_scanner.py — these are
// portal-leftover references (favicons, master site js/css, source maps, etc.)
// that the games can lose without breaking. A static check should ignore them
// the same way the runtime check does, otherwise we get false fail verdicts on
// games that play fine. Paths matched are *resolved-from-root*, normalized to
// forward slashes and lowercased.
const IGNORED_REF_PATTERNS = [
	/\/favicon\.ico$/i,
	/\.map$/i,
	/^\/?js\/main\.js$/i,
	/^\/?css\/main\.css$/i,
	/^\/?assets\/scripts\/game\.js$/i,
	/^\/?assets\/promo\/promo\.js$/i,
	/^\/?cdn-cgi\//i,
	/\/_external_mirror\//i,
	/\/_snapshot_mirror\//i,
];

function isIgnoredRef(absPath) {
	const norm = String(absPath || '').replace(/\\/g, '/').toLowerCase();
	for (const re of IGNORED_REF_PATTERNS) if (re.test(norm)) return true;
	return false;
}

// Hosts that are safe to depend on externally — analytics, fonts, ad/consent
// SDKs, CDN delivery of common JS libs. Games using ONLY these external refs
// still play offline (the request 404s harmlessly). Anything not in this set
// is treated as a real runtime dependency that breaks the local copy.
const OPTIONAL_EXTERNAL_HOST_PATTERNS = [
	/(?:^|\.)googletagmanager\.com$/i,
	/(?:^|\.)google-analytics\.com$/i,
	/(?:^|\.)googleadservices\.com$/i,
	/(?:^|\.)googlesyndication\.com$/i,
	/(?:^|\.)doubleclick\.net$/i,
	/(?:^|\.)fonts\.googleapis\.com$/i,
	/(?:^|\.)fonts\.gstatic\.com$/i,
	/(?:^|\.)gstatic\.com$/i,
	/(?:^|\.)googleapis\.com$/i,
	/(?:^|\.)cloudflareinsights\.com$/i,
	/(?:^|\.)cdn-cgi$/i,
	/(?:^|\.)cmp\.gatekeeperconsent\.com$/i,
	/(?:^|\.)gatekeeperconsent\.com$/i,
	/(?:^|\.)ezojs\.com$/i,
	/(?:^|\.)ezoicanalytics\.com$/i,
	/(?:^|\.)ezoic\.net$/i,
	/(?:^|\.)cdnjs\.cloudflare\.com$/i,
	/(?:^|\.)jsdelivr\.net$/i,
	/(?:^|\.)unpkg\.com$/i,
	/(?:^|\.)ajax\.googleapis\.com$/i,
];

function isOptionalExternalHost(host) {
	if (!host) return false;
	for (const re of OPTIONAL_EXTERNAL_HOST_PATTERNS) if (re.test(host)) return true;
	return false;
}

function externalHostFromUrl(u) {
	if (!u) return null;
	if (u.startsWith('//')) u = 'https:' + u;
	let parsed;
	try { parsed = new URL(u); } catch { return null; }
	if (!/^https?:$/.test(parsed.protocol)) return null;
	return parsed.hostname.toLowerCase();
}

function isExternalUrl(u) {
	return /^(?:[a-z]+:)?\/\//i.test(u) || u.startsWith('data:') || u.startsWith('blob:') || u.startsWith('javascript:') || u.startsWith('#') || u.startsWith('mailto:');
}

function resolveLocal(htmlDir, gameDir, ref) {
	// Strip query/hash already, but be defensive.
	let clean = ref.split('#')[0].split('?')[0];
	if (!clean) return null;
	if (clean.startsWith('/')) {
		// Site-absolute. Try project root first, then the game's own folder
		// (many imported games were authored as standalone sites and use
		// "/foo.js" expecting to live at the document root). Returning an
		// array lets the caller treat any of these existing as a hit.
		const trimmed = clean.replace(/^\/+/, '');
		return [
			path.join(ROOT, trimmed),
			path.join(gameDir, trimmed),
		];
	}
	return [path.join(htmlDir, clean)];
}

function readSafe(p) {
	try { return fs.readFileSync(p, 'utf-8'); } catch { return ''; }
}

function findFirstHtml(folder) {
	const idx = path.join(folder, 'index.html');
	if (fs.existsSync(idx)) return idx;
	try {
		const direct = fs.readdirSync(folder).filter(f => f.toLowerCase().endsWith('.html'));
		if (direct.length) return path.join(folder, direct.sort()[0]);
	} catch {}
	return null;
}

function detectEngine(htmlText, folder) {
	// Returns one of: 'unity', 'ruffle', 'emulatorjs', 'godot', 'flash', 'webgl', 'html5'.
	const t = htmlText.toLowerCase();
	if (/createunityinstance|unityloader|unity\.loader\.js|unity-canvas/.test(t)) return 'unity';
	if (/ruffle\.newest\(\)|window\.ruffleplayer|ruffle-player|ruffle-embed/.test(t)) return 'ruffle';
	if (/ejs_pathtodata|ejs_player|ejs_core|emulatorjs/.test(t)) return 'emulatorjs';
	if (/godot|engine\.startgame/.test(t)) return 'godot';
	// Look at folder for a swf as a fallback.
	try {
		const stack = [folder];
		while (stack.length) {
			const cur = stack.pop();
			for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
				const p = path.join(cur, ent.name);
				if (ent.isDirectory()) { stack.push(p); continue; }
				const ext = path.extname(ent.name).toLowerCase();
				if (ext === '.swf') return 'flash';
			}
		}
	} catch {}
	return 'html5';
}

function checkEngineRuntime(engine, folder) {
	// Returns null if engine looks complete; otherwise an issue object.
	const walk = (predicate) => {
		const stack = [folder];
		while (stack.length) {
			const cur = stack.pop();
			let entries;
			try { entries = fs.readdirSync(cur, { withFileTypes: true }); } catch { continue; }
			for (const ent of entries) {
				const p = path.join(cur, ent.name);
				if (ent.isDirectory()) { stack.push(p); continue; }
				if (predicate(p, ent.name)) return p;
			}
		}
		return null;
	};
	if (engine === 'unity') {
		// Unity payloads are commonly served compressed with Cloudflare/Vercel/etc.,
		// either as .data.gz / .wasm.gz / .data.br / .wasm.br or as .unityweb.
		const data = walk((_, n) => /\.(data|unityweb)(\.(gz|br))?$/i.test(n));
		const wasm = walk((_, n) => /\.(wasm|unityweb)(\.(gz|br))?$/i.test(n));
		if (!data) return { code: 'UNITY_MISSING_DATA', message: 'Unity build is missing the .data/.unityweb payload' };
		if (!wasm) return { code: 'UNITY_MISSING_WASM', message: 'Unity build is missing the .wasm/.unityweb runtime' };
	}
	if (engine === 'ruffle' || engine === 'flash') {
		const swf = walk((_, n) => /\.swf$/i.test(n));
		if (!swf) {
			const code = engine === 'ruffle' ? 'RUFFLE_MISSING_SWF' : 'FLASH_MISSING_SWF';
			return { code, message: `${engine} game folder is missing a .swf file` };
		}
	}
	if (engine === 'emulatorjs') {
		// EJS core is loaded at runtime from /emulatorjs/, so we only check that the host has the EJS bootstrap.
		const ejs = path.join(ROOT, 'emulatorjs');
		if (!fs.existsSync(ejs)) return { code: 'EJS_HOST_MISSING', message: 'EmulatorJS host folder /emulatorjs/ not found' };
	}
	return null;
}

function scanGame(slug) {
	const folder = path.join(ASSETS_DIR, slug);
	const html = findFirstHtml(folder);
	const issues = [];
	if (!html) {
		return {
			slug,
			verdict: 'fail',
			engine: 'unknown',
			issues: [{ code: 'NO_HTML', message: 'No HTML entry file found', severity: 'critical' }],
			refs_checked: 0,
		};
	}
	const htmlDir = path.dirname(html);
	const text = readSafe(html);
	const engine = detectEngine(text, folder);

	// Check engine runtime presence.
	const engineIssue = checkEngineRuntime(engine, folder);
	if (engineIssue) issues.push({ ...engineIssue, severity: 'critical' });

	// Walk every src/href reference in HTML and follow .css files one level deep.
	const refs = new Set();
	let m;
	const collect = (text) => {
		SRC_HREF_RE.lastIndex = 0;
		while ((m = SRC_HREF_RE.exec(text)) !== null) refs.add(m[1]);
		CSS_URL_RE.lastIndex = 0;
		while ((m = CSS_URL_RE.exec(text)) !== null) refs.add(m[1]);
	};
	collect(text);

	// Detect literal "undefined"/"null" in src strings — symptom of a broken game build.
	for (const ref of refs) {
		if (UNDEFINED_PATH_RE.test(ref)) {
			issues.push({
				code: 'SRC_LITERAL_UNDEFINED',
				message: `Reference contains literal "undefined": ${ref}`,
				severity: 'critical',
				ref,
			});
		}
		if (NULL_PATH_RE.test(ref)) {
			issues.push({
				code: 'SRC_LITERAL_NULL',
				message: `Reference contains literal "null": ${ref}`,
				severity: 'critical',
				ref,
			});
		}
	}

	// Resolve each ref. External URLs counted; runtime-critical externals
	// (script/iframe src to a non-allowlisted host) are flagged as issues so
	// the verdict can mark the game broken in strict mode.
	let externalCount = 0;
	let externalCriticalCount = 0;
	let critMisses = 0;
	let warnMisses = 0;
	const cssToFollow = [];
	const seenExternalCritical = new Set();
	for (const ref of refs) {
		if (isExternalUrl(ref)) {
			externalCount += 1;
			const host = externalHostFromUrl(ref);
			if (host && !isOptionalExternalHost(host) && !seenExternalCritical.has(host)) {
				seenExternalCritical.add(host);
				externalCriticalCount += 1;
				issues.push({
					code: 'EXTERNAL_RUNTIME_DEP',
					message: `Game depends on external host: ${host}`,
					severity: 'warning',
					ref,
					host,
				});
			}
			continue;
		}
		const candidates = resolveLocal(htmlDir, folder, ref);
		if (!candidates || !candidates.length) continue;
		// Stay within the project root — don't try to resolve odd paths.
		const safe = candidates.filter(p => p.startsWith(ROOT));
		if (!safe.length) continue;
		// Pass if ANY of the resolved candidates exists on disk; many imported
		// games use site-absolute paths that work as either project-root or
		// game-folder relative.
		const found = safe.find(p => fs.existsSync(p));
		const ext = path.extname(safe[0]).toLowerCase();
		if (!found) {
			const rootRel = '/' + path.relative(ROOT, safe[0]).replace(/\\/g, '/');
			if (isIgnoredRef(rootRel) || isIgnoredRef(ref)) continue;
			if (CRITICAL_EXT.has(ext)) {
				critMisses += 1;
				issues.push({
					code: 'MISSING_CRITICAL_FILE',
					message: `Critical local file referenced but missing: ${ref}`,
					severity: 'critical',
					ref,
				});
			} else if (WARN_EXT.has(ext)) {
				warnMisses += 1;
				issues.push({
					code: 'MISSING_OPTIONAL_FILE',
					message: `Optional local file missing: ${ref}`,
					severity: 'warning',
					ref,
				});
			} else {
				warnMisses += 1;
				issues.push({
					code: 'MISSING_FILE',
					message: `Local file missing: ${ref}`,
					severity: 'warning',
					ref,
				});
			}
			continue;
		}
		if (ext === '.css' && cssToFollow.length < 8) cssToFollow.push(found);
	}

	// Follow a few CSS files for url(...) references; missing fonts/images downgrade only.
	for (const cssPath of cssToFollow) {
		const cssText = readSafe(cssPath);
		const innerRefs = new Set();
		CSS_URL_RE.lastIndex = 0;
		while ((m = CSS_URL_RE.exec(cssText)) !== null) innerRefs.add(m[1]);
		for (const ref of innerRefs) {
			if (isExternalUrl(ref)) continue;
			const local = path.join(path.dirname(cssPath), ref.split('#')[0].split('?')[0]);
			if (!fs.existsSync(local)) {
				warnMisses += 1;
				issues.push({
					code: 'MISSING_CSS_ASSET',
					message: `CSS-referenced asset missing: ${ref}`,
					severity: 'warning',
					ref,
				});
			}
		}
	}

	// Compute verdict.
	const hasCritical = issues.some(i => i.severity === 'critical');
	let verdict;
	if (hasCritical) verdict = 'fail';
	else if (warnMisses > 0 || externalCriticalCount > 0) verdict = 'warn';
	else verdict = 'pass';

	return {
		slug,
		verdict,
		engine,
		entry_file: path.relative(folder, html).replace(/\\/g, '/'),
		issues,
		refs_checked: refs.size,
		external_refs: externalCount,
		external_critical: externalCriticalCount,
		critical_misses: critMisses,
		warning_misses: warnMisses,
	};
}

function main() {
	if (!fs.existsSync(ASSETS_DIR)) {
		console.error('Assets folder not found:', ASSETS_DIR);
		process.exit(2);
	}
	const slugs = fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
		.filter(d => d.isDirectory())
		.map(d => d.name)
		.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

	const results = [];
	let pass = 0, warn = 0, fail = 0;
	for (const slug of slugs) {
		const r = scanGame(slug);
		results.push(r);
		if (r.verdict === 'pass') pass += 1;
		else if (r.verdict === 'warn') warn += 1;
		else fail += 1;
	}

	const payload = {
		schema: 1,
		generated_at: Math.floor(Date.now() / 1000),
		generator: 'static-health-scan',
		counts: { pass, warn, fail, total: results.length },
		games: results,
	};
	fs.writeFileSync(OUTFILE, JSON.stringify(payload, null, 2));
	console.log(`static-health-scan: ${results.length} games scanned (pass=${pass} warn=${warn} fail=${fail})`);
	console.log(`wrote ${path.relative(ROOT, OUTFILE)}`);
}

// Run only when invoked as CLI; tools that require() this module just want
// scanGame(slug) without writing the global JSON file.
if (require.main === module) {
	main();
}

module.exports = { scanGame };
