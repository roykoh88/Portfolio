(function () {
  // ----- Theme (dark/light) -----
  var THEME_KEY = 'portfolioTheme';
  function getPreferredTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }
  function applyTheme(theme) {
    if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
  }
  function updateThemeToggleUI() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? '\u263d' : '\u2600';
    if (typeof portfolioT === 'function') {
      btn.setAttribute('aria-label', isLight ? portfolioT('header.themeToDark') : portfolioT('header.themeToLight'));
      btn.setAttribute('title', isLight ? portfolioT('header.themeDark') : portfolioT('header.themeLight'));
    } else {
      btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      btn.setAttribute('title', isLight ? 'Dark mode' : 'Light mode');
    }
  }
  (function initTheme() {
    var theme = getPreferredTheme();
    applyTheme(theme);
  })();

  // ----- Owner mode (always on at localhost, otherwise session-based) -----
  var OWNER_PASSWORD = 'portfolio'; // Change if needed.
  var isLocalhost = /^localhost$|^127\.0\.0\.1$/.test(location.hostname);
  var ownerMode = isLocalhost || sessionStorage.getItem('portfolioOwner') === '1';

  function setOwnerMode(on) {
    if (on) {
      sessionStorage.setItem('portfolioOwner', '1');
    } else {
      sessionStorage.removeItem('portfolioOwner');
    }
    location.reload();
  }

  function updateOwnerUI() {
    document.body.classList.toggle('owner-mode', ownerMode);
    var toggle = document.getElementById('ownerModeToggle');
    if (toggle) {
      var onLabel = typeof portfolioT === 'function' ? portfolioT('footer.ownerOn') : 'Exit edit mode';
      var offLabel = typeof portfolioT === 'function' ? portfolioT('footer.ownerOff') : 'Edit mode';
      toggle.textContent = ownerMode ? onLabel : offLabel;
      toggle.onclick = function () {
        if (ownerMode) {
          setOwnerMode(false);
        } else {
          if (isLocalhost) {
            setOwnerMode(true);
          } else {
            var promptMsg = typeof portfolioT === 'function' ? portfolioT('owner.promptPassword') : 'Enter password.';
            var wrongMsg = typeof portfolioT === 'function' ? portfolioT('owner.wrongPassword') : 'Incorrect password.';
            var pw = prompt(promptMsg);
            if (pw === OWNER_PASSWORD) setOwnerMode(true);
            else if (pw !== null) alert(wrongMsg);
          }
        }
      };
    }
  }
  updateOwnerUI();

  // Theme toggle button
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    updateThemeToggleUI();
    themeBtn.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      var next = isLight ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
      updateThemeToggleUI();
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hero typing effect (uses static-i18n hero.typing; fallback text below)
  var typingEl = document.getElementById('typing-text');
  var heroTypingRunId = 0;
  function startHeroTyping() {
    if (!typingEl) return;
    heroTypingRunId += 1;
    var runId = heroTypingRunId;
    typingEl.innerHTML = '';
    var fullText =
      typeof portfolioT === 'function'
        ? portfolioT('hero.typing')
        : "Hello\nI'm Roy,\na developer who builds dreams with code.";
    var index = 0;
    var typeSpeed = 120;
    var eraseSpeed = 80;
    var pauseAfterType = 2000;
    var pauseAfterErase = 600;

    function appendChar(el, char) {
      if (char === '\n') {
        el.appendChild(document.createElement('br'));
      } else {
        el.appendChild(document.createTextNode(char));
      }
    }

    function type() {
      if (runId !== heroTypingRunId) return;
      if (index < fullText.length) {
        appendChar(typingEl, fullText[index]);
        index++;
        setTimeout(type, typeSpeed);
      } else {
        setTimeout(erase, pauseAfterType);
      }
    }

    function erase() {
      if (runId !== heroTypingRunId) return;
      if (typingEl.lastChild) {
        typingEl.removeChild(typingEl.lastChild);
        setTimeout(erase, eraseSpeed);
      } else {
        index = 0;
        setTimeout(type, pauseAfterErase);
      }
    }

    type();
  }
  startHeroTyping();
  document.addEventListener('portfolio-lang-change', function () {
    startHeroTyping();
  });

  // Projects in owner mode (localStorage)
  // If you change schema, bump PROJECTS_SCHEMA_VERSION and/or PROJECTS_KEY.
  var grid = document.getElementById('projectGrid');
  var projectEmpty = document.getElementById('projectEmpty');
  var modal = document.getElementById('projectModal');
  var form = document.getElementById('projectForm');
  var addBtn = document.getElementById('projectAddBtn');
  var imageUrlInput = document.getElementById('projectImageUrl');
  var imageFileInput = document.getElementById('projectImageFile');
  var maxImageSize = 400 * 1024; // 400KB
  /** @type {'all'|'personal'|'academy'|'outsourced'} */
  var projectListFilter = 'all';
  var lastProjectCarouselCount = 0;

  var DEFAULT_PROJECTS = [
    {
      title: '공학용 계산기',
      titleEn: 'Scientific calculator',
      description:
        '공학용 계산기 + 함수 그래프 시각화 웹 앱입니다. 사칙연산부터 삼각함수, 로그, 그래프까지 지원합니다.',
      descriptionEn:
        'A scientific calculator and function graphing web app—from basic arithmetic to trig, logs, and plots.',
      tags: 'Python, FastAPI, React, JavaScript, HTML, CSS',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/Calculator',
      image: '',
      projectType: 'personal'
    },
    {
      title: 'LLM 개인 비서 서비스 (BizAi)',
      titleEn: 'LLM personal assistant (BizAi)',
      description:
        'LLM 기반 개인 비서(BizAi) 서비스를 위한 모노레포 구조입니다. 백엔드 API, 프론트엔드, ETL 파이프라인, LLM 서버, 인프라를 하나의 레포에서 관리합니다.',
      descriptionEn:
        'Monorepo for a BizAi LLM-powered assistant: backend APIs, frontend, ETL, LLM server, and infra in one repository.',
      tags: 'Python, FastAPI, React, TypeScript, Docker, PostgreSQL, LLM',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/LLM_project',
      image: '',
      projectType: 'academy',
      institution: '휴먼 AI 교육센터',
      institutionEn: 'Human AI Training Center'
    },
    {
      title: 'Portfolio',
      titleEn: 'Portfolio',
      description:
        '개발 포트폴리오 사이트입니다. About, Education, Projects, Skills, Certificates, Contact를 담고 있으며 Firebase로 호스팅됩니다.',
      descriptionEn:
        'Developer portfolio with About, Education, Projects, Skills, Certificates, and Contact—hosted on Firebase.',
      tags: 'HTML, CSS, JavaScript, Firebase, GitHub Actions',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/Portfolio',
      image: '',
      projectType: 'personal'
    },
    {
      title: '하이브리드 번역기',
      titleEn: 'Hybrid translator',
      description:
        '무료 번역(deep-translator) + Ollama 로컬 LLM 보정으로 문맥에 맞는 자연스러운 번역을 제공합니다. 바이어 메일 번역, 실시간 통역(타이핑/음성/대화), 배치·파일·다국어 번역을 지원합니다.',
      descriptionEn:
        'Combines free translation (deep-translator) with local Ollama LLM polishing for more natural, context-aware output. Buyer-email translation, live interpretation (typing/voice/chat), batch/file, and multilingual modes.',
      tags: 'Python, FastAPI, Ollama, deep-translator, JavaScript, HTML, CSS',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/translator',
      image: '',
      projectType: 'personal'
    },
    {
      title: '노인 재가복지 보조금 자가진단',
      titleEn: 'Home-care subsidy self-assessment (seniors)',
      description:
        '노인 재가 복지 지원 보조금을 받을 수 있는지 테스트하는 웹 사이트입니다. 실제 운영 중인 서비스(성심케어)에서 사용 중입니다.',
      descriptionEn:
        'A simple web check for whether someone may qualify for senior home-care support subsidies. Used in production by SungSim Care.',
      tags: 'JavaScript, HTML, CSS',
      demoUrl: 'http://sungsimcare.kr/grade/test07/test06.html',
      codeUrl: 'https://github.com/roykoh88/assist_old_person',
      image: '',
      projectType: 'outsourced',
      institution: '성심케어',
      institutionEn: 'SungSim Care'
    },
    {
      title: '네이버 경제 뉴스 크롤러',
      titleEn: 'Naver economy news crawler',
      description:
        '네이버 뉴스 경제(섹션 101)의 헤드라인 기사 10개를 크롤링해 제목·링크·본문·썸네일을 CSV로 저장하는 파이썬 스크립트입니다.',
      descriptionEn:
        'Python script that crawls ten headline articles from Naver News Economy (section 101) and saves title, link, body, and thumbnail to CSV.',
      tags: 'Python, Selenium, Pandas, Crawling',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/News_Crawling',
      image: '',
      projectType: 'personal'
    },
    {
      title: 'BulSee (불씨)',
      titleEn: 'BulSee',
      description:
        '기상청·산림청 실시간 공공데이터를 수집해 AI로 산불 발생 위험도와 피해 범위를 예측하는 웹 서비스. 지도 기반 지역 조회, 시뮬레이션, 대시보드, 챗봇(OpenAI) 포함.',
      descriptionEn:
        'Web service that ingests live KMA & forest-agency open data to estimate wildfire risk and impact with AI. Map-based lookup, simulation, dashboard, and an OpenAI chatbot.',
      tags: 'Spring Boot, FastAPI, React, TypeScript, PyTorch, XGBoost, GRU, Transformer, Oracle, Docker',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/bulsee',
      image: '',
      projectType: 'academy',
      institution: '휴먼 AI 교육센터',
      institutionEn: 'Human AI Training Center'
    },
    {
      title: '공부·수면 → 합격 예측 (간단한 AI)',
      titleEn: 'Study & sleep → pass prediction (simple AI)',
      description:
        '개인 공부 목적으로 ChatGPT와 토론하며 만든 프로젝트입니다. 공부시간·수면시간 데이터로 시험 합격 여부를 예측하는 분류 모델(Random Forest, Logistic Regression, Decision Tree, K-NN)을 비교·실험합니다. GPU 없이 실행 가능.',
      descriptionEn:
        'Personal study project built with ChatGPT as a sparring partner. Compares classifiers (Random Forest, logistic regression, decision tree, k-NN) on study/sleep hours vs. pass/fail. Runs without a GPU.',
      tags: 'Python, scikit-learn, Decision Tree, Random Forest, Logistic Regression, KNN',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/simple-ai-study-sleep',
      image: '',
      projectType: 'personal'
    },
    {
      title: 'Muzzle (강아지 입마개 탐지)',
      titleEn: 'Muzzle (dog muzzle detection)',
      description:
        'YOLOv5/YOLOv8을 사용한 개 탐지 및 대형견·소형견 구분 프로젝트입니다. Stanford Dogs 데이터셋으로 big_dog/small_dog 이진 분류까지 진행했고, 입마개(muzzle) 탐지까지 목표로 했으나 해당 단계는 미완이었습니다. 강아지 인식까지는 구현했습니다.',
      descriptionEn:
        'Dog detection with YOLOv5/YOLOv8 and large vs. small dog separation. Trained a big_dog/small_dog head on Stanford Dogs; muzzle detection was planned but not finished—dog recognition is implemented.',
      tags: 'Python, PyTorch, YOLOv5, YOLOv8, Ultralytics, Roboflow, OpenCV',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/muzzle',
      image: '',
      projectType: 'academy',
      institution: '알파코',
      institutionEn: 'Alphaco'
    },
    {
      title: 'Bbox Local Labeler',
      titleEn: 'Bbox Local Labeler',
      description:
        '로컬 환경에서 이미지를 열고 BBox를 수동 라벨링하거나 YOLO 모델로 자동 라벨링하고, 데이터 증강과 .pt 재학습까지 이어서 진행할 수 있는 PySide6 데스크톱 앱입니다. 라벨은 YOLO Detection 포맷으로 저장합니다. 이미지·폴더·.pt 드래그 앤 드롭, classes.txt 기반 클래스 관리, 미라벨 일괄 자동 라벨링(진행 중 수동 수정 가능), train/val/test 분할 및 학습 기법 옵션(Small-Object Tiles, Mosaic, MixUp 등), BBox 개수별 필터, 한·영 UI, 단축키·휠 확대 축소를 지원합니다.',
      descriptionEn:
        'PySide6 desktop app for a fully local workflow: open images, draw or edit YOLO-format bounding boxes, auto-label with a YOLO .pt (current or batch unlabeled), run augmentation with synced labels, and retrain—without relying on paid hosted tools. Drag-and-drop for images, folders, and models; classes.txt; protected manual saves during batch runs; train/val/test splits and training options (e.g. small-object tiles, mosaic, mix-up); BBox-count grouping for review; Korean/English UI; shortcuts and wheel zoom.',
      tags: 'Python, PySide6, Ultralytics, YOLO, Pillow, Computer Vision, PyTorch',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/Auto_CV_Labeling',
      image: '',
      projectType: 'personal'
    },
    {
      title: 'Dream Lotto (운세·꿈 해몽 로또 추천)',
      titleEn: 'Dream Lotto (horoscope & dream-based Lotto picks)',
      description:
        '네이버 오늘의 운세와 룰드드림 꿈 해몽을 Selenium으로 수집한 뒤, KLUE-RoBERTa 감정 분류로 감정을 추출하고 감정–숫자 매핑으로 로또 5게임을 추천하는 파이프라인. 번호 분포 엔트로피·시각화, 당첨 번호 백테스트 노트북 포함. 재미 목적.',
      descriptionEn:
        'Pipeline that scrapes Naver daily horoscope and dream-interpretation text with Selenium, runs KLUE-RoBERTa sentiment, maps emotions to numbers, and suggests five Lotto games—plus entropy/visualization and a backtest notebook. For fun only.',
      tags: 'Python, Selenium, PyTorch, Transformers, KLUE-RoBERTa, Pandas, openpyxl',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/dream_lotto',
      image: '',
      projectType: 'academy',
      institution: '알파코',
      institutionEn: 'Alphaco'
    },
    {
      title: 'Dream Web (AI 로또 분석 시스템)',
      titleEn: 'Dream Web (AI Lotto analysis system)',
      description:
        'Express + MongoDB + EJS 기반 웹 앱. AI 로또 번호 분석(Python 연동), 동행복권 API 당첨번호 조회, 감정숫자 분류표, AI 상담 챗봇, 후기 게시판, 고객센터(문의·댓글), 관리자·분석 히스토리. SharePoint 웹파트 삽입 구성.',
      descriptionEn:
        'Express + MongoDB + EJS app: AI Lotto analysis (Python), official draw lookup API, emotion–number table, AI chatbot, reviews board, support tickets with comments, admin analysis history, and SharePoint web-part embedding.',
      tags: 'Node.js, Express, MongoDB, EJS, Multer, Axios, bcrypt, Python',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/dream_web',
      image: '',
      projectType: 'academy',
      institution: '알파코',
      institutionEn: 'Alphaco'
    }
  ];
  var DEFAULT_PROJECT_BY_TITLE = {};
  DEFAULT_PROJECTS.forEach(function (def) {
    var k = (def.title || '').trim();
    if (k) DEFAULT_PROJECT_BY_TITLE[k] = def;
    var te = (def.titleEn || '').trim();
    if (te) DEFAULT_PROJECT_BY_TITLE[te] = def;
  });
  var DEFAULT_PROJECT_BY_CODE_URL = {};
  DEFAULT_PROJECTS.forEach(function (def) {
    var u = (def.codeUrl || '').trim();
    if (u) DEFAULT_PROJECT_BY_CODE_URL[u] = def;
  });

  /** getProjects(): load from localStorage and normalize/merge defaults */
  var projectsListCache = null;
  function invalidateProjectsCache() {
    projectsListCache = null;
  }

  /** Merge missing locale fields from DEFAULT_PROJECTS into stored projects. */
  function mergeDefaultLocaleFields(list) {
    if (!list || !DEFAULT_PROJECTS.length) return false;
    var mutated = false;
    list.forEach(function (p) {
      var t = (p.title || '').trim();
      var def = DEFAULT_PROJECT_BY_TITLE[t];
      if (!def && p.titleEn) {
        def = DEFAULT_PROJECT_BY_TITLE[String(p.titleEn).trim()];
      }
      if (!def && p.codeUrl) {
        def = DEFAULT_PROJECT_BY_CODE_URL[String(p.codeUrl).trim()];
      }
      if (!def) return;
      if (def.titleEn && (p.titleEn === undefined || p.titleEn === null || String(p.titleEn).trim() === '')) {
        p.titleEn = def.titleEn;
        mutated = true;
      }
      if (
        def.descriptionEn != null &&
        String(def.descriptionEn).trim() !== '' &&
        (p.descriptionEn === undefined || p.descriptionEn === null || String(p.descriptionEn).trim() === '')
      ) {
        p.descriptionEn = def.descriptionEn;
        mutated = true;
      }
      if ((!p.projectType || String(p.projectType).trim() === '') && def.projectType) {
        p.projectType = def.projectType;
        mutated = true;
      }
      if (
        (!p.institution || String(p.institution).trim() === '') &&
        def.institution
      ) {
        p.institution = def.institution;
        mutated = true;
      }
      if (
        (!p.institutionEn || String(p.institutionEn).trim() === '') &&
        def.institutionEn
      ) {
        p.institutionEn = def.institutionEn;
        mutated = true;
      }
    });
    return mutated;
  }

  /** ??? ????? codeUrl ???? DEFAULT_PROJECTS? ??????. */
  function syncCanonicalProjectsByCodeUrl(list) {
    if (!list || !DEFAULT_PROJECTS.length) return false;
    function isPlaceholderInstitution(val) {
      var s = String(val == null ? '' : val).trim();
      if (!s) return false;
      return /^\?+$/.test(s);
    }
    var byCode = {};
    DEFAULT_PROJECTS.forEach(function (d) {
      var u = (d.codeUrl || '').trim();
      if (u) byCode[u] = d;
    });
    var fields = [
      'title',
      'titleEn',
      'description',
      'descriptionEn',
      'tags',
      'projectType',
      'institution',
      'institutionEn'
    ];
    var mutated = false;
    list.forEach(function (p) {
      var u = (p.codeUrl || '').trim();
      if (!u || !byCode[u]) return;
      var def = byCode[u];
      fields.forEach(function (field) {
        if (def[field] === undefined) return;
        if (
          (field === 'institution' || field === 'institutionEn') &&
          isPlaceholderInstitution(def[field])
        ) {
          return;
        }
        if (p[field] !== def[field]) {
          p[field] = def[field];
          mutated = true;
        }
      });
    });
    return mutated;
  }

  function getProjects() {
    if (projectsListCache !== null) return projectsListCache;
    try {
      var raw = localStorage.getItem(PROJECTS_KEY);
      var list = raw ? JSON.parse(raw) : [];
      // Normalize/merge and then drop placeholders.
      if (DEFAULT_PROJECTS && DEFAULT_PROJECTS.length) {
        DEFAULT_PROJECTS.forEach(function (def) {
          var defU = (def.codeUrl || '').trim();
          var defT = (def.title || '').trim();
          var defTe = (def.titleEn || '').trim();
          var exists = list.some(function (p) {
            var pt = (p.title || '').trim();
            var pu = (p.codeUrl || '').trim();
            var pte = (p.titleEn || '').trim();
            if (pt === defT) return true;
            if (defU && pu === defU) return true;
            if (defTe && pt === defTe) return true;
            if (defTe && pte === defTe) return true;
            return false;
          });
          if (!exists) {
            list.push(def);
          }
        });
      }
      if (!raw && list.length) {
        saveProjects(list);
      }
      // Remove placeholder items (if any) that slipped in.
      var skipTitles = ['(placeholder)', '(draft)'];
      var before = list.length;
      list = list.filter(function (p) {
        var t = (p.title || '').trim();
        return skipTitles.indexOf(t) === -1;
      });
      if (list.length < before) saveProjects(list);
      if (mergeDefaultLocaleFields(list)) {
        saveProjects(list);
      }
      if (syncCanonicalProjectsByCodeUrl(list)) {
        saveProjects(list);
      }
      projectsListCache = list;
      return list;
    } catch (e) {
      projectsListCache = DEFAULT_PROJECTS.slice();
      return projectsListCache;
    }
  }

  // Project display order (roulette / featured order)
  var PROJECT_DISPLAY_ORDER = [
    'Muzzle (강아지 입마개 탐지)',
    'Dream Lotto (운세·꿈 해몽 로또 추천)',
    '네이버 경제 뉴스 크롤러',
    'Dream Web (AI 로또 분석 시스템)',
    '노인 재가복지 보조금 자가진단',
    '공부·수면 → 합격 예측 (간단한 AI)',
    'BulSee (불씨)',
    '하이브리드 번역기',
    'LLM 개인 비서 서비스 (BizAi)',
    '공학용 계산기',
    'Portfolio',
    'Bbox Local Labeler'
  ];
  function getProjectsInRouletteOrder(list) {
    var src = list != null ? list : getProjects();
    var order = PROJECT_DISPLAY_ORDER;
    var ordered = [];
    var rest = [];
    src.forEach(function (p) {
      var i = order.indexOf((p.title || '').trim());
      if (i >= 0) ordered.push({ p: p, i: i });
      else rest.push(p);
    });
    ordered.sort(function (a, b) { return b.i - a.i; });
    return ordered.map(function (x) { return x.p; }).concat(rest);
  }

  function filterProjectsByType(list, filterKey) {
    if (!filterKey || filterKey === 'all') return list;
    return list.filter(function (p) {
      var t = (p.projectType || 'personal');
      if (filterKey === 'personal') return t === 'personal';
      if (filterKey === 'academy') return t === 'academy';
      if (filterKey === 'outsourced') return t === 'outsourced';
      return true;
    });
  }

  function saveProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    invalidateProjectsCache();
  }

  function projectLang() {
    return typeof portfolioGetLang === 'function' ? portfolioGetLang() : 'ko';
  }
  /** @param {string} [forLang] Optional language override ('ko'|'en') */
  function effectiveProjectLang(forLang) {
    if (forLang === 'en' || forLang === 'ko') return forLang;
    return projectLang();
  }
  function projectCardTitle(p, forLang) {
    if (effectiveProjectLang(forLang) === 'en' && p.titleEn) return p.titleEn;
    return p.title || '';
  }
  function projectCardDescription(p, forLang) {
    if (effectiveProjectLang(forLang) === 'en' && p.descriptionEn) return p.descriptionEn;
    return p.description || '';
  }
  function ptProjects(key, fallback, forLang) {
    var L = effectiveProjectLang(forLang);
    if (typeof portfolioTAt === 'function') {
      var s = portfolioTAt(L, 'projects.' + key);
      if (s && s !== 'projects.' + key) return s;
    }
    if (typeof portfolioT === 'function') {
      var s2 = portfolioT('projects.' + key);
      if (s2 && s2 !== 'projects.' + key) return s2;
    }
    return fallback;
  }
  function ptCert(key, fallback) {
    if (typeof portfolioT === 'function') {
      var s = portfolioT('certificates.' + key);
      if (s && s !== 'certificates.' + key) return s;
    }
    return fallback;
  }

  var PRIVATE_CODE_KAKAO_URL = 'https://open.kakao.com/o/sVwpT3ni';
  function isPrivateCodeGateUrl(url) {
    var u = String(url || '').trim().replace(/\/+$/, '');
    return u === 'https://github.com/roykoh88/Auto_CV_Labeling';
  }

  function renderProjects(forLang) {
    var allProjects = getProjects();
    var ordered = getProjectsInRouletteOrder(allProjects);
    var projects = filterProjectsByType(ordered, projectListFilter);
    if (!grid) return;
    grid.innerHTML = '';
    var filterEmptyEl = document.getElementById('projectFilterEmpty');
    if (filterEmptyEl) {
      if (projects.length === 0 && ordered.length > 0) {
        filterEmptyEl.hidden = false;
        filterEmptyEl.textContent = ptProjects('filterEmpty', '\uc774 \ubd84\ub958\uc5d0 \ud574\ub2f9\ud558\ub294 \ud504\ub85c\uc81d\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.', forLang);
      } else {
        filterEmptyEl.hidden = true;
      }
    }
    if (projectEmpty) {
      if (allProjects.length) {
        projectEmpty.classList.add('hidden-when-has-projects');
      } else {
        projectEmpty.classList.remove('hidden-when-has-projects');
      }
    }
    projects.forEach(function (p, i) {
      var tags = (p.tags || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
      var card = document.createElement('article');
      card.className = 'project-card';
      card.dataset.index = i;
      var type = (p.projectType || 'personal');
      var typeLabel =
        type === 'academy'
          ? ptProjects('academy', 'BootCamp Project', forLang)
          : type === 'outsourced'
            ? ptProjects('outsourced', '\uc678\uc8fc \ud504\ub85c\uc81d\ud2b8', forLang)
            : ptProjects('personal', '\uac1c\uc778 \ud504\ub85c\uc81d\ud2b8', forLang);
      var typeClass =
        type === 'academy'
          ? 'project-badge project-badge--academy'
          : type === 'outsourced'
            ? 'project-badge project-badge--outsourced'
            : 'project-badge project-badge--personal';
      var delAria = ptProjects('deleteAria', '\uc0ad\uc81c', forLang);
      var demoLabel = ptProjects('demo', '\ubcf4\uae30', forLang);
      var codeLabel = ptProjects('code', '\ucf54\ub4dc', forLang);
      var noTitle = ptProjects('noTitle', '\uc81c\ubaa9 \uc5c6\uc74c', forLang);
      var instLine = '';
      if (type === 'academy' || type === 'outsourced') {
        var instKo = (p.institution || '').trim();
        var instEn = (p.institutionEn || '').trim();
        var instTit = (p.title || '').trim();
        var instDef = DEFAULT_PROJECT_BY_TITLE[instTit];
        if (!instDef && p.titleEn) {
          instDef = DEFAULT_PROJECT_BY_TITLE[String(p.titleEn).trim()];
        }
        if (!instDef && p.codeUrl) {
          instDef = DEFAULT_PROJECT_BY_CODE_URL[String(p.codeUrl).trim()];
        }
        if (instDef) {
          if (!instKo && instDef.institution) instKo = instDef.institution;
          if (!instEn && instDef.institutionEn) instEn = instDef.institutionEn;
        }
        var instText =
          effectiveProjectLang(forLang) === 'en' ? (instEn || instKo) : (instKo || instEn);
        if (instText) {
          instLine = '<p class="project-institution">' + escapeHtml(instText) + '</p>';
        }
      }
      var imgHtml = p.image
        ? '<img src="' + p.image + '" alt="">'
        : '<div class="project-placeholder">\ud83d\udcc1</div>';
      card.innerHTML =
        '<div class="project-image">' + imgHtml +
        '<button type="button" class="project-delete owner-only" aria-label="' + escapeHtml(delAria) + '">?</button></div>' +
        '<div class="project-body">' +
        '<div class="' + typeClass + '">' + escapeHtml(typeLabel) + '</div>' +
        '<h3 class="project-title">' + escapeHtml(projectCardTitle(p, forLang) || noTitle) + '</h3>' +
        instLine +
        '<p class="project-desc">' + escapeHtml(projectCardDescription(p, forLang) || '') + '</p>' +
        '<div class="project-tags">' + tags.map(function (t) { return '<span>' + escapeHtml(t) + '</span>'; }).join('') + '</div>' +
        '<div class="project-links">' +
        (p.demoUrl ? '<a href="' + escapeHtml(p.demoUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(demoLabel) + '</a>' : '') +
        (p.codeUrl
          ? (isPrivateCodeGateUrl(p.codeUrl)
              ? '<a href="#" class="project-code-private" role="button">' + escapeHtml(codeLabel) + '</a>'
              : '<a href="' + escapeHtml(p.codeUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(codeLabel) + '</a>')
          : '') +
        '</div></div>';
      grid.appendChild(card);
      var privCodeA = card.querySelector('a.project-code-private');
      if (privCodeA) {
        privCodeA.addEventListener('click', function (e) {
          e.preventDefault();
          var msg = ptProjects('privateCodeConfirm', '', forLang);
          if (!msg || msg === 'projects.privateCodeConfirm') {
            msg =
              effectiveProjectLang(forLang) === 'en'
                ? 'This repository is private. Viewing the code requires my approval. Would you like to contact me via KakaoTalk?'
                : '\uc774 \uc800\uc7a5\uc18c\ub294 \ube44\uacf5\uac1c(Private)\uc785\ub2c8\ub2e4. \ucf54\ub4dc\ub97c \ubcf4\uc2dc\ub824\uba74 \uc81c \uc2b9\uc778\uc774 \ud544\uc694\ud569\ub2c8\ub2e4. \uce74\uce74\uc624\ud1a1\uc73c\ub85c \uc5f0\ub77d\ud574 \ubcf4\uc2dc\uaca0\uc2b5\ub2c8\uae4c?';
          }
          if (window.confirm(msg)) {
            window.open(PRIVATE_CODE_KAKAO_URL, '_blank', 'noopener,noreferrer');
          }
        });
      }
      card.querySelector('.project-delete').addEventListener('click', function () {
        var list = getProjects();
        var idx = list.findIndex(function (item) {
          return (item.title || '') === (p.title || '') &&
            (item.codeUrl || '') === (p.codeUrl || '') &&
            (item.demoUrl || '') === (p.demoUrl || '');
        });
        if (idx === -1) idx = list.findIndex(function (item) { return (item.title || '') === (p.title || ''); });
        if (idx >= 0) list.splice(idx, 1);
        saveProjects(list);
        renderProjects(forLang);
        renderSkillsFromProjects();
      });
    });
    lastProjectCarouselCount = projects.length;
    updateProjectCarouselMode(projects.length);
    renderSkillsFromProjects();
  }

  function renderSkillsFromProjects() {
    var container = document.getElementById('skillTagsFromProjects');
    var hint = document.getElementById('skillFromProjectsHint');
    if (!container) return;
    var projects = getProjects();
    var set = {};
    projects.forEach(function (p) {
      var tags = (p.tags || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
      tags.forEach(function (t) { set[t] = true; });
    });
    var list = Object.keys(set).sort();
    container.innerHTML = '';
    if (hint) hint.style.display = list.length ? 'none' : 'block';
    list.forEach(function (tag) {
      var li = document.createElement('li');
      li.textContent = tag;
      container.appendChild(li);
    });
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function openModal() {
    if (modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      if (form) form.reset();
      if (imageFileInput) imageFileInput.value = '';
    }
  }

  // Mobile: slightly fewer rows/cards (layout tuning).
  var CAROUSEL_MOBILE_BREAKPOINT = 768;
  function updateProjectCarouselMode(projectCount) {
    var carouselEl = document.querySelector('.project-carousel');
    if (!carouselEl) return;
    var isMobile = typeof window !== 'undefined' && window.innerWidth <= CAROUSEL_MOBILE_BREAKPOINT;
    var useScroll = projectCount > 5 || (isMobile && projectCount >= 2);
    carouselEl.classList.remove('project-carousel--fill', 'project-carousel--scroll');
    carouselEl.classList.add(useScroll ? 'project-carousel--scroll' : 'project-carousel--fill');
  }
  window.addEventListener('resize', function () {
    updateProjectCarouselMode(lastProjectCarouselCount);
  });

  // Client-side image size guard (prevents huge base64 storage).
  var carouselScroll = document.getElementById('projectCarouselScroll');
  var carouselPrev = document.getElementById('projectCarouselPrev');
  var carouselNext = document.getElementById('projectCarouselNext');
  if (carouselScroll && carouselPrev && carouselNext) {
    function getScrollStep() {
      var first = carouselScroll.querySelector('.project-card');
      return first ? first.offsetWidth + parseInt(getComputedStyle(carouselScroll).gap, 10) || 24 : 320;
    }
    function isAtStart() {
      return carouselScroll.scrollLeft <= 2;
    }
    function isAtEnd() {
      var max = carouselScroll.scrollWidth - carouselScroll.clientWidth;
      return max <= 0 || carouselScroll.scrollLeft >= max - 2;
    }
    carouselPrev.addEventListener('click', function () {
      if (isAtStart()) {
        carouselScroll.scrollTo({ left: carouselScroll.scrollWidth - carouselScroll.clientWidth, behavior: 'smooth' });
      } else {
        carouselScroll.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      }
    });
    carouselNext.addEventListener('click', function () {
      if (isAtEnd()) {
        carouselScroll.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselScroll.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      }
    });
  }

  var projectFilterWrap = document.getElementById('projectFilter');
  if (projectFilterWrap) {
    projectFilterWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.project-filter-btn');
      if (!btn || !projectFilterWrap.contains(btn)) return;
      var f = btn.getAttribute('data-filter');
      if (!f) return;
      projectListFilter = f;
      projectFilterWrap.querySelectorAll('.project-filter-btn').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      renderProjects();
    });
  }

  if (addBtn) addBtn.addEventListener('click', openModal);
  if (modal) {
    document.getElementById('projectModalClose').addEventListener('click', closeModal);
    document.getElementById('projectModalBackdrop').addEventListener('click', closeModal);
  }
  if (document.getElementById('projectFormCancel')) {
    document.getElementById('projectFormCancel').addEventListener('click', closeModal);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var title = (fd.get('title') || '').trim();
      var description = (fd.get('description') || '').trim();
      var tags = (fd.get('tags') || '').trim();
      var demoUrl = (fd.get('demoUrl') || '').trim();
      var codeUrl = (fd.get('codeUrl') || '').trim();
      var image = (imageUrlInput && imageUrlInput.value) ? imageUrlInput.value.trim() : '';

      if (!title) return;

      function addWithImage(imgData) {
        var list = getProjects();
        list.push({
          title: title,
          description: description,
          tags: tags,
          demoUrl: demoUrl || '',
          codeUrl: codeUrl || '',
          image: imgData || ''
        });
        saveProjects(list);
        renderProjects(undefined);
        renderSkillsFromProjects();
        closeModal();
      }

      if (image) {
        addWithImage(image);
        return;
      }
      var file = imageFileInput && imageFileInput.files[0];
      if (file) {
        if (file.size > maxImageSize) {
          alert(ptProjects('alertImageSize', 'Image is too large (max 400KB).'));
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          addWithImage(reader.result);
        };
        reader.readAsDataURL(file);
        return;
      }
      addWithImage('');
    });
  }

  renderProjects();

  // Skills data (kept in sync with react-app/data/skillsByTrack.js)
  (function initSkillsTrackPanel() {
    var getGroups =
      typeof window.portfolioGetSkillGroupsForTier === 'function'
        ? window.portfolioGetSkillGroupsForTier
        : null;
    var tracks = window.portfolioSkillTracks;
    var tiers = window.portfolioSkillTiers;
    if (!getGroups || !tracks || !tiers) return;

    var panel = document.getElementById('skillsFilteredPanel');
    var tierRow = document.getElementById('skillsTierRow');
    var contextValue = document.getElementById('skillsContextValue');
    var trackBtns = document.querySelectorAll('[data-skill-track]');
    var tierBtns = document.querySelectorAll('[data-skill-tier]');
    if (!panel || !trackBtns.length) return;

    var state = { track: 'llm', tier: 'strong' };

    function labelForTrack(id) {
      if (id === 'common' && typeof portfolioT === 'function') return portfolioT('skills.trackCommon');
      var l = id;
      tracks.forEach(function (t) {
        if (t.id === id) l = t.label;
      });
      return l;
    }
    function labelForTier(id) {
      if (id === 'strong' && typeof portfolioT === 'function') return portfolioT('skills.tierStrong');
      if (id === 'experience' && typeof portfolioT === 'function') return portfolioT('skills.tierExp');
      var l = id;
      tiers.forEach(function (t) {
        if (t.id === id) l = t.label;
      });
      return l;
    }

    function render() {
      var trackLabel = labelForTrack(state.track);
      var tierLabel = labelForTier(state.tier);
      trackBtns.forEach(function (btn) {
        var on = btn.getAttribute('data-skill-track') === state.track;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (tierRow) {
        tierRow.style.display = state.track === 'common' ? 'none' : '';
      }
      tierBtns.forEach(function (btn) {
        var on = btn.getAttribute('data-skill-tier') === state.tier;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (contextValue) {
        var suffix =
          typeof portfolioT === 'function'
            ? portfolioT('skills.contextCommonSuffix')
            : 'No projects found.';
        contextValue.textContent =
          state.track === 'common' ? trackLabel + ' ? ' + suffix : trackLabel + ' ? ' + tierLabel;
      }
      var groups = getGroups(state.track, state.tier);
      panel.innerHTML = '';
      if (!groups.length) {
        var empty = document.createElement('p');
        empty.className = 'skills-empty-hint';
        empty.textContent =
          typeof portfolioT === 'function'
            ? portfolioT('skills.empty')
            : 'Failed to load projects.';
        panel.appendChild(empty);
        return;
      }
      groups.forEach(function (g) {
        var div = document.createElement('div');
        div.className = 'skill-group skill-group--panel';
        var h3 = document.createElement('h3');
        h3.className = 'skill-group-title';
        h3.textContent =
          typeof portfolioSkillTitleEn === 'function' ? portfolioSkillTitleEn(g.title) : g.title;
        div.appendChild(h3);
        (g.blocks || []).forEach(function (block) {
          if (block.subtitle) {
            var sub = document.createElement('span');
            sub.className = 'skill-subtitle';
            sub.textContent = block.subtitle;
            div.appendChild(sub);
          }
          var ul = document.createElement('ul');
          ul.className = 'skill-tags';
          (block.items || []).forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            ul.appendChild(li);
          });
          div.appendChild(ul);
        });
        panel.appendChild(div);
      });
    }

    trackBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.track = btn.getAttribute('data-skill-track');
        render();
      });
    });
    tierBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.tier = btn.getAttribute('data-skill-tier');
        render();
      });
    });

    render();
    document.addEventListener('portfolio-lang-change', function () {
      render();
    });
  })();

  // Awards/Certificates (localStorage) - runs only when certificateGroups exists in static HTML.
  var CERTIFICATES_KEY = 'portfolioCertificates';
  var certificateGroups = document.getElementById('certificateGroups');
  var certificateModal = document.getElementById('certificateModal');
  var certificateForm = document.getElementById('certificateForm');
  var certificateImageUrl = document.getElementById('certificateImageUrl');
  var certificateImageFile = document.getElementById('certificateImageFile');
  var maxCertPdfSize = 2 * 1024 * 1024; // 2MB for PDF
  var certificateBlobUrls = [];

  function isPdfItem(item) {
    if (item.type === 'pdf') return true;
    if (!item.image) return false;
    if (item.image.indexOf('data:application/pdf') === 0) return true;
    if (typeof item.image === 'string' && item.image.toLowerCase().endsWith('.pdf')) return true;
    return false;
  }
  function pdfToViewUrl(src) {
    if (!src || src.indexOf('data:') !== 0) return src;
    try {
      var base64 = src.split(',')[1];
      if (!base64) return null;
      var bin = atob(base64);
      var len = bin.length;
      var bytes = new Uint8Array(len);
      for (var j = 0; j < len; j++) bytes[j] = bin.charCodeAt(j);
      var blob = new Blob([bytes], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      certificateBlobUrls.push(url);
      return url;
    } catch (e) {
      return null;
    }
  }
  function openPdfView(src) {
    if (src.indexOf('data:') === 0) {
      var url = pdfToViewUrl(src);
      if (url) {
        window.open(url, '_blank');
        setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
      } else {
        window.open(src, '_blank');
      }
    } else {
      window.open(src, '_blank');
    }
  }

  /** GitHub Pages portfolio PDF URL helper (PDF/...) */
  var PDF_PAGES_ORIGIN = 'https://roykoh88.github.io/Portfolio';
  /** Mirrors logic from react-app/src/config/portfolioPages.js and static-i18n.js */
  var FIREBASE_STORAGE_BUCKET = 'yjkohproject.firebasestorage.app';
  var FIREBASE_STORAGE_DOWNLOAD_TOKENS = {
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/AI\uac1c\ubc1c\uc790 \uc218\ub8cc\uc99d.pdf': '73eae910-2ff1-4e92-bac5-e4d10848abe8',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub124\ud2b8\uc6cc\ud06c \uc218\ub8cc\uc99d.pdf': 'ade03022-8624-4dec-bb00-0dc8d18c1433',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub370\uc774\ud130 \ubd84\uc11d \uc218\ub8cc\uc99d.pdf': '9ee71e23-cb49-494d-b2bf-25ae143fc38e',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub3c4\ucee4 & \ucfe0\ubc84 \uc218\ub8cc\uc99d.pdf': '976bea00-eba5-4a42-b7b6-4966ea8f67aa',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub9ac\ub205\uc2a4 \uc218\ub8cc\uc99d.pdf': 'e4615cda-2181-4c37-af9b-c528293eb836',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub9ac\ub205\uc2a41 \uc218\ub8cc\uc99d.pdf': '11887c51-8313-41d6-bf99-03bfa94a8bc5',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ub9ac\ub205\uc2a42 \uc218\ub8cc\uc99d.pdf': '4926ba48-bc9c-4956-8497-3c82b88e9062',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc11c\ubc84 \uad6c\uc131 \uc218\ub8cc\uc99d.pdf': '2698a634-dca3-490c-8360-4b2bdff60251',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc11c\ubc84 \uad6c\uc1311\ud68c\ucc28 \uc218\ub8cc\uc99d.pdf': '53227cd9-b2c1-4ae4-b35d-d3b70baa15a4',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc528\uc2a4\ucf541 \uc218\ub8cc\uc99d.pdf': 'b50426ac-31fe-46b7-85b7-077b0134eadc',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc528\uc2a4\ucf542 \uc218\ub8cc\uc99d.pdf': 'ad62f147-c2ff-4560-a0b0-163a049ffcaf',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5481 \uc218\ub8cc\uc99d.pdf': '1cf18e55-42a8-45e1-b796-a76a8d04b60d',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5482 \uc218\ub8cc\uc99d.pdf': '05f57cc9-b1d2-40c1-9a02-6c1edb69d50e',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5483 \uc218\ub8cc\uc99d.pdf': 'e31a6f01-0a52-4e5e-bc45-6238fc8e834c',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5484 \uc218\ub8cc\uc99d.pdf': '7a287b93-891a-4130-84ac-e5797654a8e2',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5485 \uc218\ub8cc\uc99d.pdf': 'ff083384-e059-4668-8e5d-b3127ff5c696',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\uc815\ubcf4\ubcf4\uc5486 \uc218\ub8cc\uc99d.pdf': '9fe86d78-90ff-4298-9e53-610efdc1acde',
    '\ud559\uc6d0 \uc218\ub8cc\uc99d/\ud504\ub860\ud2b8&\ubc31\uc5d4\ub4dc\ud480\uc2a4\ud0dd\uac1c\ubc1c\uc790 \uc218\ub8cc\uc99d.pdf': '252cd855-d890-4152-a918-17a9f9484f4c',
    '\uc218\uc0c1/\uc54c\ud30c\ucf54 \ucd9c\uc11d \uc6b0\uc218\uc0c1.pdf': 'f44b0c3c-9b20-4f54-a002-29fcd63415ea',
    '\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud0dc\ub3c4 \uc6b0\uc218\uc0c1.pdf': 'ce6f46f5-eddf-4c7c-8027-879c82ed0379',
    '\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud504\ub85c\uc81d\ud2b8 \uc6b0\uc218\uc0c1.pdf': '23ab1ea8-fbd9-4f8f-bc3b-e5426022d2a8',
    '\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud559\uc2b5 \uc6b0\uc218\uc0c1.pdf': '5aa0844c-a7ee-445f-bc77-990467e11fdb',
    '\uc218\uc0c1/\ud734\uba3c \uac1c\uadfc\uc0c1.pdf': 'fd03a002-9ccf-4587-961d-ded3f16495a4',
    '\uc218\uc0c1/\ud734\uba3c \uc790\ub3d9\ud654 \ud504\ub85c\uc81d\ud2b8 \ucd5c\uc6b0\uc218\uc0c1.pdf': '51c0dd68-c878-45bb-98b1-cfda96f39f36',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_1.pdf': 'b81d29c8-f7ba-4930-ba9e-44afe510bbc0',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_2.pdf': '03456b8c-f420-47ad-843d-716b5049eef8',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_3.pdf': '85c65fe8-897a-4a88-a54f-d678a58f832e',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_4.pdf': 'b52c1575-f47b-44d3-bb04-0e3ec626187c',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_5.pdf': 'e5404eef-4989-42f0-9914-e16b4990e620',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_6.pdf': '8125b6e5-f45e-425e-a5fd-ebd017dc1ccb',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_7.pdf': 'e82effb3-2185-44b6-bf95-5a40b02e46be',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_8.pdf': '87088659-8b5c-46e1-aa64-179057140b15',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_9.pdf': '9070210f-7d85-4a66-974f-97a0af11802e',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_10.pdf': '909f4d58-2527-4d00-b104-a2981aad683a',
    '\uc774\uc218\uc99d/\uc774\uc218\uc99d_11.pdf': '35e9a9e7-b02f-421f-8b4f-c973326f3113',
    '\uc790\uaca9\uc99d/\ub9ac\ub205\uc2a4\ub9c8\uc2a4\ud130.pdf': 'ebe7ac59-f1c4-4ea1-840a-ad904fc66a55',
  };
  function firebaseStorageDownloadUrlScript(objectPath, downloadToken) {
    return 'https://firebasestorage.googleapis.com/v0/b/' + FIREBASE_STORAGE_BUCKET + '/o/' + encodeURIComponent(objectPath) + '?alt=media&token=' + downloadToken;
  }
  function pdfFromPages(relativePathUnderPdf) {
    var token = FIREBASE_STORAGE_DOWNLOAD_TOKENS[relativePathUnderPdf];
    if (token) {
      return firebaseStorageDownloadUrlScript(relativePathUnderPdf, token);
    }
    return PDF_PAGES_ORIGIN + '/PDF/' + relativePathUnderPdf.split('/').map(function (seg) {
      return encodeURIComponent(seg);
    }).join('/');
  }

  // Awards/Certificates PDF defaults (Education certificates are linked in Education section only)
  var CERTIFICATES_SCHEMA_VERSION = 15;
  var DEFAULT_CERTIFICATES = [
    { title: '<\ud734\uba3c> \uc790\ub3d9\ud654 \ud504\ub85c\uc81d\ud2b8 \ucd5c\uc6b0\uc218\uc0c1', image: pdfFromPages('\uc218\uc0c1/\ud734\uba3c \uc790\ub3d9\ud654 \ud504\ub85c\uc81d\ud2b8 \ucd5c\uc6b0\uc218\uc0c1.pdf'), type: 'pdf', category: '\uc218\uc0c1' },
    { title: '<\ud734\uba3c> \uac1c\uadfc\uc0c1', image: pdfFromPages('\uc218\uc0c1/\ud734\uba3c \uac1c\uadfc\uc0c1.pdf'), type: 'pdf', category: '\uc218\uc0c1' },
    { title: '<\uc54c\ud30c\ucf54> \ucd9c\uc11d \uc6b0\uc218\uc0c1', image: pdfFromPages('\uc218\uc0c1/\uc54c\ud30c\ucf54 \ucd9c\uc11d \uc6b0\uc218\uc0c1.pdf'), type: 'pdf', category: '\uc218\uc0c1' },
    { title: '<\uc54c\ud30c\ucf54> \ud0dc\ub3c4 \uc6b0\uc218\uc0c1', image: pdfFromPages('\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud0dc\ub3c4 \uc6b0\uc218\uc0c1.pdf'), type: 'pdf', category: '\uc218\uc0c1' },
    { title: '<\uc54c\ud30c\ucf54> \ud504\ub85c\uc81d\ud2b8 \uc6b0\uc218\uc0c1', image: pdfFromPages('\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud504\ub85c\uc81d\ud2b8 \uc6b0\uc218\uc0c1.pdf'), type: 'pdf', category: '\uc218\uc0c1' },
    { title: '<\uc54c\ud30c\ucf54> \ud559\uc2b5 \uc6b0\uc218\uc0c1', image: pdfFromPages('\uc218\uc0c1/\uc54c\ud30c\ucf54 \ud559\uc2b5 \uc6b0\uc218\uc0c1.pdf'), type: 'pdf', category: '\uc218\uc0c1' },
    { title: '\ub9ac\ub205\uc2a4\ub9c8\uc2a4\ud130', image: pdfFromPages('\uc790\uaca9\uc99d/\ub9ac\ub205\uc2a4\ub9c8\uc2a4\ud130.pdf'), type: 'pdf', category: '\uc790\uaca9\uc99d' }
  ];
  function getCertificates() {
    try {
      var raw = localStorage.getItem(CERTIFICATES_KEY);
      if (!raw) {
        saveCertificates(DEFAULT_CERTIFICATES);
        return DEFAULT_CERTIFICATES;
      }
      var data = JSON.parse(raw);
      var list = Array.isArray(data) ? data : (data.list || []);
      var version = Array.isArray(data) ? 1 : (data.v || 1);
      list = list.filter(function (item) {
        var img = (item.image || '').replace(/\\/g, '/');
        var cat = (item.category || '').trim();
        if (cat === '\uadfc\ubb34 \uae30\ub85d') return false;
        if (cat === '\uc218\ub8cc\uc99d') return false;
        if (cat === '\uc774\uc218\uc99d') return false;
        if (img.indexOf('PDF/\uadfc\ubb34 \uae30\ub85d/') === 0 || img.indexOf('/PDF/\uadfc\ubb34 \uae30\ub85d/') >= 0 || img.indexOf('\uacbd\ub825\uc99d\uba85\uc11c_\uace0\uc6a9\uc7ac') >= 0) return false;
        return true;
      });
      if (version < CERTIFICATES_SCHEMA_VERSION) {
        var anyDrive = list.some(function (l) {
          return (l.image || '').indexOf('drive.google.com') >= 0;
        });
        var anyRawGithub = list.some(function (l) {
          return (l.image || '').indexOf('raw.githubusercontent.com') >= 0;
        });
        var anyRelativePdf = list.some(function (l) {
          var i = (l.image || '').replace(/\\/g, '/');
          if (i.indexOf('://') >= 0) return false;
          var n = i.replace(/^\.\/+/, '');
          return n.indexOf('PDF/') === 0;
        });
        if (list.length === 0 || anyDrive || anyRawGithub || anyRelativePdf) {
          saveCertificates(DEFAULT_CERTIFICATES);
          return DEFAULT_CERTIFICATES;
        }
        DEFAULT_CERTIFICATES.forEach(function (def) {
          if (!list.some(function (l) { return (l.image || '').replace(/\\/g, '/') === (def.image || '').replace(/\\/g, '/'); })) list.push(def);
        });
        saveCertificates(list);
      } else {
        saveCertificates(list);
      }
      return list;
    } catch (e) {
      saveCertificates(DEFAULT_CERTIFICATES);
      return DEFAULT_CERTIFICATES;
    }
  }
  function saveCertificates(list) {
    localStorage.setItem(CERTIFICATES_KEY, JSON.stringify({
      v: CERTIFICATES_SCHEMA_VERSION,
      list: list
    }));
  }
  function inferCategoryFromImage(image) {
    if (!image) return '';
    var s = ('' + image).replace(/\\/g, '/');
    try {
      var dec = decodeURIComponent(s);
      if (dec.indexOf('/PDF/\uadfc\ubb34 \uae30\ub85d/') >= 0) return '\uadfc\ubb34 \uae30\ub85d';
      if (dec.indexOf('/PDF/\uc218\ub8cc\uc99d/') >= 0) return '\uc218\ub8cc\uc99d';
      if (dec.indexOf('/PDF/\uc774\uc218\uc99d/') >= 0) return '\uc774\uc218\uc99d';
      if (dec.indexOf('/PDF/\uc790\uaca9\uc99d/') >= 0) return '\uc790\uaca9\uc99d';
      if (dec.indexOf('/PDF/\uc218\uc0c1/') >= 0) return '\uc218\uc0c1';
    } catch (e) { /* ignore */ }
    if (s.indexOf('PDF/\uadfc\ubb34 \uae30\ub85d/') === 0) return '\uadfc\ubb34 \uae30\ub85d';
    if (s.indexOf('PDF/\uc218\ub8cc\uc99d/') === 0) return '\uc218\ub8cc\uc99d';
    if (s.indexOf('PDF/\uc774\uc218\uc99d/') === 0) return '\uc774\uc218\uc99d';
    if (s.indexOf('PDF/\uc790\uaca9\uc99d/') === 0) return '\uc790\uaca9\uc99d';
    if (s.indexOf('PDF/\uc218\uc0c1/') === 0) return '\uc218\uc0c1';
    return '';
  }
  function inferEducationOrder(item) {
    if (!item || item.category !== '\uc218\ub8cc\uc99d') return;
    var t = ((item.title || '') + ' ' + (item.image || '')).toLowerCase();
    if (t.indexOf('kic') >= 0) return 0;
    if (t.indexOf('ai') >= 0) return 1;
    if (t.indexOf('network') >= 0 || t.indexOf('\ub124\ud2b8\uc6cc\ud06c') >= 0) return 2;
    if (t.indexOf('java') >= 0 || t.indexOf('frontend') >= 0) return 3;
    if (t.indexOf('sql') >= 0 || t.indexOf('db') >= 0) return 4;
    return 9999;
  }
  function normalizeCertificateItem(item) {
    if (!item || typeof item !== 'object') return item;
    if (!item.category) item.category = inferCategoryFromImage(item.image) || '\uae30\ud0c0';
    if (item.category === '\uc218\ub8cc\uc99d' && item.educationOrder == null) item.educationOrder = inferEducationOrder(item);
    return item;
  }
  function groupCertificates(list) {
    var groups = {};
    (list || []).forEach(function (it) {
      normalizeCertificateItem(it);
      var cat = (it.category || '').trim() || '\uae30\ud0c0';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(it);
    });
    if (groups['\uc218\ub8cc\uc99d'] && groups['\uc218\ub8cc\uc99d'].length) {
      groups['\uc218\ub8cc\uc99d'].sort(function (a, b) {
        var oa = a.educationOrder != null ? a.educationOrder : 9999;
        var ob = b.educationOrder != null ? b.educationOrder : 9999;
        return oa - ob;
      });
    }
    return groups;
  }
  function getCategoryOrder(groups) {
    var base = ['\uc218\ub8cc\uc99d', '\uc774\uc218\uc99d', '\uc790\uaca9\uc99d', '\uc218\uc0c1', '\uadfc\ubb34 \uae30\ub85d', '\uae30\ud0c0'];
    var cats = Object.keys(groups || {});
    cats.sort(function (a, b) {
      var ia = base.indexOf(a);
      var ib = base.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    return cats;
  }
  var certificateViewerModal = document.getElementById('certificateViewerModal');
  var certificateViewerIframe = document.getElementById('certificateViewerIframe');
  var certificateViewerTitle = document.getElementById('certificateViewerTitle');
  var certificateViewerList = [];
  var certificateViewerIndex = 0;

  function getPdfSrcForViewer(src) {
    if (!src) return '';
    var hash = '#view=FitH&toolbar=0&navpanes=0';
    if (src.indexOf('data:') === 0) {
      var url = pdfToViewUrl(src);
      return url ? url + hash : '';
    }
    return (src.indexOf('#') >= 0 ? src : src + hash);
  }
  function openCertificateViewer(items, index) {
    if (!items || !items.length || !certificateViewerModal || !certificateViewerIframe) return;
    certificateViewerList = items;
    certificateViewerIndex = index >= 0 && index < items.length ? index : 0;
    var it = certificateViewerList[certificateViewerIndex];
    certificateViewerIframe.src = getPdfSrcForViewer(it && it.image ? it.image : '');
    certificateViewerTitle.textContent = (it && it.title) ? it.title : '';
    certificateViewerModal.classList.add('is-open');
    certificateViewerModal.setAttribute('aria-hidden', 'false');
    updateCertificateViewerArrows();
  }
  function closeCertificateViewer() {
    if (certificateViewerModal) {
      certificateViewerModal.classList.remove('is-open');
      certificateViewerModal.setAttribute('aria-hidden', 'true');
      if (certificateViewerIframe) certificateViewerIframe.src = 'about:blank';
    }
  }
  function updateCertificateViewerArrows() {
    var prevBtn = document.getElementById('certificateViewerPrev');
    var nextBtn = document.getElementById('certificateViewerNext');
    if (prevBtn) prevBtn.style.visibility = certificateViewerList.length <= 1 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = certificateViewerList.length <= 1 ? 'hidden' : 'visible';
  }
  function certificateViewerGo(delta) {
    certificateViewerIndex = (certificateViewerIndex + delta + certificateViewerList.length) % certificateViewerList.length;
    var it = certificateViewerList[certificateViewerIndex];
    certificateViewerIframe.src = getPdfSrcForViewer(it && it.image ? it.image : '');
    certificateViewerTitle.textContent = (it && it.title) ? it.title : '';
  }

  function renderCertificateCard(item, i, onDelete, groupItems, indexInGroup) {
    var card = document.createElement('div');
    card.className = 'certificate-card';
    if (isPdfItem(item)) card.classList.add('is-pdf');
    card.dataset.index = i;
    var title = (item.title || '').trim();
    var certDelAria = escapeHtml(ptCert('deleteAria', 'Delete'));
    var inner = '';
    if (isPdfItem(item)) {
      var pdfSrc = item.image.indexOf('data:') === 0 ? pdfToViewUrl(item.image) : item.image;
      var viewSrc = pdfSrc ? (pdfSrc.indexOf('#') >= 0 ? pdfSrc : pdfSrc + '#view=FitH&toolbar=0&navpanes=0') : '';
      var safeSrc = viewSrc ? ('' + viewSrc).replace(/&/g, '&amp;').replace(/"/g, '&quot;') : '';
      inner =
        '<div class="certificate-image">' +
        (safeSrc
          ? '<iframe class="certificate-pdf-iframe" src="' + safeSrc + '" title="PDF preview"></iframe>' +
            '<div class="certificate-pdf-overlay" data-index="' + i + '" role="button" tabindex="0" aria-label="Open PDF"></div>'
          : '<span class="certificate-pdf-icon">PDF</span>') +
        '<button type="button" class="certificate-delete owner-only" aria-label="' + certDelAria + '">?</button></div>' +
        '<div class="certificate-title">' + escapeHtml(title) + '</div>';
    } else {
      var imgHtml = item.image
        ? '<img src="' + item.image + '" alt="">'
        : '<span style="font-size:2rem;opacity:0.5">No image</span>';
      inner =
        '<div class="certificate-image">' + imgHtml +
        '<button type="button" class="certificate-delete owner-only" aria-label="' + certDelAria + '">?</button></div>' +
        '<div class="certificate-title">' + escapeHtml(title) + '</div>';
    }
    card.innerHTML = inner;

    var pdfOverlay = card.querySelector('.certificate-pdf-overlay');
    if (pdfOverlay) {
      pdfOverlay.addEventListener('click', function () {
        if (groupItems && groupItems.length && typeof indexInGroup === 'number') {
          openCertificateViewer(groupItems, indexInGroup);
        } else if (item && item.image) {
          openPdfView(item.image);
        }
      });
      pdfOverlay.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (groupItems && groupItems.length && typeof indexInGroup === 'number') {
            openCertificateViewer(groupItems, indexInGroup);
          } else if (item && item.image) {
            openPdfView(item.image);
          }
        }
      });
    }
    var delBtn = card.querySelector('.certificate-delete');
    if (delBtn) delBtn.addEventListener('click', function () { if (onDelete) onDelete(); });
    return card;
  }
  function renderCertificates() {
    if (!certificateGroups) return;
    certificateBlobUrls.forEach(function (u) { try { URL.revokeObjectURL(u); } catch (e) {} });
    certificateBlobUrls = [];
    var list = getCertificates();
    certificateGroups.innerHTML = '';

    var normalized = (list || []).map(function (it) { return normalizeCertificateItem(it); });
    var groups = groupCertificates(normalized);
    var cats = getCategoryOrder(groups).filter(function (c) {
      return c !== '\uae30\ud0c0' && c !== '';
    });

    cats.forEach(function (cat) {
      var section = document.createElement('section');
      section.className = 'certificate-group';
      var titleEl = document.createElement('h3');
      titleEl.className = 'certificate-group-title';
      titleEl.textContent = cat;

      var carousel = document.createElement('div');
      carousel.className = 'certificate-carousel';

      var btnPrev = document.createElement('button');
      btnPrev.type = 'button';
      btnPrev.className = 'carousel-btn carousel-prev';
      btnPrev.setAttribute('aria-label', 'Previous');
      var btnNext = document.createElement('button');
      btnNext.type = 'button';
      btnNext.className = 'carousel-btn carousel-next';
      btnNext.setAttribute('aria-label', 'Next');

      var scrollWrap = document.createElement('div');
      scrollWrap.className = 'certificate-carousel-scroll';

      var grid = document.createElement('div');
      grid.className = 'certificate-grid';

      scrollWrap.appendChild(grid);
      carousel.appendChild(btnPrev);
      carousel.appendChild(scrollWrap);
      carousel.appendChild(btnNext);
      section.appendChild(titleEl);
      section.appendChild(carousel);
      certificateGroups.appendChild(section);

      var groupItems = groups[cat] || [];
      groupItems.forEach(function (item, groupIndex) {
        var idx = normalized.indexOf(item);
        var card = renderCertificateCard(item, idx, function () {
          var arr = getCertificates().map(function (it) { return normalizeCertificateItem(it); });
          var target = arr.indexOf(item);
          if (target === -1) target = idx;
          if (target >= 0) arr.splice(target, 1);
          saveCertificates(arr);
          renderCertificates();
        }, groupItems, groupIndex);
        grid.appendChild(card);
      });

      (function setupCarousel(scrollEl, prevBtn, nextBtn) {
        function getScrollStep() {
          var first = scrollEl.querySelector('.certificate-card');
          var gap = 16;
          return first ? first.offsetWidth + gap : 240;
        }
        function isAtStart() { return scrollEl.scrollLeft <= 2; }
        function isAtEnd() {
          var max = scrollEl.scrollWidth - scrollEl.clientWidth;
          return max <= 0 || scrollEl.scrollLeft >= max - 2;
        }
        prevBtn.addEventListener('click', function () {
          if (isAtStart()) {
            scrollEl.scrollTo({ left: scrollEl.scrollWidth - scrollEl.clientWidth, behavior: 'smooth' });
          } else {
            scrollEl.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
          }
        });
        nextBtn.addEventListener('click', function () {
          if (isAtEnd()) {
            scrollEl.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollEl.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
          }
        });
      })(scrollWrap, btnPrev, btnNext);
    });
  }
  function openCertificateModal() {
    if (certificateModal) {
      certificateModal.classList.add('is-open');
      certificateModal.setAttribute('aria-hidden', 'false');
    }
  }
  function closeCertificateModal() {
    if (certificateModal) {
      certificateModal.classList.remove('is-open');
      certificateModal.setAttribute('aria-hidden', 'true');
      if (certificateForm) certificateForm.reset();
      if (certificateImageFile) certificateImageFile.value = '';
    }
  }

  if (document.getElementById('certificateViewerClose')) {
    document.getElementById('certificateViewerClose').addEventListener('click', closeCertificateViewer);
  }
  if (document.getElementById('certificateViewerBackdrop')) {
    document.getElementById('certificateViewerBackdrop').addEventListener('click', closeCertificateViewer);
  }
  if (document.getElementById('certificateViewerPrev')) {
    document.getElementById('certificateViewerPrev').addEventListener('click', function () { certificateViewerGo(-1); });
  }
  if (document.getElementById('certificateViewerNext')) {
    document.getElementById('certificateViewerNext').addEventListener('click', function () { certificateViewerGo(1); });
  }

  if (document.getElementById('certificateAddBtn')) {
    document.getElementById('certificateAddBtn').addEventListener('click', openCertificateModal);
  }
  if (document.getElementById('certificateModalClose')) {
    document.getElementById('certificateModalClose').addEventListener('click', closeCertificateModal);
  }
  if (document.getElementById('certificateModalBackdrop')) {
    document.getElementById('certificateModalBackdrop').addEventListener('click', closeCertificateModal);
  }
  if (document.getElementById('certificateFormCancel')) {
    document.getElementById('certificateFormCancel').addEventListener('click', closeCertificateModal);
  }
  if (certificateForm) {
    certificateForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var title = (certificateForm.querySelector('[name="title"]') && certificateForm.querySelector('[name="title"]').value) || '';
      title = title.trim();
      var image = certificateImageUrl && certificateImageUrl.value ? certificateImageUrl.value.trim() : '';
      if (!image && (!certificateImageFile || !certificateImageFile.files[0])) {
        alert(ptCert('addNeedMedia', 'Please provide an image URL/file or a PDF URL.'));
        return;
      }
      function addCert(imgData, isPdf) {
        var list = getCertificates();
        var payload = { title: title, image: imgData || '' };
        if (isPdf) payload.type = 'pdf';
        payload.category = inferCategoryFromImage(payload.image) || '\uae30\ud0c0';
        list.push(payload);
        saveCertificates(list);
        renderCertificates();
        closeCertificateModal();
      }
      if (image) {
        var isPdfUrl = image.toLowerCase().endsWith('.pdf');
        addCert(image, isPdfUrl);
        return;
      }
      var file = certificateImageFile.files[0];
      var isPdf = file.type === 'application/pdf';
      var maxSize = isPdf ? maxCertPdfSize : maxImageSize;
      if (file.size > maxSize) {
        alert(isPdf ? ptCert('alertPdfTooBig', 'PDF is too large (max 2MB).') : ptCert('alertImageTooBig', 'Image is too large (max 400KB).'));
        return;
      }
      var reader = new FileReader();
      reader.onload = function () { addCert(reader.result, isPdf); };
      reader.readAsDataURL(file);
    });
  }
  renderCertificates();

  function syncNavToggleAria() {
    var navEl = document.querySelector('.nav');
    var tgl = document.querySelector('.nav-toggle');
    if (!tgl) return;
    var open = navEl && navEl.classList.contains('nav-open');
    if (typeof portfolioT === 'function') {
      tgl.setAttribute('aria-label', open ? portfolioT('header.menuClose') : portfolioT('header.menuOpen'));
    } else {
      tgl.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }

  // End
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    syncNavToggleAria();
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
      syncNavToggleAria();
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        syncNavToggleAria();
      });
    });
  }

  document.addEventListener('portfolio-lang-change', function (e) {
    var nextLang = e && e.detail && (e.detail.lang === 'en' || e.detail.lang === 'ko') ? e.detail.lang : undefined;
    updateThemeToggleUI();
    updateOwnerUI();
    syncNavToggleAria();
    renderProjects(nextLang);
    renderCertificates();
  });
})();

