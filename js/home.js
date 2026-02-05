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
    initImagePopup();
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

function initImagePopup() {
    if (typeof popupConfig === 'undefined' || !popupConfig.enabled) return;
    
    const config = popupConfig;
    const popup = document.getElementById('image-popup');
    const popupImage = document.getElementById('popup-image');
    const popupLink = document.getElementById('popup-link');
    const closeBtn = document.getElementById('close-popup');
    const overlay = popup.querySelector('.popup-overlay');
    const todayCheck = document.getElementById('popup-today-check');
    
    if (!popup || !config.popups || config.popups.length === 0) return;
    
    if (!isWithinSchedule(config.schedule)) return;
    
    if (config.showOncePerDay && hasSeenPopupToday()) return;
    
    const sortedPopups = [...config.popups].sort((a, b) => a.order - b.order);
    const firstPopup = sortedPopups[0];
    
    if (!firstPopup || !firstPopup.image) return;
    
    const img = new Image();
    img.onload = function() {
        popupImage.src = firstPopup.image;
        popupLink.href = firstPopup.link || '#';
        if (!firstPopup.link) {
            popupLink.style.pointerEvents = 'none';
        }
        
        if (config.position === 'bottom-right') {
            popup.classList.add('position-bottom-right');
        } else if (config.position === 'bottom-left') {
            popup.classList.add('position-bottom-left');
        }
        
        popup.classList.add('show');
    };
    img.onerror = function() {
        console.log('Popup image not found:', firstPopup.image);
    };
    img.src = firstPopup.image;
    
    function closePopup() {
        if (todayCheck && todayCheck.checked) {
            setPopupSeenToday();
        }
        popup.classList.remove('show');
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (overlay) overlay.addEventListener('click', closePopup);
}

function isWithinSchedule(schedule) {
    if (!schedule) return true;
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    if (schedule.start && today < schedule.start) return false;
    if (schedule.end && today > schedule.end) return false;
    
    return true;
}

function hasSeenPopupToday() {
    const lastSeen = localStorage.getItem('popupLastSeen');
    if (!lastSeen) return false;
    
    const today = new Date().toISOString().split('T')[0];
    return lastSeen === today;
}

function setPopupSeenToday() {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('popupLastSeen', today);
}
