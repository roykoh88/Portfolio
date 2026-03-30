import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * `/img/*` 는 저장소 루트 `Portfolio/img` 한 곳만 원본으로 씁니다.
 * (react-app/public/img 이중 관리·react-app/dist/img 빌드 산출 제외하면 실질 원본은 1개)
 */
function portfolioRootImgPlugin() {
  const repoRoot = path.resolve(__dirname, '..')
  const imgRoot = path.join(repoRoot, 'img')
  const imgRootResolved = path.resolve(imgRoot)

  return {
    name: 'portfolio-root-img',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split('?')[0] ?? ''
        if (!raw.startsWith('/img/')) return next()
        try {
          const decoded = decodeURIComponent(raw.slice('/img/'.length))
          if (!decoded || decoded.includes('..')) return next()
          const file = path.resolve(imgRootResolved, decoded)
          const rel = path.relative(imgRootResolved, file)
          if (rel.startsWith('..') || path.isAbsolute(rel)) return next()
          if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next()
          const ext = path.extname(file).toLowerCase()
          const mime =
            {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.webp': 'image/webp',
              '.gif': 'image/gif',
              '.svg': 'image/svg+xml',
              '.ico': 'image/x-icon',
            }[ext] || 'application/octet-stream'
          res.setHeader('Content-Type', mime)
          fs.createReadStream(file).pipe(res)
        } catch {
          next()
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), portfolioRootImgPlugin()],
  resolve: {
    alias: {
      '@legacy': path.resolve(__dirname, '..'),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
})
