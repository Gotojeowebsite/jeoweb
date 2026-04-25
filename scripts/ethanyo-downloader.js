#!/usr/bin/env node

/**
 * Ethanyo Game Downloader
 * Downloads games from ethanyo.freetls.fastly.net with all assets for offline play
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const { execSync } = require('child_process');

class EthanyoDownloader {
  constructor() {
    this.baseUrl = 'https://ethanyo.freetls.fastly.net';
    this.assetsPath = path.join(process.cwd(), 'Assets');
    this.downloadedAssets = new Set();
    this.failedAssets = [];
    this.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };
  }

  /**
   * Main entry point
   */
  async run(inputFile) {
    console.log('🎮 Ethanyo Game Downloader Started');

    // Read URLs from input file
    const urls = await this.readUrlsFromFile(inputFile);
    console.log(`📋 Found ${urls.length} games to download`);

    for (const url of urls) {
      try {
        await this.downloadGame(url);
      } catch (error) {
        console.error(`❌ Failed to download game from ${url}:`, error.message);
        this.failedAssets.push({ url, error: error.message });
      }
    }

    // Report results
    this.reportResults();
  }

  /**
   * Read URLs from text file
   */
  async readUrlsFromFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return content.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'));
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Create example file
        await this.createExampleFile(filePath);
        console.log(`📝 Created example file: ${filePath}`);
        console.log('   Add your game URLs and run again.');
        process.exit(0);
      }
      throw error;
    }
  }

  /**
   * Create example input file
   */
  async createExampleFile(filePath) {
    const example = `# Ethanyo Game URLs
# Add one URL per line
# Lines starting with # are ignored

# Direct game URLs
https://ethanyo.freetls.fastly.net/misc/play/astrosurvivor.html
https://ethanyo.freetls.fastly.net/misc/play/drivemad.html

# Query-based URLs
https://ethanyo.freetls.fastly.net/misc/play/?title=Balatro&author=LocalThunk&link=balatro
https://ethanyo.freetls.fastly.net/misc/play/?title=AmongUs&link=amongus
`;
    await fs.writeFile(filePath, example);
  }

  /**
   * Download a single game
   */
  async downloadGame(gameUrl) {
    console.log(`\n📥 Downloading game from: ${gameUrl}`);

    // Parse game info from URL
    const gameInfo = this.parseGameUrl(gameUrl);
    console.log(`   Game: ${gameInfo.title} (${gameInfo.slug})`);

    // Create game directory
    const gameDir = path.join(this.assetsPath, gameInfo.slug);
    await fs.mkdir(gameDir, { recursive: true });

    // Download main HTML
    const htmlPath = path.join(gameDir, 'index.html');
    const html = await this.downloadFile(gameUrl, htmlPath, false);

    // Parse and download all assets
    await this.downloadGameAssets(html, gameUrl, gameDir);

    // Download logo from game listing
    await this.downloadGameLogo(gameInfo, gameDir);

    // Validate offline readiness
    const isOfflineReady = await this.validateOfflineGame(gameDir);

    if (isOfflineReady) {
      console.log(`✅ ${gameInfo.title} downloaded successfully!`);
    } else {
      console.log(`⚠️ ${gameInfo.title} downloaded but may need additional assets`);
    }

    // Update games list
    await this.updateGamesList(gameInfo, gameDir);

    return gameInfo;
  }

  /**
   * Parse game information from URL
   */
  parseGameUrl(gameUrl) {
    const url = new URL(gameUrl);
    const params = url.searchParams;

    let title, slug, author;

    if (params.has('title')) {
      // Query-based URL
      title = params.get('title');
      slug = params.get('link') || title.toLowerCase().replace(/\s+/g, '');
      author = params.get('author') || 'Unknown';
    } else {
      // Direct URL
      const pathParts = url.pathname.split('/');
      const filename = pathParts[pathParts.length - 1];
      slug = filename.replace('.html', '');
      title = slug.charAt(0).toUpperCase() + slug.slice(1);
      author = 'Unknown';
    }

    return { title, slug, author, url: gameUrl };
  }

  /**
   * Download and parse game assets
   */
  async downloadGameAssets(html, baseUrl, gameDir) {
    console.log('   📦 Downloading game assets...');

    // Extract asset URLs from HTML
    const assetUrls = this.extractAssetUrls(html, baseUrl);
    console.log(`   Found ${assetUrls.length} assets to download`);

    // Download each asset
    for (const assetUrl of assetUrls) {
      try {
        await this.downloadAsset(assetUrl, gameDir, baseUrl);
      } catch (error) {
        console.error(`   ⚠️ Failed to download: ${assetUrl}`);
        this.failedAssets.push(assetUrl);
      }
    }

    // Handle dynamic assets (Unity, WebAssembly, etc.)
    await this.downloadDynamicAssets(html, gameDir, baseUrl);
  }

  /**
   * Extract asset URLs from HTML
   */
  extractAssetUrls(html, baseUrl) {
    const urls = new Set();

    // Regular expressions for different asset types
    const patterns = [
      // Scripts
      /<script[^>]*src=["']([^"']+)["']/gi,
      // Stylesheets
      /<link[^>]*href=["']([^"']+\.css[^"']*)["']/gi,
      // Images
      /<img[^>]*src=["']([^"']+)["']/gi,
      // Audio/Video
      /<(?:audio|video|source)[^>]*src=["']([^"']+)["']/gi,
      // CSS url()
      /url\(["']?([^"')]+)["']?\)/gi,
      // Data files
      /["']([^"']+\.(?:json|xml|data|wasm|unityweb|pck|zip))["']/gi,
      // Fetch/XHR calls
      /fetch\(["']([^"']+)["']\)/gi,
      /XMLHttpRequest.*open\([^,]+,\s*["']([^"']+)["']/gi
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const url = this.resolveUrl(match[1], baseUrl);
        if (url && !url.startsWith('data:')) {
          urls.add(url);
        }
      }
    }

    return Array.from(urls);
  }

  /**
   * Download dynamic assets (Unity, WebAssembly, etc.)
   */
  async downloadDynamicAssets(html, gameDir, baseUrl) {
    // Check for Unity
    if (html.includes('UnityLoader') || html.includes('unityInstance')) {
      console.log('   🎮 Detected Unity game, downloading engine files...');
      await this.downloadUnityAssets(html, gameDir, baseUrl);
    }

    // Check for Godot
    if (html.includes('Engine.startGame') || html.includes('.pck')) {
      console.log('   🎮 Detected Godot game, downloading engine files...');
      await this.downloadGodotAssets(html, gameDir, baseUrl);
    }

    // Check for Construct
    if (html.includes('c2runtime') || html.includes('c3runtime')) {
      console.log('   🎮 Detected Construct game, downloading runtime files...');
      await this.downloadConstructAssets(html, gameDir, baseUrl);
    }

    // Check for Phaser
    if (html.includes('Phaser') || html.includes('phaser.min.js')) {
      console.log('   🎮 Detected Phaser game, downloading assets...');
      await this.downloadPhaserAssets(html, gameDir, baseUrl);
    }
  }

  /**
   * Download Unity-specific assets
   */
  async downloadUnityAssets(html, gameDir, baseUrl) {
    const unityPatterns = [
      /\.data\.unityweb/gi,
      /\.wasm\.unityweb/gi,
      /\.framework\.js\.unityweb/gi,
      /\.loader\.js/gi,
      /Build\/[^"']+/gi
    ];

    for (const pattern of unityPatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const url = this.resolveUrl(match[0], baseUrl);
        if (url) {
          await this.downloadAsset(url, gameDir, baseUrl);
        }
      }
    }
  }

  /**
   * Download Godot-specific assets
   */
  async downloadGodotAssets(html, gameDir, baseUrl) {
    const godotPatterns = [
      /\.pck/gi,
      /\.wasm/gi,
      /\.js/gi
    ];

    for (const pattern of godotPatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const url = this.resolveUrl(match[0], baseUrl);
        if (url) {
          await this.downloadAsset(url, gameDir, baseUrl);
        }
      }
    }
  }

  /**
   * Download Construct-specific assets
   */
  async downloadConstructAssets(html, gameDir, baseUrl) {
    // Parse data.js for asset list
    const dataJsMatch = html.match(/data\.js/);
    if (dataJsMatch) {
      const dataJsUrl = this.resolveUrl('data.js', baseUrl);
      const dataJs = await this.fetchUrl(dataJsUrl);

      // Extract asset URLs from data.js
      const assetMatches = dataJs.matchAll(/["']([^"']+\.(png|jpg|jpeg|gif|mp3|ogg|m4a|webm))["']/gi);
      for (const match of assetMatches) {
        const url = this.resolveUrl(match[1], baseUrl);
        await this.downloadAsset(url, gameDir, baseUrl);
      }
    }
  }

  /**
   * Download Phaser-specific assets
   */
  async downloadPhaserAssets(html, gameDir, baseUrl) {
    // Look for asset manifests
    const manifestPatterns = [
      /assets\.json/gi,
      /manifest\.json/gi,
      /preload\([^)]+\)/gi
    ];

    for (const pattern of manifestPatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        // Parse manifest and download listed assets
        const manifestUrl = this.resolveUrl(match[0], baseUrl);
        if (manifestUrl && manifestUrl.endsWith('.json')) {
          try {
            const manifest = JSON.parse(await this.fetchUrl(manifestUrl));
            await this.downloadManifestAssets(manifest, gameDir, baseUrl);
          } catch (error) {
            // Not a valid manifest, skip
          }
        }
      }
    }
  }

  /**
   * Download assets from a manifest file
   */
  async downloadManifestAssets(manifest, gameDir, baseUrl) {
    const processObject = (obj) => {
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string' && this.isAssetUrl(value)) {
          const url = this.resolveUrl(value, baseUrl);
          this.downloadAsset(url, gameDir, baseUrl).catch(() => {});
        } else if (typeof value === 'object' && value !== null) {
          processObject(value);
        }
      }
    };

    processObject(manifest);
  }

  /**
   * Download a single asset
   */
  async downloadAsset(assetUrl, gameDir, baseUrl) {
    // Skip if already downloaded
    if (this.downloadedAssets.has(assetUrl)) {
      return;
    }

    this.downloadedAssets.add(assetUrl);

    // Determine local path
    const urlObj = new URL(assetUrl);
    const assetPath = urlObj.pathname;
    const localPath = path.join(gameDir, assetPath);

    // Create directory structure
    await fs.mkdir(path.dirname(localPath), { recursive: true });

    // Download file
    await this.downloadFile(assetUrl, localPath);

    // If it's a CSS file, parse for more assets
    if (assetPath.endsWith('.css')) {
      const css = await fs.readFile(localPath, 'utf8');
      const cssAssets = this.extractAssetUrls(css, assetUrl);
      for (const cssAsset of cssAssets) {
        await this.downloadAsset(cssAsset, gameDir, baseUrl).catch(() => {});
      }
    }

    // If it's a JS file, check for dynamic imports
    if (assetPath.endsWith('.js')) {
      const js = await fs.readFile(localPath, 'utf8');
      const jsAssets = this.extractAssetUrls(js, assetUrl);
      for (const jsAsset of jsAssets) {
        await this.downloadAsset(jsAsset, gameDir, baseUrl).catch(() => {});
      }
    }
  }

  /**
   * Download game logo from listing page
   */
  async downloadGameLogo(gameInfo, gameDir) {
    console.log('   🖼️ Downloading game logo...');

    try {
      // Try to get logo from main games page
      const gamesPageUrl = `${this.baseUrl}/g`;
      const gamesPage = await this.fetchUrl(gamesPageUrl);

      // Look for the game's logo in the listing
      const logoPattern = new RegExp(`<img[^>]*alt=["']${gameInfo.title}["'][^>]*src=["']([^"']+)["']`, 'i');
      const match = gamesPage.match(logoPattern);

      if (match) {
        const logoUrl = this.resolveUrl(match[1], gamesPageUrl);
        const ext = path.extname(logoUrl) || '.png';
        const logoPath = path.join(gameDir, `logo${ext}`);
        await this.downloadFile(logoUrl, logoPath);
        console.log('   ✅ Logo downloaded');
      } else {
        // Try alternate method - look for any image with game slug
        const altPattern = new RegExp(`<img[^>]*src=["']([^"']*${gameInfo.slug}[^"']*)["']`, 'i');
        const altMatch = gamesPage.match(altPattern);

        if (altMatch) {
          const logoUrl = this.resolveUrl(altMatch[1], gamesPageUrl);
          const ext = path.extname(logoUrl) || '.png';
          const logoPath = path.join(gameDir, `logo${ext}`);
          await this.downloadFile(logoUrl, logoPath);
          console.log('   ✅ Logo downloaded (alternate method)');
        }
      }
    } catch (error) {
      console.log('   ⚠️ Could not download logo:', error.message);
    }
  }

  /**
   * Download a file
   */
  async downloadFile(url, destPath, returnContent = true) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const client = urlObj.protocol === 'https:' ? https : http;

      const options = {
        headers: {
          ...this.headers,
          'Referer': this.baseUrl,
          'Origin': this.baseUrl
        }
      };

      client.get(url, options, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          // Follow redirect
          this.downloadFile(response.headers.location, destPath, returnContent)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', async () => {
          const buffer = Buffer.concat(chunks);
          await fs.writeFile(destPath, buffer);

          if (returnContent) {
            resolve(buffer.toString('utf8'));
          } else {
            resolve();
          }
        });
        response.on('error', reject);
      }).on('error', reject);
    });
  }

  /**
   * Fetch URL content
   */
  async fetchUrl(url) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const client = urlObj.protocol === 'https:' ? https : http;

      const options = {
        headers: {
          ...this.headers,
          'Referer': this.baseUrl,
          'Origin': this.baseUrl
        }
      };

      client.get(url, options, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          // Follow redirect
          this.fetchUrl(response.headers.location)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          resolve(Buffer.concat(chunks).toString('utf8'));
        });
        response.on('error', reject);
      }).on('error', reject);
    });
  }

  /**
   * Resolve relative URL to absolute
   */
  resolveUrl(url, baseUrl) {
    if (!url) return null;

    // Already absolute
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
      return url.startsWith('//') ? 'https:' + url : url;
    }

    // Data URI
    if (url.startsWith('data:')) {
      return null;
    }

    // Resolve relative to base
    try {
      return new URL(url, baseUrl).href;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if URL is an asset
   */
  isAssetUrl(url) {
    const assetExtensions = [
      '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp',
      '.mp3', '.ogg', '.m4a', '.wav', '.webm',
      '.mp4', '.ogv', '.webm',
      '.woff', '.woff2', '.ttf', '.otf',
      '.json', '.xml', '.data', '.wasm', '.unityweb', '.pck'
    ];

    return assetExtensions.some(ext => url.toLowerCase().includes(ext));
  }

  /**
   * Validate game works offline
   */
  async validateOfflineGame(gameDir) {
    const indexPath = path.join(gameDir, 'index.html');

    try {
      const html = await fs.readFile(indexPath, 'utf8');

      // Check for external dependencies
      const externalDeps = [
        'googletagmanager.com',
        'google-analytics.com',
        'cloudflare.com',
        'cdn.jsdelivr.net',
        'unpkg.com',
        'cdnjs.cloudflare.com'
      ];

      for (const dep of externalDeps) {
        if (html.includes(dep)) {
          // Try to replace with local versions
          await this.localizeExternalDependency(dep, html, indexPath);
        }
      }

      // Check all local assets exist
      const localAssets = this.extractAssetUrls(html, 'file://' + gameDir);
      for (const asset of localAssets) {
        if (asset.startsWith('http')) continue;

        const assetPath = path.join(gameDir, asset.replace('file://', ''));
        try {
          await fs.access(assetPath);
        } catch {
          console.log(`   ⚠️ Missing local asset: ${asset}`);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('   ❌ Validation error:', error.message);
      return false;
    }
  }

  /**
   * Replace external dependency with local version
   */
  async localizeExternalDependency(dep, html, indexPath) {
    // Common CDN replacements
    const replacements = {
      'googletagmanager.com': '<!-- Google Tag Manager removed for offline -->',
      'google-analytics.com': '<!-- Google Analytics removed for offline -->',
      'cloudflare.com': '<!-- Cloudflare removed for offline -->'
    };

    if (replacements[dep]) {
      const pattern = new RegExp(`<script[^>]*${dep}[^>]*>.*?</script>`, 'gi');
      html = html.replace(pattern, replacements[dep]);
      await fs.writeFile(indexPath, html);
    }
  }

  /**
   * Update games list JSON
   */
  async updateGamesList(gameInfo, gameDir) {
    const gamesListPath = path.join(process.cwd(), 'games_list.json');

    try {
      // Read existing list
      let gamesList = [];
      try {
        const content = await fs.readFile(gamesListPath, 'utf8');
        gamesList = JSON.parse(content);
      } catch {
        // File doesn't exist or is invalid
      }

      // Check if game already exists
      const existingIndex = gamesList.findIndex(g => g.slug === gameInfo.slug);

      // Find logo
      let logo = null;
      const possibleLogos = ['logo.png', 'logo.jpg', 'logo.jpeg', 'logo.gif', 'logo.svg'];
      for (const logoFile of possibleLogos) {
        try {
          await fs.access(path.join(gameDir, logoFile));
          logo = logoFile;
          break;
        } catch {
          // Try next
        }
      }

      // Create game entry
      const gameEntry = {
        title: gameInfo.title,
        slug: gameInfo.slug,
        author: gameInfo.author,
        type: 'webgl', // Default, will be determined by scanner
        logo: logo,
        path: `Assets/${gameInfo.slug}/index.html`,
        dateAdded: new Date().toISOString(),
        source: 'ethanyo',
        originalUrl: gameInfo.url
      };

      if (existingIndex >= 0) {
        // Update existing
        gamesList[existingIndex] = { ...gamesList[existingIndex], ...gameEntry };
      } else {
        // Add new
        gamesList.push(gameEntry);
      }

      // Write back
      await fs.writeFile(gamesListPath, JSON.stringify(gamesList, null, 2));

      // Also run the scanner to update properly
      try {
        execSync('node scan.js', { stdio: 'inherit' });
      } catch {
        // Scanner might not exist yet
      }
    } catch (error) {
      console.error('   ⚠️ Could not update games list:', error.message);
    }
  }

  /**
   * Report download results
   */
  reportResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Download Summary:');
    console.log('='.repeat(60));
    console.log(`✅ Downloaded assets: ${this.downloadedAssets.size}`);
    console.log(`❌ Failed assets: ${this.failedAssets.length}`);

    if (this.failedAssets.length > 0) {
      console.log('\nFailed assets:');
      this.failedAssets.forEach(asset => {
        if (typeof asset === 'string') {
          console.log(`  - ${asset}`);
        } else {
          console.log(`  - ${asset.url}: ${asset.error}`);
        }
      });
    }

    console.log('\n✨ Done!');
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const inputFile = args[0] || 'ethanyo-games.txt';

  const downloader = new EthanyoDownloader();
  downloader.run(inputFile).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = EthanyoDownloader;