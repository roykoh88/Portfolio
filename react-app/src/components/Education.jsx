import { educationColumns } from '../data/education'

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
function EducationOrg({ item }) {
  const entries = certificateEntries(item)

  if (entries.length === 0) {
    return <span className="education-org">{item.org}</span>
  }

  if (entries.length === 1) {
    const { url } = entries[0]
    return (
      <a
        href={url}
        className="education-org education-org--cert"
        target="_blank"
        rel="noopener noreferrer"
        title="수료증 PDF"
      >
        {item.org}
      </a>
    )
  }

  return (
    <details className="education-org-details">
      <summary
        className="education-org education-org--cert education-org--multi"
        title={`수료증 ${entries.length}건 — 펼쳐서 선택`}
      >
        {item.org}
        <span className="education-org-cert-hint" aria-hidden="true">
          {' '}
          · 수료증 {entries.length}
        </span>
      </summary>
      <ul className="education-cert-pick-list">
        {entries.map((c, i) => (
          <li key={c.url}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {c.label || `이수증 ${i + 1}`}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

function TimelineColumn({ items }) {
  return (
    <div className="education-timeline">
      {items.map((item) => (
        <div key={`${item.period}-${item.course}`} className="education-item">
          <div className="timeline-marker" aria-hidden="true" />
          <div className="timeline-content">
            <span className="education-period">{item.period}</span>
            <strong className="education-course">{item.course}</strong>
            <EducationOrg item={item} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section-title">교육/연수</h2>
        <p className="section-desc education-intro-desc">
          이수한 교육 및 연수 과정입니다.
          <span className="education-cert-hint-text">
            학원명을 클릭 하시면 수료증을 확인 하실 수 있습니다.
          </span>
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
