#!/usr/bin/env node
// scripts/recover-game.js — aggressive single-game recovery.
//
// Pipeline:
//   1. Resolve slug → display name + type (from games_list.json) + health
//      verdict (from game_health.json).
//   2. Discover candidate URLs via search-engines.js, OR use --url if given.
//   3. Score + rank candidates with atomic-swap.js#rankCandidates.
//   4. For each candidate (best score first, fail-fast):
//      a. scrape into Assets/.recovery/<slug>-<ts>/
//      b. validate with verify-offline-manifest.js --candidate
//      c. optionally validate with broken_game_scanner.py --root (gold standard,
//         skipped silently when Playwright is missing — manifest gate still
//         applies)
//      d. on first pass: moveToQuarantine(slug) + swapInCandidate(slug) +
//         rebuild manifest + scan + done.
//   5. On total failure: write to reports/recovery_cooldown.json with backoff
//      and append to reports/recovery_log.jsonl with reason.
//
// CLI:
//   node scripts/recover-game.js <slug>                       # full pipeline
//   node scripts/recover-game.js <slug> --url <portal-url>    # skip search
//   node scripts/recover-game.js <slug> --verbose             # detailed log
//   node scripts/recover-game.js <slug> --ignore-cooldown
//   node scripts/recover-game.js <slug> --max-candidates 4
//   node scripts/recover-game.js <slug> --skip-scanner        # only manifest gate
//   node scripts/recover-game.js <slug> --dry-run             # don't swap

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const REPORTS_DIR = path.join(ROOT, 'reports');
const COOLDOWN_PATH = path.join(REPORTS_DIR, 'recovery_cooldown.json');
const LOG_PATH = path.join(REPORTS_DIR, 'recovery_log.jsonl');

const { discoverCandidates } = require('./recovery/search-engines');
const {
	moveToQuarantine,
	swapInCandidate,
	restoreFromQuarantine,
	reservedCandidateFolder,
	rankCandidates,
	normalizeName,
	nameSimilarity,
} = require('./recovery/atomic-swap');
const { scrapeCandidate } = require('./recovery/scrape-engines');
const { buildForSlug, buildForArbitraryRoot } = require('./build-offline-manifest');
const { verifyFolder } = require('./verify-offline-manifest');
const { processGame: localizeGame } = require('./localize-all-games');

// Cooldown is now hours-based and short by default so transient flakes
// (rate-limited search backend, slow CDN, single bad candidate) don't
// lock a game out for a week. Defaults: 1h, 4h, 12h, 24h, 72h.
// Some failure reasons have shorter / longer overrides — see
// pickCooldownSeconds below.
const COOLDOWN_BACKOFF_SECONDS = [3600, 14400, 43200, 86400, 259200];
const COOLDOWN_BY_REASON = {
	// Sources may refresh tomorrow; short backoff and try again.
	no_candidates_found: [3600, 14400, 86400, 86400, 259200],
	// Captcha/interstitial — likely the rate-limit clears in an hour.
	all_candidates_blocked_by_captcha: [3600, 3600, 14400, 43200, 86400],
	// Real "this isn't the same game" failures — long backoff, the source
	// pool isn't going to magically improve.
	shape_mismatch: [86400, 259200, 604800, 604800, 1209600],
	// Manifest verification failed — usually means missing critical files
	// in every candidate, real fix needed.
	verify_failed: [86400, 259200, 604800, 604800, 1209600],
	// Validation gate (scanner) said the candidate still doesn't work —
	// might be transient, retry sooner than verify_failed.
	scanner_failed: [14400, 43200, 86400, 259200, 604800],
	// Generic "everything failed" — default backoff.
	all_candidates_failed: COOLDOWN_BACKOFF_SECONDS,
};

function pickCooldownSeconds(reason, attempts) {
	const ladder = COOLDOWN_BY_REASON[reason] || COOLDOWN_BACKOFF_SECONDS;
	const idx = Math.min(attempts - 1, ladder.length - 1);
	return ladder[Math.max(idx, 0)] || ladder[ladder.length - 1];
}

