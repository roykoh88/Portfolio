import { pdfFromPages } from '../config/portfolioPages.js'

/**
 * 교육/연수 — 왼쪽·오른쪽 타임라인 열 순서 (index.html 과 동일)
 *
 * `periodEn` / `courseEn` / `orgEn` 은 영어 UI에서 사용합니다.
 */
export const educationColumns = [
  [
    {
      period: '2026.03 ~ 진행중',
      periodEn: '2026.03 — In progress',
      course: 'AI 논문 작성',
      courseEn: 'AI research paper writing',
      org: '휴먼 AI 교육센터',
      orgEn: 'Human AI Training Center',
    },
    {
      period: '2025.12 ~ 2026.03',
      periodEn: '2025.12 — 2026.03',
      course: '심화_심층 데이터 분석을 통한 서비스 솔루션 개발자 과정',
      courseEn:
        'Advanced: service solution development through deep data analytics',
      org: '휴먼 AI 교육센터',
      orgEn: 'Human AI Training Center',
      certificateUrl: pdfFromPages('학원 수료증/데이터 분석 수료증.pdf'),
    },
    {
      period: '2025.04 ~ 2025.11',
      periodEn: '2025.04 — 2025.11',
      course: 'AI 개발자 마스터 과정',
      courseEn: 'AI Developer Master Course',
      org: '알파코',
      orgEn: 'Alphaco',
      certificateUrl: pdfFromPages('학원 수료증/AI개발자 수료증.pdf'),
    },
    {
      period: '2025.02 ~ 2025.03',
      periodEn: '2025.02 — 2025.03',
      course: '도커 & 쿠버네티스',
      courseEn: 'Docker & Kubernetes',
      org: '솔데스크',
      orgEn: 'SolDesk',
      certificateUrl: pdfFromPages('학원 수료증/도커 & 쿠버 수료증.pdf'),
    },
    {
      period: '2024.08 ~ 2024.09',
      periodEn: '2024.08 — 2024.09',
      course: '리눅스 시스템 관리 및 Ansible 자동화 기술',
      courseEn: 'Linux administration & Ansible automation',
      org: '솔데스크',
      orgEn: 'SolDesk',
      certificateUrl: pdfFromPages('학원 수료증/리눅스 수료증.pdf'),
    },
    {
      period: '2024.06 ~ 2024.07',
      periodEn: '2024.06 — 2024.07',
      course: '서버구성 자동화와 Ansible 구성',
      courseEn: 'Server provisioning automation & Ansible',
      org: '솔데스크',
      orgEn: 'SolDesk',
      certificates: [
        { url: pdfFromPages('학원 수료증/서버 구성1회차 수료증.pdf'), label: '1회차' },
        { url: pdfFromPages('학원 수료증/서버 구성 수료증.pdf'), label: '2회차' },
      ],
    },
  ],
  [
    {
      period: '2022.11 ~ 2023.05',
      periodEn: '2022.11 — 2023.05',
      course: '정보보안 1 ~ 6',
      courseEn: 'Information Security 1–6',
      org: '코리아 IT 아카데미',
      orgEn: 'Korea IT Academy',
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
      periodEn: '2022.10 — 2022.11',
      course: '리눅스 1 ~ 2',
      courseEn: 'Linux 1–2',
      org: '코리아 IT 아카데미',
      orgEn: 'Korea IT Academy',
      certificates: [
        { url: pdfFromPages('학원 수료증/리눅스1 수료증.pdf'), label: '리눅스 1' },
        { url: pdfFromPages('학원 수료증/리눅스2 수료증.pdf'), label: '리눅스 2' },
      ],
    },
    {
      period: '2022.09 ~ 2022.10',
      periodEn: '2022.09 — 2022.10',
      course: '씨스코 1 ~ 2',
      courseEn: 'Cisco 1–2',
      org: '코리아 IT 아카데미',
      orgEn: 'Korea IT Academy',
      certificates: [
        { url: pdfFromPages('학원 수료증/씨스코1 수료증.pdf'), label: '씨스코 1' },
        { url: pdfFromPages('학원 수료증/씨스코2 수료증.pdf'), label: '씨스코 2' },
      ],
    },
    {
      period: '2021.08 ~ 2021.09',
      periodEn: '2021.08 — 2021.09',
      course: '시스코 네트워크 관리자 기본과정',
      courseEn: 'Cisco network administrator fundamentals',
      org: '솔데스크',
      orgEn: 'SolDesk',
      certificateUrl: pdfFromPages('학원 수료증/네트워크 수료증.pdf'),
    },
    {
      period: '2019.06 ~ 2019.12',
      periodEn: '2019.06 — 2019.12',
      course: '프론트 엔드 개발 및 자바 개발자 양성과정',
      courseEn: 'Front-end & Java developer training',
      org: 'KIC 캠퍼스',
      orgEn: 'KIC Campus',
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
      periodEn: '2008.01 — 2009.06',
      course: '어학 연수 및 비즈니스 회화',
      courseEn: 'Language training & business conversation',
      org: 'TBLNJ 어학원',
      orgEn: 'TBLNJ Language Institute',
    },
  ],
]
