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
        if (visualH3) visualH3.classList.add('fade-in');
    }, 400);
    
    setTimeout(() => {
        if (visualP) visualP.classList.add('fade-up');
    }, 900);
    
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

    // 이전 슬라이더/인터랙션 정리
    cleanupValuesSlider();
    cleanupHorizontalScroll();
    cleanupDiagnosisScroll();
    cleanupTreatmentV2Scroll();
    
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
        // V3: 새로운 스크롤 구조 - 3개 섹션만 (Sub Hero, Slogan, Equipment)
        html = `
            <article class="diag-page">
                <!-- 수평 스크롤 영역: Sub Hero + Slogan -->
                <div class="diag-horizontal-area">
                    <div class="diag-viewport">
                        <div class="diag-track">
                            <!-- 섹션 1: Sub Hero -->
                            <section class="diag-panel diag-subhero">
                                <div class="diag-subhero-bg">
                                    <img src="${data.heroImg || 'images/diagnosis-hero.png'}" alt="${data.title}">
                                </div>
                                <div class="diag-subhero-overlay"></div>
                                <div class="diag-subhero-text">
                                    <h2>${data.title}</h2>
                                </div>
                                <div class="scroll-indicator scroll-indicator-horizontal" id="diag-indicator-subhero">
                                    <div class="scroll-indicator-circle">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                            <path d="M5 12h14M12 5l7 7-7 7"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="diag-subhero-curve">
                                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                                        <path d="M0,100 L0,40 Q360,100 720,50 Q1080,0 1440,60 L1440,100 Z" fill="var(--bg-color)"/>
                                    </svg>
                                </div>
                            </section>
                            
                            <!-- 섹션 2: Slogan (Text 01 + Text 02) -->
                            <section class="diag-panel diag-slogan">
                                <div class="diag-slogan-bg">
                                    <img src="images/diagnosis-slogan.png" alt="Slogan Background">
                                </div>
                                <div class="diag-slogan-overlay"></div>
                                <div class="diag-slogan-content">
                                    <div class="diag-slogan-text" data-slogan="1">
                                        <h3>정확한 진단이<br>완치의 시작입니다</h3>
                                        <p>통증의 근본 원인을 찾아내는 것,<br>그것이 진정한 치료의 첫걸음입니다.</p>
                                    </div>
                                    <div class="diag-slogan-text" data-slogan="2">
                                        <h3>최첨단 장비로<br>정밀하게 분석합니다</h3>
                                        <p>서울본재활의학과는 첨단 진단 장비에<br>아낌없이 투자합니다.</p>
                                    </div>
                                </div>
                                <div class="scroll-indicator scroll-indicator-vertical" id="diag-indicator-slogan">
                                    <div class="scroll-indicator-circle">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                            <path d="M12 5v14M5 12l7 7 7-7"/>
                                        </svg>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                
                <!-- 헤더 투명도 전환 감지용 센티넬 (슬로건과 Equipment 사이) -->
                <div class="equipment-header-trigger" id="equipment-header-trigger" aria-hidden="true"></div>
                
                <!-- 섹션 3: Equipment Narrative (Sticky Image + Scroll Text) -->
                <div class="equipment-narrative">
                    <div class="sticky-image-wrapper">
                        <div class="sticky-image" id="equipment-image">
                            <img src="${data.details[0].img}" alt="Equipment" class="active">
                            <img src="${data.details[1].img}" alt="Equipment">
                            <img src="${data.details[2].img}" alt="Equipment">
                            <img src="${data.details[3].img}" alt="Equipment">
                        </div>
                    </div>
                    <div class="equipment-steps">
                        <div class="equipment-step active" data-index="0">
                            <span class="equipment-number">01</span>
                            <h3 class="equipment-title">고해상도 디지털 X-ray</h3>
                            <p class="equipment-subtitle">High-Resolution Digital X-ray</p>
                            <p class="equipment-slogan">"뼈와 관절 상태를 확인하는 가장 기초적이고 필수적인 검사"</p>
                            <p class="equipment-desc">기존 필름 방식 대비 방사선 피폭량을 현저히 줄여 안전성을 높인 최신 디지털 X-ray 장비입니다. 촬영 즉시 고해상도의 선명한 영상을 획득하여 골절, 관절염, 척추 변형 등 골격계의 구조적인 이상 유무를 신속하고 정확하게 평가합니다.</p>
                        </div>
                        <div class="equipment-step" data-index="1">
                            <span class="equipment-number">02</span>
                            <h3 class="equipment-title">프리미엄 초음파 진단기</h3>
                            <p class="equipment-subtitle">Premium Musculoskeletal Ultrasound (3 Units)</p>
                            <p class="equipment-slogan">"진료실에서 대기 없이 즉시 확인하는 '의사의 제2의 눈'"</p>
                            <p class="equipment-desc">X-ray로는 확인이 어려운 근육, 힘줄, 인대, 신경 등 연부 조직의 손상과 염증을 정밀하게 관찰합니다. 저희 병원은 하이엔드급 초음파 장비를 총 3대 보유하여 각 진료실에 배치했습니다. 환자분들은 별도의 검사실 이동이나 대기 시간 없이, 진료 상담 도중 즉각적으로 아픈 부위를 초음파로 확인하고 설명을 들으실 수 있습니다. 또한 주사 치료 시 실시간 유도 영상으로 활용하여 정확한 치료를 돕습니다.</p>
                        </div>
                        <div class="equipment-step" data-index="2">
                            <span class="equipment-number">03</span>
                            <h3 class="equipment-title">C-arm (이동형 실시간 투시 영상 장비)</h3>
                            <p class="equipment-subtitle">C-arm Fluoroscopy with SELD Technology</p>
                            <p class="equipment-slogan">"정확도는 높이고 피폭은 최소화한, 안전한 비수술 치료의 핵심"</p>
                            <p class="equipment-desc">마치 우리 몸속을 실시간 동영상으로 보는 것과 같은 투시 장비입니다. 척추나 관절의 깊숙한 부위에 주사 치료나 시술을 시행할 때, 네비게이션처럼 바늘의 위치를 실시간으로 정확하게 안내하여 오차 없는 정밀한 치료를 가능하게 합니다.<br><br>안전 플러스: 최신 방사선 피폭 저감 장치인 SELD가 탑재되어 있어, 의료진과 환자분이 받는 불필요한 방사선 노출량을 획기적으로 줄여 더욱 안심하고 치료받으실 수 있습니다.</p>
                        </div>
                        <div class="equipment-step" data-index="3">
                            <span class="equipment-number">04</span>
                            <h3 class="equipment-title">최신 신경전도 및 근전도 검사 기기 (NCS/EMG)</h3>
                            <p class="equipment-subtitle">Nerve Conduction Study & Electromyography</p>
                            <p class="equipment-slogan">"눈에 보이지 않는 신경과 근육의 기능적 이상을 찾아내는 정밀 검사"</p>
                            <p class="equipment-desc">영상 검사(MRI, X-ray)만으로는 알 수 없는 신경의 기능적 상태를 전기적 신호를 통해 평가합니다. 손발 저림, 감각 이상, 근력 약화 등이 있을 때, 이것이 신경의 문제인지 근육 자체의 문제인지, 신경 손상이라면 그 위치와 심각도는 어느 정도인지를 명확하게 감별 진단합니다.<br>(예: 손목터널증후군, 목/허리 디스크로 인한 신경손상 등 진단)</p>
                        </div>
                    </div>
                </div>
            </article>
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
                    <img src="${data.sloganBg}" alt="${data.title} Hero">
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
            
            <div class="values-slides-wrapper">
                <div class="values-slides-container">
                    <div class="values-slide-progress">
                        ${data.details.map((_, i) => `<div class="progress-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`).join('')}
                    </div>
                    
                    <!-- 왼쪽: 제목 트랙 -->
                    <div class="values-left-track">
                        <div class="values-layer values-title-layer">
                            ${data.details.map((det, i) => `
                                <div class="values-layer-item${i === 0 ? ' active' : ''}" data-slide="${i}">
                                    <h3>${det.t.replace(/^\d+\.\s*/, '')}</h3>
                                    <div class="values-divider"></div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="values-layer values-subtitle-layer">
                            ${data.details.map((det, i) => {
                                const subtitleMatch = det.d.match(/<strong>\[([^\]]+)\]<\/strong>/);
                                const subtitle = subtitleMatch ? subtitleMatch[1] : '';
                                return `<span class="values-layer-item${i === 0 ? ' active' : ''}" data-slide="${i}">${subtitle}</span>`;
                            }).join('')}
                        </div>
                    </div>
                    
                    <!-- 중앙: 이미지 트랙 -->
                    <div class="values-image-track">
                        ${data.details.map((det, i) => `
                            <div class="values-image-item${i === 0 ? ' active' : ''}" data-index="${i}">
                                <img src="${det.img}" alt="${det.t}">
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- 오른쪽: 번호 + 포인트 트랙 -->
                    <div class="values-right-track">
                        <div class="values-layer values-num-layer">
                            ${data.details.map((_, i) => `
                                <span class="values-layer-item${i === 0 ? ' active' : ''}" data-slide="${i}">0${i + 1}</span>
                            `).join('')}
                        </div>
                        <div class="values-layer values-points-layer">
                            ${data.details.map((det, i) => {
                                const pointsHtml = det.d
                                    .replace(/<strong>\[[^\]]+\]<\/strong><br><br>/, '')
                                    .split(/<br><br>/)
                                    .filter(p => p.trim())
                                    .map(point => {
                                        const titleMatch = point.match(/<b>([^<]+)<\/b>/);
                                        const title = titleMatch ? titleMatch[1] : '';
                                        const desc = point.replace(/<b>[^<]+<\/b><br>/, '').trim();
                                        return `<div class="point-item"><h4>${title}</h4><p>${desc}</p></div>`;
                                    }).join('');
                                return `<div class="values-layer-item${i === 0 ? ' active' : ''}" data-slide="${i}">${pointsHtml}</div>`;
                            }).join('')}
                        </div>
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
        else if (id === 'treatment_v2') heroImagePath = 'images/treatment-hero.png';
        else if (id === 'contact') heroImagePath = 'images/contact-hero.png';
        else if (id === 'facilities') heroImagePath = 'images/treatment-hero.png';

        if (id === 'treatment_v2') {
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
                <section class="treatment-v2-slogan-section">
                    <div class="treatment-v2-slogan-bg">
                        <img src="images/treatment-intro-bg.jpg" alt="Background">
                    </div>
                    <div class="treatment-v2-slogan-container">
                        <div class="treatment-v2-slogan-group" data-group="1">
                            <h2 class="slogan-main slogan-line">${data.slogans[0].main}</h2>
                            <p class="slogan-sub slogan-line">${data.slogans[0].sub || ''}</p>
                            <p class="slogan-desc slogan-line">${data.slogans[0].desc}</p>
                        </div>
                        <div class="treatment-v2-slogan-group" data-group="2">
                            <h2 class="slogan-main">${data.slogans[1].main}</h2>
                            <p class="slogan-desc">${data.slogans[1].desc}</p>
                        </div>
                        <div class="treatment-v2-slogan-group treatment-v2-promises" data-group="3">
                            ${data.promises.map(p => `
                                <div class="promise-item">
                                    <h3 class="promise-title">${p.name} <span class="promise-en">${p.title}</span></h3>
                                    <p class="promise-desc">${p.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
                <section class="treatment-v2-grid-section">
                    <div class="modal-grid">
                        ${data.details.map(det => `
                            <div class="grid-item">
                                <div class="grid-img-wrapper"><img src="${det.img}" alt="${det.t}"></div>
                                <div class="grid-text-wrapper"><h4>${det.t}</h4><p>${det.d}</p></div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            `;
        } else if (id === 'treatment') {
            html = `
                <div class="treatment-sticky-wrapper">
                    <div class="sub-hero treatment-sub-hero-sticky" id="${id}-sub-hero">
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
                    <div class="treatment-content-overlap">
                        <section class="treatment-intro-section">
                            <div class="treatment-intro-bg">
                                <img src="images/treatment-intro-bg.jpg" alt="Background">
                            </div>
                            <div class="slogan-text-area">
                                <!-- 1번 그룹: 진단 철학 -->
                                <div class="slogan-group slogan-group-1">
                                    <h2 class="slogan-main">통증을 넘어, 근본적인 기능 회복을 위한<br>통합 치료 솔루션</h2>
                                    <p class="slogan-sub">재활의학과와 정형외과의 전문성을 더해, 통증의 일시적 완화가 아닌 근본적인 원인 해결을 목표로 합니다.</p>
                                    <p class="slogan-desc">대학병원급 최첨단 장비와 숙련된 노하우를 바탕으로, 환자 개개인의 상태에 최적화된 맞춤형 통합 치료 계획을 수립합니다.</p>
                                </div>
                                <!-- 2번 그룹: 병원의 약속 -->
                                <div class="slogan-group slogan-group-2">
                                    <h2 class="slogan-promise-main">서울본재활의학과의원이 지키는<br>3가지 약속</h2>
                                    <p class="slogan-promise-desc">우리는 회복이라는 결과 앞에서 어떤 효율과도 타협하지 않습니다.</p>
                                </div>
                                <!-- 3·4·5번 그룹: 개별 약속 -->
                                <div class="slogan-group slogan-group-345">
                                    <div class="promise-item">
                                        <h3 class="promise-title">엄격한 재료의 선정 <span class="promise-en">Strict Standard</span></h3>
                                        <p class="promise-desc">내 가족에게 쓸 수 있는 것만이 환자분에게도 허락됩니다. 우리는 임상적으로 검증된 최상의 재료만을 고집하며, 안전성과 효능에 대한 확신 없이는 절대 사용하지 않습니다.</p>
                                    </div>
                                    <div class="promise-item">
                                        <h3 class="promise-title">실시간 맞춤 처방 <span class="promise-en">Real-time Customization</span></h3>
                                        <p class="promise-desc">기계적인 루틴(Routine) 진료를 지양합니다. 매 내원 시 달라지는 신체 상태를 정밀하게 파악하여, 지금 당신에게 가장 필요한 최적의 배합으로 치료합니다.</p>
                                    </div>
                                    <div class="promise-item">
                                        <h3 class="promise-title">근본을 보는 통찰 <span class="promise-en">Insight for Cause</span></h3>
                                        <p class="promise-desc">통증은 몸이 보내는 신호일 뿐입니다. 단순한 불편함의 해소를 넘어, 불균형해진 신체 구조와 기능을 바로잡는 근본적인 치유를 지향합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="treatment-grid-section">
                            <div class="modal-grid">
                                ${data.details.map(det => `
                                    <div class="grid-item">
                                        <div class="grid-img-wrapper"><img src="${det.img}" alt="${det.t}"></div>
                                        <div class="grid-text-wrapper"><h4>${det.t}</h4><p>${det.d}</p></div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    </div>
                </div>
            `;
        } else {
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
    
    // 서브히어로 스크롤 효과 설정 (diagnosis 페이지 제외 - 별도 처리)
    if (id !== 'diagnosis') {
        setupSubHeroScrollEffect();
    }
    
    // Values 페이지 슬라이드 설정
    if (id === 'values') {
        setTimeout(() => {
            setupValuesSlider();
        }, 100);
    }
    
    // V3 Diagnosis 페이지 - 세로→가로 스크롤 치환
    if (id === 'diagnosis') {
        setTimeout(() => {
            setupDiagnosisScroll();
        }, 100);
    }
    
    // Treatment 페이지 인트로 줌인 효과 설정
    if (id === 'treatment') {
        setTimeout(() => {
            setupTreatmentIntroZoom();
        }, 100);
    }
    
    // Treatment V2 페이지 스크롤 효과 설정
    if (id === 'treatment_v2') {
        setTimeout(() => {
            setupTreatmentV2Scroll();
        }, 100);
    }
    
    // Close menu if open
    if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
    }
}

// Treatment 인트로 슬로건 애니메이션 (GSAP ScrollTrigger)
function setupTreatmentIntroZoom() {
    const introSection = document.querySelector('.treatment-intro-section');
    const subHeroSticky = document.querySelector('.treatment-sub-hero-sticky');
    if (!introSection) return;
    
    // GSAP 및 ScrollTrigger 확인
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    // 요소 선택
    const group1 = introSection.querySelector('.slogan-group-1');
    const group2 = introSection.querySelector('.slogan-group-2');
    const group345 = introSection.querySelector('.slogan-group-345');
    const bgImg = introSection.querySelector('.treatment-intro-bg img');
    
    if (!group1 || !group2 || !group345) return;
    
    const group1Main = group1.querySelector('.slogan-main');
    const group1Sub = group1.querySelector('.slogan-sub');
    const group1Desc = group1.querySelector('.slogan-desc');
    const group2Main = group2.querySelector('.slogan-promise-main');
    const group2Desc = group2.querySelector('.slogan-promise-desc');
    const promiseItems = group345.querySelectorAll('.promise-item');
    
    // 공통 이징
    const easeIn = 'power2.out';
    const easeOut = 'power2.in';
    
    // 메인 타임라인 생성
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: introSection,
            start: 'top top',
            end: '+=300%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onEnter: () => {
                document.body.classList.remove('sub-hero-passed');
                if (subHeroSticky) subHeroSticky.style.visibility = 'hidden';
            },
            onLeave: () => {
                document.body.classList.add('sub-hero-passed');
                if (subHeroSticky) subHeroSticky.style.visibility = 'hidden';
            },
            onEnterBack: () => {
                document.body.classList.remove('sub-hero-passed');
                if (subHeroSticky) subHeroSticky.style.visibility = 'hidden';
            },
            onLeaveBack: () => {
                if (subHeroSticky) subHeroSticky.style.visibility = 'visible';
            }
        }
    });
    
    // 배경 줌아웃
    tl.to(bgImg, {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out'
    }, 0);
    
    // STEP 2: 1번 그룹 등장 (우→좌 순차)
    tl.to(group1, { opacity: 1, duration: 0.01 }, 0);
    tl.to(group1Main, {
        opacity: 1,
        x: 0,
        duration: 0.12,
        ease: easeIn
    }, 0.02);
    tl.to(group1Sub, {
        opacity: 1,
        x: 0,
        duration: 0.12,
        ease: easeIn
    }, 0.06);
    tl.to(group1Desc, {
        opacity: 1,
        x: 0,
        duration: 0.12,
        ease: easeIn
    }, 0.10);
    
    // STEP 3: 1번 그룹 사라짐 (위로 이동 + 페이드아웃)
    tl.to([group1Main, group1Sub, group1Desc], {
        opacity: 0,
        y: -48,
        duration: 0.12,
        ease: easeOut
    }, 0.28);
    tl.to(group1, { opacity: 0, duration: 0.01 }, 0.40);
    
    // STEP 4: 2번 그룹 등장 (아래→위 교차)
    tl.to(group2, { opacity: 1, duration: 0.01 }, 0.32);
    tl.to(group2Main, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: easeIn
    }, 0.34);
    tl.to(group2Desc, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: easeIn
    }, 0.38);
    
    // STEP 5: 3·4·5 약속 등장 (순차 페이드업)
    tl.to(group345, { opacity: 1, duration: 0.01 }, 0.48);
    promiseItems.forEach((item, i) => {
        tl.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.10,
            ease: easeIn
        }, 0.50 + (i * 0.04));
    });
    
    // 2번 그룹 사라짐 (3·4·5 등장 시)
    tl.to([group2Main, group2Desc], {
        opacity: 0,
        y: -48,
        duration: 0.10,
        ease: easeOut
    }, 0.52);
    tl.to(group2, { opacity: 0, duration: 0.01 }, 0.62);
    
    // STEP 6: 체류 구간 (약속들이 완전히 보인 상태 유지) - 0.65 ~ 0.85
    // 이 구간에서는 아무 변화 없음
    
    // STEP 7: 고정 해제 전 페이드아웃
    tl.to(promiseItems, {
        opacity: 0,
        y: -24,
        duration: 0.10,
        stagger: 0.02,
        ease: easeOut
    }, 0.88);
    tl.to(group345, { opacity: 0, duration: 0.01 }, 0.98);
}

