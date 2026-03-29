import { pdfFromPages } from '../config/portfolioPages'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function licenseCountryCell(row, lang) {
  if (row.country == null || row.country === '') {
    return '—'
  }
  if (lang === 'en' && row.countryEn) {
    return row.countryEn
  }
  return row.country
}

function licenseTitle(row, lang) {
  if (lang === 'en' && row.titleEn) return row.titleEn
  return row.title
}

function licenseGrade(row, lang) {
  if (lang === 'en' && row.gradeEn != null && row.gradeEn !== '') {
    return row.gradeEn
  }
  return row.grade ?? '—'
}

function licenseIssuer(row, lang) {
  if (lang === 'en' && row.issuerEn) return row.issuerEn
  return row.issuer
}

export function LicenseTable({ rows }) {
  const { lang, t } = useLanguage()
  if (!rows?.length) return null
  return (
    <div className="award-table-card">
      <table className="award-table award-table--license">
        <thead>
          <tr>
            <th scope="col">{t('certificates.colDate')}</th>
            <th scope="col">{t('certificates.colCountry')}</th>
            <th scope="col">{t('certificates.colName')}</th>
            <th scope="col">{t('certificates.colGrade')}</th>
            <th scope="col">{t('certificates.colIssuer')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const displayTitle = licenseTitle(row, lang)
            return (
              <tr key={`${row.date}-${row.title}-${i}`}>
                <td>{row.date}</td>
                <td>{licenseCountryCell(row, lang)}</td>
                <td>
                  {row.pdf ? (
                    <a
                      href={pdfFromPages(row.pdf)}
                      className="award-pdf-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t('certificates.pdfTitle')}
                    >
                      {displayTitle}
                    </a>
                  ) : (
                    displayTitle
                  )}
                </td>
                <td>{licenseGrade(row, lang)}</td>
                <td>{licenseIssuer(row, lang)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
