/**
 * 수상( Award 섹션 ) — 발급처가 같은 행은 rowspan
 * `pdf`: GitHub Pages `PDF/` 기준 상대 경로 (`portfolioPages.pdfFromPages` 인자)
 */
export const awardGroups = [
  {
    issuer: '알파코 (Alphaco)',
    items: [
      {
        date: '2025.07',
        title: '학습 우수상',
        pdf: '수상/알파코 학습 우수상.pdf',
      },
      {
        date: '2025.07',
        title: '자연어 처리(NLP) 및 LLM 프로젝트 우수상',
        pdf: '수상/알파코 프로젝트 우수상.pdf',
      },
      {
        date: '2025.08',
        title: '태도 우수 교육상',
        pdf: '수상/알파코 태도 우수상.pdf',
      },
      {
        date: '2025.11',
        title: '출석 우수상',
        pdf: '수상/알파코 출석 우수상.pdf',
      },
    ],
  },
  {
    issuer: '휴먼 AI 교육센터',
    items: [
      { date: '2026.03', title: '개근상', pdf: '수상/휴먼 개근상.pdf' },
      {
        date: '2026.03',
        title: '자동화 프로젝트 최우수상',
        pdf: '수상/휴먼 자동화 프로젝트 최우수상.pdf',
      },
    ],
  },
]