// Treatment V2 스크롤 효과 (순수 JS)
let treatmentV2ScrollHandler = null;

function setupTreatmentV2Scroll() {
    const sloganSection = document.querySelector('.treatment-v2-slogan-section');
    if (!sloganSection) return;
    
    const group1 = sloganSection.querySelector('.treatment-v2-slogan-group[data-group="1"]');
    const group2 = sloganSection.querySelector('.treatment-v2-slogan-group[data-group="2"]');
    const group3 = sloganSection.querySelector('.treatment-v2-slogan-group[data-group="3"]');
    
    if (!group1 || !group2 || !group3) return;
    
    const group1Lines = group1.querySelectorAll('.slogan-line');
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
        const sectionRect = sloganSection.getBoundingClientRect();
        const sectionHeight = sloganSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
        
        const sectionEntered = sectionRect.top <= 0;
        const sectionExited = sectionRect.bottom <= viewportHeight;
        
        if (sectionRect.bottom <= 0) {
            sloganSection.classList.add('zoom-active');
            group1.classList.remove('active', 'exit-up');
            group2.classList.remove('active', 'exit-up');
            group3.classList.add('active', 'released');
            group3.classList.remove('pinned');
            group1Lines.forEach(line => line.classList.add('visible'));
            document.body.classList.add('sub-hero-passed');
            return;
        }
        
        if (!sectionEntered) {
            sloganSection.classList.remove('zoom-active');
            group1.classList.remove('active', 'exit-up');
            group2.classList.remove('active', 'exit-up');
            group3.classList.remove('active');
            group1Lines.forEach(line => line.classList.remove('visible'));
            document.body.classList.remove('sub-hero-passed');
            return;
        }
        
        sloganSection.classList.add('zoom-active');
        
        const scrolled = -sectionRect.top;
        const scrollableDistance = sectionHeight - viewportHeight;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        
        if (direction === 'down') {
            if (progress < 0.35) {
                group1.classList.add('active');
                group1.classList.remove('exit-up');
                group2.classList.remove('active', 'exit-up');
                group3.classList.remove('active', 'pinned', 'released');
                
                const lineProgress = progress / 0.35;
                group1Lines.forEach((line, idx) => {
                    const threshold = idx / group1Lines.length;
                    line.classList.toggle('visible', lineProgress > threshold);
                });
            } else if (progress < 0.65) {
                group1.classList.remove('active');
                group1.classList.add('exit-up');
                group2.classList.add('active');
                group2.classList.remove('exit-up');
                group3.classList.remove('active', 'pinned', 'released', 'exit-left');
                group1Lines.forEach(line => line.classList.add('visible'));
            } else if (progress < 0.85) {
                group1.classList.remove('active', 'exit-up');
                group2.classList.remove('active');
                group2.classList.add('exit-up');
                group3.classList.add('active', 'pinned');
                group3.classList.remove('released', 'exit-left');
            } else {
                group1.classList.remove('active', 'exit-up');
                group2.classList.remove('active', 'exit-up');
                group3.classList.add('active', 'released');
                group3.classList.remove('pinned', 'exit-left');
            }
        } else {
            if (progress >= 0.85) {
                group3.classList.add('active', 'released');
                group3.classList.remove('pinned', 'exit-left');
            } else if (progress >= 0.65) {
                group2.classList.add('exit-up');
                group2.classList.remove('active');
                group3.classList.add('active', 'pinned');
                group3.classList.remove('released', 'exit-left');
            } else if (progress >= 0.35) {
                group2.classList.add('active');
                group2.classList.remove('exit-up');
                group1.classList.add('exit-up');
                group1.classList.remove('active');
                group3.classList.add('exit-left');
                group3.classList.remove('pinned', 'released');
            } else if (progress > 0) {
                group1.classList.add('active');
                group1.classList.remove('exit-up');
                group2.classList.remove('active', 'exit-up');
                group3.classList.remove('active', 'pinned', 'released', 'exit-left');
                
                const lineProgress = progress / 0.35;
                group1Lines.forEach((line, idx) => {
                    const threshold = idx / group1Lines.length;
                    line.classList.toggle('visible', lineProgress > threshold);
                });
            } else {
                group1.classList.remove('active', 'exit-up');
                group3.classList.remove('active', 'pinned', 'released', 'exit-left');
                group1Lines.forEach(line => line.classList.remove('visible'));
            }
        }
        
        document.body.classList.remove('sub-hero-passed');
    };
    
    treatmentV2ScrollHandler = handleScroll;
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
}

