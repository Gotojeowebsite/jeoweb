#!/usr/bin/env node
/**
 * download-game.js  (v2 — deep recursive crawler)
 * =================================================
 * Downloads ALL files a web game needs to run locally.
 *
 * • Crawls HTML, CSS, JS, and JSON for every referenced asset
 * • Follows paths into subfolders and parent directories (same origin)
 * • Detects Unity / Phaser / Construct / GDevelop engine patterns
 * • Rewrites absolute URLs → relative paths so the game works offline
 * • Concurrent downloads with configurable parallelism
 *
 * Usage:
 *   node scripts/download-game.js <url> [folder-name]
 *
 * Examples:
 *   node scripts/download-game.js https://d3rtzzzsiu7gdr.cloudfront.net/files/ragdoll-archers/index.html
 *   node scripts/download-game.js https://example.com/games/cool-game/ my-cool-game
 *
 * After downloading, run:  node scripts/add-game.js <folder-name>
 */

const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');

// ─── Config ─────────────────────────────────────────────────────────────────

const MAX_FILES       = 5000;
const CONCURRENCY     = 6;
const DELAY_MS        = 50;
const MAX_FILE_SIZE   = 200 * 1024 * 1024; // 200 MB per file

// ─── Helpers ────────────────────────────────────────────────────────────────

function usage() {
	console.log(`
Usage:  node scripts/download-game.js <url> [folder-name]

  <url>          Full URL of the game's HTML page
  [folder-name]  Folder name inside Assets/ (auto-detected if omitted)

Examples:
  node scripts/download-game.js https://cdn.example.com/files/my-game/index.html
  node scripts/download-game.js https://cdn.example.com/files/my-game/index.html my-game
`);
	process.exit(1);
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/** Resolve a possibly-relative href against a base URL. Returns null on failure. */
function resolveUrl(base, href) {
	try {
		if (!href || href.startsWith('data:') || href.startsWith('javascript:') ||
		    href.startsWith('blob:') || href.startsWith('mailto:') || href.startsWith('#')) return null;
		const u = new URL(href, base);
		u.hash = '';
		return u.href;
	} catch { return null; }
}

/**
 * Determine the "game root" — the directory that contains the entry HTML.
 * For `https://cdn.example.com/files/ragdoll-archers/index.html`
 * the root is `https://cdn.example.com/files/ragdoll-archers/`
 */
function getGameRoot(inputUrl) {
	const u = new URL(inputUrl);
	let dir = u.pathname;
	if (!dir.endsWith('/')) {
		dir = dir.replace(/\/[^/]*$/, '/');
	}
	u.pathname = dir;
	u.search = '';
	return u.href;
}

/**
 * Is `candidateUrl` within the allowed download scope?
 * Allows anything on the same origin that is inside the game root dir
 * OR at most 2 levels above (some games reference ../../shared/ assets).
 */
function isInScope(gameRoot, candidateUrl) {
	try {
		const root = new URL(gameRoot);
		const cand = new URL(candidateUrl);
		if (root.origin !== cand.origin) return false;
		// Allow anything under the game root
		if (cand.pathname.startsWith(root.pathname)) return true;
		// Allow up to 2 parent levels
		const rootSegments = root.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
		for (let up = 1; up <= 2 && up < rootSegments.length; up++) {
			const parentPath = '/' + rootSegments.slice(0, -up).join('/') + '/';
			if (cand.pathname.startsWith(parentPath)) return true;
		}
		return false;
	} catch { return false; }
}

/**
 * Convert a URL to a local file path relative to the game destination folder.
 */
function urlToLocalPath(gameRoot, fileUrl) {
	const root = new URL(gameRoot);
	const file = new URL(fileUrl);

	let relative;
	if (file.pathname.startsWith(root.pathname)) {
		relative = file.pathname.slice(root.pathname.length);
	} else {
		// File is above game root — nest it under __parent/ to avoid escaping
		const rootDir = root.pathname.replace(/\/+$/, '');
		const rootSegments = rootDir.split('/').filter(Boolean);
		const fileSegments = file.pathname.split('/').filter(Boolean);
		// Find common prefix
		let common = 0;
		while (common < rootSegments.length && common < fileSegments.length &&
		       rootSegments[common] === fileSegments[common]) common++;
		const ups = rootSegments.length - common;
		const rest = fileSegments.slice(common).join('/');
		relative = '__parent/'.repeat(ups) + rest;
	}

	if (!relative || relative === '') relative = 'index.html';
	if (relative.endsWith('/')) relative += 'index.html';
	return decodeURIComponent(relative).replace(/\\/g, '/');
}

/** Fetch a URL with retries. Returns Response or null. */
async function fetchUrl(url, retries = 3) {
	for (let i = 0; i < retries; i++) {
		try {
			const resp = await fetch(url, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
					'Accept': '*/*',
					'Accept-Encoding': 'identity',
				},
				redirect: 'follow',
			});
			if (resp.ok) return resp;
			if (resp.status === 404 || resp.status === 403) return null;
			if (resp.status >= 500) { await sleep(1000 * (i + 1)); continue; }
			return null;
		} catch (err) {
			if (i === retries - 1) return null;
			await sleep(1000 * (i + 1));
		}
	}
	return null;
}

