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
                <div class="brand-philosophy-inner">
                    <span class="brand-caption">SEOUL BONE REHAB CLINIC</span>
                    <div class="philosophy-card-track" id="philosophy-card-track">
                        <div class="philosophy-card-placeholder" id="philosophy-placeholder"></div>
                        <div class="philosophy-card-expand" id="philosophy-expand-card">
                            <div class="expand-line" data-line="1">
                                <p class="philosophy-main">"몸은 결코 거짓을 말하지 않습니다."</p>
                            </div>
                            <div class="expand-line" data-line="2">
                                <p class="philosophy-sub">통증은 그 진실을 전하는<br>가장 정직한 신호입니다.</p>
                            </div>
                            <div class="expand-line" data-line="3">
                                <p class="philosophy-desc-line">우리는 보이는 증상 너머,</p>
                            </div>
                            <div class="expand-line" data-line="4">
                                <p class="philosophy-desc-line">숨겨진 원인을 깊이 읽어냅니다.</p>
                            </div>
                            <div class="expand-line" data-line="5">
                                <p class="philosophy-desc-line">현재의 신체 기능과 앞으로의 변화까지</p>
                            </div>
                            <div class="expand-line" data-line="6">
                                <p class="philosophy-desc-line">세심하게 고려하여</p>
                            </div>
                            <div class="expand-line" data-line="7">
                                <p class="philosophy-desc-line">가장 온전한 회복을 위해</p>
                            </div>
                            <div class="expand-line" data-line="8">
                                <p class="philosophy-desc-line">정성을 다해 진료하겠습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } 
    else if (id === 'diagnosis') {
        html = `
            <div class="sub-hero" id="diagnosis-sub-hero">
                <div class="sub-hero-image">
                    <img src="images/staff-hero.png" alt="${data.title} Hero">
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
                    <img src="images/staff-hero.png" alt="${data.title} Hero">
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
    else {
        const mediaHtml = data.mapEmbed 
            ? `<div class="map-container">${data.mapEmbed}</div>` 
            : `<img src="${data.modalImg}" alt="${data.title}">`;
        
        const heroImagePath = id === 'values' ? 'images/values-hero.png' : 'images/staff-hero.png';

        html = `
            <div class="sub-hero" id="${id}-sub-hero">
                <div class="sub-hero-image">
                    <img src="${heroImagePath}" alt="${data.title} Hero">
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
    
    // Reinitialize Lenis for new content
    reinitLenis();
    
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
    elems.contentView.classList.remove('active');
    elems.homeView.classList.add('active');
    document.body.classList.remove('content-view-active');
    document.body.classList.remove('has-sub-hero');
    document.body.classList.remove('sub-hero-passed');
    resetScrollState();
    reinitLenis();
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
                                        setupPhilosophyScrollExpand();
                                        philosophyObserver.unobserve(entry.target);
                                    }
                                });
                            }, { threshold: 0.2 });
                            philosophyObserver.observe(philosophySection);
                        }
                    }, 100);
                }
            });
        });
        
        mutationObserver.observe(contentView, { attributes: true, attributeFilter: ['class'] });
    }
}

// Philosophy Card Scroll Expand Effect
let philosophyRafId = null;
let philosophyComplete = false;
let lastLenisResizeTime = 0;

// Pin state machine
let isPinned = false;
let pinScrollY = 0;
let originalCardTop = 0;
let initialBottomOffset = 0; // Bottom offset at pin moment

