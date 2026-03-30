import {
  DEFAULT_PROJECTS,
  PROJECTS_KEY,
  PROJECT_DISPLAY_ORDER,
  SKIP_TITLES,
  defaultProjectByTitle,
} from './constants'

function mergeInstitutionFromDefaults(list) {
  let changed = false
  for (const p of list) {
    let def = defaultProjectByTitle(p.title)
    if (!def && p.titleEn) {
      def = defaultProjectByTitle(String(p.titleEn).trim())
    }
    if (!def) continue
    if (
      (!p.projectType || String(p.projectType).trim() === '') &&
      def.projectType
    ) {
      p.projectType = def.projectType
      changed = true
    }
    if (
      (!p.institution || String(p.institution).trim() === '') &&
      def.institution
    ) {
      p.institution = def.institution
      changed = true
    }
    if (
      (!p.institutionEn || String(p.institutionEn).trim() === '') &&
      def.institutionEn
    ) {
      p.institutionEn = def.institutionEn
      changed = true
    }
  }
  return changed
}

export function readProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    let list = raw ? JSON.parse(raw) : []

    if (DEFAULT_PROJECTS.length) {
      DEFAULT_PROJECTS.forEach((def) => {
        const exists = list.some((p) => (p.title || '') === (def.title || ''))
        if (!exists) list.push({ ...def })
      })
    }

    if (!raw && list.length) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(list))
    }

    const before = list.length
    list = list.filter((p) => !SKIP_TITLES.includes((p.title || '').trim()))
    if (list.length < before) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(list))
    }

    if (mergeInstitutionFromDefaults(list)) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(list))
    }

    return list
  } catch {
    return DEFAULT_PROJECTS.map((p) => ({ ...p }))
  }
}

export function writeProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
}

export function sortProjectsByDisplayOrder(list) {
  const order = PROJECT_DISPLAY_ORDER
  const ordered = []
  const rest = []
  list.forEach((p) => {
    const i = order.indexOf((p.title || '').trim())
    if (i >= 0) ordered.push({ p, i })
    else rest.push(p)
  })
  ordered.sort((a, b) => b.i - a.i)
  return [...ordered.map((x) => x.p), ...rest]
}

export function projectKey(p) {
  return `${p.title || ''}|${p.codeUrl || ''}|${p.demoUrl || ''}`
}

export function removeProjectFromList(list, p) {
  let idx = list.findIndex(
    (item) =>
      (item.title || '') === (p.title || '') &&
      (item.codeUrl || '') === (p.codeUrl || '') &&
      (item.demoUrl || '') === (p.demoUrl || '')
  )
  if (idx === -1) {
    idx = list.findIndex((item) => (item.title || '') === (p.title || ''))
  }
  if (idx >= 0) {
    const next = list.slice()
    next.splice(idx, 1)
    return next
  }
  return list
}