function cleanupTreatmentV2Scroll() {
    if (treatmentV2ScrollHandler) {
        window.removeEventListener('scroll', treatmentV2ScrollHandler);
        treatmentV2ScrollHandler = null;
    }
    
    const sloganSection = document.querySelector('.treatment-v2-slogan-section');
    if (sloganSection) {
        sloganSection.classList.remove('zoom-active');
    }
    
    const groups = document.querySelectorAll('.treatment-v2-slogan-group');
    groups.forEach(g => {
        g.classList.remove('active', 'exit-up', 'pinned', 'released', 'exit-left');
    });
    
    const lines = document.querySelectorAll('.treatment-v2-slogan-group .slogan-line');
    lines.forEach(line => line.classList.remove('visible'));
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
    cleanupHorizontalScroll();
    cleanupDiagnosisScroll();
    cleanupTreatmentV2Scroll();
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
    // Blanc de Vie style: toggleActions equivalent (play on enter, reverse on leave)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    };
    
    // Observer with toggleActions: play on enter, reverse on leave (scroll up)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('reverse');
            } else {
                // Only reverse if element is below viewport (scrolling up)
                const rect = entry.target.getBoundingClientRect();
                if (rect.top > window.innerHeight * 0.5) {
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('reverse');
                }
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
                            // Blanc de Vie style: stagger 0.2s
                            el.style.transitionDelay = (index * 0.2) + 's';
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

// GSAP ScrollTrigger 초기화
function setupSmoothScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);
}

