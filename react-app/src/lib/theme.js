const THEME_KEY = 'portfolioTheme'

export function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

export function persistTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
}
