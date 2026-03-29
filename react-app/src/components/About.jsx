import { getManAge } from '../lib/age'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/** 만 나이 계산 기준 (생년월일과 반드시 일치) */
const BIRTH_YEAR = 1988
const BIRTH_MONTH = 10
const BIRTH_DAY = 20

function Field({ label, value }) {
  const hasLabel = label != null && String(label).trim() !== ''
  return (
    <div
      className={
        'about-profile-field' +
        (hasLabel ? '' : ' about-profile-field--no-label')
      }
    >
      {hasLabel ? (
        <>
          <span className="about-profile-label">{label}</span>
          <span className="about-profile-value">{value}</span>
        </>
      ) : (
        <span className="about-profile-value about-profile-value--only">
          {value}
        </span>
      )}
    </div>
  )
}

export function About() {
  const { lang, t, msg } = useLanguage()
  const manAge = getManAge(BIRTH_YEAR, BIRTH_MONTH, BIRTH_DAY)
  const introParagraphs = msg.about.intro

  const profileRows = [
    {
      type: 'pair',
      left: { label: t('about.name'), value: '고용재' },
      right: { label: t('about.birth'), value: '1988.10.20' },
    },
    {
      type: 'pair',
      left: { label: t('about.nameEn'), value: 'Koh Yongjae' },
      right: {
        label: t('about.age'),
        value: `${t('about.ageUnit')} ${manAge}`,
      },
    },
    {
      type: 'pair',
      left: {
        label: t('about.email'),
        value: (
          <a href="mailto:roy.koh.ai88@gmail.com">roy.koh.ai88@gmail.com</a>
        ),
      },
      right: {
        label: t('about.phoneLink'),
        value: (
          <a href="#contact" className="about-scroll-contact">
            {t('about.contactCta')}
          </a>
        ),
      },
    },
    {
      type: 'pair',
      left: { label: t('about.address'), value: t('about.addressValue') },
      right: { label: t('about.role'), value: t('about.roleValue') },
    },
    {
      type: 'triple',
      items: [
        {
          label: 'Blog',
          value: (
            <a
              href="https://javakid.tistory.com/"
              target="_blank"
              rel="noreferrer"
            >
              javakid.tistory.com
            </a>
          ),
        },
        {
          label: 'Portfolio',
          value: (
            <a
              href="https://yjkohproject.web.app/"
              target="_blank"
              rel="noreferrer"
            >
              yjkohproject.web.app
            </a>
          ),
        },
        {
          label: 'GitHub',
          value: (
            <a
              href="https://github.com/roykoh88"
              target="_blank"
              rel="noreferrer"
            >
              github.com/roykoh88
            </a>
          ),
        },
      ],
    },
  ]

  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="about-content about-content--profile">
          <div className="about-profile">
            <div className="about-profile-photo">
              <img
                src="/img/증명사진_고용재.jpg"
                alt={t('about.photoAlt')}
                width="200"
                height="250"
              />
            </div>
            <div className="about-profile-fields">
              {profileRows.map((row) =>
                row.type === 'pair' ? (
                  <div
                    key={`pair-${row.left.label}`}
                    className="about-profile-row about-profile-row--pair"
                  >
                    <Field label={row.left.label} value={row.left.value} />
                    <Field label={row.right.label} value={row.right.value} />
                  </div>
                ) : row.type === 'triple' ? (
                  <div
                    key="links-triple"
                    className="about-profile-row about-profile-row--triple"
                  >
                    {row.items.map((item) => (
                      <div key={item.label} className="about-profile-link-cell">
                        <span className="about-profile-label">{item.label}</span>
                        <span className="about-profile-value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={row.label} className="about-profile-row">
                    <Field label={row.label} value={row.value} />
                  </div>
                ),
              )}
            </div>
          </div>
          <div
            className="about-intro-stack"
            lang={lang === 'en' ? 'en' : 'ko'}
          >
            {introParagraphs.map((text, i) => (
              <p key={i} className="about-text about-intro-p">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
