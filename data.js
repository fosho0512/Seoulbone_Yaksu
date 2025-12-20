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
            titles: ["재활의학과 전문의 · 의학박사", "가톨릭대학교 재활의학교실 외래교수"],
            modalImg: "images/staff.jpg", 
            signatureImg: "images/signature.png", 
            bio: [
                { category: "학력", items: ["가톨릭대학교 의과대학 재활의학 석·박사 통합과정 졸업", "가톨릭대학교 의과대학 졸업"] },
                { category: "경력", items: ["가톨릭중앙의료원 수련의 및 재활의학과 전공의", "가톨릭중앙의료원 재활의학과 지도전문의", "가톨릭대학교 부천성모병원 재활의학과 외래교수", "가톨릭대학교 서울성모병원 재활의학과 외래교수", "일본 오사카 의대 부속병원 재활의학과 연수", "前) 가톨릭의과대학 재활의학교실 초음파중재술 워크샵 강사", "前) 대한해부학회 KAA International Anatomy Symposium 초청 강사", "前) 헬스조선 의학기사 자문의"] },
                { category: "해외 연수 및 자격", items: ["미국 도수치료학회 과정 수료 (Emory Rehabilitation Center)", "독일 체외충격파치료 과정 수료 (Medizinische Gesellschaft für Myofasziale Schmerzen)", "스페인 슈로스 척추측만증 운동치료 과정 수료", "대한정주의학회 정맥주사영양요법(IVNT) 인증의", "대한재활의학회 장애인보조기구처방검수 전문화 과정 수료"] },
                { category: "학회 활동", items: ["대한의사협회 / 대한재활의학회 / 대한도수의학회 정회원", "CYRIAX 정형의학연구회 정회원", "대한충격파치료학회 / 대한임상통증학회 정회원", "대한노인재활의학회 / 대한정주의학회 정회원", "American Congress of Rehabilitation Medicine Member", "European Society of Physical and Rehabilitation Medicine Member"] },
                { category: "수상 및 저서", items: ["가톨릭대학교 재활의학교실 최우수전공의상 수상", "가톨릭대학교 재활의학교실 우수연구상 수상", "대한재활의학회 추계학술대회 우수포스터연재상", "저서: 초음파 유도하 근골격계 주사치료 (대한의학)"] }
            ],
            bottomQuote: {
                main: "\"몸은 결코 거짓을 말하지 않습니다.<br>통증은 그 진실을 전하는 가장 정직한 신호입니다.\"",
                sub: "우리는 보이는 증상 너머, 숨겨진 원인을 깊이 읽어냅니다.<br>현재의 신체 기능과 앞으로의 변화까지 세심하게 고려하여<br>가장 온전한 회복을 위해 정성을 다해 진료하겠습니다."
            },
            details: [] 
        },
        // 02. Core Values
        values: { 
            title: "Core Values", 
            desc: "융합된 전문성과 세계적 식견으로<br>통증의 근본 원인을 찾아내고,<br>포괄적이고 근본적인 접근을 지향합니다.", 
            modalImg: "images/values.jpg", 
            details: [ 
                {t:"01. 융합된 전문성과 세계적 식견", d:"<strong>[Expertise & Global Perspective]</strong><br>• <b>Dual Specialist Insight:</b> 재활의학과 및 정형외과를 모두 전공한 의학박사(MD, PhD)의 통합적인 시각으로 질환의 근본 원인을 찾아냅니다.<br>• <b>Global Standard:</b> 북미, 유럽 등 선진 치료 시스템 도입<br>• <b>Dedicated Primary Physician:</b> 대표원장 1인 책임 진료", img:"images/values_01.jpg"}, 
                {t:"02. 포괄적이고 근본적인 접근", d:"<strong>[Comprehensive Approach]</strong><br>• <b>Beyond Pain:</b> 통증을 넘어 기능적 움직임까지 포괄적 분석<br>• <b>Personalized Care:</b> 환자 개개인의 상태와 라이프스타일을 고려한 '최적의 맞춤 치료 계획' 수립", img:"images/values_02.jpg"}, 
                {t:"03. 타협하지 않는 원칙과 환경", d:"<strong>[Principles & Environment]</strong><br>• <b>Safety & Cleanliness:</b> 3년 연속 안심병원 선정, 쾌적한 치유 공간<br>• <b>Advanced Technology:</b> 대학병원급 최신 첨단 장비 투자<br>• <b>Transparent Policy:</b> 정직한 가격 정책, 과잉 진료 지양", img:"images/values_03.jpg"}, 
                {t:"04. 진정한 환자 중심의 소통과 동행", d:"<strong>[Patient-Centered Communication & Partnership]</strong><br>• <b>Clear Explanation:</b> 환자의 눈높이에서 명확한 설명<br>• <b>Shared Decision Making:</b> 치료 옵션 투명 제공 및 공동 결정<br>• <b>Treatment Roadmap:</b> 장기적인 치료 방향성과 목표 공유", img:"images/values_04.jpg"} 
            ] 
        },
        // 03. Diagnostic Tools
        diagnosis: { 
            title: "Diagnostic Tools", 
            desc: "<strong>정확한 진단이 완치의 시작입니다.</strong><br>최첨단 진단 장비에 아낌없이 투자하여 통증의 근본 원인을 빠르고 정확하게 찾아냅니다.<br><br><strong>★ 우리의 원칙: 모든 시술의 영상 가이드화</strong><br>(Image-Guided Injection)<br>감이나 경험에만 의존하는 '블라인드 주사'를 지양합니다. 모든 시술은 초음파나 C-arm 실시간 영상을 보며 진행하여 독보적인 안전성을 확보합니다.", 
            modalImg: "images/diagnosis.jpg", 
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
            desc: "<strong>통증을 넘어, 근본적인 기능 회복을 위한 통합 치료 솔루션</strong><br>재활의학과와 정형외과의 전문성을 더해 근본적인 원인 해결을 목표로 합니다.<br>대학병원급 최첨단 장비와 숙련된 노하우를 바탕으로 최적화된 맞춤형 통합 치료를 제공합니다.<br><br><strong>[서울본재활의학과의 3가지 약속]</strong><br>• <b>엄격한 재료의 선정 (Strict Standard):</b> 검증된 최상의 재료만 사용<br>• <b>실시간 맞춤 처방 (Real-time Customization):</b> 매 내원 시 상태에 따른 최적 배합<br>• <b>근본을 보는 통찰 (Insight for Cause):</b> 구조와 기능을 바로잡는 근본 치유", 
            modalImg: "images/treatment.jpg", 
            details: [ 
                { t: "01. 정밀 영상 유도 주사 치료", d: `<strong>[Precision Image-Guided Injection]</strong><br><i>\"보면서 치료하는 정확함, 안전하고 빠른 통증 해결\"</i><br><br>모든 주사 치료는 초음파나 C-arm 실시간 영상을 통해 타겟 부위를 확인하며 정확하게 투여합니다.<br>• <b>초음파 유도하 주사:</b> 인대, 힘줄 손상 부위에 정확히 주사 (프롤로, DNA 등)<br>• <b>C-arm 중재술:</b> 척추 심부 신경 주변의 염증과 부종을 가라앉히는 정밀 시술`, img: "images/treatment_injection.jpg" },
                { t: "02. 첨단 특수 물리·재생 치료", d: `<strong>[Advanced Modality & Regenerative Therapy]</strong><br><i>\"대학병원급 하이엔드 장비를 이용한 비수술적 재생 관리\"</i><br><br>• <b>체외충격파 (ESWT):</b> 혈관 재형성 유도 및 힘줄/조직 재생 촉진<br>• <b>고강도 레이저 (HILT):</b> 깊은 조직까지 에너지 전달, 통증 감소 및 회복 촉진<br>• <b>스크램블러 테라피:</b> 난치성 만성 통증 신호를 무통증 신호로 전환<br>• <b>자기장 치료:</b> 심부 근육 경직 이완 및 신경 세포 자극`, img: "images/treatment_modality.jpg" },
                { t: "03. 도수 및 재활 운동 치료", d: `<strong>[Manual Therapy & Rehabilitation Exercise]</strong><br><i>\"무너진 신체 밸런스를 바로잡아 재발을 막는 근본 해결책\"</i><br><br>• <b>1:1 도수 치료:</b> 전문 치료사가 굳어진 관절을 풀고 척추/골반 정렬 교정<br>• <b>맞춤 재활 운동:</b> 약해진 근력 강화 및 가동 범위 회복, 재발 방지`, img: "images/treatment_manual.jpg" }
            ] 
        },
        // 05. Cell Therapy (PRP)
        prp: { 
            title: "Cell Therapy (PRP)", 
            desc: "<strong>\"내 혈액 속 치유 성분으로 손상된 조직을 깨우다\"</strong><br>환자 본인의 혈액에서 치유와 재생을 담당하는 '성장인자'만을 고농도로 농축하여,<br>손상된 인대·힘줄·연골 부위에 직접 주사하는 최신 재생 치료법입니다.<br><br><strong>[핵심 특징]</strong><br>• <b>안전성:</b> 내 혈액 사용으로 거부 반응/부작용 최소화<br>• <b>근본 치료:</b> 약해진 조직 자체를 튼튼하게 재생<br>• <b>강력한 재생:</b> 3~5배 농축된 성장인자로 자연 치유력 극대화", 
            modalImg: "images/prp.jpg", 
            details: [ 
                { t: "치료 대상 (Indication)", d: `<i>\"잘 낫지 않고 반복되는 만성 통증에 효과적입니다\"</i><br>물리치료나 약물, 스테로이드에 반응이 없는 만성 환자분께 권장됩니다.<br><br>• <b>팔꿈치:</b> 테니스엘보, 골프엘보<br>• <b>무릎:</b> 초기/중기 관절염, 연골 손상<br>• <b>힘줄/인대:</b> 회전근개 건염, 아킬레스 건염, 손목/발목 건초염`, img: "images/prp_indication.jpg" },
                { t: "치료 과정 (Process)", d: `<i>\"당일 검사부터 시술까지, 약 30분~1시간 소요\"</i><br><br><b>STEP 1. 채혈:</b> 환자의 팔에서 소량(20~30cc) 채혈<br><b>STEP 2. 농축:</b> 특수 키트로 고농도 PRP 분리 (약 15분)<br><b>STEP 3. 시술:</b> 초음파 유도하에 정밀 주사`, img: "images/prp_process.jpg" },
                { t: "시술 후 관리 (Post Care)", d: `<i>\"치료 효과를 극대화하고 빠른 회복을 돕는 가이드\"</i><br><br>• <b>초기 반응:</b> 시술 후 2~3일간 뻐근함이나 화끈거림은 정상 치유 과정입니다.<br>• <b>휴식:</b> 약 1주일간 격렬한 운동이나 과사용을 피해주세요.`, img: "images/prp_care.jpg" },
                { t: "효과 극대화 전략", d: `<i>\"PRP의 재생 효과를 돕는 병행 치료\"</i><br><br>• <b>재생 촉진:</b> 체외충격파(ESWT), 고강도레이저(HILT)<br>• <b>통증 관리:</b> 크라이오(냉각치료)로 급성 통증 감소<br>• <b>기능 회복:</b> 도수치료 병행 시 재발률 감소`, img: "images/prp_strategy.jpg" }
            ] 
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