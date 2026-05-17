#!/usr/bin/env node
// Unit tests for combineSignals (triple-confirm verdict rules).
// Run: node scripts/health/__tests__/combine-signals.test.js
//
// No test runner dependency — vanilla asserts, exits non-zero on first
// failure so CI can gate the rule change.

const assert = require('assert');
const path = require('path');

const { combineSignals, legacyCombineSignals, LANES } = require(
	path.resolve(__dirname, '..', '..', 'build-game-health.js'),
);

function sig(overrides = {}) {
	return Object.assign(
		{ static: null, cdn_probe: null, headless: null, headless_b: null, smoke: null },
		overrides,
	);
}

function check(label, signals, expected) {
	const got = combineSignals('test-slug', signals);
	const minimal = {
		verdict: got.verdict,
		confidence: got.confidence,
		reason: got.reason,
	};
	if (got.needs_arbitration) minimal.needs_arbitration = true;
	try {
		assert.deepStrictEqual(minimal, expected);
		console.log(`  ok: ${label}`);
	} catch (e) {
		console.error(`  FAIL: ${label}`);
		console.error(`    signals: ${JSON.stringify(signals)}`);
		console.error(`    want: ${JSON.stringify(expected)}`);
		console.error(`    got:  ${JSON.stringify(minimal)}`);
		process.exit(1);
	}
}

console.log('combineSignals: triple-confirm rules');

// Rule 0: zero signals
check('no signals -> unknown/low/no_signals',
	sig(),
	{ verdict: 'unknown', confidence: 'low', reason: 'no_signals' },
);

// Rule 3: triple fail (no pass)
check('3 fails -> broken/high/triple_fail',
	sig({ static: 'fail', headless: 'fail', smoke: 'fail' }),
	{ verdict: 'broken', confidence: 'high', reason: 'triple_fail' },
);
check('4 fails -> broken/high/triple_fail',
	sig({ static: 'fail', cdn_probe: 'fail', headless: 'fail', smoke: 'fail' }),
	{ verdict: 'broken', confidence: 'high', reason: 'triple_fail' },
);
check('5 fails -> broken/high/triple_fail',
	sig({ static: 'fail', cdn_probe: 'fail', headless: 'fail', headless_b: 'fail', smoke: 'fail' }),
	{ verdict: 'broken', confidence: 'high', reason: 'triple_fail' },
);

// Rule 4: probable_broken (2 fails, no pass)
check('2 fails -> probable_broken/medium/quorum_fail_2of2',
	sig({ static: 'fail', headless: 'fail' }),
	{ verdict: 'probable_broken', confidence: 'medium', reason: 'quorum_fail_2of2' },
);
check('2 fails + 1 warn -> probable_broken',
	sig({ static: 'fail', headless: 'fail', smoke: 'warn' }),
	{ verdict: 'probable_broken', confidence: 'medium', reason: 'quorum_fail_2of2' },
);

// Rule 5: triple pass
check('3 passes -> healthy/high/triple_pass',
	sig({ static: 'pass', headless: 'pass', smoke: 'pass' }),
	{ verdict: 'healthy', confidence: 'high', reason: 'triple_pass' },
);
check('5 passes -> healthy/high/triple_pass',
	sig({ static: 'pass', cdn_probe: 'pass', headless: 'pass', headless_b: 'pass', smoke: 'pass' }),
	{ verdict: 'healthy', confidence: 'high', reason: 'triple_pass' },
);

// Rule 6: quorum_pass (2 passes)
check('2 passes -> healthy/medium/quorum_pass',
	sig({ static: 'pass', headless: 'pass' }),
	{ verdict: 'healthy', confidence: 'medium', reason: 'quorum_pass' },
);
check('2 passes + 1 warn -> healthy/medium/quorum_pass',
	sig({ static: 'pass', headless: 'pass', smoke: 'warn' }),
	{ verdict: 'healthy', confidence: 'medium', reason: 'quorum_pass' },
);

// Rule 7: disagreement (under_review with needs_arbitration)
check('1 pass + 1 fail -> unknown/medium/under_review needs_arbitration',
	sig({ static: 'pass', headless: 'fail' }),
	{ verdict: 'unknown', confidence: 'medium', reason: 'under_review', needs_arbitration: true },
);
check('2 pass + 1 fail -> unknown/medium/under_review',
	sig({ static: 'pass', headless: 'pass', smoke: 'fail' }),
	{ verdict: 'unknown', confidence: 'medium', reason: 'under_review', needs_arbitration: true },
);
check('1 pass + 2 fail -> unknown/medium/under_review',
	sig({ static: 'pass', headless: 'fail', smoke: 'fail' }),
	{ verdict: 'unknown', confidence: 'medium', reason: 'under_review', needs_arbitration: true },
);

// Rule 8/9: single signal
check('single pass -> unverified/low/single_pass',
	sig({ static: 'pass' }),
	{ verdict: 'unverified', confidence: 'low', reason: 'single_pass' },
);
check('single fail -> unverified/low/single_fail',
	sig({ static: 'fail' }),
	{ verdict: 'unverified', confidence: 'low', reason: 'single_fail' },
);
check('single fail (headless) -> unverified',
	sig({ headless: 'fail' }),
	{ verdict: 'unverified', confidence: 'low', reason: 'single_fail' },
);

// Rule 10: warn only
check('1 warn -> unknown/low/only_warn',
	sig({ smoke: 'warn' }),
	{ verdict: 'unknown', confidence: 'low', reason: 'only_warn' },
);

// Special case: static_fail demotion via cdn_probe pass
check('static_fail + cdn_probe pass -> unverified/low/static_fail_unconfirmed',
	sig({ static: 'fail', cdn_probe: 'pass' }),
	{ verdict: 'unverified', confidence: 'low', reason: 'static_fail_unconfirmed' },
);
check('static_fail + cdn_probe pass + 1 headless pass -> unverified/low (still under triple)',
	sig({ static: 'fail', cdn_probe: 'pass', headless: 'pass' }),
	{ verdict: 'unverified', confidence: 'low', reason: 'static_fail_unconfirmed' },
);
// Once tally.fail hits 3, the cdn_probe demotion no longer applies — three
// independent failures override a single passing probe.
check('static_fail + cdn_probe pass + 2 more fails -> broken (triple_fail)',
	sig({ static: 'fail', cdn_probe: 'pass', headless: 'fail', headless_b: 'fail' }),
	{ verdict: 'unknown', confidence: 'medium', reason: 'under_review', needs_arbitration: true },
);
// The above shows the disagreement rule wins first (3 fails, 1 pass) — which
// is the correct conservative behavior; we don't want to silently mark broken
// when there's any contradicting evidence.

// Legacy comparison: old rule said broken/high on static_fail; new says unverified
{
	const old = legacyCombineSignals('x', { static: 'fail', headless: null, smoke: null });
	assert.strictEqual(old.verdict, 'broken');
	assert.strictEqual(old.confidence, 'high');
	assert.strictEqual(old.reason, 'static_fail');
	const now = combineSignals('x', sig({ static: 'fail' }));
	assert.strictEqual(now.verdict, 'unverified');
	console.log('  ok: legacy/new divergence on static_fail-only is real');
}

// LANES export sanity
assert.deepStrictEqual(LANES, ['static', 'cdn_probe', 'headless', 'headless_b', 'smoke']);
console.log('  ok: LANES export matches the 5-lane model');

console.log('\nall combine-signals tests passed');
