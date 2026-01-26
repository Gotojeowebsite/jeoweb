const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, 'Assets');
const OUTFILE = path.join(ROOT, 'games_list.json');

function scan() {
	const results = [];
	if (!fs.existsSync(ASSETS_DIR)) {
		console.error('Assets folder not found:', ASSETS_DIR);
		fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
		return;
	}
	const items = fs.readdirSync(ASSETS_DIR, { withFileTypes: true });
	for (const it of items) {
		if (it.isDirectory()) {
			const idx = path.join(ASSETS_DIR, it.name, 'index.html');
			if (fs.existsSync(idx)) {
                const logoPath = ['logo.jpeg', 'logo.jpg', 'logo.png'].map(logo => path.join('Assets', it.name, logo)).find(logo => fs.existsSync(path.join(ROOT, logo)));
				results.push({
					name: it.name,
					url: `Assets/${it.name}/`,
					category: 'action', // Default category, can be improved
					image: logoPath || 'https://via.placeholder.com/210x120.png?text=No+Logo'
				});
			}
		}
	}
	fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
	console.log('Wrote', OUTFILE, '->', results.length, 'entries');
}

scan();
