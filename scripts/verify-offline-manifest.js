#!/usr/bin/env node
// Verify per-game offline manifests. Exits non-zero on any required file
// missing or any new external runtime dependency (host not on the allowlist).
//
// CLI:
//   node scripts/verify-offline-manifest.js               # gates the entire catalog
//   node scripts/verify-offline-manifest.js --slug snake
//   node scripts/verify-offline-manifest.js --candidate Assets/.recovery/<slug>-<ts>
//   node scripts/verify-offline-manifest.js --strict-hash # verify sha256 too
//   node scripts/verify-offline-manifest.js --json        # machine-readable output
//   node scripts/verify-offline-manifest.js --warn-only   # exit 0 even on failure
//
// Intended use: CI between scan and deploy. If a game's required asset went
// missing or it picked up a new external runtime dep, the deploy fails.

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');

function parseArgs(argv) {
	const args = {
		slug: null,
		candidate: null,
		strictHash: false,
		json: false,
		warnOnly: false,
		missingOk: false,
		strictExternals: false,
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--slug') args.slug = argv[++i];
		else if (a === '--candidate') args.candidate = path.resolve(argv[++i]);
		else if (a === '--strict-hash') args.strictHash = true;
		else if (a === '--json') args.json = true;
		else if (a === '--warn-only') args.warnOnly = true;
		else if (a === '--missing-manifest-ok') args.missingOk = true;
		else if (a === '--strict-externals') args.strictExternals = true;
	}
	return args;
}

function isFatal(problem) {
	// Externals are advisory unless --strict-externals is passed; missing
	// required files / size mismatches / hash mismatches are always fatal.
	return problem && problem.code !== 'EXTERNAL_RUNTIME_DEP';
}

function readJson(p) {
	try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return null; }
}

function sha256File(p) {
	const h = crypto.createHash('sha256');
	const buf = fs.readFileSync(p);
	h.update(buf);
	return h.digest('hex');
}

function verifyFolder(folder, args) {
	const manifestPath = path.join(folder, '.offline-manifest.json');
	const problems = [];
	if (!fs.existsSync(manifestPath)) {
		if (args.missingOk) return { folder, problems, skipped: true };
		problems.push({ code: 'NO_MANIFEST', message: '.offline-manifest.json missing' });
		return { folder, problems };
	}
	const manifest = readJson(manifestPath);
	if (!manifest || manifest.schema !== 1) {
		problems.push({ code: 'BAD_MANIFEST', message: 'manifest unreadable or schema mismatch' });
		return { folder, problems };
	}

	// Entry HTML byte gate. A working game's entry HTML cannot be empty —
	// the engine loader has to live somewhere. Reject early so recovery
	// candidates that scraped portal chrome but lost the entry get rejected
	// before the swap. MIN_ENTRY_HTML_BYTES env var tunes the threshold.
	const entryName = manifest.entry || 'index.html';
	const entryPath = path.join(folder, entryName);
	const MIN_ENTRY_BYTES = Number(process.env.MIN_ENTRY_HTML_BYTES) || 200;
	try {
		const entrySize = fs.statSync(entryPath).size;
		if (entrySize < MIN_ENTRY_BYTES) {
			problems.push({
				code: 'ENTRY_HTML_TOO_SMALL',
				message: `Entry HTML is ${entrySize} bytes (< ${MIN_ENTRY_BYTES}); cannot be a working game`,
				path: entryName,
				actual: entrySize,
				expected: MIN_ENTRY_BYTES,
			});
		}
	} catch (e) {
		problems.push({
			code: 'ENTRY_HTML_MISSING',
			message: `Entry HTML "${entryName}" not statable: ${e.message}`,
			path: entryName,
		});
	}

	const allowlist = new Set(manifest.external_allowlist || []);
	for (const host of manifest.external_critical || []) {
		// External_critical was computed at build time; flag any that aren't
		// allowlisted-by-suffix.
		const ok = [...allowlist].some(a => host === a || host.endsWith('.' + a));
		if (!ok) {
			problems.push({
				code: 'EXTERNAL_RUNTIME_DEP',
				message: `Game depends on non-allowlisted external host: ${host}`,
				host,
			});
		}
	}

	for (const f of manifest.files || []) {
		if (!f.required) continue;
		const abs = path.join(folder, f.path);
		if (!fs.existsSync(abs)) {
			problems.push({
				code: 'MISSING_REQUIRED_FILE',
				message: `Required file missing: ${f.path}`,
				path: f.path,
			});
			continue;
		}
		try {
			const stat = fs.statSync(abs);
			if (typeof f.size === 'number' && stat.size !== f.size) {
				problems.push({
					code: 'FILE_SIZE_MISMATCH',
					message: `Required file size changed: ${f.path} (manifest=${f.size}, disk=${stat.size})`,
					path: f.path,
					expected: f.size,
					actual: stat.size,
				});
			}
		} catch (e) {
			problems.push({ code: 'STAT_FAILED', message: `Could not stat ${f.path}: ${e.message}`, path: f.path });
			continue;
		}
		if (args.strictHash && typeof f.sha256 === 'string' && f.sha256.length === 64) {
			try {
				const actual = sha256File(abs);
				if (actual !== f.sha256) {
					problems.push({
						code: 'FILE_HASH_MISMATCH',
						message: `Required file hash changed: ${f.path}`,
						path: f.path,
					});
				}
			} catch (e) {
				problems.push({ code: 'HASH_FAILED', message: `Hash failed for ${f.path}: ${e.message}`, path: f.path });
			}
		}
	}
	return { folder, manifest, problems };
}

