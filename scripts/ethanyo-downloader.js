#!/usr/bin/env node

/**
 * Ethanyo Game Downloader (clean rewrite)
 *
 * Old behavior dumped every fetched URL at its absolute pathname under the
 * game folder (e.g. Assets/foo/misc/play/foo.html, Assets/foo/gh/.../Build/...).
 * That produced deeply nested mirror trees and pulled in unrelated CDN spider
 * results.
 *
 * New behavior:
 *   1. Fetch the wrapper page (/misc/play/*.html or /misc/play/?title=...&link=...).
 *   2. Read the iframe src -> derive the *real* game folder, e.g. /misc/<slug>/
 *      and the on-site cover image (the <img class="gameicon"> src).
 *   3. Save the inner game's index.html as Assets/<slug>/index.html.
 *   4. Mirror only files whose URL path starts with /misc/<slug>/, preserving
 *      paths *relative to that prefix* so the game's own relative refs keep
 *      working (Assets/<slug>/Build/foo.data, Assets/<slug>/css/style.css, ...).
 *   5. Recursively scan downloaded HTML / JS / CSS for further same-prefix
 *      asset refs. CDN, analytics, ads and unrelated /assets/ paths are skipped.
 *   6. Save the website's actual cover image as logo.<ext>.
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const { execSync } = require('child_process');
const zlib = require('zlib');

const ORIGIN = 'https://ethanyo.global.ssl.fastly.net';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const CONCURRENCY = 6;
const MAX_DEPTH = 4;
const SKIP_HOST_PATTERNS = [
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /doubleclick\.net/i,
  /highperformanceformat\.com/i,
  /adsterra/i,
  /\.ads?\./i,
  /unpkg\.com/i,
  /fonts\.googleapis\.com/i,
  /fonts\.gstatic\.com/i
];
// Many ethanyo games declare <base href="https://cdn.jsdelivr.net/gh/55gms/55gms@.../static/misc/<slug>/">
// so all relative refs resolve against jsdelivr. We follow that base into the same local game folder.
const ALLOWED_HOSTS = [
  /(^|\.)ethanyo\.(global\.ssl\.fastly|freetls\.fastly)\.net$/i,
  /(^|\.)cdn\.jsdelivr\.net$/i,
  /(^|\.)raw\.githubusercontent\.com$/i
];
const TEXT_EXT = new Set(['.html', '.htm', '.js', '.mjs', '.css', '.json', '.xml', '.svg', '.txt']);

class GameJob {
  constructor(sourceUrl) {
    this.sourceUrl = sourceUrl;
    this.slug = null;
    this.title = null;
    this.author = 'Unknown';
    this.gameEntryUrl = null;     // absolute URL to inner index.html
    this.coverUrl = null;
    this.gameDir = null;
    // Each remoteRoot maps a remote URL prefix -> local directory.
    // Files whose URL starts with prefix get saved at localDir + (url - prefix).
    this.remoteRoots = [];
    this.queued = new Set();
    this.failed = [];
    this.bytes = 0;
  }
}

class Downloader {
  constructor() {
    this.assetsRoot = path.join(process.cwd(), 'Assets');
    this.results = [];
  }

  async run(inputFile) {
    const urls = await this.readUrls(inputFile);
    console.log(`ethanyo-downloader: ${urls.length} game(s) queued`);

    for (const url of urls) {
      const job = new GameJob(url);
      try {
        await this.processGame(job);
      } catch (err) {
        console.error(`  fail: ${url} -> ${err.message}`);
        job.failed.push({ url, error: err.message });
      }
      this.results.push(job);
    }
    this.report();
    this.runScanner();
  }

  async readUrls(file) {
    const buf = await fs.readFile(file, 'utf8');
    return buf.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  }

  // ---------- per-game pipeline ----------

  async processGame(job) {
    console.log(`\n>> ${job.sourceUrl}`);

    const wrapperHtml = await fetchText(job.sourceUrl);
    const meta = parseWrapper(wrapperHtml, job.sourceUrl);
    if (!meta.slug) throw new Error('could not resolve game slug from wrapper');
    if (meta.isFlashViewer) {
      throw new Error('flash viewer URL — use npm run flash:import instead');
    }

    job.slug = meta.slug;
    job.title = meta.title || meta.slug;
    job.author = meta.author || job.author;
    job.gameEntryUrl = absolute(meta.entryPath, ORIGIN);
    job.coverUrl = meta.coverUrl;
    job.gameDir = path.join(this.assetsRoot, meta.slug);

    // Initial remote root is the ethanyo /misc/<slug>/ prefix
    const ethanyoPrefix = `${ORIGIN}/misc/${meta.slug}/`;
    job.remoteRoots.push({ prefix: ethanyoPrefix, localDir: job.gameDir });

    console.log(`   title=${job.title} slug=${job.slug}`);
    console.log(`   entry=${job.gameEntryUrl}`);

    await fs.mkdir(job.gameDir, { recursive: true });

    // Step 1: fetch entry HTML, detect <base href>, register as another remote root.
    const entryBuf = await fetchBuffer(job.gameEntryUrl);
    job.bytes += entryBuf.length;
    job.queued.add(job.gameEntryUrl);
    let entryHtml = entryBuf.toString('utf8');
    const baseHref = extractBaseHref(entryHtml);
    let resolvedBase = job.gameEntryUrl; // base url for ref resolution in entry html
    if (baseHref) {
      const absBase = absolute(baseHref, job.gameEntryUrl);
      if (absBase) {
        const normalized = absBase.endsWith('/') ? absBase : absBase + '/';
        job.remoteRoots.push({ prefix: normalized, localDir: job.gameDir });
        resolvedBase = normalized;
        console.log(`   base href -> ${normalized}`);
      }
    }
    // Save raw entry HTML for now; we re-process & overwrite after BFS so
    // any github-tree download that drops a fresh index.html on top of us
    // doesn't undo the stripping.
    await writeFileSafe(path.join(job.gameDir, 'index.html'), Buffer.from(entryHtml, 'utf8'));

    // Step 2a: if base href points to a GitHub-backed CDN (jsdelivr) we can
    // enumerate the entire source folder via the GitHub API and grab every
    // blob — including audio/font files that the runtime fetches lazily and
    // that no static regex spider would discover. This is what fixes the
    // "no sound / no real fonts" gap, plus bendy (jsdelivr 50MB cap) by
    // routing the actual download through raw.githubusercontent.com.
    const altBases = job.remoteRoots.map(r => r.prefix);
    const queue = [];
    if (baseHref) {
      const ghInfo = parseGithubCdnUrl(absolute(baseHref, job.gameEntryUrl));
      if (ghInfo) {
        try {
          const blobs = await listGithubTreeBlobs(ghInfo);
          const usedRef = blobs.resolvedRef || ghInfo.ref;
          console.log(`   gh tree: ${blobs.length} blobs under ${ghInfo.user}/${ghInfo.repo}@${usedRef}/${ghInfo.subpath}`);
          // Register raw.githubusercontent.com as a remote root mapped to gameDir.
          const rawPrefix = `https://raw.githubusercontent.com/${ghInfo.user}/${ghInfo.repo}/${usedRef}/${ghInfo.subpath}/`;
          job.remoteRoots.push({ prefix: rawPrefix, localDir: job.gameDir });
          for (const blobPath of blobs) {
            const url = rawPrefix + blobPath;
            if (!job.queued.has(url)) { job.queued.add(url); queue.push({ url, depth: 1 }); }
          }
        } catch (err) {
          console.log(`   gh tree fail: ${err.message} (falling back to regex spider)`);
        }
      }
    }

    // Step 2b: regex-spider refs from entry HTML (fallback / supplement).
    for (const ref of extractRefs(entryHtml, resolvedBase, altBases)) {
      if (!job.queued.has(ref) && shouldFollow(ref, job)) {
        job.queued.add(ref);
        queue.push({ url: ref, depth: 1 });
      }
    }

    // Pre-seed a few canonical filenames for known engines (cheap probes).
    for (const probe of ['data.js', 'c2runtime.js', 'scripts/c3runtime.js', 'workermain.js']) {
      for (const root of job.remoteRoots) {
        const u = root.prefix + probe;
        if (!job.queued.has(u)) { job.queued.add(u); queue.push({ url: u, depth: 1 }); }
      }
    }

    // Some games hard-code an additional jsdelivr CDN inside an inline
    // script (filePackagePrefixURL, buildUrl, etc.). After we've fetched the
    // entry HTML and its scripts, scan all saved text files for jsdelivr
    // /gh/ URLs and register those as additional remote roots, then enumerate
    // them via the github tree API and queue every blob.
    let pass = 0;
    while (true) {
      while (queue.length) {
        const batch = queue.splice(0, CONCURRENCY);
        await Promise.all(batch.map(async ({ url, depth }) => {
          try {
            const localPath = mapUrlToLocal(url, job);
            if (!localPath) return;
            const buf = await fetchBuffer(url);
            await writeFileSafe(localPath, buf);
            job.bytes += buf.length;

            if (isTextUrl(url) && depth < MAX_DEPTH) {
              const text = buf.toString('utf8');
              for (const ref of extractRefs(text, url, altBases)) {
                if (!job.queued.has(ref) && shouldFollow(ref, job)) {
                  job.queued.add(ref);
                  queue.push({ url: ref, depth: depth + 1 });
                }
              }
            }
          } catch (err) {
            // 404 on probes is normal — only record real refs as failures.
            if (depth > 0 && !/HTTP 404/.test(err.message)) {
              job.failed.push({ url, error: err.message });
            } else if (depth > 1) {
              job.failed.push({ url, error: err.message });
            }
          }
        }));
      }
      pass++;
      if (pass > 3) break;
      const newRoots = await discoverEmbeddedCdnRoots(job);
      if (newRoots.length === 0) break;
      for (const r of newRoots) {
        console.log(`   discovered cdn root: ${r.prefix}`);
        try {
          const ghInfo = parseGithubCdnUrl(r.prefix);
          if (!ghInfo) continue;
          const blobs = await listGithubTreeBlobs(ghInfo);
          const usedRef = blobs.resolvedRef || ghInfo.ref;
          const rawPrefix = `https://raw.githubusercontent.com/${ghInfo.user}/${ghInfo.repo}/${usedRef}/${ghInfo.subpath}/`;
          const localDir = path.join(job.gameDir, r.localSub);
          job.remoteRoots.push({ prefix: rawPrefix, localDir });
          job.remoteRoots.push({ prefix: r.prefix, localDir });
          for (const blobPath of blobs) {
            const url = rawPrefix + blobPath;
            if (!job.queued.has(url)) { job.queued.add(url); queue.push({ url, depth: 1 }); }
          }
          console.log(`   gh tree (embedded): ${blobs.length} blobs -> ${r.localSub}/`);
        } catch (err) {
          console.log(`   embedded cdn fail: ${err.message}`);
        }
      }
    }

    // Cover
    if (job.coverUrl) {
      try {
        const buf = await fetchBuffer(job.coverUrl);
        const ext = (path.extname(new URL(job.coverUrl).pathname) || '.webp').toLowerCase();
        await writeFileSafe(path.join(job.gameDir, `logo${ext}`), buf);
        console.log(`   cover saved (${buf.length} bytes, ${ext})`);
      } catch (err) {
        console.log(`   cover fail: ${err.message}`);
      }
    }

    // Rewrite hard-coded jsdelivr CDN URLs in saved text files to point at
    // the local mirror folder, so runtime fetches go to the local server
    // instead of the internet.
    await rewriteEmbeddedCdnUrls(job);

    // Some repos split files >100 MB into <name>.partN to fit GitHub's blob
    // limit. Merge those parts back into the base name (Unity .data.unityweb,
    // etc.) so loaders that fetch the canonical name find a single file.
    await mergeSplitParts(job.gameDir);

    // Note: do NOT decompress .unityweb files here. The format embeds a
    // "UnityWeb Compressed Content (gzip|brotli)" comment in the wrapper
    // header; UnityLoader's hasUnityMarker reads that and JS-decompresses
    // itself. Unwrapping at save time strips the marker and breaks loaders
    // that don't fall through to the identity path correctly (Unity 2019.x).

    // Some upstream wrappers ship a custom merge-fetch shim in index.html
    // that pulls .partN files separately at runtime. Once we've merged
    // parts on disk, that shim 404s and blocks UnityLoader. Strip it.
    await stripPartFetcher(job.gameDir);

    // Same wrappers also patch UnityLoader.js so resolveBuildUrl reads a
    // runtime-built blob URL from window.<var>. With the part-fetcher script
    // gone that var never gets set, so the loader fetches "undefined" for
    // the data file. Revert resolveBuildUrl to its canonical form.
    await patchResolveBuildUrl(job.gameDir);

    // Re-process index.html now that BFS is done. The github-tree pass may
    // have overwritten our stripped version with the upstream raw file.
    {
      const indexPath = path.join(job.gameDir, 'index.html');
      let html = await fs.readFile(indexPath, 'utf8');
      html = html.replace(/<base[^>]*href=["'][^"']*["'][^>]*>/gi, '<!-- base stripped for offline -->');
      html = html
        .replace(/<script[^>]*\bsrc=["']\/[^"']*["'][^>]*>\s*<\/script>/gi, '')
        .replace(/<link[^>]*\bhref=["']\/[^"']*["'][^>]*>/gi, '');
      await fs.writeFile(indexPath, html);
    }

    // Static validation: every <script src>/<link href>/<img src> in saved
    // index.html must resolve to a file on disk.
    const missing = await validateLocalAssets(job.gameDir);
    const ok = missing.length === 0;

    // Light metadata file the scanner won't choke on.
    const manifest = {
      title: job.title,
      slug: job.slug,
      author: job.author,
      source: job.sourceUrl,
      coverUrl: job.coverUrl,
      remoteRoots: job.remoteRoots.map(r => r.prefix),
      downloadedAt: new Date().toISOString(),
      assetsDownloaded: job.queued.size,
      failedCount: job.failed.length,
      failed: job.failed.slice(0, 50),
      indexMissingRefs: missing,
      offlineReady: ok
    };
    await fs.writeFile(
      path.join(job.gameDir, 'ethanyo_manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    // If essential refs are missing, tag the index so scan.js marks it broken.
    if (!ok) {
      try {
        const p = path.join(job.gameDir, 'index.html');
        let html = await fs.readFile(p, 'utf8');
        if (!html.includes('GAME BROKEN')) {
          html = html.replace(/<head[^>]*>/i, m => `${m}\n<!--GAME BROKEN-->`);
          await fs.writeFile(p, html);
        }
      } catch {}
      console.log(`   ! ${missing.length} unresolved refs (tagged broken)`);
    } else {
      console.log(`   offline-ready ✓`);
    }

    console.log(`   done: ${job.queued.size - job.failed.length}/${job.queued.size} ok, ${(job.bytes / 1024).toFixed(0)} KB`);
  }

  // ---------- reporting ----------

  report() {
    console.log('\n=== summary ===');
    for (const j of this.results) {
      const ok = j.queued.size - j.failed.length;
      console.log(`  ${j.slug || '?'}: ${ok}/${j.queued.size} files, ${(j.bytes / 1024).toFixed(0)} KB, ${j.failed.length} fail`);
    }
  }

  runScanner() {
    try {
      console.log('\nrunning scan.js ...');
      execSync('node scan.js', { stdio: 'inherit' });
    } catch (err) {
      console.log('scan.js failed:', err.message);
    }
  }
}

// ---------------- wrapper parsing ----------------

function isJunkText(s) {
  if (!s) return true;
  const t = s.replace(/&nbsp;/gi, '').replace(/\s+/g, '').trim();
  return t.length === 0;
}

function parseWrapper(html, wrapperUrl) {
  // iframe src is the canonical pointer to the real game folder
  let entryPath = null;
  const iframeMatch = html.match(/<iframe[^>]*\bsrc=["']([^"']+)["']/i);
  if (iframeMatch) entryPath = iframeMatch[1].trim();

  let coverUrl = null;
  const coverMatch = html.match(/<img[^>]*class=["'][^"']*gameicon[^"']*["'][^>]*src=["']([^"']+)["']/i)
    || html.match(/<img[^>]*src=["']([^"']+)["'][^>]*class=["'][^"']*gameicon/i);
  if (coverMatch && coverMatch[1] !== '#') coverUrl = absolute(coverMatch[1], ORIGIN);

  const titleMatch = html.match(/class=["']titletext["'][^>]*>([^<]*)</i);
  let title = titleMatch ? titleMatch[1].trim() : null;
  if (isJunkText(title)) title = null;
  const authorMatch = html.match(/class=["']bytext["'][^>]*>\s*By\s*([^<]+)</i);
  let author = authorMatch ? authorMatch[1].trim() : null;
  if (isJunkText(author)) author = null;

  const wu = new URL(wrapperUrl);
  const linkParam = wu.searchParams.get('link');
  const titleParam = wu.searchParams.get('title');
  const authorParam = wu.searchParams.get('author');

  // Query-style wrapper resolves slug client-side. Replicate that here.
  if (linkParam) {
    if (!title) title = titleParam || linkParam;
    if (!author) author = authorParam || null;
    if (!entryPath || entryPath === '/l' || entryPath === '#' || entryPath === '') {
      entryPath = `/misc/${linkParam}/index.html`;
    }
    if (!coverUrl) coverUrl = absolute(`/misc/${linkParam}/img.webp`, ORIGIN);
  }

  // Strip query/fragment from entryPath before normalizing.
  let entryQuery = '';
  if (entryPath) {
    const qIdx = entryPath.indexOf('?');
    if (qIdx !== -1) {
      entryQuery = entryPath.slice(qIdx);
      entryPath = entryPath.slice(0, qIdx);
    }
    if (!/\.html?$/i.test(entryPath)) {
      entryPath = entryPath.replace(/\/?$/, '/') + 'index.html';
    }
  }

  // Extract slug from entryPath
  let slug = null;
  if (entryPath) {
    const m = entryPath.match(/\/misc\/([^/]+)\//);
    if (m) slug = m[1];
  }
  if (!slug && linkParam) slug = linkParam;

  // Special case: shared flash viewer at /misc/flash/?swf=<file>.swf — this
  // downloader is for self-contained game folders, not the shared Ruffle
  // viewer. Surface that and skip.
  let isFlashViewer = false;
  if (slug === 'flash' && /\.swf\b/i.test(entryQuery)) {
    isFlashViewer = true;
  }

  return { slug, title, author, entryPath, coverUrl, isFlashViewer };
}

function extractBaseHref(html) {
  const m = html.match(/<base[^>]*\bhref=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

// Parse a jsdelivr/GitHub CDN url like
//   https://cdn.jsdelivr.net/gh/<user>/<repo>@<ref>/<subpath>/
// into its components, or null if the URL isn't a GitHub-backed CDN.
function parseGithubCdnUrl(url) {
  if (!url) return null;
  // jsdelivr: https://cdn.jsdelivr.net/gh/<user>/<repo>@<ref>/<subpath>/
  let m = url.match(/^https?:\/\/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^/@]+)@([^/]+)\/(.*?)\/?$/i);
  if (m) return { user: m[1], repo: m[2], ref: m[3], subpath: m[4].replace(/\/+$/, '') };
  // githack: https://rawcdn.githack.com/<user>/<repo>/<ref>/<subpath>/
  m = url.match(/^https?:\/\/(?:rawcdn|raw)\.githack\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.*?)\/?$/i);
  if (m) return { user: m[1], repo: m[2], ref: m[3], subpath: m[4].replace(/\/+$/, '') };
  // raw.githubusercontent.com (already supported as a remote root, but parse here too)
  m = url.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.*?)\/?$/i);
  if (m) return { user: m[1], repo: m[2], ref: m[3], subpath: m[4].replace(/\/+$/, '') };
  return null;
}

// Cache git/trees responses keyed by sha to avoid re-fetching shared parents
// (multiple 55gms games share static/misc/* root tree).
const GH_TREE_BY_SHA = new Map();
const GH_BLOB_CACHE = new Map();
const GH_DEFAULT_BRANCH = new Map();

async function ghDefaultBranch(user, repo) {
  const key = `${user}/${repo}`.toLowerCase();
  if (GH_DEFAULT_BRANCH.has(key)) return GH_DEFAULT_BRANCH.get(key);
  const url = `https://api.github.com/repos/${user}/${repo}`;
  const headers = { Accept: 'application/vnd.github+json' };
  const buf = await fetchBuffer(url, 0, headers);
  const json = JSON.parse(buf.toString('utf8'));
  const branch = json.default_branch || 'main';
  GH_DEFAULT_BRANCH.set(key, branch);
  return branch;
}

async function ghGetTree(user, repo, sha, recursive = false) {
  const key = `${user}/${repo}/${sha}/${recursive ? 'r' : ''}`.toLowerCase();
  if (GH_TREE_BY_SHA.has(key)) return GH_TREE_BY_SHA.get(key);
  const url = `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}${recursive ? '?recursive=1' : ''}`;
  const headers = { Accept: 'application/vnd.github+json' };
  const buf = await fetchBuffer(url, 0, headers);
  const json = JSON.parse(buf.toString('utf8'));
  if (!json.tree) throw new Error(json.message || 'github: no tree');
  GH_TREE_BY_SHA.set(key, json);
  return json;
}

// Walk root tree -> find subpath sha -> recursive list under it.
async function listGithubTreeBlobs({ user, repo, ref, subpath }) {
  const cacheKey = `${user}/${repo}@${ref}|${subpath}`.toLowerCase();
  if (GH_BLOB_CACHE.has(cacheKey)) return GH_BLOB_CACHE.get(cacheKey);

  // Resolve ref: jsdelivr base hrefs sometimes hard-code "@master" even when
  // the repo's actual default branch is "main". Try the literal ref first;
  // if it 404s, fall back to the repo's default_branch.
  let resolvedRef = ref;
  let rootTree;
  try {
    rootTree = await ghGetTree(user, repo, resolvedRef, false);
  } catch (err) {
    if (/HTTP 404/.test(err.message) || /not found/i.test(err.message)) {
      const defaultBranch = await ghDefaultBranch(user, repo);
      if (defaultBranch && defaultBranch !== resolvedRef) {
        console.log(`   ref "${resolvedRef}" missing; trying default branch "${defaultBranch}"`);
        resolvedRef = defaultBranch;
        rootTree = await ghGetTree(user, repo, resolvedRef, false);
      } else { throw err; }
    } else { throw err; }
  }

  const segments = subpath.split('/').filter(Boolean);
  let curTree = rootTree;
  if (segments.length === 0 && !curTree.truncated && !curTree.recursive) {
    // re-fetch recursive at root if subpath is empty
    curTree = await ghGetTree(user, repo, resolvedRef, true);
  }
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const entry = curTree.tree.find(e => e.path === seg && e.type === 'tree');
    if (!entry) throw new Error(`github: subpath segment "${seg}" not found`);
    const isLast = i === segments.length - 1;
    curTree = await ghGetTree(user, repo, entry.sha, isLast);
  }

  if (curTree.truncated) {
    console.log('   (warning: github tree truncated; some files may be missed)');
  }

  const blobs = [];
  for (const e of curTree.tree) {
    if (e.type === 'blob') blobs.push(e.path);
  }
  GH_BLOB_CACHE.set(cacheKey, blobs);
  // Also expose the resolved ref so the caller can build raw URLs.
  blobs.resolvedRef = resolvedRef;
  return blobs;
}

// Walk all saved text files in the game folder and pull out
// cdn.jsdelivr.net/gh/<user>/<repo>@<ref>/<path> URLs that aren't already
// registered as remote roots. Returns [{ prefix, localSub }].
async function discoverEmbeddedCdnRoots(job) {
  const found = new Map();
  async function walk(dir, relParent = '') {
    let ents;
    try { ents = await fs.readdir(dir, { withFileTypes: true }); }
    catch { return; }
    for (const e of ents) {
      const full = path.join(dir, e.name);
      const rel = relParent ? `${relParent}/${e.name}` : e.name;
      if (e.isDirectory()) { await walk(full, rel); continue; }
      const ext = path.extname(e.name).toLowerCase();
      if (!['.html', '.htm', '.js', '.mjs', '.css', '.json'].includes(ext)) continue;
      let text;
      try { text = await fs.readFile(full, 'utf8'); } catch { continue; }
      const rx = /https?:\/\/(?:cdn\.jsdelivr\.net\/gh|rawcdn\.githack\.com|raw\.githack\.com|raw\.githubusercontent\.com)\/[^"'\s)]+/gi;
      let m;
      while ((m = rx.exec(text)) !== null) {
        let url = m[0].replace(/[",;)\\]+$/, '');
        // Trim trailing filename — we want the directory prefix
        const parsed = parseGithubCdnUrl(url.endsWith('/') ? url : url + '/');
        if (!parsed) {
          // Maybe URL points at a file; chop its basename.
          const slash = url.lastIndexOf('/');
          if (slash > 0) url = url.slice(0, slash + 1);
        }
        // Normalize: strip filename if present
        let probe = url;
        if (!probe.endsWith('/')) probe = probe.replace(/\/[^/]*$/, '/');
        const info = parseGithubCdnUrl(probe);
        if (!info) continue;
        // Skip prefixes we already have
        if (job.remoteRoots.some(r => r.prefix === probe)) continue;
        if (found.has(probe)) continue;
        // Local subfolder: use last subpath component
        const segs = info.subpath.split('/').filter(Boolean);
        const localSub = segs[segs.length - 1] || `cdn_${info.repo}`;
        found.set(probe, { prefix: probe, localSub });
      }
    }
  }
  await walk(job.gameDir);
  let candidates = [...found.values()];
  // Skip mirrors that point to the SAME slug as the game we already pulled
  // (avoids re-downloading bendy from a second mirror into bendy/bendy/).
  candidates = candidates.filter(c => {
    const info = parseGithubCdnUrl(c.prefix);
    if (!info) return false;
    const segs = info.subpath.split('/').filter(Boolean);
    const last = segs[segs.length - 1] || '';
    if (last.toLowerCase() === (job.slug || '').toLowerCase()) return false;
    return true;
  });
  // Dedupe overlapping prefixes — drop anything that's a strict prefix or
  // strict subdirectory of another candidate. Keep the shortest covering one.
  candidates.sort((a, b) => a.prefix.length - b.prefix.length);
  const kept = [];
  for (const c of candidates) {
    if (kept.some(k => c.prefix.startsWith(k.prefix) || k.prefix.startsWith(c.prefix))) continue;
    kept.push(c);
  }
  return kept;
}

async function rewriteEmbeddedCdnUrls(job) {
  // Build replacement table: for each remoteRoot whose prefix is a jsdelivr
  // URL but whose localDir lives in a subfolder under gameDir, replace the
  // jsdelivr URL string with the local relative path.
  const replacements = [];
  for (const root of job.remoteRoots) {
    if (!/^https?:\/\/(cdn\.jsdelivr\.net|rawcdn\.githack\.com|raw\.githack\.com|raw\.githubusercontent\.com)\//i.test(root.prefix)) continue;
    const rel = path.relative(job.gameDir, root.localDir).replace(/\\/g, '/');
    if (!rel || rel.startsWith('..')) continue;
    // Replace both with and without trailing slash
    const noSlash = root.prefix.replace(/\/+$/, '');
    replacements.push([noSlash, './' + rel]);
  }
  if (replacements.length === 0) return;
  async function walk(dir) {
    let ents;
    try { ents = await fs.readdir(dir, { withFileTypes: true }); }
    catch { return; }
    for (const e of ents) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { await walk(full); continue; }
      const ext = path.extname(e.name).toLowerCase();
      if (!['.html', '.htm', '.js', '.mjs', '.css', '.json'].includes(ext)) continue;
      let text;
      try { text = await fs.readFile(full, 'utf8'); } catch { continue; }
      let changed = false;
      for (const [from, to] of replacements) {
        if (text.includes(from)) {
          text = text.split(from).join(to);
          changed = true;
        }
      }
      if (changed) await fs.writeFile(full, text);
    }
  }
  await walk(job.gameDir);
  console.log(`   rewrote ${replacements.length} embedded cdn url(s) -> local`);
}

// Detect and replace upstream "fetch-parts-then-instantiate" shim in
// index.html. The shim concatenates BATIM.data.unityweb.partN files at
// runtime, but we've already merged those on disk, so the partN URLs 404
// and the async chain rejects, leaving UnityLoader.instantiate dangling.
// Strip the shim and call UnityLoader.instantiate with the canonical json
// blob directly.
async function stripPartFetcher(gameDir) {
  const indexPath = path.join(gameDir, 'index.html');
  let html;
  try { html = await fs.readFile(indexPath, 'utf8'); } catch { return; }
  if (!/getParts\s*\(|\.partN|mergeFiles\s*\(/.test(html) && !/\.part\d+/.test(html)) return;
  // Find the json file on disk so we can pass its path to UnityLoader.
  // Loader resolves dataUrl/wasmCodeUrl/wasmFrameworkUrl relative to the
  // JSON's URL — using the file path keeps "BATIM.data.unityweb" pointing
  // at Build/BATIM.data.unityweb.
  let jsonPath = null;
  try {
    const buildDir = path.join(gameDir, 'Build');
    const ents = await fs.readdir(buildDir);
    const j = ents.find(n => n.toLowerCase().endsWith('.json'));
    if (j) jsonPath = `Build/${j}`;
  } catch {}
  if (!jsonPath) return;
  const replacement = `
<script>
(function(){
  function resizeUnityContainer() {
    var c = document.getElementById("unityContainer");
    if (c) { c.style.width = window.innerWidth + "px"; c.style.height = window.innerHeight + "px"; }
  }
  window.addEventListener("resize", resizeUnityContainer);
  resizeUnityContainer();
  UnityLoader.instantiate("unityContainer", "${jsonPath}", {
    onProgress: typeof UnityProgress === "function" ? UnityProgress : undefined,
    Module: { onRuntimeInitialized: function(){
      var t = document.querySelector("#loading-text");
      if (t) t.remove();
    }}
  });
})();
</script>`;
  // Match the entire <script>...IIFE...</script> block that contains the merge logic.
  // Heuristic: any <script> block referencing getParts/mergeFiles.
  html = html.replace(/<script>[\s\S]*?(?:getParts|mergeFiles)[\s\S]*?<\/script>/i, replacement);
  await fs.writeFile(indexPath, html);
  console.log('   stripped part-fetcher shim from index.html');
}

// Some upstream wrappers patch UnityLoader.js so resolveBuildUrl returns a
// runtime-built blob URL stored on window (e.g. window.dataUrll, set by an
// inline part-merging script in index.html). Once we strip that script, the
// runtime variable never gets set and the loader fetches the literal string
// "undefined" for the data file — game hangs forever with no errors. Restore
// resolveBuildUrl to its canonical form so the loader fetches "./Build/<name>"
// directly, which matches what we have on disk.
async function patchResolveBuildUrl(gameDir) {
  const candidates = [path.join(gameDir, 'Build', 'UnityLoader.js')];
  // Older builds keep the loader at the game root.
  candidates.push(path.join(gameDir, 'UnityLoader.js'));
  for (const p of candidates) {
    let text;
    try { text = await fs.readFile(p, 'utf8'); } catch { continue; }
    // Match the patched body. The hack is recognizable by an early-return
    // referencing window.<something> inside resolveBuildUrl.
    // The regex literal `(http|...)` inside .match() contains parens, so
    // [^?]+? is used to skip past it without prematurely closing the call.
    const re = /resolveBuildUrl:\s*function\s*\([^)]*\)\s*\{[\s\S]*?return\s+e\.match\([^?]+?\)\s*\?\s*e\s*:\s*"\.\/Build\/"\s*\+\s*e\s*\}/;
    const m = text.match(re);
    if (!m) continue;
    if (!/window\.\w+/.test(m[0])) continue; // not patched, leave alone
    const canonical = 'resolveBuildUrl: function(e) { return e.match(/(http|https|ftp|file):\\/\\//) ? e : "./Build/"+e }';
    const patched = text.replace(re, canonical);
    if (patched !== text) {
      await fs.writeFile(p, patched);
      console.log(`   reverted resolveBuildUrl hack in ${path.relative(gameDir, p)}`);
    }
  }
}

async function unwrapUnitywebEnvelopes(rootDir) {
  async function walk(dir) {
    let ents;
    try { ents = await fs.readdir(dir, { withFileTypes: true }); }
    catch { return; }
    for (const e of ents) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { await walk(full); continue; }
      if (!/\.unityweb$/i.test(e.name)) continue;
      let buf;
      try { buf = await fs.readFile(full); } catch { continue; }
      if (buf.length < 4) continue;
      // gzip magic 1f 8b
      if (buf[0] === 0x1f && buf[1] === 0x8b) {
        try {
          const out = zlib.gunzipSync(buf);
          // Sanity: inner should NOT itself start with gzip magic; it should
          // start with "UnityWeb Compressed Content" or be raw.
          await fs.writeFile(full, out);
          console.log(`   unwrapped gzip envelope: ${path.relative(rootDir, full)} (${buf.length} -> ${out.length})`);
        } catch (err) {
          console.log(`   gzip unwrap fail: ${path.relative(rootDir, full)} ${err.message}`);
        }
        continue;
      }
      // brotli magic isn't a single fixed byte sequence, but inner files
      // start with "UnityWeb Compressed Content (brotli)". If outer is
      // brotli-wrapped, brotliDecompressSync will succeed; if file is
      // already in inner form (text marker first), brotli decode fails fast.
      // Quick heuristic: if file starts with ASCII "UnityWeb" it's already
      // unwrapped — skip.
      if (buf.slice(0, 8).toString('ascii') === 'UnityWeb') continue;
      // Try brotli decode as a last resort.
      try {
        const out = zlib.brotliDecompressSync(buf);
        if (out.slice(0, 8).toString('ascii') === 'UnityWeb') {
          await fs.writeFile(full, out);
          console.log(`   unwrapped brotli envelope: ${path.relative(rootDir, full)}`);
        }
      } catch { /* not brotli, leave alone */ }
    }
  }
  await walk(rootDir);
}

