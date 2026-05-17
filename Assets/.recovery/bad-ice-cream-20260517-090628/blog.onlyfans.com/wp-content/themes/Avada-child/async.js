// LQIP
document.addEventListener('DOMContentLoaded', function() {
	const lqipImages = document.querySelectorAll('.lqip-enabled');

	lqipImages.forEach(img => {
		const fullSrc = img.getAttribute('data-src');
		if (!fullSrc) return;

		const tempImage = new Image();
		tempImage.src = fullSrc;

		tempImage.onload = function() {
			// img.src = fullSrc;
			// img.classList.add('loaded');
		};
	});
});