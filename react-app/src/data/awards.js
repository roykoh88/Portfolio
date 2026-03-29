/**
 * 수상( Award 섹션 ) — 발급처가 같은 행은 rowspan
 * `pdf`: GitHub Pages `PDF/` 기준 상대 경로 (`portfolioPages.pdfFromPages` 인자)
 * `titleEn` / `issuerEn`: 영어 UI 표기
 */
export const awardGroups = [
  {
    issuer: '알파코 (Alphaco)',
    issuerEn: 'Alphaco',
    items: [
      {
        date: '2025.07',
        title: '학습 우수상',
        titleEn: 'Excellence Award — Learning',
        pdf: '수상/알파코 학습 우수상.pdf',
      },
      {
        date: '2025.07',
        title: '자연어 처리(NLP) 및 LLM 프로젝트 우수상',
        titleEn: 'Excellence Award — NLP & LLM Project',
        pdf: '수상/알파코 프로젝트 우수상.pdf',
      },
      {
        date: '2025.08',
        title: '태도 우수 교육상',
        titleEn: 'Excellence Award — Attitude',
        pdf: '수상/알파코 태도 우수상.pdf',
      },
      {
        date: '2025.11',
        title: '출석 우수상',
        titleEn: 'Excellence Award — Attendance',
        pdf: '수상/알파코 출석 우수상.pdf',
      },
    ],
  },
  {
    issuer: '휴먼 AI 교육센터',
    issuerEn: 'Human AI Training Center',
    items: [
      {
        date: '2026.03',
        title: '개근상',
        titleEn: 'Perfect Attendance Award',
        pdf: '수상/휴먼 개근상.pdf',
      },
      {
        date: '2026.03',
        title: '자동화 프로젝트 최우수상',
        titleEn: 'Grand Prize — Automation Project',
        pdf: '수상/휴먼 자동화 프로젝트 최우수상.pdf',
      },
    ],
  },
]
