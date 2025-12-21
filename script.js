/* [SEOUL BONE REHABILITATION MEDICINE] Script */

// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 800);
        }, 2000);
    }
});

const elems = {
    introPage: document.getElementById('intro-page'),
    enterBtn: document.getElementById('enter-btn'),
    menuToggle: document.getElementById('menu-toggle'),
    menuLabel: document.querySelector('#menu-toggle .label'),
    brandLogo: document.getElementById('brand-logo'),
    contactBtn: document.getElementById('btn-contact'),
    contactModal: document.getElementById('contact-modal'),
    closeContactBtn: document.getElementById('close-contact'),
    detailModal: document.getElementById('detail-modal'),
    detailBody: document.getElementById('modal-body'),
    closeDetailBtn: document.getElementById('close-detail'),
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
    if(elems.closeDetailBtn) elems.closeDetailBtn.addEventListener('click', closeDetailModal);
    if(elems.closeBannerBtn) elems.closeBannerBtn.addEventListener('click', closeBanner);

    if(elems.menuItems) {
        elems.menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const imgUrl = item.dataset.img;
                elems.visualBg.style.backgroundImage = `url(${imgUrl})`;
                elems.menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
            item.addEventListener('click', () => {
                openDetailModal(item.dataset.id);
            });
        });
        elems.visualBg.style.backgroundImage = `url('images/main-visual.jpg')`;
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeAll();
    });
}

function enterSite() {
    elems.introPage.classList.add('hidden');
    document.body.classList.add('site-entered');
    setTimeout(showBanner, 1500);
}

function resetToMain() {
    closeAll(); 
    elems.visualBg.style.backgroundImage = `url('images/main-visual.jpg')`;
    if(elems.menuItems) {
        elems.menuItems.forEach(i => i.classList.remove('active'));
    }
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

function openDetailModal(id) {
    const data = siteData.content[id];
    if (!data) return;

    // Reset Content & Scroll
    elems.detailBody.innerHTML = "";
    if(elems.detailModal.querySelector('.modal-content')) {
        elems.detailModal.querySelector('.modal-content').scrollTop = 0;
    }

    let html = '';

    if (id === 'staff') {
        const splitIdx = 2; 
        const leftBio = data.bio.slice(0, splitIdx);
        const rightBio = data.bio.slice(splitIdx);

        html = `
            <div class="staff-top-image-full">
                <img src="${data.modalImg}" alt="${data.name}">
            </div>
            <div class="staff-bio-2col-container">
                <div class="bio-column left">
                    <div class="staff-header-simple">
                        <h2>${data.name} <span class="position">${data.position}</span></h2>
                        <ul class="titles-list-simple">
                            ${data.titles.map(t => `<li>${t}</li>`).join('')}
                        </ul>
                    </div>
                    ${leftBio.map(group => `
                        <div class="bio-group">
                            <h4>${group.category}</h4>
                            <ul>${group.items.map(item => `<li>${item}</li>`).join('')}</ul>
                        </div>
                    `).join('')}
                </div>
                <div class="bio-column right">
                    <div class="staff-header-spacer"></div>
                    ${rightBio.map(group => `
                        <div class="bio-group">
                            <h4>${group.category}</h4>
                            <ul>${group.items.map(item => `<li>${item}</li>`).join('')}</ul>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="staff-bottom-quote">
                <h3>${data.bottomQuote.main}</h3>
                <p>${data.bottomQuote.sub}</p>
                <div class="signature-area">
                    <img src="${data.signatureImg}" alt="Signature" onerror="this.style.display='none';">
                    <span class="sign-text">대표원장 장 용 준</span>
                </div>
            </div>
        `;
    } 
    else if (id === 'diagnosis') {
        html = `
            <div class="modal-layout-top">
                <div class="modal-text-group">
                    <h2>${data.title}</h2>
                    <div class="divider"></div>
                    <p class="description">${data.desc}</p>
                </div>
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
        `;
    }
    else if (id === 'prp') {
        html = `
            <div class="prp-hero">
                <div class="prp-hero-image">
                    <img src="${data.modalImg}" alt="${data.title}">
                </div>
                <div class="prp-hero-text">
                    <h2>${data.title}</h2>
                    <div class="divider"></div>
                    <p class="description">${data.desc}</p>
                </div>
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
        `;
    }
    else {
        const mediaHtml = data.mapEmbed 
            ? `<div class="map-container">${data.mapEmbed}</div>` 
            : `<img src="${data.modalImg}" alt="${data.title}">`;

        html = `
            <div class="modal-layout-top">
                <div class="modal-text-group">
                    <h2>${data.title}</h2>
                    <div class="divider"></div>
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
        `;
    }

    elems.detailBody.innerHTML = html;
    elems.detailModal.classList.add('open');
}

function closeDetailModal() {
    elems.detailModal.classList.remove('open');
}

function closeAll() {
    closeDetailModal();
    if(elems.contactModal) elems.contactModal.classList.remove('open');
    if (document.body.classList.contains('menu-open')) {
        toggleMenu();
    }
}

// Run
init();