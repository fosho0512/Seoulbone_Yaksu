/* [SEOUL BONE] Diagnosis Page Script */

let diagScrollTrigger = null;
let equipmentScrollHandler = null;
let diagSloganObserver = null;
let mobileSubHeroObserver = null;

document.addEventListener('DOMContentLoaded', function() {
    renderEquipmentNarrative();
    setTimeout(() => {
        setupDiagnosisScroll();
    }, 100);
});

function renderEquipmentNarrative() {
    const narrative = document.getElementById('equipment-narrative');
    const data = siteData.content.diagnosis;
    
    if (!narrative || !data) return;
    
    const stepsHtml = data.details.map((det, i) => {
        const title = det.t.replace(/^\d+\.\s*/, '');
        const subtitleMatch = det.d.match(/<strong>\(([^)]+)\)<\/strong>/);
        const subtitle = subtitleMatch ? subtitleMatch[1] : '';
        const showSubtitle = subtitle && subtitle.toLowerCase() !== title.toLowerCase();
        const sloganMatch = det.d.match(/<i>"?([^"<]+)"?<\/i>/);
        const slogan = sloganMatch ? sloganMatch[1] : '';
        const desc = det.d.replace(/<strong>\([^)]+\)<\/strong><br><br>/, '').replace(/<i>[^<]+<\/i><br><br>/, '').trim();
        return `
            <div class="equipment-step${i === 0 ? ' active' : ''}" data-index="${i}">
                <span class="equipment-number">0${i + 1}</span>
                <h3 class="equipment-title">${title}</h3>
                ${showSubtitle ? `<p class="equipment-subtitle">${subtitle}</p>` : ''}
                ${slogan ? `<p class="equipment-slogan">"${slogan}"</p>` : ''}
                <p class="equipment-desc">${desc}</p>
            </div>
        `;
    }).join('');

    narrative.innerHTML = `
        <div class="sticky-image-wrapper">
            <div class="sticky-image" id="equipment-image">
                ${data.details.map((det, i) => `<img src="${siteBasePath}${det.img}" alt="Equipment" class="${i === 0 ? 'active' : ''}" loading="lazy">`).join('')}
            </div>
        </div>
        <div class="equipment-steps">
            ${stepsHtml}
        </div>
    `;
}

function setupDiagnosisScroll() {
    const area = document.querySelector('.diag-horizontal-area');
    const viewport = document.querySelector('.diag-viewport');
    const track = document.querySelector('.diag-track');
    const sloganPanel = document.querySelector('.diag-slogan');
    const indicatorSubhero = document.getElementById('diag-indicator-subhero');
    const indicatorSlogan = document.getElementById('diag-indicator-slogan');
    
    if (!area || !viewport || !track) {
        console.warn('Diagnosis: Required elements not found');
        return;
    }
    
    if (window.innerWidth <= 768) {
        track.style.transform = 'none';
        if (sloganPanel) sloganPanel.classList.add('animate');
        setupMobileSubHeroObserver();
        return;
    }
    
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    if (diagScrollTrigger) {
        diagScrollTrigger.kill();
        diagScrollTrigger = null;
    }
    
    diagScrollTrigger = ScrollTrigger.create({
        trigger: area,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
            const progress = self.progress;
            
            const moveProgress = Math.min(progress / 0.8, 1);
            const translateX = -50 * moveProgress;
            track.style.transform = `translateX(${translateX}%)`;
            
            if (sloganPanel) {
                const sloganVisible = moveProgress >= 0.6;
                sloganPanel.classList.toggle('zoom-out', sloganVisible);
                sloganPanel.classList.toggle('animate', sloganVisible);
            }
            
            if (indicatorSubhero) {
                indicatorSubhero.classList.toggle('hidden', moveProgress >= 0.4);
            }
            
            if (indicatorSlogan) {
                indicatorSlogan.classList.toggle('visible', moveProgress >= 0.7 && progress < 0.95);
            }
        },
        onLeave: () => {
            setupDiagSloganObserver();
        },
        onEnterBack: () => {
            cleanupDiagSloganObserver();
            document.body.classList.remove('sub-hero-passed');
        }
    });
    
    if (diagScrollTrigger && diagScrollTrigger.progress >= 1) {
        setupDiagSloganObserver();
    }
    
    setupEquipmentNarrative();
}

function setupEquipmentNarrative() {
    const steps = document.querySelectorAll('.equipment-step');
    const images = document.querySelectorAll('.sticky-image img');
    
    if (steps.length === 0 || images.length === 0) return;
    
    function handleEquipmentScroll() {
        const viewportMiddle = window.innerHeight / 2;
        
        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            
            if (rect.top < viewportMiddle && rect.bottom > viewportMiddle) {
                steps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');
                
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });
            }
        });
    }
    
    if (equipmentScrollHandler) {
        if (window.lenis) {
            window.lenis.off('scroll', equipmentScrollHandler);
        } else {
            window.removeEventListener('scroll', equipmentScrollHandler);
        }
    }
    
    equipmentScrollHandler = handleEquipmentScroll;
    
    if (window.lenis) {
        window.lenis.on('scroll', handleEquipmentScroll);
    } else {
        window.addEventListener('scroll', handleEquipmentScroll, { passive: true });
    }
    
    handleEquipmentScroll();
}

function setupDiagSloganObserver() {
    const sloganSection = document.querySelector('.diag-slogan');
    if (!sloganSection || diagSloganObserver) return;
    
    document.body.classList.add('sub-hero-passed');
    
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
    
    diagSloganObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                document.body.classList.add('sub-hero-passed');
            } else if (entry.isIntersecting) {
                document.body.classList.remove('sub-hero-passed');
            }
        });
    }, { 
        threshold: 0, 
        rootMargin: `-${headerHeight}px 0px 0px 0px` 
    });
    
    diagSloganObserver.observe(sloganSection);
}

function cleanupDiagSloganObserver() {
    if (diagSloganObserver) {
        diagSloganObserver.disconnect();
        diagSloganObserver = null;
    }
}

function setupMobileSubHeroObserver() {
    const subHero = document.querySelector('.diag-subhero');
    if (!subHero || mobileSubHeroObserver) return;
    
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
    
    mobileSubHeroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                document.body.classList.add('sub-hero-passed');
            } else if (entry.isIntersecting) {
                document.body.classList.remove('sub-hero-passed');
            }
        });
    }, { 
        threshold: 0, 
        rootMargin: `-${headerHeight}px 0px 0px 0px` 
    });
    
    mobileSubHeroObserver.observe(subHero);
}
