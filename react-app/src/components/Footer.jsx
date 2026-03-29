import { useLanguage } from '../i18n/LanguageContext.jsx'

export function Footer({ ownerMode, onOwnerToggle }) {
  const year = new Date().getFullYear()
  const { lang, setLang, t } = useLanguage()

  return (
    <footer className="footer">
      <p className="footer-line">
        © {year} Roy Koh. {t('footer.rights')}{' '}
        <span id="ownerModeWrap">
          <button
            type="button"
            className="footer-owner-link"
            id="ownerModeToggle"
            onClick={onOwnerToggle}
          >
            {ownerMode ? t('footer.ownerOn') : t('footer.ownerOff')}
          </button>
        </span>
      </p>
      <p className="footer-lang" role="group" aria-label={t('footer.langAria')}>
        <button
          type="button"
          className={`footer-lang-btn${lang === 'ko' ? ' is-active' : ''}`}
          aria-pressed={lang === 'ko'}
          onClick={() => setLang('ko')}
        >
          {t('footer.langKo')}
        </button>
        <span className="footer-lang-sep" aria-hidden="true">
          /
        </span>
        <button
          type="button"
          className={`footer-lang-btn${lang === 'en' ? ' is-active' : ''}`}
          aria-pressed={lang === 'en'}
          onClick={() => setLang('en')}
        >
          {t('footer.langEn')}
        </button>
      </p>
    </footer>
  )
}
