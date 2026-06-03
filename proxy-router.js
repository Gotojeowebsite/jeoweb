/**
 * JeoProxy — client-side CORS proxy router.
 * Probes multiple free CORS proxy endpoints, ranks them by latency,
 * and transparently routes fetch() requests through the best available proxy.
 */
(function () {
	'use strict';

	var PROBE_TIMEOUT = 5000; // 5 seconds per proxy attempt
	var FETCH_TIMEOUT = 5000; // 5 seconds per fetch proxy attempt
	var SESSION_KEY = 'jeo_proxy_health';
	var PROBE_URL = 'https://httpbin.org/status/200'; // lightweight probe target

	var PROXIES = [
		{ name: 'corsproxy.io', template: 'https://corsproxy.io/?{url}' },
		{ name: 'allorigins', template: 'https://api.allorigins.win/raw?url={url}' },
		{ name: 'cors-anywhere-demo', template: 'https://cors-anywhere.herokuapp.com/{url}' },
	];

	/**
	 * Build the proxied URL from a template.
	 * Templates use `{url}` as a placeholder for the encoded target URL.
	 */
	function buildProxyUrl(template, targetUrl) {
		return template.replace('{url}', encodeURIComponent(targetUrl));
	}

	/**
	 * Load health data from sessionStorage.
	 */
	function loadHealth() {
		try {
			var raw = sessionStorage.getItem(SESSION_KEY);
			return raw ? JSON.parse(raw) : {};
		} catch (e) {
			return {};
		}
	}

	/**
	 * Save health data to sessionStorage.
	 */
	function saveHealth(health) {
		try {
			sessionStorage.setItem(SESSION_KEY, JSON.stringify(health));
		} catch (e) {
			// sessionStorage may be unavailable in some contexts
		}
	}

	/**
	 * Perform a single probe against one proxy.
	 * Returns a promise that resolves with { name, latency, healthy }.
	 */
	function probeOne(proxy) {
		var url = buildProxyUrl(proxy.template, PROBE_URL);
		var start = performance.now();

		return new Promise(function (resolve) {
			var controller = new AbortController();
			var timer = setTimeout(function () {
				controller.abort();
				console.warn('[JeoProxy] Probe timeout:', proxy.name);
				resolve({ name: proxy.name, latency: Infinity, healthy: false });
			}, PROBE_TIMEOUT);

			fetch(url, {
				method: 'HEAD',
				mode: 'cors',
				signal: controller.signal,
			})
				.then(function (res) {
					clearTimeout(timer);
					var latency = Math.round(performance.now() - start);
					var healthy = res.ok || res.status === 0; // opaque responses count as ok
					console.log(
						'[JeoProxy] Probe ' + proxy.name + ': ' +
						(healthy ? 'OK' : 'FAIL') + ' (' + latency + 'ms)'
					);
					resolve({ name: proxy.name, latency: latency, healthy: healthy });
				})
				.catch(function () {
					clearTimeout(timer);
					var latency = Math.round(performance.now() - start);
					console.warn('[JeoProxy] Probe ' + proxy.name + ': FAIL (' + latency + 'ms)');
					resolve({ name: proxy.name, latency: Infinity, healthy: false });
				});
		});
	}

	/**
	 * Get the sorted list of proxies by health and latency.
	 */
	function getRankedProxies() {
		var health = loadHealth();
		var ranked = PROXIES.slice().sort(function (a, b) {
			var ha = health[a.name] || { healthy: false, latency: Infinity };
			var hb = health[b.name] || { healthy: false, latency: Infinity };
			// Healthy proxies first, then sort by latency
			if (ha.healthy && !hb.healthy) return -1;
			if (!ha.healthy && hb.healthy) return 1;
			return (ha.latency || Infinity) - (hb.latency || Infinity);
		});
		return ranked;
	}

	/**
	 * Attempt a fetch through a specific proxy with timeout.
	 */
	function fetchViaProxy(proxy, targetUrl, options) {
		var url = buildProxyUrl(proxy.template, targetUrl);

		return new Promise(function (resolve, reject) {
			var controller = new AbortController();
			var mergedSignal = controller.signal;

			var timer = setTimeout(function () {
				controller.abort();
				reject(new Error('Proxy timeout: ' + proxy.name));
			}, FETCH_TIMEOUT);

			var fetchOptions = Object.assign({}, options || {}, {
				signal: mergedSignal,
			});

			fetch(url, fetchOptions)
				.then(function (res) {
					clearTimeout(timer);
					if (!res.ok) {
						reject(new Error('Proxy ' + proxy.name + ' returned ' + res.status));
					} else {
						resolve(res);
					}
				})
				.catch(function (err) {
					clearTimeout(timer);
					reject(err);
				});
		});
	}

	// ——— Public API ———

	window.JeoProxy = {
		/**
		 * Probe all configured proxies, storing health results in sessionStorage.
		 * @returns {Promise<Object>} Health results keyed by proxy name.
		 */
		probe: function () {
			console.log('[JeoProxy] Starting probe of', PROXIES.length, 'proxies…');

			var probes = PROXIES.map(function (proxy) {
				return probeOne(proxy);
			});

			return Promise.all(probes).then(function (results) {
				var health = {};
				results.forEach(function (r) {
					health[r.name] = { healthy: r.healthy, latency: r.latency, ts: Date.now() };
				});
				saveHealth(health);

				var best = results
					.filter(function (r) { return r.healthy; })
					.sort(function (a, b) { return a.latency - b.latency; });

				if (best.length > 0) {
					console.log('[JeoProxy] Best proxy:', best[0].name, '(' + best[0].latency + 'ms)');
				} else {
					console.warn('[JeoProxy] No healthy proxies found.');
				}

				return health;
			});
		},

		/**
		 * Fetch a URL through the best available CORS proxy, with automatic
		 * fallback to the next proxy on failure.
		 * @param {string} url - The target URL to fetch.
		 * @param {Object} [options] - Standard fetch options (method, headers, etc.).
		 * @returns {Promise<Response>}
		 */
		fetch: function (url, options) {
			var ranked = getRankedProxies();
			var index = 0;

			function tryNext() {
				if (index >= ranked.length) {
					return Promise.reject(new Error('[JeoProxy] All proxies exhausted for: ' + url));
				}

				var proxy = ranked[index];
				index++;

				console.log('[JeoProxy] Fetching via', proxy.name, '→', url);

				return fetchViaProxy(proxy, url, options).catch(function (err) {
					console.warn('[JeoProxy]', proxy.name, 'failed:', err.message, '— trying next…');

					// Mark this proxy as unhealthy in session
					var health = loadHealth();
					if (health[proxy.name]) {
						health[proxy.name].healthy = false;
					}
					saveHealth(health);

					return tryNext();
				});
			}

			return tryNext();
		},

		/**
		 * Get info about the current best (fastest healthy) proxy.
		 * @returns {{ name: string, template: string, latency: number } | null}
		 */
		getBestProxy: function () {
			var health = loadHealth();
			var best = null;
			var bestLatency = Infinity;

			PROXIES.forEach(function (proxy) {
				var h = health[proxy.name];
				if (h && h.healthy && h.latency < bestLatency) {
					best = { name: proxy.name, template: proxy.template, latency: h.latency };
					bestLatency = h.latency;
				}
			});

			return best;
		},

		/**
		 * Get the raw list of configured proxy endpoints.
		 * @returns {Array}
		 */
		getProxies: function () {
			return PROXIES.slice();
		},

		/**
		 * Get the full health report from sessionStorage.
		 * @returns {Object}
		 */
		getHealth: function () {
			return loadHealth();
		}
	};
})();
