import { useEffect, useState } from 'react'
import { LEGACY_HTML_URL } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/** 일부 모바일·호스팅에서 한글 경로 실패 방지 */
const HERO_PHOTO = `/img/${encodeURIComponent('고용재_사진.jpg')}`
const HERO_LOGO = `/img/${encodeURIComponent('로고.png')}`

export function Hero() {
  const { lang, t } = useLanguage()
  const fullText = t('hero.typing')
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let index = 0
    let mode = 'type'
    let timeoutId

    const typeSpeed = 120
    const eraseSpeed = 80
    const pauseAfterType = 2000
    const pauseAfterErase = 600

    function tick() {
      if (mode === 'type') {
        if (index < fullText.length) {
          index += 1
          setDisplayText(fullText.slice(0, index))
          timeoutId = setTimeout(tick, typeSpeed)
        } else {
          timeoutId = setTimeout(() => {
            mode = 'erase'
            tick()
          }, pauseAfterType)
        }
      } else {
        if (index > 0) {
          index -= 1
          setDisplayText(fullText.slice(0, index))
          timeoutId = setTimeout(tick, eraseSpeed)
        } else {
          mode = 'type'
          timeoutId = setTimeout(tick, pauseAfterErase)
        }
      }
    }

    tick()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [fullText, lang])

  const legacyTitle = `${t('hero.htmlTitle')} (${LEGACY_HTML_URL})`

  return (
    <section id="home" className="hero">
      <div className="hero-visual">
        <div className="hero-image-wrap hero-image-wrap--match-height">
          <img
            src={HERO_PHOTO}
            alt={t('hero.photoAlt')}
            className="hero-image hero-image-1"
          />
          <img
            src={HERO_LOGO}
            alt={t('hero.logoAlt')}
            className="hero-image hero-image-2"
          />
        </div>
      </div>
      <div className="hero-content">
        <p className="hero-tag">{t('hero.tag')}</p>
        <h1 className="hero-title">
          {displayText.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
          <span className="cursor" aria-hidden="true">
            |
          </span>
        </h1>
        <p className="hero-desc">{t('hero.desc')}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            {t('hero.viewProjects')}
          </a>
          <a
            href={LEGACY_HTML_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            title={legacyTitle}
          >
            {t('hero.viewHtml')}
          </a>
        </div>
      </div>
    </section>
  )
}
