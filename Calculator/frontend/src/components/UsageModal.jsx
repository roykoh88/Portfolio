import './UsageModal.css'

export default function UsageModal({ onClose }) {
  return (
    <div className="usage-overlay" onClick={onClose}>
      <div className="usage-modal" onClick={(e) => e.stopPropagation()}>
        <div className="usage-header">
          <h2>사용 방법</h2>
          <button type="button" className="usage-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        <div className="usage-body">
          <section>
            <h3>계산 탭</h3>
            <ul>
              <li><strong>입력</strong> 입력창에 수식을 쓰거나 아래 숫자·기호 패드로 입력한 뒤 <strong>=</strong> 버튼을 누르면 계산됩니다.</li>
              <li><strong>숫자 패드</strong> 0, 00, 000, 1~9, 소수점(.), +, -, *, /, ^, 괄호 ( ), <strong>C</strong>(전체 지우기), <strong>⌫</strong>(한 글자 삭제), <strong>=</strong>(계산)</li>
              <li><strong>자주 쓰는 식</strong> 버튼을 누르면 해당 식이 입력창에 붙습니다.</li>
              <li><strong>각도</strong> 라디안(기본) 또는 도를 선택하면 삼각함수 계산에 적용됩니다.</li>
              <li><strong>히스토리</strong> 계산 결과가 아래에 쌓입니다. 항목을 클릭하면 수식이 다시 입력되고, ▼/▶로 접었다 펼칠 수 있으며, 지우기로 비울 수 있습니다.</li>
            </ul>
          </section>
          <section>
            <h3>그래프 탭</h3>
            <ul>
              <li><strong>f(x)</strong> 드롭다운에서 sin(x), cos(x), x² 등 미리 넣어진 식을 고르거나, &quot;직접 입력&quot; 후 옆 입력창에 원하는 식을 입력합니다.</li>
              <li><strong>xMin, xMax</strong> x축 범위를 정합니다.</li>
              <li><strong>점 개수</strong> 2~2000. 값을 크게 하면 곡선이 더 부드럽습니다.</li>
              <li><strong>각도</strong> 라디안 또는 도를 선택한 뒤 <strong>그래프 그리기</strong>를 누르면 그래프가 그려집니다.</li>
            </ul>
          </section>
          <section>
            <h3>지원하는 식</h3>
            <p>사칙연산(+, -, *, /), 거듭제곱(^), 괄호, 삼각함수(sin, cos, tan), 로그(log, log10, log2), 지수(exp, sqrt), pi, e, sigmoid, relu 등 다양한 수학·AI 함수를 사용할 수 있습니다.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