// Values Page - ScrollTrigger Slider
let valuesScrollTrigger = null;

function setupValuesSlider() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    const wrapper = document.querySelector('.values-slides-wrapper');
    const container = document.querySelector('.values-slides-container');
    const imageItems = document.querySelectorAll('.values-image-item');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    // 레이어별 아이템 선택
    const numItems = document.querySelectorAll('.values-num-layer .values-layer-item');
    const titleItems = document.querySelectorAll('.values-title-layer .values-layer-item');
    const subtitleItems = document.querySelectorAll('.values-subtitle-layer .values-layer-item');
    const pointsItems = document.querySelectorAll('.values-points-layer .values-layer-item');
    
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
        
        // 텍스트 레이어별 fade 처리
        [numItems, titleItems, subtitleItems, pointsItems].forEach(layerItems => {
            layerItems.forEach((item, i) => {
                item.classList.toggle('active', i === newIndex);
            });
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
            
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        });
    });
}

function cleanupValuesSlider() {
    if (valuesScrollTrigger) {
        valuesScrollTrigger.kill();
        valuesScrollTrigger = null;
    }
}

// V3: Diagnosis 페이지 스크롤 시스템
// 원칙: 세로 스크롤 → 가로 이동 치환, 진행도 기반 애니메이션
let diagScrollTrigger = null;

