/**
 * script.js 의 DEFAULT_PROJECTS / PROJECT_DISPLAY_ORDER 를
 * react-app constants.js 와 동기화합니다 (UTF-8).
 */
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const scriptPath = join(root, 'script.js')
const constantsPath = join(root, 'react-app', 'src', 'lib', 'projects', 'constants.js')

const { DEFAULT_PROJECTS, PROJECT_DISPLAY_ORDER } = await import(
  pathToFileURL(constantsPath).href
)

function jsString(s) {
  return (
    "'" +
    String(s)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r/g, '')
      .replace(/\n/g, '\\n') +
    "'"
  )
}

function formatProject(p) {
  const chunks = []
  const emit = (k, multiline) => {
    if (!(k in p)) return
    const v = p[k]
    if (multiline) {
      chunks.push(`      ${k}:\n        ${jsString(v)}`)
    } else {
      chunks.push(`      ${k}: ${jsString(v)}`)
    }
  }
  emit('title')
  emit('titleEn')
  emit('description', true)
  emit('descriptionEn', true)
  emit('tags')
  emit('demoUrl')
  emit('codeUrl')
  emit('image')
  emit('projectType')
  if ('institution' in p && p.institution) emit('institution')
  if ('institutionEn' in p && p.institutionEn) emit('institutionEn')
  const body = chunks.join(',\n') + '\n'
  return `    {\n${body}    }`
}

function replaceProjectArray(src, markerVar, arrayLiteral) {
  const startMarker = `  var ${markerVar} = `
  const start = src.indexOf(startMarker)
  if (start < 0) throw new Error(`Missing: ${markerVar}`)
  let i = start + startMarker.length
  while (i < src.length && /[\s\r\n]/.test(src[i])) i++
  if (src[i] !== '[') throw new Error(`Expected [ after ${markerVar}`)
  let depth = 0
  for (; i < src.length; i++) {
    const c = src[i]
    if (c === '[') depth++
    else if (c === ']') {
      depth--
      if (depth === 0) {
        let j = i + 1
        if (src[j] === ';') j++
        while (j < src.length && src[j] === ' ') j++
        if (src[j] === '\r') j++
        if (src[j] === '\n') j++
        const newBlock = startMarker + arrayLiteral + ';\n'
        return src.slice(0, start) + newBlock + src.slice(j)
      }
    }
  }
  throw new Error(`Unclosed array: ${markerVar}`)
}

let script = readFileSync(scriptPath, 'utf8')

const projectsInner =
  '[\n' + DEFAULT_PROJECTS.map((p) => formatProject(p)).join(',\n') + '\n  ]'
script = replaceProjectArray(script, 'DEFAULT_PROJECTS', projectsInner)

const orderInner =
  '[\n' +
  PROJECT_DISPLAY_ORDER.map((t) => `    ${jsString(t)}`).join(',\n') +
  '\n  ]'
script = replaceProjectArray(script, 'PROJECT_DISPLAY_ORDER', orderInner)

writeFileSync(scriptPath, script, 'utf8')
console.log('Updated script.js DEFAULT_PROJECTS + PROJECT_DISPLAY_ORDER (UTF-8).')
