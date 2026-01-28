/* [SEOUL BONE PAIN CLINIC] Common Script */

const commonElems = {
    menuToggle: null,
    menuLabel: null,
    brandLogo: null,
    contactBtn: null,
    contactModal: null,
    closeContactBtn: null
};

function initCommon() {
    commonElems.menuToggle = document.getElementById('menu-toggle');
    commonElems.menuLabel = document.querySelector('#menu-toggle .label');
    commonElems.brandLogo = document.getElementById('brand-logo');
    commonElems.contactBtn = document.getElementById('btn-contact');
    commonElems.contactModal = document.getElementById('contact-modal');
    commonElems.closeContactBtn = document.getElementById('close-contact');
    
    setupCommonEventListeners();
    setupScrollProgress();
}

function setupCommonEventListeners() {
    if(commonElems.menuToggle) commonElems.menuToggle.addEventListener('click', toggleMenu);
    if(commonElems.contactBtn) commonElems.contactBtn.addEventListener('click', () => commonElems.contactModal.classList.add('open'));
    if(commonElems.closeContactBtn) commonElems.closeContactBtn.addEventListener('click', () => commonElems.contactModal.classList.remove('open'));
    
    const closeDrawerBtn = document.getElementById('close-drawer');
    if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeAll();
    });
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    const isOpen = document.body.classList.contains('menu-open');
    if(commonElems.menuLabel) commonElems.menuLabel.textContent = isOpen ? "CLOSE" : "MENU";
}

function closeAll() {
    document.body.classList.remove('menu-open');
    if(commonElems.contactModal) commonElems.contactModal.classList.remove('open');
    if(commonElems.menuLabel) commonElems.menuLabel.textContent = "MENU";
}

function setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
}

function setupSubHeroScrollEffect() {
    const subHero = document.querySelector('.sub-hero');
    if (!subHero) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                document.body.classList.add('sub-hero-passed');
            } else if (entry.isIntersecting) {
                document.body.classList.remove('sub-hero-passed');
            }
        });
    }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });
    
    observer.observe(subHero);
}

function getCommonHeaderHTML() {
    return `
    <header id="global-header">
        <div id="scroll-progress" class="scroll-progress"></div>
        <div class="header-left">
            <button type="button" id="menu-toggle" class="menu-toggle-btn">
                <div class="lines"><span></span><span></span><span></span></div>
            </button>
            <a href="index.html" class="brand" id="brand-logo">SEOUL BONE<br><span class="loc">PAIN CLINIC</span></a>
        </div>
        <div class="header-right">
            <button type="button" id="btn-contact" class="util-btn">Contact Us</button>
            <a href="https://booking.naver.com/" target="_blank" class="util-btn highlight">Reservation</a>
        </div>
    </header>
    `;
}

function getDrawerMenuHTML(activePage) {
    const menuItems = [
        { id: 'staff', num: '01', label: 'Medical Staff', href: '../staff/' },
        { id: 'values', num: '02', label: 'Our Values', href: '../values/' },
        { id: 'diagnosis', num: '03', label: 'Diagnostics', href: '../diagnosis/' },
        { id: 'treatment', num: '04', label: 'Treatments', href: '../treatment/' },
        { id: 'prp', num: '05', label: 'Cell Therapy(PRP)', href: '../prp/' },
        { id: 'contact', num: '06', label: 'Visit Us', href: '../contact/' }
    ];
    
    return `
    <div id="drawer-menu" class="drawer-menu">
        <button type="button" id="close-drawer" class="close-drawer-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
        <nav class="chenot-menu">
            <ul id="menu-list">
                ${menuItems.map(item => `
                    <li class="menu-item${activePage === item.id ? ' active' : ''}">
                        <a href="${item.href}">
                            <span class="num">${item.num}</span><span class="label">${item.label}</span><span class="arrow">→</span>
                        </a>
                    </li>
                `).join('')}
            </ul>
        </nav>
    </div>
    `;
}

function getContactModalHTML() {
    return `
    <div id="contact-modal" class="simple-modal">
        <div class="simple-modal-content">
            <button type="button" id="close-contact" class="close-simple-btn">✕</button>
            <h2>Contact Us</h2>
            <div class="info-group">
                <p class="label">Address</p>
                <p>서울 중구 다산로 123, 약수빌딩 4층<br>(약수역 X번 출구 앞)</p>
            </div>
            <div class="info-group">
                <p class="label">Phone</p>
                <p>02-1234-5678</p>
            </div>
            <div class="map-area">
                <div class="map-placeholder">
                    <i class="fas fa-map-marker-alt"></i> NAVER MAP AREA
                </div>
            </div>
        </div>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', initCommon);
