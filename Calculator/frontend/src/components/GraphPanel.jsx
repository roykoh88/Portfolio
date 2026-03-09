import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import './GraphPanel.css'

const API_BASE = ''

const PRESET_FUNCTIONS = [
  { label: '직접 입력', value: '' },
  { label: 'sin(x)', value: 'sin(x)' },
  { label: 'cos(x)', value: 'cos(x)' },
  { label: 'tan(x)', value: 'tan(x)' },
  { label: 'x²', value: 'x^2' },
  { label: 'x³', value: 'x^3' },
  { label: '√x', value: 'sqrt(x)' },
  { label: 'log(x)', value: 'log(x)' },
  { label: 'eˣ', value: 'exp(x)' },
  { label: 'sigmoid(x)', value: 'sigmoid(x)' },
  { label: 'relu(x)', value: 'relu(x)' },
  { label: '|x|', value: 'abs(x)' },
]

export default function GraphPanel() {
  const [expression, setExpression] = useState('sin(x)')
  const [xMin, setXMin] = useState(-6.28)
  const [xMax, setXMax] = useState(6.28)
  const [points, setPoints] = useState(200)
  const [angleMode, setAngleMode] = useState('rad')
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setData([])
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/graph`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expression: expression.trim(),
          xMin: Number(xMin),
          xMax: Number(xMax),
          points: Number(points) || 200,
          angle_mode: angleMode,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.detail || '그래프 생성 오류')
        setLoading(false)
        return
      }
      setData(json.points || [])
    } catch (err) {
      setError('서버에 연결할 수 없습니다.')
    }
    setLoading(false)
  }

  const chartData = data
    .filter((p) => p[1] != null)
    .map((p) => ({ x: p[0], y: p[1] }))

  return (
    <div className="graph-panel">
      <form onSubmit={handleSubmit} className="graph-form">
        <div className="graph-field graph-field--fx">
          <label>f(x) =</label>
          <select
            className="graph-select"
            value={PRESET_FUNCTIONS.some((p) => p.value === expression) ? expression : ''}
            onChange={(e) => {
              const v = e.target.value
              if (v) setExpression(v)
            }}
          >
            {PRESET_FUNCTIONS.map((opt) => (
              <option key={opt.value || 'custom'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="graph-input-fx"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="sin(x), x^2, sigmoid(x)"
          />
        </div>
        <div className="graph-row">
          <div className="graph-field">
            <label>xMin</label>
            <input
              type="number"
              value={xMin}
              onChange={(e) => setXMin(e.target.value)}
              step="any"
            />
          </div>
          <div className="graph-field">
            <label>xMax</label>
            <input
              type="number"
              value={xMax}
              onChange={(e) => setXMax(e.target.value)}
              step="any"
            />
          </div>
          <div className="graph-field">
            <label>점 개수</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              min={2}
              max={2000}
            />
          </div>
        </div>
        <div className="angle-mode">
          <span>각도:</span>
          <label>
            <input
              type="radio"
              name="graphAngle"
              checked={angleMode === 'rad'}
              onChange={() => setAngleMode('rad')}
            />
            라디안
          </label>
          <label>
            <input
              type="radio"
              name="graphAngle"
              checked={angleMode === 'deg'}
              onChange={() => setAngleMode('deg')}
            />
            도
          </label>
        </div>
        <button type="submit" className="graph-submit" disabled={loading}>
          {loading ? '계산 중…' : '그래프 그리기'}
        </button>
      </form>

      {error && <div className="graph-error">{error}</div>}

      <div className="chart-wrap">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="x" stroke="#71717a" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
              <YAxis stroke="#71717a" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#18181b', border: '1px solid #3f3f46' }}
                labelStyle={{ color: '#e4e4e7' }}
                formatter={(value) => [Number(value).toFixed(4), 'y']}
                labelFormatter={(x) => `x = ${Number(x).toFixed(4)}`}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-placeholder">
            수식을 입력하고 &quot;그래프 그리기&quot;를 누르세요.
          </div>
        )}
      </div>
    </div>
  )
}
