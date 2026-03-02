const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MEDIA_ROOT = path.join(ROOT, 'Assets', 'media');
const INBOX_DIR = path.join(MEDIA_ROOT, 'inbox');
const LIBRARY_DIR = path.join(MEDIA_ROOT, 'library');
const CATALOG_PATH = path.join(ROOT, 'media_catalog.json');

const SUPPORTED_EXTENSIONS = new Set([
  '.mp4', '.mkv', '.webm', '.mov', '.avi', '.m4v',
  '.srt', '.vtt', '.ass', '.jpg', '.jpeg', '.png', '.webp', '.gif'
]);

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function parseFilename(baseName) {
  const parts = baseName.split('__').map(part => part.trim()).filter(Boolean);

  let type = 'movie';
  let title = baseName;
  let year = null;
  let seasonEpisode = null;

  if (parts.length >= 2) {
    const rawType = parts[0].toLowerCase();
    if (rawType === 'movie' || rawType === 'show') {
      type = rawType;
    }

    title = parts[1] || baseName;

    const p2 = parts[2] || '';
    const p3 = parts[3] || '';

    if (/^\d{4}$/.test(p2)) {
      year = Number(p2);
    }
    if (/^S\d{2}E\d{2}$/i.test(p2)) {
      seasonEpisode = p2.toUpperCase();
    }
    if (/^S\d{2}E\d{2}$/i.test(p3)) {
      seasonEpisode = p3.toUpperCase();
    }
  }

  title = title.replace(/[_-]+/g, ' ').trim();
  const slug = slugify(title || baseName);

  return {
    type,
    title: title || baseName,
    year,
    seasonEpisode,
    slug
  };
}

function toRepoPath(absolutePath) {
  return path.relative(ROOT, absolutePath).replace(/\\/g, '/');
}

function loadCatalog() {
  if (!fs.existsSync(CATALOG_PATH)) {
    return [];
  }
  const raw = fs.readFileSync(CATALOG_PATH, 'utf8').trim();
  if (!raw) {
    return [];
  }
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function saveCatalog(catalog) {
  const sorted = [...catalog].sort((a, b) => a.title.localeCompare(b.title));
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(sorted, null, 2) + '\n');
}

function ingest() {
  ensureDir(INBOX_DIR);
  ensureDir(LIBRARY_DIR);

  const entries = fs.readdirSync(INBOX_DIR, { withFileTypes: true }).filter(entry => entry.isFile());
  if (entries.length === 0) {
    console.log('No files in Assets/media/inbox. Nothing to ingest.');
    return;
  }

  const catalog = loadCatalog();
  let ingested = 0;

  for (const entry of entries) {
    const extension = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(extension)) {
      console.log(`Skipping unsupported file: ${entry.name}`);
      continue;
    }

    const sourcePath = path.join(INBOX_DIR, entry.name);
    const baseName = path.basename(entry.name, extension);
    const parsed = parseFilename(baseName);

    const itemDir = path.join(LIBRARY_DIR, parsed.type, parsed.slug);
    ensureDir(itemDir);

    const fileKind = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(extension)
      ? 'poster'
      : ['.srt', '.vtt', '.ass'].includes(extension)
        ? 'subtitle'
        : 'media';

    const targetPath = path.join(itemDir, `${fileKind}${extension}`);
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }

    fs.renameSync(sourcePath, targetPath);
    const stats = fs.statSync(targetPath);

    const id = parsed.seasonEpisode
      ? `${parsed.type}-${parsed.slug}-${parsed.seasonEpisode.toLowerCase()}`
      : `${parsed.type}-${parsed.slug}`;

    const record = {
      id,
      type: parsed.type,
      title: parsed.title,
      year: parsed.year,
      seasonEpisode: parsed.seasonEpisode,
      file: toRepoPath(targetPath),
      sizeBytes: stats.size,
      addedAt: new Date().toISOString()
    };

    const existing = catalog.findIndex(item => item.id === id);
    if (existing >= 0) {
      catalog[existing] = { ...catalog[existing], ...record };
    } else {
      catalog.push(record);
    }

    ingested += 1;
    console.log(`Ingested: ${entry.name} -> ${record.file}`);
  }

  saveCatalog(catalog);
  console.log(`Done. Ingested ${ingested} file(s).`);
  console.log(`Updated catalog: ${toRepoPath(CATALOG_PATH)}`);
}

ingest();
