/** Bbox Local Labeler 등 private 저장소: 코드 링크 클릭 시 확인 후 카카오 오픈채팅 */

export const KAKAO_OPEN_CHAT_URL = 'https://open.kakao.com/o/sVwpT3ni'

const PRIVATE_CODE_GITHUB_URL =
  'https://github.com/roykoh88/Auto_CV_Labeling'

export function isPrivateCodeGateUrl(codeUrl) {
  const u = String(codeUrl ?? '')
    .trim()
    .replace(/\/+$/, '')
  return u === PRIVATE_CODE_GITHUB_URL
}
