/* [SEOUL BONE 홈페이지 내용 및 이미지 관리 파일] */

const siteData = {
    banner: {
        show: true,
        badge: "EVENT",
        text: "개원 3주년 기념 — 우리동네 안심병원 3년 연속 선정 감사 이벤트",
        linkText: "자세히 보기 →",
        linkUrl: "https://blog.naver.com/"
    },
    content: {
        // 01. Medical Staff
        staff: { 
            title: "Medical Staff", 
            name: "장 용 준",
            position: "대표원장",
            titles: ["재활의학과 전문의 · 의학박사", "가톨릭대학교 재활의학교실 외래교수", "석박사통합과정 졸업 (부전공 신경외과학)"],
            modalImg: "images/staff.jpg", 
            signatureImg: "images/signature.png", 
            bio: [
                { category: "학력", items: ["가톨릭대학교 의과대학 재활의학 석·박사 통합과정 졸업", "가톨릭대학교 의과대학 졸업"] },
                { category: "경력", items: ["가톨릭중앙의료원 수련의", "가톨릭중앙의료원 재활의학과 전공의", "가톨릭중앙의료원 재활의학과 지도전문의", "가톨릭대학교 부천성모병원 재활의학과 외래교수", "가톨릭대학교 서울성모병원 재활의학과 외래교수", "미국 도수치료학회 과정 수료 (Emory Rehabilitation Center)", "독일 체외충격파치료 과정 수료 (Medizinische Gesellschaft für Myofasziale Schmerzen)", "스페인 슈로스 척추측만증 운동치료 과정 수료", "대한정주의학회 정맥주사영양요법(IVNT) 인증의", "대한재활의학회 장애인보조기구처방검수 전문화 과정 수료", "일본 오사카 의대 부속병원 재활의학과", "前)가톨릭의과대학 재활의학교실 초음파중재술 워크샵 강사", "前)대한해부학회 KAA International Anatomy Symposium 초청 강사", "前)헬스조선 의학기사 자문의"] },
                { category: "학회활동", items: ["대한의사협회 정회원", "대한재활의학회 정회원", "대한도수의학회 정회원", "CYRIAX 정형의학연구회 정회원", "대한충격파치료학회 정회원", "대한임상통증학회 정회원", "대한노인재활의학회 정회원", "대한정주의학회 정회원", "American Congress of Rehabilitation Medicine Member", "American Academy of Manipulative Therapy Member", "European Society of Physical and Rehabilitation Medicine Member"] },
                { category: "수상", items: ["가톨릭대학교 재활의학교실 최우수전공의상", "가톨릭대학교 재활의학교실 우수연구상", "대한재활의학회 추계학술대회 우수포스터연재상"] },
                { category: "저서", items: ["초음파 유도하 근골격계 주사치료 (대한의학)"] },
                { category: "논문", items: ["Can initial sarcopenia affect poststroke rehabilitation outcome? (Journal of Clinical Neuroscience, 2020)", "Survey of Botulinum Toxin Injections in Anticoagulated Patients (Ann Rehabil Med. 2016)", "Unilateral Pseudohypertrophy of Calf Muscles as a Clinical Manifestation of Lumbosacral Radiculopathy (2020)", "Number processing error as a clinical manifestation of hemispatial neglect following hypoxic brain injury (Brain & Neurorehabilitation 2020)", "YouTube as a learning tool for four shoulder tests (Prim Health Care Res Dev. 2018)", "Smartphone Application Versus Pedometer to Promote Physical Activity in Prostate Cancer Patients (Telemed J E Health. 2019)", "Effectiveness of hydrotherapy on balance and paretic knee strength in patients with stroke (Am J Phys Med Rehabil. 2020)"] }
            ],
            bottomQuote: {
                main: "\"당신의 몸은 결코 거짓을 말하지 않습니다.<br>통증은 그 진실을 전하는 가장 정직한 신호입니다.\"",
                sub: "우리는 보이는 증상 너머, 숨겨진 원인을 깊이 읽어냅니다.<br>현재의 신체 기능과 앞으로의 변화까지 세심하게 고려하여<br>가장 온전한 회복을 위해 정성을 다해 진료하겠습니다."
            },
            details: [] 
        },
        // 02. Core Values
        values: { 
            title: "Core Values", 
            desc: "융합된 전문성과 세계적 식견으로<br>통증의 근본 원인을 찾아내고,<br>포괄적이고 근본적인 접근을 지향합니다.", 
            slogan: {
                main: "Excellence in Every Detail",
                sub: "우리는 환자의 완전한 회복을 위해<br>타협 없는 원칙을 지킵니다."
            },
            sloganBg: "images/values.jpg",
            modalImg: "images/values.jpg", 
            details: [ 
                {t:"01. 융합된 전문성과 세계적 식견", d:"<strong>[Expertise & Global Perspective]</strong><br><br><b>Dual Specialist Insight</b><br>재활의학과 및 신경외과를 모두 전공한 의학박사(MD, PhD)의 통합적인 시각으로 질환의 근본 원인을 찾아냅니다.<br><br><b>Global Standard</b><br>북미(캐나다, 미국), 유럽(독일, 스페인), 아시아(일본) 등 세계 유수 학회와 의료 현장에서 검증된 선진 치료 시스템을 도입하여 적용합니다.<br><br><b>Dedicated Primary Physician (일관된 주치의 시스템)</b><br>우리는 다수의 의료진을 내세우지 않습니다. 검증된 실력을 갖춘 대표원장 1인이 진단부터 치료의 끝까지 전 과정을 책임집니다. 의료진 교체 없이 치료의 연속성이 보장되며, 환자 상태의 미세한 변화까지 놓치지 않는 일관되고 깊이 있는 '주치의 케어'를 제공합니다.", img:"images/values_01.jpg"}, 
                {t:"02. 포괄적이고 근본적인 접근", d:"<strong>[Comprehensive Approach]</strong><br><br><b>Beyond Pain</b><br>눈에 보이는 통증만 쫓지 않습니다. 통증의 원인이 되는 근육, 신경, 그리고 신체 전반의 기능적 움직임까지 포괄적으로 분석하여 재발을 막는 근본 치료를 시행합니다.<br><br><b>Personalized Care</b><br>획일화된 치료가 아닌, 환자 개개인의 상태와 라이프스타일을 고려한 '최적의 맞춤 치료 계획'을 수립합니다.", img:"images/values_02.jpg"}, 
                {t:"03. 타협하지 않는 원칙과 환경", d:"<strong>[Principles & Environment]</strong><br><br><b>Safety & Cleanliness</b><br>4개 층 단독 건물을 사용하며, 환자의 '안정'과 철저한 '청결'을 제1원칙으로 삼는 쾌적한 치유 공간을 제공합니다. 3년연속 중구보건소 지정 우리동네안심병원으로 지정.<br><br><b>Advanced Technology</b><br>대학병원급 최신 첨단 장비를 아낌없이 투자하여 진단의 정확도와 치료 효과를 극대화합니다.<br><br><b>Transparent Policy</b><br>과잉 진료를 지양하고, 모든 치료 비용을 투명하게 공개하는 정직한 가격 정책으로 신뢰를 드립니다.", img:"images/values_03.jpg"}, 
                {t:"04. 진정한 환자 중심의 소통과 동행", d:"<strong>[Patient-Centered Communication & Partnership]</strong><br><br><b>Clear Explanation</b><br>어려운 의학 용어가 아닌 환자의 눈높이에서, 현재 상태와 통증의 원인을 상세하고 명확하게 설명해 드립니다.<br><br><b>Shared Decision Making</b><br>일방적인 치료 결정이 아닌, 가능한 다양한 치료 옵션의 장단점을 투명하게 제공하고 환자와 함께 최선의 방법을 고민합니다.<br><br><b>Treatment Roadmap</b><br>단순히 현재의 치료를 넘어, 앞으로 나아갈 장기적인 치료 방향성과 목표를 공유하여 치료 과정의 막연한 불안감을 해소합니다.", img:"images/values_04.jpg"} 
            ] 
        },
        // 03. Diagnostic Tools (NEW - 단순화된 구조)
        diagnosis: { 
            title: "Diagnostic Tools", 
            desc: "<strong>정확한 진단이 완치의 시작입니다.</strong><br>최첨단 진단 장비에 아낌없이 투자하여 통증의 근본 원인을 빠르고 정확하게 찾아냅니다.", 
            modalImg: "images/diagnosis.jpg",
            heroImg: "images/diagnosis-hero.png",
            details: [ 
                { t: "01. 고해상도 디지털 X-ray", d: `<strong>(High-Resolution Digital X-ray)</strong><br><br><i>\"뼈와 관절 상태를 확인하는 가장 기초적이고 필수적인 검사\"</i><br><br>기존 필름 방식 대비 방사선 피폭량을 현저히 줄여 안전성을 높인 최신 장비입니다. 촬영 즉시 고해상도의 선명한 영상을 획득하여 골절, 관절염, 척추 변형 등 골격계 이상 유무를 신속하게 평가합니다.`, img: "images/diagnosis_xray.jpg" },
                { t: "02. 프리미엄 초음파 진단기 (3대)", d: `<strong>(Premium Ultrasound Systems - 3 Units)</strong><br><br><i>\"진료실에서 대기 없이 즉시 확인하는 '의사의 제2의 눈'\"</i><br><br>X-ray로 확인이 어려운 근육, 인대, 신경 등 연부 조직의 손상을 정밀하게 관찰합니다. 하이엔드급 장비 3대를 각 진료실에 배치하여, 대기 없이 진료 도중 즉각적으로 확인하고 설명해 드립니다.`, img: "images/diagnosis_ultra.jpg" },
                { t: "03. C-arm (이동형 실시간 투시 영상)", d: `<strong>(C-arm Fluoroscopy with SELD)</strong><br><br><i>\"정확도는 높이고 피폭은 최소화한, 안전한 비수술 치료의 핵심\"</i><br><br>몸속을 실시간 동영상으로 보는 투시 장비입니다. 척추나 관절 깊숙한 부위에 시술 시, 바늘 위치를 네비게이션처럼 정확하게 안내합니다. 최신 저선량(SELD) 탑재로 방사선 노출을 획기적으로 줄였습니다.`, img: "images/diagnosis_carm.jpg" },
                { t: "04. 신경전도 및 근전도 검사 (NCS/EMG)", d: `<strong>(Nerve Conduction & Electromyography)</strong><br><br><i>\"눈에 보이지 않는 신경과 근육의 기능적 이상을 찾아내는 정밀 검사\"</i><br><br>MRI나 X-ray만으로는 알 수 없는 신경의 기능적 상태를 전기적 신호로 평가합니다. 손발 저림, 근력 약화 등이 신경 문제인지 근육 문제인지, 손상 위치와 정도를 명확하게 감별 진단합니다.`, img: "images/diagnosis_emg.jpg" }
            ] 
        },
        // 04. Integrated Treatment Solutions
        treatment: { 
            title: "Integrated Solutions", 
            desc: "<strong>통증을 넘어, 근본적인 기능 회복을 위한 통합 치료 솔루션</strong><br>재활의학과와 정형외과의 전문성을 더해 근본적인 원인 해결을 목표로 합니다.", 
            modalImg: "images/treatment.jpg",
            heroImg: "images/treatment-hero.png",
            slogans: [
                {
                    main: "통증을 넘어,<br>근본적인 기능 회복을 위한<br>통합 치료 솔루션",
                    sub: "재활의학과와 정형외과의 전문성을 더해, 통증의 일시적 완화가 아닌 근본적인 원인 해결을 목표로 합니다.",
                    desc: "대학병원급 최첨단 장비와 숙련된 노하우를 바탕으로, 환자 개개인의 상태에 최적화된 맞춤형 통합 치료 계획을 수립합니다."
                },
                {
                    main: "서울본재활의학과의원이 지키는<br>3가지 약속",
                    desc: "우리는 회복이라는 결과 앞에서 어떤 효율과도 타협하지 않습니다."
                }
            ],
            promises: [
                { title: "Strict Standard", name: "엄격한 재료의 선정", desc: "내 가족에게 쓸 수 있는 것만이 환자분에게도 허락됩니다.<br>우리는 임상적으로 검증된 최상의 재료만을 고집하며, 안전성과 효능에 대한 확신 없이는 절대 사용하지 않습니다." },
                { title: "Real-time Customization", name: "실시간 맞춤 처방", desc: "기계적인 루틴(Routine) 진료를 지양합니다.<br>매 내원 시 달라지는 신체 상태를 정밀하게 파악하여, 지금 당신에게 가장 필요한 최적의 배합으로 치료합니다." },
                { title: "Insight for Cause", name: "근본을 보는 통찰", desc: "통증은 몸이 보내는 신호일 뿐입니다.<br>단순한 불편함의 해소를 넘어, 불균형해진 신체 구조와 기능을 바로잡는 근본적인 치유를 지향합니다." }
            ],
            details: [ 
                { 
                    en: "Precision Image-Guided Injection",
                    t: "01. 정밀 영상 유도 주사 치료", 
                    quote: "보면서 치료하는 정확함, 안전하고 빠른 통증 해결",
                    d: `저희 병원의 모든 주사 치료와 시술은 '감'에 의존하지 않습니다.<br>반드시 초음파나 C-arm(실시간 투시 장비) 영상을 통해 병변 부위를 실시간으로 확인하며 정확하게 약물을 투여합니다. 이는 치료 효과를 극대화하고 부작용을 최소화하는 핵심 원칙입니다.<br><br><b>초음파 유도하 주사 (Ultrasound-Guided Injection):</b><br>진료실에서 즉시 근육, 인대, 힘줄의 손상을 확인하고, 미리 설정된 타겟에 정확히 주사하여 조직 재생과 염증 완화를 돕습니다. (예: 프롤로테라피, DNA 주사, 연골주사 등)<br><br><b>C-arm 중재술 (C-arm Intervention):</b><br>척추 심부나 관절 깊숙한 곳의 신경 주변에 발생하는 통증을 잡기 위해, 실시간 투시 영상을 보며 바늘을 접근시켜 신경 염증과 부종을 가라앉히는 비수술적 시술입니다. (C-arm 장비에 피폭 저감 장치 SELD 탑재)`, 
                    img: "images/treatment_injection.jpg" 
                },
                { 
                    en: "Advanced Modality & Regenerative Therapy",
                    t: "02. 첨단 특수 물리·재생 치료", 
                    quote: "대학병원급 하이엔드 장비를 이용한 비수술적 재생 관리",
                    d: `단순한 온열 치료를 넘어, 손상된 조직의 실질적인 재생을 유도하고 난치성 만성 통증을 조절하기 위해 대학병원에서 사용하는 최신 고가 장비들을 도입하여 운용합니다.<br><br><b>체외충격파 (ESWT - 집중형/방사형):</b><br>강력한 충격파 에너지를 병변에 가해 혈관 재형성을 유도하고, 뼈와 힘줄 등 조직의 재생을 촉진하는 근본적인 치료법입니다.<br><br><b>고강도 레이저 (HILT):</b><br>일반 레이저보다 훨씬 깊은 조직까지 강력한 에너지를 전달하여, 즉각적인 통증 감소 효과와 함께 손상된 인대 및 연골의 회복을 돕습니다.<br><br><b>스크램블러 테라피 (Scrambler Therapy - 페인스크램블러):</b><br>만성 통증, 신경병증성 통증 등 약물로 조절되지 않는 통증 신호를 무통증 신호로 바꾸어 뇌로 전달함으로써 통증을 잊게 만드는 신개념 통증 치료입니다.<br><br><b>자기장 치료 (Magnetic Field Therapy):</b><br>인체 깊숙한 곳까지 침투하는 강력한 자기장을 이용해 신경 세포를 자극하고 근육 경직을 이완시켜 통증을 완화합니다.`, 
                    img: "images/treatment_modality.jpg" 
                },
                { 
                    en: "Manual Therapy & Rehabilitation Exercise",
                    t: "03. 도수 및 재활 운동 치료", 
                    quote: "무너진 신체 밸런스를 바로잡아 재발을 막는 근본 해결책",
                    d: `통증이 사라졌다고 치료가 끝난 것이 아닙니다. 재활의학과 전문의의 정확한 처방 하에 전문 치료사가 손상된 부위의 기능을 회복시키고, 잘못된 자세와 움직임을 교정하여 재발을 방지합니다.<br><br><b>1:1 도수 치료 (Manual Therapy):</b><br>전문 도수치료사가 손을 이용해 굳어진 관절을 풀어주고, 틀어진 척추와 골반의 정렬을 바로잡아 통증의 구조적인 원인을 해결합니다.<br><br><b>맞춤 재활 운동 (Therapeutic Exercise):</b><br>약해진 근력을 강화하고 관절의 가동 범위를 회복시켜, 일상생활 및 스포츠 활동으로 안전하게 복귀할 수 있도록 돕는 필수적인 과정입니다.`, 
                    img: "images/treatment_manual.jpg" 
                }
            ] 
        },
        // 05. Cell Therapy (PRP)
        prp: { 
            title: "Cell Therapy (PRP)", 
            desc: "<strong>\"내 혈액 속 치유 성분으로 손상된 조직을 깨우다\"</strong><br>환자 본인의 혈액에서 치유와 재생을 담당하는 '성장인자'만을 고농도로 농축하여,<br>손상된 인대·힘줄·연골 부위에 직접 주사하는 최신 재생 치료법입니다.<br><br><strong>[핵심 특징]</strong><br>• <b>안전성:</b> 내 혈액 사용으로 거부 반응/부작용 최소화<br>• <b>근본 치료:</b> 약해진 조직 자체를 튼튼하게 재생<br>• <b>강력한 재생:</b> 3~5배 농축된 성장인자로 자연 치유력 극대화", 
            modalImg: "images/prp.jpg"
        },
        // 06. Contact/Location
        contact: { 
            title: "Contact & Location", 
            desc: "환자 중심의 진료<br>서울본재활의학과는 환자분들의 건강 개선에<br>기여할 수 있도록 높은 진료를 제공합니다.", 
            mapEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.664609756667!2d127.00938361531086!3d37.55360667979986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca33a26d79a29%3A0x8e8335555c5c000!2z7JW97IiY7Jet!5e0!3m2!1sko!2skr!4v1646200000000!5m2!1sko!2skr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
            modalImg: "images/contact.jpg", 
            details: [ 
                {t:"Operating Hours", d:"평일 09:00 - 19:00 / 토 09:00 - 13:00", img:"images/contact_hours.jpg"}, 
                {t:"Lunch Time", d:"오후 1:00 - 2:00 (토요일 점심시간 없음)", img:"images/contact_hours.jpg"}, 
                {t:"Location", d:"서울 약수역점 (약수역 출구 바로 앞)", img:"images/contact_loc.jpg"}, 
                {t:"Parking", d:"건물 내 기계식 주차 가능", img:"images/contact_parking.jpg"} 
            ] 
        }
    }
};