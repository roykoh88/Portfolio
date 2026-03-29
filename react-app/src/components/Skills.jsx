import { useState } from 'react'
import {
  SKILL_TRACKS,
  SKILL_TIERS,
  getSkillGroupsForTier,
} from '../data/skillsByTrack'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function SkillBlock({ subtitle, items }) {
  return (
    <>
      {subtitle ? (
        <span className="skill-subtitle">{subtitle}</span>
      ) : null}
      <ul className="skill-tags">
        {items.map((item, i) => (
          <li key={`${subtitle ?? 'x'}-${i}-${item}`}>{item}</li>
        ))}
      </ul>
    </>
  )
}

function SkillGroup({ title, blocks, mapTitle, mapSubtitle }) {
  return (
    <div className="skill-group skill-group--panel">
      <h3 className="skill-group-title">{mapTitle(title)}</h3>
      {blocks.map((block, i) => (
        <SkillBlock
          key={`${title}-${block.subtitle ?? 'main'}-${i}`}
          subtitle={
            block.subtitle ? mapSubtitle(block.subtitle) : undefined
          }
          items={block.items}
        />
      ))}
    </div>
  )
}

export function Skills() {
  const { t, skillGroupTitle, skillSubtitle } = useLanguage()
  const [track, setTrack] = useState('llm')
  const [tier, setTier] = useState('strong')

  const isCommonTrack = track === 'common'
  const groups = getSkillGroupsForTier(track, tier)

  const trackLabel =
    track === 'common'
      ? t('skills.trackCommon')
      : SKILL_TRACKS.find((x) => x.id === track)?.label ?? track
  const tierLabel =
    tier === 'strong'
      ? t('skills.tierStrong')
      : tier === 'experience'
        ? t('skills.tierExp')
        : SKILL_TIERS.find((x) => x.id === tier)?.label ?? tier

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">{t('nav.skills')}</h2>
        <p className="section-desc">{t('skills.desc')}</p>

        <div
          className="skills-filter-row skills-filter-row--tracks"
          role="tablist"
          aria-label={t('skills.tabTrackAria')}
        >
          {SKILL_TRACKS.map((tr) => (
            <button
              key={tr.id}
              type="button"
              role="tab"
              aria-selected={track === tr.id}
              className={`skills-filter-btn${track === tr.id ? ' is-active' : ''}`}
              onClick={() => setTrack(tr.id)}
            >
              {tr.id === 'common' ? t('skills.trackCommon') : tr.label}
            </button>
          ))}
        </div>

        {!isCommonTrack && (
          <div
            className="skills-filter-row skills-filter-row--tier"
            role="tablist"
            aria-label={t('skills.tabTierAria')}
          >
            {SKILL_TIERS.map((ti) => (
              <button
                key={ti.id}
                type="button"
                role="tab"
                aria-selected={tier === ti.id}
                className={`skills-filter-btn skills-filter-btn--tier${
                  tier === ti.id ? ' is-active' : ''
                }`}
                onClick={() => setTier(ti.id)}
              >
                {ti.id === 'strong'
                  ? t('skills.tierStrong')
                  : ti.id === 'experience'
                    ? t('skills.tierExp')
                    : ti.label}
              </button>
            ))}
          </div>
        )}

        <p className="skills-context-bar">
          <span className="skills-context-prefix">{t('skills.contextPrefix')}</span>
          <span className="skills-context-value">
            {isCommonTrack
              ? `${trackLabel} · ${t('skills.contextCommonSuffix')}`
              : `${trackLabel} · ${tierLabel}`}
          </span>
        </p>

        <div
          className="skills-wrap skills-wrap--filtered"
          role="tabpanel"
          aria-live="polite"
        >
          {groups.length === 0 ? (
            <p className="skills-empty-hint">{t('skills.empty')}</p>
          ) : (
            groups.map((g) => (
              <SkillGroup
                key={g.title}
                title={g.title}
                blocks={g.blocks}
                mapTitle={skillGroupTitle}
                mapSubtitle={skillSubtitle}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
