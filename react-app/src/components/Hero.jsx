import { useEffect, useState } from 'react'
import { LEGACY_HTML_URL } from '../config/site'

const FULL_TEXT = '안녕하세요\n꿈을 개발하는 개발자\n Roy 입니다.'

/** 일부 모바일·호스팅에서 한글 경로 실패 방지 */
const HERO_PHOTO = `/img/${encodeURIComponent('고용재_사진.jpg')}`
const HERO_LOGO = `/img/${encodeURIComponent('로고.png')}`

export function Hero() {
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
        if (index < FULL_TEXT.length) {
          index += 1
          setDisplayText(FULL_TEXT.slice(0, index))
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
          setDisplayText(FULL_TEXT.slice(0, index))
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
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero-visual">
        <div className="hero-image-wrap hero-image-wrap--match-height">
          <img
            src={HERO_PHOTO}
            alt="고용재 프로필 사진"
            className="hero-image hero-image-1"
          />
          <img
            src={HERO_LOGO}
            alt="ROY.K 로고"
            className="hero-image hero-image-2"
          />
        </div>
      </div>
      <div className="hero-content">
        <p className="hero-tag">Developer Portfolio</p>
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
        <p className="hero-desc">
          그동안 만들었던 프로젝트와 사용한 기술을 정리한 공간입니다.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            프로젝트 보기
          </a>
          <a
            href={LEGACY_HTML_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            title={`정적 HTML 버전 (${LEGACY_HTML_URL})`}
          >
            HTML로 보기
          </a>
        </div>
      </div>
    </section>
  )
}