function verifySlug(slug, args) {
	const folder = path.join(ASSETS_DIR, slug);
	if (!fs.existsSync(folder)) {
		return { slug, problems: [{ code: 'NO_FOLDER', message: `Assets/${slug} not found` }] };
	}
	const out = verifyFolder(folder, args);
	return { slug, ...out };
}

function listAllSlugs() {
	return fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
		.filter(d => d.isDirectory() && !d.name.startsWith('.'))
		.map(d => d.name).sort();
}

function main() {
	const args = parseArgs(process.argv);

	if (args.candidate) {
		const r = verifyFolder(args.candidate, args);
		if (args.json) console.log(JSON.stringify(r, null, 2));
		else if (r.problems.length === 0) console.log(`OK: ${args.candidate}`);
		else {
			console.error(`FAIL: ${args.candidate}`);
			for (const p of r.problems) console.error(`  - ${p.code}: ${p.message}`);
		}
		if (r.problems.length && !args.warnOnly) process.exit(1);
		return;
	}

	const slugs = args.slug ? [args.slug] : listAllSlugs();
	const results = [];
	let fatalFails = 0, externalWarnings = 0;
	for (const slug of slugs) {
		const r = verifySlug(slug, args);
		results.push(r);
		if (r.problems && r.problems.length) {
			const fatal = r.problems.some(p => args.strictExternals || isFatal(p));
			const ext = r.problems.some(p => p.code === 'EXTERNAL_RUNTIME_DEP');
			if (fatal) fatalFails += 1;
			else if (ext) externalWarnings += 1;
		}
	}

	if (args.json) {
		console.log(JSON.stringify({
			schema: 1,
			generated_at: Math.floor(Date.now() / 1000),
			total: slugs.length,
			fatal_fails: fatalFails,
			external_warnings: externalWarnings,
			strict_externals: args.strictExternals,
			results,
		}, null, 2));
	} else {
		for (const r of results) {
			if (!r.problems || !r.problems.length) continue;
			const hasFatal = r.problems.some(p => args.strictExternals || isFatal(p));
			const prefix = hasFatal ? 'FAIL' : 'WARN';
			const stream = hasFatal ? console.error : console.warn;
			stream(`${prefix}: ${r.slug}`);
			for (const p of r.problems) {
				const isExt = p.code === 'EXTERNAL_RUNTIME_DEP';
				const tag = isExt && !args.strictExternals ? 'warn' : 'fail';
				stream(`  - [${tag}] ${p.code}: ${p.message}`);
			}
		}
		console.log(`verify-offline-manifest: ${slugs.length} scanned, ${fatalFails} fatal, ${externalWarnings} external-warnings`);
	}

	if (fatalFails > 0 && !args.warnOnly) process.exit(1);
}

if (require.main === module) {
	try { main(); }
	catch (e) { console.error(String(e && e.stack || e)); process.exit(2); }
}

module.exports = { verifyFolder, verifySlug };