function setupDiagnosisScroll() {
    const area = document.querySelector('.diag-horizontal-area');
    const viewport = document.querySelector('.diag-viewport');
    const track = document.querySelector('.diag-track');
    const sloganText1 = document.querySelector('.diag-slogan-text[data-slogan="1"]');
    const sloganText2 = document.querySelector('.diag-slogan-text[data-slogan="2"]');
    const sloganPanel = document.querySelector('.diag-slogan');
    const indicatorSubhero = document.getElementById('diag-indicator-subhero');
    const indicatorSlogan = document.getElementById('diag-indicator-slogan');
    
    if (!area || !viewport || !track) {
        console.warn('Diagnosis V3: Required elements not found');
        return;
    }
    
    // 모바일에서는 수평 스크롤 비활성화
    if (window.innerWidth <= 768) {
        track.style.transform = 'none';
        if (sloganText1) sloganText1.classList.add('active');
        return;
    }
    
    // GSAP ScrollTrigger 확인
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    // 기존 트리거 정리
    if (diagScrollTrigger) {
        diagScrollTrigger.kill();
        diagScrollTrigger = null;
    }
    
    // 스크롤 구간 계산
    // 전체 높이 450vh 중:
    // - 0~50vh (0-11%): Sub Hero 고정 구간
    // - 50~200vh (11-44%): 가로 이동 구간 (Sub Hero → Slogan)
    // - 200~300vh (44-67%): Slogan Text 01 표시
    // - 300~400vh (67-89%): Slogan Text 02 표시
    // - 400~450vh (89-100%): 세로 스크롤 전환 구간
    
    const totalScrollHeight = area.offsetHeight - window.innerHeight;
    
    // Easing 함수
    function easeInOutCubic(t) {
        return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // 스크롤 구간 정의 (viewport height 기반 동적 계산)
    // 전체 스크롤 거리 = area.offsetHeight - window.innerHeight
    // 구간 비율:
    // - 0~10%: Sub Hero 고정
    // - 10~40%: 가로 이동 (Sub Hero → Slogan)
    // - 40~60%: Slogan Text 01
    // - 60~85%: Slogan Text 02
    // - 85~100%: 세로 스크롤 전환 (Text 02 유지)
    
    const PHASE = {
        SUBHERO_END: 0.10,      // Sub Hero 고정 끝
        SLIDE_END: 0.40,        // 가로 이동 끝
        TEXT1_END: 0.60,        // Text 01 끝
        TEXT2_END: 0.85,        // Text 02 끝 (이후 세로 전환, 헤더 투명도 변경)
        // Slogan 85% 진입 = 가로 이동 85% 지점
        // 0.10 + (0.40 - 0.10) * 0.85 = 0.10 + 0.255 = 0.355
        SLOGAN_APPEAR: 0.355
    };
    
    // 메인 트랙 이동 애니메이션
    diagScrollTrigger = ScrollTrigger.create({
        trigger: area,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
            const progress = self.progress;
            
            // 가로 이동 계산
            let translateX = 0;
            if (progress < PHASE.SUBHERO_END) {
                translateX = 0;
            } else if (progress < PHASE.SLIDE_END) {
                const moveProgress = (progress - PHASE.SUBHERO_END) / (PHASE.SLIDE_END - PHASE.SUBHERO_END);
                translateX = -50 * easeInOutCubic(moveProgress);
            } else {
                translateX = -50;
            }
            
            track.style.transform = `translateX(${translateX}%)`;
            
            // Slogan Text 상호 배타적 토글 (항상 하나만 active)
            if (sloganText1 && sloganText2) {
                // 기본: 둘 다 비활성화
                let showText1 = false;
                let showText2 = false;
                
                if (progress >= PHASE.SLOGAN_APPEAR && progress < PHASE.TEXT1_END) {
                    showText1 = true;
                } else if (progress >= PHASE.TEXT1_END && progress < 1.0) {
                    showText2 = true;
                }
                
                // 클래스 토글 (상호 배타)
                if (showText1) {
                    sloganText1.classList.add('active');
                    sloganText2.classList.remove('active');
                } else if (showText2) {
                    sloganText1.classList.remove('active');
                    sloganText2.classList.add('active');
                } else {
                    sloganText1.classList.remove('active');
                    sloganText2.classList.remove('active');
                }
            }
            
            // 슬로건 배경 zoom-out 효과 (슬로건 진입 시)
            if (sloganPanel) {
                if (progress >= PHASE.SLOGAN_APPEAR) {
                    sloganPanel.classList.add('zoom-out');
                } else {
                    sloganPanel.classList.remove('zoom-out');
                }
            }
            
            // 헤더 상태는 Equipment 섹션이 헤더에 닿을 때 변경 (별도 핸들러에서 처리)
            // 여기서는 제거 - setupEquipmentNarrative에서 처리
            
            // 스크롤 인디케이터 제어
            // Sub Hero 인디케이터: 슬로건 진입 전까지 표시
            if (indicatorSubhero) {
                if (progress < PHASE.SLOGAN_APPEAR) {
                    indicatorSubhero.classList.remove('hidden');
                } else {
                    indicatorSubhero.classList.add('hidden');
                }
            }
            
            // Slogan 인디케이터: 슬로건 진입 후부터 TEXT2_END까지 표시
            if (indicatorSlogan) {
                if (progress >= PHASE.SLOGAN_APPEAR && progress < PHASE.TEXT2_END) {
                    indicatorSlogan.classList.add('visible');
                } else {
                    indicatorSlogan.classList.remove('visible');
                }
            }
        }
    });
    
    // Equipment Narrative 스크롤 효과 설정
    setupEquipmentNarrative();
}

