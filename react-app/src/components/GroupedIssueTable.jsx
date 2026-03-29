import { pdfFromPages } from '../config/portfolioPages'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function NameCell({ row, nameColumnLabel }) {
  const { t } = useLanguage()
  const label = nameColumnLabel || t('awards.colName')
  if (row.pdf) {
    return (
      <a
        href={pdfFromPages(row.pdf)}
        className="award-pdf-link"
        target="_blank"
        rel="noopener noreferrer"
        title={t('awards.pdfTitleTemplate', { label })}
      >
        {row.title}
      </a>
    )
  }
  return row.title
}

/** 날짜 / 명칭 / 발급처 — 같은 발급처는 rowspan */
export function GroupedIssueTable({ groups, nameColumnLabel }) {
  const { t } = useLanguage()
  if (!groups.length) return null
  return (
    <div className="award-table-card">
      <table className="award-table">
        <thead>
          <tr>
            <th scope="col">{t('awards.colDate')}</th>
            <th scope="col">{nameColumnLabel ?? t('awards.colName')}</th>
            <th scope="col">{t('awards.colIssuer')}</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) =>
            g.items.map((row, i) => (
              <tr key={`${g.issuer}-${row.date}-${row.title}-${i}`}>
                <td>{row.date}</td>
                <td>
                  <NameCell row={row} nameColumnLabel={nameColumnLabel} />
                </td>
                {i === 0 ? (
                  <td rowSpan={g.items.length}>{g.issuer}</td>
                ) : null}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  )
}
