# 공학용 계산기 프로젝트 기획

## 1. 목표
- **공학용 계산기** (수학 표현식, 삼각함수, 로그, 지수 등)
- **그래프 기능** (함수 f(x) 입력 → 그래프 시각화)

---

## 2. 기술 스택

| 구분 | 기술 | 비고 |
|------|------|------|
| 가상환경 | **Anaconda** | `conda create -n calc python=3.10` |
| 백엔드 | **Python 3.10** + **FastAPI** | 3.10 안정적, FastAPI 비동기·자동 문서 |
| 프론트엔드 | **React** | Vite 권장 (빠른 개발 서버) |
| JS 런타임 | **Node.js** | React 빌드·개발서버용 (npm/yarn) — 필수 |

**Node.js**: React는 npm으로 패키지 설치·실행을 하므로 **Node.js 필요**. 백엔드는 Python만 쓰고, 프론트만 Node로 돌리는 구조면 충돌 없음.

**Python 3.10**: LTS에 가깝고 FastAPI·numpy 등 호환 좋아서 3.10 선택 적절함.

---

## 2.1 필요한 라이브러리

### 백엔드 (Python · `requirements.txt`)

| 라이브러리 | 용도 |
|------------|------|
| **fastapi** | REST API 서버, `/api/calc`, `/api/graph`, `/api/health` 라우트 정의, 요청/응답 스키마 |
| **uvicorn[standard]** | ASGI 서버. FastAPI 앱 실행 (`uvicorn app.main:app --reload`) |
| **numpy** | 수치 계산·배열 연산. `graph.py`에서 x 구간 배열 생성, 벡터화된 삼각/로그/지수 계산으로 좌표 `(x, y)` 배열 생성 |
| **sympy** | 수학 표현식 파싱·평가. `calc.py`에서 사용자 입력 문자열(예: `sin(pi/2)`, `x^2`)을 안전하게 파싱하고 계산. `pi`, `e`, 함수명(sin, log 등) 지원 |

- **math**: 표준 라이브러리라 별도 설치 없음. 단순 스칼라 계산 시 보조로 사용 가능.

### 프론트엔드 (React · `package.json`)

| 라이브러리 | 용도 |
|------------|------|
| **react**, **react-dom** | UI 컴포넌트(계산기 버튼, 입력창, 그래프 패널) 렌더링 |
| **vite** | 개발 서버, HMR, 빌드. 백엔드 API 프록시 설정(`vite.config.js`) |
| **recharts** (또는 chart.js) | 그래프 시각화. `POST /api/graph`로 받은 `points` 배열을 선/영역 차트로 표시 (`GraphPanel` 등) |
| **axios** (선택) | `POST /api/calc`, `POST /api/graph` 호출. `fetch`만 써도 됨. |

- **Node.js**: `npm install`, `npm run dev` 등으로 프론트 빌드·실행에 필요 (라이브러리 아님).

---

## 3. 폴더 구조 (새로 만들 폴더 기준)

```
scientific-calculator/
├── backend/                 # Python FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI 앱, 라우트
│   │   ├── calc.py          # 수학 계산 로직
│   │   └── graph.py         # 그래프 데이터 생성 (좌표 배열)
│   ├── requirements.txt
│   └── README.md
├── frontend/                # React (Vite)
│   ├── src/
│   │   ├── components/      # Calculator, GraphPanel 등
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js       # proxy → backend
├── PLAN.md                  # 이 기획서
└── README.md                # 실행 방법 요약
```

---

## 4. 기능 정리

### 4.1 공학용 계산기
- 사칙연산, 괄호, 거듭제곱(^)
- 삼각함수: sin, cos, tan (라디안/도 전환 옵션)
- 역삼각: asin, acos, atan
- 쌍곡: sinh, cosh, tanh
- 로그: log, log10, log2
- 지수: exp, sqrt, cbrt
- 기타: abs, floor, ceil, round, factorial, gcd, lcm, pi, e
- **백엔드 API**: `POST /api/calc` → `{ "expression": "sin(pi/2)" }` → `{ "result": "1" }`

### 4.2 그래프
- 입력: 함수 식 (예: `sin(x)`, `x^2`, `log(x)`)
- x 범위 설정 (min, max, step)
- **백엔드 API**: `POST /api/graph` → 식 + 범위 → `{ "points": [[x1,y1], [x2,y2], ...] }`
- **프론트**: React에서 차트 라이브러리 (Recharts, Chart.js, 또는 lightweight)로 시각화

---

## 5. 개발 환경 설정 (요약)

1. **Anaconda 가상환경**
   ```bash
   conda create -n calc python=3.10
   conda activate calc
   cd scientific-calculator/backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

2. **Node.js** (별도 설치)
   - React 빌드/실행용. [nodejs.org](https://nodejs.org) LTS 설치.

3. **프론트 실행**
   ```bash
   cd scientific-calculator/frontend
   npm install
   npm run dev
   ```
   - Vite가 `http://localhost:5173` 에서 백엔드로 API 프록시 연결.

---

## 6. API 설계 (초안)

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /api/health | 서버 상태 |
| POST | /api/calc | `{ "expression": "1+2*3" }` → `{ "result": "7" }` |
| POST | /api/graph | `{ "expression": "sin(x)", "xMin": 0, "xMax": 6.28, "points": 200 }` → `{ "points": [[x,y], ...] }` |

---


