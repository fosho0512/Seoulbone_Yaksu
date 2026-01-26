/* [SEOUL BONE] Values Page Script */

let valuesScrollTrigger = null;

document.addEventListener('DOMContentLoaded', function() {
    renderValuesSlides();
    setupSubHeroScrollEffect();
    setTimeout(() => {
        setupValuesSlider();
    }, 100);
});

function renderValuesSlides() {
    const wrapper = document.getElementById('values-slides-wrapper');
    const data = siteData.content.values;
    
    if (!wrapper || !data) return;
    
    const progressDotsHtml = data.details.map((_, i) => 
        `<div class="progress-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`
    ).join('');
    
    const titleLayerHtml = data.details.map((det, i) => `
        <div class="values-layer-item${i === 0 ? ' active' : ''}" data-slide="${i}">
            <h3>${det.t.replace(/^\d+\.\s*/, '')}</h3>
            <div class="values-divider"></div>
        </div>
    `).join('');
    
    const subtitleLayerHtml = data.details.map((det, i) => {
        const subtitleMatch = det.d.match(/<strong>\[([^\]]+)\]<\/strong>/);
        const subtitle = subtitleMatch ? subtitleMatch[1] : '';
        return `<span class="values-layer-item${i === 0 ? ' active' : ''}" data-slide="${i}">${subtitle}</span>`;
    }).join('');
    
    const imageTrackHtml = data.details.map((det, i) => `
        <div class="values-image-item${i === 0 ? ' active' : ''}" data-index="${i}">
            <img src="../${det.img}" alt="${det.t}">
        </div>
    `).join('');
    
    const numLayerHtml = data.details.map((_, i) => 
        `<span class="values-layer-item${i === 0 ? ' active' : ''}" data-slide="${i}">0${i + 1}</span>`
    ).join('');
    
    const pointsLayerHtml = data.details.map((det, i) => {
        const pointsHtml = det.d
            .replace(/<strong>\[[^\]]+\]<\/strong><br><br>/, '')
            .split(/<br><br>/)
            .filter(p => p.trim())
            .map(point => {
                const titleMatch = point.match(/<b>([^<]+)<\/b>/);
                const title = titleMatch ? titleMatch[1] : '';
                const desc = point.replace(/<b>[^<]+<\/b><br>/, '').trim();
                return `<div class="point-item"><h4>${title}</h4><p>${desc}</p></div>`;
            }).join('');
        return `<div class="values-layer-item${i === 0 ? ' active' : ''}" data-slide="${i}">${pointsHtml}</div>`;
    }).join('');
    
    wrapper.innerHTML = `
        <div class="values-slides-container">
            <div class="values-slide-progress">
                ${progressDotsHtml}
            </div>
            
            <div class="values-left-track">
                <div class="values-layer values-title-layer">
                    ${titleLayerHtml}
                </div>
                <div class="values-layer values-subtitle-layer">
                    ${subtitleLayerHtml}
                </div>
            </div>
            
            <div class="values-image-track">
                ${imageTrackHtml}
            </div>
            
            <div class="values-right-track">
                <div class="values-layer values-num-layer">
                    ${numLayerHtml}
                </div>
                <div class="values-layer values-points-layer">
                    ${pointsLayerHtml}
                </div>
            </div>
        </div>
        <div class="values-scroll-spacer"></div>
    `;
}

function setupValuesSlider() {
    const wrapper = document.querySelector('.values-slides-wrapper');
    const container = document.querySelector('.values-slides-container');
    const imageItems = document.querySelectorAll('.values-image-item');
    const titleItems = document.querySelectorAll('.values-title-layer .values-layer-item');
    const subtitleItems = document.querySelectorAll('.values-subtitle-layer .values-layer-item');
    const numItems = document.querySelectorAll('.values-num-layer .values-layer-item');
    const pointsItems = document.querySelectorAll('.values-points-layer .values-layer-item');
    const progressDots = document.querySelectorAll('.values-slide-progress .progress-dot');
    
    if (!wrapper || !container || imageItems.length === 0) {
        console.warn('Values slider: Required elements not found');
        return;
    }
    
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    const totalSlides = imageItems.length;
    let currentSlide = 0;
    
    function updateSlide(index) {
        if (index === currentSlide) return;
        currentSlide = index;
        
        [imageItems, titleItems, subtitleItems, numItems, pointsItems].forEach(items => {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        });
        
        progressDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    valuesScrollTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
            const progress = self.progress;
            const slideIndex = Math.min(
                Math.floor(progress * totalSlides),
                totalSlides - 1
            );
            updateSlide(slideIndex);
        }
    });
    
    progressDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            const targetProgress = i / totalSlides;
            const wrapperRect = wrapper.getBoundingClientRect();
            const scrollTarget = wrapper.offsetTop + (wrapperRect.height * targetProgress);
            
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        });
    });
}
