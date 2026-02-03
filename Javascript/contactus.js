function submitContactForm(event) {
    event.preventDefault();

    const name     = document.getElementById('name')?.value.trim() || '';
    const email    = document.getElementById('email')?.value.trim() || '';
    const phone    = document.getElementById('phone')?.value.trim() || '';
    const address  = document.getElementById('address')?.value.trim() || '';
    const message  = document.getElementById('message')?.value.trim() || '';

    if (!name || !email || !phone) {
        showPopup('popup-error');
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showPopup('popup-error');
        return false;
    }

    const phoneClean = phone.replace(/[\s+()-]/g, '');
    if (!/^\d{9,15}$/.test(phoneClean)) {
        showPopup('popup-error');
        return false;
    }

    if (typeof window.contactWidgetId === 'undefined') {
        showPopup('popup-error');
        return false;
    }

    const token = grecaptcha.getResponse(window.contactWidgetId);

    const recaptchaContainer = document.getElementById('recaptcha-contact');
    const errorMessage = document.getElementById('recaptcha-error-message-contact');

    if (!token) {
        recaptchaContainer.classList.add('shake');
        errorMessage.style.display = 'flex';

        recaptchaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            recaptchaContainer.classList.remove('shake');
        }, 500);

        return false;
    }

    const submitBtn = event.target.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }

    fetch('https://script.google.com/macros/s/AKfycbxaT6WO1DzUEA4cofWd7lTgQYZToU2tdpeI96PJtLXJYqgZ7L1lQ1tXY1U4598PGAk2ww/exec', {
        method: 'POST',
        body: new URLSearchParams({
            name: name,
            email: email,
            phone: phone,
            address: address,
            message: message,
            'g-recaptcha-response': token
        })
    })
    .then(res => res.json())
    .then(result => {
        if (result.result === 'success') {
            showPopup('popup-success');

            localStorage.setItem('contactInfo', JSON.stringify({
                name, email, phone, address
            }));

            event.target.reset();
            grecaptcha.reset(window.contactWidgetId);
        } else {
            showPopup('popup-error');
            grecaptcha.reset(window.contactWidgetId);
        }
    })
    .catch(() => {
        showPopup('popup-error');
        grecaptcha.reset(window.contactWidgetId);
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'SUBMIT NOW';
        }
    });

    return false;
}

function onContactRecaptchaSuccess() {
    const errorMessage = document.getElementById('recaptcha-error-message-contact');
    errorMessage.style.display = 'none';
}

function onContactRecaptchaExpired() {
    console.log('Contact reCAPTCHA expired');
}


// fetch('https://testapi.demo.wgentech.com/notify.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: payload,
//         keepalive: true
//     })