function parseArgs(argv) {
	const args = {
		slug: null,
		url: null,
		verbose: false,
		ignoreCooldown: false,
		maxCandidates: 15,
		skipScanner: false,
		dryRun: false,
		perCandidateTimeoutMs: 180_000,
		searchTimeoutMs: 10_000,
		fuzzy: true,           // enabled by default; --no-fuzzy disables
		fuzzyThreshold: 0.55,
		strictShape: false,    // shape-check exact matches too (default off)
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (!a.startsWith('--') && !args.slug) { args.slug = a; continue; }
		if (a === '--url') args.url = argv[++i];
		else if (a === '--verbose' || a === '-v') args.verbose = true;
		else if (a === '--ignore-cooldown') args.ignoreCooldown = true;
		else if (a === '--max-candidates') args.maxCandidates = Number(argv[++i]) || args.maxCandidates;
		else if (a === '--skip-scanner') args.skipScanner = true;
		else if (a === '--dry-run') args.dryRun = true;
		else if (a === '--candidate-timeout-ms') args.perCandidateTimeoutMs = Number(argv[++i]) || args.perCandidateTimeoutMs;
		else if (a === '--search-timeout-ms') args.searchTimeoutMs = Number(argv[++i]) || args.searchTimeoutMs;
		else if (a === '--no-fuzzy') args.fuzzy = false;
		else if (a === '--fuzzy-threshold') args.fuzzyThreshold = Number(argv[++i]) || args.fuzzyThreshold;
		else if (a === '--strict-shape') args.strictShape = true;
	}
	return args;
}

function readJsonSafe(p, fallback) {
	try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return fallback; }
}

function ensureReports() {
	try { fs.mkdirSync(REPORTS_DIR, { recursive: true }); } catch {}
}

function appendLog(entry) {
	ensureReports();
	try { fs.appendFileSync(LOG_PATH, JSON.stringify({ ts: Math.floor(Date.now() / 1000), ...entry }) + '\n'); }
	catch {}
}

function getCooldown(slug) {
	const data = readJsonSafe(COOLDOWN_PATH, {});
	return data[slug] || null;
}

function updateCooldown(slug, patch) {
	ensureReports();
	const data = readJsonSafe(COOLDOWN_PATH, {});
	const prev = data[slug] || { attempts: 0 };
	const next = { ...prev, ...patch };
	data[slug] = next;
	try { fs.writeFileSync(COOLDOWN_PATH, JSON.stringify(data, null, 2)); } catch {}
}

function clearCooldown(slug) {
	const data = readJsonSafe(COOLDOWN_PATH, {});
	if (data[slug]) {
		delete data[slug];
		try { fs.writeFileSync(COOLDOWN_PATH, JSON.stringify(data, null, 2)); } catch {}
	}
}

function isCooldownActive(slug) {
	const entry = getCooldown(slug);
	if (!entry || !entry.next_eligible) return false;
	return Math.floor(Date.now() / 1000) < Number(entry.next_eligible);
}

// Map the human-readable failure reason from recover() / tryCandidate() onto
// the structured COOLDOWN_BY_REASON keys. Anything not matched falls through
// to the default ladder.
function classifyCooldownReason(reason) {
	const r = String(reason || '').toLowerCase();
	if (r.includes('no candidates') || r.includes('no_candidates')) return 'no_candidates_found';
	if (r.includes('captcha') || r.includes('blocked_by_captcha')) return 'all_candidates_blocked_by_captcha';
	if (r.includes('shape_mismatch') || r.includes('not the same game')) return 'shape_mismatch';
	if (r.includes('verify_failed') || r.includes('manifest verify')) return 'verify_failed';
	if (r.includes('scanner_failed') || r.includes('scanner:')) return 'scanner_failed';
	return 'all_candidates_failed';
}

function bumpCooldownOnFailure(slug, reason) {
	const prev = getCooldown(slug) || { attempts: 0 };
	const attempts = (Number(prev.attempts) || 0) + 1;
	const reasonKey = classifyCooldownReason(reason);
	const seconds = pickCooldownSeconds(reasonKey, attempts);
	const nextEligible = Math.floor(Date.now() / 1000) + seconds;
	updateCooldown(slug, {
		attempts,
		last_attempt: Math.floor(Date.now() / 1000),
		next_eligible: nextEligible,
		last_error: String(reason || '').slice(0, 320),
		last_reason: reasonKey,
	});
}

