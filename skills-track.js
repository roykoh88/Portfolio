/**
 * 정적 HTML용 — 내용은 react-app/src/data/skillsByTrack.js 와 동기화할 것.
 * getSkillGroupsForTier(trackId, tier) → 카드 배열
 */
(function (global) {
  var SKILLS_NOTEBOOK_ENV_GROUP = {
    title: 'Notebook · 환경 · 실험',
    blocks: [{ items: ['Anaconda', 'Jupyter Notebook', 'Google Colab'] }],
  }

  function countItemsInSkillGroup(group) {
    return group.blocks.reduce(function (sum, b) {
      return sum + (b.items ? b.items.length : 0)
    }, 0)
  }

  function sortSkillGroupsByItemCount(groups) {
    return groups.slice().sort(function (a, b) {
      var d = countItemsInSkillGroup(b) - countItemsInSkillGroup(a)
      if (d !== 0) return d
      return a.title.localeCompare(b.title, 'ko')
    })
  }

  var SKILLS_COMMON_SOURCE = [
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

  var SKILLS_COMMON_GROUPS = sortSkillGroupsByItemCount(SKILLS_COMMON_SOURCE)

  var SKILLS_BY_TRACK_AND_TIER = {
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
          blocks: [{ subtitle: 'Framework', items: ['FastAPI', 'Pydantic'] }],
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
          blocks: [{ items: ['Ansible', 'ArgoCD', 'Kubernetes'] }],
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
          blocks: [{ items: ['LangChain', 'LLM'] }],
        },
        {
          title: 'API · 모델',
          blocks: [
            { subtitle: 'Cloud API', items: ['OpenAI API', 'Gemini API'] },
            { subtitle: 'Local', items: ['Llama', 'EXAONE'] },
            { subtitle: 'Agents', items: ['CrewAI'] },
          ],
        },
        {
          title: 'Vector DB',
          blocks: [{ items: ['ChromaDB'] }],
        },
        {
          title: 'Models & ecosystem',
          blocks: [{ items: ['Hugging Face', 'Transformers'] }],
        },
        {
          title: 'Backend · 서빙',
          blocks: [{ items: ['FastAPI', 'Docker'] }],
        },
        {
          title: 'Data · 평가',
          blocks: [{ items: ['Pandas', 'NumPy'] }],
        },
        {
          title: 'MLOps',
          blocks: [{ items: ['MLflow'] }],
        },
        SKILLS_NOTEBOOK_ENV_GROUP,
      ],
      experience: [
        {
          title: 'LLM & orchestration',
          blocks: [{ items: ['LangGraph'] }],
        },
        {
          title: 'Models & ecosystem',
          blocks: [{ subtitle: 'Encoder', items: ['BERT', 'KLUE-RoBERTa'] }],
        },
        {
          title: 'MLOps',
          blocks: [{ items: ['Kubeflow'] }],
        },
      ],
    },

    ml: {
      strong: [
        {
          title: 'Language',
          blocks: [{ items: ['Python'] }],
        },
        {
          title: 'Libraries',
          blocks: [
            {
              items: [
                'Pandas',
                'NumPy',
                'Scikit-Learn',
                'Hugging Face',
                'Transformers',
              ],
            },
          ],
        },
        {
          title: 'Classical ML',
          blocks: [{ items: ['Random Forest', 'XGBoost'] }],
        },
        {
          title: 'Deep learning',
          blocks: [
            {
              items: ['PyTorch', 'TensorFlow', 'LSTM', 'GRU', 'Transformer'],
            },
          ],
        },
        {
          title: 'Auto ML',
          blocks: [{ items: ['PyCaret'] }],
        },
        SKILLS_NOTEBOOK_ENV_GROUP,
      ],
      experience: [
        {
          title: 'Language',
          blocks: [{ items: ['Python'] }],
        },
        {
          title: 'Classical ML',
          blocks: [
            {
              items: [
                'Logistic Regression',
                'Decision Tree',
                'K-Nearest Neighbors',
              ],
            },
          ],
        },
        {
          title: 'Visualization',
          blocks: [
            {
              items: [
                'Matplotlib',
                'Seaborn',
                'Plotly',
                'Chart.js',
                'Tableau',
              ],
            },
          ],
        },
        {
          title: 'Big Data',
          blocks: [{ items: ['Spark', 'Hadoop', 'Snowflake'] }],
        },
        {
          title: '배포',
          blocks: [{ items: ['Docker'] }],
        },
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
          blocks: [
            {
              items: [
                'YOLO',
                'Ultralytics',
                'OpenCV',
                'SAHI',
                'OCR',
                'GRU',
                'LSTM',
                'Transformer',
              ],
            },
          ],
        },
        {
          title: 'Data',
          blocks: [
            {
              items: [
                'Hugging Face',
                'AI Hub',
                'Roboflow',
                'Kaggle',
                'Dacon',
              ],
            },
          ],
        },
        SKILLS_NOTEBOOK_ENV_GROUP,
      ],
      experience: [
        {
          title: 'Computer Vision',
          blocks: [{ items: ['Pillow', 'CNN', 'RNN'] }],
        },
        {
          title: 'Desktop · 라벨링',
          blocks: [{ items: ['PySide6', 'PyInstaller'] }],
        },
        {
          title: '배포 · 추론',
          blocks: [{ items: ['Docker'] }],
        },
      ],
    },
  }

  var COMMON_TITLES = {}
  SKILLS_COMMON_GROUPS.forEach(function (g) {
    COMMON_TITLES[g.title] = true
  })

  function endsWithCommonGroups(groups) {
    var n = SKILLS_COMMON_GROUPS.length
    if (groups.length < n) return false
    for (var i = 0; i < n; i++) {
      if (groups[groups.length - n + i].title !== SKILLS_COMMON_GROUPS[i].title) {
        return false
      }
    }
    return true
  }

  var BLOCK_KEY_MAIN = '\0main'

  function blockMergeKey(block) {
    return block.subtitle != null ? block.subtitle : BLOCK_KEY_MAIN
  }

  function mergeBlockLists(blocksA, blocksB) {
    var byKey = {}
    var keyOrder = []
    function ingest(block) {
      var k = blockMergeKey(block)
      if (!Object.prototype.hasOwnProperty.call(byKey, k)) {
        byKey[k] = { subtitle: block.subtitle, items: [] }
        keyOrder.push(k)
      }
      var entry = byKey[k]
      ;(block.items || []).forEach(function (item) {
        if (entry.items.indexOf(item) === -1) entry.items.push(item)
      })
    }
    blocksA.forEach(ingest)
    blocksB.forEach(ingest)
    return keyOrder.map(function (k) {
      var e = byKey[k]
      if (e.subtitle != null) {
        return { subtitle: e.subtitle, items: e.items }
      }
      return { items: e.items }
    })
  }

  function mergeStrongAndExperience(strong, experience) {
    var exp = experience
    if (endsWithCommonGroups(strong) && endsWithCommonGroups(exp)) {
      exp = exp.slice(0, exp.length - SKILLS_COMMON_GROUPS.length)
    }
    var byTitle = {}
    var order = []
    function ingest(g) {
      if (Object.prototype.hasOwnProperty.call(byTitle, g.title)) {
        var prev = byTitle[g.title]
        prev.blocks = mergeBlockLists(prev.blocks, g.blocks)
      } else {
        byTitle[g.title] = { title: g.title, blocks: g.blocks.slice() }
        order.push(g.title)
      }
    }
    strong.forEach(ingest)
    exp.forEach(ingest)
    return order.map(function (t) {
      return byTitle[t]
    })
  }

  function stripCommonSkillGroups(groups) {
    return groups.filter(function (g) {
      return !COMMON_TITLES[g.title]
    })
  }

  function getSkillGroupsForTier(trackId, tier) {
    if (trackId === 'common') return SKILLS_COMMON_GROUPS
    var t = SKILLS_BY_TRACK_AND_TIER[trackId]
    if (!t) return []
    var strong = t.strong || []
    var merged =
      tier === 'strong' ? strong : mergeStrongAndExperience(strong, t.experience || [])
    if (trackId === 'web') {
      return sortSkillGroupsByItemCount(merged)
    }
    if (trackId === 'ml' || trackId === 'llm' || trackId === 'cv') {
      return sortSkillGroupsByItemCount(stripCommonSkillGroups(merged))
    }
    return sortSkillGroupsByItemCount(merged)
  }

  global.portfolioSkillTracks = [
    { id: 'cv', label: 'CV' },
    { id: 'llm', label: 'LLM' },
    { id: 'ml', label: 'ML' },
    { id: 'web', label: 'Web' },
    { id: 'common', label: '공통' },
  ]
  global.portfolioSkillTiers = [
    { id: 'strong', label: '주력' },
    { id: 'experience', label: '경험' },
  ]
  global.portfolioGetSkillGroupsForTier = getSkillGroupsForTier
})(typeof window !== 'undefined' ? window : this)
