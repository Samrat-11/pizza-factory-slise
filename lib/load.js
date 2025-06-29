// Load Splash Screen
// fetch('lib/splash-screen.html')
fetch(SplashUrl)
    .then(res => res.text())
    .then(html => {
    const container = document.getElementById('splash-container');
    container.innerHTML = html;
    container.querySelectorAll('script').forEach(script => {
        const s = document.createElement('script');
        if (script.src) {s.src = script.src;}
        else {s.textContent = script.textContent;}
        document.body.appendChild(s);
    });
    });

// Load Navbar
// fetch('lib/navbar.html')
fetch(NavUrl)
    .then(res => res.text())
    .then(html => {
    const container = document.getElementById('navbar-container');
    container.innerHTML = html;
    container.querySelectorAll('script').forEach(script => {
        const s = document.createElement('script');
        if (script.src) {s.src = script.src;}
        else {s.textContent = script.textContent;}
        document.body.appendChild(s);
    });
    });

// Load Footer
// fetch('lib/footer.html')
fetch(FooterUrl)
    .then(res => res.text())
    .then(html => {
    const container = document.getElementById('footer-container');
    container.innerHTML = html;
    container.querySelectorAll('script').forEach(script => {
        const s = document.createElement('script');
        if (script.src) {s.src = script.src;}
        else {s.textContent = script.textContent;}
        document.body.appendChild(s);
    });
    });