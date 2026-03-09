(function () {
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

  // 푸터 연도
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
  var PROJECTS_KEY = 'portfolioProjects';
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
      title: 'Portfolio',
      description: '개발 포트폴리오 사이트입니다. About, 교육/연수, Projects, Skills, Certificates, Contact를 담고 있으며 Firebase로 호스팅됩니다.',
      tags: 'HTML, CSS, JavaScript, Firebase',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/Portfolio',
      image: ''
    },
    {
      title: '하이브리드 번역기',
      description: '무료 번역(deep-translator) + Ollama 로컬 LLM 보정으로 문맥에 맞는 자연스러운 번역을 제공합니다. 바이어 메일 번역, 실시간 통역(타이핑/음성/대화), 배치·파일·다국어 번역을 지원합니다.',
      tags: 'Python, FastAPI, Ollama, deep-translator, JavaScript, HTML, CSS',
      demoUrl: '',
      codeUrl: 'https://github.com/roykoh88/translator',
      image: ''
    },
    {
      title: '노인 재가복지 보조금 자가진단',
      description: '노인 재가 복지 지원 보조금을 받을 수 있는지 테스트하는 웹 사이트입니다. 실제 운영 중인 서비스(성심케어)에서 사용 중입니다.',
      tags: 'JavaScript, HTML, CSS',
      demoUrl: 'http://sungsimcare.kr/grade/test07/test06.html',
      codeUrl: 'https://github.com/roykoh88/assist_old_person',
      image: ''
    }
  ];
  function getProjects() {
    try {
      var raw = localStorage.getItem(PROJECTS_KEY);
      var list = raw ? JSON.parse(raw) : [];
      if (list.length === 0 && DEFAULT_PROJECTS.length) {
        saveProjects(DEFAULT_PROJECTS);
        return DEFAULT_PROJECTS;
      }
      return list;
    } catch (e) {
      return [];
    }
  }

  function saveProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  function renderProjects() {
    var projects = getProjects();
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
      var imgHtml = p.image
        ? '<img src="' + p.image + '" alt="">'
        : '<div class="project-placeholder">📁</div>';
      card.innerHTML =
        '<div class="project-image">' + imgHtml +
        '<button type="button" class="project-delete owner-only" aria-label="삭제">×</button></div>' +
        '<div class="project-body">' +
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
        list.splice(i, 1);
        saveProjects(list);
        renderProjects();
        renderSkillsFromProjects();
      });
    });
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
  var certificateGrid = document.getElementById('certificateGrid');
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

  var CERTIFICATES_SCHEMA_VERSION = 2;
  var DEFAULT_CERTIFICATES = [
    { title: '리눅스 마스터', image: 'PDF/리눅스마스터.pdf', type: 'pdf' },
    { title: '수료증 1', image: 'PDF/수료증1.pdf', type: 'pdf' },
    { title: '수료증 2', image: 'PDF/수료증2.pdf', type: 'pdf' },
    { title: '수료증 3', image: 'PDF/수료증3.pdf', type: 'pdf' },
    { title: '수료증 4', image: 'PDF/수료증4.pdf', type: 'pdf' },
    { title: '수료증 5', image: 'PDF/수료증5.pdf', type: 'pdf' },
    { title: '수료증 6', image: 'PDF/수료증6.pdf', type: 'pdf' }
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
      if (version < CERTIFICATES_SCHEMA_VERSION || list.length === 0) {
        saveCertificates(DEFAULT_CERTIFICATES);
        return DEFAULT_CERTIFICATES;
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
  function renderCertificates() {
    if (!certificateGrid) return;
    certificateBlobUrls.forEach(function (u) { try { URL.revokeObjectURL(u); } catch (e) {} });
    certificateBlobUrls = [];
    var list = getCertificates();
    certificateGrid.innerHTML = '';
    list.forEach(function (item, i) {
      var card = document.createElement('div');
      card.className = 'certificate-card';
      if (isPdfItem(item)) card.classList.add('is-pdf');
      card.dataset.index = i;
      var title = (item.title || '').trim();
      var inner = '';
      if (isPdfItem(item)) {
        var pdfSrc = item.image.indexOf('data:') === 0 ? pdfToViewUrl(item.image) : item.image;
        var viewSrc = pdfSrc ? (pdfSrc.indexOf('#') >= 0 ? pdfSrc : pdfSrc + '#view=FitH') : '';
        var safeSrc = viewSrc ? ('' + viewSrc).replace(/&/g, '&amp;').replace(/"/g, '&quot;') : '';
        inner =
          '<div class="certificate-image">' +
          (safeSrc
            ? '<iframe class="certificate-pdf-iframe" src="' + safeSrc + '" title="PDF 미리보기"></iframe>' +
              '<div class="certificate-pdf-overlay" data-index="' + i + '" role="button" tabindex="0" aria-label="새 창에서 PDF 보기"></div>'
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
      certificateGrid.appendChild(card);
      var pdfOverlay = card.querySelector('.certificate-pdf-overlay');
      if (pdfOverlay) {
        function openPdfNewTab() {
          var idx = parseInt(pdfOverlay.getAttribute('data-index'), 10);
          var list = getCertificates();
          var it = list[idx];
          if (it && it.image) openPdfView(it.image);
        }
        pdfOverlay.addEventListener('click', openPdfNewTab);
        pdfOverlay.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPdfNewTab(); } });
      }
      var delBtn = card.querySelector('.certificate-delete');
      if (delBtn) delBtn.addEventListener('click', function () {
        var arr = getCertificates();
        arr.splice(i, 1);
        saveCertificates(arr);
        renderCertificates();
      });
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
