/**
 * Web Vitals reporter. Captures the four core metrics — LCP, INP, CLS,
 * TTFB — and forwards them to whichever sink is wired up.
 *
 * Today: console.info, gated on the "jeo-debug" localStorage flag so
 * regular users don't see anything. When Sentry / PostHog / a custom
 * endpoint lands (Workstream B2), swap the `report` body with the real
 * transport — every call site already routes through this file.
 *
 * Load order: this script is imported by Site.astro at the bottom of
 * <body> so it runs after first paint. The library itself is dynamic-
 * imported so the cost is amortized post-load.
 */

type Metric = {
	name: 'LCP' | 'INP' | 'CLS' | 'TTFB' | 'FCP';
	value: number;
	rating: 'good' | 'needs-improvement' | 'poor';
	delta: number;
	id: string;
	navigationType?: string;
};

function report(metric: Metric): void {
	// Console gate — silent for everyone except developers who flipped
	// the debug flag in DevTools. Keeps the production console clean.
	try {
		if (localStorage.getItem('jeo-debug') === '1') {
			const color = metric.rating === 'good' ? '#22c55e'
				: metric.rating === 'needs-improvement' ? '#f59e0b'
				: '#ef4444';
			console.info(
				`%c${metric.name}%c ${Math.round(metric.value)} %c${metric.rating}`,
				`color:${color};font-weight:600`,
				'color:inherit',
				`color:${color}`,
			);
		}
	} catch (_) {}

	// Future: POST to /api/vitals or Sentry's measurement API. Held back
	// until a backend exists; replacing this block is the whole change.
}

// Dynamic import so the library only loads after the page paints. Even
// on poor networks this doesn't compete with critical resources.
function init(): void {
	import('web-vitals').then(({ onCLS, onINP, onLCP, onTTFB, onFCP }) => {
		onCLS(report);
		onINP(report);
		onLCP(report);
		onTTFB(report);
		onFCP(report);
	}).catch(() => {
		// Web-vitals load failed (offline, ad-blocker). Not worth bothering
		// the user about; we just don't get telemetry for this session.
	});
}

if (typeof window !== 'undefined') {
	if (document.readyState === 'complete') init();
	else window.addEventListener('load', init, { once: true });
}

export {};
