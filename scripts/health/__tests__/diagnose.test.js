#!/usr/bin/env node
// Unit tests for the Game Health Doctor's byte gate and the single-fail-
// critical override in build-game-health.
// Run: node scripts/health/__tests__/diagnose.test.js

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { byteGate } = require(path.resolve(__dirname, '..', 'diagnose.js'));

function makeFixture(files) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'doctor-fixture-'));
	for (const [name, content] of Object.entries(files)) {
		fs.writeFileSync(path.join(dir, name), content);
	}
	return dir;
}

function check(label, fn) {
	try {
		fn();
		console.log(`  ok: ${label}`);
	} catch (e) {
		console.error(`  FAIL: ${label}\n    ${e.message}`);
		process.exit(1);
	}
}

// 1. Empty index.html → EMPTY_ENTRY_HTML_CRITICAL.
{
	const dir = makeFixture({ 'index.html': '' });
	const r = byteGate(dir);
	check('empty index.html → EMPTY_ENTRY_HTML_CRITICAL', () => {
		assert.strictEqual(r.ok, false);
		assert.deepStrictEqual(r.codes, ['EMPTY_ENTRY_HTML_CRITICAL']);
	});
	fs.rmSync(dir, { recursive: true, force: true });
}

// 2. Tiny stub with NO engine markers → EMPTY_ENTRY_HTML_CRITICAL.
{
	const dir = makeFixture({ 'index.html': '<html><body>Coming soon</body></html>' });
	const r = byteGate(dir);
	check('tiny stub no markers → EMPTY_ENTRY_HTML_CRITICAL', () => {
		assert.strictEqual(r.ok, false);
		assert.deepStrictEqual(r.codes, ['EMPTY_ENTRY_HTML_CRITICAL']);
	});
	fs.rmSync(dir, { recursive: true, force: true });
}

// 3. >= 200 bytes stub with no markers → NO_ENGINE_MARKER.
{
	const stuff = 'X'.repeat(400);
	const dir = makeFixture({ 'index.html': `<html><body><p>${stuff}</p></body></html>` });
	const r = byteGate(dir);
	check('200+ byte stub no markers → NO_ENGINE_MARKER', () => {
		assert.strictEqual(r.ok, false);
		assert.deepStrictEqual(r.codes, ['NO_ENGINE_MARKER']);
	});
	fs.rmSync(dir, { recursive: true, force: true });
}

// 4. Real game with <script>: should pass byte gate.
{
	const html = '<!doctype html><html><head><title>Real Game</title></head><body><canvas id="g"></canvas><script src="game.js"></script></body></html>';
	const dir = makeFixture({ 'index.html': html });
	const r = byteGate(dir);
	check('real game with <canvas>+<script> → pass', () => {
		assert.strictEqual(r.ok, true, JSON.stringify(r));
		assert.deepStrictEqual(r.codes, []);
	});
	fs.rmSync(dir, { recursive: true, force: true });
}

// 5. No HTML file at all → NO_HTML.
{
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'doctor-empty-'));
	fs.writeFileSync(path.join(dir, 'favicon.ico'), '');
	const r = byteGate(dir);
	check('folder with no .html entry → NO_HTML', () => {
		assert.strictEqual(r.ok, false);
		assert.deepStrictEqual(r.codes, ['NO_HTML']);
	});
	fs.rmSync(dir, { recursive: true, force: true });
}

// 6. Missing folder → MISSING_FOLDER.
{
	const r = byteGate('/nonexistent/' + Math.random().toString(36).slice(2));
	check('missing folder → MISSING_FOLDER', () => {
		assert.strictEqual(r.ok, false);
		assert.deepStrictEqual(r.codes, ['MISSING_FOLDER']);
	});
}

// 7. Meta-refresh-only wrapper counts as having a marker (since the regex
// matches <meta http-equiv="refresh"). Real game wrappers like
// harvest-simulator use this pattern.
{
	const html = '<!doctype html><html><head><meta http-equiv="refresh" content="0; url=game/"></head></html>';
	const dir = makeFixture({ 'index.html': html });
	const r = byteGate(dir);
	check('meta-refresh wrapper → pass', () => {
		assert.strictEqual(r.ok, true, JSON.stringify(r));
	});
	fs.rmSync(dir, { recursive: true, force: true });
}

console.log('\nall byte-gate tests passed');
