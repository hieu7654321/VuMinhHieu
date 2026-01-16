document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let index = 0;

    function updateSlider() {
        if (window.innerWidth > 768) {
            track.style.transform = 'translateX(0)';
            index = 0;
            return;
        }

        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            index = (index + 1) % slides.length;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
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
                perPage: 4,
                gap: '10px',
            },
            1500: {
                perPage: 3,
                gap: '10px',
            },
            768: {
                perPage: 2,
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

    const tabs = document.querySelectorAll(".tab");
    const items = document.querySelectorAll(".product_item");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const category = tab.dataset.category;

            items.forEach(item => {
                item.classList.add("hidden");
                if (item.classList.contains(category)) {
                    item.classList.remove("hidden");
                }
            });
        });
    });
});
