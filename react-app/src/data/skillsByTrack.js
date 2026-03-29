/**
 * CV / LLM / ML / Web / 공통 × 주력·경험 (공통은 주력·경험 없이 단일 목록)
 *
 * 네 축(CV·LLM·ML·Web) 사이에는 같은 항목이 의도적으로 중복될 수 있습니다.
 * CV 스택은 멀티모달·비전+언어 LLM에도 쓰이므로 LLM 등에 그대로 다시 넣을 수 있습니다.
 *
 * SKILLS_COMMON_GROUPS(OS·협업 등)는 공통 탭 내용이며, CV·LLM·ML 주력·경험 목록
 * 하단에도 붙입니다. Anaconda·Jupyter는 공통 탭에는 두지 않고 해당 분야 하단에만 둡니다.
 *
 * 공통 칸 순서는 `SKILLS_COMMON_SOURCE` 정의 후 태그 개수(많은 그룹이 위)로 자동 정렬됩니다.
 */

export const SKILL_TRACKS = [
  { id: 'cv', label: 'CV' },
  { id: 'llm', label: 'LLM' },
  { id: 'ml', label: 'ML' },
  { id: 'web', label: 'Web' },
  { id: 'common', label: '공통' },
]

/** CV·LLM·ML 주력에만 붙임(경험 배열에는 생략 — 병합 시 주력에 이미 포함됨) */
const SKILLS_NOTEBOOK_ENV_GROUP = {
  title: 'Notebook · 환경',
  blocks: [{ items: ['Anaconda', 'Jupyter Notebook'] }],
}

function countItemsInSkillGroup(group) {
  return group.blocks.reduce((sum, b) => sum + (b.items?.length ?? 0), 0)
}

/**
 * 카드 표시 순서: 스킬 태그 개수 내림차순, 동률이면 제목(한국어 로케일) 가나다순.
 * 공통 소스(`SKILLS_COMMON_SOURCE`)에만 추가해도 공통 탭 순서는 자동 갱신됩니다.
 */
function sortSkillGroupsByItemCount(groups) {
  return [...groups].sort((a, b) => {
    const d = countItemsInSkillGroup(b) - countItemsInSkillGroup(a)
    if (d !== 0) return d
    return a.title.localeCompare(b.title, 'ko')
  })
}

/** @type {Array<{ title: string, blocks: Array<{ subtitle?: string, items: string[] }> }>} */
const SKILLS_COMMON_SOURCE = [
  {
    title: 'OS',
    blocks: [
      {
        items: [
          'Windows',
          'Linux (Ubuntu, CentOS, Kali)',
          'Windows Server',
        ],
      },
    ],
  },
  {
    title: 'Collaboration',
    blocks: [
      {
        items: [
          'Notion',
          'Slack',
          'Teams',
          'Google Meet',
          'Discord',
          'Jira',
          'Zoom',
        ],
      },
    ],
  },
  {
    title: 'Office',
    blocks: [
      {
        items: [
          'Word',
          'Excel',
          'PowerPoint',
          'Outlook',
          'Google Workspace',
        ],
      },
    ],
  },
  {
    title: 'Others',
    blocks: [{ items: ['Cisco', 'VMware'] }],
  },
]

/** 웹 스택과 직접 묶기 애매한 OS·협업·오피스(Workspace 포함) 등 — 표시 순서는 태그 수 기준 자동 정렬 */
export const SKILLS_COMMON_GROUPS = sortSkillGroupsByItemCount(SKILLS_COMMON_SOURCE)

export const SKILL_TIERS = [
  { id: 'strong', label: '주력' },
  { id: 'experience', label: '경험' },
]

