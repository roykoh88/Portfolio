# Portfolio

## 페이지 소개
개인 포트폴리오 웹사이트입니다. 자기소개, 보유 기술, 프로젝트 경험, 연락처 정보를 한 곳에서 확인할 수 있도록 구성했습니다.

- 주요 섹션: 소개(About) / 기술 스택(Skills) / 프로젝트(Projects) / 연락처(Contact)
- 목적: 작업물 정리 및 채용/협업을 위한 정보 제공

## 제작 방식 (HTML / CSS / JavaScript)
루트의 정적 사이트는 **바닐라(순수) HTML/CSS/JavaScript**로 제작했습니다. 프레임워크 없이 DOM을 직접 제어하는 방식으로 구현했고, 정적 파일 기반으로 배포 가능한 구조를 목표로 했습니다. 같은 포트폴리오의 **React 재구성**은 `react-app/`(Vite)에서 별도로 관리합니다.

### HTML 구조
- 섹션(예: 소개 / 스킬 / 프로젝트 / 연락처) 단위로 마크업을 구성했습니다.
- 공통 레이아웃(헤더/네비게이션/푸터)을 기준으로 각 섹션에 `id`를 부여해 앵커 이동이 가능하게 했습니다.
- 접근성과 유지보수를 위해 의미 있는 태그/계층 구조를 유지하려고 했습니다.

### CSS 구성
- 레이아웃은 Flex/Grid를 중심으로 구성했고, 반응형은 미디어 쿼리로 대응했습니다.
- 반복되는 스타일은 공통 클래스(버튼/카드/섹션 타이틀 등)로 묶어 재사용했습니다.
- 섹션별로 스타일 우선순위를 정리해 “전체 스타일 → 섹션 스타일 → 컴포넌트 스타일” 흐름으로 관리했습니다.

### JavaScript 구성
- `script.js`에서 필요한 요소를 선택한 뒤 이벤트 기반으로 동작하도록 구현했습니다.
- 주요 기능은 다음과 같습니다.
  - 네비게이션/스크롤 이동(앵커, 스크롤 스파이 등)
  - 섹션별 인터랙션(탭/필터/모달/슬라이더 등 해당되는 기능)
  - 화면 상태에 따른 UI 변경(클래스 토글, 애니메이션 트리거 등)

## 서비스 운영(배포/업데이트) 방식
- 배포: **Firebase Hosting**으로 운영 중
- CI/CD: **GitHub Actions**로 빌드 및 배포 자동화
  - 변경 사항을 원격 저장소에 반영하면 워크플로우가 실행되어 서비스에 적용됩니다.
- 브랜치 전략:
  - `main`: 현재 운영 중인 안정 버전
  - `react-migration`: React 리팩토링 작업 브랜치(개발/검증용)

## 리팩토링 진행 안내
루트의 **바닐라(순수 HTML/CSS/JS) 버전**과 **`react-app/`(Vite + React) 버전**을 함께 두고 있습니다. React 쪽은 이미 섹션·데이터 분리 구조로 구성해 두었고, 레거시는 기존 배포·기능을 위해 유지합니다.

## 현재까지 진행한 내용(리팩토링)
- `main`에서 `react-migration` 브랜치를 두고 React 이관·검증 작업을 분리해 진행
- `react-app/`: `App.jsx`에서 `Header` → `Hero` → `About` → `Education` → `Projects` → `Skills` → `Awards` → `CertificatesSection` → `Contact` → `Footer` 순으로 페이지를 조합
- Google Drive URL을 예전에 `iframe`으로 넣을 때 비로그인·권한 이슈(`503`, CSP 등)가 있었음 → **현재 정적 페이지와 React 모두 화면에 `iframe` 임베드를 쓰지 않음**(PDF·수료는 링크·Education·자격 표 등으로 처리)

## 진행 예정(요약)
- 레거시에만 있는 동작·문구를 React 쪽으로 단계적으로 이관(필요 시 호스팅 진입점 정리)
- 기능 단위로 커밋을 나누며 안정적으로 통합

## 피드백 반영 요약
개발자 지인에게 받았던 항목 기준으로, **현재는 대체로 반영되었거나 UI가 바뀌어 해당 이슈가 성격이 달라진 상태**입니다.

1. **Education** — 네비·제목은 `Education`으로 통일(i18n `education.*`). 타임라인 **주황 마커**는 `styles.css`에서 카드 첫 줄(기간) 기준으로 flex 정렬함. **2열 오프셋** 등은 의도한 레이아웃으로 유지.
2. **Projects** — 레거시(`script.js`)와 React(`Projects.jsx`) 모두 **카드 클릭 → 상세 모달** 흐름이 연결됨.
3. **Skills** — CV / LLM / ML / Web / 공통 **트랙·그룹**으로 나누어 정리(`skillsByTrack.js` 등). “스킬 과다” 피드백은 구조·데이터로 상당 부분 반영.
4. **Certificates** — 자격·면허는 **표(`LicenseTable` 등)** 중심으로 정리되어, 예전 캐러셀 **좌우 화살표 시인성** 이슈와는 형태가 다름.
5. **Google Drive·`iframe`** — **UI에서 iframe 임베드는 제거**함. `index.html`·`react-app` 모두 마크업상 `iframe` 없이 동작하고, React 소스에도 `iframe` 없음. (과거 이슈를 피하기 위해 PDF·수료는 직접 링크 등으로 연결.)
6. **코드 구조** — `react-app/src/`는 컴포넌트·데이터·i18n·hooks·config 등으로 분리됨. 섹션은 별도 `sections/` 폴더가 아니라 **`components/`에 함께** 두는 형태. 레거시는 루트 `index.html`·`static-i18n.js` 축.

### `react-app/src/` 참고
- `components/`: `Header`, `Hero`, `About`, `Education`, `Projects`, `Skills`, `Awards`, `CertificatesSection`, `Contact`, `Footer` 및 `LicenseTable`, `GroupedIssueTable` 등
- `data/`: `skillsByTrack`, `certifications`, `awards`, `education`, `contact` 등
- `i18n/`, `hooks/`, `lib/`, `config/`, `assets/`, `public/`(빌드 시)
