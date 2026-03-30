/**
 * 저장소 루트 Portfolio/img → react-app/dist/img (프로덕션 /img/* 정적 제공용)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootImg = path.resolve(__dirname, '..', '..', 'img')
const distImg = path.resolve(__dirname, '..', 'dist', 'img')

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, ent.name)
    const to = path.join(dest, ent.name)
    if (ent.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

if (!fs.existsSync(rootImg)) {
  console.warn('copy-root-img: 루트 img/ 폴더가 없습니다.')
  process.exit(0)
}
if (!fs.existsSync(path.resolve(__dirname, '..', 'dist'))) {
  console.error('copy-root-img: 먼저 vite build 를 실행하세요.')
  process.exit(1)
}
copyDir(rootImg, distImg)
console.log('copy-root-img: Portfolio/img → react-app/dist/img')
