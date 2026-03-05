#!/usr/bin/env node
/**
 * Splits the repo into multiple commits to stay under GitHub's 2GB push limit.
 * Commits and pushes in batches of game folders.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'Assets');
const ROOT = path.join(__dirname, '..');
const MAX_BATCH_SIZE = 1.5 * 1024 * 1024 * 1024; // 1.5GB per batch

function run(cmd, opts = {}) {
  console.log(`  > ${cmd}`);
  try {
    return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: opts.quiet ? 'pipe' : 'inherit', ...opts });
  } catch (e) {
    if (opts.ignoreError) return e.stdout || '';
    throw e;
  }
}

function getDirSize(dir) {
  let total = 0;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isFile()) total += fs.statSync(p).size;
      else if (e.isDirectory()) total += getDirSize(p);
    }
  } catch {}
  return total;
}

async function main() {
  // Step 1: Commit and push non-Assets files first (small)
  console.log('\n=== Step 1: Non-Assets files ===');
  const rootFiles = fs.readdirSync(ROOT).filter(f => {
    return f !== '.git' && f !== 'Assets' && f !== 'node_modules';
  });
  for (const f of rootFiles) {
    run(`git add "${f}"`, { quiet: true, ignoreError: true });
  }
  run('git commit -m "Site files (no games)" --allow-empty', { ignoreError: true });
  run('git push --force origin main', { ignoreError: true });

  // Step 2: Get all game folders with sizes
  console.log('\n=== Step 2: Batching game folders ===');
  const gameDirs = fs.readdirSync(ASSETS_DIR).filter(d => {
    return fs.statSync(path.join(ASSETS_DIR, d)).isDirectory();
  });

  const folders = gameDirs.map(d => ({
    name: d,
    size: getDirSize(path.join(ASSETS_DIR, d))
  })).sort((a, b) => a.size - b.size); // smallest first

  console.log(`Total game folders: ${folders.length}`);
  const totalSize = folders.reduce((s, f) => s + f.size, 0);
  console.log(`Total size: ${(totalSize / 1024 / 1024 / 1024).toFixed(2)} GB`);

  // Step 3: Create batches
  const batches = [];
  let currentBatch = [];
  let currentSize = 0;

  for (const folder of folders) {
    if (currentSize + folder.size > MAX_BATCH_SIZE && currentBatch.length > 0) {
      batches.push({ folders: currentBatch, size: currentSize });
      currentBatch = [];
      currentSize = 0;
    }
    currentBatch.push(folder);
    currentSize += folder.size;
  }
  if (currentBatch.length > 0) {
    batches.push({ folders: currentBatch, size: currentSize });
  }

  console.log(`\nSplit into ${batches.length} batches:`);
  batches.forEach((b, i) => {
    console.log(`  Batch ${i + 1}: ${b.folders.length} folders, ${(b.size / 1024 / 1024).toFixed(0)} MB`);
  });

  // Step 4: Commit and push each batch
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\n=== Pushing batch ${i + 1}/${batches.length} (${batch.folders.length} folders, ${(batch.size / 1024 / 1024).toFixed(0)} MB) ===`);

    for (const folder of batch.folders) {
      run(`git add "Assets/${folder.name}"`, { quiet: true, ignoreError: true });
    }

    run(`git commit -m "Add games batch ${i + 1}/${batches.length}"`, { ignoreError: true });

    let pushSuccess = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        run('git push origin main');
        pushSuccess = true;
        break;
      } catch (e) {
        console.log(`  Push attempt ${attempt + 1} failed, retrying in 5s...`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    if (!pushSuccess) {
      console.log(`  FAILED to push batch ${i + 1} after 3 attempts. Stopping.`);
      process.exit(1);
    }

    console.log(`  Batch ${i + 1} pushed successfully!`);
  }

  console.log('\n=== All batches pushed successfully! ===');
}

main().catch(e => { console.error(e); process.exit(1); });
