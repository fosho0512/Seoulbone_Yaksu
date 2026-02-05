/* [SEOUL BONE PAIN CLINIC] Common Script */

let lenis = null;

const commonElems = {
    menuToggle: null,
    menuLabel: null,
    brandLogo: null,
    nonInsuranceBtn: null,
    nonInsuranceModal: null
};

function initCommon() {
    commonElems.menuToggle = document.getElementById('menu-toggle');
    commonElems.menuLabel = document.querySelector('#menu-toggle .label');
    commonElems.brandLogo = document.getElementById('brand-logo');
    commonElems.nonInsuranceBtn = document.getElementById('btn-non-insurance');
    commonElems.nonInsuranceModal = document.getElementById('non-insurance-modal');
    
    initLenis();
    setupCommonEventListeners();
    setupScrollProgress();
}

function initLenis() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile || typeof Lenis === 'undefined') return;
    
    lenis = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false
    });
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    } else {
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
    
    window.lenis = lenis;
}

function setupCommonEventListeners() {
    if(commonElems.menuToggle) commonElems.menuToggle.addEventListener('click', toggleMenu);
    
    if(commonElems.nonInsuranceBtn && commonElems.nonInsuranceModal) {
        commonElems.nonInsuranceBtn.addEventListener('click', () => commonElems.nonInsuranceModal.classList.add('open'));
    }
    const closeNonInsuranceBtn = document.querySelector('.close-non-insurance');
    if(closeNonInsuranceBtn && commonElems.nonInsuranceModal) {
        closeNonInsuranceBtn.addEventListener('click', () => commonElems.nonInsuranceModal.classList.remove('open'));
    }
    if(commonElems.nonInsuranceModal) {
        commonElems.nonInsuranceModal.addEventListener('click', (e) => {
            if(e.target === commonElems.nonInsuranceModal) commonElems.nonInsuranceModal.classList.remove('open');
        });
    }
    
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
    if(commonElems.nonInsuranceModal) commonElems.nonInsuranceModal.classList.remove('open');
    if(commonElems.menuLabel) commonElems.menuLabel.textContent = "MENU";
}

function setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    function updateProgress() {
        const scrollTop = window.lenis ? window.lenis.scroll : window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    }
    
    if (window.lenis) {
        window.lenis.on('scroll', updateProgress);
    } else {
        window.addEventListener('scroll', updateProgress);
    }
    
    updateProgress();
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

document.addEventListener('DOMContentLoaded', initCommon);
