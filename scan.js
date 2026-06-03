const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, 'Assets');
const OUTFILE = path.join(ROOT, 'games_list.json');

// Image extensions to look for (priority order)
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico'];

// Recursively collect all image files from a folder and its subfolders
function collectImages(dir, baseDir) {
	const results = [];
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				results.push(...collectImages(fullPath, baseDir));
			} else if (IMAGE_EXTS.includes(path.extname(entry.name).toLowerCase())) {
				results.push(path.relative(baseDir, fullPath));
			}
		}
	} catch (e) {}
	return results;
}

// Recursively check if a folder contains any .swf files
function hasSwfFiles(dir) {
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (hasSwfFiles(fullPath)) return true;
			} else if (path.extname(entry.name).toLowerCase() === '.swf') {
				return true;
			}
		}
	} catch (e) {}
	return false;
}

// Check if an HTML file uses our local EmulatorJS (retro game)
function isEmulatorGame(htmlPath) {
	try {
		const content = fs.readFileSync(htmlPath, 'utf-8');
		return content.includes("EJS_pathtodata = '/emulatorjs/'");
	} catch (e) {}
	return false;
}

// Detect the specific emulator core used (snes, gba, etc.)
function getEmulatorCore(htmlPath) {
	try {
		const content = fs.readFileSync(htmlPath, 'utf-8');
		const match = content.match(/EJS_core\s*=\s*['"]([^'"]+)['"]/);
		if (match) return match[1];
	} catch (e) {}
	return null;
}

// Check if an HTML file has the <!--REQUESTED GAME--> marker
function isRequestedGame(htmlPath) {
	try {
		const content = fs.readFileSync(htmlPath, 'utf-8');
		return content.includes('<!--REQUESTED GAME-->');
	} catch (e) {}
	return false;
}

// Recursively calculate the total size of a folder and its subfolders
function getFolderSize(dir) {
	let totalSize = 0;
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				totalSize += getFolderSize(fullPath);
			} else {
				const stats = fs.statSync(fullPath);
				totalSize += stats.size;
			}
		}
	} catch (e) {}
	return totalSize;
}

// Find the best image in a game folder (searches all subfolders)
function findImage(folderPath, folderName) {
	try {
		const allImages = collectImages(folderPath, folderPath);
		if (allImages.length === 0) return null;

		const priorityNames = ['logo', 'icon', 'splash', 'thumb', 'thumbnail', folderName.toLowerCase()];
		const isRoot = (f) => !f.includes(path.sep) && !f.includes('/');

		// Try priority names first — prefer root-level matches over deep ones
		// (otherwise a stray logo.png inside _archived_site/ overrides a real
		// logo.svg placed at the folder root).
		for (const name of priorityNames) {
			const matches = allImages.filter(f => path.basename(f, path.extname(f)).toLowerCase() === name);
			if (!matches.length) continue;
			const root = matches.find(isRoot);
			const pick = root || matches[0];
			return `Assets/${folderName}/${pick}`;
		}

		// Prefer images in the root folder over subfolders
		const rootImages = allImages.filter(f => !f.includes(path.sep) && !f.includes('/'));
		if (rootImages.length > 0) return `Assets/${folderName}/${rootImages[0]}`;

		// Fallback: first image found anywhere
		return `Assets/${folderName}/${allImages[0]}`;
	} catch (e) {
		return null;
	}
}

// Check if an HTML file has the <!--GAME BROKEN--> marker
function isBrokenGame(htmlPath) {
	try {
		const content = fs.readFileSync(htmlPath, 'utf-8');
		return content.includes('<!--GAME BROKEN-->');
	} catch (e) {}
	return false;
}

