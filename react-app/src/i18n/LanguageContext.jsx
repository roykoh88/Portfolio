import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { messages } from './messages'
import { SKILL_GROUP_EN, SKILL_SUBTITLE_EN } from './skillLabels'

const LANG_STORAGE_KEY = 'portfolioLang'

/** @typedef {'ko'|'en'} Lang */

function readStoredLang() {
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY)
    if (raw === 'en' || raw === 'ko') return raw
  } catch {
    /* ignore */
  }
  return 'ko'
}

function getByPath(obj, path) {
  const parts = path.split('.')
  let cur = obj
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = cur[p]
  }
  return cur
}

function interpolate(str, vars) {
  if (!vars || typeof str !== 'string') return str
  return str.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  )
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang)

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'ko'
  }, [lang])

  const msg = useMemo(() => messages[lang], [lang])

  const t = useCallback(
    (path, vars) => {
      const value = getByPath(msg, path)
      if (typeof value === 'string') return interpolate(value, vars)
      return path
    },
    [msg],
  )

  const skillGroupTitle = useCallback(
    (title) => {
      if (lang === 'ko') return title
      return SKILL_GROUP_EN[title] ?? title
    },
    [lang],
  )

  const skillSubtitle = useCallback(
    (sub) => {
      if (!sub) return sub
      if (lang === 'ko') return sub
      return SKILL_SUBTITLE_EN[sub] ?? sub
    },
    [lang],
  )

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      msg,
      skillGroupTitle,
      skillSubtitle,
    }),
    [lang, setLang, t, msg, skillGroupTitle, skillSubtitle],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
