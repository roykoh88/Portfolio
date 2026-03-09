import { useState } from 'react'
import Calculator from './components/Calculator'
import GraphPanel from './components/GraphPanel'
import UsageModal from './components/UsageModal'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('calc')
  const [showUsage, setShowUsage] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>공학용 계산기</h1>
        <nav className="app-nav">
          <div className="tabs">
            <button
              className={activeTab === 'calc' ? 'active' : ''}
              onClick={() => setActiveTab('calc')}
            >
              계산
            </button>
            <button
              className={activeTab === 'graph' ? 'active' : ''}
              onClick={() => setActiveTab('graph')}
            >
              그래프
            </button>
          </div>
          <button
            type="button"
            className="usage-btn"
            onClick={() => setShowUsage(true)}
          >
            사용 방법
          </button>
        </nav>
      </header>
      {showUsage && <UsageModal onClose={() => setShowUsage(false)} />}
      <main className="app-main">
        {activeTab === 'calc' && <Calculator />}
        {activeTab === 'graph' && <GraphPanel />}
      </main>
    </div>
  )
}

export default App
