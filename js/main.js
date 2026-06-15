// calculating copyright year
(function() {
                var yearEl = document.getElementById('year');
                if (yearEl) yearEl.textContent = new Date().getFullYear();
              })();

//showing active page in header nav
document.addEventListener('DOMContentLoaded', function () {
    // header nav links
    const navLinks = document.querySelectorAll('#header nav a');

    if (!navLinks.length) return;

    const currentFile = (function () {
        const p = window.location.pathname.split('/').pop();
        return p === '' ? 'index.html' : p;
    })();

    function markActive(link) {
        navLinks.forEach(l => {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
        });
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');

        // subtle pulse animation (runs once)
        try {
            link.animate([
                { transform: 'scale(1)', boxShadow: 'none' },
                { transform: 'scale(1.06)', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' },
                { transform: 'scale(1)', boxShadow: 'none' }
            ], { duration: 700, easing: 'ease-in-out' });
        } catch (e) { /* ignore if Web Animations not supported */ }
    }

    // mark based on current URL on load
    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const linkFile = href.split('/').pop();
        if (linkFile === currentFile) {
            markActive(link);
        }

        // update immediately on click (useful while navigating)
        link.addEventListener('click', () => {
            markActive(link);
        });
    });
});