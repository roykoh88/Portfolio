import { licenseRows } from '../data/certifications'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { LicenseTable } from './LicenseTable'

const CERT_FILE = 'src/data/certifications.js'

export function CertificatesSection() {
  const { t } = useLanguage()
  const hasLicenseRows = licenseRows.length > 0
  const emptyFull = t('certificates.emptyHint', { file: CERT_FILE })
  const [emptyBefore, emptyAfter = ''] = emptyFull.split(CERT_FILE)

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section-title">{t('certificates.title')}</h2>
        <p className="section-desc">{t('certificates.desc')}</p>

        {hasLicenseRows ? (
          <LicenseTable rows={licenseRows} />
        ) : (
          <p className="section-desc award-cert-placeholder">
            {emptyBefore}
            <code className="award-code-hint">{CERT_FILE}</code>
            {emptyAfter}
          </p>
        )}
      </div>
    </section>
  )
}