function lookupCatalog(slug) {
	const catalog = readJsonSafe(path.join(ROOT, 'games_list.json'), []);
	if (Array.isArray(catalog)) {
		return catalog.find(g => g && g.name === slug) || null;
	}
	return null;
}

function lookupHealth(slug) {
	const data = readJsonSafe(path.join(ROOT, 'game_health.json'), null);
	if (!data || !data.games) return null;
	return data.games[slug] || null;
}

function displayName(slug, catalogEntry) {
	if (catalogEntry && catalogEntry.title) return String(catalogEntry.title);
	return String(slug)
		.replace(/[-_]+/g, ' ')
		.replace(/\b([a-z])/g, (m, c) => c.toUpperCase())
		.trim();
}

function inferType(catalogEntry) {
	if (catalogEntry && catalogEntry.type) return String(catalogEntry.type);
	return 'webgl';
}

function runScannerOnCandidate(candidateRoot, slug, verbose) {
	return new Promise((resolve) => {
		// Try to invoke the Playwright scanner on the candidate folder.
		// Resolve { ok, reason, skipped } — skipped=true means Playwright isn't
		// available and the caller should rely on the manifest gate alone.
		const args = [
			path.join(ROOT, 'broken_game_scanner.py'),
			'--root', candidateRoot,
			'--hard-timeout-seconds', '90',
			'--wait-seconds', '6',
			'--report-json', path.join(REPORTS_DIR, `recovery_scan_${slug}.json`),
			'--broken-json', path.join(REPORTS_DIR, `recovery_broken_${slug}.json`),
			'--broken-log', path.join(REPORTS_DIR, `recovery_broken_${slug}.txt`),
			'--working-log', path.join(REPORTS_DIR, `recovery_working_${slug}.txt`),
			'--checked-log', path.join(REPORTS_DIR, `recovery_checked_${slug}.txt`),
			'--review-log', path.join(REPORTS_DIR, `recovery_review_${slug}.txt`),
			'--state-file', path.join(REPORTS_DIR, `recovery_state_${slug}.json`),
			'--port', String(9100 + Math.floor(Math.random() * 800)),
		];
		ensureReports();
		const proc = spawn('python3', args, { cwd: ROOT, stdio: verbose ? 'inherit' : 'ignore' });
		let settled = false;
		const watchdog = setTimeout(() => {
			if (settled) return;
			settled = true;
			try { proc.kill('SIGKILL'); } catch {}
			resolve({ ok: false, reason: 'scanner timeout (10min)' });
		}, 600_000);
		proc.on('error', (err) => {
			if (settled) return;
			settled = true;
			clearTimeout(watchdog);
			// ENOENT = python3 missing; treat as skipped not fail.
			if (err && err.code === 'ENOENT') resolve({ ok: true, skipped: true, reason: 'python3 not available' });
			else resolve({ ok: false, reason: `scanner spawn error: ${err.message}` });
		});
		proc.on('exit', (code) => {
			if (settled) return;
			settled = true;
			clearTimeout(watchdog);
			if (code === 0) {
				// Parse the report to see if any games are broken.
				const reportPath = path.join(REPORTS_DIR, `recovery_scan_${slug}.json`);
				const report = readJsonSafe(reportPath, []);
				const broken = Array.isArray(report) ? report.filter(g => g.status === 'broken') : [];
				if (broken.length) {
					const lead = broken[0];
					const issue = (lead.critical_issues && lead.critical_issues[0]) || {};
					return resolve({ ok: false, reason: `scanner: ${issue.code || 'broken'} ${issue.message || ''}`.trim() });
				}
				return resolve({ ok: true });
			}
			// Non-zero exit. If Playwright is missing the import itself will fail
			// — treat as skipped so we don't loop forever in dev environments.
			resolve({ ok: true, skipped: true, reason: `scanner exit code ${code} (likely missing playwright)` });
		});
	});
}