// Keyword → tag dictionary used for auto-tagging by slug.
// Order matters loosely (more specific first). Tags should be short, lowercase,
// hyphen-free single words where possible so they fit in chips.
const TAG_KEYWORDS = [
	{ tag: 'racing',    words: ['race','racing','drift','kart','rally','speed','car-','-car','drive','driver','traffic','moto','bike'] },
	{ tag: 'shooter',   words: ['fps','shoot','shooter','gun','sniper','war','strike','combat','battlefield','crossfire','warfare'] },
	{ tag: 'puzzle',    words: ['puzzle','sudoku','mahjong','match','jigsaw','logic','sokoban','tetris','2048','solitaire','crossword'] },
	{ tag: 'platformer',words: ['mario','sonic','platform','jump','jumper','run','runner','geometry','dash','climb','parkour'] },
	{ tag: 'sports',    words: ['football','soccer','basketball','golf','tennis','baseball','hockey','volley','sport','bowling','pool','cricket','boxing','wrestling','fight','mma'] },
	{ tag: 'arcade',    words: ['arcade','breakout','asteroids','snake','pinball','pacman','pac-man','classic','retro','flappy'] },
	{ tag: 'horror',    words: ['scary','horror','fnaf','freddy','haunted','ghost','zombie','undead','slender','granny','nightmare','poppy','huggy'] },
	{ tag: 'multiplayer',words:['multi','multiplayer','-vs-','duel','battle','royale','online','party','versus','arena','clash'] },
	{ tag: 'strategy',  words: ['chess','checkers','strategy','tower','defense','tactics','td-','rts','kingdom','empire','civ-'] },
	{ tag: 'rpg',       words: ['rpg','dungeon','quest','adventure','fantasy','wizard','dragon','hero','kingdom','final-fantasy','pokemon','zelda'] },
	{ tag: 'simulation',words: ['sim','simulator','tycoon','city','farm','idle','clicker','factory','manage'] },
	{ tag: 'minecraft', words: ['minecraft','mine-','craft-','blockcraft'] },
	{ tag: 'io',        words: ['-io','.io'] },
	{ tag: 'stickman',  words: ['stick','stickman','stickfight'] },
	{ tag: 'survival',  words: ['survival','survive','craft','hunt'] },
	{ tag: 'casual',    words: ['casual','cute','color','draw','paint','dress','makeup','baby','kid'] },
];

// Returns an array of inferred tags for a given slug + type.
function inferTags(slug, type) {
	const out = new Set();
	const haystack = '-' + String(slug || '').toLowerCase() + '-';
	for (const { tag, words } of TAG_KEYWORDS) {
		for (const w of words) {
			if (haystack.includes(w)) { out.add(tag); break; }
		}
	}
	// Always tag platform from type so users can filter by .swf vs WebGL vs retro
	if (type === 'flash') out.add('flash');
	if (type === 'snes' || type === 'gba') out.add('retro');
	return [...out];
}

// Parse the <!--LEADERBOARD score--> / <!--LEADERBOARD time--> marker.
// Opts a game into global leaderboards. Kind is a display hint: 'time' = ms
// survived (auto-captured from session length), 'score' = raw points.
function parseLeaderboard(htmlPath) {
	try {
		const content = fs.readFileSync(htmlPath, 'utf-8');
		const m = content.match(/<!--\s*LEADERBOARD\s+(score|time)\s*-->/i);
		if (m) return m[1].toLowerCase();
	} catch (e) {}
	return null;
}

// Hand-editable opt-in list (leaderboard_games.json). Wins over the HTML
// marker, and needs no edits to vendored game files.
function loadLeaderboardOverrides() {
	try {
		const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'leaderboard_games.json'), 'utf-8'));
		const map = {};
		for (const [slug, kind] of Object.entries(raw)) {
			if (slug === '_comment') continue;
			if (kind === 'time' || kind === 'score') map[slug] = kind;
		}
		return map;
	} catch (e) {
		return {};
	}
}

// Parse <!--TAG foo--> and <!--GENRE bar--> markers
function parseTagsAndGenre(htmlPath) {
	try {
		const content = fs.readFileSync(htmlPath, 'utf-8');
		const tags = [];
		const tagRe = /<!--\s*TAG\s+([a-z0-9\-_ ]+?)\s*-->/gi;
		let m;
		while ((m = tagRe.exec(content)) !== null) {
			const tag = m[1].trim().toLowerCase();
			if (tag && !tags.includes(tag)) tags.push(tag);
		}
		let genre = null;
		const gMatch = content.match(/<!--\s*GENRE\s+([a-z0-9\-_ ]+?)\s*-->/i);
		if (gMatch) genre = gMatch[1].trim().toLowerCase();
		return { tags, genre };
	} catch (e) {}
	return { tags: [], genre: null };
}

