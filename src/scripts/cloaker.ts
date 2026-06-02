import { readPrefs, type Prefs } from '../lib/storage';

export const CLOAK_PRESETS = {
	none: { title: '', icon: '' },
	classroom: { title: 'Classes', icon: '/brand/classroom.png' },
	drive: { title: 'My Drive - Google Drive', icon: '/brand/drive.png' },
	canvas: { title: 'Dashboard', icon: '/brand/canvas.png' },
	docs: { title: 'Untitled document - Google Docs', icon: '/brand/docs.png' }
} as const;

export function getActiveCloak(prefs: Prefs) {
	if (prefs.cloakPreset === 'none') {
		return null;
	}
	if (prefs.cloakPreset === 'custom') {
		return {
			title: prefs.cloakTitle || 'Google',
			icon: prefs.cloakIcon || 'https://www.google.com/favicon.ico'
		};
	}
	return CLOAK_PRESETS[prefs.cloakPreset];
}

export function applyCloak() {
	if (typeof window === 'undefined' || typeof document === 'undefined') return;
	const prefs = readPrefs();
	const cloak = getActiveCloak(prefs);

	// Store original title and favicon once when page is loaded
	if (!document.body.dataset.originalTitle) {
		document.body.dataset.originalTitle = document.title;
		const iconEl = document.querySelector('link[rel="icon"]');
		if (iconEl) {
			document.body.dataset.originalFavicon = iconEl.getAttribute('href') || '/icon.svg';
		} else {
			document.body.dataset.originalFavicon = '/icon.svg';
		}
	}

	if (!cloak) {
		const origTitle = document.body.dataset.originalTitle;
		const origFavicon = document.body.dataset.originalFavicon;
		if (origTitle) document.title = origTitle;
		if (origFavicon) setFavicon(origFavicon);
		return;
	}

	document.title = cloak.title;
	setFavicon(cloak.icon);
}

function setFavicon(url: string) {
	let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
	let shortcutLink = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement | null;
	let appleLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement | null;
	
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.appendChild(link);
	}
	link.href = url;

	if (shortcutLink) {
		shortcutLink.href = url;
	}
	if (appleLink) {
		appleLink.href = url;
	}
}

export function setupPanicListener() {
	if (typeof window === 'undefined') return;
	
	// Prevent duplicate listeners on page-load transition cycles
	if ((window as any).__jeoPanicBound) return;
	(window as any).__jeoPanicBound = true;

	window.addEventListener('keydown', (e) => {
		const prefs = readPrefs();
		// If panicKey is empty, do nothing
		if (!prefs.panicKey) return;
		
		if (e.key === prefs.panicKey) {
			e.preventDefault();
			window.location.replace(prefs.panicUrl || 'https://classroom.google.com');
		}
	});
}