function setupPhilosophyScrollExpand() {
    const card = document.getElementById('philosophy-expand-card');
    const track = document.getElementById('philosophy-card-track');
    const placeholder = document.getElementById('philosophy-placeholder');
    if (!card || !track || !placeholder) return;
    
    const lines = card.querySelectorAll('.expand-line');
    const totalLines = lines.length;
    philosophyComplete = false;
    lastLenisResizeTime = 0;
    isPinned = false;
    pinScrollY = 0;
    originalCardTop = 0;
    initialBottomOffset = 0;
    
    // Expansion values
    const minHeight = 180;
    const maxHeight = 650;
    const minWidth = 70;
    const maxWidth = 100;
    const bottomOffset = 80; // Fixed distance from viewport bottom when pinned
    const expansionDistance = maxHeight - minHeight; 
    
    // 초기화
    card.style.width = minWidth + '%';
    card.style.height = minHeight + 'px';
    card.classList.remove('is-pinned', 'is-released');
    placeholder.style.display = 'none';
    placeholder.style.height = '0px';
    
    const updateCardExpansion = () => {
        // 이미 완료되었다면 너비를 100%로 강제하고 종료 (줄어듦 방지)
        if (philosophyComplete) {
            card.style.width = maxWidth + '%';
            return;
        }
        
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const trackRect = track.getBoundingClientRect();
        
        // ============================================================
        // [Phase 1] 너비 확장 로직 (Width Expansion)
        // 80vh 지점에서 시작해서 45vh 지점에서 100% 완료
        // ============================================================
        const widthStartTrigger = windowHeight * 0.8; 
        const widthEndTrigger = windowHeight * 0.45; // 핀 고정 지점 (조절 가능)
        
        let widthProgress = 0;
        
        // 스크롤 위치에 따른 너비 진행률 계산 (0.0 ~ 1.0)
        if (trackRect.top < widthStartTrigger) {
            widthProgress = (widthStartTrigger - trackRect.top) / (widthStartTrigger - widthEndTrigger);
        }
        
        // 진행률을 0과 1 사이로 제한
        widthProgress = Math.min(1, Math.max(0, widthProgress));
        
        // 핀 상태가 아닐 때(Phase 1)는 계산된 너비 적용
        if (!isPinned) {
            const currentWidth = minWidth + (maxWidth - minWidth) * widthProgress;
            card.style.width = currentWidth + '%';
        } else {
            // 핀 상태(Phase 2)에서는 무조건 100% 유지
            card.style.width = maxWidth + '%';
        }

        // ============================================================
        // [Phase 2] 핀 고정 및 높이 확장 (Pinning & Height Expansion)
        // 너비가 100%(progress >= 1)가 된 순간 핀 고정 시작
        // ============================================================
        
        // 1. 핀 고정 시작 조건 (너비 확장이 끝났고, 아직 핀 안됨)
        if (!isPinned && widthProgress >= 1) {
            isPinned = true;
            pinScrollY = scrollY; // 현재 스크롤 위치 저장
            
            // 현재 화면 하단에서의 거리 계산 (자연스러운 고정을 위해)
            const cardRect = card.getBoundingClientRect();
            initialBottomOffset = windowHeight - cardRect.bottom;
            
            // Placeholder 활성화 (공간 차지)
            placeholder.style.display = 'block';
            placeholder.style.height = minHeight + 'px';
            
            // Fixed 상태로 변경
            card.classList.add('is-pinned');
            card.classList.remove('is-released');
            card.style.bottom = initialBottomOffset + 'px';
            
            // Lenis 리사이즈 (레이아웃 변경 알림)
            if (window.lenis) window.lenis.resize();
        }
        
        // 2. 핀 고정 상태에서의 동작 (높이 확장 및 텍스트 표시)
        if (isPinned) {
            const scrollDelta = scrollY - pinScrollY;
            
            // 뒤로 스크롤 했을 때 (Unpin)
            if (scrollDelta < 0) {
                isPinned = false;
                card.classList.remove('is-pinned');
                card.style.bottom = ''; // bottom 초기화
                card.style.height = minHeight + 'px'; // 높이 초기화
                
                placeholder.style.display = 'none';
                placeholder.style.height = '0px';
                
                // 텍스트 숨김
                lines.forEach((line, index) => {
                    if (index > 0) {
                        line.classList.remove('visible');
                        line.style.opacity = '0';
                        line.style.transform = 'translateY(30px)';
                    }
                });
                return; // 이번 프레임 종료 (다음 프레임에 너비 로직이 다시 적용됨)
            }

            // 높이 확장 진행률 계산
            const heightProgress = Math.min(1, Math.max(0, scrollDelta / expansionDistance));
            
            // 높이 및 위치 업데이트
            const currentHeight = minHeight + (maxHeight - minHeight) * heightProgress;
            const currentBottom = initialBottomOffset + (bottomOffset - initialBottomOffset) * heightProgress;
            
            card.style.height = currentHeight + 'px';
            card.style.bottom = currentBottom + 'px';
            placeholder.style.height = currentHeight + 'px'; // Placeholder도 같이 커져야 스크롤 영역 확보됨

            // 텍스트 애니메이션 (높이 확장에 맞춰 순차 등장)
            const textProgress = heightProgress;
            lines.forEach((line, index) => {
                if (index === 0) { // 첫 줄은 항상 표시
                    line.classList.add('visible');
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                    return;
                }
                
                // 순차적 등장 로직
                const lineStartProgress = (index - 1) * (0.7 / (totalLines - 1));
                const lineEndProgress = lineStartProgress + 0.25;
                
                if (textProgress >= lineStartProgress) {
                    const lineProgress = Math.min(1, 
                        (textProgress - lineStartProgress) / (lineEndProgress - lineStartProgress)
                    );
                    const easedLineProgress = 1 - Math.pow(1 - lineProgress, 2); // Easing
                    
                    line.classList.add('visible');
                    line.style.opacity = String(easedLineProgress);
                    line.style.transform = `translateY(${(1 - easedLineProgress) * 30}px)`;
                }
            });

            // 3. 완료 처리 (높이 확장 끝)
            if (heightProgress >= 0.995) {
                // 상태 확정
                philosophyComplete = true;
                
                card.style.height = maxHeight + 'px';
                card.style.width = maxWidth + '%'; // 너비 100% 확정
                card.style.bottom = '';
                
                card.classList.remove('is-pinned');
                card.classList.add('is-released'); // 다시 문서 흐름으로 복귀
                
                placeholder.style.display = 'none'; // Placeholder 제거
                placeholder.style.height = '0px';
                
                // 모든 텍스트 강제 표시
                lines.forEach(line => {
                    line.classList.add('visible');
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                });
                
                if (window.lenis) window.lenis.resize();
            }
        }
    };
    
    // RAF Loop
    const rafLoop = () => {
        if (philosophyComplete) {
            // 완료 후에도 너비가 줄어들지 않도록 안전장치
            card.style.width = maxWidth + '%';
            if (philosophyRafId) {
                cancelAnimationFrame(philosophyRafId);
                philosophyRafId = null;
            }
            return;
        }
        
        updateCardExpansion();
        philosophyRafId = requestAnimationFrame(rafLoop);
    };
    
    if (philosophyRafId) cancelAnimationFrame(philosophyRafId);
    philosophyRafId = requestAnimationFrame(rafLoop);
}

// Smooth Scroll Inertia (PC Only)
function setupSmoothScroll() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 1024
        || ('ontouchstart' in window);
    
    if (isMobile || typeof Lenis === 'undefined') return;
    
    // Destroy existing instance if any
    if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
    }
    
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wrapper: window,
        content: document.documentElement
    });
    
    let rafId;
    function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    
    window.lenis = lenis;
    window.lenisRafId = rafId;
}

// Reinitialize Lenis when view changes
function reinitLenis() {
    if (window.lenisRafId) {
        cancelAnimationFrame(window.lenisRafId);
    }
    if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
    }
    
    // Clean up philosophy RAF loop and state
    if (philosophyRafId) {
        cancelAnimationFrame(philosophyRafId);
        philosophyRafId = null;
    }
    philosophyComplete = false;
    isPinned = false;
    pinScrollY = 0;
    originalCardTop = 0;
    initialBottomOffset = 0;
    
    // Small delay to let DOM settle
    setTimeout(() => {
        setupSmoothScroll();
    }, 100);
}

// Run
init();
setupScrollEffects();
setupFadeInObserver();
setupSmoothScroll();