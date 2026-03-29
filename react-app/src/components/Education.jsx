import { educationColumns } from '../data/education'

function TimelineColumn({ items }) {
  return (
    <div className="education-timeline">
      {items.map((item) => (
        <div key={`${item.period}-${item.course}`} className="education-item">
          <div className="timeline-marker" aria-hidden="true" />
          <div className="timeline-content">
            <span className="education-period">{item.period}</span>
            <strong className="education-course">{item.course}</strong>
            <span className="education-org">{item.org}</span>
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
        <p className="section-desc">이수한 교육 및 연수 과정입니다.</p>
        <div className="education-split">
          {educationColumns.map((col, i) => (
            <TimelineColumn key={i} items={col} />
          ))}
        </div>
      </div>
    </section>
  )
}
