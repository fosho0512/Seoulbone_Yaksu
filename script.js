/* [SEOUL BONE REHABILITATION MEDICINE] Script */

// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.remove('loading');
        }, 2000);
    }
});

const elems = {
    introOverlay: document.getElementById('intro-overlay'),
    enterBtn: document.getElementById('enter-btn'),
    menuToggle: document.getElementById('menu-toggle'),
    menuLabel: document.querySelector('#menu-toggle .label'),
    brandLogo: document.getElementById('brand-logo'),
    contactBtn: document.getElementById('btn-contact'),
    contactModal: document.getElementById('contact-modal'),
    closeContactBtn: document.getElementById('close-contact'),
    homeView: document.getElementById('home-view'),
    contentView: document.getElementById('content-view'),
    contentBody: document.getElementById('content-body'),
    visualBg: document.getElementById('visual-section'),
    menuItems: document.querySelectorAll('.menu-item'),
    promoBanner: document.getElementById('promo-banner'),
    closeBannerBtn: document.getElementById('close-banner'),
    bannerBadge: document.getElementById('banner-badge'),
    bannerMsg: document.getElementById('banner-msg'),
    bannerLink: document.getElementById('banner-link')
};

function init() {
    setupBanner(); 
    setupEventListeners();
    setupHashRouting();
}

function setupBanner() {
    const config = siteData.banner; 
    if (config.show && elems.promoBanner) {
        elems.promoBanner.style.display = "flex"; 
        elems.bannerBadge.textContent = config.badge;
        elems.bannerMsg.innerHTML = `<strong>${config.text}</strong>`; 
        elems.bannerLink.textContent = config.linkText;
        elems.bannerLink.href = config.linkUrl;
    } else {
        if(elems.promoBanner) elems.promoBanner.style.display = "none";
    }
}

function setupEventListeners() {
    if(elems.enterBtn) elems.enterBtn.addEventListener('click', enterSite);
    if(elems.brandLogo) elems.brandLogo.addEventListener('click', resetToMain);
    if(elems.menuToggle) elems.menuToggle.addEventListener('click', toggleMenu);
    if(elems.contactBtn) elems.contactBtn.addEventListener('click', () => elems.contactModal.classList.add('open'));
    if(elems.closeContactBtn) elems.closeContactBtn.addEventListener('click', () => elems.contactModal.classList.remove('open'));
    if(elems.closeBannerBtn) elems.closeBannerBtn.addEventListener('click', closeBanner);
    
    const closeDrawerBtn = document.getElementById('close-drawer');
    if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', toggleMenu);

    if(elems.menuItems) {
        elems.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                window.location.hash = id;
            });
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeAll();
    });
}

function enterSite() {
    elems.introOverlay.classList.add('hidden');
    document.body.classList.add('site-entered');
    
    const header = document.getElementById('global-header');
    const visualH3 = document.querySelector('.visual-text h3');
    const visualP = document.querySelector('.visual-text p');
    
    setTimeout(() => {
        if (header) header.classList.add('visible');
    }, 300);
    
    setTimeout(() => {
        if (visualH3) visualH3.classList.add('typing');
    }, 600);
    
    setTimeout(() => {
        if (visualH3) {
            visualH3.classList.remove('typing');
            visualH3.classList.add('typing-done');
        }
        if (visualP) visualP.classList.add('fade-up');
    }, 2800);
    
    setTimeout(showBanner, 3500);
}

function resetToMain() {
    history.pushState(null, '', window.location.pathname);
    closeAll();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    const isOpen = document.body.classList.contains('menu-open');
    if(elems.menuLabel) elems.menuLabel.textContent = isOpen ? "CLOSE" : "MENU";
}

function showBanner() {
    if(document.body.classList.contains('site-entered') && elems.promoBanner && siteData.banner.show) {
        elems.promoBanner.classList.add('show');
    }
}

function closeBanner() {
    if(elems.promoBanner) elems.promoBanner.classList.remove('show');
}

