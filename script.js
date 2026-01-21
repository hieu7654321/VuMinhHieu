let index = 0;
function updateSlider() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');

    if (!track || slides.length === 0) return;

    if (window.innerWidth > 767) {
        track.style.transform = 'translateX(0)';
        index = 0;
        return;
    }

    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

function nextSlide() {
    if (window.innerWidth <= 767) {
        const slides = document.querySelectorAll('.slide');
        index = (index + 1) % slides.length;
        updateSlider();
    }
}

function prevSlide() {
    if (window.innerWidth <= 767) {
        const slides = document.querySelectorAll('.slide');
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    }
}

function changeTab(tab, category) {
    document.querySelectorAll('.tab').forEach(t =>
        t.classList.remove('active')
    );

    document.querySelectorAll('.product-grid').forEach(grid =>
        grid.classList.remove('active')
    );

    tab.classList.add('active');
    document.querySelector(`.product-grid.${category}`).classList.add('active');
}

function submitEmail(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|co|io|me|us|info|biz)$/;

    if (email && emailRegex.test(email)) {
        alert(`Cảm ơn đã đăng ký. Email: ${email}`);
        emailInput.value = '';
    } else {
        alert('Email không hợp lệ. Vui lòng kiểm tra lại.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('#product-slider', {
        type       : 'slide',
        perPage    : 4,
        perMove    : 1,
        gap        : '10px',
        focus      : 'center',
        trimSpace  : true,
        arrows     : false,
        pagination : false,
        speed      : 600,
        breakpoints: {
            1600: {
                perPage: 3,
                gap: '10px',
            },
            1500: {
                perPage: 3.5,
                gap: '10px',
            },
            1100: {
                perPage: 2.5,
                gap: '10px',
            },
            968: {
                perPage: 1.5,
                gap: '8px',
            },
            391: {
                perPage    : 1.2,
                gap        : '8px',
                focus      : 0,
                trimSpace  : false,
            }
        }
    });

    splide.mount();

    function updateBannerImage() {
        const bannerImage = document.getElementById('banner-img-2');
        
        if (window.innerWidth <= 450) {
            bannerImage.src = 'Assets/image 2.png';
        } else {
            bannerImage.src = 'Assets/Elevate your home.png';
        }
    }

    updateBannerImage();
    window.addEventListener('resize', updateBannerImage);
});