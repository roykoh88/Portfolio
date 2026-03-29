/**
 * Vite 빌드 후 레거시 정적 자산을 react-app/dist/html 에 복사합니다.
 * Firebase Hosting public = react-app/dist → / 는 React, /html/* 는 레거시.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'react-app', 'dist')
const destHtml = path.join(dist, 'html')

const LEGACY_FILES = ['index.html', 'styles.css', 'script.js', '404.html']
const LEGACY_DIRS = ['img', 'PDF']

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, ent.name)
    const to = path.join(dest, ent.name)
    if (ent.isDirectory()) copyDirRecursive(from, to)
    else fs.copyFileSync(from, to)
  }
}

function main() {
  if (!fs.existsSync(dist)) {
    console.error('prepare-hosting: react-app/dist 가 없습니다. 먼저 npm run build 를 실행하세요.')
    process.exit(1)
  }

  fs.mkdirSync(destHtml, { recursive: true })

  for (const name of LEGACY_FILES) {
    const src = path.join(root, name)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(destHtml, name))
      console.log('copy', name, '→ html/')
    }
  }

  for (const name of LEGACY_DIRS) {
    const src = path.join(root, name)
    if (fs.existsSync(src)) {
      copyDirRecursive(src, path.join(destHtml, name))
      console.log('copy', name + '/', '→ html/')
    }
  }

  const calculatorSrc = path.join(root, 'calculator')
  if (fs.existsSync(calculatorSrc)) {
    copyDirRecursive(calculatorSrc, path.join(dist, 'calculator'))
    console.log('copy calculator/ → dist/calculator/')
  }
}

main()
