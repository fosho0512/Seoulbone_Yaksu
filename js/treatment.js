/* [SEOUL BONE] Treatment Page Script */

let treatmentScrollHandler = null;
let treatmentDetailsObserver = null;

document.addEventListener('DOMContentLoaded', function() {
    renderTreatmentContent();
    setTimeout(() => {
        setupTreatmentScroll();
        setupTreatmentDetails();
    }, 100);
});

function renderTreatmentContent() {
    const sloganSection = document.getElementById('treatment-slogan-section');
    const detailsSection = document.getElementById('treatment-details-section');
    const data = siteData.content.treatment;
    
    if (!data) return;
    
    if (sloganSection) {
        sloganSection.innerHTML = `
            <div class="treatment-slogan-stage">
                <div class="treatment-slogan-bg">
                    <img src="../images/treatment-intro-bg.webp" alt="Background" loading="lazy">
                </div>
                <div class="treatment-slogan-container">
                    <div class="treatment-slogan-group" data-group="1">
                        <h2 class="slogan-main slogan-line">${data.slogans[0].main}</h2>
                        <p class="slogan-sub slogan-line">${data.slogans[0].sub || ''}</p>
                        <p class="slogan-desc slogan-line">${data.slogans[0].desc}</p>
                    </div>
                    <div class="treatment-slogan-group" data-group="2">
                        <h2 class="slogan-main">${data.slogans[1].main}</h2>
                        <p class="slogan-desc">${data.slogans[1].desc}</p>
                    </div>
                    <div class="treatment-slogan-group treatment-promises" data-group="3">
                        ${data.promises.map(p => `
                            <div class="promise-item">
                                <h3 class="promise-title">${p.name}<br><span class="promise-en">${p.title}</span></h3>
                                <p class="promise-desc">${p.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    if (detailsSection) {
        detailsSection.innerHTML = data.details.map((det, idx) => `
            <div class="treatment-detail-row ${idx % 2 === 0 ? 'text-left' : 'text-right'}">
                <div class="treatment-detail-text">
                    ${det.en ? `<p class="detail-en">${det.en}</p>` : ''}
                    <h3 class="detail-title">${det.t}</h3>
                    <div class="detail-divider"></div>
                    ${det.quote ? `<p class="detail-quote">"${det.quote}"</p>` : ''}
                    <p class="detail-desc">${det.d}</p>
                </div>
                <div class="treatment-detail-img">
                    <img src="../${det.img}" alt="${det.t}">
                </div>
            </div>
        `).join('');
    }
}

function setupTreatmentScroll() {
    const sloganSection = document.querySelector('.treatment-slogan-section');
    if (!sloganSection) return;
    
    const group1 = sloganSection.querySelector('.treatment-slogan-group[data-group="1"]');
    const group2 = sloganSection.querySelector('.treatment-slogan-group[data-group="2"]');
    const group3 = sloganSection.querySelector('.treatment-slogan-group[data-group="3"]');
    
    if (!group1 || !group2 || !group3) return;
    
    const group1Lines = group1.querySelectorAll('.slogan-line');
    
    const handleScroll = () => {
        const sectionRect = sloganSection.getBoundingClientRect();
        const sectionHeight = sloganSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        const sectionEntered = sectionRect.top <= 0;
        
        if (sectionRect.bottom <= 0) {
            sloganSection.classList.add('zoom-active');
            group1.classList.remove('active', 'exit-up');
            group2.classList.remove('active', 'exit-up');
            group3.classList.remove('active');
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
        
        document.body.classList.remove('sub-hero-passed');
        
        const scrolledInSection = -sectionRect.top;
        const scrollableHeight = sectionHeight - viewportHeight;
        const scrollProgress = Math.min(Math.max(scrolledInSection / scrollableHeight, 0), 1);
        
        sloganSection.classList.add('zoom-active');
        
        if (scrollProgress < 0.33) {
            group1.classList.add('active');
            group1.classList.remove('exit-up');
            group2.classList.remove('active', 'exit-up');
            group3.classList.remove('active');
            
            const lineProgress = scrollProgress / 0.33;
            group1Lines.forEach((line, idx) => {
                const lineThreshold = idx * 0.25;
                if (lineProgress > lineThreshold) {
                    line.classList.add('visible');
                } else {
                    line.classList.remove('visible');
                }
            });
        } else if (scrollProgress < 0.66) {
            group1.classList.remove('active');
            group1.classList.add('exit-up');
            group2.classList.add('active');
            group2.classList.remove('exit-up');
            group3.classList.remove('active');
            
            group1Lines.forEach(line => line.classList.add('visible'));
        } else {
            group1.classList.remove('active');
            group1.classList.add('exit-up');
            group2.classList.remove('active');
            group2.classList.add('exit-up');
            group3.classList.add('active');
            
            group1Lines.forEach(line => line.classList.add('visible'));
        }
    };
    
    if (treatmentScrollHandler) {
        if (window.lenis) {
            window.lenis.off('scroll', treatmentScrollHandler);
        } else {
            window.removeEventListener('scroll', treatmentScrollHandler);
        }
    }
    
    treatmentScrollHandler = handleScroll;
    
    if (window.lenis) {
        window.lenis.on('scroll', handleScroll);
    } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    handleScroll();
}

function setupTreatmentDetails() {
    const detailRows = document.querySelectorAll('.treatment-detail-row');
    if (detailRows.length === 0) return;
    
    treatmentDetailsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    detailRows.forEach(row => {
        treatmentDetailsObserver.observe(row);
    });
}
