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

// Check if an HTML file uses our local EmulatorJS (SNES/retro game)
function isEmulatorGame(htmlPath) {
	try {
		const content = fs.readFileSync(htmlPath, 'utf-8');
		return content.includes("EJS_pathtodata = '/emulatorjs/'");
	} catch (e) {}
	return false;
}

// Check if an HTML file has the <!--REQUESTED GAME--> marker
function isRequestedGame(htmlPath) {
	try {
		const content = fs.readFileSync(htmlPath, 'utf-8');
		return content.includes('<!--REQUESTED GAME-->');
	} catch (e) {}
	return false;
}

// Find the best image in a game folder (searches all subfolders)
function findImage(folderPath, folderName) {
	try {
		const allImages = collectImages(folderPath, folderPath);
		if (allImages.length === 0) return null;

		const priorityNames = ['logo', 'icon', 'splash', 'thumb', 'thumbnail', folderName.toLowerCase()];

		// Try priority names first (any depth)
		for (const name of priorityNames) {
			const match = allImages.find(f => path.basename(f, path.extname(f)).toLowerCase() === name);
			if (match) return `Assets/${folderName}/${match}`;
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

function scan() {
	const results = [];
	if (!fs.existsSync(ASSETS_DIR)) {
		console.error('Assets folder not found:', ASSETS_DIR);
		fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
		return;
	}

	const items = fs.readdirSync(ASSETS_DIR, { withFileTypes: true });
	let flashCount = 0;
	let snesCount = 0;
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
		const isSnes = !isFlash && isEmulatorGame(htmlFilePath);
		const requested = isRequestedGame(htmlFilePath);

		if (isFlash) flashCount++;
		else if (isSnes) snesCount++;
		else webglCount++;

		const entry = {
			name: it.name,
			url: `Assets/${it.name}/${htmlFile}`,
			image: image || 'notavailable.svg',
			type: isFlash ? 'flash' : isSnes ? 'snes' : 'webgl'
		};
		if (requested) entry.requested = true;
		results.push(entry);
	}

	results.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
	fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
	console.log(`Wrote ${OUTFILE} -> ${results.length} games (${flashCount} Flash, ${snesCount} Retro/SNES, ${webglCount} WebGL)`);
}

scan();
