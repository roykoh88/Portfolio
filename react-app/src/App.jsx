import { useEffect, useState } from 'react'
import './scroll-anchors.css'
import { About } from './components/About'
import { Awards } from './components/Awards'
import { Education } from './components/Education'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { CertificatesSection } from './components/CertificatesSection'
import { Contact } from './components/Contact'
import { Skills } from './components/Skills'
import { useOwnerMode } from './hooks/useOwnerMode'
import { useProjects } from './hooks/useProjects'
import { getInitialTheme, persistTheme } from './lib/theme'

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [navOpen, setNavOpen] = useState(false)
  const { ownerMode, toggleOwnerMode } = useOwnerMode()
  const { orderedProjects, addProject, removeProject } = useProjects()

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [theme])

  useEffect(() => {
    document.body.classList.toggle('owner-mode', ownerMode)
    return () => document.body.classList.remove('owner-mode')
  }, [ownerMode])

  function handleThemeToggle() {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      persistTheme(next)
      return next
    })
  }

  return (
    <>
      <Header
        theme={theme}
        onThemeToggle={handleThemeToggle}
        navOpen={navOpen}
        onNavOpenChange={setNavOpen}
      />
      <main>
        <Hero />
        <About />
        <Education />
        <Projects
          orderedProjects={orderedProjects}
          addProject={addProject}
          removeProject={removeProject}
        />
        <Skills />
        <Awards />
        <CertificatesSection />
        <Contact />
      </main>
      <Footer ownerMode={ownerMode} onOwnerToggle={toggleOwnerMode} />
    </>
  )
}

export default App
