let currentIndex = 0;
const promoItems = document.querySelectorAll('.promo-item');

// Hiệu ứng tự động thay đổi hình ảnh khuyến mãi
function showNextPromo() {
    promoItems[currentIndex].classList.remove('visible');
    currentIndex = (currentIndex + 1) % promoItems.length;
    promoItems[currentIndex].classList.add('visible');
}

// Bắt đầu hiển thị khuyến mãi đầu tiên
promoItems[currentIndex].classList.add('visible');
setInterval(showNextPromo, 5000); // Thay đổi mỗi 5 giây

// Hiệu ứng xuất hiện khi cuộn
window.addEventListener('scroll', () => {
    promoItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
});
