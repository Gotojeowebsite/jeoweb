// DARK MODE
(function() {
	const darkMode = localStorage.darkMode === 'true';
	if (darkMode) {
		document.querySelector('body').classList.add('is-dark');

		// activate the toggle
		document.addEventListener('DOMContentLoaded', () => {
			const $toggles = document.querySelectorAll('.dark-toggle input[type="checkbox"]');
			$toggles.forEach(($t) => {
				$t.checked = true;
			});
		});
	}
})();

jQuery(document).ready(function($){
	null != localStorage.getItem("state") && (localStorage.settingNight, $("body").toggleClass("night"), $("#toggle").toggleClass("selected")),
	 $("#toggle").click(function () {
		 $("body").toggleClass("night"), $("#toggle").toggleClass("selected"), $("#toggle").hasClass("selected") ? localStorage.setItem("state", "true") : localStorage.removeItem("state");
	 });
});

// TWITTER
document.addEventListener('DOMContentLoaded', function () {
	if (typeof tweetIds !== 'undefined') {
		const container 	= document.getElementById('tweets-container');
		const MAX_TWEETS 	= 6;

		if (container !== null) {
			let successCount = 0;
			let currentIndex = 0;

			const loadNextTweet = () => {
				if (successCount >= MAX_TWEETS || currentIndex >= tweetIds.length) {
					console.log(`✅ Finished loading ${successCount} tweets.`);
					return;
				}

				const tweetId = tweetIds[currentIndex];
				const tweetDiv = document.createElement('div');
				tweetDiv.setAttribute('data-tweet-id', tweetId);
				tweetDiv.setAttribute('id', 'tweet-' + currentIndex);
				tweetDiv.style.minHeight = '100px'; // Placeholder height
				container.appendChild(tweetDiv);

				console.log(`⏳ Trying tweet ${currentIndex + 1}/${tweetIds.length}: ${tweetId}`);

				let resolved = false;

				// Timeout fallback (5 seconds)
				const timeout = setTimeout(() => {
					if (!resolved) {
						console.warn(`⏱️ Timeout for tweet ${tweetId}, skipping.`);
						tweetDiv.remove();
						currentIndex++;
						loadNextTweet();
					}
				}, 2000);

				twttr.widgets.createTweet(tweetId, tweetDiv, {})
					.then((el) => {
						if (el) {
							console.log(`✅ Loaded tweet: ${tweetId}`);
							resolved = true;
							clearTimeout(timeout);
							successCount++;
						} else {
							console.warn(`⚠️ Tweet created but no element returned: ${tweetId}`);
							resolved = true;
							clearTimeout(timeout);
							tweetDiv.remove();
						}
						currentIndex++;
						loadNextTweet();
					})
					.catch((err) => {
						console.error(`❌ Error loading tweet ${tweetId}:`, err);
						resolved = true;
						clearTimeout(timeout);
						tweetDiv.remove();
						currentIndex++;
						loadNextTweet();
					});
			};

			if (typeof twttr !== 'undefined' && twttr.ready) {
				twttr.ready(() => {
					loadNextTweet();
				});
			} else {
				console.error('❌ Twitter widgets library not loaded.');
			}
		}
	}
});


// CREATOR CENTER JUMP ANCHORS
function showAndJump(contentId, anchorId) {
	// Get the ancestor panel-collapse.collapse element
	const ancestor = document.getElementById(contentId).closest('.panel-collapse.collapse');
	if (ancestor) {
		ancestor.style.display = 'block';
	}
	// Use setTimeout to ensure the content is visible before jumping
	// setTimeout(function() {
		// Scroll to the anchor
		document.getElementById(anchorId).scrollIntoView({ behavior: 'smooth' });
	// }, 50);
}

document.addEventListener('DOMContentLoaded', function() {
	const hash = window.location.hash;
	if (hash) {
		const contentId = hash.substring(1); // Extract id without #
		showAndJump(contentId, contentId); // Call showAndJump with the id
	}
});