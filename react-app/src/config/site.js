/**
 * 레거시 정적 HTML (배포 시 /html/)
 * 로컬 전용 주소가 필요하면 .env 에 VITE_LEGACY_HTML_URL 로 지정
 */
export const LEGACY_HTML_URL =
  import.meta.env.VITE_LEGACY_HTML_URL ?? 'https://yjkohproject.web.app/html/'

/** UI에 호스트만 짧게 보여 줄 때 (예: yjkohproject.web.app) */
export function hostFromUrl(url) {
  try {
    return new URL(url).host
  } catch {
    return String(url)
      .replace(/^https?:\/\//i, '')
      .split('/')[0]
      .split('?')[0] || url
  }
}
