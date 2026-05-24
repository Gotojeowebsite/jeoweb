// Recommandations SEO Obfuscation Javascript
function handleLinkClick(e) {
    e.preventDefault();
    const actionUrl = e.target.dataset.link;
    window.open(atob(actionUrl), '_blank');
}

const actionLinks = document.querySelectorAll('a[data-link]');

if (actionLinks) {
    actionLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
}