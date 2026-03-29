import { certificationGroups } from '../data/certifications'
import { GroupedIssueTable } from './GroupedIssueTable'

export function CertificatesSection() {
  const hasRows = certificationGroups.length > 0

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section-title">Certificates</h2>
        <p className="section-desc">
          국가·기관에서 발급한 자격증입니다.
        </p>

        <h3 className="award-block-title">자격증</h3>
        {hasRows ? (
          <GroupedIssueTable
            groups={certificationGroups}
            nameColumnLabel="자격명"
          />
        ) : (
          <p className="section-desc award-cert-placeholder">
            리눅스 자격증 등은 날짜·자격명·발급처를 확정한 뒤{' '}
            <code className="award-code-hint">src/data/certifications.js</code>의{' '}
            <code className="award-code-hint">certificationGroups</code>에
            추가하면 표에 반영됩니다.
          </p>
        )}

        <p className="section-desc certificates-gallery-hint">
          상장·이미지·PDF 갤러리는 정적 HTML 버전(
          <code className="award-code-hint">index.html</code>)에서 관리할 수 있습니다.
        </p>
      </div>
    </section>
  )
}
