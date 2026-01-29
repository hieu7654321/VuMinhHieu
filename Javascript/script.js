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

function applyFaqLineBreaks() {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    document.querySelectorAll('.faq-answer').forEach(answer => {
        if (!answer.dataset.originalText) {
            answer.dataset.originalText = answer.innerHTML;
        }

        if (isDesktop) {
            answer.innerHTML = answer.dataset.originalText.replace(/\.\s*/g, '.<br>');
        } else {
            answer.innerHTML = answer.dataset.originalText;
        }
    });
}

function initFaqs() {
    const faqItems = document.querySelectorAll('.faq-item');
    let openItem = null;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const mark = question.querySelector('.faq-mark');

        answer.style.display = 'none';

        question.addEventListener('click', () => {
            if (openItem === item) {
                answer.style.display = 'none';
                answer.style.maxHeight = '0';
                mark.textContent = '+';
                question.style.borderBottom = '1px solid #EDEDED';
                openItem = null;
            } else {
                if (openItem) {
                    const prevAnswer = openItem.querySelector('.faq-answer');
                    const prevQuestion = openItem.querySelector('.faq-question');
                    const prevMark = prevQuestion.querySelector('.faq-mark');

                    prevAnswer.style.display = 'none';
                    prevAnswer.style.maxHeight = '0';
                    prevMark.textContent = '+';
                    prevQuestion.style.borderBottom = '1px solid #EDEDED';
                }

                answer.style.display = 'block';
                answer.style.maxHeight = answer.scrollHeight + 'px';
                mark.textContent = '−';
                question.style.borderBottom = '1px solid #000';
                openItem = item;
            }
        });
    });

    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        const firstQuestion = firstItem.querySelector('.faq-question');
        const firstAnswer = firstItem.querySelector('.faq-answer');
        const firstMark = firstQuestion.querySelector('.faq-mark');

        firstAnswer.style.display = 'block';
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        firstMark.textContent = '−';
        firstQuestion.style.borderBottom = '1px solid #000';
        openItem = firstItem;
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

    applyFaqLineBreaks();
    initFaqs();
});

window.addEventListener('resize', () => {
    applyFaqLineBreaks();
});