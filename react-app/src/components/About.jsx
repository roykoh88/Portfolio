import './About.css'
import { getManAge } from '../lib/age'

/** 만 나이 계산 기준 (생년월일과 반드시 일치) */
const BIRTH_YEAR = 1988
const BIRTH_MONTH = 10
const BIRTH_DAY = 20

const introParagraphs = [
  '안녕하세요.',
  '꿈을 코드로 만드는 개발자 ROY(고용재)입니다. 사용하는 사람이 편하고 기분 좋게 쓸 수 있는 서비스를 만드는 걸 좋아합니다.',
  'AI를 서비스 기능으로 구현하는 개발에 집중하고 있고, 운영 경험을 바탕으로 개발자로 전환하여 LLM/RAG 기반 프로젝트를 수행하며 데이터부터 API, 서비스까지 이어 붙이는 경험을 쌓아 왔습니다. 기술 중심으로 성장하며 AI 개발자가 되길 희망하고, 웹·데이터·ML을 다루는 일에 관심이 많습니다.',
  '웹페이지 프론트와 백엔드 개발도 직접 해 보았고, Computer Vision 분야에서는 YOLO를 활용해 프로젝트를 진행해 본 경험이 있습니다.',
  'AI를 실제 서비스에 적용해 가치를 만드는 개발자로 기여하고 싶습니다. 궁금한 점이 있으시면 아래 연락처로 편하게 보내주세요.',
]

function Field({ label, value }) {
  const hasLabel = label != null && String(label).trim() !== ''
  return (
    <div
      className={
        'about-profile-field' +
        (hasLabel ? '' : ' about-profile-field--no-label')
      }
    >
      {hasLabel ? (
        <>
          <span className="about-profile-label">{label}</span>
          <span className="about-profile-value">{value}</span>
        </>
      ) : (
        <span className="about-profile-value about-profile-value--only">
          {value}
        </span>
      )}
    </div>
  )
}

export function About() {
  const manAge = getManAge(BIRTH_YEAR, BIRTH_MONTH, BIRTH_DAY)

  const profileRows = [
    {
      type: 'pair',
      left: { label: '이름', value: '고용재' },
      right: { label: '생년월일', value: '1988.10.20' },
    },
    {
      type: 'pair',
      left: { label: '영문', value: 'Koh Yongjae' },
      right: { label: '나이', value: `(만) ${manAge}` },
    },
    {
      type: 'pair',
      left: {
        label: 'E-mail',
        value: (
          <a href="mailto:roy.koh.ai88@gmail.com">roy.koh.ai88@gmail.com</a>
        ),
      },
      right: {
        label: '연락처',
        value: (
          <a href="#contact" className="about-scroll-contact">
            contact
          </a>
        ),
      },
    },
    {
      type: 'pair',
      left: { label: '주소', value: '서울시 노원구' },
      right: { label: '지원 분야', value: 'LLM Developer' },
    },
    {
      type: 'triple',
      items: [
        {
          label: 'Blog',
          value: (
            <a href="https://javakid.tistory.com/" target="_blank" rel="noreferrer">
              javakid.tistory.com
            </a>
          ),
        },
        {
          label: 'Portfolio',
          value: (
            <a href="https://yjkohproject.web.app/" target="_blank" rel="noreferrer">
              yjkohproject.web.app
            </a>
          ),
        },
        {
          label: 'GitHub',
          value: (
            <a href="https://github.com/roykoh88" target="_blank" rel="noreferrer">
              github.com/roykoh88
            </a>
          ),
        },
      ],
    },
  ]

  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About</h2>
        <div className="about-content about-content--profile">
          <div className="about-profile">
            <div className="about-profile-photo">
              <img
                src="/img/증명사진_고용재.jpg"
                alt="고용재 프로필 사진"
                width="200"
                height="250"
              />
            </div>
            <div className="about-profile-fields">
              {profileRows.map((row) =>
                row.type === 'pair' ? (
                  <div
                    key={`pair-${row.left.label}`}
                    className="about-profile-row about-profile-row--pair"
                  >
                    <Field label={row.left.label} value={row.left.value} />
                    <Field label={row.right.label} value={row.right.value} />
                  </div>
                ) : row.type === 'triple' ? (
                  <div
                    key="links-triple"
                    className="about-profile-row about-profile-row--triple"
                  >
                    {row.items.map((item) => (
                      <div key={item.label} className="about-profile-link-cell">
                        <span className="about-profile-label">{item.label}</span>
                        <span className="about-profile-value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={row.label} className="about-profile-row">
                    <Field label={row.label} value={row.value} />
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="about-intro-stack" lang="ko">
            {introParagraphs.map((text, i) => (
              <p key={i} className="about-text about-intro-p">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
