# 포트폴리오 (React / Vite)

루트의 레거시 `index.html`·`styles.css`·`script.js`를 단계적으로 이쪽으로 옮기는 작업용 앱입니다.

## 명령어

```bash
cd react-app
npm install
npm run dev
```

프로덕션 빌드: `npm run build` → 결과물은 `react-app/dist/` 입니다.

헤더·Hero의 **HTML로 보기** 링크는 기본값으로 배포 중인 정적 사이트 URL을 가리킵니다. 바꾸려면 `react-app/.env` 에 다음을 두면 됩니다.

`VITE_LEGACY_HTML_URL=https://예시.web.app`

Firebase Hosting으로 이 빌드만 쓰게 바꿀 때는 `firebase.json`의 `public`을 `react-app/dist`로 두고, GitHub Actions에서 배포 전에 `npm ci && npm run build`를 `react-app`에서 실행하면 됩니다.
