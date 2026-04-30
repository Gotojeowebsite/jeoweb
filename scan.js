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

function scan() {
	const results = [];
	if (!fs.existsSync(ASSETS_DIR)) {
		console.error('Assets folder not found:', ASSETS_DIR);
		fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
		return;
	}

	const items = fs.readdirSync(ASSETS_DIR, { withFileTypes: true });
	let flashCount = 0;
	let retroCount = 0;
	let webglCount = 0;

	for (const it of items) {
		if (!it.isDirectory()) continue;

		const folderPath = path.join(ASSETS_DIR, it.name);

		// Find any .html file in the folder (prefer index.html)
		const files = fs.readdirSync(folderPath);
		const htmlFiles = files.filter(f => f.toLowerCase().endsWith('.html'));
		if (htmlFiles.length === 0) continue;
		const htmlFile = htmlFiles.find(f => f.toLowerCase() === 'index.html') || htmlFiles[0];

		const image = findImage(folderPath, it.name);
		const htmlFilePath = path.join(folderPath, htmlFile);
		const isFlash = hasSwfFiles(folderPath);
		const isRetro = !isFlash && isEmulatorGame(htmlFilePath);
		const requested = isRequestedGame(htmlFilePath);
		const broken = isBrokenGame(htmlFilePath);
		const { tags, genre } = parseTagsAndGenre(htmlFilePath);

		// Determine specific retro type (snes, gba, etc.)
		let type = 'webgl';
		if (isFlash) {
			type = 'flash';
			flashCount++;
		} else if (isRetro) {
			const core = getEmulatorCore(htmlFilePath);
			if (core === 'gba') type = 'gba';
			else type = 'snes';
			retroCount++;
		} else {
			webglCount++;
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
		if (tags && tags.length) entry.tags = tags;
		if (genre) entry.genre = genre;
		results.push(entry);
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
}

scan();
