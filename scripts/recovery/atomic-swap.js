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
		const blocked = (raw.blocked || []).map(p => new RegExp(p, 'i'));
		_reputationCache = {
			trusted,
			blocked,
			default_score: Number(raw.default_score) || 0,
		};
	} catch {
		_reputationCache = { trusted: {}, blocked: [], default_score: 0 };
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
	// Penalize ad/track-style paths.
	if (/\b(ads?|track|popup|redirect)\b/i.test(url)) score -= 20;
	return score;
}

function rankCandidates(hits, name, maxKeep) {
	const scored = hits.map(h => ({ ...h, score: scoreCandidate(h.url, name) }));
	scored.sort((a, b) => b.score - a.score);
	const out = [];
	const seenHosts = new Set();
	for (const c of scored) {
		if (c.score <= -1000) continue;
		const host = hostFor(c.url);
		// Soft per-host diversity: at most 3 candidates per domain.
		const tally = [...seenHosts].filter(h => h === host).length;
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
	hostFor,
};
