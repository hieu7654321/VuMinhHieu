function submitEmail(event) {
    event.preventDefault();

    const emailInput = document.getElementById('footer-email');
    const email = emailInput.value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        showPopup('popup-error');
        return;
    }

    if (typeof window.newsletterWidgetId === 'undefined') {
        showPopup('popup-error');
        return;
    }

    const token = grecaptcha.getResponse(window.newsletterWidgetId);

    const recaptchaContainer = document.getElementById('recaptcha-newsletter');
    const errorMessage = document.getElementById('recaptcha-error-message');

    if (!token) {
        recaptchaContainer.classList.add('shake');
        errorMessage.style.display = 'flex';

        recaptchaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            recaptchaContainer.classList.remove('shake');
        }, 500);

        return;
    }

    try {
        fetch(
            'https://script.google.com/macros/s/AKfycbwlnruolAEFek8x1wUYLxocHdIuwHWrHYXSfzSXZSygslzejM-ppDe76EuK8jkKWyB4/exec',
            {
                method: 'POST',
                body: new URLSearchParams({
                    email: email,
                    'g-recaptcha-response': token
                })
            }
        )
        .then(res => res.json())
        .then(result => {
            if (result.result === 'success') {
                localStorage.setItem('userEmail', email);
                showPopup('popup-success');
                emailInput.value = '';
                grecaptcha.reset(window.newsletterWidgetId);
            } else {
                showPopup('popup-error');
                grecaptcha.reset(window.newsletterWidgetId);
            }
        })
        .catch(() => {
            showPopup('popup-error');
            grecaptcha.reset(window.newsletterWidgetId);
        });
    } catch {
        showPopup('popup-error');
        grecaptcha.reset(window.newsletterWidgetId);
    }
}

function onNewsletterRecaptchaSuccess() {
    const errorMessage = document.getElementById('recaptcha-error-message');
    console.log('Newsletter reCAPTCHA verified');
    errorMessage.style.display = 'none';
}

function onNewsletterRecaptchaExpired() {
    console.log('Newsletter reCAPTCHA expired');
}

// fetch(
//             'https://script.google.com/macros/s/AKfycbwlnruolAEFek8x1wUYLxocHdIuwHWrHYXSfzSXZSygslzejM-ppDe76EuK8jkKWyB4/exec',
//             {
//                 method: 'POST',
//                 body: new URLSearchParams({
//                     email: email,
//                     'g-recaptcha-response': token
//                 })
//             }
//         )