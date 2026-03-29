import { useState } from 'react'
import {
  SKILL_TRACKS,
  SKILL_TIERS,
  getSkillGroupsForTier,
} from '../data/skillsByTrack'

function SkillBlock({ subtitle, items }) {
  return (
    <>
      {subtitle ? (
        <span className="skill-subtitle">{subtitle}</span>
      ) : null}
      <ul className="skill-tags">
        {items.map((t, i) => (
          <li key={`${subtitle ?? 'x'}-${i}-${t}`}>{t}</li>
        ))}
      </ul>
    </>
  )
}

function SkillGroup({ title, blocks }) {
  return (
    <div className="skill-group skill-group--panel">
      <h3 className="skill-group-title">{title}</h3>
      {blocks.map((block, i) => (
        <SkillBlock
          key={`${title}-${block.subtitle ?? 'main'}-${i}`}
          subtitle={block.subtitle}
          items={block.items}
        />
      ))}
    </div>
  )
}

export function Skills() {
  const [track, setTrack] = useState('web')
  const [tier, setTier] = useState('strong')

  const isCommonTrack = track === 'common'
  const groups = getSkillGroupsForTier(track, tier)

  const trackLabel =
    SKILL_TRACKS.find((t) => t.id === track)?.label ?? track
  const tierLabel =
    SKILL_TIERS.find((t) => t.id === tier)?.label ?? tier

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-desc">
          분야(CV · LLM · ML · Web · 공통)와 주력·경험을 선택할 수 있습니다.{' '}
          경험을 고르면 해당 분야의 주력 항목을 모두 포함해 보여 줍니다. 네 분야(CV·LLM·ML·Web)에는 같은 기술이 축마다
          다시 나올 수 있습니다. 공통 탭의 OS·협업 등은 CV·LLM·ML 화면
          하단에도 같이 표시됩니다.
        </p>

        <div
          className="skills-filter-row skills-filter-row--tracks"
          role="tablist"
          aria-label="스킬 분야"
        >
          {SKILL_TRACKS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={track === t.id}
              className={`skills-filter-btn${track === t.id ? ' is-active' : ''}`}
              onClick={() => setTrack(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {!isCommonTrack && (
          <div
            className="skills-filter-row skills-filter-row--tier"
            role="tablist"
            aria-label="숙련도"
          >
            {SKILL_TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tier === t.id}
                className={`skills-filter-btn skills-filter-btn--tier${
                  tier === t.id ? ' is-active' : ''
                }`}
                onClick={() => setTier(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <p className="skills-context-bar">
          <span className="skills-context-prefix">현재 분류</span>
          <span className="skills-context-value">
            {isCommonTrack
              ? `${trackLabel} · 협업·인프라 공통`
              : `${trackLabel} · ${tierLabel}`}
          </span>
        </p>

        <div
          className="skills-wrap skills-wrap--filtered"
          role="tabpanel"
          aria-live="polite"
        >
          {groups.length === 0 ? (
            <p className="skills-empty-hint">이 조합에 해당하는 항목이 없습니다.</p>
          ) : (
            groups.map((g) => (
              <SkillGroup key={g.title} title={g.title} blocks={g.blocks} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
