// scripts/recovery/atomic-swap.js
//
// Helpers for the recovery engine to safely move a candidate folder into
// Assets/<slug>/ without ever leaving the live folder in a half-fixed state.
//
//   moveToQuarantine(slug)       -> Assets/<slug> -> Assets/.quarantine/<slug>-<ts>
//   swapInCandidate(slug, candidateRoot)
//   restoreFromQuarantine(slug, quarantinePath)
//   loadReputation()             -> { trusted: {host: score}, blocked: [regex], default_score }
//   scoreCandidate(url, name?)   -> numeric reputation score (higher = better)

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const QUARANTINE_DIR = path.join(ASSETS_DIR, '.quarantine');
const RECOVERY_DIR = path.join(ASSETS_DIR, '.recovery');
const REPUTATION_PATH = path.join(__dirname, 'domain-reputation.json');

function nowStamp() {
	const d = new Date();
	const pad = n => String(n).padStart(2, '0');
	return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}-${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
}

function ensureDirs() {
	for (const d of [QUARANTINE_DIR, RECOVERY_DIR]) {
		try { fs.mkdirSync(d, { recursive: true }); } catch {}
	}
}

function copyDirSync(src, dst) {
	fs.mkdirSync(dst, { recursive: true });
	for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
		const sp = path.join(src, ent.name);
		const dp = path.join(dst, ent.name);
		if (ent.isDirectory()) copyDirSync(sp, dp);
		else if (ent.isSymbolicLink()) {
			try { fs.symlinkSync(fs.readlinkSync(sp), dp); }
			catch { fs.copyFileSync(sp, dp); }
		}
		else fs.copyFileSync(sp, dp);
	}
}

function rmSync(p) {
	try { fs.rmSync(p, { recursive: true, force: true }); } catch {}
}

function safeMove(src, dst) {
	// Try a fast rename; if it crosses devices/filesystems, fall back to copy+rm.
	try {
		fs.renameSync(src, dst);
		return;
	} catch (e) {
		if (e.code !== 'EXDEV' && e.code !== 'ENOTEMPTY' && e.code !== 'EPERM') throw e;
	}
	copyDirSync(src, dst);
	rmSync(src);
}

function moveToQuarantine(slug) {
	ensureDirs();
	const folder = path.join(ASSETS_DIR, slug);
	if (!fs.existsSync(folder)) return null;
	const stamp = nowStamp();
	const dst = path.join(QUARANTINE_DIR, `${slug}-${stamp}`);
	safeMove(folder, dst);
	return dst;
}

function swapInCandidate(slug, candidateRoot) {
	ensureDirs();
	const target = path.join(ASSETS_DIR, slug);
	if (fs.existsSync(target)) {
		throw new Error(`Target Assets/${slug} still exists — call moveToQuarantine first`);
	}
	if (!fs.existsSync(candidateRoot)) {
		throw new Error(`Candidate folder missing: ${candidateRoot}`);
	}
	safeMove(candidateRoot, target);
	return target;
}

function restoreFromQuarantine(slug, quarantinePath) {
	const target = path.join(ASSETS_DIR, slug);
	if (fs.existsSync(target)) rmSync(target);
	safeMove(quarantinePath, target);
	return target;
}

function reservedCandidateFolder(slug) {
	ensureDirs();
	return path.join(RECOVERY_DIR, `${slug}-${nowStamp()}`);
}

// ----- Reputation -----------------------------------------------------------
let _reputationCache = null;
function loadReputation() {
	if (_reputationCache) return _reputationCache;
	try {
		const raw = JSON.parse(fs.readFileSync(REPUTATION_PATH, 'utf-8'));
		const trusted = raw.trusted || {};
		// Compile each pattern individually so a single malformed entry
		// doesn't disable the whole filter list.
		const compileEach = (list) => {
			const out = [];
			for (const p of (list || [])) {
				try { out.push(new RegExp(p, 'i')); }
				catch (e) { console.warn(`domain-reputation: skipping invalid pattern "${p}": ${e.message}`); }
			}
			return out;
		};
		_reputationCache = {
			trusted,
			blocked: compileEach(raw.blocked),
			// `disallow` is the intent-tagged poison list. Same matching rules
			// as `blocked` but reserved for portals that started serving
			// trojanized copies. Combined into one "exclude" pool at runtime.
			disallow: compileEach(raw.disallow),
			default_score: Number(raw.default_score) || 0,
		};
	} catch {
		_reputationCache = { trusted: {}, blocked: [], disallow: [], default_score: 0 };
	}
	return _reputationCache;
}

