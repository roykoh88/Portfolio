import { LEGACY_HTML_URL, hostFromUrl } from '../config/site'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
]

export function Header({ theme, onThemeToggle, navOpen, onNavOpenChange }) {
  const isLight = theme === 'light'

  return (
    <header className="header">
      <nav className={`nav${navOpen ? ' nav-open' : ''}`}>
        <a href="#home" className="logo">
          Roy Koh
        </a>
        <ul className="nav-links">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => onNavOpenChange(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <a
            href={LEGACY_HTML_URL}
            className="legacy-html-link"
            target="_blank"
            rel="noopener noreferrer"
            title={`정적 HTML 버전 (${LEGACY_HTML_URL})`}
          >
            <span className="nav-cross-label">정적 HTML</span>
            <span className="nav-cross-url">{hostFromUrl(LEGACY_HTML_URL)}</span>
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={isLight ? '다크 모드로 전환' : '라이트 모드로 전환'}
            title={isLight ? '다크 모드' : '라이트 모드'}
          >
            {isLight ? '🌙' : '☀️'}
          </button>
          <button
            type="button"
            className="nav-toggle"
            aria-label={navOpen ? '메뉴 닫기' : '메뉴 열기'}
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
