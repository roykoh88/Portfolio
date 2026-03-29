import { LEGACY_HTML_URL } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const NAV_KEYS = [
  { href: '#about', key: 'about' },
  { href: '#education', key: 'education' },
  { href: '#projects', key: 'projects' },
  { href: '#skills', key: 'skills' },
  { href: '#awards', key: 'awards' },
  { href: '#certificates', key: 'certificates' },
  { href: '#contact', key: 'contact' },
]

export function Header({ theme, onThemeToggle, navOpen, onNavOpenChange }) {
  const isLight = theme === 'light'
  const { t } = useLanguage()
  const legacyTitle = `${t('header.legacyTitle')} (${LEGACY_HTML_URL})`

  return (
    <header className="header">
      <nav className={`nav${navOpen ? ' nav-open' : ''}`}>
        <a href="#home" className="logo">
          Roy Koh
        </a>
        <ul className="nav-links">
          {NAV_KEYS.map(({ href, key }) => (
            <li key={href}>
              <a href={href} onClick={() => onNavOpenChange(false)}>
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <a
            href={LEGACY_HTML_URL}
            className="legacy-html-icon"
            target="_blank"
            rel="noopener noreferrer"
            title={legacyTitle}
            aria-label={t('header.legacyAria')}
          >
            H
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={
              isLight ? t('header.themeToDark') : t('header.themeToLight')
            }
            title={isLight ? t('header.themeDark') : t('header.themeLight')}
          >
            {isLight ? '🌙' : '☀️'}
          </button>
          <button
            type="button"
            className="nav-toggle"
            aria-label={navOpen ? t('header.menuClose') : t('header.menuOpen')}
            onClick={() => onNavOpenChange(!navOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  )
}
