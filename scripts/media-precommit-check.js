const { execSync } = require('child_process');

const MEDIA_EXTENSIONS = new Set([
  '.mp4', '.mkv', '.webm', '.mov', '.avi', '.m4v', '.m3u8', '.ts',
  '.srt', '.vtt', '.ass', '.jpg', '.jpeg', '.png', '.webp', '.gif',
  '.ogg', '.aac', '.flac', '.wav', '.swf'
]);

const MAX_BYTES = 20 * 1024 * 1024;

function run(command) {
  return execSync(command, { encoding: 'utf8' }).trim();
}

function extension(filePath) {
  const idx = filePath.lastIndexOf('.');
  return idx >= 0 ? filePath.slice(idx).toLowerCase() : '';
}

function isLfsPointer(content) {
  return content.includes('version https://git-lfs.github.com/spec/v1')
    && content.includes('oid sha256:')
    && content.includes('size ');
}

const staged = run('git diff --cached --name-only --diff-filter=AM');
if (!staged) {
  process.exit(0);
}

const files = staged.split(/\r?\n/).filter(Boolean);
const violations = [];

for (const file of files) {
  if (!MEDIA_EXTENSIONS.has(extension(file))) {
    continue;
  }

  let size = 0;
  try {
    size = Number(run(`git cat-file -s :"${file}"`));
  } catch {
    continue;
  }

  if (!Number.isFinite(size) || size <= MAX_BYTES) {
    continue;
  }

  let content = '';
  try {
    content = run(`git cat-file -p :"${file}"`);
  } catch {
    content = '';
  }

  if (!isLfsPointer(content)) {
    violations.push({ file, size });
  }
}

if (violations.length > 0) {
  console.error('Large media files detected that are not staged as Git LFS pointers:');
  for (const v of violations) {
    console.error(`  - ${v.file} (${(v.size / (1024 * 1024)).toFixed(2)} MB)`);
  }
  console.error('Fix: run `git lfs install`, ensure type is tracked in .gitattributes, then re-add file.');
  process.exit(1);
}

process.exit(0);