async function mergeSplitParts(rootDir) {
  const groups = new Map();
  async function walk(dir) {
    const ents = await fs.readdir(dir, { withFileTypes: true });
    for (const e of ents) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { await walk(full); continue; }
      const m = e.name.match(/^(.+)\.part(\d+)$/);
      if (!m) continue;
      const base = path.join(dir, m[1]);
      if (!groups.has(base)) groups.set(base, []);
      groups.get(base).push({ idx: parseInt(m[2], 10), full });
    }
  }
  try { await walk(rootDir); } catch { return; }
  for (const [base, parts] of groups) {
    parts.sort((a, b) => a.idx - b.idx);
    const out = await fs.open(base, 'w');
    try {
      for (const p of parts) {
        const buf = await fs.readFile(p.full);
        await out.write(buf);
      }
    } finally { await out.close(); }
    for (const p of parts) await fs.unlink(p.full);
    console.log(`   merged ${parts.length} parts -> ${path.basename(base)}`);
  }
}

async function validateLocalAssets(gameDir) {
  const indexPath = path.join(gameDir, 'index.html');
  let html;
  try { html = await fs.readFile(indexPath, 'utf8'); } catch { return ['index.html']; }
  const missing = [];
  const seen = new Set();
  const patterns = [
    /<script[^>]*\bsrc=["']([^"']+)["']/gi,
    /<link[^>]*\brel=["'](?:stylesheet)["'][^>]*\bhref=["']([^"']+)["']/gi,
    /<link[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["'](?:stylesheet)["']/gi,
    /<img[^>]*\bsrc=["']([^"']+)["']/gi
  ];
  for (const rx of patterns) {
    let m;
    while ((m = rx.exec(html)) !== null) {
      const href = m[1];
      if (/^(https?:|data:|#|mailto:)/i.test(href) || href.startsWith('//')) continue;
      const clean = href.split('?')[0].split('#')[0].replace(/^\/+/, '');
      if (!clean || seen.has(clean)) continue;
      seen.add(clean);
      try { await fs.access(path.join(gameDir, clean)); }
      catch { missing.push(clean); }
    }
  }
  return missing;
}

// ---------------- URL / filesystem helpers ----------------

function absolute(href, base) {
  try { return new URL(href, base).href; } catch { return null; }
}

function mapUrlToLocal(url, job) {
  // Strip query/fragment then match against any registered remote root
  const cleanUrl = url.split('?')[0].split('#')[0];
  for (const root of job.remoteRoots) {
    if (cleanUrl.startsWith(root.prefix)) {
      const rel = cleanUrl.slice(root.prefix.length) || 'index.html';
      const safe = rel.replace(/^\/+/, '').replace(/\.\.+/g, '_');
      if (!safe) return null;
      return path.join(root.localDir, safe);
    }
  }
  return null;
}

async function writeFileSafe(p, buf) {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, buf);
}

function shouldFollow(url, job) {
  if (!url) return false;
  if (SKIP_HOST_PATTERNS.some(rx => rx.test(url))) return false;
  const clean = url.split('?')[0].split('#')[0];
  return job.remoteRoots.some(r => clean.startsWith(r.prefix));
}

function isTextUrl(url) {
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    return TEXT_EXT.has(ext) || ext === '';
  } catch { return false; }
}

// ---------------- ref extraction ----------------

// HTML/CSS attribute matches are unambiguous — accept any value.
// The bare-string regex (last entry) is for inline JS / config blobs and is
// the source of every false-positive in the failed-asset list. To rule those
// out it requires the matched string to look like a real path: contain a `/`,
// start with `./` or `../`, or be a bare filename ending in a known
// well-known asset extension (NOT just any `.js` — that catches `inflate.js`
// require() identifiers, etc.).
const REF_PATTERNS = [
  /<script[^>]*\bsrc=["']([^"']+)["']/gi,
  /<link[^>]*\bhref=["']([^"']+)["']/gi,
  /<img[^>]*\bsrc=["']([^"']+)["']/gi,
  /<source[^>]*\bsrc=["']([^"']+)["']/gi,
  /<audio[^>]*\bsrc=["']([^"']+)["']/gi,
  /<video[^>]*\bsrc=["']([^"']+)["']/gi,
  /<iframe[^>]*\bsrc=["']([^"']+)["']/gi,
  /url\(\s*["']?([^"')]+)["']?\s*\)/gi,
  // Bare-string refs inside JS/JSON: must be path-shaped (contain a slash)
  // and end in an asset extension. Reject expression-shaped strings to avoid
  // false positives like require("inflate.js") or "e.Module.progressLogoUrl".
  /["']([A-Za-z0-9._\-]+(?:\/[A-Za-z0-9._\-]+)+\.(?:js|mjs|css|json|wasm|data|unityweb|pck|mem|ogg|mp3|wav|m4a|webm|mp4|png|jpg|jpeg|gif|webp|svg|ttf|woff2?|otf|atlas|map))["']/gi
];

function extractRefs(text, baseUrl, altBases = []) {
  const out = new Set();
  const tryResolve = (raw) => {
    if (!raw || raw.startsWith('data:') || raw.startsWith('javascript:') || raw.startsWith('#') || raw.startsWith('mailto:')) return;
    // Primary resolution against the file's own URL
    const abs = absolute(raw, baseUrl);
    if (abs) out.add(abs);
    // Alt bases (e.g. the game root) — useful when JS files in a subfolder
    // reference assets via paths meant to resolve against the document base.
    if (!/^https?:\/\//i.test(raw) && !raw.startsWith('//') && !raw.startsWith('/')) {
      for (const ab of altBases) {
        const abs2 = absolute(raw, ab);
        if (abs2 && abs2 !== abs) out.add(abs2);
      }
    }
  };
  for (const rx of REF_PATTERNS) {
    rx.lastIndex = 0;
    let m;
    while ((m = rx.exec(text)) !== null) tryResolve(m[1]);
  }
  return out;
}

// ---------------- HTTP ----------------

function fetchBuffer(url, redirects = 0, extraHeaders) {
  return new Promise((resolve, reject) => {
    let u;
    try { u = new URL(url); } catch (e) { return reject(e); }
    const client = u.protocol === 'https:' ? https : http;
    const headers = {
      'User-Agent': UA,
      Accept: '*/*',
      Referer: ORIGIN + '/',
      'Accept-Encoding': 'identity',
      ...(extraHeaders || {})
    };
    const req = client.get(url, { headers, timeout: 30000 }, res => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        if (redirects > 5) return reject(new Error('too many redirects'));
        const next = absolute(res.headers.location, url);
        res.resume();
        return resolve(fetchBuffer(next, redirects + 1, extraHeaders));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(new Error('timeout')); });
  });
}

async function fetchText(url) {
  return (await fetchBuffer(url)).toString('utf8');
}

// ---------------- CLI ----------------

if (require.main === module) {
  const inputFile = process.argv[2] || 'games.txt';
  new Downloader().run(inputFile).catch(e => {
    console.error('fatal:', e);
    process.exit(1);
  });
}

module.exports = { Downloader };
