import { useState, useEffect } from 'react'
import './Calculator.css'

const API_BASE = ''
const HISTORY_KEY = 'calc-history'
const HISTORY_MAX = 50

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.slice(0, HISTORY_MAX) : []
  } catch {
    return []
  }
}

function saveHistory(list) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, HISTORY_MAX)))
  } catch {}
}

export default function Calculator() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [angleMode, setAngleMode] = useState('rad')
  const [history, setHistory] = useState(() => loadHistory())
  const [historyVisible, setHistoryVisible] = useState(true)

  useEffect(() => {
    saveHistory(history)
  }, [history])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setResult('')
    if (!expression.trim()) return

    const expr = expression.trim()
    try {
      const res = await fetch(`${API_BASE}/api/calc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expression: expr,
          angle_mode: angleMode,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || '계산 오류')
        return
      }
      setResult(data.result)
      setHistory((prev) => [{ expression: expr, result: data.result }, ...prev.filter((h) => !(h.expression === expr && h.result === data.result))])
    } catch (err) {
      setError('서버에 연결할 수 없습니다. 백엔드를 실행 중인지 확인하세요.')
    }
  }

  function insert(s) {
    setExpression((prev) => prev + s)
  }

  function backspace() {
    setExpression((prev) => prev.slice(0, -1))
  }

  function clearAll() {
    setExpression('')
    setResult('')
    setError('')
  }

  function clearHistory() {
    setHistory([])
  }

  function applyHistoryItem(expr) {
    setExpression(expr)
    setError('')
  }

  // 엑셀처럼: 6열 4행, "="는 오른쪽에서 세로 2칸. 한 그리드로 해서 공백 없음.
  const numPadKeys = [
    '7', '8', '9', '+', '-', '/',
    '4', '5', '6', '*', '^', 'C',
    '1', '2', '3', '(', ')', '=',
    '0', '00', '000', '.', '⌫',
  ]

  function renderKey(key, index) {
    if (key === '⌫') {
      return (
        <button
          key="backspace"
          type="button"
          className="numpad-key op"
          onClick={backspace}
          title="한 글자 지우기"
        >
          ⌫
        </button>
      )
    }

    if (key === 'C') {
      return (
        <button key="C" type="button" className="numpad-key op clear" onClick={clearAll}>
          C
        </button>
      )
    }

    if (key === '=') {
      return (
        <button
          key="eq"
          type="submit"
          form="calc-form"
          className="numpad-key eq numpad-key--tall"
          style={{ gridRow: 'span 2' }}
        >
          =
        </button>
      )
    }

    const isNum = key === '00' || key === '000' || /^[0-9]$/.test(key)
    return (
      <button
        key={`${index}-${key}`}
        type="button"
        className={`numpad-key ${isNum ? 'num' : 'op'}`}
        onClick={() => insert(key)}
      >
        {key}
      </button>
    )
  }

  return (
    <div className="calculator">
      <form id="calc-form" onSubmit={handleSubmit} className="calc-form">
        <div className="calc-input-row">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="수식 입력 또는 아래 숫자 패드 사용"
            className="calc-input"
            autoComplete="off"
          />
          <button type="submit" className="calc-submit">
            =
          </button>
        </div>
        <div className="angle-mode">
          <span>각도:</span>
          <label>
            <input
              type="radio"
              name="angle"
              checked={angleMode === 'rad'}
              onChange={() => setAngleMode('rad')}
            />
            라디안
          </label>
          <label>
            <input
              type="radio"
              name="angle"
              checked={angleMode === 'deg'}
              onChange={() => setAngleMode('deg')}
            />
            도
          </label>
        </div>
      </form>

      <div className="quick-keys">
        <p className="quick-title">자주 쓰는 식</p>
        <div className="quick-btns">
          {['pi', 'e', 'sqrt(2)', 'sin(pi/2)', 'log(e)', 'sigmoid(0)', 'relu(-1)'].map((s) => (
            <button key={s} type="button" className="quick-btn" onClick={() => insert(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className={`calc-history ${!historyVisible ? 'calc-history--collapsed' : ''}`}>
        <div className="history-head">
          <button
            type="button"
            className="history-toggle"
            onClick={() => setHistoryVisible((v) => !v)}
            title={historyVisible ? '히스토리 숨기기' : '히스토리 보기'}
            aria-expanded={historyVisible}
          >
            <span className="history-arrow">{historyVisible ? '▼' : '▶'}</span>
            <span className="quick-title">히스토리</span>
          </button>
          {history.length > 0 && (
            <button type="button" className="history-clear" onClick={clearHistory}>
              지우기
            </button>
          )}
        </div>
        {historyVisible && (
          <>
            {history.length === 0 ? (
              <p className="history-empty">계산한 식이 여기에 표시됩니다.</p>
            ) : (
              <ul className="history-list">
                {history.map((item, i) => (
                  <li key={`${i}-${item.expression}-${item.result}`}>
                    <button
                      type="button"
                      className="history-item"
                      onClick={() => applyHistoryItem(item.expression)}
                      title="입력창에 넣기"
                    >
                      <span className="history-expr">{item.expression}</span>
                      <span className="history-result">= {item.result}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {result !== '' && !error && (
        <div className="calc-result">
          <span className="label">결과</span>
          <span className="value">{result}</span>
        </div>
      )}

      <div className="calc-numpad">
        <div className="calc-numpad-grid">
          {numPadKeys.map((key, index) => renderKey(key, index))}
        </div>
      </div>

      {error && <div className="calc-error">{error}</div>}
    </div>
  )
}