// Captcha / interstitial detection. If a scraped candidate's entry HTML
// contains any of these patterns, it's a Cloudflare/datadome/etc. challenge
// page, not the game. Abort early so the recovery engine moves on instead
// of validating a captcha page as a "working" candidate.
const BLOCKER_PATTERNS_PATH = path.join(__dirname, 'recovery', 'blocker-patterns.json');
let _blockerPatternsCache = null;
function loadBlockerPatterns() {
	if (_blockerPatternsCache) return _blockerPatternsCache;
	try {
		const raw = JSON.parse(fs.readFileSync(BLOCKER_PATTERNS_PATH, 'utf-8'));
		const list = Array.isArray(raw.patterns) ? raw.patterns : [];
		_blockerPatternsCache = list.map((p) => new RegExp(p, 'i'));
	} catch {
		_blockerPatternsCache = [];
	}
	return _blockerPatternsCache;
}

function detectBlocker(candidateRoot) {
	const patterns = loadBlockerPatterns();
	if (!patterns.length) return null;
	let html = '';
	try {
		// Find the entry HTML (first .html file by lexical order, or index.html).
		const files = fs.readdirSync(candidateRoot);
		const entry = files.find((f) => /^index\.html?$/i.test(f))
			|| files.find((f) => /\.html?$/i.test(f));
		if (!entry) return null;
		html = fs.readFileSync(path.join(candidateRoot, entry), 'utf-8');
		// Keep the comparison budget small; captcha text is in the first KB.
		if (html.length > 16384) html = html.slice(0, 16384);
	} catch {
		return null;
	}
	for (const re of patterns) {
		const m = re.exec(html);
		if (m) return { pattern: re.source, sample: m[0].slice(0, 80) };
	}
	return null;
}

