(function () {
  // ----- 테마 (다크/라이트) -----
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
    btn.textContent = isLight ? '🌙' : '☀️';
    btn.setAttribute('aria-label', isLight ? '다크 모드로 전환' : '라이트 모드로 전환');
    btn.setAttribute('title', isLight ? '다크 모드' : '라이트 모드');
  }
  (function initTheme() {
    var theme = getPreferredTheme();
    applyTheme(theme);
  })();

  // ----- 주인장 모드 (localhost 또는 비밀번호 입력 시 편집 가능) -----
  var OWNER_PASSWORD = 'portfolio'; // 원하는 비밀번호로 변경하세요.
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
      toggle.textContent = ownerMode ? '편집 모드 종료' : '편집 모드';
      toggle.onclick = function () {
        if (ownerMode) {
          setOwnerMode(false);
        } else {
          if (isLocalhost) {
            setOwnerMode(true);
          } else {
            var pw = prompt('비밀번호를 입력하세요.');
            if (pw === OWNER_PASSWORD) setOwnerMode(true);
            else if (pw !== null) alert('비밀번호가 올바르지 않습니다.');
          }
        }
      };
    }
  }
  updateOwnerUI();

  // 테마 토글 버튼
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

  // 푸터 연도
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // About 만 나이 (React About.jsx·getManAge와 동일)
  function getManAge(year, month, day) {
    var now = new Date();
    var age = now.getFullYear() - year;
    var m = now.getMonth() + 1;
    if (m < month || (m === month && now.getDate() < day)) age -= 1;
    return age;
  }
  var aboutAgeEl = document.getElementById('about-man-age');
  if (aboutAgeEl) {
    aboutAgeEl.textContent = '(만) ' + getManAge(1988, 10, 20);
  }

  // 타이핑 효과 (반복: 입력 → 잠시 대기 → 지우기 → 다시 입력)
  var typingEl = document.getElementById('typing-text');
  if (typingEl) {
    var fullText = '안녕하세요\n꿈을 개발하는 개발자\n Roy 입니다.';
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
      if (index < fullText.length) {
        appendChar(typingEl, fullText[index]);
        index++;
        setTimeout(type, typeSpeed);
      } else {
        setTimeout(erase, pauseAfterType);
      }
    }

    function erase() {
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

  // 프로젝트 직접 추가 (localStorage)
  // v2 키로 변경해서 기존 캐시를 자동으로 무시하도록 함
  var PROJECTS_KEY = 'portfolioProjects_v2';
  var grid = document.getElementById('projectGrid');
  var projectEmpty = document.getElementById('projectEmpty');
  var modal = document.getElementById('projectModal');
  var form = document.getElementById('projectForm');
  var addBtn = document.getElementById('projectAddBtn');
  var imageUrlInput = document.getElementById('projectImageUrl');
  var imageFileInput = document.getElementById('projectImageFile');
  var maxImageSize = 400 * 1024; // 400KB

  var DEFAULT_PROJECTS = [
    {
      title: '공학용 계산기',
      description: '공학용 계산기 + 함수 그래프 시각화 웹 앱입니다. 사칙연산부터 삼각함수, 로그, 그래프까지 지원합니다.',
      tags: 'Python, FastAPI, React, JavaScript, HTML, CSS',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/Calculator',
      image: '',
      projectType: 'personal'
    },
    {
      title: 'LLM 개인 비서 서비스 (BizAi)',
      description: 'LLM 기반 개인 비서(BizAi) 서비스를 위한 모노레포 구조입니다. 백엔드 API, 프론트엔드, ETL 파이프라인, LLM 서버, 인프라를 하나의 레포에서 관리합니다.',
      tags: 'Python, FastAPI, React, TypeScript, Docker, PostgreSQL, LLM',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/LLM_project',
      image: '',
      projectType: 'academy'
    },
    {
      title: 'Portfolio',
      description: '개발 포트폴리오 사이트입니다. About, 교육/연수, Projects, Skills, Certificates, Contact를 담고 있으며 Firebase로 호스팅됩니다.',
      tags: 'HTML, CSS, JavaScript, Firebase, GitHub Actions',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/Portfolio',
      image: '',
      projectType: 'personal'
    },
    {
      title: '하이브리드 번역기',
      description: '무료 번역(deep-translator) + Ollama 로컬 LLM 보정으로 문맥에 맞는 자연스러운 번역을 제공합니다. 바이어 메일 번역, 실시간 통역(타이핑/음성/대화), 배치·파일·다국어 번역을 지원합니다.',
      tags: 'Python, FastAPI, Ollama, deep-translator, JavaScript, HTML, CSS',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/translator',
      image: '',
      projectType: 'personal'
    },
    {
      title: '노인 재가복지 보조금 자가진단',
      description: '노인 재가 복지 지원 보조금을 받을 수 있는지 테스트하는 웹 사이트입니다. 실제 운영 중인 서비스(성심케어)에서 사용 중입니다.',
      tags: 'JavaScript, HTML, CSS',
      demoUrl: 'http://sungsimcare.kr/grade/test07/test06.html',
      codeUrl: 'https://github.com/roykoh88/assist_old_person',
      image: '',
      projectType: 'personal'
    },
    {
      title: '네이버 경제 뉴스 크롤러',
      description: '네이버 뉴스 경제(섹션 101)의 헤드라인 기사 10개를 크롤링해 제목·링크·본문·썸네일을 CSV로 저장하는 파이썬 스크립트입니다.',
      tags: 'Python, Selenium, Pandas, Crawling',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/News_Crawling',
      image: '',
      projectType: 'personal'
    },
    {
      title: 'BulSee (불씨)',
      description: '기상청·산림청 실시간 공공데이터를 수집해 AI로 산불 발생 위험도와 피해 범위를 예측하는 웹 서비스. 지도 기반 지역 조회, 시뮬레이션, 대시보드, 챗봇(OpenAI) 포함.',
      tags: 'Spring Boot, FastAPI, React, TypeScript, PyTorch, XGBoost, GRU, Transformer, Oracle, Docker',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/bulsee',
      image: '',
      projectType: 'academy'
    },
    {
      title: '공부·수면 → 합격 예측 (간단한 AI)',
      description: '개인 공부 목적으로 ChatGPT와 토론하며 만든 프로젝트입니다. 공부시간·수면시간 데이터로 시험 합격 여부를 예측하는 분류 모델(Random Forest, Logistic Regression, Decision Tree, K-NN)을 비교·실험합니다. GPU 없이 실행 가능.',
      tags: 'Python, scikit-learn, Decision Tree, Random Forest, Logistic Regression, KNN',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/simple-ai-study-sleep',
      image: '',
      projectType: 'personal'
    },
    {
      title: 'Muzzle (강아지 입마개 탐지)',
      description: 'YOLOv5/YOLOv8을 사용한 개 탐지 및 대형견·소형견 구분 프로젝트입니다. Stanford Dogs 데이터셋으로 big_dog/small_dog 이진 분류까지 진행했고, 입마개(muzzle) 탐지까지 목표로 했으나 해당 단계는 미완이었습니다. 강아지 인식까지는 구현했습니다.',
      tags: 'Python, PyTorch, YOLOv5, YOLOv8, Ultralytics, Roboflow, OpenCV',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/muzzle',
      image: '',
      projectType: 'academy'
    },
    {
      title: 'Dream Lotto (운세·꿈 해몽 로또 추천)',
      description: '네이버 오늘의 운세와 룰드드림 꿈 해몽을 Selenium으로 수집한 뒤, KLUE-RoBERTa 감정 분류로 감정을 추출하고 감정–숫자 매핑으로 로또 5게임을 추천하는 파이프라인. 번호 분포 엔트로피·시각화, 당첨 번호 백테스트 노트북 포함. 재미 목적.',
      tags: 'Python, Selenium, PyTorch, Transformers, KLUE-RoBERTa, Pandas, openpyxl',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/dream_lotto',
      image: '',
      projectType: 'academy'
    },
    {
      title: 'Dream Web (AI 로또 분석 시스템)',
      description: 'Express + MongoDB + EJS 기반 웹 앱. AI 로또 번호 분석(Python 연동), 동행복권 API 당첨번호 조회, 감정숫자 분류표, AI 상담 챗봇, 후기 게시판, 고객센터(문의·댓글), 관리자·분석 히스토리. SharePoint 웹파트 삽입 구성.',
      tags: 'Node.js, Express, MongoDB, EJS, Multer, Axios, bcrypt, Python',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/dream_web',
      image: '',
      projectType: 'academy'
    }
  ];
  function getProjects() {
    try {
      var raw = localStorage.getItem(PROJECTS_KEY);
      var list = raw ? JSON.parse(raw) : [];
      // 기존에 저장된 목록이 있더라도, 기본 프로젝트(공학용 계산기 등)가 빠져 있으면 자동으로 채워 넣기
      if (DEFAULT_PROJECTS && DEFAULT_PROJECTS.length) {
        DEFAULT_PROJECTS.forEach(function (def) {
          var exists = list.some(function (p) {
            return (p.title || '') === (def.title || '');
          });
          if (!exists) {
            list.push(def);
          }
        });
      }
      if (!raw && list.length) {
        saveProjects(list);
      }
      // placeholder/예시로 저장된 항목은 리스트에서 제거하고 저장
      var skipTitles = ['프로젝트 제목', '또다른 프로젝트'];
      var before = list.length;
      list = list.filter(function (p) {
        var t = (p.title || '').trim();
        return skipTitles.indexOf(t) === -1;
      });
      if (list.length < before) saveProjects(list);
      return list;
    } catch (e) {
      return DEFAULT_PROJECTS.slice();
    }
  }

  // 룰렛 형식: 이 순서대로 표시
  // Muzzle -> Dream Lotto -> 뉴스 크롤링 -> Dream Web -> 노인 재가 복지 ->
  // 공부·수면 -> 불씨 -> 하이브리드 번역기 -> BizAi -> 공학용 계산기 -> Portfolio
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
    'Portfolio'
  ];
  function getProjectsInRouletteOrder() {
    var list = getProjects();
    var order = PROJECT_DISPLAY_ORDER;
    var ordered = [];
    var rest = [];
    list.forEach(function (p) {
      var i = order.indexOf((p.title || '').trim());
      if (i >= 0) ordered.push({ p: p, i: i });
      else rest.push(p);
    });
    ordered.sort(function (a, b) { return a.i - b.i; });
    return ordered.map(function (x) { return x.p; }).concat(rest);
  }

  function saveProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  function renderProjects() {
    var projects = getProjectsInRouletteOrder();
    var allProjects = getProjects();
    if (!grid) return;
    grid.innerHTML = '';
    if (projectEmpty) {
      if (projects.length) {
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
      var typeLabel = type === 'academy' ? '학원 프로젝트' : '개인 프로젝트';
      var typeClass = type === 'academy' ? 'project-badge project-badge--academy' : 'project-badge project-badge--personal';
      var imgHtml = p.image
        ? '<img src="' + p.image + '" alt="">'
        : '<div class="project-placeholder">📁</div>';
      card.innerHTML =
        '<div class="project-image">' + imgHtml +
        '<button type="button" class="project-delete owner-only" aria-label="삭제">×</button></div>' +
        '<div class="project-body">' +
        '<div class="' + typeClass + '">' + typeLabel + '</div>' +
        '<h3 class="project-title">' + escapeHtml(p.title || '제목 없음') + '</h3>' +
        '<p class="project-desc">' + escapeHtml(p.description || '') + '</p>' +
        '<div class="project-tags">' + tags.map(function (t) { return '<span>' + escapeHtml(t) + '</span>'; }).join('') + '</div>' +
        '<div class="project-links">' +
        (p.demoUrl ? '<a href="' + escapeHtml(p.demoUrl) + '" target="_blank" rel="noopener">보기</a>' : '') +
        (p.codeUrl ? '<a href="' + escapeHtml(p.codeUrl) + '" target="_blank" rel="noopener">코드</a>' : '') +
        '</div></div>';
      grid.appendChild(card);
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
        renderProjects();
        renderSkillsFromProjects();
      });
    });
    updateProjectCarouselMode(allProjects.length);
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

  // 모바일(768px 이하)에서는 2개 이상일 때도 가로 스크롤 적용 (핸드폰에서 스와이프 가능)
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
    updateProjectCarouselMode((getProjects && getProjects()) ? getProjects().length : 0);
  });

  // 프로젝트 캐러셀 좌우 스크롤 (끝에서 다음 → 처음, 처음에서 이전 → 끝, 뻉뻉 돌기)
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
        renderProjects();
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
          alert('이미지는 400KB 이하로 올려주세요.');
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

  // 수상/자격증 추가 (localStorage)
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

  /** GitHub Pages에 올린 Portfolio 저장소의 공개 URL (PDF/ 하위 경로) */
  var PDF_PAGES_ORIGIN = 'https://roykoh88.github.io/Portfolio';
  function pdfFromPages(relativePathUnderPdf) {
    return PDF_PAGES_ORIGIN + '/PDF/' + relativePathUnderPdf.split('/').map(function (seg) {
      return encodeURIComponent(seg);
    }).join('/');
  }

  // 학원 수료증·과목 이수증 PDF는 교육/연수에서만 링크 (Certificates 갤러리는 수상·자격증만)
  var CERTIFICATES_SCHEMA_VERSION = 14;
  var DEFAULT_CERTIFICATES = [
    { title: '<휴먼> 최우수상', image: pdfFromPages('수상/최우수상.pdf'), type: 'pdf', category: '수상' },
    { title: '<휴먼> 개근상', image: pdfFromPages('수상/개근상.pdf'), type: 'pdf', category: '수상' },
    { title: '<알파코> 개근상', image: pdfFromPages('수상/개근상1.pdf'), type: 'pdf', category: '수상' },
    { title: '<알파코> 태도 우수상', image: pdfFromPages('수상/알파코 태도 우수상.pdf'), type: 'pdf', category: '수상' },
    { title: '<알파코> 학습 우수상', image: pdfFromPages('수상/알파코 학습 우수상.pdf'), type: 'pdf', category: '수상' },
    { title: '<알파코> 프로젝트 우수상', image: pdfFromPages('수상/알파코 프로젝트 우수상.pdf'), type: 'pdf', category: '수상' },
    { title: '리눅스마스터', image: pdfFromPages('자격증/리눅스마스터.pdf'), type: 'pdf', category: '자격증' }
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
        if (cat === '근무 기록') return false;
        if (cat === '수료증') return false;
        if (cat === '이수증') return false;
        if (img.indexOf('PDF/근무 기록/') === 0 || img.indexOf('/PDF/근무 기록/') >= 0 || img.indexOf('경력증명서_고용재') >= 0) return false;
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
      if (dec.indexOf('/PDF/수상/') >= 0) return '수상';
      if (dec.indexOf('/PDF/자격증/') >= 0) return '자격증';
      if (dec.indexOf('/PDF/학원 수료증/') >= 0) return '수료증';
      if (dec.indexOf('/PDF/수료증/') >= 0) return '수료증';
      if (dec.indexOf('/PDF/이수증/') >= 0) return '이수증';
    } catch (e) { /* ignore */ }
    if (s.indexOf('PDF/수상/') === 0) return '수상';
    if (s.indexOf('PDF/자격증/') === 0) return '자격증';
    if (s.indexOf('PDF/학원 수료증/') === 0) return '수료증';
    if (s.indexOf('PDF/수료증/') === 0) return '수료증';
    if (s.indexOf('PDF/이수증/') === 0) return '이수증';
    return '';
  }
  function inferEducationOrder(item) {
    if (!item || item.category !== '수료증') return;
    var t = ((item.title || '') + ' ' + (item.image || '')).toLowerCase();
    if (t.indexOf('데이터') >= 0 || t.indexOf('데이터 분석') >= 0) return 0;
    if (t.indexOf('ai개발자') >= 0 || t.indexOf('ai 개발자') >= 0) return 1;
    if (t.indexOf('도커') >= 0 || t.indexOf('쿠버') >= 0) return 2;
    if (t.indexOf('리눅스 수료증') >= 0 || t.indexOf('리눅스 수료') >= 0) return 3;
    if (t.indexOf('서버 구성') >= 0 || t.indexOf('서버구성') >= 0) return 4;
    if (t.indexOf('네트워크') >= 0 || t.indexOf('시스코') >= 0) return 8;
    return 9999;
  }
  function normalizeCertificateItem(item) {
    if (!item || typeof item !== 'object') return item;
    if (!item.category) item.category = inferCategoryFromImage(item.image) || '기타';
    if (item.category === '수료증' && item.educationOrder == null) item.educationOrder = inferEducationOrder(item);
    return item;
  }
  function groupCertificates(list) {
    var groups = {};
    (list || []).forEach(function (it) {
      normalizeCertificateItem(it);
      var cat = (it.category || '').trim() || '기타';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(it);
    });
    if (groups['수료증'] && groups['수료증'].length) {
      groups['수료증'].sort(function (a, b) {
        var oa = a.educationOrder != null ? a.educationOrder : 9999;
        var ob = b.educationOrder != null ? b.educationOrder : 9999;
        return oa - ob;
      });
    }
    return groups;
  }
  function getCategoryOrder(groups) {
    var base = ['수상', '자격증', '기타'];
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
    var inner = '';
    if (isPdfItem(item)) {
      var pdfSrc = item.image.indexOf('data:') === 0 ? pdfToViewUrl(item.image) : item.image;
      var viewSrc = pdfSrc ? (pdfSrc.indexOf('#') >= 0 ? pdfSrc : pdfSrc + '#view=FitH&toolbar=0&navpanes=0') : '';
      var safeSrc = viewSrc ? ('' + viewSrc).replace(/&/g, '&amp;').replace(/"/g, '&quot;') : '';
      inner =
        '<div class="certificate-image">' +
        (safeSrc
          ? '<iframe class="certificate-pdf-iframe" src="' + safeSrc + '" title="PDF 미리보기"></iframe>' +
            '<div class="certificate-pdf-overlay" data-index="' + i + '" role="button" tabindex="0" aria-label="PDF 보기"></div>'
          : '<span class="certificate-pdf-icon">📄</span>') +
        '<button type="button" class="certificate-delete owner-only" aria-label="삭제">×</button></div>' +
        '<div class="certificate-title">' + escapeHtml(title) + '</div>';
    } else {
      var imgHtml = item.image
        ? '<img src="' + item.image + '" alt="">'
        : '<span style="font-size:2rem;opacity:0.5">📜</span>';
      inner =
        '<div class="certificate-image">' + imgHtml +
        '<button type="button" class="certificate-delete owner-only" aria-label="삭제">×</button></div>' +
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
      return c !== '기타' && c !== '수료증' && c !== '이수증';
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
      btnPrev.setAttribute('aria-label', '이전');
      var btnNext = document.createElement('button');
      btnNext.type = 'button';
      btnNext.className = 'carousel-btn carousel-next';
      btnNext.setAttribute('aria-label', '다음');

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
        alert('상장 이미지 또는 PDF를 넣어주세요.');
        return;
      }
      function addCert(imgData, isPdf) {
        var list = getCertificates();
        var payload = { title: title, image: imgData || '' };
        if (isPdf) payload.type = 'pdf';
        payload.category = inferCategoryFromImage(payload.image) || '기타';
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
        alert(isPdf ? 'PDF는 2MB 이하로 올려주세요.' : '이미지는 400KB 이하로 올려주세요.');
        return;
      }
      var reader = new FileReader();
      reader.onload = function () { addCert(reader.result, isPdf); };
      reader.readAsDataURL(file);
    });
  }
  renderCertificates();

  // Skills — react-app/data/skillsByTrack.js 와 동일 데이터·규칙
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

    var state = { track: 'web', tier: 'strong' };

    function labelForTrack(id) {
      var l = id;
      tracks.forEach(function (t) {
        if (t.id === id) l = t.label;
      });
      return l;
    }
    function labelForTier(id) {
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
        contextValue.textContent =
          state.track === 'common'
            ? trackLabel + ' · 협업·인프라 공통'
            : trackLabel + ' · ' + tierLabel;
      }
      var groups = getGroups(state.track, state.tier);
      panel.innerHTML = '';
      if (!groups.length) {
        var empty = document.createElement('p');
        empty.className = 'skills-empty-hint';
        empty.textContent = '이 조합에 해당하는 항목이 없습니다.';
        panel.appendChild(empty);
        return;
      }
      groups.forEach(function (g) {
        var div = document.createElement('div');
        div.className = 'skill-group skill-group--panel';
        var h3 = document.createElement('h3');
        h3.className = 'skill-group-title';
        h3.textContent = g.title;
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
  })();

  // 모바일 메뉴 토글
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-label', nav.classList.contains('nav-open') ? '메뉴 닫기' : '메뉴 열기');
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
      });
    });
  }
})();
