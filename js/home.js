/* [SEOUL BONE] Home Page Script - Extends common.js */

const homeElems = {
    introOverlay: document.getElementById('intro-overlay'),
    enterBtn: document.getElementById('enter-btn'),
    promoBanner: document.getElementById('promo-banner'),
    closeBannerBtn: document.getElementById('close-banner'),
    bannerBadge: document.getElementById('banner-badge'),
    bannerMsg: document.getElementById('banner-msg'),
    bannerLink: document.getElementById('banner-link')
};

document.addEventListener('DOMContentLoaded', function() {
    handleHashRedirect();
    
    if (homeElems.introOverlay) {
        setTimeout(() => {
            homeElems.introOverlay.classList.remove('loading');
        }, 2000);
    }
    
    setupBanner();
    setupHomeEventListeners();
});

function handleHashRedirect() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    
    const redirectMap = {
        'staff': 'staff/',
        'values': 'values/',
        'diagnosis': 'diagnosis/',
        'treatment': 'treatment/',
        'prp': 'prp/',
        'contact': 'contact/'
    };
    
    if (redirectMap[hash]) {
        window.location.replace(redirectMap[hash]);
    }
}

function setupBanner() {
    const config = typeof siteData !== 'undefined' ? siteData.banner : null;
    if (config && config.show && homeElems.promoBanner) {
        homeElems.promoBanner.style.display = "flex";
        if (homeElems.bannerBadge) homeElems.bannerBadge.textContent = config.badge;
        if (homeElems.bannerMsg) homeElems.bannerMsg.innerHTML = `<strong>${config.text}</strong>`;
        if (homeElems.bannerLink) {
            homeElems.bannerLink.textContent = config.linkText;
            homeElems.bannerLink.href = config.linkUrl;
        }
    } else {
        if(homeElems.promoBanner) homeElems.promoBanner.style.display = "none";
    }
}

function setupHomeEventListeners() {
    if(homeElems.enterBtn) homeElems.enterBtn.addEventListener('click', enterSite);
    if(homeElems.closeBannerBtn) homeElems.closeBannerBtn.addEventListener('click', closeBanner);
}

function enterSite() {
    homeElems.introOverlay.classList.add('hidden');
    document.body.classList.add('site-entered');
    document.body.classList.add('has-sub-hero');
    
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
    
    setupHomeHeaderObserver();
}

function setupHomeHeaderObserver() {
    const visualSection = document.getElementById('visual-section');
    if (!visualSection) return;
    
    const header = document.getElementById('global-header');
    const headerHeight = header ? header.offsetHeight : 70;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < headerHeight) {
                document.body.classList.add('sub-hero-passed');
            } else {
                document.body.classList.remove('sub-hero-passed');
            }
        });
    }, {
        root: null,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0
    });
    
    observer.observe(visualSection);
}

function showBanner() {
    const config = typeof siteData !== 'undefined' ? siteData.banner : null;
    if(document.body.classList.contains('site-entered') && homeElems.promoBanner && config && config.show) {
        homeElems.promoBanner.classList.add('show');
    }
}

function closeBanner() {
    if(homeElems.promoBanner) homeElems.promoBanner.classList.remove('show');
}
