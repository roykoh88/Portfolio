import { pdfFromPages } from '../config/portfolioPages.js'

/**
 * 교육/연수 — 왼쪽·오른쪽 타임라인 열 순서 (index.html 과 동일)
 *
 * 이수증 PDF는 GitHub Pages 배포본에서 연다 (`portfolioPages.js` 의 ORIGIN).
 *
 * 괄호 안 영문·부제는 화면에 안 쓰고 아래 주석에만 남겨 두었습니다. 영어 버전(i18n) 때 참고하세요.
 */
export const educationColumns = [
  [
    {
      period: '2026.03 ~ 진행중',
      course: 'AI 논문 작성',
      org: '휴먼 AI 교육센터',
    },
    {
      period: '2025.12 ~ 2026.03',
      course: '심화_심층 데이터 분석을 통한 서비스 솔루션 개발자 과정',
      org: '휴먼 AI 교육센터',
      certificateUrl: pdfFromPages('학원 수료증/데이터 분석 수료증.pdf'),
    },
    {
      period: '2025.04 ~ 2025.11',
      course: 'AI 개발자 마스터 과정',
      // EN course: (AI Developer Master Course)
      org: '알파코',
      // EN org: (Alphaco)
      certificateUrl: pdfFromPages('학원 수료증/AI개발자 수료증.pdf'),
    },
    {
      period: '2025.02 ~ 2025.03',
      course: '도커 & 쿠버네티스',
      // EN course: (Docker & Kubernetes)
      org: '솔데스크',
      // EN org: (SolDesk)
      certificateUrl: pdfFromPages('학원 수료증/도커 & 쿠버 수료증.pdf'),
    },
    {
      period: '2024.08 ~ 2024.09',
      course: '리눅스 시스템 관리 및 Ansible 자동화 기술',
      // 부제: (리눅스 중급)
      org: '솔데스크',
      // EN org: (SolDesk)
      certificateUrl: pdfFromPages('학원 수료증/리눅스 수료증.pdf'),
    },
    {
      period: '2024.06 ~ 2024.07',
      course: '서버구성 자동화와 Ansible 구성',
      // 부제: (리눅스 기초)
      org: '솔데스크',
      // EN org: (SolDesk)
      certificates: [
        { url: pdfFromPages('학원 수료증/서버 구성1회차 수료증.pdf'), label: '1회차' },
        { url: pdfFromPages('학원 수료증/서버 구성 수료증.pdf'), label: '2회차' },
      ],
    },
  ],
  [
    {
      period: '2022.11 ~ 2023.05',
      course: '정보보안 1 ~ 6',
      // EN course: (Information Security 1 ~ 6)
      org: '코리아 IT 아카데미',
      // EN org: (Korea IT Academy)
      certificates: [
        { url: pdfFromPages('학원 수료증/정보보안1 수료증.pdf'), label: '정보보안 1' },
        { url: pdfFromPages('학원 수료증/정보보안2 수료증.pdf'), label: '정보보안 2' },
        { url: pdfFromPages('학원 수료증/정보보안3 수료증.pdf'), label: '정보보안 3' },
        { url: pdfFromPages('학원 수료증/정보보안4 수료증.pdf'), label: '정보보안 4' },
        { url: pdfFromPages('학원 수료증/정보보안5 수료증.pdf'), label: '정보보안 5' },
        { url: pdfFromPages('학원 수료증/정보보안6 수료증.pdf'), label: '정보보안 6' },
      ],
    },
    {
      period: '2022.10 ~ 2022.11',
      course: '리눅스 1 ~ 2',
      // EN course: (Linux 1 ~ 2)
      org: '코리아 IT 아카데미',
      // EN org: (Korea IT Academy)
      certificates: [
        { url: pdfFromPages('학원 수료증/리눅스1 수료증.pdf'), label: '리눅스 1' },
        { url: pdfFromPages('학원 수료증/리눅스2 수료증.pdf'), label: '리눅스 2' },
      ],
    },
    {
      period: '2022.09 ~ 2022.10',
      course: '씨스코 1 ~ 2',
      // EN course: (Cisco 1 ~ 2)
      org: '코리아 IT 아카데미',
      // EN org: (Korea IT Academy)
      certificates: [
        { url: pdfFromPages('학원 수료증/씨스코1 수료증.pdf'), label: '씨스코 1' },
        { url: pdfFromPages('학원 수료증/씨스코2 수료증.pdf'), label: '씨스코 2' },
      ],
    },
    {
      period: '2021.08 ~ 2021.09',
      course: '시스코 네트워크 관리자 기본과정',
      // EN course: (Cisco Network Administrator Basic Course)
      org: '솔데스크',
      // EN org: (SolDesk)
      certificateUrl: pdfFromPages('학원 수료증/네트워크 수료증.pdf'),
    },
    {
      period: '2019.06 ~ 2019.12',
      course: '프론트 엔드 개발 및 자바 개발자 양성과정',
      // EN course: (Front-end Development & Java Developer Training Course)
      org: 'KIC 캠퍼스',
      // EN org: (KIC Campus)
      certificates: [
        {
          url: pdfFromPages('학원 수료증/프론트&백엔드풀스택개발자 수료증.pdf'),
          label: '학원 수료증',
        },
        ...Array.from({ length: 11 }, (_, i) => {
          const n = i + 1
          return {
            url: pdfFromPages(`이수증/이수증_${n}.pdf`),
            label: `과목 이수증${n}`,
          }
        }),
      ],
    },
    {
      period: '2008.01 ~ 2009.06',
      course: '어학 연수 및 비즈니스 회화',
      // EN course: (Language Training & Business Conversation)
      org: 'TBLNJ 어학원',
      // EN org: (TBLNJ Language Institute)
    },
  ],
]
