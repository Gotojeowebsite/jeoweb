/**
 * JeoBlankSpawner — opens games in an about:blank window to bypass
 * restrictive iframe policies. Injects a fully styled HTML document
 * with a toolbar and sandboxed iframe into the blank window.
 */
(function () {
	'use strict';

	let spawnedWindow = null;
	let cleanupTimer = null;

	/**
	 * Build the full HTML document that gets written into the about:blank window.
	 */
	function buildDocument(gameUrl, gameTitle, theme) {
		const isDark = theme !== 'light';

		return `<!DOCTYPE html>
<html lang="en" data-theme="${isDark ? 'dark' : 'light'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(gameTitle)} — Jeo</title>
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
	--bg-primary:${isDark ? '#0f0f1a' : '#f5f5fa'};
	--bg-toolbar:${isDark ? '#1a1a2e' : '#e8e8f0'};
	--fg-primary:${isDark ? '#e0e0e0' : '#1a1a2e'};
	--fg-secondary:${isDark ? '#a0a0b8' : '#555570'};
	--brand-purple:#7c3aed;
	--brand-purple-hover:#6d28d9;
	--radius:8px;
}
html,body{
	height:100%;
	overflow:hidden;
	background:var(--bg-primary);
	color:var(--fg-primary);
	font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
}
.toolbar{
	display:flex;
	align-items:center;
	gap:12px;
	height:48px;
	padding:0 16px;
	background:var(--bg-toolbar);
	border-bottom:1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'};
	user-select:none;
	-webkit-user-select:none;
}
.toolbar-logo{
	display:flex;
	align-items:center;
	gap:6px;
	font-weight:700;
	font-size:16px;
	color:var(--brand-purple);
	letter-spacing:-0.02em;
}
.toolbar-logo svg{
	width:22px;
	height:22px;
	fill:var(--brand-purple);
}
.toolbar-title{
	flex:1;
	font-size:14px;
	font-weight:600;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
	color:var(--fg-primary);
}
.toolbar-btn{
	display:inline-flex;
	align-items:center;
	justify-content:center;
	width:34px;
	height:34px;
	border:none;
	border-radius:var(--radius);
	background:transparent;
	color:var(--fg-secondary);
	cursor:pointer;
	transition:background 0.15s,color 0.15s;
	font-size:18px;
}
.toolbar-btn:hover{
	background:var(--brand-purple);
	color:#fff;
}
.game-frame{
	display:block;
	width:100%;
	height:calc(100% - 48px);
	border:none;
	background:var(--bg-primary);
}
</style>
</head>
<body>
<div class="toolbar">
	<div class="toolbar-logo">
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M21 6H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-9 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM6 13H4v-2h2v2zm14 0h-2v-2h2v2z"/>
		</svg>
		Jeo
	</div>
	<span class="toolbar-title">${escapeHtml(gameTitle)}</span>
	<button class="toolbar-btn" id="btn-fullscreen" title="Toggle Fullscreen">⛶</button>
	<button class="toolbar-btn" id="btn-close" title="Close">✕</button>
</div>
<iframe
	class="game-frame"
	id="game-iframe"
	src="${escapeHtml(gameUrl)}"
	sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
	allowfullscreen
	loading="eager"
></iframe>
<script>
(function(){
	var btnFs = document.getElementById('btn-fullscreen');
	var btnClose = document.getElementById('btn-close');
	var iframe = document.getElementById('game-iframe');

	btnFs.addEventListener('click', function(){
		if(!document.fullscreenElement){
			(iframe.requestFullscreen || iframe.webkitRequestFullscreen || iframe.msRequestFullscreen).call(iframe);
		} else {
			(document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
		}
	});

	btnClose.addEventListener('click', function(){
		window.close();
	});

	window.addEventListener('beforeunload', function(){
		try {
			if(window.opener && window.opener.JeoBlankSpawner){
				window.opener.JeoBlankSpawner._onChildClosed();
			}
		} catch(e){}
	});
})();
</script>
</body>
</html>`;
	}

	/**
	 * Escape HTML special characters to prevent XSS in injected markup.
	 */
	function escapeHtml(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	/**
	 * Detect the current site theme from the root element.
	 */
	function getCurrentTheme() {
		try {
			return document.documentElement.getAttribute('data-theme') || 'dark';
		} catch (e) {
			return 'dark';
		}
	}

	/**
	 * Start polling to detect if the spawned window was closed externally
	 * (e.g. user closes the tab via browser chrome).
	 */
	function startCleanupPolling() {
		stopCleanupPolling();
		cleanupTimer = setInterval(function () {
			if (spawnedWindow && spawnedWindow.closed) {
				spawnedWindow = null;
				stopCleanupPolling();
				console.log('[JeoBlankSpawner] Spawned window was closed.');
			}
		}, 1000);
	}

	function stopCleanupPolling() {
		if (cleanupTimer) {
			clearInterval(cleanupTimer);
			cleanupTimer = null;
		}
	}

	// ——— Public API ———

	window.JeoBlankSpawner = {
		/**
		 * Open a game in an about:blank spawned window.
		 * @param {string} gameUrl - The URL of the game to load.
		 * @param {string} gameTitle - The display title for the game.
		 * @returns {Window|null} The spawned window, or null if blocked.
		 */
		open: function (gameUrl, gameTitle) {
			// Close any previously spawned window first
			this.close();

			var win = window.open('about:blank', '_blank');

			if (!win || win.closed) {
				alert(
					'Pop-up blocked!\n\n' +
					'Please allow pop-ups for this site to open games in a new window.\n' +
					'Look for a pop-up blocked icon in your browser\'s address bar.'
				);
				return null;
			}

			spawnedWindow = win;

			var theme = getCurrentTheme();
			var html = buildDocument(gameUrl, gameTitle, theme);

			try {
				var doc = win.document;
				doc.open();
				doc.write(html);
				doc.close();
			} catch (e) {
				console.error('[JeoBlankSpawner] Failed to write to spawned window:', e);
				win.close();
				spawnedWindow = null;
				return null;
			}

			startCleanupPolling();
			console.log('[JeoBlankSpawner] Opened:', gameTitle, '→', gameUrl);
			return win;
		},

		/**
		 * Close the currently spawned window, if any.
		 */
		close: function () {
			stopCleanupPolling();
			if (spawnedWindow && !spawnedWindow.closed) {
				try {
					spawnedWindow.close();
				} catch (e) {
					console.warn('[JeoBlankSpawner] Could not close spawned window:', e);
				}
			}
			spawnedWindow = null;
		},

		/**
		 * Internal callback — called by the child window on beforeunload.
		 * @private
		 */
		_onChildClosed: function () {
			spawnedWindow = null;
			stopCleanupPolling();
			console.log('[JeoBlankSpawner] Child window notified closure.');
		},

		/**
		 * Check if there is currently a spawned window open.
		 * @returns {boolean}
		 */
		isOpen: function () {
			return spawnedWindow !== null && !spawnedWindow.closed;
		}
	};
})();
