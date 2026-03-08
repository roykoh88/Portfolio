(function () {
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

  function getProjects() {
    try {
      var raw = localStorage.getItem(PROJECTS_KEY);
      return raw ? JSON.parse(raw) : [];
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
      projectEmpty.style.display = projects.length ? 'none' : 'block';
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
        '<button type="button" class="project-delete" aria-label="삭제">×</button></div>' +
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
