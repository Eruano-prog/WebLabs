(function () {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        const footer = document.querySelector('.footer');
        if (footer) {
            const stats = document.createElement('div');
            stats.className = 'footer__stats';
            stats.textContent = `Page loaded in ${loadTime} ms`;
            footer.appendChild(stats);
        }
    });
})();

(function () {
    const links = document.querySelectorAll('.header__nav-links__link');
    const currentPath = document.location.pathname.split('/').pop();

    links.forEach(link => {
        if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('header__nav-links__link--active');
        } else {
            link.classList.remove('header__nav-links__link--active');
        }
    });
})();