// Shape cross-check for fuzzy candidates. Before a fuzzy-match swap, verify
// the candidate folder LOOKS like the same game we're replacing — comparable
// file count, comparable total bytes (within ±25%), and at least one HTML
// signature string from the quarantined original appears in the candidate's
// entry HTML. This catches cases where the scanner happily plays a totally
// different game that happened to load successfully under the wrong slug.
//
// Pass `quarantineDir` if the original folder was just moved aside; we use
// its shape as the comparison target. If no quarantine snapshot exists,
// we fall back to whatever's currently in Assets/<slug>/ (the pre-swap
// state, since we're called before moveToQuarantine).
function _folderShape(folder) {
	const out = { fileCount: 0, totalBytes: 0, signatures: new Set() };
	if (!folder || !fs.existsSync(folder)) return out;
	const walk = (dir) => {
		let entries;
		try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
		for (const e of entries) {
			if (e.name.startsWith('.')) continue;
			const p = path.join(dir, e.name);
			if (e.isDirectory()) walk(p);
			else if (e.isFile()) {
				out.fileCount += 1;
				try { out.totalBytes += fs.statSync(p).size; } catch {}
			}
		}
	};
	walk(folder);
	// Pull a few distinctive signature strings from the entry HTML for the
	// "this is the same game" check. Includes <title>, EJS_core / EJS_gameUrl,
	// any named globals, hashed Unity build filenames.
	try {
		const files = fs.readdirSync(folder);
		const entry = files.find((f) => /^index\.html?$/i.test(f))
			|| files.find((f) => /\.html?$/i.test(f));
		if (entry) {
			const html = fs.readFileSync(path.join(folder, entry), 'utf-8').slice(0, 32768);
			const titleM = html.match(/<title>([^<]{2,80})<\/title>/i);
			if (titleM) out.signatures.add(`title:${titleM[1].trim().toLowerCase()}`);
			const ejsCoreM = html.match(/EJS_core\s*=\s*["']([a-z0-9_]+)["']/i);
			if (ejsCoreM) out.signatures.add(`ejs_core:${ejsCoreM[1].toLowerCase()}`);
			const ejsGameM = html.match(/EJS_gameUrl\s*=\s*["']([^"']+)["']/i);
			if (ejsGameM) out.signatures.add(`ejs_url:${path.basename(ejsGameM[1]).toLowerCase()}`);
			const unityBuildM = html.match(/Build\/([A-Za-z0-9._-]+)\.(?:wasm|data|framework\.js|loader\.js)/);
			if (unityBuildM) out.signatures.add(`unity:${unityBuildM[1].toLowerCase()}`);
		}
	} catch {}
	return out;
}

function assertSameGameShape(candidateRoot, slug, quarantineDir) {
	const candidate = _folderShape(candidateRoot);
	const referenceFolder = quarantineDir && fs.existsSync(quarantineDir)
		? quarantineDir
		: path.join(ASSETS_DIR, slug);
	const reference = _folderShape(referenceFolder);

	// If we have no reference (fresh slug, never been recovered), we can't
	// shape-check — fall back to "trust the scanner gate".
	if (!reference.fileCount) {
		return { ok: true, reason: 'no_reference_shape' };
	}

	// File-count comparison: within a factor of 4 (some recoveries
	// legitimately swap a 30-file game for a 7-file rebuild).
	const ratio = candidate.fileCount > 0
		? reference.fileCount / candidate.fileCount
		: 999;
	if (ratio > 4 || ratio < 0.25) {
		return {
			ok: false,
			reason: 'file_count_diverged',
			detail: `candidate has ${candidate.fileCount} files vs reference ${reference.fileCount}`,
		};
	}

	// Total-bytes comparison: candidate within ±60% of reference. We allow a
	// wider range than the plan's ±25% because fuzzy matches often capture
	// different cover-art / different runtime version.
	if (reference.totalBytes > 0 && candidate.totalBytes > 0) {
		const bytesRatio = candidate.totalBytes / reference.totalBytes;
		if (bytesRatio > 2.5 || bytesRatio < 0.4) {
			return {
				ok: false,
				reason: 'byte_size_diverged',
				detail: `candidate=${candidate.totalBytes}B reference=${reference.totalBytes}B (ratio=${bytesRatio.toFixed(2)})`,
			};
		}
	}

	// Signature overlap: at least one of {title, ejs_core, ejs_url, unity}
	// signatures should match if either folder has them. Title-only match
	// is enough; this is a "looks like the same game" gate, not an exact one.
	if (reference.signatures.size > 0 && candidate.signatures.size > 0) {
		let overlap = 0;
		for (const s of candidate.signatures) if (reference.signatures.has(s)) overlap += 1;
		if (overlap === 0) {
			return {
				ok: false,
				reason: 'no_signature_overlap',
				detail: `candidate sigs=[${[...candidate.signatures].join(',')}] reference sigs=[${[...reference.signatures].join(',')}]`,
			};
		}
	}

	return { ok: true, reason: 'shape_match' };
}

// Write .recovery-provenance.json into the swapped folder so we always know
// where a game came from (source URL, search engine, exact vs fuzzy match,
// similarity score, timestamps). One-command rollback uses the quarantine
// snapshot; this file is for humans + audit trail.
function writeRecoveryProvenance(slug, cand, candidateRoot, shapeCheck) {
	try {
		const target = path.join(ASSETS_DIR, slug);
		const provenance = {
			schema: 1,
			slug,
			recovered_at: Math.floor(Date.now() / 1000),
			source_url: cand.url,
			source_engine: cand.source,
			match_type: cand.match_type || 'exact',
			name_similarity: typeof cand.name_similarity === 'number' ? cand.name_similarity : null,
			candidate_score: cand.score,
			shape_check: shapeCheck || null,
		};
		fs.writeFileSync(
			path.join(target, '.recovery-provenance.json'),
			JSON.stringify(provenance, null, 2),
		);
	} catch (e) {
		// Provenance is nice-to-have; never block a swap on its failure.
		console.warn(`[${slug}] failed to write .recovery-provenance.json: ${e.message}`);
	}
}

async function tryCandidate(cand, args, ctx) {
	const candidateRoot = reservedCandidateFolder(ctx.slug);
	const result = {
		url: cand.url,
		source: cand.source,
		score: cand.score,
		match_type: cand.match_type || 'exact',
		name_similarity: typeof cand.name_similarity === 'number' ? cand.name_similarity : null,
		candidate_root: candidateRoot,
	};
	if (args.verbose) {
		const tag = cand.match_type === 'fuzzy' ? ` fuzzy=${(cand.name_similarity ?? 0).toFixed(2)}` : '';
		console.log(`  → candidate (${cand.source}, score=${cand.score}${tag}): ${cand.url}`);
	}

	let scrape;
	try {
		scrape = await scrapeCandidate({
			url: cand.url,
			candidateRoot,
			gameType: ctx.gameType,
			timeoutMs: args.perCandidateTimeoutMs,
			verbose: args.verbose,
		});
	} catch (e) {
		scrape = { ok: false, error: String(e && e.message || e), asset_count: 0 };
	}
	result.scrape = scrape;
	if (!scrape.ok || scrape.asset_count < 2) {
		if (args.verbose) console.log(`    × scrape failed (${scrape.error || `assets=${scrape.asset_count}`})`);
		// Clean up the empty/failed candidate folder.
		try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
		result.outcome = 'scrape_failed';
		return result;
	}

	// Captcha / interstitial check. If the scrape captured a Cloudflare
	// challenge or datadome block-page, the asset_count > 2 check above
	// might still pass (the page has chrome/CSS), but it's NOT the game.
	// Detect early and skip to the next candidate.
	const blocker = detectBlocker(candidateRoot);
	if (blocker) {
		if (args.verbose) console.log(`    × blocker detected: ${blocker.pattern} (sample="${blocker.sample}")`);
		try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
		result.outcome = 'blocked_by_captcha';
		result.error = `blocker_pattern: ${blocker.pattern}`;
		return result;
	}

	// Build a manifest in the candidate root.
	try {
		buildForArbitraryRoot(candidateRoot, ctx.slug, {});
	} catch (e) {
		if (args.verbose) console.log(`    × manifest build failed: ${e.message}`);
		try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
		result.outcome = 'manifest_build_failed';
		result.error = e.message;
		return result;
	}

	const verify = verifyFolder(candidateRoot, { strictHash: false });
	result.verify = { problems: verify.problems };
	if (verify.problems && verify.problems.length) {
		if (args.verbose) console.log(`    × manifest verify failed: ${verify.problems[0].code}`);
		try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
		result.outcome = 'verify_failed';
		return result;
	}

	// Shape cross-check. ALWAYS for fuzzy candidates; skipped for exact
	// matches unless --strict-shape is set (an exact-URL hit from a trusted
	// portal is almost always the same game, and aggressive shape-checking
	// rejects legitimate engine-version refreshes).
	if (cand.match_type === 'fuzzy' || args.strictShape) {
		// Shape check needs a reference. Pass undefined as quarantineDir
		// since we haven't moved yet — _folderShape falls back to the
		// current Assets/<slug>/ which is exactly the pre-swap reference.
		const shape = assertSameGameShape(candidateRoot, ctx.slug, undefined);
		result.shape_check = shape;
		if (!shape.ok) {
			if (args.verbose) console.log(`    × shape_mismatch: ${shape.reason} — ${shape.detail || ''}`);
			try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
			result.outcome = 'shape_mismatch';
			result.error = shape.reason + (shape.detail ? `: ${shape.detail}` : '');
			return result;
		}
	}

	if (!args.skipScanner) {
		const scan = await runScannerOnCandidate(candidateRoot, ctx.slug, args.verbose);
		result.scanner = scan;
		if (!scan.ok) {
			if (args.verbose) console.log(`    × scanner: ${scan.reason}`);
			try { fs.rmSync(candidateRoot, { recursive: true, force: true }); } catch {}
			result.outcome = 'scanner_failed';
			return result;
		}
		if (scan.skipped && args.verbose) console.log(`    ⚠ scanner skipped: ${scan.reason}`);
	}

	if (args.dryRun) {
		if (args.verbose) console.log(`    ✓ candidate passes — DRY RUN, skipping swap`);
		result.outcome = 'dry_run_pass';
		return result;
	}

	// Atomic swap.
	let quarantineDir = null;
	try {
		quarantineDir = moveToQuarantine(ctx.slug);
		result.quarantine = quarantineDir;
	} catch (e) {
		result.outcome = 'quarantine_failed';
		result.error = e.message;
		return result;
	}

	try {
		swapInCandidate(ctx.slug, candidateRoot);
	} catch (e) {
		// Restore.
		if (quarantineDir) {
			try { restoreFromQuarantine(ctx.slug, quarantineDir); } catch {}
		}
		result.outcome = 'swap_failed';
		result.error = e.message;
		return result;
	}

	// Write provenance file so the swapped folder always carries a record of
	// where it came from (humans + audit trail + the future post-swap
	// re-validation gauntlet that ties match_type back to outcome).
	writeRecoveryProvenance(ctx.slug, cand, candidateRoot, result.shape_check || null);

	// Post-swap finalization: localize, manifest, scan refresh.
	try { localizeGame(ctx.slug, { apply: true }); } catch {}
	try { buildForSlug(ctx.slug, {}); } catch {}
	// Strip <!--GAME BROKEN--> markers in the new folder.
	try {
		const liveFolder = path.join(ASSETS_DIR, ctx.slug);
		for (const f of fs.readdirSync(liveFolder)) {
			if (!/\.html?$/i.test(f)) continue;
			const p = path.join(liveFolder, f);
			let txt;
			try { txt = fs.readFileSync(p, 'utf-8'); } catch { continue; }
			const stripped = txt.replace(/<!--\s*GAME\s+BROKEN\s*-->\s*\n?/gi, '');
			if (stripped !== txt) fs.writeFileSync(p, stripped);
		}
	} catch {}

	clearCooldown(ctx.slug);
	result.outcome = 'recovered';
	return result;
}

async function recover(slug, args) {
	const catalogEntry = lookupCatalog(slug);
	const healthEntry = lookupHealth(slug);
	const ctx = {
		slug,
		name: displayName(slug, catalogEntry),
		gameType: inferType(catalogEntry),
		healthVerdict: healthEntry && healthEntry.verdict,
	};

	const log = { slug, name: ctx.name, type: ctx.gameType, ts: Math.floor(Date.now() / 1000), candidates_tried: [] };

	if (!args.ignoreCooldown && isCooldownActive(slug) && !args.url) {
		const cd = getCooldown(slug);
		console.log(`[${slug}] cooldown active until ${new Date(cd.next_eligible * 1000).toISOString()} (attempts=${cd.attempts}). Skip with --ignore-cooldown to retry.`);
		appendLog({ ...log, outcome: 'cooldown_skipped' });
		return { slug, outcome: 'cooldown_skipped' };
	}

	// Walk candidates from one or more discovery passes. Manual --url shortcut
	// builds a single one-element exact-match list. Otherwise, exact pass
	// first; if zero exact candidates pass, fall back to fuzzy (when --fuzzy).
	const blockerHits = [];
	const tryCandidateList = async (candidates, modeLabel) => {
		for (const cand of candidates) {
			// Fuzzy threshold gate. cand.name_similarity was filled by
			// rankCandidates; reject below the configured floor before we
			// spend time scraping.
			if (cand.match_type === 'fuzzy' && typeof cand.name_similarity === 'number'
				&& cand.name_similarity < args.fuzzyThreshold) {
				log.candidates_tried.push({
					url: cand.url, source: cand.source, score: cand.score,
					match_type: 'fuzzy', name_similarity: cand.name_similarity,
					outcome: 'below_fuzzy_threshold',
				});
				continue;
			}
			const r = await tryCandidate(cand, args, ctx);
			log.candidates_tried.push({
				url: r.url, source: r.source, score: r.score,
				match_type: r.match_type, name_similarity: r.name_similarity,
				outcome: r.outcome,
				error: r.error,
				asset_count: r.scrape && r.scrape.asset_count,
				shape_check: r.shape_check || null,
			});
			if (r.outcome === 'blocked_by_captcha') blockerHits.push(r);
			if (r.outcome === 'recovered' || r.outcome === 'dry_run_pass') {
				console.log(`[${slug}] ${r.outcome === 'dry_run_pass' ? 'PASS (dry run)' : 'RECOVERED'} from ${cand.url} (${modeLabel})`);
				appendLog({
					...log,
					outcome: r.outcome,
					mode: modeLabel,
					source_url: r.url,
					match_type: r.match_type,
					name_similarity: r.name_similarity,
					asset_count: r.scrape && r.scrape.asset_count,
					captured_bytes: r.scrape && r.scrape.captured_bytes,
					engine: r.scrape && r.scrape.engine,
				});
				return { slug, outcome: r.outcome, source_url: r.url, match_type: r.match_type };
			}
		}
		return null;
	};

	// ---- Manual override path: single URL provided ----
	if (args.url) {
		const candidates = [{
			url: args.url, source: 'manual', title: '', snippet: '',
			score: 1000, match_type: 'exact', name_similarity: 1,
		}];
		const out = await tryCandidateList(candidates, 'manual');
		if (out) return out;
		bumpCooldownOnFailure(slug, 'manual url failed');
		appendLog({ ...log, outcome: 'manual_url_failed' });
		return { slug, outcome: 'manual_url_failed' };
	}

	// ---- Exact-name pass ----
	console.log(`[${slug}] discovering candidates for "${ctx.name}" (${ctx.gameType})…`);
	const exactHits = await discoverCandidates({ name: ctx.name, type: ctx.gameType }, { timeoutMs: args.searchTimeoutMs });
	const exactCandidates = rankCandidates(exactHits, ctx.name, args.maxCandidates);
	console.log(`[${slug}] exact pass: ${exactHits.length} raw hits → ${exactCandidates.length} ranked`);

	const exactOutcome = await tryCandidateList(exactCandidates, 'exact');
	if (exactOutcome) return exactOutcome;

	// ---- Fuzzy fallback ----
	let fuzzyCandidates = [];
	if (args.fuzzy) {
		const normalized = normalizeName(ctx.name);
		console.log(`[${slug}] exact failed — running fuzzy expansion for "${normalized}"`);
		const fuzzyHits = await discoverCandidates(
			{ name: normalized, type: ctx.gameType },
			{ timeoutMs: args.searchTimeoutMs, fuzzy: true },
		);
		// Drop hits whose host is the same as the canonical site we're trying
		// to recover (no point re-scraping the broken copy from itself).
		fuzzyCandidates = rankCandidates(fuzzyHits, ctx.name, args.maxCandidates);
		console.log(`[${slug}] fuzzy pass: ${fuzzyHits.length} raw hits → ${fuzzyCandidates.length} ranked`);

		const fuzzyOutcome = await tryCandidateList(fuzzyCandidates, 'fuzzy');
		if (fuzzyOutcome) return fuzzyOutcome;
	}

	// ---- All failed ----
	const totalTried = exactCandidates.length + fuzzyCandidates.length;
	if (totalTried === 0) {
		bumpCooldownOnFailure(slug, 'no candidates found');
		appendLog({ ...log, outcome: 'no_candidates' });
		console.log(`[${slug}] no candidates found.`);
		return { slug, outcome: 'no_candidates' };
	}
	// Distinguish "all blocked by captcha" from generic failure for smarter
	// cooldown — captcha gets a shorter retry than verify_failed.
	const allBlocked = blockerHits.length > 0 && blockerHits.length === totalTried;
	const failureReason = allBlocked
		? 'all_candidates_blocked_by_captcha'
		: `${totalTried} candidates all failed`;
	bumpCooldownOnFailure(slug, failureReason);
	appendLog({ ...log, outcome: 'all_candidates_failed', exact_count: exactCandidates.length, fuzzy_count: fuzzyCandidates.length });
	console.log(`[${slug}] all ${totalTried} candidates failed.`);
	return { slug, outcome: 'all_candidates_failed', candidates_tried: log.candidates_tried };
}

async function main() {
	const args = parseArgs(process.argv);
	if (!args.slug) {
		console.error('Usage: node scripts/recover-game.js <slug> [--url <url>] [--verbose]');
		process.exit(2);
	}
	const out = await recover(args.slug, args);
	if (out.outcome !== 'recovered' && out.outcome !== 'dry_run_pass') process.exit(1);
}

if (require.main === module) {
	main().catch((err) => {
		console.error(String(err && err.stack || err));
		process.exit(2);
	});
}

module.exports = { recover };
