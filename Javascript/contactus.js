function submitContactForm(event) {
    event.preventDefault();

    const name     = document.getElementById('name')?.value?.trim()     || '';
    const emailcontact    = document.getElementById('email')?.value?.trim()    || '';
    const phone    = document.getElementById('phone')?.value?.trim()    || '';
    const address  = document.getElementById('address')?.value?.trim()  || '';
    const message  = document.getElementById('message')?.value?.trim()  || '';

    if (!name || !emailcontact || !phone) {
        showPopup('popup-error');
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailcontact)) {
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

    const tokencontact = grecaptcha.getResponse(window.contactWidgetId);

    const recaptchaContainercontact = document.getElementById('recaptcha-contact');
    const errorMessagecontact = document.getElementById('recaptcha-error-message-contact');

    if (!tokencontact) {
        recaptchaContainercontact.classList.add('shake');
        errorMessagecontact.style.display = 'flex';

        recaptchaContainercontact.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            recaptchaContainercontact.classList.remove('shake');
        }, 500);

        return false;
    }

    const API_URL = 'https://testapi.demo.wgentech.com/notify.php';

    console.log("Attempting to send to URL:", API_URL);

    if (!API_URL || typeof API_URL !== 'string' || API_URL.trim() === '' || API_URL === 'h') {
        console.error("Invalid API URL detected:", API_URL);
        showPopup('popup-error');
        if (document.getElementById('form-error-message')) {
            document.getElementById('form-error-message').textContent = "Server configuration error. Please try again later.";
            document.getElementById('form-error-message').style.display = 'block';
        }
        return false;
    }

    const payload = JSON.stringify({
        name,
        emailcontact,
        phone,
        address,
        message,
        'g-recaptcha-response': tokencontact
    });

    const submitBtn = event.target.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }

    fetch('https://testapi.demo.wgentech.com/notify.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success' || data.success === true) {
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
    console.log('Contact reCAPTCHA verified');
    const errorMessagecontact = document.getElementById('recaptcha-error-message-contact');
    errorMessagecontact.style.display = 'none';
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