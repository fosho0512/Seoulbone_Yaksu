/* [SEOUL BONE REHABILITATION MEDICINE] 
   Script - Logic Only
*/

// [1] Element Selectors
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

// [2] Initialization
function init() {
    setupBanner(); 
    setupEventListeners(); 
}

// [3] Banner Setup Logic
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

// [4] Event Listeners
function setupEventListeners() {
    if(elems.enterBtn) elems.enterBtn.addEventListener('click', enterSite);
    
    // [수정됨] 로고 클릭 시 인트로가 아닌 메인 화면 리셋으로 변경
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
        
        // 메인 비주얼 기본값
        elems.visualBg.style.backgroundImage = `url('images/main-visual.jpg')`;
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeAll();
    });
}

// [5] Logic Functions
function enterSite() {
    elems.introPage.classList.add('hidden');
    document.body.classList.add('site-entered');
    setTimeout(showBanner, 1500);
}

// [NEW] 메인 화면 리셋 함수 (로고 클릭 시 실행)
function resetToMain() {
    // 1. 모든 팝업/메뉴 닫기
    closeAll(); 
    
    // 2. 배경 이미지를 초기 메인 이미지로 변경
    elems.visualBg.style.backgroundImage = `url('images/main-visual.jpg')`;

    // 3. 메뉴 활성화 표시 제거
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

    const html = `
        <div class="modal-layout-top">
            <div class="modal-text-group">
                <h2>${data.title}</h2>
                <div class="divider"></div>
                <p class="description">${data.desc}</p>
            </div>
            <div class="modal-image-group">
                <img src="${data.modalImg}" alt="${data.title}">
            </div>
        </div>
        
        <div class="modal-grid">
            ${data.details.map(det => `
                <div class="grid-item">
                    <div class="grid-img-wrapper">
                        <img src="${det.img}" alt="${det.t}">
                    </div>
                    <div class="grid-text-wrapper">
                        <h4>${det.t}</h4>
                        <p>${det.d}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
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