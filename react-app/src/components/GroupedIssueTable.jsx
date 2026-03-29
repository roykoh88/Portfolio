import { portfolioPdfUrl } from '../config/portfolioPages'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function awardTitle(row, lang) {
  if (lang === 'en' && row.titleEn) return row.titleEn
  return row.title
}

function awardIssuer(group, lang) {
  if (lang === 'en' && group.issuerEn) return group.issuerEn
  return group.issuer
}

function NameCell({ row, nameColumnLabel }) {
  const { lang, t } = useLanguage()
  const label = nameColumnLabel || t('awards.colName')
  const displayTitle = awardTitle(row, lang)
  if (row.pdf) {
    return (
      <a
        href={portfolioPdfUrl(row.pdf)}
        className="award-pdf-link"
        target="_blank"
        rel="noopener noreferrer"
        title={t('awards.pdfTitleTemplate', { label })}
      >
        {displayTitle}
      </a>
    )
  }
  return displayTitle
}

/** 날짜 / 명칭 / 발급처 — 같은 발급처는 rowspan */
export function GroupedIssueTable({ groups, nameColumnLabel }) {
  const { lang, t } = useLanguage()
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
                  <td rowSpan={g.items.length}>{awardIssuer(g, lang)}</td>
                ) : null}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  )
}
