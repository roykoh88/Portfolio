/**
 * public/img/고용재_사진.jpg + public/img/로고.png → public/img/hero-combined.png
 * 가로 배치: 왼쪽 정사각 프로필(cover) · 간격 · 오른쪽 로고 (검은 배경)
 */
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imgDir = join(__dirname, '..', 'public', 'img')
const photoPath = join(imgDir, '고용재_사진.jpg')
const logoPath = join(imgDir, '로고.png')
const outPath = join(imgDir, 'hero-combined.png')

if (!existsSync(photoPath) || !existsSync(logoPath)) {
  console.error('combine-hero-assets: 고용재_사진.jpg 또는 로고.png 가 public/img 에 없습니다.')
  process.exit(1)
}

const photoSide = 380
const gap = 28
/** 로고는 프로필보다 낮게 (참고 레이아웃) */
const logoTargetH = Math.round(photoSide * 0.38)

const photoBuf = await sharp(photoPath)
  .resize(photoSide, photoSide, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer()

const logoBuf = await sharp(logoPath)
  .resize(null, logoTargetH, { fit: 'inside' })
  .png()
  .toBuffer()

const lm = await sharp(logoBuf).metadata()
const lw = lm.width ?? 0
const lh = lm.height ?? 0

const totalW = photoSide + gap + lw
const totalH = Math.max(photoSide, lh)
const photoY = Math.round((totalH - photoSide) / 2)
const logoY = Math.round((totalH - lh) / 2)

await sharp({
  create: {
    width: totalW,
    height: totalH,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
})
  .composite([
    { input: photoBuf, left: 0, top: photoY },
    { input: logoBuf, left: photoSide + gap, top: logoY },
  ])
  .png()
  .toFile(outPath)

console.log('written', outPath, `${totalW}×${totalH}`)