/** @type {Record<string, Record<'strong'|'experience', Array<{ title: string, blocks: Array<{ subtitle?: string, items: string[] }> }>>>} */
export const SKILLS_BY_TRACK_AND_TIER = {
  web: {
    strong: [
      {
        title: 'Language · Front / Back',
        blocks: [
          {
            subtitle: 'Front',
            items: ['HTML', 'CSS', 'JavaScript', 'React'],
          },
          {
            subtitle: 'Back',
            items: ['Python', 'Node.js', 'Java'],
          },
        ],
      },
      {
        title: 'Web Framework & API',
        blocks: [
          { subtitle: 'Framework', items: ['FastAPI', 'Pydantic'] },
        ],
      },
      {
        title: 'DBMS',
        blocks: [
          {
            subtitle: 'Relational',
            items: ['PostgreSQL', 'Oracle'],
          },
          { subtitle: 'Document', items: ['MongoDB'] },
        ],
      },
      {
        title: 'BaaS · 호스팅',
        blocks: [{ items: ['Firebase'] }],
      },
      {
        title: 'Delivery',
        blocks: [
          {
            subtitle: 'Tooling',
            items: ['Docker', 'GitHub', 'Uvicorn', 'VS Code'],
          },
          {
            subtitle: 'CI/CD',
            items: ['GitHub Actions'],
          },
        ],
      },
    ],
    experience: [
      {
        title: 'Language · Front / Back',
        blocks: [
          { subtitle: 'Front', items: ['Vue'] },
          {
            subtitle: 'Back',
            items: ['Express', 'FastAPI', 'Flask', 'Spring Boot'],
          },
        ],
      },
      {
        title: 'Libraries',
        blocks: [{ items: ['Axios', 'Lodash', 'Streamlit'] }],
      },
      {
        title: 'DBMS',
        blocks: [{ subtitle: 'Relational', items: ['Oracle'] }],
      },
      {
        title: 'BaaS · 호스팅',
        blocks: [{ items: ['Firebase'] }],
      },
      {
        title: 'DevOps & CI/CD',
        blocks: [
          { items: ['Ansible', 'ArgoCD', 'Kubernetes'] },
        ],
      },
    ],
  },

  llm: {
    strong: [
      {
        title: 'Language',
        blocks: [{ items: ['Python'] }],
      },
      {
        title: 'LLM & orchestration',
        blocks: [
          { items: ['LangChain', 'OpenAI', 'LLM'] },
        ],
      },
      {
        title: 'Models & ecosystem',
        blocks: [
          { items: ['Hugging Face', 'Transformers'] },
        ],
      },
      {
        title: 'Backend · 서빙',
        blocks: [
          {
            items: ['FastAPI', 'Pydantic', 'Docker', 'PostgreSQL'],
          },
        ],
      },
      SKILLS_NOTEBOOK_ENV_GROUP,
      ...SKILLS_COMMON_GROUPS,
    ],
    experience: [
      {
        title: 'Language',
        blocks: [{ items: ['Python'] }],
      },
      {
        title: 'API & agents',
        blocks: [{ items: ['Gemini API', 'CrewAI'] }],
      },
      {
        title: 'MLOps (LLM·모델 운영)',
        blocks: [{ items: ['MLflow', 'Kubeflow'] }],
      },
      {
        title: 'Data · 평가',
        blocks: [{ items: ['Pandas', 'NumPy'] }],
      },
      {
        title: 'Vision · 멀티모달',
        blocks: [{ items: ['YOLO', 'PyTorch', 'OpenCV'] }],
      },
      {
        title: '배포 · 추론',
        blocks: [{ items: ['Docker'] }],
      },
      ...SKILLS_COMMON_GROUPS,
    ],
  },

  ml: {
    strong: [
      {
        title: 'Language',
        blocks: [{ items: ['Python'] }],
      },
      {
        title: 'Core stack',
        blocks: [
          {
            items: ['Pandas', 'NumPy', 'scikit-learn', 'XGBoost'],
          },
        ],
      },
      {
        title: 'Deep learning',
        blocks: [{ items: ['PyTorch', 'TensorFlow'] }],
      },
      {
        title: 'Auto ML',
        blocks: [{ items: ['PyCaret'] }],
      },
      {
        title: 'Notebook · 실험',
        blocks: [{ items: ['Google Colab'] }],
      },
      SKILLS_NOTEBOOK_ENV_GROUP,
      ...SKILLS_COMMON_GROUPS,
    ],
    experience: [
      {
        title: 'Language',
        blocks: [{ items: ['Python'] }],
      },
      {
        title: 'Classical ML (실습·비교)',
        blocks: [
          {
            items: [
              'Random Forest',
              'Logistic Regression',
              'Decision Tree',
              'K-Nearest Neighbors',
              'Scikit-Learn',
            ],
          },
        ],
      },
      {
        title: 'Data & crawling',
        blocks: [
          {
            items: [
              'BeautifulSoup',
              'Selenium',
              'Machine Learning',
            ],
          },
        ],
      },
      {
        title: 'Visualization',
        blocks: [
          {
            items: ['Matplotlib', 'Seaborn', 'Plotly', 'Chart.js', 'Tableau'],
          },
        ],
      },
      {
        title: 'Big Data',
        blocks: [{ items: ['Spark', 'Hadoop'] }],
      },
      {
        title: 'LLM 생태계 (ML 맥락)',
        blocks: [{ items: ['Hugging Face', 'Transformers'] }],
      },
      {
        title: '딥러닝 · 구조',
        blocks: [
          { items: ['TensorFlow', 'LSTM', 'GRU', 'Transformer'] },
        ],
      },
      {
        title: '배포',
        blocks: [{ items: ['Docker'] }],
      },
      ...SKILLS_COMMON_GROUPS,
    ],
  },

  cv: {
    strong: [
      {
        title: 'Language',
        blocks: [{ items: ['Python'] }],
      },
      {
        title: 'Computer Vision',
        blocks: [{ items: ['YOLO', 'PyTorch', 'OpenCV'] }],
      },
      {
        title: 'Models · hub',
        blocks: [{ items: ['Hugging Face', 'Transformers'] }],
      },
      SKILLS_NOTEBOOK_ENV_GROUP,
      ...SKILLS_COMMON_GROUPS,
    ],
    experience: [
      {
        title: '배포 · 추론',
        blocks: [{ items: ['Docker'] }],
      },
      ...SKILLS_COMMON_GROUPS,
    ],
  },
}

