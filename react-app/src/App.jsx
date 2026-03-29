import { useEffect, useState } from 'react'
import './scroll-anchors.css'
import { About } from './components/About'
import { Education } from './components/Education'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SectionPlaceholder } from './components/SectionPlaceholder'
import { getInitialTheme, persistTheme } from './lib/theme'

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [theme])

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
        <SectionPlaceholder id="projects" title="Projects" />
        <SectionPlaceholder id="skills" title="Skills" />
        <SectionPlaceholder id="certificates" title="Certificates" />
        <SectionPlaceholder id="contact" title="Contact" />
      </main>
    </>
  )
}

export default App
