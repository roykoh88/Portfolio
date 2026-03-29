import { awardGroups } from '../data/awards'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { GroupedIssueTable } from './GroupedIssueTable'

export function Awards() {
  const { t } = useLanguage()

  return (
    <section id="awards" className="section award">
      <div className="container">
        <h2 className="section-title">{t('awards.title')}</h2>
        <p className="section-desc award-intro-desc">{t('awards.intro')}</p>

        <GroupedIssueTable groups={awardGroups} nameColumnLabel={t('awards.colName')} />
      </div>
    </section>
  )
}