function cleanupDiagnosisScroll() {
    if (diagScrollTrigger) {
        diagScrollTrigger.kill();
        diagScrollTrigger = null;
    }
    
    // Transform 초기화
    const track = document.querySelector('.diag-track');
    if (track) {
        track.style.transform = '';
    }
    
    // Slogan 텍스트 초기화
    const sloganTexts = document.querySelectorAll('.diag-slogan-text');
    sloganTexts.forEach(el => el.classList.remove('active'));
    
    // Slogan zoom-out 초기화
    const sloganPanel = document.querySelector('.diag-slogan');
    if (sloganPanel) sloganPanel.classList.remove('zoom-out');
    
    // Equipment 핸들러 정리
    if (equipmentScrollHandler) {
        window.removeEventListener('scroll', equipmentScrollHandler);
        equipmentScrollHandler = null;
    }
    
    // Equipment 헤더 observer 정리
    cleanupEquipmentHeaderObserver();
    
    // 스크롤 인디케이터 초기화
    const indicatorSubhero = document.getElementById('diag-indicator-subhero');
    const indicatorSlogan = document.getElementById('diag-indicator-slogan');
    if (indicatorSubhero) indicatorSubhero.classList.remove('hidden');
    if (indicatorSlogan) indicatorSlogan.classList.remove('visible');
    
    // 헤더 상태 초기화
    document.body.classList.remove('sub-hero-passed');
}

