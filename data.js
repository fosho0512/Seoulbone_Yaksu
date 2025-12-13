/* [SEOUL BONE 홈페이지 내용 관리 파일] */

const siteData = {
    // 1. 하단 배너 설정
    banner: {
        show: true,
        badge: "EVENT",
        text: "개원 3주년 기념 — 우리동네 안심병원 3년 연속 선정 감사 이벤트",
        linkText: "자세히 보기 →",
        linkUrl: "https://blog.naver.com/"
    },

    // 2. 메뉴별 내용
    content: {
        diagnosis: { 
            title: "Scientific Diagnosis", 
            desc: "정확한 진단은 치료의 첫 단계입니다.<br>신경·근육·관절을 전인적으로 평가하여<br>통증의 근본 원인을 찾아냅니다.", 
            modalImg: "images/diagnosis.jpg", 
            details: [ 
                {t:"High-End Ultrasound", d:"대학병원급 초음파 3대", img:"https://images.unsplash.com/photo-1633451811257-156362242340?q=80&w=1000"}, 
                {t:"C-arm Fluoroscopy", d:"정밀 영상 주사 치료", img:"https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000"}, 
                {t:"EMG / NCS", d:"신경근전도검사 전문의 시행", img:"https://images.unsplash.com/photo-1576091160550-21736e385e75?q=80&w=1000"}, 
                {t:"Low Dose X-ray", d:"저선량 디지털 X-ray", img:"https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000"} 
            ] 
        },
        philosophy: { 
            title: "Our Philosophy", 
            desc: "근육·신경·관절의 균형을 회복합니다.<br>불필요한 치료는 하지 않으며,<br>청결과 안전을 최우선으로 합니다.", 
            modalImg: "images/philosophy.jpg", 
            details: [ 
                {t:"Steroid-Free", d:"조직 재생 중심 치료", img:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"}, 
                {t:"Safety First", d:"안심병원 및 감염 관리", img:"https://images.unsplash.com/photo-1584516150909-c4348361804f?q=80&w=1000"}, 
                {t:"Integrity", d:"1인 전문의 책임 진료", img:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000"}, 
                {t:"Transparent", d:"투명한 비급여 정책", img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000"} 
            ] 
        },
        facility: { 
            title: "Advanced Facility", 
            desc: "보다 정밀한 치료를 위한 준비.<br>대학병원 수준의 장비와<br>호텔 같은 쾌적한 시설을 경험하세요.", 
            modalImg: "images/facility.jpg", 
            details: [ 
                {t:"Treatment Space", d:"프라이빗 도수치료실", img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"}, 
                {t:"Diagnostic Equip", d:"최신 진단 장비 완비", img:"https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000"}, 
                {t:"Therapy Tools", d:"오리지널 치료 장비 사용", img:"https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1000"}, 
                {t:"Clean Air", d:"공기 청정 시스템 가동", img:"https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1000"} 
            ] 
        },
        treatment: { 
            title: "Treatments", 
            desc: "수술 없이 회복할 수 있는 길.<br>근육과 신경, 구조와 기능을<br>함께 바라보는 통합 치료입니다.", 
            modalImg: "images/treatment.jpg", 
            details: [ 
                {t:"Spine & Joint", d:"척추 관절 비수술 치료", img:"https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000"}, 
                {t:"Special Therapy", d:"체외충격파, 고강도레이저", img:"https://images.unsplash.com/photo-1579684453423-f8434c0c9594?q=80&w=1000"}, 
                {t:"Injection", d:"초음파 유도하 주사치료", img:"https://images.unsplash.com/photo-1609188076864-c35269136b09?q=80&w=1000"}, 
                {t:"Physical Therapy", d:"맞춤형 물리치료", img:"https://images.unsplash.com/photo-1574680178000-97a030959003?q=80&w=1000"} 
            ] 
        },
        recovery: { 
            title: "Functional Recovery", 
            desc: "기능 회복은 통증 감소 그 이상입니다.<br>잃어버린 움직임의 질을<br>다시 되찾아 드립니다.", 
            modalImg: "images/recovery.jpg", 
            details: [ 
                {t:"Manual Therapy", d:"1:1 전담 도수치료", img:"https://images.unsplash.com/photo-1579126030957-24544435945b?q=80&w=1000"}, 
                {t:"Rehabilitation", d:"수술 후/스포츠 재활", img:"https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000"}, 
                {t:"Exercise", d:"자가 운동 및 자세 교정", img:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"}, 
                {t:"Lifestyle", d:"생활 습관 코칭", img:"https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=1000"} 
            ] 
        },
        prp: { 
            title: "PRP Cell Therapy", 
            desc: "스테로이드 없이 조직 회복 촉진.<br>PRP는 손상된 힘줄·인대·근육을<br>재생하는 근본적인 치료입니다.", 
            modalImg: "images/prp.jpg", 
            details: [ 
                {t:"Mechanism", d:"성장인자 이용 조직 재생", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000"}, 
                {t:"Indication", d:"테니스엘보, 회전근개 등", img:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000"}, 
                {t:"Precision", d:"초음파 유도 정밀 주사", img:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1000"}, 
                {t:"Safety", d:"부작용 없는 자가 혈액", img:"https://images.unsplash.com/photo-1535378917042-9527b6f03e03?q=80&w=1000"} 
            ] 
        }
    }
};