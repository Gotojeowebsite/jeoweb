/* ProxyFinder.js - plain JS (simplified: parallel PHP+image -> redirect; else fallback, no WS) */

(function (global) {
	'use strict';
  
	const DEFAULT_SOURCE_URL = '../root_domains.json';
  
	class ProxyFinder {
	  // ----- static state -----
	  static _domains = [];
	  static _index = 0;
	  static _isTesting = false;
	  static _domainsLoaded = false;
	  static _inflight = null; // AbortController for current probe (PHP)
	  static _sourceUrl = DEFAULT_SOURCE_URL; // override via setSourceUrl()
	  static _requestTimeoutMs = 10000;   // override via setRequestTimeout()
	  static _debug = false; // if true, do not navigate; just log and short-circuit
	  static _isNorthAmericanIP = null; // cached result for IP geolocation check
  
	  // ----- fallback host (no redirect; swap content base only) -----
	  static _fallbackHost = ['mathlete.pages.dev', 'shellbros.pages.dev'];
	  static setFallbackHost(host) {
		if (Array.isArray(host)) {
		  const cleaned = host
			.map(h => {
			  const t = String(h || '').trim()
				.replace(/^[a-z]+:\/\//i, '')
				.replace(/^\/\//, '')
				.replace(/[#?].*$/, '')
				.replace(/\/+.*/, '');
			  return t;
			})
			.filter(Boolean);
		  if (cleaned.length > 0) this._fallbackHost = cleaned;
		} else {
		  const t = String(host || '').trim()
			.replace(/^[a-z]+:\/\//i, '')
			.replace(/^\/\//, '')
			.replace(/[#?].*$/, '')
			.replace(/\/+.*/, '');
		  if (t) this._fallbackHost = [t];
		}
	  }
  
	  // ----- environment detection -----
	  static isChromebook() {
		const ua = (global.navigator?.userAgent || '').toLowerCase();
		return ua.includes('cros') || ua.includes('chrome os');
	  }
  
	  static _host() {
		return (global.location?.hostname || '').toLowerCase();
	  }
  
	  static isGoogleSites() {
		const h = this._host();
		return (
		  h.includes('google.com') ||
		  h.includes('googleusercontent.com') ||
		  h.includes('googlesites.com')
		);
	  }
  
	  static isGitHub() {
		const h = this._host();
		return h.includes('github.io') || h.includes('github.com') || h.includes('githubusercontent.com');
	  }
  
	  static isGitLab() {
		const h = this._host();
		return h.includes('gitlab.io') || h.includes('gitlab.com') || h.includes('gitlabusercontent.com');
	  }
  
	  static isReplit() {
		const h = this._host();
		return h.includes('replit.com') || h.includes('repl.co') || h.includes('repl.it');
	  }

	  static isCloudflareSites() {
		const h = this._host();
		return h.includes('pages.dev') || h.includes('cloudflarepages.com') || h.includes('cf-pages.net');
	  }
  
	  static getHostingPlatform() {
		if (this.isGoogleSites()) return 'Google Sites';
		if (this.isGitHub()) return 'GitHub';
		if (this.isGitLab()) return 'GitLab';
		if (this.isReplit()) return 'Replit';
		if (this.isCloudflareSites()) return 'Cloudflare Pages';
		return 'Unknown';
	  }
  
	  static isSupportedHosting() {
		return this.isGoogleSites() || this.isGitHub() || this.isGitLab() || this.isReplit() || this.isCloudflareSites();
	  }
  
	  static _utmSource() {
		if (this.isGoogleSites()) return 'googlesites';
		if (this.isGitHub()) return 'github';
		if (this.isGitLab()) return 'gitlab';
		if (this.isReplit()) return 'replit';
		if (this.isCloudflareSites()) return 'cloudflare';
		return 'unknown';
	  }

	  static async isNorthAmericanIPAddress() {
		// Return cached result if available
		if (this._isNorthAmericanIP !== null) {
		  return this._isNorthAmericanIP;
		}

		// North American country codes
		const naCountries = ['US', 'CA', 'MX'];
		let isNA = false;

		try {
		  // Try Cloudflare's trace endpoint first (fastest, no API key needed)
		  const controller = new AbortController();
		  const timeout = setTimeout(() => controller.abort(), 5000);
		  
		  const traceRes = await fetch('https://cloudflare.com/cdn-cgi/trace', { 
			method: 'GET', 
			cache: 'no-store',
			signal: controller.signal
		  });
		  clearTimeout(timeout);
		  
		  const traceText = await traceRes.text();
		  const countryMatch = traceText.match(/loc=([A-Z]{2})/);
		  
		  if (countryMatch && countryMatch[1]) {
			const country = countryMatch[1];
			isNA = naCountries.includes(country);
			console.log('isNorthAmericanIPAddress country from CF:', country, 'isNA:', isNA);
			this._isNorthAmericanIP = isNA;
			return isNA;
		  }
		} catch (err) {
		  console.warn('isNorthAmericanIPAddress CF trace failed:', err?.message || err);
		}

		// Fallback to ipapi.co (free tier: 1000 requests/day)
		try {
		  const controller = new AbortController();
		  const timeout = setTimeout(() => controller.abort(), 5000);
		  
		  const apiRes = await fetch('https://ipapi.co/json/', { 
			method: 'GET', 
			cache: 'no-store',
			signal: controller.signal
		  });
		  clearTimeout(timeout);
		  
		  if (apiRes.ok) {
			const data = await apiRes.json();
			const country = data.country_code || data.country;
			if (country) {
			  isNA = naCountries.includes(country.toUpperCase());
			  console.log('isNorthAmericanIPAddress country from ipapi:', country, 'isNA:', isNA);
			  this._isNorthAmericanIP = isNA;
			  return isNA;
			}
		  }
		} catch (err) {
		  console.warn('isNorthAmericanIPAddress ipapi failed:', err?.message || err);
		}

		// If all checks fail, default to false and cache it
		console.warn('isNorthAmericanIPAddress: Unable to determine location, defaulting to false');
		this._isNorthAmericanIP = false;
		return false;
	  }
  
	  // ----- source / domain management -----
	  static _parseDomainsText(text) {
		// Split on commas or any whitespace; trim; dedupe
		const tokens = text.split(/[, \t\r\n]+/g).map(s => s.trim()).filter(Boolean);
		const seen = new Set(this._domains.map(d => d.toLowerCase().trim()));
		const out = [];
		for (const t of tokens) {
		  const k = t.toLowerCase();
		  if (!seen.has(k)) {
			seen.add(k);
			out.push(t);
		  }
		}
		return out;
	  }
  
	  static _ingestDomainArray(arr) {
		if (!Array.isArray(arr)) return;
		for (const raw of arr) {
		  if (typeof raw !== 'string') continue;
		  const t = raw.trim();
		  if (!t) continue;
		  const k = t.toLowerCase();
		  if (!this._domains.some(d => d.toLowerCase() === k)) {
			this._domains.push(t);
		  }
		}
	  }
  
	  static _resolveSourceCandidates() {
		// Build absolute candidates from (a) configured string, (b) root-relative, (c) same-dir guesses
		const base = (global.location && global.location.href) ? global.location.href : 'https://localhost/';
		const configured = (() => { try { return new URL(this._sourceUrl, base).toString(); } catch { return this._sourceUrl; } })();
		const guesses = [
		  configured,
		  '/root_domains.json',              // root-relative
		  'root_domains.json',               // same directory as page
		  new URL('../root_domains.json', base).toString(),
		  new URL('/app/root_domains.json', base).toString()
		];
		// De-dup while preserving order
		const seen = new Set();
		const out = [];
		for (const g of guesses) { const k = String(g); if (!seen.has(k)) { seen.add(k); out.push(k); } }
		return out;
	  }
  
	  static async _loadDomainsFromSource() {
		console.log('loading domains from', this._sourceUrl);
		const candidates = this._resolveSourceCandidates();
  
		let loaded = false;
		let lastErr = null;
  
		for (const url of candidates) {
		  try {
			const res = await fetch(url, { method: 'GET', cache: 'no-store' });
			console.log('[domains] try', url, '->', res.status, res.ok, res.headers.get('content-type'));
			if (!res.ok) { continue; }
  
			const ct = (res.headers.get('content-type') || '').toLowerCase();
			if (ct.includes('application/json') || /\.json(\?|$)/i.test(url)) {
			  const data = await res.json();
			  if (Array.isArray(data)) this._ingestDomainArray(data);
			  else if (data && Array.isArray(data.domains)) this._ingestDomainArray(data.domains);
			  else console.warn('[domains] JSON structure not an array or {domains:[...]}', data);
			} else {
			  const text = await res.text();
			  const extra = this._parseDomainsText(text);
			  if (extra.length) this._domains.push(...extra);
			}
			loaded = true;
			break; // success
		  } catch (err) {
			console.warn('[domains] fetch failed for', url, err?.name || err, err?.message || '');
			lastErr = err;
			continue;
		  }
		}
  
		// normalize & dedupe always
		const seen = new Set();
		const uniq = [];
		for (const d of this._domains) {
		  const k = String(d).toLowerCase().trim();
		  if (k && !seen.has(k)) { seen.add(k); uniq.push(k); }
		}
		this._domains = uniq;
  
		if (!loaded) {
		  console.error('[domains] none of the candidates loaded; last error:', lastErr?.name || lastErr, lastErr?.message || '');
		  // Minimal fallback so the rest of the flow can continue for debugging
		  if (this._domains.length === 0) {
			console.warn('[domains] falling back to hardcoded probe list for debug');
			this._domains = ['algebra.best'];
		  }
		}
  
		this._domainsLoaded = true;
	  }
  
	  static refreshDomains(onComplete = null) {
		this._domainsLoaded = false;
		this._loadDomainsFromSource().finally(() => {
		  if (typeof onComplete === 'function') onComplete();
		});
	  }
  
	  static getDomains() {
		return [...this._domains];
	  }
  
	  static getDomainCount() {
		return this._domains.length;
	  }
  
	  // ----- core probes -----
	  static async _phpProbe(host) {
		const controller = new AbortController();
		this._inflight = controller;
		const timer = setTimeout(() => controller.abort(), this._requestTimeoutMs);
  
		let ok = false;
		try {
		  const url = `https://${host}/pingtest.php`;
		  console.log('[Stage 1] 🩺 PHP probe:', url);
		  const res = await fetch(url, { method:'GET', cache:'no-store', signal: controller.signal });
		  const body = res.ok ? await res.text() : '';
		  console.log('[Stage 1] PHP status:', res.status, 'ok:', res.ok);
		  ok = (res.ok && typeof body === 'string' && body.includes('shell.ok'));
		} catch (e) {
		  console.warn('[Stage 1] PHP probe failed:', e?.name || e, e?.message || '');
		} finally {
		  clearTimeout(timer);
		  if (this._inflight === controller) this._inflight = null;
		}
		return ok;
	  }
  
	  static async _imageProbe(host, timeoutMs = 3000) {
		return new Promise((resolve) => {
		  const img = new Image();
		  const timer = setTimeout(() => {
			try { img.src = ''; } catch(_) {}
			resolve(false);
		  }, timeoutMs);
  
		  img.onload = () => { clearTimeout(timer); resolve(true); };
		  img.onerror = () => { clearTimeout(timer); resolve(false); };
		  img.src = `https://${host}/favicon.ico?t=${Date.now()}`;
		});
	  }
  
	  // ----- fallback apply (no redirect) -----
	  static _isHttps() {
		try { return (global.location?.protocol || '').toLowerCase().startsWith('https'); } catch (_) { return true; }
	  }
  
	  static _applySelectedHost(host, meta = {}, onSuccess) {
		const protocol = this._isHttps() ? 'https' : 'http';
		global.dynamicContentRoot = host;

		console.log(`[Proxy] using ${global.dynamicContentPrefix}`, meta);
		try {
		  if (typeof this.onProxySelected === 'function') this.onProxySelected(host, meta);
		} catch (_) {}
		try {
		  global.window && window.dispatchEvent && window.dispatchEvent(new CustomEvent('proxy:selected', { detail: { host, meta } }));
		} catch (_) {}
		onSuccess?.();
	  }
  
	  static async _tryFallback(onSuccess) {
		const hosts = Array.isArray(this._fallbackHost) ? this._fallbackHost : [this._fallbackHost];
		if (!hosts || hosts.length === 0) return false;
		
		for (const host of hosts) {
		  if (!host) continue;
		  console.log('[Stage 2] Trying fallback host:', host);
		  const ok = await this._imageProbe(host, 3000);
		  if (ok) {
			this._applySelectedHost(host, { source: 'fallback' }, onSuccess); // NO redirect
			return true;
		  }
		  console.warn('[Stage 2] Fallback image probe failed for', host);
		}
		return false;
	  }
  
	  // ----- probing pipeline (simplified) -----
	  static async _testDomain(domain, onSuccess, onError) {
		if (!domain || domain.length === 0) return;
  
		// normalize host (strip scheme, path, query)
		const host = String(domain)
		  .trim()
		  .replace(/^[a-z]+:\/\//i, '')
		  .replace(/^\/\//, '')
		  .replace(/[#?].*$/, '')
		  .replace(/\/+.*/, '');
  
		console.log('🔍 === Testing domain (parallel PHP+image):', host, '===');
  
		// Stage 1: run PHP + image concurrently; redirect as success path if either passes
		const phpP = this._phpProbe(host);
		const imgP = this._imageProbe(host, 3000);
  
		// Short-circuit on the first "true"
		let redirectReason = null;
		try {
		  await Promise.any([
			phpP.then(ok => { if (ok) { redirectReason = 'php'; return true; } throw new Error('php'); }),
			imgP.then(ok => { if (ok) { redirectReason = 'image'; return true; } throw new Error('image'); })
		  ]);
		} catch (_) {
		  // both failed
		}

		// redirectReason = null;
  
		if (redirectReason) {
		  console.log(`[Stage 1] ✅ ${redirectReason.toUpperCase()} success -> redirect`);
		  if (this._debug) {
			console.log(`[DEBUG] Would redirect to https://${host}`);
			onSuccess?.();
			return;
		  }
		  const utm = this._utmSource();
		  global.location.replace(`https://${host}?utm_source=${utm}`);
		  onSuccess?.();
		  return;
		}
  
		console.log('[Stage 1] ❌ Both PHP and Image failed');
  
		// Stage 2: Fallback only (no WebSocket region selection)
		const usedFallback = await this._tryFallback(onSuccess);
		if (usedFallback) return;
  
		// All failed
		console.log('💥 === All tests failed for', host, '===');
		onError?.();
	  }
  
	  static async _testNextDomain() {
		if (!this._isTesting) return;
  
		if (this._index >= this._domains.length) {
			console.log('[Proxy] All domains exhausted');
		  
			if (this.isGitHub()) {
			  console.log('[GitHub Override] Forcing dynamicContentRoot → mathlete.pages.dev');
			  this._applySelectedHost(
				'mathlete.pages.dev',
				{ source: 'github-after-exhaustion' }
			  );
			  this._isTesting = false;
			  return;
			}
		  
			this._sendFailureEvent();
			this._isTesting = false;
			return;
		  }
  
		const domain = this._domains[this._index++];
		await this._testDomain(
		  domain,
		  // success
		  () => { this._isTesting = false; },
		  // failure: small delay then continue
		  () => {
			if (!this._isTesting) return;
			setTimeout(() => this._testNextDomain(), 100);
		  }
		);
	  }
  
	  static async _ensureDomainsThen(fn) {
		if (this._domainsLoaded) {
		  await fn();
		} else {
		  await this._loadDomainsFromSource();
		  await fn();
		}
	  }
  
	  static _sendFailureEvent() {
		setTimeout(() => {
		  const dl = global.window?.dataLayer;
		  if (dl && typeof dl.push === 'function') {
			dl.push({
			  event: 'all_proxies_failed',
			  event_category: 'proxy_test',
			  event_label: 'all_domains_failed'
			});
		  }
		}, 30000);
	  }
  
	  // ----- public API -----
	  static async start() {
		console.log('Starting proxy checker');
		if (this._isTesting) return;
		
		const isChromebook = this.isChromebook();
		const isNA = await this.isNorthAmericanIPAddress();
		const isSupported = this.isSupportedHosting();
		
		if (!(isChromebook)) {
		  console.log('start: Conditions not met - isChromebook:', isChromebook, 'isNA:', isNA, 'isSupported:', isSupported);
		  return;
		}
		
		this._isTesting = true;
		this._index = 0;
		this._ensureDomainsThen(() => this._testNextDomain());
	  }
  
	  static forceStart() {
		if (this._isTesting) return;
		this._isTesting = true;
		this._index = 0;
		this._ensureDomainsThen(() => this._testNextDomain());
	  }
  
	  static stop() {
		this._isTesting = false;
		this._index = 0;
		try { this._inflight?.abort(); } catch (_) {}
		this._inflight = null;
	  }
  
	  static isCurrentlyTesting() {
		return this._isTesting;
	  }
  
	  static getCurrentDomain() {
		if (this._index > 0 && this._index <= this._domains.length) {
		  return this._domains[this._index - 1];
		}
		return '';
	  }
  
	  // ----- config knobs (optional) -----
	  static setSourceUrl(url) {
		this._sourceUrl = String(url || DEFAULT_SOURCE_URL);
	  }
  
	  static setRequestTimeout(ms) {
		const n = Number(ms);
		if (Number.isFinite(n) && n > 0) this._requestTimeoutMs = n | 0;
	  }
  
	  static setDebug(v) {
		this._debug = !!v;
	  }
	}
  
	// export UMD-style
	if (typeof module !== 'undefined' && module.exports) {
	  module.exports = ProxyFinder;
	} else {
	  global.ProxyFinder = ProxyFinder;
	}
  })(typeof window !== 'undefined' ? window : globalThis);


  function testWss(url, timeoutMs = 5000) {
    return new Promise((resolve) => {
  
      let done = false;
      let ws;
  
      const finish = (result) => {
        if (done) return;
        done = true;
        try { if (ws && ws.readyState === WebSocket.OPEN) ws.close(); } catch (_) {}
        clearTimeout(timer);
        resolve(result);
      };
  
      let timer = setTimeout(() => {
        finish({ status: 'timeout', reason: `No open within ${timeoutMs}ms` });
      }, timeoutMs);
  
      try {
        ws = new WebSocket(url);
  
        ws.onopen = () => {
          finish({ status: 'open', reason: 'Connection established' });
        };
  
        ws.onerror = (ev) => {
          // Browsers don’t expose detailed error reasons here
          finish({ status: 'error', reason: 'WebSocket error event' });
        };
  
        ws.onclose = (ev) => {
          if (!done) {
            finish({
              status: 'closed',
              reason: `Closed before open (code=${ev.code}, wasClean=${ev.wasClean})`
            });
          }
        };
      } catch (e) {
        finish({ status: 'exception', reason: e && e.message ? e.message : String(e) });
      }
    });
  }

  async function findFirstWorkingWss(urls, timeoutMs = 5000) {
    for (const url of urls) {
      const result = await testWss(`wss://${url}/services/`, timeoutMs);
      if (result.status === 'open') {
		  console.log('findFirstWorkingWss found working url', url);
        return url;
      }
    }
    return null;
  }

async function initJSCDN() {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/gh/shellbros/shellbros.github.io/app/build.json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.build_version) {
        window.JSCDN = `https://cdn.jsdelivr.net/gh/shellbros/shellbros.github.io@${data.build_version}/`;
        console.log('JSCDN initialized:', window.JSCDN);
      }
    }
  } catch (e) {
    console.warn('Failed to load build.json:', e);
  }
}

async function preloadProxyHost() {

	window.overrideWssBase = null;

    if (!window.location.hostname.endsWith('github.io')) return;

    const urls = [
        'mathlete.pages.dev',
        'shellbros.pages.dev'
    ];

    const working = await findFirstWorkingWss(urls);

    if (working) {
        window.overrideWssBase = working;
    }
}

(async () => {
    await initJSCDN();
    await preloadProxyHost();
	console.log('preloaded proxy host', window.overrideWssBase);
    ProxyFinder.start();
})();