// Equipment Narrative (Sticky Image + Scroll Text)
let equipmentScrollHandler = null;

// IntersectionObserver for header trigger
let equipmentHeaderObserver = null;

function setupEquipmentNarrative() {
    const steps = document.querySelectorAll('.equipment-step');
    const images = document.querySelectorAll('.sticky-image img');
    const stickyImage = document.querySelector('.sticky-image');
    const header = document.getElementById('global-header');
    
    if (steps.length === 0 || images.length === 0) return;
    
    // IntersectionObserver로 헤더 투명도 전환
    // 동적 센티넬 시스템 사용
    setupEquipmentHeaderObserver();
    
    function handleEquipmentScroll() {
        const viewportMiddle = window.innerHeight / 2;
        
        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            
            // Check if step is in the middle of the viewport
            if (rect.top < viewportMiddle && rect.bottom > viewportMiddle) {
                // Activate this step
                steps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');
                
                // Switch image
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });
            }
        });
    }
    
    // Cleanup existing handlers
    if (equipmentScrollHandler) {
        window.removeEventListener('scroll', equipmentScrollHandler);
    }
    
    equipmentScrollHandler = handleEquipmentScroll;
    window.addEventListener('scroll', handleEquipmentScroll, { passive: true });
    
    // Initial state
    handleEquipmentScroll();
}

// Equipment 섹션 헤더 전환용 동적 센티넬 시스템
let equipmentSentinel = null;
let equipmentResizeObserver = null;

