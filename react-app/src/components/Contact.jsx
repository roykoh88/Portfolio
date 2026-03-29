import { contactLinks } from '../data/contact'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-desc">{t('contact.desc')}</p>
        <div className="contact-panel">
          <div className="contact-links">
            {contactLinks.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                className="contact-link"
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
