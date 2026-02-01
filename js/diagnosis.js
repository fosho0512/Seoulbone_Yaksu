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
    
    narrative.innerHTML = `
        <div class="sticky-image-wrapper">
            <div class="sticky-image" id="equipment-image">
                ${data.details.map((det, i) => `<img src="../${det.img}" alt="Equipment" class="${i === 0 ? 'active' : ''}" loading="lazy">`).join('')}
            </div>
        </div>
        <div class="equipment-steps">
            <div class="equipment-step active" data-index="0">
                <span class="equipment-number">01</span>
                <h3 class="equipment-title">고해상도 디지털 X-ray</h3>
                <p class="equipment-subtitle">High-Resolution Digital X-ray</p>
                <p class="equipment-slogan">"뼈와 관절 상태를 확인하는 가장 기초적이고 필수적인 검사"</p>
                <p class="equipment-desc">기존 필름 방식 대비 방사선 피폭량을 현저히 줄여 안전성을 높인 최신 디지털 X-ray 장비입니다. 촬영 즉시 고해상도의 선명한 영상을 획득하여 골절, 관절염, 척추 변형 등 골격계의 구조적인 이상 유무를 신속하고 정확하게 평가합니다.</p>
            </div>
            <div class="equipment-step" data-index="1">
                <span class="equipment-number">02</span>
                <h3 class="equipment-title">프리미엄 초음파 진단기</h3>
                <p class="equipment-subtitle">Premium Musculoskeletal Ultrasound (3 Units)</p>
                <p class="equipment-slogan">"진료실에서 대기 없이 즉시 확인하는 '의사의 제2의 눈'"</p>
                <p class="equipment-desc">X-ray로는 확인이 어려운 근육, 힘줄, 인대, 신경 등 연부 조직의 손상과 염증을 정밀하게 관찰합니다. 저희 병원은 하이엔드급 초음파 장비를 총 3대 보유하여 각 진료실에 배치했습니다. 환자분들은 별도의 검사실 이동이나 대기 시간 없이, 진료 상담 도중 즉각적으로 아픈 부위를 초음파로 확인하고 설명을 들으실 수 있습니다.</p>
            </div>
            <div class="equipment-step" data-index="2">
                <span class="equipment-number">03</span>
                <h3 class="equipment-title">C-arm (이동형 실시간 투시 영상 장비)</h3>
                <p class="equipment-subtitle">C-arm Fluoroscopy with SELD Technology</p>
                <p class="equipment-slogan">"정확도는 높이고 피폭은 최소화한, 안전한 비수술 치료의 핵심"</p>
                <p class="equipment-desc">마치 우리 몸속을 실시간 동영상으로 보는 것과 같은 투시 장비입니다. 척추나 관절의 깊숙한 부위에 주사 치료나 시술을 시행할 때, 네비게이션처럼 바늘의 위치를 실시간으로 정확하게 안내하여 오차 없는 정밀한 치료를 가능하게 합니다.<br><br>안전 플러스: 최신 방사선 피폭 저감 장치인 SELD가 탑재되어 있어, 의료진과 환자분이 받는 불필요한 방사선 노출량을 획기적으로 줄여 더욱 안심하고 치료받으실 수 있습니다.</p>
            </div>
            <div class="equipment-step" data-index="3">
                <span class="equipment-number">04</span>
                <h3 class="equipment-title">최신 신경전도 및 근전도 검사 기기 (NCS/EMG)</h3>
                <p class="equipment-subtitle">Nerve Conduction Study & Electromyography</p>
                <p class="equipment-slogan">"눈에 보이지 않는 신경과 근육의 기능적 이상을 찾아내는 정밀 검사"</p>
                <p class="equipment-desc">영상 검사(MRI, X-ray)만으로는 알 수 없는 신경의 기능적 상태를 전기적 신호를 통해 평가합니다. 손발 저림, 감각 이상, 근력 약화 등이 있을 때, 이것이 신경의 문제인지 근육 자체의 문제인지, 신경 손상이라면 그 위치와 심각도는 어느 정도인지를 명확하게 감별 진단합니다.</p>
            </div>
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
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    const PHASE = {
        SUBHERO_END: 0.18,
        SLIDE_END: 0.45,
        TEXT1_END: 0.65,
        TEXT2_END: 0.88,
        SLOGAN_APPEAR: 0.40
    };
    
    diagScrollTrigger = ScrollTrigger.create({
        trigger: area,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.0,
        onUpdate: (self) => {
            const progress = self.progress;
            
            let translateX = 0;
            if (progress < PHASE.SUBHERO_END) {
                translateX = 0;
            } else if (progress < PHASE.SLIDE_END) {
                const moveProgress = (progress - PHASE.SUBHERO_END) / (PHASE.SLIDE_END - PHASE.SUBHERO_END);
                translateX = -50 * easeInOutCubic(moveProgress);
            } else {
                translateX = -50;
            }
            
            track.style.transform = `translateX(${translateX}%)`;
            
            if (sloganPanel) {
                if (progress >= PHASE.SLOGAN_APPEAR) {
                    sloganPanel.classList.add('zoom-out');
                    sloganPanel.classList.add('animate');
                } else {
                    sloganPanel.classList.remove('zoom-out');
                    sloganPanel.classList.remove('animate');
                }
            }
            
            if (indicatorSubhero) {
                if (progress < PHASE.SLOGAN_APPEAR) {
                    indicatorSubhero.classList.remove('hidden');
                } else {
                    indicatorSubhero.classList.add('hidden');
                }
            }
            
            if (indicatorSlogan) {
                if (progress >= PHASE.SLOGAN_APPEAR && progress < PHASE.TEXT2_END) {
                    indicatorSlogan.classList.add('visible');
                } else {
                    indicatorSlogan.classList.remove('visible');
                }
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
