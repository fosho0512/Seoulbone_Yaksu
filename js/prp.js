/* [SEOUL BONE] PRP Page Script */

let prpFadeUpObserver = null;
let prpFinalObserver = null;

document.addEventListener('DOMContentLoaded', function() {
    setupSubHeroScrollEffect();
    setTimeout(() => {
        setupPrpFadeUp();
        setupPrpFinalSection();
    }, 100);
});

function setupPrpFadeUp() {
    const fadeUpElements = document.querySelectorAll('.prp-intro-section .fade-up');
    if (fadeUpElements.length === 0) return;
    
    prpFadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--card-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    fadeUpElements.forEach(el => {
        prpFadeUpObserver.observe(el);
    });
}

function setupPrpFinalSection() {
    const finalSection = document.querySelector('.prp-final-section');
    if (!finalSection) return;
    
    const bgImages = finalSection.querySelectorAll('.prp-final-bg-img');
    const textBlocks = finalSection.querySelectorAll('.prp-final-text-block');
    
    if (bgImages.length === 0 || textBlocks.length === 0) return;
    
    prpFinalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.dataset.index);
                
                textBlocks.forEach((block, i) => {
                    block.classList.toggle('active', i === index);
                });
                
                bgImages.forEach((bg, i) => {
                    bg.classList.toggle('active', i === index);
                });
            }
        });
    }, { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' });
    
    textBlocks.forEach(block => {
        prpFinalObserver.observe(block);
    });
    
    if (textBlocks.length > 0) {
        textBlocks[0].classList.add('active');
        bgImages[0].classList.add('active');
    }
}
