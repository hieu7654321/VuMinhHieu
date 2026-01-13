document.addEventListener('DOMContentLoaded', () => {
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
});