function createEquipmentHeaderSentinel() {
    const narrative = document.querySelector('.equipment-narrative');
    const stickyImage = document.querySelector('.sticky-image img.active') || document.querySelector('.sticky-image img');
    const firstStep = document.querySelector('.equipment-step');
    const header = document.getElementById('global-header');
    
    if (!narrative || !header) return null;
    
    // 기존 센티넬 제거
    if (equipmentSentinel) {
        equipmentSentinel.remove();
        equipmentSentinel = null;
    }
    
    // 첫 번째 보이는 컨텐츠의 위치 계산
    // narrative의 padding-top을 기준으로 함
    const narrativeStyle = getComputedStyle(narrative);
    const narrativePaddingTop = parseFloat(narrativeStyle.paddingTop) || 100;
    
    // 센티넬 생성 - narrative 내부 첫 번째 컨텐츠 위치에 배치
    equipmentSentinel = document.createElement('div');
    equipmentSentinel.id = 'equipment-content-sentinel';
    equipmentSentinel.style.cssText = `
        position: absolute;
        top: ${narrativePaddingTop}px;
        left: 0;
        width: 100%;
        height: 1px;
        pointer-events: none;
    `;
    
    // narrative를 relative로 만들어 센티넬 위치 기준 설정
    narrative.style.position = 'relative';
    narrative.insertBefore(equipmentSentinel, narrative.firstChild);
    
    return equipmentSentinel;
}

function setupEquipmentHeaderObserver() {
    // 기존 observer 정리
    if (equipmentHeaderObserver) {
        equipmentHeaderObserver.disconnect();
        equipmentHeaderObserver = null;
    }
    
    if (equipmentResizeObserver) {
        equipmentResizeObserver.disconnect();
        equipmentResizeObserver = null;
    }
    
    const header = document.getElementById('global-header');
    if (!header) return;
    
    // 센티넬 생성
    const sentinel = createEquipmentHeaderSentinel();
    if (!sentinel) return;
    
    // 헤더 높이 (동적으로 계산)
    const headerHeight = header.offsetHeight || 70;
    
    // IntersectionObserver: 센티넬이 헤더 영역에 진입할 때 감지
    // rootMargin의 top을 negative로 설정하여 viewport 상단에서 headerHeight 만큼 안쪽으로 축소
    equipmentHeaderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // isIntersecting이 false가 되면 = 센티넬이 rootMargin 영역(헤더 아래)을 벗어남
            // = 센티넬이 헤더 높이보다 위로 올라감 = 컨텐츠가 헤더와 겹침
            if (!entry.isIntersecting && entry.boundingClientRect.top < headerHeight) {
                document.body.classList.add('sub-hero-passed');
            } else if (entry.isIntersecting || entry.boundingClientRect.top >= headerHeight) {
                document.body.classList.remove('sub-hero-passed');
            }
        });
    }, {
        root: null,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: [0]
    });
    
    equipmentHeaderObserver.observe(sentinel);
    
    // 리사이즈 시 센티넬 위치 재계산
    equipmentResizeObserver = new ResizeObserver(() => {
        const newSentinel = createEquipmentHeaderSentinel();
        if (newSentinel && equipmentHeaderObserver) {
            equipmentHeaderObserver.disconnect();
            const newHeaderHeight = header.offsetHeight || 70;
            
            equipmentHeaderObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting && entry.boundingClientRect.top < newHeaderHeight) {
                        document.body.classList.add('sub-hero-passed');
                    } else if (entry.isIntersecting || entry.boundingClientRect.top >= newHeaderHeight) {
                        document.body.classList.remove('sub-hero-passed');
                    }
                });
            }, {
                root: null,
                rootMargin: `-${newHeaderHeight}px 0px 0px 0px`,
                threshold: [0]
            });
            
            equipmentHeaderObserver.observe(newSentinel);
        }
    });
    
    equipmentResizeObserver.observe(document.body);
}

function cleanupEquipmentHeaderObserver() {
    if (equipmentHeaderObserver) {
        equipmentHeaderObserver.disconnect();
        equipmentHeaderObserver = null;
    }
    if (equipmentResizeObserver) {
        equipmentResizeObserver.disconnect();
        equipmentResizeObserver = null;
    }
    if (equipmentSentinel) {
        equipmentSentinel.remove();
        equipmentSentinel = null;
    }
}

// Diagnosis page header observer - switch header state when entering vertical scroll
let diagnosisHeaderObserver = null;

function setupDiagnosisHeaderObserver() {
    // 더 이상 사용하지 않음 - setupEquipmentHeaderObserver로 대체
    if (diagnosisHeaderObserver) {
        diagnosisHeaderObserver.disconnect();
        diagnosisHeaderObserver = null;
    }
}

function cleanupDiagnosisHeaderObserver() {
    if (diagnosisHeaderObserver) {
        diagnosisHeaderObserver.disconnect();
        diagnosisHeaderObserver = null;
    }
}

function cleanupHorizontalScroll() {
    if (equipmentScrollHandler) {
        window.removeEventListener('scroll', equipmentScrollHandler);
        equipmentScrollHandler = null;
    }
    
    cleanupDiagnosisHeaderObserver();
}

// Run
init();
setupScrollEffects();
setupFadeInObserver();
setupSmoothScroll();