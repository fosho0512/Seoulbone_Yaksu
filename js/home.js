/* [SEOUL BONE] Home Page Script - Extends common.js */

const homeElems = {
    introOverlay: document.getElementById('intro-overlay'),
    enterBtn: document.getElementById('enter-btn')
};

document.addEventListener('DOMContentLoaded', function() {
    handleHashRedirect();
    
    if (homeElems.introOverlay) {
        setTimeout(() => {
            homeElems.introOverlay.classList.remove('loading');
        }, 2000);
    }
    
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

function setupHomeEventListeners() {
    if(homeElems.enterBtn) homeElems.enterBtn.addEventListener('click', enterSite);
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
