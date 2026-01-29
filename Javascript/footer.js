function submitEmail(event) {
    event.preventDefault();

    const emailInput = document.getElementById('footer-email');
    const email = emailInput.value.trim();

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        showPopup('popup-error');
        return;
    }

    if (typeof grecaptcha === 'undefined') {
        showPopup('popup-error');
        return;
    }

    const token = grecaptcha.getResponse();

    if (!token) {
        showPopup('popup-error');
        return;
    }

    try {
        fetch(
            'https://script.google.com/macros/s/AKfycbwlnruolAEFek8x1wUYLxocHdIuwHWrHYXSfzSXZSygslzejM-ppDe76EuK8jkKWyB4/exec',
            {
                method: 'POST',
                body: new URLSearchParams({
                    email: email,
                    token: token
                })
            }
        )
        .then(res => res.json())
        .then(result => {
            if (result.result === 'success') {
                showPopup('popup-success');
                emailInput.value = '';
                grecaptcha.reset();
            } else {
                showPopup('popup-error');
                grecaptcha.reset();
            }
        })
        .catch(() => {
            showPopup('popup-error');
            grecaptcha.reset();
        });

    } catch {
        showPopup('popup-error');
        grecaptcha.reset();
    }
}
