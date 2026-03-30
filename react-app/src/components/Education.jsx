import { educationColumns } from '../data/education'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function pickLocaleField(item, key, lang) {
  const en = item[`${key}En`]
  if (lang === 'en' && en) return en
  return item[key] ?? ''
}

function translateCertLabel(c, i, lang, t) {
  if (lang !== 'en') {
    return c.label || t('education.certFallback', { n: i + 1 })
  }
  if (c.labelEn) return c.labelEn
  const lab = c.label ?? ''
  let m = lab.match(/^(\d+)회차$/)
  if (m) return t('education.certRound', { n: m[1] })
  m = lab.match(/^정보보안 (\d+)$/)
  if (m) return t('education.certSec', { n: m[1] })
  m = lab.match(/^리눅스 (\d+)$/)
  if (m) return t('education.certLinux', { n: m[1] })
  m = lab.match(/^씨스코 (\d+)$/)
  if (m) return t('education.certCisco', { n: m[1] })
  m = lab.match(/^과목 이수증(\d+)$/)
  if (m) return t('education.certCourseSubject', { n: m[1] })
  if (lab === '학원 수료증' || lab === '교육기관 수료증') return t('education.certBootcampDoc')
  return c.label || t('education.certFallback', { n: i + 1 })
}

function certificateEntries(item) {
  if (item.certificates?.length) {
    return item.certificates.filter((c) => c?.url)
  }
  if (item.certificateUrl) {
    return [{ url: item.certificateUrl, label: undefined }]
  }
  return []
}

/** 수료증이 있으면 학원명이 링크(1건) 또는 펼침 목록(여러 건) */
function EducationOrg({ item, displayOrg, lang, t }) {
  const entries = certificateEntries(item)

  if (entries.length === 0) {
    return <span className="education-org">{displayOrg}</span>
  }

  if (entries.length === 1) {
    const { url } = entries[0]
    return (
      <a
        href={url}
        className="education-org education-org--cert"
        target="_blank"
        rel="noopener noreferrer"
        title={t('education.certPdfTitle')}
      >
        {displayOrg}
      </a>
    )
  }

  return (
    <details className="education-org-details">
      <summary
        className="education-org education-org--cert education-org--multi"
        title={t('education.certCountTitle', { n: entries.length })}
      >
        {displayOrg}
        <span className="education-org-cert-hint" aria-hidden="true">
          {' '}
          {t('education.certBadge', { n: entries.length })}
        </span>
      </summary>
      <ul className="education-cert-pick-list">
        {entries.map((c, i) => (
          <li key={c.url}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {translateCertLabel(c, i, lang, t)}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

function TimelineColumn({ items }) {
  const { lang, t } = useLanguage()

  return (
    <div className="education-timeline">
      {items.map((item) => {
        const period = pickLocaleField(item, 'period', lang)
        const course = pickLocaleField(item, 'course', lang)
        const displayOrg = pickLocaleField(item, 'org', lang)

        return (
          <div key={`${item.period}-${item.course}`} className="education-item">
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <span className="education-period">{period}</span>
              <strong className="education-course">{course}</strong>
              <EducationOrg
                item={item}
                displayOrg={displayOrg}
                lang={lang}
                t={t}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Education() {
  const { t } = useLanguage()

  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section-title">{t('education.title')}</h2>
        <p className="section-desc education-intro-desc">
          {t('education.intro')}{' '}
          <span className="education-cert-hint-text">{t('education.hint')}</span>
        </p>
        <div className="education-split">
          {educationColumns.map((col, i) => (
            <TimelineColumn key={i} items={col} />
          ))}
        </div>
      </div>
    </section>
  )
}
