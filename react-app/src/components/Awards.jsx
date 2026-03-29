import { awardGroups } from '../data/awards'
import { GroupedIssueTable } from './GroupedIssueTable'

export function Awards() {
  return (
    <section id="awards" className="section award">
      <div className="container">
        <h2 className="section-title">Award</h2>
        <p className="section-desc award-intro-desc">
          교육 과정 등에서 받은 수상 실적입니다.
        </p>

        <GroupedIssueTable groups={awardGroups} nameColumnLabel="수상명" />
      </div>
    </section>
  )
}