// ---- SEO: per-game share pages + sitemap -------------------------------
// Crawlers and link unfurlers (Discord, iMessage, Twitter, Slack) read the raw
// HTML response and do NOT run JS, so meta tags injected client-side are
// invisible to them. We pre-generate one static HTML file per game at scan
// time with real <meta> tags + JSON-LD; a human who lands on it is immediately
// redirected to the SPA deep link (#game=<name>) which plays the actual game.

const SITE_ORIGIN = 'https://jeoweb.app';
const GAME_PAGES_DIR = path.join(ROOT, 'game');
const SITEMAP_FILE = path.join(ROOT, 'sitemap.xml');
// Extra hand-written top-level pages worth listing in the sitemap.
const STATIC_PAGES = ['flash.html', 'retro.html', 'new.html', 'requested.html', 'links.html', 'make-your-own.html'];

function escapeHtml(s) {
	return String(s == null ? '' : s)
		.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Filesystem- and URL-safe filename for a game's share page. De-duplicates so
// two games that normalize to the same slug can't clobber each other's file.
function slugifyFileName(name, used) {
	let base = String(name || 'game').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
	if (!base) base = 'game';
	let slug = base;
	let n = 2;
	while (used.has(slug)) { slug = base + '-' + n; n++; }
	used.add(slug);
	return slug;
}

function gameDescription(entry) {
	const typeLabel = entry.type === 'flash' ? 'A classic Flash game'
		: (entry.type === 'snes' || entry.type === 'gba') ? 'A retro console game'
		: 'A browser game';
	const tagPart = entry.tags && entry.tags.length
		? ' Tags: ' + entry.tags.slice(0, 3).join(', ') + '.' : '';
	return `Play ${entry.name} free and unblocked on Jeo. ${typeLabel} you can play instantly — no downloads, no sign-ups.${tagPart}`;
}

function buildGamePage(entry, fileSlug) {
	const name = entry.name;
	const desc = gameDescription(entry);
	const canonical = `${SITE_ORIGIN}/game/${fileSlug}.html`;
	const image = `${SITE_ORIGIN}/${entry.image || 'og-image.svg'}`;
	const deepLink = '/#game=' + encodeURIComponent(name);
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'VideoGame',
		name: name,
		description: desc,
		url: canonical,
		image: image,
		genre: entry.genre || (entry.tags && entry.tags[0]) || 'Browser Game',
		applicationCategory: 'Game',
		operatingSystem: 'Web Browser',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
	});
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Play ${escapeHtml(name)} — Free Unblocked Game | Jeo</title>
<meta name="description" content="${escapeHtml(desc)}" />
<link rel="canonical" href="${escapeHtml(canonical)}" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<meta name="theme-color" content="#0c0b14" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Jeo Unblocked Games" />
<meta property="og:title" content="Play ${escapeHtml(name)} — Free Unblocked Game" />
<meta property="og:description" content="${escapeHtml(desc)}" />
<meta property="og:url" content="${escapeHtml(canonical)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Play ${escapeHtml(name)} — Free Unblocked Game" />
<meta name="twitter:description" content="${escapeHtml(desc)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />
<script type="application/ld+json">${jsonLd}</script>
<script>location.replace(${JSON.stringify(deepLink)});</script>
<style>body{margin:0;background:#0c0b14;color:#e8e8ed;font-family:Poppins,Segoe UI,system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center}a{color:#a855f7}</style>
</head>
<body>
<div>
<h1>${escapeHtml(name)}</h1>
<p>${escapeHtml(desc)}</p>
<p><a href="${escapeHtml(deepLink)}">▶ Play ${escapeHtml(name)} now</a></p>
</div>
</body>
</html>
`;
}

// Writes game/<slug>.html for every non-broken game. Returns [{loc, lastmod}].
function writeGamePages(results) {
	try {
		if (!fs.existsSync(GAME_PAGES_DIR)) fs.mkdirSync(GAME_PAGES_DIR);
	} catch (e) {
		console.warn('Could not create game/ dir:', e.message);
		return [];
	}
	// Drop stale pages so renamed/removed games don't linger in the sitemap.
	try {
		for (const f of fs.readdirSync(GAME_PAGES_DIR)) {
			if (f.toLowerCase().endsWith('.html')) fs.unlinkSync(path.join(GAME_PAGES_DIR, f));
		}
	} catch (e) {}
	const used = new Set();
	const pages = [];
	for (const entry of results) {
		if (entry.status === 'broken') continue;
		const fileSlug = slugifyFileName(entry.name, used);
		fs.writeFileSync(path.join(GAME_PAGES_DIR, fileSlug + '.html'), buildGamePage(entry, fileSlug));
		pages.push({ loc: `${SITE_ORIGIN}/game/${fileSlug}.html`, lastmod: entry.addedDate });
	}
	return pages;
}

function writeSitemap(gamePages) {
	const today = new Date().toISOString().slice(0, 10);
	const urls = [{ loc: SITE_ORIGIN + '/', lastmod: today }];
	for (const p of STATIC_PAGES) urls.push({ loc: `${SITE_ORIGIN}/${p}`, lastmod: today });
	for (const gp of gamePages) urls.push(gp);
	const body = urls.map(u =>
		`  <url>\n    <loc>${escapeHtml(u.loc)}</loc>\n    <lastmod>${escapeHtml(u.lastmod || today)}</lastmod>\n  </url>`
	).join('\n');
	fs.writeFileSync(SITEMAP_FILE,
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
	return urls.length;
}

function scan() {
	let targetSlug = null;
	const slugIdx = process.argv.indexOf('--slug');
	if (slugIdx !== -1 && process.argv[slugIdx + 1]) {
		targetSlug = process.argv[slugIdx + 1];
	}

	let results = [];
	let existingResultsMap = new Map();
	if (targetSlug && fs.existsSync(OUTFILE)) {
		try {
			const parsed = JSON.parse(fs.readFileSync(OUTFILE, 'utf-8'));
			for (const r of parsed) {
				r.addedTime = r.addedDate ? new Date(r.addedDate).getTime() : 0;
				existingResultsMap.set(r.name, r);
			}
		} catch (e) {
			console.error('Error reading existing games list:', e);
		}
	}

	if (!fs.existsSync(ASSETS_DIR)) {
		console.error('Assets folder not found:', ASSETS_DIR);
		fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
		return;
	}

	if (targetSlug && !fs.existsSync(path.join(ASSETS_DIR, targetSlug))) {
		existingResultsMap.delete(targetSlug);
	}

	const items = fs.readdirSync(ASSETS_DIR, { withFileTypes: true });
	const leaderboardOverrides = loadLeaderboardOverrides();
	let flashCount = 0;
	let retroCount = 0;
	let webglCount = 0;
	const skippedFolders = [];

	let itemsToScan = items;
	if (targetSlug) {
		itemsToScan = items.filter(it => it.name === targetSlug);
	}

	for (const it of itemsToScan) {
		if (!it.isDirectory()) continue;
		// Internal staging dirs the recovery engine writes into. They're not games.
		if (it.name.startsWith('.')) continue;

		const folderPath = path.join(ASSETS_DIR, it.name);

		// Find any .htm(l) entrypoint (prefer index.htm[l]). Some legacy
		// imports ship with just `index.htm` — accepting both spellings
		// keeps them in the catalog instead of silently dropping them.
		const files = fs.readdirSync(folderPath);
		const htmlFiles = files.filter(f => /\.html?$/i.test(f));
		if (htmlFiles.length === 0) {
			// Surface skipped folders so failed/partial imports don't silently
			// disappear from the catalog. Common causes: incomplete WebGL drop
			// (draco_* + lib/ but no index.html), unextracted ROM .zip sitting
			// in the folder, or dev artifacts that shouldn't be under Assets/.
			const sample = files.slice(0, 4).join(', ');
			skippedFolders.push({ name: it.name, fileCount: files.length, sample });
			if (targetSlug) {
				existingResultsMap.delete(it.name);
			}
			continue;
		}
		const htmlFile =
			htmlFiles.find(f => /^index\.html?$/i.test(f)) || htmlFiles[0];

		const image = findImage(folderPath, it.name);
		const htmlFilePath = path.join(folderPath, htmlFile);
		const isFlash = hasSwfFiles(folderPath);
		const isRetro = !isFlash && isEmulatorGame(htmlFilePath);
		const requested = isRequestedGame(htmlFilePath);
		const broken = isBrokenGame(htmlFilePath);
		const { tags, genre } = parseTagsAndGenre(htmlFilePath);
		const leaderboard = parseLeaderboard(htmlFilePath);

		// Determine specific retro type (snes, gba, etc.)
		let type = 'webgl';
		if (isFlash) {
			type = 'flash';
		} else if (isRetro) {
			const core = getEmulatorCore(htmlFilePath);
			if (core === 'gba') type = 'gba';
			else type = 'snes';
		}

		// Get folder creation time to determine "recently added"
		const stat = fs.statSync(folderPath);
		const addedTime = stat.birthtimeMs || stat.mtimeMs;
		const size = getFolderSize(folderPath);

		const entry = {
			name: it.name,
			url: `Assets/${it.name}/${htmlFile}`,
			image: image || 'notavailable.svg',
			type,
			addedTime,
			addedDate: new Date(addedTime).toISOString().slice(0, 10),
			size
		};
		if (requested) entry.requested = true;
		if (broken) entry.status = 'broken';
		// Merge marker-tags (curated, from HTML) with auto-tags (from slug + type).
		// Curated tags win — they're listed first so order-dependent UIs prefer them.
		const auto = inferTags(it.name, type);
		const merged = [];
		const seen = new Set();
		for (const t of (tags || []).concat(auto)) {
			if (!t) continue;
			const k = String(t).toLowerCase();
			if (seen.has(k)) continue;
			seen.add(k);
			merged.push(k);
		}
		if (merged.length) entry.tags = merged;
		if (genre) entry.genre = genre;
		// leaderboard_games.json override wins over the in-HTML marker.
		const lb = leaderboardOverrides[it.name] || leaderboard;
		if (lb) entry.leaderboard = lb;

		if (targetSlug) {
			existingResultsMap.set(it.name, entry);
		} else {
			results.push(entry);
		}
	}

	if (targetSlug) {
		results = Array.from(existingResultsMap.values());
	}

	// Calculate counts from merged results
	for (const entry of results) {
		if (entry.type === 'flash') {
			flashCount++;
		} else if (entry.type === 'gba' || entry.type === 'snes') {
			retroCount++;
		} else {
			webglCount++;
		}
	}

	// Create recently added list (Top 30 newest)
	const recentList = [...results]
		.sort((a, b) => b.addedTime - a.addedTime)
		.slice(0, 30)
		.map(g => {
			const { addedTime, ...rest } = g;
			return rest; // Remove addedTime from the final JSON so it stays clean
		});
	fs.writeFileSync(path.join(ROOT, 'recently_added.json'), JSON.stringify(recentList, null, 2));

	// Remove addedTime from main results before saving to keep it clean
	results.forEach(g => delete g.addedTime);

	results.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
	fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
	console.log(`Wrote ${OUTFILE} -> ${results.length} games (${flashCount} Flash, ${retroCount} Retro, ${webglCount} WebGL)`);
	console.log(`Wrote recently_added.json -> Updated with ${recentList.length} newest games.`);
	if (skippedFolders.length) {
		console.warn(`\n[scan] Skipped ${skippedFolders.length} folder(s) under Assets/ with no .html entrypoint:`);
		for (const s of skippedFolders) {
			console.warn(`  - ${s.name} (${s.fileCount} file(s): ${s.sample}${s.fileCount > 4 ? ', …' : ''})`);
		}
		console.warn('[scan] These won\'t appear in the catalog. Run `npm run recover -- <slug>` to repair, or remove the folder if it\'s not a game.\n');
	}

	// SEO: regenerate per-game share pages + the full sitemap.
	const gamePages = writeGamePages(results);
	const sitemapCount = writeSitemap(gamePages);
	console.log(`Wrote game/ -> ${gamePages.length} per-game share pages.`);
	console.log(`Wrote sitemap.xml -> ${sitemapCount} URLs.`);
}

scan();
