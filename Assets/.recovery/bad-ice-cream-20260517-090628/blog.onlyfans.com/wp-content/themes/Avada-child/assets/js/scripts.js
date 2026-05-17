/**
* Custom Scripts
*/
document.addEventListener('DOMContentLoaded', () => {
  /**
  * External links open in new tab
  */
  const currentHost = window.location.hostname;
  const links = document.querySelectorAll('a[href]'); // only links with href

  links.forEach(link => {
    const href = link.getAttribute('href');

    // Skip non-http(s) links and anchors
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const url = new URL(href, window.location.origin);

    if (url.hostname !== currentHost) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});