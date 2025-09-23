document.addEventListener('DOMContentLoaded', () => {
    // Dữ liệu mẫu về xe máy
    const motorcycles = [
        {
            id: 1,
            brand: 'Honda',
            model: 'Vision',
            type: 'Xe tay ga',
            color: 'Trắng',
            year: 2023,
            price: 36612000,
            description: 'Kiểu dáng thời trang và màu sắc cá tính. Thân xe nhỏ gọn kế thừa từ nét thiết kế của dòng xe SH, đường nét rõ ràng, liền mạch, càng nổi bật hơn là tông màu Đen và Xám Đen độc đáo.',
            image: './image/vision.png'
        },
        {
            id: 2,
            brand: 'Yamaha',
            model: 'NVX 155',
            type: 'Xe tay ga',
            color: 'Xanh',
            year: 2025,
            price: 69000000,
            description: 'Tái định nghĩa lại thị trường xe tay ga thể thao tại Việt Nam, NVX 155 Hoàn Toàn Mới ra mắt với khối động cơ đột phá YECVT và diện mạo thể thao đậm chất R-DNA.',
            image: './image/nvx.png'
        },
        {
            id: 3,
            brand: 'Suzuki',
            model: 'V-STROM 250SX',
            type: 'Xe phân khối lớn',
            color: 'Xám',
            year: 2022,
            price: 132900000,
            description: 'Khung sườn mới, nhẹ nhưng chắc chắn, gia tăng độ ổn định và khả năng điều khiển vượt trội. Góc lái linh hoạt và hệ thống treo tối ưu giúp V-STROM vượt qua các khúc cua dễ dàng.',
            image: './image/vstrom.png'
        },
        {
            id: 4,
            brand: 'Kawasaki',
            model: 'W800',
            type: 'Xe phân khối lớn',
            color: 'Đen',
            year: 2025,
            price: 352400000,
            description: 'W800 khá thân thiện kể cả với những người mới chơi xe Phân khối lớn, sử dụng động cơ đôi thẳng hàng SOHC 773cc làm mát bằng không khí.',
            image: './image/w800.png'
        },
        {
            id: 5,
            brand: 'Honda',
            model: 'Super Cub C125',
            type: 'Xe số',
            color: 'Đen',
            year: 2024,
            price: 86292000,
            description: 'Thiết kế hình chữ S kế thừa kiểu dáng huyền thoại của xe Super Cub thập niên 50, mang đến sự hài hòa và mềm mại với lớp sơn nhũ ánh kim.',
            image: './image/cub.png'
        },
        {
            id: 6,
            brand: 'Yamaha',
            model: 'NEOs',
            type: 'Xe điện',
            color: 'Đen',
            year: 2024,
            price: 49091000,
            description: 'Những tính năng và công nghệ của NEOs giúp mẫu xe này trở thành phương tiện di chuyển xanh và thân thiện với môi trường.',
            image: './image/neos.png'
        }
    ];

    // DOM Elements
    const motorcycleListings = document.getElementById('motorcycleListings');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const motorcycleModal = document.getElementById('motorcycleModal');
    const closeButton = document.querySelector('.close-button');
    const modalBody = document.getElementById('modalBody');
    const userActionsContainer = document.getElementById('user-actions-container');

    // Mobile menu elements
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // ===========================================
    // MOBILE MENU FUNCTIONALITY
    // ===========================================
    const openMobileMenu = () => {
        mobileNav.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Mobile menu event listeners
    mobileMenuToggle?.addEventListener('click', openMobileMenu);
    mobileNavClose?.addEventListener('click', closeMobileMenu);
    mobileNavOverlay?.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // MOTORCYCLE DISPLAY FUNCTIONS
    // ===========================================
    const displayMotorcycles = (bikes) => {
        motorcycleListings.innerHTML = '';

        if (bikes.length === 0) {
            motorcycleListings.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--secondary-color); margin-bottom: 20px;"></i>
                    <p style="font-size: 1.2rem; color: var(--secondary-color); font-style: italic;">Không tìm thấy xe máy nào phù hợp với tiêu chí tìm kiếm.</p>
                </div>
            `;
            return;
        }

        bikes.forEach((motorcycle, index) => {
            const card = document.createElement('div');
            card.classList.add('motorcycle-card');
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <img src="${motorcycle.image}" alt="${motorcycle.brand} ${motorcycle.model}" loading="lazy">
                <div class="card-content">
                    <h3>${motorcycle.brand} ${motorcycle.model}</h3>
                    <p class="price">${formatCurrency(motorcycle.price)}</p>
                    <p class="description">${motorcycle.description}</p>
                    <button class="view-details" data-id="${motorcycle.id}">
                        <i class="fas fa-eye"></i> Xem chi tiết
                    </button>
                </div>
            `;
            motorcycleListings.appendChild(card);
        });
    };

    const searchMotorcycles = () => {
        const searchTerm = searchInput.value.toLowerCase();
        searchButton.innerHTML = '<span class="loading"></span> Đang tìm...';

        setTimeout(() => {
            const filteredBikes = motorcycles.filter(bike => {
                return bike.brand.toLowerCase().includes(searchTerm) ||
                    bike.model.toLowerCase().includes(searchTerm) ||
                    bike.description.toLowerCase().includes(searchTerm) ||
                    String(bike.year).includes(searchTerm);
            });

            displayMotorcycles(filteredBikes);
            searchButton.innerHTML = '<i class="fas fa-search"></i> Tìm Kiếm';
        }, 500);
    };

    // ===========================================
    // EVENT LISTENERS
    // ===========================================
    searchButton?.addEventListener('click', searchMotorcycles);
    searchInput?.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchMotorcycles();
        }
    });

    // Handle "Xem chi tiết" buttons
    motorcycleListings?.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.view-details');
        if (clickedButton) {
            const bikeId = clickedButton.dataset.id;
            const selectedBike = motorcycles.find(bike => bike.id === parseInt(bikeId));

            if (selectedBike) {
                modalBody.innerHTML = `
                    <div class="modal-details-container">
                        <div class="modal-image-wrapper">
                            <img src="${selectedBike.image}" alt="${selectedBike.brand} ${selectedBike.model}">
                        </div>
                        <div class="modal-text-content">
                            <h3>${selectedBike.brand} ${selectedBike.model} (${selectedBike.year})</h3>
                            <p class="modal-price">${formatCurrency(selectedBike.price)}</p>
                            <div class="modal-details-item"><strong>Hãng xe:</strong> ${selectedBike.brand}</div>
                            <div class="modal-details-item"><strong>Mẫu xe:</strong> ${selectedBike.model}</div>
                            <p class="modal-description"><strong>Mô tả:</strong><br>${selectedBike.description}</p>
                            <div style="margin-top: 30px; display: flex; gap: 15px;">
                                <button class="contact-btn" style="flex: 1; padding: 15px; background: var(--gradient-bg); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                                    <i class="fas fa-phone"></i> Liên hệ tư vấn
                                </button>
                                <button class="product-btn" style="flex: 1; padding: 15px; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                                    <i class="fas fa-shopping-cart"></i> Đặt xe ngay
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                motorcycleModal.style.display = 'flex';

                // Add event listeners for modal buttons
                const contactBtn = modalBody.querySelector('.contact-btn');
                const productBtn = modalBody.querySelector('.product-btn');

                contactBtn?.addEventListener('click', () => {
                    window.location.href = 'contact.html';
                });

                productBtn?.addEventListener('click', () => {
                    window.location.href = 'listings.html';
                });
            }
        }
    });

    // Modal close handlers
    closeButton?.addEventListener('click', () => {
        motorcycleModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === motorcycleModal) {
            motorcycleModal.style.display = 'none';
        }
    });

    // ===========================================
    // USER AUTHENTICATION
    // ===========================================
    const updateHeaderForUser = () => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        userActionsContainer.innerHTML = '';

        if (loggedInUser) {
            const userInfoDiv = document.createElement('div');
            userInfoDiv.classList.add('user-info');
            userInfoDiv.innerHTML = `
                <span>Xin chào, ${loggedInUser.username}!</span>
                <a href="#" id="logout-btn" class="logout-btn">Đăng xuất</a>
            `;
            userActionsContainer.appendChild(userInfoDiv);

            document.getElementById('logout-btn')?.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('loggedInUser');
                updateHeaderForUser();
            });
        } else {
            userActionsContainer.innerHTML = `
                <a href="login.html">Đăng Nhập</a>
                <a href="register.html">Đăng Ký</a>
            `;
        }
    };

    // ===========================================
    // SMOOTH SCROLLING
    // ===========================================
    document.querySelectorAll('a[href^="#"]:not(.login-btn):not(.register-btn)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // HEADER SCROLL EFFECT
    // ===========================================
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,235,234,0.9))';
                header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
            } else {
                header.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,235,234,0.95))';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        }
    });

    // ===========================================
    // INTERSECTION OBSERVER
    // ===========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.brands-section, .listings-section, .about-section').forEach(section => {
        observer.observe(section);
    });

    // ===========================================
    // BRANDS CAROUSEL
    // ===========================================
    const initBrandsCarousel = () => {
        const carousel = document.querySelector('.brands-carousel');
        const dots = document.querySelectorAll('.dot');

        if (!carousel || !dots.length) return;

        let currentSlide = 0;
        const totalSlides = 4;
        const slideWidth = 300;
        let autoSlideInterval;

        const goToSlide = (slideIndex) => {
            currentSlide = slideIndex;
            const translateX = -(slideIndex * slideWidth);
            carousel.style.transform = `translateX(${translateX}px)`;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        };

        const nextSlide = () => {
            if (currentSlide >= totalSlides - 1) {
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(${-(totalSlides * slideWidth)}px)`;

                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease-in-out';
                    goToSlide(0);
                }, 50);
            } else {
                goToSlide(currentSlide + 1);
            }
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextSlide, 3000);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(index);
                startAutoSlide();
            });
        });

        const carouselContainer = document.querySelector('.brands-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }

        const updateSlideWidth = () => {
            const slideElement = document.querySelector('.brand-slide');
            if (slideElement) {
                const newSlideWidth = slideElement.offsetWidth;
                if (newSlideWidth !== slideWidth) {
                    const translateX = -(currentSlide * newSlideWidth);
                    carousel.style.transform = `translateX(${translateX}px)`;
                }
            }
        };

        window.addEventListener('resize', updateSlideWidth);

        // Initialize
        goToSlide(0);
        startAutoSlide();
    };

    // ===========================================
    // INITIALIZATION
    // ===========================================
    updateHeaderForUser();
    displayMotorcycles(motorcycles);
    initBrandsCarousel();
});

