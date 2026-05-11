#!/usr/bin/env node
// Build per-game offline manifests at Assets/<slug>/.offline-manifest.json.
//
// A manifest lists every file the game needs to play offline and which of
// them are "required" (engine-critical). The companion script
// verify-offline-manifest.js gates CI on the presence + size of every
// required entry and on the absence of new external runtime deps.
//
// Schema 1:
//   {
//     "schema": 1,
//     "slug": "rocket-league",
//     "engine": "unity",
//     "entry": "index.html",
//     "generated_at": 1746825600,
//     "files": [
//       { "path": "index.html", "size": 12034, "required": true },
//       { "path": "Build/game.data.unityweb", "size": 41200000, "required": true }
//     ],
//     "external_allowlist": ["fonts.googleapis.com", ...]
//   }
//
// CLI:
//   node scripts/build-offline-manifest.js                # builds for every game
//   node scripts/build-offline-manifest.js --all
//   node scripts/build-offline-manifest.js --slug snake
//   node scripts/build-offline-manifest.js --root Assets/.recovery/<slug>-<ts>  # candidate folder
//   node scripts/build-offline-manifest.js --slug snake --strict-hash           # include sha256

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');

const SRC_HREF_RE = /\b(?:src|href|data-src|data-href)\s*=\s*["']([^"'#?]+)(?:[?#][^"']*)?["']/gi;
const CSS_URL_RE = /url\(\s*["']?([^)"'#?]+)(?:[?#][^)"']*)?["']?\s*\)/gi;
const IMPORT_RE = /\bimport\s*(?:[^'"`]*?from\s*)?["']([^"'#?]+)["']/gi;
const FETCH_RE = /\b(?:fetch|XMLHttpRequest\(\)\.open|loadJSON|loadScript|new\s+Image\(\)\.src\s*=|\.src\s*=|new\s+Audio\()\s*\(?\s*["']([^"'#?]+)["']/gi;

const ENGINE_REQUIRED_EXT = new Set(['.js', '.mjs', '.wasm', '.data', '.unityweb', '.pck', '.swf', '.pak', '.mem', '.bin']);
const RUNTIME_EXT = new Set(['.html', '.htm', '.js', '.mjs', '.wasm', '.data', '.unityweb', '.pck', '.swf', '.pak', '.mem', '.bin', '.css', '.json', '.cur', '.ttf', '.otf', '.woff', '.woff2', '.eot']);

// Hosts safe to depend on externally — mirrors static-health-scan.js so the
// verifier and the scanner agree about what counts as a "fully offline" game.
const ALLOWED_EXTERNAL_HOSTS = [
	'fonts.googleapis.com', 'fonts.gstatic.com', 'gstatic.com', 'googleapis.com',
	'ajax.googleapis.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'jsdelivr.net',
	'unpkg.com',
	'googletagmanager.com', 'google-analytics.com', 'doubleclick.net',
	'googleadservices.com', 'googlesyndication.com',
	'cloudflareinsights.com', 'cdn-cgi',
	'cmp.gatekeeperconsent.com', 'gatekeeperconsent.com',
	'ezojs.com', 'ezoicanalytics.com', 'ezoic.net',
];

function parseArgs(argv) {
	const args = { all: false, slug: null, root: null, strictHash: false, candidate: null };
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--all') args.all = true;
		else if (a === '--slug') args.slug = argv[++i];
		else if (a === '--root') args.root = path.resolve(argv[++i]);
		else if (a === '--candidate') args.candidate = path.resolve(argv[++i]);
		else if (a === '--strict-hash') args.strictHash = true;
	}
	if (!args.slug && !args.all && !args.root && !args.candidate) args.all = true;
	return args;
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

function walkFiles(root) {
	const out = [];
	const stack = [root];
	while (stack.length) {
		const cur = stack.pop();
		let entries;
		try { entries = fs.readdirSync(cur, { withFileTypes: true }); } catch { continue; }
		for (const ent of entries) {
			if (ent.name === '.offline-manifest.json') continue;
			if (ent.name.startsWith('.git')) continue;
			const p = path.join(cur, ent.name);
			if (ent.isDirectory()) { stack.push(p); continue; }
			if (ent.isFile()) out.push(p);
		}
	}
	return out;
}

function detectEngine(htmlText, folder) {
	const t = (htmlText || '').toLowerCase();
	if (/createunityinstance|unityloader|unity\.loader\.js|unity-canvas/.test(t)) return 'unity';
	if (/ruffle\.newest\(\)|window\.ruffleplayer|ruffle-player|ruffle-embed/.test(t)) return 'ruffle';
	if (/ejs_pathtodata|ejs_player|ejs_core|emulatorjs/.test(t)) return 'emulatorjs';
	if (/createcordovacontext|cordova|construct|c2runtime/.test(t)) return 'construct';
	if (/phaser/.test(t)) return 'phaser';
	if (/godot|engine\.startgame/.test(t)) return 'godot';
	try {
		for (const f of walkFiles(folder)) {
			const ext = path.extname(f).toLowerCase();
			if (ext === '.swf') return 'flash';
			if (ext === '.pck') return 'godot';
		}
	} catch {}
	return 'html5';
}

function readSafe(p) {
	try { return fs.readFileSync(p, 'utf-8'); } catch { return ''; }
}

function isExternalUrl(u) {
	return /^(?:[a-z]+:)?\/\//i.test(u) || u.startsWith('data:') || u.startsWith('blob:') || u.startsWith('javascript:') || u.startsWith('#') || u.startsWith('mailto:');
}

function externalHost(u) {
	if (!u) return null;
	if (u.startsWith('//')) u = 'https:' + u;
	try {
		const p = new URL(u);
		if (!/^https?:$/.test(p.protocol)) return null;
		return p.hostname.toLowerCase();
	} catch { return null; }
}

function hostMatchesAllowlist(host) {
	if (!host) return true;
	for (const allowed of ALLOWED_EXTERNAL_HOSTS) {
		if (host === allowed) return true;
		if (host.endsWith('.' + allowed)) return true;
	}
	return false;
}

function collectRefs(text) {
	const refs = new Set();
	if (!text) return refs;
	let m;
	SRC_HREF_RE.lastIndex = 0;
	while ((m = SRC_HREF_RE.exec(text)) !== null) refs.add(m[1]);
	CSS_URL_RE.lastIndex = 0;
	while ((m = CSS_URL_RE.exec(text)) !== null) refs.add(m[1]);
	IMPORT_RE.lastIndex = 0;
	while ((m = IMPORT_RE.exec(text)) !== null) refs.add(m[1]);
	FETCH_RE.lastIndex = 0;
	while ((m = FETCH_RE.exec(text)) !== null) refs.add(m[1]);
	return refs;
}

function resolveLocal(htmlDir, gameDir, ref) {
	const clean = ref.split('#')[0].split('?')[0];
	if (!clean) return [];
	if (clean.startsWith('/')) {
		const trimmed = clean.replace(/^\/+/, '');
		return [path.join(ROOT, trimmed), path.join(gameDir, trimmed)];
	}
	return [path.join(htmlDir, clean)];
}

function sha256File(p) {
	const h = crypto.createHash('sha256');
	const buf = fs.readFileSync(p);
	h.update(buf);
	return h.digest('hex');
}

function engineRequiredFiles(engine, files, folder) {
	const required = new Set();
	const isEjs = engine === 'emulatorjs';
	for (const f of files) {
		const rel = path.relative(folder, f).replace(/\\/g, '/');
		const ext = path.extname(f).toLowerCase();
		if (engine === 'unity' && /\.(data|wasm|unityweb)(\.(gz|br))?$/i.test(rel)) required.add(rel);
		if (engine === 'unity' && /loader\.js$|framework\.js$/i.test(rel)) required.add(rel);
		if (engine === 'flash' && ext === '.swf') required.add(rel);
		if (engine === 'ruffle' && ext === '.swf') required.add(rel);
		if (engine === 'godot' && (ext === '.pck' || /\.wasm$/i.test(rel))) required.add(rel);
		if (engine === 'phaser' && /\.(js|mjs)$/i.test(rel) && /(phaser|game|main)/i.test(rel)) required.add(rel);
		if (engine === 'construct' && /(c2runtime|c3runtime|data\.js)/i.test(rel)) required.add(rel);
		if (isEjs && /(rom|\.(nes|smc|sfc|gba|gbc|gb|n64|z64|nds|gen|md|smd|sms))$/i.test(rel)) required.add(rel);
	}
	return required;
}

function buildForFolder(folder, slug) {
	const html = findFirstHtml(folder);
	if (!html) {
		throw new Error(`No HTML entry found in ${folder}`);
	}
	const text = readSafe(html);
	const engine = detectEngine(text, folder);
	const allFiles = walkFiles(folder);

	// Walk first-level CSS / JS files for nested refs so the manifest
	// captures fonts and images reached via stylesheets.
	const refs = collectRefs(text);
	const cssOrJs = allFiles.filter(f => /\.(css|js|mjs)$/i.test(f)).slice(0, 24);
	for (const dep of cssOrJs) {
		for (const r of collectRefs(readSafe(dep))) refs.add(r);
	}

	const externalSet = new Set();
	const externalCritical = new Set();
	const referencedRel = new Set();
	for (const ref of refs) {
		if (isExternalUrl(ref)) {
			const host = externalHost(ref);
			if (host) {
				externalSet.add(host);
				if (!hostMatchesAllowlist(host)) externalCritical.add(host);
			}
			continue;
		}
		const candidates = resolveLocal(path.dirname(html), folder, ref);
		const found = candidates.find(p => fs.existsSync(p));
		if (found && found.startsWith(folder)) {
			referencedRel.add(path.relative(folder, found).replace(/\\/g, '/'));
		}
	}

	const requiredByEngine = engineRequiredFiles(engine, allFiles, folder);
	// Always treat the entry HTML as required.
	requiredByEngine.add(path.relative(folder, html).replace(/\\/g, '/'));

	const entries = allFiles
		.map(p => {
			const rel = path.relative(folder, p).replace(/\\/g, '/');
			const stat = fs.statSync(p);
			const ext = path.extname(p).toLowerCase();
			const required = requiredByEngine.has(rel)
				|| (referencedRel.has(rel) && RUNTIME_EXT.has(ext))
				|| ENGINE_REQUIRED_EXT.has(ext);
			const entry = { path: rel, size: stat.size, required };
			return entry;
		})
		.sort((a, b) => a.path.localeCompare(b.path));

	return {
		schema: 1,
		slug,
		engine,
		entry: path.relative(folder, html).replace(/\\/g, '/'),
		generated_at: Math.floor(Date.now() / 1000),
		files: entries,
		external_hosts: Array.from(externalSet).sort(),
		external_critical: Array.from(externalCritical).sort(),
		external_allowlist: ALLOWED_EXTERNAL_HOSTS,
	};
}

function withHashes(manifest, folder) {
	manifest.files = manifest.files.map(e => {
		const abs = path.join(folder, e.path);
		try { return { ...e, sha256: sha256File(abs) }; }
		catch { return e; }
	});
	return manifest;
}

function writeManifest(folder, manifest) {
	const out = path.join(folder, '.offline-manifest.json');
	fs.writeFileSync(out, JSON.stringify(manifest, null, 2));
	return out;
}

function buildForSlug(slug, opts) {
	const folder = path.join(ASSETS_DIR, slug);
	if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
		throw new Error(`Slug not found in Assets: ${slug}`);
	}
	let manifest = buildForFolder(folder, slug);
	if (opts.strictHash) manifest = withHashes(manifest, folder);
	const out = writeManifest(folder, manifest);
	return { slug, out, files: manifest.files.length, required: manifest.files.filter(f => f.required).length };
}

function buildForArbitraryRoot(root, slug, opts) {
	const folder = root;
	let manifest = buildForFolder(folder, slug);
	if (opts.strictHash) manifest = withHashes(manifest, folder);
	const out = writeManifest(folder, manifest);
	return { slug, out, files: manifest.files.length, required: manifest.files.filter(f => f.required).length };
}

function main() {
	const args = parseArgs(process.argv);

	if (args.root || args.candidate) {
		const root = args.root || args.candidate;
		const slug = path.basename(root).replace(/-\d{8,}$/, '');
		const r = buildForArbitraryRoot(root, slug, args);
		console.log(`offline-manifest: ${r.slug} (${r.out}) files=${r.files} required=${r.required}`);
		return;
	}

	if (args.slug) {
		const r = buildForSlug(args.slug, args);
		console.log(`offline-manifest: ${r.slug} files=${r.files} required=${r.required}`);
		return;
	}

	if (args.all) {
		const slugs = fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
			.filter(d => d.isDirectory() && !d.name.startsWith('.'))
			.map(d => d.name).sort();
		let ok = 0, fail = 0;
		for (const slug of slugs) {
			try {
				const r = buildForSlug(slug, args);
				ok += 1;
				if (ok % 50 === 0) console.log(`...${ok}/${slugs.length} (${r.slug})`);
			} catch (e) {
				fail += 1;
				console.error(`  [${slug}] FAILED: ${e.message}`);
			}
		}
		console.log(`offline-manifest: built ${ok} manifests (${fail} failed)`);
	}
}

if (require.main === module) {
	try { main(); }
	catch (e) { console.error(String(e && e.stack || e)); process.exit(1); }
}

module.exports = { buildForFolder, buildForSlug, buildForArbitraryRoot, ALLOWED_EXTERNAL_HOSTS };
