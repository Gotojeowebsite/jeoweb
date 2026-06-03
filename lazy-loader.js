(function () {
	'use strict';

	// Inject lazy-loading CSS into document head
	var style = document.createElement('style');
	style.textContent = [
		'img[data-src] {',
		'	opacity: 0;',
		'	filter: blur(10px);',
		'	transition: opacity 0.4s ease, filter 0.4s ease;',
		'}',
		'img.jeo-lazy-visible {',
		'	opacity: 1;',
		'	filter: blur(0);',
		'}',
		'@media (prefers-reduced-motion: reduce) {',
		'	img[data-src] {',
		'		transition: none;',
		'		filter: none;',
		'	}',
		'	img.jeo-lazy-visible {',
		'		filter: none;',
		'	}',
		'}',
	].join('\n');
	document.head.appendChild(style);

	var observer = null;

	function onEntry(entries) {
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i];
			if (!entry.isIntersecting) continue;

			var img = entry.target;
			var src = img.getAttribute('data-src');
			if (!src) continue;

			// Stop observing this image
			observer.unobserve(img);

			// Set the real source for the image
			img.src = src;
			
			// Handle <source> siblings within a <picture> element
			if (img.parentNode && img.parentNode.tagName === 'PICTURE') {
				var sources = img.parentNode.querySelectorAll('source[data-srcset]');
				for (var j = 0; j < sources.length; j++) {
					sources[j].srcset = sources[j].getAttribute('data-srcset');
					sources[j].removeAttribute('data-srcset');
				}
			}

			img.classList.add('jeo-lazy-loaded');
			img.removeAttribute('data-src');

			// Attach load / error handlers
			img.addEventListener('load', onLoad);
			img.addEventListener('error', onError);
		}
	}

	function onLoad(e) {
		var img = e.target;
		img.classList.add('jeo-lazy-visible');
		img.removeEventListener('load', onLoad);
		img.removeEventListener('error', onError);
	}

	function onError(e) {
		var img = e.target;
		img.src = 'notavailable.svg';
		img.classList.add('jeo-lazy-visible');
		img.removeEventListener('load', onLoad);
		img.removeEventListener('error', onError);
	}

	function createObserver() {
		if (observer) return;
		observer = new IntersectionObserver(onEntry, {
			rootMargin: '300px',
		});
	}

	/**
	 * Find all img[data-src] inside `container` and begin observing them.
	 * @param {Element} container
	 */
	function observe(container) {
		if (!container) return;
		createObserver();
		var images = container.querySelectorAll('img[data-src]');
		for (var i = 0; i < images.length; i++) {
			observer.observe(images[i]);
		}
	}

	/**
	 * Disconnect the observer entirely.
	 */
	function disconnect() {
		if (observer) {
			observer.disconnect();
			observer = null;
		}
	}

	/**
	 * Re-scan the page for new img[data-src] elements and observe them.
	 */
	function refresh() {
		createObserver();

		// Re-scan game grid
		var gameGrid = document.getElementById('gameGrid');
		if (gameGrid) observe(gameGrid);

		// Re-scan carousel tracks
		var tracks = document.querySelectorAll('.carousel-track, .carousel__track, [data-carousel-track]');
		for (var i = 0; i < tracks.length; i++) {
			observe(tracks[i]);
		}
	}

	// Expose public API
	window.JeoLazyLoader = {
		observe: observe,
		disconnect: disconnect,
		refresh: refresh,
	};

	// Auto-initialize on DOMContentLoaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	function init() {
		// Observe the main game grid
		var gameGrid = document.getElementById('gameGrid');
		if (gameGrid) observe(gameGrid);

		// Observe any carousel tracks
		var tracks = document.querySelectorAll('.carousel-track, .carousel__track, [data-carousel-track]');
		for (var i = 0; i < tracks.length; i++) {
			observe(tracks[i]);
		}
	}
})();