function hostFor(url) {
	try {
		let u = url;
		if (u && u.startsWith('//')) u = 'https:' + u;
		return new URL(u).hostname.toLowerCase();
	} catch { return null; }
}

function scoreCandidate(url, name) {
	const rep = loadReputation();
	const host = hostFor(url);
	if (!host) return -1000;
	for (const re of rep.blocked) if (re.test(host) || re.test(url)) return -1000;
	for (const re of rep.disallow) if (re.test(host) || re.test(url)) return -1000;
	let score = rep.default_score;
	if (rep.trusted[host] != null) score = rep.trusted[host];
	else {
		// Match longest suffix.
		let best = 0;
		for (const [h, s] of Object.entries(rep.trusted)) {
			if (host === h || host.endsWith('.' + h)) {
				if (h.length > best) { best = h.length; score = s; }
			}
		}
	}
	// Bonus if the name appears in the URL path.
	if (name) {
		const lc = url.toLowerCase();
		const tok = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
		if (tok && lc.includes(tok)) score += 10;
		const parts = name.toLowerCase().split(/\s+/).filter(p => p.length > 2);
		for (const p of parts) {
			if (lc.includes(p)) score += 2;
		}
	}
	// URL-pattern scoring: canonical `/play/<slug>` or `/games/<slug>` URLs
	// score higher than landing pages, category indexes, or affiliate hops.
	if (/\/(play|game|games|embed)\/[a-z0-9][a-z0-9-]+/i.test(url)) score += 8;
	if (/\/(index|home|play)\.html?(?:[?#]|$)/i.test(url)) score += 3;
	// Penalize tracking-flavored URLs aggressively.
	if (/\b(ads?|track|popup|redirect|click|sponsor|aff)\b/i.test(url)) score -= 20;
	if (/[?&](utm_|fbclid|gclid|aff(?:id|src)?=|partner=|ref=)/i.test(url)) score -= 8;
	return score;
}

// ----- Fuzzy name matching --------------------------------------------------
// When the exact-name search returns nothing usable, callers can fall back to
// a fuzzy expansion. Two helpers:
//   normalizeName  -> canonical form (lowercase, strip articles, strip version
//                     suffixes, collapse roman numerals to digits).
//   nameSimilarity -> 0..1 combining token-set Jaccard and Damerau-Levenshtein
//                     on the normalized forms. Word-order differences
//                     ("Snake Battle 2" vs "Battle Snake 2") still match.

const _LEADING_ARTICLES_RE = /^(?:the|a|an)\s+/i;
const _TRAILING_VERSION_RE = /[\s\-_]*(?:v\d+(?:\.\d+)*|hd|remastered|deluxe|edition|online|unblocked|html5|game)\s*$/i;
const _PUNCT_RE = /[^a-z0-9\s]+/g;
const _ROMAN_MAP = { 'i': '1', 'ii': '2', 'iii': '3', 'iv': '4', 'v': '5', 'vi': '6', 'vii': '7', 'viii': '8', 'ix': '9', 'x': '10' };

function normalizeName(s) {
	if (!s) return '';
	let out = String(s).toLowerCase().trim();
	out = out.replace(_LEADING_ARTICLES_RE, '');
	// Two passes of trailing-suffix stripping (e.g. "Foo HD Online").
	for (let i = 0; i < 3; i++) {
		const stripped = out.replace(_TRAILING_VERSION_RE, '');
		if (stripped === out) break;
		out = stripped;
	}
	out = out.replace(_PUNCT_RE, ' ').replace(/\s+/g, ' ').trim();
	// Collapse roman numerals at the end ("part iii" -> "part 3").
	const parts = out.split(' ');
	const last = parts[parts.length - 1];
	if (last && _ROMAN_MAP[last]) parts[parts.length - 1] = _ROMAN_MAP[last];
	return parts.join(' ');
}

function _damerauLevenshtein(a, b) {
	if (a === b) return 0;
	if (!a) return b.length;
	if (!b) return a.length;
	const al = a.length, bl = b.length;
	const m = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
	for (let i = 0; i <= al; i++) m[i][0] = i;
	for (let j = 0; j <= bl; j++) m[0][j] = j;
	for (let i = 1; i <= al; i++) {
		for (let j = 1; j <= bl; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			m[i][j] = Math.min(
				m[i - 1][j] + 1,
				m[i][j - 1] + 1,
				m[i - 1][j - 1] + cost,
			);
			if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
				m[i][j] = Math.min(m[i][j], m[i - 2][j - 2] + 1);
			}
		}
	}
	return m[al][bl];
}

function nameSimilarity(a, b) {
	const na = normalizeName(a);
	const nb = normalizeName(b);
	if (!na || !nb) return 0;
	if (na === nb) return 1;
	// Token-set Jaccard: handles word-order differences.
	const ta = new Set(na.split(' ').filter(Boolean));
	const tb = new Set(nb.split(' ').filter(Boolean));
	let inter = 0;
	for (const t of ta) if (tb.has(t)) inter += 1;
	const union = ta.size + tb.size - inter;
	const jaccard = union > 0 ? inter / union : 0;
	// Damerau-Levenshtein, normalized by the longer string. Substring
	// containment ("snake battle" vs "snake battle 2") scores high.
	const longer = Math.max(na.length, nb.length);
	const dl = _damerauLevenshtein(na, nb);
	const dlSim = longer > 0 ? 1 - (dl / longer) : 0;
	// Combine: jaccard slightly preferred (word matches matter more than
	// character edits), with dl as a tiebreaker for low-overlap pairs.
	return 0.6 * jaccard + 0.4 * dlSim;
}

function rankCandidates(hits, name, maxKeep) {
	const scored = hits.map((h) => {
		let score = scoreCandidate(h.url, name);
		// When the hit carries a snippet/title, blend in name similarity.
		const titleHint = h.title || h.snippet || h.url || '';
		const sim = nameSimilarity(name || '', titleHint);
		// Boost score by 0..15 based on similarity. A perfect title match adds
		// 15; an unrelated title adds 0 and the URL-path bonus still applies.
		score += Math.round(15 * sim);
		return { ...h, score, name_similarity: Number(sim.toFixed(3)) };
	});
	scored.sort((a, b) => b.score - a.score);
	const out = [];
	const seenHosts = new Set();
	for (const c of scored) {
		if (c.score <= -1000) continue;
		const host = hostFor(c.url);
		const tally = [...seenHosts].filter((h) => h === host).length;
		if (tally >= 3) continue;
		seenHosts.add(host);
		out.push(c);
		if (out.length >= (maxKeep || 8)) break;
	}
	return out;
}

module.exports = {
	moveToQuarantine,
	swapInCandidate,
	restoreFromQuarantine,
	reservedCandidateFolder,
	loadReputation,
	scoreCandidate,
	rankCandidates,
	normalizeName,
	nameSimilarity,
	assetFingerprintOverlap,
	hostFor,
};

// Asset-fingerprint overlap. Computes the fraction of distinctive file
// basenames in the broken folder's offline-manifest that ALSO appear in the
// candidate folder (or in a candidate manifest read via the scrape stage).
// Returns 0..1. Cheap signal that the candidate is plausibly the same
// game even before we pay to verify it — overlap < 0.1 = almost
// certainly a different game; >= 0.6 = strong "same game" indicator.
// Callers should use it as an early reject before the manifest gate, and
// as a positive boost for shape-checking fuzzy candidates.
function _readManifest(folder) {
	try {
		const p = path.join(folder, '.offline-manifest.json');
		if (!fs.existsSync(p)) return null;
		const m = JSON.parse(fs.readFileSync(p, 'utf-8'));
		if (!m || !Array.isArray(m.files)) return null;
		return m;
	} catch { return null; }
}

function _distinctiveBasenames(manifest) {
	const out = new Set();
	if (!manifest) return out;
	for (const f of manifest.files) {
		if (!f || typeof f.path !== 'string') continue;
		const base = path.basename(f.path).toLowerCase();
		// Skip ultra-common filenames that overlap between unrelated games
		// (index.html, favicon.ico, etc.). Distinctive = anything that's
		// either >= 6 chars or contains a digit / hash-like substring.
		const common = new Set(['index.html', 'favicon.ico', 'main.js', 'main.css', 'style.css', 'robots.txt', 'manifest.json', 'logo.png', 'icon.png']);
		if (common.has(base)) continue;
		out.add(base);
	}
	return out;
}

function assetFingerprintOverlap(referenceFolder, candidateFolder) {
	const ref = _distinctiveBasenames(_readManifest(referenceFolder));
	const cand = _distinctiveBasenames(_readManifest(candidateFolder));
	if (!ref.size || !cand.size) return { ok: false, overlap: 0, ref_size: ref.size, candidate_size: cand.size, reason: 'no_manifest' };
	let inter = 0;
	for (const f of cand) if (ref.has(f)) inter += 1;
	const overlap = inter / ref.size;
	return { ok: true, overlap, ref_size: ref.size, candidate_size: cand.size, overlap_count: inter };
}