function showContentView(id) {
    const data = siteData.content[id];
    if (!data) return;

    // 이전 Values 슬라이더 정리
    cleanupValuesSlider();
    
    // Reset Content & Scroll
    elems.contentBody.innerHTML = "";
    window.scrollTo(0, 0);

    let html = '';

    if (id === 'staff') {
        const splitIdx = 2; 
        const leftBio = data.bio.slice(0, splitIdx);
        const rightBio = data.bio.slice(splitIdx);

        html = `
            <div class="sub-hero" id="staff-sub-hero">
                <div class="sub-hero-image">
                    <img src="images/staff-hero.png" alt="Medical Staff Hero">
                </div>
                <div class="sub-hero-overlay"></div>
                <div class="sub-hero-text">
                    <h2>${data.title}</h2>
                </div>
                <div class="scroll-indicator">
                    <div class="scroll-indicator-circle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 5v14M5 12l7 7 7-7"/>
                        </svg>
                    </div>
                </div>
                <div class="sub-hero-curve">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 L0,40 Q360,100 720,50 Q1080,0 1440,60 L1440,100 Z"></path>
                    </svg>
                </div>
            </div>
            <div class="staff-profile-layout">
                <div class="profile-sticky-wrapper">
                    <div class="profile-image-wrapper">
                        <img src="images/staff-profile.jpg" alt="Medical Staff Profile">
                    </div>
                </div>
                <div class="profile-info-scroll">
                    <div class="profile-header">
                        <h2 class="profile-name">장 용 준 <span class="title-badge">대표원장</span></h2>
                        <p class="profile-subtitle">재활의학과 전문의 · 의학박사<br>가톨릭대학교 재활의학교실 외래교수</p>
                    </div>
                    ${data.bio.map(group => `
                        <div class="bio-group">
                            <h4>${group.category}</h4>
                            <ul>${group.items.map(item => `<li>${item}</li>`).join('')}</ul>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="brand-philosophy-section">
                <span class="brand-caption">SEOUL BONE REHAB CLINIC</span>
                <div class="philosophy-card-wrapper">
                    <div class="philosophy-card">
                        <p class="philosophy-main">"몸은 결코 거짓을 말하지 않습니다."</p>
                        <p class="philosophy-line" data-line="1">통증은 그 진실을 전하는 가장 정직한 신호입니다.</p>
                        <p class="philosophy-line" data-line="2">우리는 보이는 증상 너머, 숨겨진 원인을 깊이 읽어냅니다.</p>
                        <p class="philosophy-line" data-line="3">현재의 신체 기능과 앞으로의 변화까지 세심하게 고려하여</p>
                        <p class="philosophy-line" data-line="4">가장 온전한 회복을 위해 정성을 다해 진료하겠습니다.</p>
                    </div>
                </div>
            </div>
        `;
    } 
    else if (id === 'diagnosis') {
        html = `
            <div class="sub-hero" id="diagnosis-sub-hero">
                <div class="sub-hero-image">
                    <img src="images/diagnosis-hero.png" alt="${data.title} Hero">
                </div>
                <div class="sub-hero-overlay"></div>
                <div class="sub-hero-text">
                    <h2>${data.title}</h2>
                </div>
                <div class="scroll-indicator">
                    <div class="scroll-indicator-circle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 5v14M5 12l7 7 7-7"/>
                        </svg>
                    </div>
                </div>
                <div class="sub-hero-curve">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 L0,40 Q360,100 720,50 Q1080,0 1440,60 L1440,100 Z"></path>
                    </svg>
                </div>
            </div>
            <div class="sub-hero-content">
                <div class="content-intro">
                    <p class="description">${data.desc}</p>
                    <div class="divider"></div>
                </div>
                <div class="flip-grid">
                    ${data.details.map(det => `
                        <div class="flip-card" onclick="this.classList.toggle('flipped')">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <div class="flip-img-box"><img src="${det.img}" alt="${det.t}"></div>
                                    <div class="flip-title-box"><h4>${det.t}</h4><span class="click-hint">Click to View</span></div>
                                </div>
                                <div class="flip-card-back">
                                    <div class="back-content">
                                        <h4>${det.t}</h4>
                                        <div class="divider-small"></div>
                                        <p>${det.d}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    else if (id === 'prp') {
        html = `
            <div class="sub-hero" id="prp-sub-hero">
                <div class="sub-hero-image">
                    <img src="images/cell-therapy-hero.png" alt="${data.title} Hero">
                </div>
                <div class="sub-hero-overlay"></div>
                <div class="sub-hero-text">
                    <h2>${data.title}</h2>
                </div>
                <div class="sub-hero-curve">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 L0,40 Q360,100 720,50 Q1080,0 1440,60 L1440,100 Z"></path>
                    </svg>
                </div>
            </div>
            <div class="sub-hero-content">
                <div class="content-intro">
                    <p class="description">${data.desc}</p>
                    <div class="divider"></div>
                </div>
                <div class="prp-full-content">
                    ${data.details.map(det => `
                        <div class="prp-section">
                            <div class="prp-section-image">
                                <img src="${det.img}" alt="${det.t}">
                            </div>
                            <div class="prp-section-text">
                                <h3>${det.t}</h3>
                                <p>${det.d}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    else if (id === 'values') {
        html = `
            <div class="sub-hero" id="values-sub-hero">
                <div class="sub-hero-image">
                    <img src="images/values-hero.png" alt="${data.title} Hero">
                </div>
                <div class="sub-hero-overlay"></div>
                <div class="sub-hero-text">
                    <h2>${data.title}</h2>
                </div>
                <div class="scroll-indicator">
                    <div class="scroll-indicator-circle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 5v14M5 12l7 7 7-7"/>
                        </svg>
                    </div>
                </div>
                <div class="sub-hero-curve">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 L0,40 Q360,100 720,50 Q1080,0 1440,60 L1440,100 Z"></path>
                    </svg>
                </div>
            </div>
            
            <div class="values-slogan-section">
                <div class="slogan-bg">
                    <img src="${data.sloganBg}" alt="Values Background">
                </div>
                <div class="slogan-overlay"></div>
                <div class="slogan-content">
                    <h3 class="slogan-main">${data.slogan.main}</h3>
                    <p class="slogan-sub">${data.slogan.sub}</p>
                </div>
            </div>
            
            <div class="values-slides-wrapper">
                <div class="values-slides-container">
                    <div class="values-slide-progress">
                        ${data.details.map((_, i) => `<div class="progress-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`).join('')}
                    </div>
                    <div class="values-image-track">
                        ${data.details.map((det, i) => `
                            <div class="values-image-item${i === 0 ? ' active' : ''}" data-index="${i}">
                                <img src="${det.img}" alt="${det.t}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="values-text-track">
                        ${data.details.map((det, i) => `
                            <div class="values-text-item${i === 0 ? ' active' : ''}" data-index="${i}">
                                <span class="values-num">0${i + 1}</span>
                                <h3 class="values-title">${det.t.replace(/^\d+\.\s*/, '')}</h3>
                                <div class="values-divider"></div>
                                <p class="values-desc">${det.d}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="values-scroll-spacer"></div>
            </div>
        `;
    }
    else {
        const mediaHtml = data.mapEmbed 
            ? `<div class="map-container">${data.mapEmbed}</div>` 
            : `<img src="${data.modalImg}" alt="${data.title}">`;
        
        let heroImagePath = 'images/staff-hero.png';
        if (id === 'treatment') heroImagePath = 'images/treatment-hero.png';
        else if (id === 'contact') heroImagePath = 'images/contact-hero.png';
        else if (id === 'facilities') heroImagePath = 'images/treatment-hero.png';

        html = `
            <div class="sub-hero" id="${id}-sub-hero">
                <div class="sub-hero-image">
                    <img src="${heroImagePath}" alt="${data.title} Hero">
                </div>
                <div class="sub-hero-overlay"></div>
                <div class="sub-hero-text">
                    <h2>${data.title}</h2>
                </div>
                <div class="scroll-indicator">
                    <div class="scroll-indicator-circle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 5v14M5 12l7 7 7-7"/>
                        </svg>
                    </div>
                </div>
                <div class="sub-hero-curve">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0,100 L0,40 Q360,100 720,50 Q1080,0 1440,60 L1440,100 Z"></path>
                    </svg>
                </div>
            </div>
            <div class="sub-hero-content">
                <div class="modal-layout-top">
                    <div class="modal-text-group">
                        <p class="description">${data.desc}</p>
                    </div>
                    <div class="modal-image-group">
                        ${mediaHtml}
                    </div>
                </div>
                <div class="modal-grid">
                    ${data.details.map(det => `
                        <div class="grid-item">
                            <div class="grid-img-wrapper"><img src="${det.img}" alt="${det.t}"></div>
                            <div class="grid-text-wrapper"><h4>${det.t}</h4><p>${det.d}</p></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 이전 서브히어로 상태 초기화
    document.body.classList.remove('has-sub-hero');
    document.body.classList.remove('sub-hero-passed');
    
    // 모든 페이지에 서브히어로 클래스 추가 (렌더링 전에)
    document.body.classList.add('has-sub-hero');
    
    // content-view-active 클래스 추가 (has-sub-hero 이후에)
    document.body.classList.add('content-view-active');
    
    elems.contentBody.innerHTML = html;
    
    // Switch views
    elems.homeView.classList.remove('active');
    elems.contentView.classList.add('active');
    
    // 서브히어로 스크롤 효과 설정 (모든 페이지)
    setupSubHeroScrollEffect();
    
    // Values 페이지 슬라이드 설정
    if (id === 'values') {
        setTimeout(() => {
            setupValuesSlider();
        }, 100);
    }
    
    // Close menu if open
    if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
    }
}

function setupSubHeroScrollEffect() {
    const subHero = document.querySelector('.sub-hero');
    if (!subHero) return;
    
    const subHeroHeight = subHero.offsetHeight;
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 90;
    
    const handleSubHeroScroll = () => {
        const scrollY = window.scrollY;
        
        // 서브히어로 오버레이 어두워짐 효과
        if (scrollY > 100) {
            subHero.classList.add('scrolled');
        } else {
            subHero.classList.remove('scrolled');
        }
        
        // 서브히어로 영역을 벗어났는지 확인
        if (scrollY > subHeroHeight - headerHeight - 50) {
            document.body.classList.add('sub-hero-passed');
        } else {
            document.body.classList.remove('sub-hero-passed');
        }
    };
    
    window.addEventListener('scroll', handleSubHeroScroll);
    
    // 초기 상태 설정
    handleSubHeroScroll();
}

function showHomeView(skipPushState = false) {
    cleanupValuesSlider();
    elems.contentView.classList.remove('active');
    elems.homeView.classList.add('active');
    document.body.classList.remove('content-view-active');
    document.body.classList.remove('has-sub-hero');
    document.body.classList.remove('sub-hero-passed');
    resetScrollState();
    if (!skipPushState && window.location.hash) {
        history.pushState(null, '', window.location.pathname);
    }
}

function resetScrollState() {
    const header = document.getElementById('global-header');
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (header) {
        header.classList.remove('scrolled');
    }
    if (scrollProgress) {
        scrollProgress.style.width = '0%';
    }
}

function closeAll() {
    showHomeView();
    if(elems.contactModal) elems.contactModal.classList.remove('open');
    if (document.body.classList.contains('menu-open')) {
        toggleMenu();
    }
}

// Hash-based Routing
function setupHashRouting() {
    // Handle hash changes (back/forward buttons, direct URL access)
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.slice(1);
        if (hash && siteData.content[hash]) {
            showContentView(hash);
        } else {
            showHomeView(true);
        }
    });
    
    // Check initial hash on page load
    setTimeout(() => {
        const hash = window.location.hash.slice(1);
        if (hash && siteData.content[hash]) {
            // Skip intro if URL has hash
            if (elems.introOverlay) {
                elems.introOverlay.classList.remove('loading');
                elems.introOverlay.classList.add('hidden');
                document.body.classList.add('site-entered');
            }
            const header = document.getElementById('global-header');
            if (header) header.classList.add('visible');
            showContentView(hash);
        }
    }, 100);
}

function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash && siteData.content[hash]) {
        showContentView(hash);
        // Close menu if open
        if (document.body.classList.contains('menu-open')) {
            toggleMenu();
        }
    }
}

// Premium Scroll Effects
function setupScrollEffects() {
    const header = document.getElementById('global-header');
    const scrollProgress = document.getElementById('scroll-progress');
    
    // Header scroll effect
    function handleScroll(scrollTop, scrollHeight, clientHeight) {
        // 서브히어로가 있는 페이지는 별도 처리 (setupSubHeroScrollEffect에서 처리)
        if (document.body.classList.contains('has-sub-hero')) {
            // Scroll progress bar만 업데이트
            if (scrollProgress) {
                const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
                scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
            }
            return;
        }
        
        // 일반 페이지 헤더 스크롤 효과
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll progress bar
        if (scrollProgress) {
            const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
            scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
        }
    }
    
    // Listen to window scroll
    window.addEventListener('scroll', () => {
        handleScroll(window.scrollY, document.documentElement.scrollHeight, window.innerHeight);
    });
}

// Intersection Observer for Fade-In Animation
function setupFadeInObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements when content view becomes active
    const contentView = document.getElementById('content-view');
    if (contentView) {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('active')) {
                    setTimeout(() => {
                        const fadeElements = contentView.querySelectorAll('.grid-item, .flip-card, .prp-section, .bio-group');
                        fadeElements.forEach((el, index) => {
                            el.classList.add('fade-in-up');
                            el.style.transitionDelay = (index * 0.1) + 's';
                            observer.observe(el);
                        });
                        
                        // Brand Philosophy Section animation
                        const philosophySection = contentView.querySelector('.brand-philosophy-section');
                        if (philosophySection) {
                            const philosophyObserver = new IntersectionObserver((entries) => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                        entry.target.classList.add('animate');
                                        setupPhilosophyCardScroll(philosophySection);
                                        philosophyObserver.unobserve(entry.target);
                                    }
                                });
                            }, { threshold: 0.1 });
                            philosophyObserver.observe(philosophySection);
                        }
                    }, 100);
                }
            });
        });
        
        mutationObserver.observe(contentView, { attributes: true, attributeFilter: ['class'] });
    }
}

// Philosophy Card Scroll Animation
function setupPhilosophyCardScroll(section) {
    const cardWrapper = section.querySelector('.philosophy-card-wrapper');
    const card = section.querySelector('.philosophy-card');
    const lines = section.querySelectorAll('.philosophy-line');
    if (!cardWrapper || !card) return;
    
    const INITIAL_HEIGHT = 160;
    const MAX_HEIGHT = 420;
    const LINE_HEIGHT_STEP = 65;
    
    let scrollHandler = null;
    let isFullyExpanded = false;
    let shownLines = [];
    
    scrollHandler = function() {
        const rect = cardWrapper.getBoundingClientRect();
        const vh = window.innerHeight;
        const cardTop = rect.top;
        
        const widthStartThreshold = vh * 0.80;
        const widthEndThreshold = vh * 0.45;
        const heightStartThreshold = vh * 0.45;
        const heightEndThreshold = vh * 0.15;
        
        // Phase 1: Width expansion (80vh → 45vh)
        if (cardTop <= widthStartThreshold && cardTop > widthEndThreshold) {
            const progress = (widthStartThreshold - cardTop) / (widthStartThreshold - widthEndThreshold);
            const width = 70 + (30 * progress);
            cardWrapper.style.width = width + 'vw';
            cardWrapper.style.maxWidth = 'none';
            cardWrapper.style.marginLeft = 'calc(-' + (width / 2) + 'vw + 50%)';
            cardWrapper.style.marginRight = 'calc(-' + (width / 2) + 'vw + 50%)';
            card.style.height = INITIAL_HEIGHT + 'px';
            cardWrapper.classList.remove('expanding');
            cardWrapper.classList.remove('sticky');
        }
        // Phase 2: Height expansion + sticky (45vh → 15vh)
        else if (cardTop <= widthEndThreshold && cardTop > heightEndThreshold) {
            if (!isFullyExpanded) {
                isFullyExpanded = true;
                cardWrapper.style.width = '100vw';
                cardWrapper.style.maxWidth = 'none';
                cardWrapper.style.marginLeft = 'calc(-50vw + 50%)';
                cardWrapper.style.marginRight = 'calc(-50vw + 50%)';
                cardWrapper.classList.add('expanding');
                cardWrapper.classList.add('sticky');
            }
            
            const heightProgress = (widthEndThreshold - cardTop) / (widthEndThreshold - heightEndThreshold);
            const currentHeight = INITIAL_HEIGHT + ((MAX_HEIGHT - INITIAL_HEIGHT) * heightProgress);
            card.style.height = Math.min(currentHeight, MAX_HEIGHT) + 'px';
            
            const availableSpace = currentHeight - INITIAL_HEIGHT;
            const linesToShow = Math.floor(availableSpace / LINE_HEIGHT_STEP);
            
            lines.forEach((line, idx) => {
                if (idx < linesToShow && !shownLines.includes(idx)) {
                    shownLines.push(idx);
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, 100);
                }
            });
        }
        // Phase 3: Fully expanded
        else if (cardTop <= heightEndThreshold) {
            card.style.height = MAX_HEIGHT + 'px';
            lines.forEach((line, idx) => {
                if (!shownLines.includes(idx)) {
                    shownLines.push(idx);
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, idx * 150);
                }
            });
        }
        // Reset: Above all thresholds
        else {
            cardWrapper.style.width = '';
            cardWrapper.style.maxWidth = '';
            cardWrapper.style.marginLeft = '';
            cardWrapper.style.marginRight = '';
            card.style.height = '';
            cardWrapper.classList.remove('expanding');
            cardWrapper.classList.remove('sticky');
            isFullyExpanded = false;
            shownLines = [];
            lines.forEach(line => line.classList.remove('visible'));
        }
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();
    
    section._philosophyCleanup = () => {
        window.removeEventListener('scroll', scrollHandler);
    };
}

// Smooth Scroll Inertia (PC Only) + GSAP ScrollTrigger Integration
let lenisScrollTriggerLinked = false;

function linkLenisToScrollTrigger() {
    if (lenisScrollTriggerLinked || !window.lenis) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    window.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    lenisScrollTriggerLinked = true;
}

function setupSmoothScroll() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 1024
        || ('ontouchstart' in window);
    
    if (isMobile || typeof Lenis === 'undefined') return;
    
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    window.lenis = lenis;
    
    // GSAP ScrollTrigger 전역 연동 시도
    linkLenisToScrollTrigger();
}

// Values Page - ScrollTrigger Slider
let valuesScrollTrigger = null;

function setupValuesSlider() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Lenis 연동 재시도 (늦게 로드된 경우 대비)
    linkLenisToScrollTrigger();
    
    const wrapper = document.querySelector('.values-slides-wrapper');
    const container = document.querySelector('.values-slides-container');
    const imageItems = document.querySelectorAll('.values-image-item');
    const textItems = document.querySelectorAll('.values-text-item');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    if (!wrapper || !container || imageItems.length === 0) return;
    
    const totalSlides = imageItems.length;
    let currentIndex = 0;
    
    function updateSlide(newIndex) {
        if (newIndex === currentIndex) return;
        
        // 이미지: reveal 방식 (clip-path wipe-down)
        imageItems.forEach((item, i) => {
            if (i <= newIndex) {
                item.classList.add('revealed');
            } else {
                item.classList.remove('revealed');
            }
        });
        
        // 텍스트: 기존 fade + slide 유지
        textItems.forEach((item, i) => {
            item.classList.remove('active', 'exiting');
            if (i === newIndex) {
                item.classList.add('active');
            } else if (i === currentIndex) {
                item.classList.add('exiting');
            }
        });
        
        progressDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === newIndex);
        });
        
        currentIndex = newIndex;
    }
    
    // ScrollTrigger 생성
    if (valuesScrollTrigger) {
        valuesScrollTrigger.kill();
    }
    
    valuesScrollTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
            const progress = self.progress;
            const slideIndex = Math.min(
                Math.floor(progress * totalSlides),
                totalSlides - 1
            );
            updateSlide(slideIndex);
        }
    });
    
    // Progress dot 클릭 이벤트
    progressDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            const targetProgress = i / totalSlides;
            const wrapperRect = wrapper.getBoundingClientRect();
            const scrollTarget = wrapper.offsetTop + (wrapperRect.height * targetProgress);
            
            if (window.lenis) {
                window.lenis.scrollTo(scrollTarget, { duration: 1 });
            } else {
                window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
            }
        });
    });
}

function cleanupValuesSlider() {
    if (valuesScrollTrigger) {
        valuesScrollTrigger.kill();
        valuesScrollTrigger = null;
    }
}

// Run
init();
setupScrollEffects();
setupFadeInObserver();
setupSmoothScroll();