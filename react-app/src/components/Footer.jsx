import kakaoIconDark from '@legacy/img/talk_white.png'
import kakaoIconLight from '@legacy/img/talk_no_bg.png'
import tistoryIconDark from '@legacy/img/dots_white.png'
import tistoryIconLight from '@legacy/img/dots_no_bg.png'
import { contactLinks } from '../data/contact'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export function Footer({ ownerMode, onOwnerToggle }) {
  const year = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-panel">
          <h2 className="footer-contact-title">{t('contact.title')}</h2>
          <p className="footer-contact-desc">{t('contact.desc')}</p>
          <div className="contact-links footer-contact-links">
            {contactLinks.map(({ label, href, external }) => {
              const isKakao = href.includes('open.kakao.com')
              const isTistory = href.includes('tistory.com')
              const classNames = ['contact-link', 'contact-link--icon-only']
              if (isKakao) classNames.push('contact-link--kakao')
              if (isTistory) classNames.push('contact-link--tistory')
              return (
                <a
                  key={href}
                  href={href}
                  className={classNames.join(' ')}
                  aria-label={label}
                  title={label}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {isKakao ? (
                    <>
                      <img
                        className="contact-link__kakao-icon contact-link__kakao-icon--light"
                        src={kakaoIconLight}
                        alt=""
                        width={20}
                        height={20}
                        decoding="async"
                        aria-hidden
                      />
                      <img
                        className="contact-link__kakao-icon contact-link__kakao-icon--dark"
                        src={kakaoIconDark}
                        alt=""
                        width={20}
                        height={20}
                        decoding="async"
                        aria-hidden
                      />
                    </>
                  ) : null}
                  {isTistory ? (
                    <>
                      <img
                        className="contact-link__tistory-icon contact-link__tistory-icon--light"
                        src={tistoryIconLight}
                        alt=""
                        width={20}
                        height={20}
                        decoding="async"
                        aria-hidden
                      />
                      <img
                        className="contact-link__tistory-icon contact-link__tistory-icon--dark"
                        src={tistoryIconDark}
                        alt=""
                        width={20}
                        height={20}
                        decoding="async"
                        aria-hidden
                      />
                    </>
                  ) : null}
                </a>
              )
            })}
          </div>
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
        </div>
      </div>
    </footer>
  )
}
