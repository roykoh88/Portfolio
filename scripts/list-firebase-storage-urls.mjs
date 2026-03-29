/**
 * Storage 여러 폴더(접두사) 아래 파일의 "객체 경로"와 "다운로드 토큰"을 한 번에 출력합니다.
 *
 * 준비:
 * 1) Firebase 콘솔 → 프로젝트 설정 → 서비스 계정 → "새 비공개 키 생성" → JSON 저장
 * 2) PowerShell 예시:
 *    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\경로\서비스계정.json"
 * 3) 루트에서: npm install   (최초 1회)
 * 4) npm run storage:list
 *
 * 환경 변수:
 * - STORAGE_PREFIX      : 폴더 하나만 (예: 학원 수료증/) — 예전과 동일
 * - STORAGE_PREFIXES    : 쉼표로 여러 개 (예: 수상/,자격증/) — 기본 목록 대신 사용
 * - FIREBASE_STORAGE_BUCKET : 버킷 호스트명 (기본: yjkohproject.firebasestorage.app)
 */

import { readFileSync } from 'node:fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'

const BUCKET =
  process.env.FIREBASE_STORAGE_BUCKET || 'yjkohproject.firebasestorage.app'

const DEFAULT_PREFIXES = [
  '학원 수료증/',
  '수상/',
  '이수증/',
  '자격증/',
]

function normalizePrefix(p) {
  const s = (p || '').trim()
  if (!s) return ''
  return s.endsWith('/') ? s : `${s}/`
}

function resolvePrefixes() {
  const single = process.env.STORAGE_PREFIX?.trim()
  if (single) return [normalizePrefix(single)].filter(Boolean)

  const multi = process.env.STORAGE_PREFIXES?.trim()
  if (multi) {
    return multi
      .split(',')
      .map((x) => normalizePrefix(x))
      .filter(Boolean)
  }

  return DEFAULT_PREFIXES
}

const keyPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  process.env.FIREBASE_SERVICE_ACCOUNT

if (!keyPath) {
  console.error(
    'GOOGLE_APPLICATION_CREDENTIALS(또는 FIREBASE_SERVICE_ACCOUNT)에 서비스 계정 JSON 경로를 지정하세요.',
  )
  process.exit(1)
}

const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8'))

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: BUCKET,
})

const bucket = getStorage().bucket(BUCKET)
const prefixes = resolvePrefixes()

console.log(
  '# 폴더별로 "경로<TAB>토큰" (firebaseStorageDownloadUrl 또는 전체 URL 조합에 사용)\n',
)

let total = 0
for (const PREFIX of prefixes) {
  const [files] = await bucket.getFiles({ prefix: PREFIX })
  const list = files.filter((f) => !f.name.endsWith('/'))

  console.log(`\n## ${PREFIX} (${list.length}개)`)
  if (!list.length) {
    console.log('# (파일 없음)')
    continue
  }

  for (const f of list) {
    const [meta] = await f.getMetadata()
    const raw = meta.metadata?.firebaseStorageDownloadTokens
    if (!raw) {
      console.error(`# 토큰 없음(건너뜀): ${f.name}`)
      continue
    }
    const token = raw.split(',')[0].trim()
    console.log(`${f.name}\t${token}`)
    total += 1
  }
}

if (total === 0) {
  console.error('\n어떤 접두사에도 토큰이 있는 파일이 없습니다.')
  process.exit(1)
}

console.log(`\n# 합계: ${total}개 파일`)