function endsWithCommonGroups(groups) {
  const n = SKILLS_COMMON_GROUPS.length
  if (groups.length < n) return false
  return groups
    .slice(-n)
    .every((g, i) => g.title === SKILLS_COMMON_GROUPS[i].title)
}

const BLOCK_KEY_MAIN = '\0main'

function blockMergeKey(block) {
  return block.subtitle ?? BLOCK_KEY_MAIN
}

/** 같은 subtitle(또는 소제목 없음)끼리 태그를 이어 붙이고, 순서 유지·중복 제거 */
function mergeBlockLists(blocksA, blocksB) {
  const byKey = new Map()
  const keyOrder = []
  function ingest(block) {
    const k = blockMergeKey(block)
    if (!byKey.has(k)) {
      byKey.set(k, {
        subtitle: block.subtitle,
        items: [],
      })
      keyOrder.push(k)
    }
    const entry = byKey.get(k)
    for (const item of block.items ?? []) {
      if (!entry.items.includes(item)) entry.items.push(item)
    }
  }
  blocksA.forEach(ingest)
  blocksB.forEach(ingest)
  return keyOrder.map((k) => {
    const e = byKey.get(k)
    return e.subtitle != null
      ? { subtitle: e.subtitle, items: e.items }
      : { items: e.items }
  })
}

/**
 * 경험 탭: 주력 그룹을 모두 포함하고, 경험 전용 그룹을 이어 붙임.
 * CV·LLM·ML은 양쪽에 붙은 공통 블록이 한 번만 나오게 하고, 같은 title 카드는
 * 블록을 합침(같은 Front/Back 등 subtitle이면 태그만 한 블록으로 이음).
 */
function mergeStrongAndExperience(strong, experience) {
  let exp = experience
  if (
    endsWithCommonGroups(strong) &&
    endsWithCommonGroups(exp)
  ) {
    exp = exp.slice(0, -SKILLS_COMMON_GROUPS.length)
  }
  const byTitle = new Map()
  const order = []
  const ingest = (g) => {
    if (byTitle.has(g.title)) {
      const prev = byTitle.get(g.title)
      prev.blocks = mergeBlockLists(prev.blocks, g.blocks)
    } else {
      byTitle.set(g.title, { title: g.title, blocks: [...g.blocks] })
      order.push(g.title)
    }
  }
  strong.forEach(ingest)
  exp.forEach(ingest)
  return order.map((t) => byTitle.get(t))
}

/** 공통 꼬리(SKILLS_COMMON_GROUPS)는 순서 고정, 앞쪽 카드만 태그 개수순 */
function sortHeadPreservingCommonTail(groups) {
  const n = SKILLS_COMMON_GROUPS.length
  if (groups.length <= n || !endsWithCommonGroups(groups)) return groups
  return [
    ...sortSkillGroupsByItemCount(groups.slice(0, -n)),
    ...groups.slice(-n),
  ]
}

/** @param {'strong'|'experience'} tier */
export function getSkillGroupsForTier(trackId, tier) {
  if (trackId === 'common') return SKILLS_COMMON_GROUPS
  const t = SKILLS_BY_TRACK_AND_TIER[trackId]
  if (!t) return []
  const strong = t.strong ?? []
  const merged =
    tier === 'strong'
      ? strong
      : mergeStrongAndExperience(strong, t.experience ?? [])
  if (trackId === 'web') {
    return sortSkillGroupsByItemCount(merged)
  }
  if (tier === 'strong') {
    return sortHeadPreservingCommonTail(merged)
  }
  return merged
}
