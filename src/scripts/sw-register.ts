/**
 * Service worker registration — kept tiny and lazy so it never blocks paint.
 * Idempotent; on update, prompts the new SW to skipWaiting via message.
 */
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').then(reg => {
			reg.addEventListener('updatefound', () => {
				const w = reg.installing;
				if (!w) return;
				w.addEventListener('statechange', () => {
					if (w.state === 'installed' && navigator.serviceWorker.controller) {
						w.postMessage({ type: 'SKIP_WAITING' });
					}
				});
			});
		}).catch(() => { /* fail silent — SW is progressive enhancement */ });
	});
}
export {};
