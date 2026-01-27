// Cookie Consent
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function showCookieBar() {
    const consent = getCookie('cookieConsent');
    const cookieBar = document.getElementById('cookie-consent');

    if (!consent) {
        cookieBar.style.display = 'block';
    } else if (consent === 'decline') {
        cookieBar.style.display = 'block';
    }
    // if 'accept' → hidden forever (or until 6 months)
}

function hideCookieBar() {
    document.getElementById('cookie-consent').style.display = 'none';
}

document.getElementById('cookie-accept')?.addEventListener('click', () => {
    setCookie('cookieConsent', 'accept', 180); // ≈6 months
    hideCookieBar();
});

document.getElementById('cookie-decline')?.addEventListener('click', () => {
    setCookie('cookieConsent', 'decline', 0); // session only → shows every time
    hideCookieBar();
});

// Run on load
window.addEventListener('load', showCookieBar);