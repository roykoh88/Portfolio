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
          {rows.map((row, i) => (
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
                    {row.title}
                  </a>
                ) : (
                  row.title
                )}
              </td>
              <td>{row.grade ?? '—'}</td>
              <td>{row.issuer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
