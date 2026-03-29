export const PROJECTS_KEY = 'portfolioProjects_v2'

export const MAX_IMAGE_BYTES = 400 * 1024

export const SKIP_TITLES = ['프로젝트 제목', '또다른 프로젝트']

/** script.js DEFAULT_PROJECTS 와 동일 · `titleEn`/`descriptionEn`은 영어 UI용 */
export const DEFAULT_PROJECTS = [
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
    projectType: 'personal',
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
  },
  {
    title: 'Portfolio',
    titleEn: 'Portfolio',
    description:
      '개발 포트폴리오 사이트입니다. About, 교육/연수, Projects, Skills, Certificates, Contact를 담고 있으며 Firebase로 호스팅됩니다.',
    descriptionEn:
      'Developer portfolio with About, Education, Projects, Skills, Certificates, and Contact—hosted on Firebase.',
    tags: 'HTML, CSS, JavaScript, Firebase, GitHub Actions',
    demoUrl: '',
    codeUrl: 'https://github.com/roykoh88/Portfolio',
    image: '',
    projectType: 'personal',
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
    projectType: 'personal',
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
    projectType: 'personal',
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
    projectType: 'personal',
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
    projectType: 'personal',
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
  },
]

/** script.js PROJECT_DISPLAY_ORDER 와 동일 */
export const PROJECT_DISPLAY_ORDER = [
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
]

/** 저장된 프로젝트와 기본 목록을 제목(한글 기준)으로 매칭해 영어 필드 조회 */
export function defaultProjectByTitle(title) {
  const k = (title || '').trim()
  return DEFAULT_PROJECTS.find((d) => (d.title || '').trim() === k)
}
