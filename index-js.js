document.addEventListener('DOMContentLoaded', () => {
    // Dữ liệu mẫu về xe máy
    const motorcycles = [
        {
            id: 1,
            brand: 'Honda',
            model: 'ADV350',
            type: 'Xe tay ga',
            color: 'Đỏ',
            year: 2023,
            price: 165990000,
            description: 'Honda ADV350 là mẫu xe tay ga địa hình cỡ trung, kết hợp giữa sự mạnh mẽ và tiện nghi hiện đại. Xe sở hữu thiết kế thể thao, động cơ 330cc mạnh mẽ, hệ thống treo linh hoạt và nhiều công nghệ an toàn tiên tiến, phù hợp cho cả di chuyển trong thành phố lẫn những chuyến hành trình xa.',
            image: './moto/adv350_1.jpg',
            link: 'adv350.html'
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Air Blade 160',
            type: 'Xe tay ga',
            color: 'Đen',
            year: 2025,
            price: 42012000,
            description: 'Honda Air Blade 160 là mẫu xe tay ga thể thao, mạnh mẽ với động cơ 160cc eSP+ cho khả năng vận hành ấn tượng và tiết kiệm nhiên liệu. Xe được trang bị phanh ABS, khóa thông minh Smart Key cùng thiết kế hiện đại, cá tính, mang đến sự an toàn, tiện nghi và phong cách cho người dùng.',
            image: './moto/airblade160.png',
            link: 'airblade.html'
        },
        {
            id: 3,
            brand: 'Honda',
            model: 'SH Mode 125',
            type: 'Xe tay ga',
            color: 'Trắng',
            year: 2022,
            price: 57132000,
            description: 'Honda SH Mode 125 là mẫu xe tay ga thời trang, nhỏ gọn và tiện lợi, phù hợp cho việc di chuyển hằng ngày trong đô thị. Xe sử dụng động cơ 125cc eSP tiết kiệm nhiên liệu, trang bị khóa thông minh Smart Key và thiết kế trẻ trung, giúp người dùng vừa thoải mái vừa phong cách trên mọi hành trình.',
            image: './moto/ShMode.png',
            link: 'SH_Mode_125.html'
        },
        {
            id: 4,
            brand: 'Honda',
            model: 'SH350i',
            type: 'Xe ptay ga',
            color: 'Xanh lá',
            year: 2025,
            price: 151190000,
            description: 'SH350i là mẫu xe tay ga cao cấp của Honda, nổi bật với thiết kế sang trọng, động cơ 330cc mạnh mẽ, vận hành êm ái và tiết kiệm nhiên liệu. Xe được trang bị công nghệ hiện đại như hệ thống phanh ABS 2 kênh, khóa thông minh Smart Key, màn hình LCD hiện đại và cốp rộng tiện lợi, mang đến trải nghiệm di chuyển an toàn, thoải mái và đẳng cấp.',
            image: 'https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png',
            link: 'SH350i.html'
        },
        {
            id: 5,
            brand: 'Honda',
            model: 'SH160i',
            type: 'Xe tay ga',
            color: 'Xám',
            year: 2024,
            price: 73921091,
            description: 'Honda SH160i là dòng xe tay ga cao cấp, nổi bật với thiết kế sang trọng và hiện đại. Xe được trang bị động cơ 160cc eSP+ mạnh mẽ, tiết kiệm nhiên liệu, cùng nhiều công nghệ tiên tiến như hệ thống phanh ABS, khóa thông minh Smart Key, mang đến trải nghiệm lái an toàn, tiện nghi và đẳng cấp.',
            image: './moto/SH160i.png',
            link: 'SH1160i.html'
        },
        {
            id: 6,
            brand: 'Yamaha',
            model: 'Vario',
            type: 'Xe tay ga',
            color: 'Đen',
            year: 2024,
            price: 40735637,
            description: 'Honda Vario 125 là mẫu xe tay ga thể thao cỡ trung, nổi bật với thiết kế năng động và hiện đại. Xe trang bị động cơ 125cc eSP tiết kiệm nhiên liệu, vận hành êm ái, cùng các tiện ích như hệ thống đèn LED, mặt đồng hồ kỹ thuật số và cốp xe rộng, mang lại trải nghiệm tiện lợi và phong cách cho người dùng đô thị.',
            image: './moto/vario125.png',
            link: 'vario.html'
        }
    ];

    // DOM Elements
    const motorcycleListings = document.getElementById('motorcycleListings');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
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
                        <i href="index.html" class="fas fa-eye"></i> Xem chi tiết
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

    // Handle "Xem chi tiết" buttons - chuyển hướng đến trang chi tiết
    motorcycleListings?.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.view-details');
        if (clickedButton) {
            const bikeId = clickedButton.dataset.id;
            const selectedBike = motorcycles.find(bike => bike.id === parseInt(bikeId));

            if (selectedBike && selectedBike.link) {
                window.location.href = selectedBike.link;
            }
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