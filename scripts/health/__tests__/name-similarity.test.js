#!/usr/bin/env node
// Unit tests for normalizeName + nameSimilarity in scripts/recovery/atomic-swap.js.
// Run: node scripts/health/__tests__/name-similarity.test.js

const assert = require('assert');
const path = require('path');

const { normalizeName, nameSimilarity } = require(
	path.resolve(__dirname, '..', '..', 'recovery', 'atomic-swap.js'),
);

function eq(label, got, want) {
	try {
		assert.strictEqual(got, want);
		console.log(`  ok: ${label}`);
	} catch (e) {
		console.error(`  FAIL: ${label}`);
		console.error(`    want: ${JSON.stringify(want)}`);
		console.error(`    got:  ${JSON.stringify(got)}`);
		process.exit(1);
	}
}

function gte(label, got, threshold) {
	if (got >= threshold) {
		console.log(`  ok: ${label} (sim=${got.toFixed(3)} >= ${threshold})`);
	} else {
		console.error(`  FAIL: ${label}`);
		console.error(`    want sim >= ${threshold}`);
		console.error(`    got  sim = ${got}`);
		process.exit(1);
	}
}

function lt(label, got, threshold) {
	if (got < threshold) {
		console.log(`  ok: ${label} (sim=${got.toFixed(3)} < ${threshold})`);
	} else {
		console.error(`  FAIL: ${label}`);
		console.error(`    want sim < ${threshold}`);
		console.error(`    got  sim = ${got}`);
		process.exit(1);
	}
}

console.log('normalizeName:');
eq('lowercases', normalizeName('SNAKE'), 'snake');
eq('strips leading "the"', normalizeName('The Snake Game'), 'snake');
eq('strips leading "a"', normalizeName('A Snake'), 'snake');
eq('strips trailing -unblocked', normalizeName('Snake-Unblocked'), 'snake');
eq('strips trailing -hd', normalizeName('Snake HD'), 'snake');
eq('strips trailing -online -unblocked', normalizeName('Snake Online Unblocked'), 'snake');
eq('strips punctuation', normalizeName("Tom & Jerry's Run!"), 'tom jerry s run');
eq('collapses roman numerals at end', normalizeName('Final Fantasy III'), 'final fantasy 3');
eq('collapses single roman', normalizeName('Foo VII'), 'foo 7');
eq('empty input -> empty', normalizeName(''), '');
eq('null/undefined safe', normalizeName(null), '');

console.log('nameSimilarity:');
eq('exact match -> 1.0', nameSimilarity('Snake', 'Snake'), 1);
eq('canonical-equal -> 1.0', nameSimilarity('The Snake', 'snake'), 1);
gte('substring containment', nameSimilarity('Snake Battle', 'Snake Battle 2'), 0.55);
gte('word reorder', nameSimilarity('Snake Battle', 'Battle Snake'), 0.55);
gte('minor edit (single-char typo)', nameSimilarity('Cookie Clicker', 'Cookee Clicker'), 0.55);
lt('unrelated games', nameSimilarity('Snake Battle', 'Crazy Tower Defense'), 0.55);
lt('completely different', nameSimilarity('Tetris', 'Pac-Man'), 0.4);
gte('case-insensitive', nameSimilarity('FORTNITE', 'fortnite'), 0.95);
gte('article-insensitive', nameSimilarity('The Witcher', 'Witcher'), 0.95);
gte('version stripping', nameSimilarity('Stickman HD', 'Stickman'), 0.95);
lt('different game w/ shared word', nameSimilarity('Among Us', 'Among Wolves'), 0.65);
eq('empty inputs -> 0', nameSimilarity('', ''), 0);
eq('one empty -> 0', nameSimilarity('Snake', ''), 0);

console.log('\nall name-similarity tests passed');
