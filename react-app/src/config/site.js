/** 레거시 정적 사이트(index.html) URL — 로컬에서 띄운 경우 .env 에서 덮어쓰기 */
export const LEGACY_HTML_URL =
  import.meta.env.VITE_LEGACY_HTML_URL ?? 'https://yjkohproject.web.app/'