// ===========================================
// BANNER POPUP FUNCTIONALITY
// ===========================================
let bannerStartTime;

const showBanner = () => {
    const banner = document.getElementById('bannerOverlay');
    if (banner) {
        banner.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};

const closeBanner = () => {
    const banner = document.getElementById('bannerOverlay');
    if (banner) {
        banner.classList.remove('show');
        document.body.style.overflow = 'auto';
        logBannerClose();
    }
};

const logBannerClose = () => {
    if (bannerStartTime) {
        const viewTime = (Date.now() - bannerStartTime) / 1000;
        console.log(`Banner được xem trong ${viewTime.toFixed(1)} giây`);
    }
};

const addShakeEffect = () => {
    const container = document.querySelector('.banner-container');
    if (container) {
        container.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    }
};

// Banner event listeners and initialization
window.addEventListener('load', () => {
    setTimeout(showBanner, 500);
});

document.getElementById('bannerOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeBanner();
    }
});

document.getElementById('bannerOverlay')?.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'opacity' && e.target.classList.contains('show')) {
        bannerStartTime = Date.now();
        console.log('Banner đã hiển thị');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBanner();
    }
});

document.querySelector('.cta-button')?.addEventListener('click', function () {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);

    setTimeout(closeBanner, 1000);
});

// CSS for shake effect
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Auto close banner and shake effect timers
setTimeout(addShakeEffect, 1000);
setTimeout(() => {
    const banner = document.getElementById('bannerOverlay');
    if (banner && banner.classList.contains('show')) {
        closeBanner();
    }
}, 30000);