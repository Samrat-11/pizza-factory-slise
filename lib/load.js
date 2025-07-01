function loadComponent(url, containerId) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById(containerId);
            container.innerHTML = html;
            container.querySelectorAll('script').forEach(script => {
                const s = document.createElement('script');
                if (script.src) { s.src = script.src;}
                else {s.textContent = script.textContent;}
                document.body.appendChild(s);
            });
        });
}

// Load all components
if (typeof SplashUrl !== "undefined") {
    loadComponent(SplashUrl, 'splash-container');
}
if (typeof NavUrl !== "undefined") {
    loadComponent(NavUrl, 'navbar-container');
}
if (typeof FooterUrl !== "undefined") {
    loadComponent(FooterUrl, 'footer-container');
}

