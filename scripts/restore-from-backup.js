// restore-from-backup.js
// Scans current Assets for LFS pointer files, then copies the real file from backup
const fs = require('fs');
const path = require('path');

const CURRENT = path.join(__dirname, '..', 'Assets');
const BACKUP = 'C:\\Users\\Administrator\\Downloads\\jeoweb\\Assets';

function isLfsPointer(filePath) {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buf = Buffer.alloc(50);
    fs.readSync(fd, buf, 0, 50, 0);
    fs.closeSync(fd);
    return buf.toString('utf8').startsWith('version https://git-lfs');
  } catch {
    return false;
  }
}

function walkDir(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        results.push(...walkDir(full));
      } else if (e.isFile()) {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

async function main() {
  console.log('Scanning current Assets for LFS pointers...');
  const allFiles = walkDir(CURRENT);
  console.log(`Total files in Assets: ${allFiles.length}`);

  const pointers = [];
  for (const f of allFiles) {
    if (isLfsPointer(f)) {
      pointers.push(f);
    }
  }
  console.log(`LFS pointer files: ${pointers.length}`);

  if (pointers.length === 0) {
    console.log('No LFS pointers found - nothing to restore!');
    return;
  }

  // Check backup exists
  if (!fs.existsSync(BACKUP)) {
    console.error(`Backup not found: ${BACKUP}`);
    return;
  }

  let restored = 0, notInBackup = 0, stillPointer = 0, errors = 0;
  const missing = [];

  for (const pointerFile of pointers) {
    // Compute relative path from Assets
    const rel = path.relative(CURRENT, pointerFile);
    const backupFile = path.join(BACKUP, rel);

    if (!fs.existsSync(backupFile)) {
      notInBackup++;
      missing.push(rel);
      continue;
    }

    // Check backup file is NOT also an LFS pointer
    if (isLfsPointer(backupFile)) {
      stillPointer++;
      missing.push(rel + ' (backup also pointer)');
      continue;
    }

    // Copy from backup
    try {
      fs.mkdirSync(path.dirname(pointerFile), { recursive: true });
      fs.copyFileSync(backupFile, pointerFile);
      restored++;
    } catch (e) {
      errors++;
      console.error(`  Error copying ${rel}: ${e.message}`);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`✅ Restored from backup: ${restored}`);
  console.log(`❌ Not in backup:        ${notInBackup}`);
  console.log(`⚠️  Backup also pointer:  ${stillPointer}`);
  console.log(`💥 Copy errors:          ${errors}`);
  console.log(`📁 Total pointers:       ${pointers.length}`);

  if (missing.length > 0 && missing.length <= 50) {
    console.log('\nMissing files:');
    missing.forEach(f => console.log(`  - ${f}`));
  } else if (missing.length > 50) {
    console.log(`\n${missing.length} files missing from backup (showing first 30):`);
    missing.slice(0, 30).forEach(f => console.log(`  - ${f}`));
    // Save full list
    fs.writeFileSync(path.join(__dirname, 'still-missing.json'), JSON.stringify(missing, null, 2));
    console.log(`\nFull list saved to scripts/still-missing.json`);
  }
}

main().catch(console.error);
