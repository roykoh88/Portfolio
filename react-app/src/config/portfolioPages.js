/**
 * 저장소 PDF는 GitHub Pages 배포본 기준으로 연다.
 * 커스텀 도메인·저장소명이 바뀌면 이 값만 수정하면 된다.
 */
export const PORTFOLIO_PAGES_ORIGIN = 'https://roykoh88.github.io/Portfolio'

/** Firebase Storage 버킷 (콘솔 gs://… 와 동일한 호스트명) */
const FIREBASE_STORAGE_BUCKET = 'yjkohproject.firebasestorage.app'

/**
 * `npm run storage:list` 로 뽑은 경로 → 액세스 토큰 (콘솔에서 토큰 재발급 시 여기만 갱신)
 */
const FIREBASE_STORAGE_DOWNLOAD_TOKENS = {
  '학원 수료증/AI개발자 수료증.pdf': '73eae910-2ff1-4e92-bac5-e4d10848abe8',
  '학원 수료증/네트워크 수료증.pdf': 'ade03022-8624-4dec-bb00-0dc8d18c1433',
  '학원 수료증/데이터 분석 수료증.pdf': '9ee71e23-cb49-494d-b2bf-25ae143fc38e',
  '학원 수료증/도커 & 쿠버 수료증.pdf': '976bea00-eba5-4a42-b7b6-4966ea8f67aa',
  '학원 수료증/리눅스 수료증.pdf': 'e4615cda-2181-4c37-af9b-c528293eb836',
  '학원 수료증/리눅스1 수료증.pdf': '11887c51-8313-41d6-bf99-03bfa94a8bc5',
  '학원 수료증/리눅스2 수료증.pdf': '4926ba48-bc9c-4956-8497-3c82b88e9062',
  '학원 수료증/서버 구성 수료증.pdf': '2698a634-dca3-490c-8360-4b2bdff60251',
  '학원 수료증/서버 구성1회차 수료증.pdf': '53227cd9-b2c1-4ae4-b35d-d3b70baa15a4',
  '학원 수료증/씨스코1 수료증.pdf': 'b50426ac-31fe-46b7-85b7-077b0134eadc',
  '학원 수료증/씨스코2 수료증.pdf': 'ad62f147-c2ff-4560-a0b0-163a049ffcaf',
  '학원 수료증/정보보안1 수료증.pdf': '1cf18e55-42a8-45e1-b796-a76a8d04b60d',
  '학원 수료증/정보보안2 수료증.pdf': '05f57cc9-b1d2-40c1-9a02-6c1edb69d50e',
  '학원 수료증/정보보안3 수료증.pdf': 'e31a6f01-0a52-4e5e-bc45-6238fc8e834c',
  '학원 수료증/정보보안4 수료증.pdf': '7a287b93-891a-4130-84ac-e5797654a8e2',
  '학원 수료증/정보보안5 수료증.pdf': 'ff083384-e059-4668-8e5d-b3127ff5c696',
  '학원 수료증/정보보안6 수료증.pdf': '9fe86d78-90ff-4298-9e53-610efdc1acde',
  '학원 수료증/프론트&백엔드풀스택개발자 수료증.pdf': '252cd855-d890-4152-a918-17a9f9484f4c',
  '수상/알파코 출석 우수상.pdf': 'f44b0c3c-9b20-4f54-a002-29fcd63415ea',
  '수상/알파코 태도 우수상.pdf': 'ce6f46f5-eddf-4c7c-8027-879c82ed0379',
  '수상/알파코 프로젝트 우수상.pdf': '23ab1ea8-fbd9-4f8f-bc3b-e5426022d2a8',
  '수상/알파코 학습 우수상.pdf': '5aa0844c-a7ee-445f-bc77-990467e11fdb',
  '수상/휴먼 개근상.pdf': 'fd03a002-9ccf-4587-961d-ded3f16495a4',
  '수상/휴먼 자동화 프로젝트 최우수상.pdf': '51c0dd68-c878-45bb-98b1-cfda96f39f36',
  '이수증/이수증_1.pdf': 'b81d29c8-f7ba-4930-ba9e-44afe510bbc0',
  '이수증/이수증_2.pdf': '03456b8c-f420-47ad-843d-716b5049eef8',
  '이수증/이수증_3.pdf': '85c65fe8-897a-4a88-a54f-d678a58f832e',
  '이수증/이수증_4.pdf': 'b52c1575-f47b-44d3-bb04-0e3ec626187c',
  '이수증/이수증_5.pdf': 'e5404eef-4989-42f0-9914-e16b4990e620',
  '이수증/이수증_6.pdf': '8125b6e5-f45e-425e-a5fd-ebd017dc1ccb',
  '이수증/이수증_7.pdf': 'e82effb3-2185-44b6-bf95-5a40b02e46be',
  '이수증/이수증_8.pdf': '87088659-8b5c-46e1-aa64-179057140b15',
  '이수증/이수증_9.pdf': '9070210f-7d85-4a66-974f-97a0af11802e',
  '이수증/이수증_10.pdf': '909f4d58-2527-4d00-b104-a2981aad683a',
  '이수증/이수증_11.pdf': '35e9a9e7-b02f-421f-8b4f-c973326f3113',
  '자격증/리눅스마스터.pdf': 'ebe7ac59-f1c4-4ea1-840a-ad904fc66a55',
}

/**
 * Firebase Storage에 올린 파일의 HTTPS URL.
 * @param {string} objectPath 버킷 루트 기준 경로, 예: "학원 수료증/AI개발자 수료증.pdf"
 * @param {string} downloadToken 콘솔 파일 상세의 액세스 토큰(UUID)
 */
export function firebaseStorageDownloadUrl(objectPath, downloadToken) {
  const encoded = encodeURIComponent(objectPath)
  return `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encoded}?alt=media&token=${downloadToken}`
}

/**
 * 데이터에 쓰는 상대 경로(학원 수료증/…, 수상/… 등) → 실제 열 URL.
 * `FIREBASE_STORAGE_DOWNLOAD_TOKENS`에 있으면 Firebase, 없으면 GitHub Pages `PDF/`.
 */
export function portfolioPdfUrl(relativePathUnderPdf) {
  const token = FIREBASE_STORAGE_DOWNLOAD_TOKENS[relativePathUnderPdf]
  if (token) {
    return firebaseStorageDownloadUrl(relativePathUnderPdf, token)
  }
  return pdfFromPages(relativePathUnderPdf)
}

/** @param {string} relativePathUnderPdf 예: "이수증/이수증_1.pdf" */
export function pdfFromPages(relativePathUnderPdf) {
  const tail = relativePathUnderPdf.split('/').map((seg) => encodeURIComponent(seg)).join('/')
  return `${PORTFOLIO_PAGES_ORIGIN}/PDF/${tail}`
}
