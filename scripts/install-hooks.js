const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const HOOKS_DIR = path.join(ROOT, '.githooks');
const PRE_COMMIT = path.join(HOOKS_DIR, 'pre-commit');

if (!fs.existsSync(HOOKS_DIR)) {
  fs.mkdirSync(HOOKS_DIR, { recursive: true });
}

if (!fs.existsSync(PRE_COMMIT)) {
  fs.writeFileSync(PRE_COMMIT, '#!/usr/bin/env sh\nset -e\nnode scripts/media-precommit-check.js\n', { mode: 0o755 });
}

execSync('git config core.hooksPath .githooks', {
  cwd: ROOT,
  stdio: 'inherit'
});

console.log('Git hooks path set to .githooks');
