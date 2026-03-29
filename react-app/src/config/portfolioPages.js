/**
 * 저장소 PDF는 GitHub Pages 배포본 기준으로 연다.
 * 커스텀 도메인·저장소명이 바뀌면 이 값만 수정하면 된다.
 */
export const PORTFOLIO_PAGES_ORIGIN = 'https://roykoh88.github.io/Portfolio'

/** @param {string} relativePathUnderPdf 예: "이수증/이수증_1.pdf" */
export function pdfFromPages(relativePathUnderPdf) {
  const tail = relativePathUnderPdf.split('/').map((seg) => encodeURIComponent(seg)).join('/')
  return `${PORTFOLIO_PAGES_ORIGIN}/PDF/${tail}`
}
