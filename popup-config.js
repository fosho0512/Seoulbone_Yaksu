/* ============================================
   팝업 설정 파일 (POPUP CONFIGURATION)
   - 이 파일만 수정하면 팝업을 관리할 수 있습니다
   - 수정 후 배포하면 적용됩니다
   ============================================ */

const popupConfig = {
    // ▶ 팝업 표시 여부 (true: 표시 / false: 숨김)
    enabled: true,

    // ▶ 표시 기간 설정 (빈 문자열이면 무시)
    schedule: {
        start: "", // 시작일 예시: "2026-02-01"
        end: "", // 종료일 예시: "2026-02-28"
    },

    // ▶ 팝업 목록 (order 숫자가 작을수록 먼저 표시)
    popups: [
        {
            image: "images/popup/popup_01.jpg", // 이미지 경로
            link: "", // 클릭시 이동할 링크
            order: 1, // 표시 순서
        },
        // 팝업 추가 예시:
        // {
        //     image: "images/popup/event2.webp",
        //     link: "https://example.com/",
        //     order: 2
        // }
    ],

    // ▶ 팝업 위치 ("center" / "bottom-right" / "bottom-left")
    position: "center",

    // ▶ 하루에 한번만 표시 (true: 오늘 하루 안보기 / false: 매번 표시)
    showOncePerDay: true,
};
