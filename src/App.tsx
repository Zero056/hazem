import { useCallback, useEffect, useState } from 'react'
import Background from './components/Background'
import ScrollProgress from './components/ScrollProgress'
import Cursor from './components/Cursor/Cursor'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Enterprise from './components/Enterprise/Enterprise'
import FrappeStack from './components/Frappe/FrappeStack'
import Projects from './components/Projects/Projects'
import Process from './components/Process/Process'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import { setScrollLocked, useLenis } from './hooks/useLenis'

const INTRO_KEY = 'hazem:intro-complete'

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [introDone, setIntroDone] = useState(hasSeenIntro)
  useLenis()

  useEffect(() => {
    setScrollLocked(!introDone)
    if (!introDone) return
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* storage can be unavailable; the intro simply replays */
    }
  }, [introDone])

  const finishIntro = useCallback(() => setIntroDone(true), [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Background />
      <ScrollProgress />
      <Cursor />

      {introDone ? null : <Loader onComplete={finishIntro} />}

      <Navbar ready={introDone} />

      <main id="main">
        <Hero ready={introDone} />
        <About />
        <Skills />
        <Enterprise />
        <FrappeStack />
        <Projects />
        <Process />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
