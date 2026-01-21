document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let index = 0;

    function updateSlider() {
        if (window.innerWidth > 767) {
            track.style.transform = 'translateX(0)';
            index = 0;
            return;
        }

        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
            index = (index + 1) % slides.length;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
            index = (index - 1 + slides.length) % slides.length;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);

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
