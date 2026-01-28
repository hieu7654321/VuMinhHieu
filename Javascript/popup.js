const DISCOUNT_COOLDOWN_HOURS = 4;
const DISCOUNT_STORAGE_KEY = 'discountClosedAt';
let discountTimer = null;

function showPopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.style.display = 'flex';
}

function hidePopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.style.display = 'none';
}

function closeDiscountPopup(popup) {
    hidePopup(popup.id);
    localStorage.setItem(DISCOUNT_STORAGE_KEY, Date.now());
}

function canShowDiscount() {
    const closedAt = localStorage.getItem(DISCOUNT_STORAGE_KEY);
    if (!closedAt) return true;

    const hoursPassed = (Date.now() - Number(closedAt)) / (1000 * 60 * 60);
    return hoursPassed >= DISCOUNT_COOLDOWN_HOURS;
}

function tryShowDiscount() {
    if (!canShowDiscount()) return;

    discountTimer = setTimeout(() => {
        showPopup('popup-discount');
    }, 3000);
}

function initDiscountPopup() {
    const trigger = () => {
        tryShowDiscount();
        window.removeEventListener('mousemove', trigger);
        window.removeEventListener('touchstart', trigger);
    };

    window.addEventListener('mousemove', trigger, { once: true });
    window.addEventListener('touchstart', trigger, { once: true });
}

initDiscountPopup();