// ─── URL Extraction ─────────────────────────────────────────────────────────

// File extensions we consider downloadable assets
const ASSET_EXT_RE = /\.(html?|css|js|mjs|json|xml|txt|csv|png|jpe?g|gif|webp|svg|ico|bmp|avif|cur|woff2?|ttf|otf|eot|mp3|ogg|wav|m4a|aac|flac|mp4|webm|ogv|wasm|data|unity3d|unityweb|mem|asm|br|gz|pack|atlas|spine|fnt|tmx|tsx|glb|gltf|obj|mtl|bin|dat|manifest|pck|cfg|effect|shader|vert|frag|glsl|plist|skel|swf|zip|zst|part\d+)$/i;

/** Extract URLs from HTML */
function extractFromHtml(html, pageUrl) {
	const urls = new Set();

	const attrPatterns = [
		/(?:src|href|action|poster|data)\s*=\s*"([^"]+)"/gi,
		/(?:src|href|action|poster|data)\s*=\s*'([^']+)'/gi,
		/srcset\s*=\s*"([^"]+)"/gi,
		/srcset\s*=\s*'([^']+)'/gi,
	];

	for (const pat of attrPatterns) {
		let m;
		while ((m = pat.exec(html)) !== null) {
			const raw = m[1].trim();
			if (/srcset/i.test(m[0])) {
				for (const part of raw.split(',')) {
					const u = part.trim().split(/\s+/)[0];
					const resolved = resolveUrl(pageUrl, u);
					if (resolved) urls.add(resolved);
				}
			} else {
				const resolved = resolveUrl(pageUrl, raw);
				if (resolved) urls.add(resolved);
			}
		}
	}

	// CSS url() inside <style> blocks
	for (const u of extractFromCss(html, pageUrl)) urls.add(u);

	// Inline JS inside <script> blocks
	const scriptBlocks = html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi);
	for (const block of scriptBlocks) {
		if (block[1].trim()) {
			for (const u of extractFromJs(block[1], pageUrl)) urls.add(u);
		}
	}

	return urls;
}

/** Extract URLs from CSS */
function extractFromCss(css, pageUrl) {
	const urls = new Set();
	const patterns = [
		/url\(\s*"([^"]+)"\s*\)/gi,
		/url\(\s*'([^']+)'\s*\)/gi,
		/url\(\s*([^)'"]+)\s*\)/gi,
		/@import\s+"([^"]+)"/gi,
		/@import\s+'([^']+)'/gi,
	];
	for (const pat of patterns) {
		let m;
		while ((m = pat.exec(css)) !== null) {
			const raw = m[1].trim();
			if (!raw || raw.startsWith('data:')) continue;
			const resolved = resolveUrl(pageUrl, raw);
			if (resolved) urls.add(resolved);
		}
	}
	return urls;
}

