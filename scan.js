const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, 'Assets');
const OUTFILE = path.join(ROOT, 'games_list.json');

// Image extensions to look for (priority order)
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico'];

// Find the best image in a game folder
function findImage(folderPath, folderName) {
	try {
		const files = fs.readdirSync(folderPath);
		const priorityNames = ['logo', 'icon', 'splash', 'thumb', 'thumbnail', folderName.toLowerCase()];

		const imageFiles = files.filter(f => {
			const ext = path.extname(f).toLowerCase();
			return IMAGE_EXTS.includes(ext);
		});

		if (imageFiles.length === 0) return null;

		// Try priority names first
		for (const name of priorityNames) {
			const match = imageFiles.find(f => path.basename(f, path.extname(f)).toLowerCase() === name);
			if (match) return `Assets/${folderName}/${match}`;
		}

		// Fallback: first image found
		return `Assets/${folderName}/${imageFiles[0]}`;
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
	for (const it of items) {
		if (!it.isDirectory()) continue;

		const folderPath = path.join(ASSETS_DIR, it.name);
		const indexPath = path.join(folderPath, 'index.html');

		// Must have index.html
		if (!fs.existsSync(indexPath)) continue;

		const image = findImage(folderPath, it.name);

		results.push({
			name: it.name,
			url: `Assets/${it.name}/`,
			image: image || ''
		});
	}

	results.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
	fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
	console.log(`Wrote ${OUTFILE} -> ${results.length} games`);
}

scan();
