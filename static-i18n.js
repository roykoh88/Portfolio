/**
 * 정적 HTML용 i18n — React messages.js / education·awards·cert 데이터와 맞춤
 * localStorage 키: portfolioLang ('ko' | 'en')
 */
(function (global) {
  var LANG_KEY = 'portfolioLang'
  var PDF =
    'https://roykoh88.github.io/Portfolio/PDF/'

  function pdfUrl(encodedPathFromPdfRoot) {
    return PDF + encodedPathFromPdfRoot
  }

  var MESSAGES = {
    ko: {
      meta: { title: 'Roy Koh | 개발 포트폴리오', desc: '그동안 개발한 프로젝트와 경험을 담은 포트폴리오입니다.' },
      nav: {
        about: 'About',
        education: '교육/연수',
        projects: 'Projects',
        skills: 'Skills',
        awards: 'Award',
        certificates: 'Certificates',
        contact: 'Contact',
      },
      reactLinkTitle: 'React 포트폴리오(메인)',
      reactLinkAria: 'React 메인으로 이동',
      header: {
        themeToDark: '다크 모드로 전환',
        themeToLight: '라이트 모드로 전환',
        themeDark: '다크 모드',
        themeLight: '라이트 모드',
        menuOpen: '메뉴 열기',
        menuClose: '메뉴 닫기',
      },
      hero: {
        tag: 'Developer Portfolio',
        typing: '안녕하세요\n꿈을 개발하는 개발자\n Roy 입니다.',
        desc: '그동안 만들었던 프로젝트와 사용한 기술을 정리한 공간입니다.',
        viewProjects: '프로젝트 보기',
        viewReact: 'React로 보기',
        reactBtnTitle: 'React 포트폴리오(메인)',
        photoAlt: '고용재 프로필 사진',
        logoAlt: 'ROY.K 로고',
      },
      about: {
        title: 'About',
        name: '이름',
        birth: '생년월일',
        nameEn: '영문',
        age: '나이',
        ageUnit: '(만)',
        phoneLink: '연락처',
        contactCta: 'contact',
        address: '주소',
        role: '지원 분야',
        addressValue: '서울시 노원구',
        roleValue: 'LLM Developer',
        photoAlt: '고용재 프로필 사진',
        intro: [
          '안녕하세요.',
          '꿈을 코드로 만드는 개발자 ROY(고용재)입니다. 사용하는 사람이 편하고 기분 좋게 쓸 수 있는 서비스를 만드는 걸 좋아합니다.',
          'AI를 서비스 기능으로 구현하는 개발에 집중하고 있고, 운영 경험을 바탕으로 개발자로 전환하여 LLM/RAG 기반 프로젝트를 수행하며 데이터부터 API, 서비스까지 이어 붙이는 경험을 쌓아 왔습니다. 기술 중심으로 성장하며 AI 개발자가 되길 희망하고, 웹·데이터·ML을 다루는 일에 관심이 많습니다.',
          '웹페이지 프론트와 백엔드 개발도 직접 해 보았고, Computer Vision 분야에서는 YOLO를 활용해 프로젝트를 진행해 본 경험이 있습니다.',
          'AI를 실제 서비스에 적용해 가치를 만드는 개발자로 기여하고 싶습니다. 궁금한 점이 있으시면 아래 연락처로 편하게 보내주세요.',
        ],
      },
      education: {
        title: '교육/연수',
        intro: '이수한 교육 및 연수 과정입니다.',
        hint: '학원명을 클릭 하시면 수료증을 확인 하실 수 있습니다.',
        certPdfTitle: '수료증 PDF',
        certCountTitle: '수료증 {n}건 — 펼쳐서 선택',
        certBadge: '· 수료증 {n}',
        certFallback: '이수증 {n}',
        certRound: '{n}회차',
        certSec: '정보보안 {n}',
        certLinux: '리눅스 {n}',
        certCisco: '씨스코 {n}',
        certCourseSubject: '과목 이수증 {n}',
        certBootcampDoc: '학원 수료증',
      },
      projects: {
        desc: '그동안 개발한 프로젝트입니다.',
        prevAria: '이전 프로젝트',
        nextAria: '다음 프로젝트',
        add: '+ Add Project',
        empty:
          '등록된 프로젝트가 없습니다. "프로젝트 추가"로 첫 프로젝트를 올려보세요.',
        noTitle: '제목 없음',
        demo: '보기',
        code: '코드',
        academy: '학원 프로젝트',
        personal: '개인 프로젝트',
        deleteAria: '삭제',
        alertImageSize: '이미지는 400KB 이하로 올려주세요.',
      },
      skills: {
        tabTrackAria: '스킬 분야',
        tabTierAria: '숙련도',
        trackCommon: '공통',
        tierStrong: '주력',
        tierExp: '경험',
        contextPrefix: '현재 분류',
        contextCommonSuffix: '협업·인프라 공통',
        empty: '이 조합에 해당하는 항목이 없습니다.',
      },
      awards: {
        intro: '교육 과정 등에서 받은 수상 실적입니다.',
        colDate: '날짜',
        colName: '수상명',
        colIssuer: '발급처',
        pdfTitleTemplate: '{label} PDF (새 창)',
      },
      certificates: {
        desc: '국가·기관에서 발급한 자격·면허입니다.',
        add: '+ Add Certificate',
        colDate: '취득일자',
        colCountry: '국가',
        colName: '자격증/면허증',
        colGrade: '등급',
        colIssuer: '발급처',
        pdfTitle: '자격증 PDF (새 창)',
        addNeedMedia: '상장 이미지 또는 PDF를 넣어주세요.',
        alertPdfTooBig: 'PDF는 2MB 이하로 올려주세요.',
        alertImageTooBig: '이미지는 400KB 이하로 올려주세요.',
        deleteAria: '삭제',
      },
      contact: { title: 'Contact', desc: '궁금한 점이 있으시면 아래로 연락 주세요.' },
      owner: {
        promptPassword: '비밀번호를 입력하세요.',
        wrongPassword: '비밀번호가 올바르지 않습니다.',
      },
      footer: {
        rights: 'All rights reserved.',
        ownerOn: '편집 모드 종료',
        ownerOff: '편집 모드',
        langKo: '한국어',
        langEn: 'English',
        langAria: '표시 언어',
      },
    },
    en: {
      meta: { title: 'Roy Koh | Developer Portfolio', desc: 'Portfolio of projects and experience.' },
      nav: {
        about: 'About',
        education: 'Education',
        projects: 'Projects',
        skills: 'Skills',
        awards: 'Award',
        certificates: 'Certificates',
        contact: 'Contact',
      },
      reactLinkTitle: 'React portfolio (main)',
      reactLinkAria: 'Go to React main site',
      header: {
        themeToDark: 'Switch to dark mode',
        themeToLight: 'Switch to light mode',
        themeDark: 'Dark mode',
        themeLight: 'Light mode',
        menuOpen: 'Open menu',
        menuClose: 'Close menu',
      },
      hero: {
        tag: 'Developer Portfolio',
        typing: "Hello\nI'm Roy,\na developer who builds with code.",
        desc: 'A collection of projects I have built and technologies I have used.',
        viewProjects: 'View projects',
        viewReact: 'Open React site',
        reactBtnTitle: 'React portfolio (main)',
        photoAlt: 'Profile photo of Yongjae Koh',
        logoAlt: 'ROY.K logo',
      },
      about: {
        title: 'About',
        name: 'Name',
        birth: 'Date of birth',
        nameEn: 'English name',
        age: 'Age',
        ageUnit: '(international)',
        phoneLink: 'Contact',
        contactCta: 'contact',
        address: 'Location',
        role: 'Focus',
        addressValue: 'Nowon-gu, Seoul',
        roleValue: 'LLM Developer',
        photoAlt: 'Profile photo of Yongjae Koh',
        intro: [
          'Hello.',
          "I'm ROY (Yongjae Koh), a developer who enjoys building services that feel easy and pleasant to use.",
          'I focus on shipping AI as product features. Drawing on operations experience, I moved into development and have worked on LLM/RAG projects—connecting data, APIs, and services end to end. I want to grow as an AI engineer and care about web, data, and ML work.',
          'I have hands-on experience with front-end and back-end web development, and in computer vision I have delivered projects using YOLO.',
          'I hope to contribute as a developer who applies AI in real products and creates value. If you have any questions, feel free to reach out below.',
        ],
      },
      education: {
        title: 'Education',
        intro: 'Training and courses I have completed.',
        hint: ' Click an institution name to open the certificate PDF.',
        certPdfTitle: 'Certificate PDF',
        certCountTitle: '{n} certificates — expand to choose',
        certBadge: '· {n} certificates',
        certFallback: 'Certificate {n}',
        certRound: 'Session {n}',
        certSec: 'Information Security {n}',
        certLinux: 'Linux {n}',
        certCisco: 'Cisco {n}',
        certCourseSubject: 'Course certificate {n}',
        certBootcampDoc: 'Bootcamp certificate',
      },
      projects: {
        desc: 'Projects I have built.',
        prevAria: 'Previous project',
        nextAria: 'Next project',
        add: '+ Add Project',
        empty: 'No projects yet. Use “Add Project” to add the first one.',
        noTitle: 'Untitled',
        demo: 'Demo',
        code: 'Code',
        academy: 'Bootcamp / academy',
        personal: 'Personal',
        deleteAria: 'Delete',
        alertImageSize: 'Please use images under 400 KB.',
      },
      skills: {
        tabTrackAria: 'Skill track',
        tabTierAria: 'Proficiency',
        trackCommon: 'Common',
        tierStrong: 'Main',
        tierExp: 'Experience',
        contextPrefix: 'Current view',
        contextCommonSuffix: 'collaboration & infra (common)',
        empty: 'Nothing to show for this combination.',
      },
      awards: {
        intro: 'Awards received during training and related programs.',
        colDate: 'Date',
        colName: 'Award',
        colIssuer: 'Issuer',
        pdfTitleTemplate: '{label} PDF (new tab)',
      },
      certificates: {
        desc: 'Licenses and certifications issued by organizations.',
        add: '+ Add Certificate',
        colDate: 'Date',
        colCountry: 'Country',
        colName: 'License / certificate',
        colGrade: 'Level',
        colIssuer: 'Issuer',
        pdfTitle: 'Certificate PDF (new tab)',
        addNeedMedia: 'Please add a certificate image or PDF.',
        alertPdfTooBig: 'Please keep PDFs under 2 MB.',
        alertImageTooBig: 'Please use images under 400 KB.',
        deleteAria: 'Delete',
      },
      contact: { title: 'Contact', desc: 'Reach out using the links below.' },
      owner: {
        promptPassword: 'Enter password.',
        wrongPassword: 'Incorrect password.',
      },
      footer: {
        rights: 'All rights reserved.',
        ownerOn: 'Exit edit mode',
        ownerOff: 'Edit mode',
        langKo: 'Korean',
        langEn: 'English',
        langAria: 'Display language',
      },
    },
  }

  var SKILL_GROUP_EN = {
    'API · 모델': 'API · Model',
    'Notebook · 환경 · 실험': 'Notebook · Environment · Experiment',
    'BaaS · 호스팅': 'BaaS · Hosting',
    'Backend · 서빙': 'Backend · Serving',
    'Data · 평가': 'Data · Evaluation',
    배포: 'Deployment',
    '배포 · 추론': 'Deployment · Inference',
  }

  var STATIC_AWARD_GROUPS = [
    {
      issuerKo: '알파코 (Alphaco)',
      issuerEn: 'Alphaco',
      items: [
        { date: '2025.07', titleKo: '학습 우수상', titleEn: 'Excellence Award — Learning', pdf: '%EC%88%98%EC%83%81/%EC%95%8C%ED%8C%8C%EC%BD%94%20%ED%95%99%EC%8A%B5%20%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
        { date: '2025.07', titleKo: '자연어 처리(NLP) 및 LLM 프로젝트 우수상', titleEn: 'Excellence Award — NLP & LLM Project', pdf: '%EC%88%98%EC%83%81/%EC%95%8C%ED%8C%8C%EC%BD%94%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
        { date: '2025.08', titleKo: '태도 우수 교육상', titleEn: 'Excellence Award — Attitude', pdf: '%EC%88%98%EC%83%81/%EC%95%8C%ED%8C%8C%EC%BD%94%20%ED%83%9C%EB%8F%84%20%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
        { date: '2025.11', titleKo: '출석 우수상', titleEn: 'Excellence Award — Attendance', pdf: '%EC%88%98%EC%83%81/%EC%95%8C%ED%8C%8C%EC%BD%94%20%EC%B6%9C%EC%84%9D%20%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
      ],
    },
    {
      issuerKo: '휴먼 AI 교육센터',
      issuerEn: 'Human AI Training Center',
      items: [
        { date: '2026.03', titleKo: '개근상', titleEn: 'Perfect Attendance Award', pdf: '%EC%88%98%EC%83%81/%ED%9C%B4%EB%A8%BC%20%EA%B0%9C%EA%B7%BC%EC%83%81.pdf' },
        { date: '2026.03', titleKo: '자동화 프로젝트 최우수상', titleEn: 'Grand Prize — Automation Project', pdf: '%EC%88%98%EC%83%81/%ED%9C%B4%EB%A8%BC%20%EC%9E%90%EB%8F%99%ED%99%94%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%B5%9C%EC%9A%B0%EC%88%98%EC%83%81.pdf' },
      ],
    },
  ]

  var STATIC_LICENSE_ROW = {
    date: '2024. 09',
    countryKo: '대한민국',
    countryEn: 'South Korea',
    titleKo: '리눅스 마스터',
    titleEn: 'Linux Master',
    gradeKo: '2급',
    gradeEn: 'Lv. 2',
    issuerKo: 'KAIT 정보통신 기술 자격 검정',
    issuerEn: 'KAIT (Korea Association for ICT Promotion)',
    pdf: '자격증/%EB%A6%AC%EB%88%85%EC%8A%A4%EB%A7%88%EC%8A%A4%ED%84%B0.pdf',
  }

  /** GitHub Pages PDF 경로 (index.html 과 동일 인코딩) */
  var EDU = [
    { pKo: '2026.03 ~ 진행중', pEn: '2026.03 — In progress', cKo: 'AI 논문 작성', cEn: 'AI research paper writing', oKo: '휴먼 AI 교육센터', oEn: 'Human AI Training Center', kind: 'text' },
    { pKo: '2025.12 ~ 2026.03', pEn: '2025.12 — 2026.03', cKo: '심화_심층 데이터 분석을 통한 서비스 솔루션 개발자 과정', cEn: 'Advanced: service solution development through deep data analytics', oKo: '휴먼 AI 교육센터', oEn: 'Human AI Training Center', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EB%B6%84%EC%84%9D%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2025.04 ~ 2025.11', pEn: '2025.04 — 2025.11', cKo: 'AI 개발자 마스터 과정', cEn: 'AI Developer Master Course', oKo: '알파코', oEn: 'Alphaco', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/AI%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2025.02 ~ 2025.03', pEn: '2025.02 — 2025.03', cKo: '도커 & 쿠버네티스', cEn: 'Docker & Kubernetes', oKo: '솔데스크', oEn: 'SolDesk', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%8F%84%EC%BB%A4%20&%20%EC%BF%A0%EB%B2%84%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2024.08 ~ 2024.09', pEn: '2024.08 — 2024.09', cKo: '리눅스 시스템 관리 및 Ansible 자동화 기술', cEn: 'Linux administration & Ansible automation', oKo: '솔데스크', oEn: 'SolDesk', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%A6%AC%EB%88%85%EC%8A%A4%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2024.06 ~ 2024.07', pEn: '2024.06 — 2024.07', cKo: '서버구성 자동화와 Ansible 구성', cEn: 'Server provisioning automation & Ansible', oKo: '솔데스크', oEn: 'SolDesk', kind: 'multi', n: 2, certs: [
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%84%9C%EB%B2%84%20%EA%B5%AC%EC%84%B11%ED%9A%8C%EC%B0%A8%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '1회차' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%84%9C%EB%B2%84%20%EA%B5%AC%EC%84%B1%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '2회차' },
    ] },
    { pKo: '2022.11 ~ 2023.05', pEn: '2022.11 — 2023.05', cKo: '정보보안 1 ~ 6', cEn: 'Information Security 1–6', oKo: '코리아 IT 아카데미', oEn: 'Korea IT Academy', kind: 'multi', n: 6, certs: [
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%881%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '정보보안 1' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%882%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '정보보안 2' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%883%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '정보보안 3' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%884%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '정보보안 4' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%885%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '정보보안 5' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%886%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '정보보안 6' },
    ] },
    { pKo: '2022.10 ~ 2022.11', pEn: '2022.10 — 2022.11', cKo: '리눅스 1 ~ 2', cEn: 'Linux 1–2', oKo: '코리아 IT 아카데미', oEn: 'Korea IT Academy', kind: 'multi', n: 2, certs: [
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%A6%AC%EB%88%85%EC%8A%A41%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '리눅스 1' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%A6%AC%EB%88%85%EC%8A%A42%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '리눅스 2' },
    ] },
    { pKo: '2022.09 ~ 2022.10', pEn: '2022.09 — 2022.10', cKo: '씨스코 1 ~ 2', cEn: 'Cisco 1–2', oKo: '코리아 IT 아카데미', oEn: 'Korea IT Academy', kind: 'multi', n: 2, certs: [
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%94%A8%EC%8A%A4%EC%BD%941%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '씨스코 1' },
      { href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EC%94%A8%EC%8A%A4%EC%BD%942%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '씨스코 2' },
    ] },
    { pKo: '2021.08 ~ 2021.09', pEn: '2021.08 — 2021.09', cKo: '시스코 네트워크 관리자 기본과정', cEn: 'Cisco network administrator fundamentals', oKo: '솔데스크', oEn: 'SolDesk', kind: 'link', href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf') },
    { pKo: '2019.06 ~ 2019.12', pEn: '2019.06 — 2019.12', cKo: '프론트 엔드 개발 및 자바 개발자 양성과정', cEn: 'Front-end & Java developer training', oKo: 'KIC 캠퍼스', oEn: 'KIC Campus', kind: 'multi', n: 12, certs: (function () {
      var a = [{ href: pdfUrl('%ED%95%99%EC%9B%90%20%EC%88%98%EB%A3%8C%EC%A6%9D/%ED%94%84%EB%A1%A0%ED%8A%B8&%EB%B0%B1%EC%97%94%EB%93%9C%ED%92%80%EC%8A%A4%ED%83%9D%EA%B0%9C%EB%B0%9C%EC%9E%90%20%EC%88%98%EB%A3%8C%EC%A6%9D.pdf'), lab: '학원 수료증' }]
      for (var i = 1; i <= 11; i++) {
        a.push({ href: pdfUrl('%EC%9D%B4%EC%88%98%EC%A6%9D/%EC%9D%B4%EC%88%98%EC%A6%9D_' + i + '.pdf'), lab: '과목 이수증' + i })
      }
      return a
    })() },
    { pKo: '2008.01 ~ 2009.06', pEn: '2008.01 — 2009.06', cKo: '어학 연수 및 비즈니스 회화', cEn: 'Language training & business conversation', oKo: 'TBLNJ 어학원', oEn: 'TBLNJ Language Institute', kind: 'text' },
  ]

  function getLang() {
    try {
      var s = localStorage.getItem(LANG_KEY)
      if (s === 'en' || s === 'ko') return s
    } catch (e) {}
    return 'ko'
  }

  function setLang(next) {
    try {
      localStorage.setItem(LANG_KEY, next)
    } catch (e) {}
    document.documentElement.lang = next === 'en' ? 'en' : 'ko'
    applyAll(next)
    global.dispatchEvent(new CustomEvent('portfolio-lang-change', { detail: { lang: next } }))
  }

  function getByPath(obj, path) {
    var parts = path.split('.')
    var cur = obj
    for (var i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== 'object') return undefined
      cur = cur[parts[i]]
    }
    return cur
  }

  function interp(str, vars) {
    if (!vars || typeof str !== 'string') return str
    return str.replace(/\{(\w+)\}/g, function (_, k) {
      return vars[k] != null ? String(vars[k]) : '{' + k + '}'
    })
  }

  function t(lang, path) {
    var m = MESSAGES[lang] || MESSAGES.ko
    var v = getByPath(m, path)
    if (typeof v === 'string') return v
    return path
  }

  function certLabel(lang, lab, edu, i) {
    if (lang !== 'en') return lab || interp(edu.certFallback, { n: i + 1 })
    var m = /^(\d+)회차$/.exec(lab || '')
    if (m) return interp(edu.certRound, { n: m[1] })
    var jb = /^정보보안 (\d+)$/.exec(lab || '')
    if (jb) return interp(edu.certSec, { n: jb[1] })
    var lx = /^리눅스 (\d+)$/.exec(lab || '')
    if (lx) return interp(edu.certLinux, { n: lx[1] })
    var cs = /^씨스코 (\d+)$/.exec(lab || '')
    if (cs) return interp(edu.certCisco, { n: cs[1] })
    var sj = /^과목 이수증(\d+)$/.exec(lab || '')
    if (sj) return interp(edu.certCourseSubject, { n: sj[1] })
    if (lab === '학원 수료증') return edu.certBootcampDoc
    return lab || interp(edu.certFallback, { n: i + 1 })
  }

  function escapeHtml(s) {
    var d = document.createElement('div')
    d.textContent = s
    return d.innerHTML
  }

  function buildEducationItem(d, lang) {
    var edu = MESSAGES[lang].education
    var pk = lang === 'en' && d.pEn ? d.pEn : d.pKo
    var ck = lang === 'en' && d.cEn ? d.cEn : d.cKo
    var ok = lang === 'en' && d.oEn ? d.oEn : d.oKo
    var certTitle = edu.certPdfTitle
    var html = '<div class="education-item"><div class="timeline-marker" aria-hidden="true"></div><div class="timeline-content">'
    html += '<span class="education-period">' + escapeHtml(pk) + '</span>'
    html += '<strong class="education-course">' + escapeHtml(ck) + '</strong>'
    if (d.kind === 'text') {
      html += '<span class="education-org">' + escapeHtml(ok) + '</span>'
    } else if (d.kind === 'link') {
      html += '<a href="' + escapeHtml(d.href) + '" class="education-org education-org--cert" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(certTitle) + '">' + escapeHtml(ok) + '</a>'
    } else if (d.kind === 'multi') {
      var sumTitle = interp(edu.certCountTitle, { n: d.n })
      var badge = interp(edu.certBadge, { n: d.n })
      html += '<details class="education-org-details"><summary class="education-org education-org--cert education-org--multi" title="' + escapeHtml(sumTitle) + '">' + escapeHtml(ok) + '<span class="education-org-cert-hint" aria-hidden="true"> ' + escapeHtml(badge) + '</span></summary><ul class="education-cert-pick-list">'
      d.certs.forEach(function (c, idx) {
        var lb = certLabel(lang, c.lab, edu, idx)
        html += '<li><a href="' + escapeHtml(c.href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(lb) + '</a></li>'
      })
      html += '</ul></details>'
    }
    html += '</div></div>'
    return html
  }

  function renderEducationSplit(lang) {
    var root = document.getElementById('educationSplitRoot')
    if (!root) return
    var left = EDU.slice(0, 6).map(function (d) { return buildEducationItem(d, lang) }).join('')
    var right = EDU.slice(6).map(function (d) { return buildEducationItem(d, lang) }).join('')
    root.innerHTML = '<div class="education-timeline">' + left + '</div><div class="education-timeline">' + right + '</div>'
  }

  function renderAwardTable(lang) {
    var tbody = document.getElementById('staticAwardTbody')
    if (!tbody) return
    var a = MESSAGES[lang].awards
    var colName = a.colName
    var html = ''
    STATIC_AWARD_GROUPS.forEach(function (g) {
      var issuer = lang === 'en' && g.issuerEn ? g.issuerEn : g.issuerKo
      g.items.forEach(function (row, i) {
        var title = lang === 'en' && row.titleEn ? row.titleEn : row.titleKo
        var href = PDF + row.pdf
        var pdfTitle = interp(a.pdfTitleTemplate, { label: colName })
        html += '<tr>'
        html += '<td>' + escapeHtml(row.date) + '</td>'
        html += '<td><a class="award-pdf-link" href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(pdfTitle) + '">' + escapeHtml(title) + '</a></td>'
        if (i === 0) {
          html += '<td rowspan="' + g.items.length + '">' + escapeHtml(issuer) + '</td>'
        }
        html += '</tr>'
      })
    })
    tbody.innerHTML = html
  }

  function renderCertTable(lang) {
    var tbody = document.getElementById('staticCertTbody')
    if (!tbody) return
    var c = MESSAGES[lang].certificates
    var r = STATIC_LICENSE_ROW
    var title = lang === 'en' && r.titleEn ? r.titleEn : r.titleKo
    var country = lang === 'en' && r.countryEn ? r.countryEn : r.countryKo
    var grade = lang === 'en' && r.gradeEn ? r.gradeEn : r.gradeKo
    var issuer = lang === 'en' && r.issuerEn ? r.issuerEn : r.issuerKo
    var href = PDF + r.pdf
    tbody.innerHTML =
      '<tr><td>' + escapeHtml(r.date) + '</td><td>' + escapeHtml(country) + '</td><td><a class="award-pdf-link" href="' +
      escapeHtml(href) + '" target="_blank" rel="noopener noreferrer" title="' + escapeHtml(c.pdfTitle) + '">' +
      escapeHtml(title) + '</a></td><td>' + escapeHtml(grade) + '</td><td>' + escapeHtml(issuer) + '</td></tr>'
  }

  function getManAge(year, month, day) {
    var now = new Date()
    var age = now.getFullYear() - year
    var mo = now.getMonth() + 1
    if (mo < month || (mo === month && now.getDate() < day)) age -= 1
    return age
  }

  function applyDataI18n(lang) {
    var m = MESSAGES[lang]
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n')
      var v = getByPath(m, key)
      if (typeof v === 'string') el.textContent = v
    })
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder')
      var v = getByPath(m, key)
      if (typeof v === 'string') el.setAttribute('placeholder', v)
    })
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var raw = el.getAttribute('data-i18n-attr')
      var parts = raw.split('|')
      if (parts.length >= 2) {
        var attr = parts[0].trim()
        var key = parts.slice(1).join('|').trim()
        var v = getByPath(m, key)
        if (typeof v === 'string') el.setAttribute(attr, v)
      }
    })
    var metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && m.meta && m.meta.desc) metaDesc.setAttribute('content', m.meta.desc)
    if (document.title && m.meta && m.meta.title) document.title = m.meta.title

    var introStack = document.querySelector('.about-intro-stack')
    if (introStack && m.about && m.about.intro) {
      introStack.setAttribute('lang', lang === 'en' ? 'en' : 'ko')
      var ps = introStack.querySelectorAll('.about-intro-p')
      m.about.intro.forEach(function (para, i) {
        if (ps[i]) ps[i].textContent = para
      })
    }

    var heroImg1 = document.querySelector('.hero-image-1')
    var heroImg2 = document.querySelector('.hero-image-2')
    var aboutImg = document.querySelector('.about-profile-photo img')
    if (heroImg1 && m.hero && m.hero.photoAlt) heroImg1.setAttribute('alt', m.hero.photoAlt)
    if (heroImg2 && m.hero && m.hero.logoAlt) heroImg2.setAttribute('alt', m.hero.logoAlt)
    if (aboutImg && m.about && m.about.photoAlt) aboutImg.setAttribute('alt', m.about.photoAlt)

    var aboutAgeEl = document.getElementById('about-man-age')
    if (aboutAgeEl && m.about) {
      aboutAgeEl.textContent = m.about.ageUnit + ' ' + getManAge(1988, 10, 20)
    }

    var reactL = document.getElementById('reactMainLink')
    if (reactL && m.reactLinkTitle) reactL.setAttribute('title', m.reactLinkTitle)
    if (reactL && m.reactLinkAria) reactL.setAttribute('aria-label', m.reactLinkAria)
    var heroReact = document.getElementById('heroReactBtn')
    if (heroReact && m.hero) {
      if (m.hero.viewReact) heroReact.textContent = m.hero.viewReact
      if (m.hero.reactBtnTitle) heroReact.setAttribute('title', m.hero.reactBtnTitle)
    }

    var tcom = document.querySelector('[data-i18n-track-common]')
    if (tcom && m.skills) tcom.textContent = m.skills.trackCommon
    var ts = document.querySelector('[data-i18n-tier-strong]')
    if (ts && m.skills) ts.textContent = m.skills.tierStrong
    var te = document.querySelector('[data-i18n-tier-exp]')
    if (te && m.skills) te.textContent = m.skills.tierExp
  }

  function updateFooterLangButtons(lang) {
    var koBtn = document.getElementById('footerLangKo')
    var enBtn = document.getElementById('footerLangEn')
    if (koBtn) {
      koBtn.classList.toggle('is-active', lang === 'ko')
      koBtn.setAttribute('aria-pressed', lang === 'ko' ? 'true' : 'false')
    }
    if (enBtn) {
      enBtn.classList.toggle('is-active', lang === 'en')
      enBtn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false')
    }
  }

  function applyAll(lang) {
    applyDataI18n(lang)
    renderEducationSplit(lang)
    renderAwardTable(lang)
    renderCertTable(lang)
    updateFooterLangButtons(lang)
  }

  function bindFooterLang() {
    var koBtn = document.getElementById('footerLangKo')
    var enBtn = document.getElementById('footerLangEn')
    if (koBtn) koBtn.addEventListener('click', function () { setLang('ko') })
    if (enBtn) enBtn.addEventListener('click', function () { setLang('en') })
  }

  global.portfolioGetLang = getLang
  global.portfolioSetLang = setLang
  global.portfolioT = function (path) {
    return t(getLang(), path)
  }
  global.portfolioSkillTitleEn = function (title) {
    return getLang() === 'en' ? SKILL_GROUP_EN[title] || title : title
  }

  function boot() {
    var lang = getLang()
    document.documentElement.lang = lang === 'en' ? 'en' : 'ko'
    bindFooterLang()
    applyAll(lang)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})(typeof window !== 'undefined' ? window : this)