/** Extract URLs from JavaScript — aggressive mode */
function extractFromJs(js, pageUrl) {
	const urls = new Set();

	function addPath(raw) {
		if (!raw || raw.length > 500 || raw.length < 2) return;
		raw = raw.replace(/\\(.)/g, '$1');
		if (!ASSET_EXT_RE.test(raw)) return;
		if (raw.includes('{') || raw.includes('}') || raw.includes('=>') ||
		    raw.includes('function') || raw.startsWith('data:')) return;

		// Resolve normally
		const resolved = resolveUrl(pageUrl, raw);
		if (resolved) urls.add(resolved);

		// If the string starts with "/", also try it as a relative path
		// (common in concatenation fragments like buildUrl + "/file.js")
		if (raw.startsWith('/')) {
			const relative = resolveUrl(pageUrl, raw.slice(1));
			if (relative) urls.add(relative);
		}
	}

	// 1. String literals that look like file paths
	const stringPatterns = [
		/"((?:[^"\\]|\\.)*)"/g,
		/'((?:[^'\\]|\\.)*)'/g,
		/`((?:[^`\\]|\\.)*)`/g,
	];

	for (const pat of stringPatterns) {
		let m;
		while ((m = pat.exec(js)) !== null) {
			addPath(m[1]);
		}
	}

	// 2. Detect JS variable + string concatenation patterns:
	//    const buildUrl = "Build";
	//    dataUrl: buildUrl + "/hash.data.unityweb"
	// Resolve these by finding the variable value and combining it with the suffix
	const varAssignments = new Map();
	const varPat = /(?:const|let|var)\s+(\w+)\s*=\s*["']([^"']+)["']/g;
	let vm;
	while ((vm = varPat.exec(js)) !== null) {
		varAssignments.set(vm[1], vm[2]);
	}

	// Find concatenation: varName + "string" or varName + '/string'
	const concatPat = /(\w+)\s*\+\s*["']([^"']+)["']/g;
	let cm;
	while ((cm = concatPat.exec(js)) !== null) {
		const varName = cm[1];
		const suffix = cm[2];
		if (varAssignments.has(varName)) {
			const combined = varAssignments.get(varName) + suffix;
			addPath(combined);
		}
	}

	// Also: "string" + varName
	const concatPat2 = /["']([^"']+)["']\s*\+\s*(\w+)/g;
	while ((cm = concatPat2.exec(js)) !== null) {
		const prefix = cm[1];
		const varName = cm[2];
		if (varAssignments.has(varName)) {
			const combined = prefix + varAssignments.get(varName);
			addPath(combined);
		}
	}

	// 3. Fetch / load / src assignments
	const fetchPatterns = [
		/(?:fetch|load|open|getJSON|ajax|get|require)\s*\(\s*["']([^"']+)["']/gi,
		/\.src\s*=\s*["']([^"']+)["']/gi,
		/new\s+(?:Image|Audio)\s*\(\s*["']([^"']+)["']\s*\)/gi,
	];
	for (const pat of fetchPatterns) {
		let m;
		while ((m = pat.exec(js)) !== null) {
			const resolved = resolveUrl(pageUrl, m[1]);
			if (resolved) urls.add(resolved);
		}
	}

	// 4. Detect split-file / multi-part patterns:
	//    getParts("Build/fnae.data", 1, 3)  →  Build/fnae.data.part1, .part2, .part3
	//    Also: file + ".part" + i  patterns
	const getPartsPat = /getParts\s*\(\s*["']([^"']+)["']\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
	let pm;
	while ((pm = getPartsPat.exec(js)) !== null) {
		const basePath = pm[1];
		const start = parseInt(pm[2], 10);
		const end = parseInt(pm[3], 10);
		console.log(`    → Detected split file: ${basePath} (parts ${start}-${end})`);
		for (let i = start; i <= end; i++) {
			const partUrl = resolveUrl(pageUrl, `${basePath}.part${i}`);
			if (partUrl) urls.add(partUrl);
		}
	}

	// Also catch: "filename" + ".part" + number patterns
	const partConcatPat = /["']([^"']+)["']\s*\+\s*["']\.part["']\s*\+/g;
	let pcm;
	while ((pcm = partConcatPat.exec(js)) !== null) {
		const basePath = pcm[1];
		// Try parts 1–10 as a reasonable guess
		for (let i = 1; i <= 10; i++) {
			const partUrl = resolveUrl(pageUrl, `${basePath}.part${i}`);
			if (partUrl) urls.add(partUrl);
		}
	}

	// Catch any explicit .partN references in strings
	const explicitPartPat = /["']([^"']+\.part\d+)["']/g;
	let epm;
	while ((epm = explicitPartPat.exec(js)) !== null) {
		const resolved = resolveUrl(pageUrl, epm[1]);
		if (resolved) urls.add(resolved);
	}

	return urls;
}

/** Extract URLs from JSON (asset manifests, configs, atlases) */
function extractFromJson(jsonText, pageUrl) {
	const urls = new Set();

	function walk(obj) {
		if (typeof obj === 'string') {
			if (obj.length < 500 && !obj.startsWith('data:')) {
				// If it looks like a path with a file extension
				if (ASSET_EXT_RE.test(obj)) {
					const resolved = resolveUrl(pageUrl, obj);
					if (resolved) urls.add(resolved);
				}
				// Or if it looks like a relative path with slashes
				else if (/^[a-zA-Z0-9_./-]+$/.test(obj) && obj.includes('/') && !obj.startsWith('//')) {
					const resolved = resolveUrl(pageUrl, obj);
					if (resolved) urls.add(resolved);
				}
			}
			return;
		}
		if (Array.isArray(obj)) { obj.forEach(walk); return; }
		if (obj && typeof obj === 'object') { Object.values(obj).forEach(walk); }
	}

	try { walk(JSON.parse(jsonText)); } catch {}
	return urls;
}

/**
 * Detect game engine and probe for known file patterns.
 */
function probeEngineFiles(html, js, gameRoot) {
	const urls = new Set();
	const combined = html + '\n' + js;

	// ── Unity WebGL ──
	if (/UnityLoader|unityInstance|createUnityInstance|buildUrl|loaderUrl|frameworkUrl|dataUrl|codeUrl/i.test(combined)) {
		console.log('  🔍 Detected Unity WebGL engine');

		// 1. Parse the actual Unity config from the JS to get exact file paths.
		//    Handles patterns like:
		//      const buildUrl = "Build";
		//      dataUrl: buildUrl + "/hash.data.unityweb"
		//    or direct:
		//      dataUrl: "Build/hash.data.unityweb"
		const vars = new Map();
		const varPat = /(?:const|let|var)\s+(\w+)\s*=\s*["']([^"']*)["']/g;
		let vv;
		while ((vv = varPat.exec(combined)) !== null) vars.set(vv[1], vv[2]);

		// Config keys to look for
		const configKeys = ['dataUrl', 'frameworkUrl', 'codeUrl', 'loaderUrl',
		                    'streamingAssetsUrl', 'wasmCodeUrl', 'asmCodeUrl', 'memoryUrl'];
		for (const key of configKeys) {
			// Direct string: dataUrl: "Build/file.data"
			const directPat = new RegExp(key + '\\s*[:=]\\s*["\']([^"\'+]+)["\']', 'g');
			let dm;
			while ((dm = directPat.exec(combined)) !== null) {
				const u = resolveUrl(gameRoot, dm[1]);
				if (u) { urls.add(u); console.log(`    → Unity ${key}: ${dm[1]}`); }
			}

			// Concatenation: dataUrl: buildUrl + "/file.data"
			const concPat = new RegExp(key + '\\s*[:=]\\s*(\\w+)\\s*\\+\\s*["\']([^"\'+]+)["\']', 'g');
			let cm;
			while ((cm = concPat.exec(combined)) !== null) {
				const prefix = vars.get(cm[1]) || cm[1];
				const full = prefix + cm[2];
				const u = resolveUrl(gameRoot, full);
				if (u) { urls.add(u); console.log(`    → Unity ${key}: ${full}`); }
			}
		}

		// 2. Also probe common Build/ directory patterns as fallback
		const buildDirs = ['Build', 'build'];
		const exts = ['.loader.js', '.framework.js', '.framework.js.br', '.framework.js.gz',
		              '.data', '.data.br', '.data.gz', '.data.unityweb',
		              '.wasm', '.wasm.br', '.wasm.gz', '.wasm.unityweb',
		              '.js.unityweb'];

		// Try to gather actual filenames from any matched path e.g. "hash.data.unityweb"
		const fileMatches = combined.matchAll(/["']([^"']*?\.(?:unityweb|data|wasm|framework\.js|loader\.js)(?:\.br|\.gz)?)["']/g);
		for (const fm of fileMatches) {
			let fpath = fm[1];
			if (fpath.startsWith('/')) fpath = fpath.slice(1);
			// If it doesn't include a dir prefix, try each build dir
			if (!fpath.includes('/')) {
				for (const dir of buildDirs) {
					const u = resolveUrl(gameRoot, `${dir}/${fpath}`);
					if (u) urls.add(u);
				}
			} else {
				const u = resolveUrl(gameRoot, fpath);
				if (u) urls.add(u);
			}
		}

		// TemplateData
		for (const f of ['style.css', 'favicon.ico', 'progress-bar-empty-dark.png',
		                  'progress-bar-full-dark.png', 'fullscreen-button.png', 'unity-logo-dark.png']) {
			const u = resolveUrl(gameRoot, `TemplateData/${f}`);
			if (u) urls.add(u);
		}
	}

	// ── Construct 2/3 ──
	if (/c2runtime|c3runtime|cr_getC2Runtime|construct/i.test(combined)) {
		console.log('  🔍 Detected Construct 2/3 engine');
		for (const f of ['data.js', 'data.json', 'c2runtime.js', 'c3runtime.js',
		                  'jquery-2.1.1.min.js', 'offlineClient.js', 'sw.js', 'workermain.js',
		                  'scripts/main.js', 'scripts/supportcheck.js', 'appmanifest.json',
		                  'offline.json', 'loading-logo.png', 'icons/icon-16.png',
		                  'icons/icon-32.png', 'icons/icon-114.png', 'icons/icon-128.png',
		                  'icons/icon-256.png']) {
			const u = resolveUrl(gameRoot, f);
			if (u) urls.add(u);
		}
	}

	// ── GDevelop ──
	if (/gdjs|GDJS|GDevelop/i.test(combined)) {
		console.log('  🔍 Detected GDevelop engine');
		const u = resolveUrl(gameRoot, 'data.json');
		if (u) urls.add(u);
	}

	// ── Phaser / PixiJS ──
	if (/phaser|pixi\.js|PIXI\./i.test(combined)) {
		console.log('  🔍 Detected Phaser/PixiJS engine');
	}

	// ── General common files ──
	for (const f of [
		'manifest.json', 'game.json', 'config.json', 'assets.json',
		'package.json', 'data.json', 'settings.json', 'atlas.json',
		'style.css', 'main.css', 'game.css', 'styles.css',
		'main.js', 'game.js', 'app.js', 'bundle.js', 'index.js', 'script.js',
		'favicon.ico', 'favicon.png', 'icon.png', 'logo.png', 'splash.png', 'thumb.png',
	]) {
		const u = resolveUrl(gameRoot, f);
		if (u) urls.add(u);
	}

	urls.delete(null);
	return urls;
}

// ─── URL Rewriting ──────────────────────────────────────────────────────────

/**
 * Rewrite absolute URLs in text content so they point to local relative paths.
 */
function rewriteUrls(text, gameRoot, currentFileUrl) {
	const root = new URL(gameRoot);
	const rootBase = root.href.replace(/\/$/, '');
	const escaped = rootBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	// Replace absolute URLs pointing to the game root
	const absPattern = new RegExp(escaped + '/([^"\'\\s)>]+)', 'g');

	const currentLocal = urlToLocalPath(gameRoot, currentFileUrl);
	const currentDir = path.posix.dirname(currentLocal);

	let result = text.replace(absPattern, (match, relativePath) => {
		if (currentDir === '.' || currentDir === '') return relativePath;
		return path.posix.relative(currentDir, relativePath);
	});

	// Also replace the bare root URL (no trailing content)
	result = result.replace(new RegExp(escaped + '/?(?=["\x27\\s)>])', 'g'), '.');

	return result;
}

// ─── Download Engine ────────────────────────────────────────────────────────

async function downloadGame(inputUrl, folderName) {
	const gameRoot = getGameRoot(inputUrl);

	if (!folderName) {
		const urlPath = new URL(gameRoot).pathname.replace(/\/+$/, '');
		folderName = urlPath.split('/').filter(Boolean).pop() || 'downloaded-game';
		folderName = folderName.replace(/[^a-zA-Z0-9_-]/g, '-');
	}

	const destDir = path.join(ASSETS_DIR, folderName);

	console.log(`\n🎮 Game Downloader v2`);
	console.log(`─────────────────────────────────────────────`);
	console.log(`  Page:      ${inputUrl}`);
	console.log(`  Root:      ${gameRoot}`);
	console.log(`  Folder:    Assets/${folderName}/`);
	console.log(`  Parallel:  ${CONCURRENCY} downloads`);
	console.log(`  Max files: ${MAX_FILES}`);
	console.log(`─────────────────────────────────────────────\n`);

	fs.mkdirSync(destDir, { recursive: true });

	const visited      = new Set();   // URLs finished (downloaded or failed/skipped)
	const queued       = new Set();   // URLs already in the queue
	const queue        = [];          // FIFO
	const textContents = new Map();   // url → { text, localPath, fullPath }
	let downloaded = 0;
	let skipped    = 0;
	let failed     = 0;

	function normalizeForDedup(url) {
		try {
			const u = new URL(url);
			u.hash = '';
			u.search = '';
			return u.href;
		} catch { return url; }
	}

	function enqueue(url) {
		if (!url) return;
		const key = normalizeForDedup(url);
		if (visited.has(key) || queued.has(key)) return;
		if (!isInScope(gameRoot, url)) return;
		queued.add(key);
		queue.push(url);
	}

	// Seed with entry page
	enqueue(inputUrl);

	let firstPage = true;
	let allInlineJs = '';

	while (queue.length > 0 && downloaded < MAX_FILES) {
		// Grab a batch for parallel download
		const batch = queue.splice(0, CONCURRENCY);

		const promises = batch.map(async (url) => {
			const key = normalizeForDedup(url);
			if (visited.has(key)) return;
			visited.add(key);

			const localPath = urlToLocalPath(gameRoot, key);
			const fullPath  = path.join(destDir, localPath);

			// Skip if already on disk (from a previous run)
			if (fs.existsSync(fullPath)) {
				skipped++;
				return;
			}

			const resp = await fetchUrl(url);
			if (!resp) {
				failed++;
				return;
			}

			const contentType = resp.headers.get('content-type') || '';
			const contentLen  = parseInt(resp.headers.get('content-length') || '0', 10);

			if (contentLen > MAX_FILE_SIZE) {
				console.log(`  ⊘ Too large: ${localPath} (${(contentLen / 1024 / 1024).toFixed(1)} MB)`);
				skipped++;
				return;
			}

			const isTextType = contentType.includes('text/') ||
			                   contentType.includes('javascript') ||
			                   contentType.includes('json') ||
			                   contentType.includes('xml') ||
			                   contentType.includes('css') ||
			                   contentType.includes('svg');

			fs.mkdirSync(path.dirname(fullPath), { recursive: true });

			if (isTextType) {
				const text = await resp.text();
				fs.writeFileSync(fullPath, text, 'utf-8');
				downloaded++;
				const sizeKb = (Buffer.byteLength(text, 'utf-8') / 1024).toFixed(1);
				console.log(`  ✓ ${localPath} (${sizeKb} KB)`);

				textContents.set(key, { text, localPath, fullPath });

				// Discover more URLs from this file
				let newUrls = new Set();
				const ext = path.extname(localPath).toLowerCase();

				if (contentType.includes('html') || ext === '.html' || ext === '.htm') {
					newUrls = extractFromHtml(text, key);

					// Collect inline JS for engine detection
					const inlineScripts = text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi);
					for (const s of inlineScripts) {
						if (s[1].trim()) allInlineJs += s[1] + '\n';
					}

					if (firstPage) {
						firstPage = false;
						// Probe for engine-specific files
						const probeUrls = probeEngineFiles(text, allInlineJs, gameRoot);
						for (const pu of probeUrls) enqueue(pu);
					}
				} else if (contentType.includes('css') || ext === '.css') {
					newUrls = extractFromCss(text, key);
				} else if (contentType.includes('javascript') || ext === '.js' || ext === '.mjs') {
					newUrls = extractFromJs(text, key);
					allInlineJs += text.slice(0, 10000) + '\n'; // sample for engine detection
				} else if (contentType.includes('json') || ext === '.json') {
					newUrls = extractFromJson(text, key);
					// Also parse JSON as JS — some references are only in string form
					for (const u of extractFromJs(text, key)) newUrls.add(u);
				} else if (contentType.includes('xml') || ext === '.xml') {
					newUrls = extractFromHtml(text, key);
				}

				for (const nu of newUrls) enqueue(nu);
			} else {
				// Binary file
				const buffer = Buffer.from(await resp.arrayBuffer());
				fs.writeFileSync(fullPath, buffer);
				downloaded++;
				const size = buffer.length > 1024 * 1024
					? `${(buffer.length / 1024 / 1024).toFixed(1)} MB`
					: `${(buffer.length / 1024).toFixed(1)} KB`;
				console.log(`  ✓ ${localPath} (${size})`);
			}
		});

		await Promise.all(promises);
		await sleep(DELAY_MS);
	}

	// ── Rewrite absolute URLs → relative ──
	console.log(`\n  🔗 Rewriting URLs to relative paths...`);
	let rewritten = 0;
	for (const [url, info] of textContents) {
		const updated = rewriteUrls(info.text, gameRoot, url);
		if (updated !== info.text) {
			fs.writeFileSync(info.fullPath, updated, 'utf-8');
			rewritten++;
		}
	}

	// ── Summary ──
	console.log(`\n─────────────────────────────────────────────`);
	console.log(`  ✓ Downloaded:  ${downloaded} files`);
	if (skipped > 0)   console.log(`  ⊘ Skipped:     ${skipped}`);
	if (failed > 0)    console.log(`  ✗ Not found:   ${failed}`);
	if (rewritten > 0) console.log(`  🔗 Rewritten:  ${rewritten} file(s)`);
	console.log(`  📁 Saved to:   Assets/${folderName}/`);
	console.log(`─────────────────────────────────────────────`);

	if (downloaded >= MAX_FILES) {
		console.warn(`\n⚠  Hit the ${MAX_FILES}-file limit. Re-run to resume (existing files are skipped).\n`);
	}

	console.log(`\nNext step:`);
	console.log(`  node scripts/add-game.js ${folderName} "Game Display Name"`);
	console.log(`  (Finds an image, registers the game on the homepage)\n`);

	return { folderName, destDir, downloaded, failed };
}

// ─── CLI ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.length === 0) usage();

const url = args[0];
const folder = args[1] || null;

if (!/^https?:\/\//i.test(url)) {
	console.error('Error: URL must start with http:// or https://');
	process.exit(1);
}

downloadGame(url, folder).catch(err => {
	console.error('Fatal error:', err);
	process.exit(1);
});
