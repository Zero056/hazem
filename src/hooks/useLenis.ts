import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

/** Pauses/resumes Lenis while an overlay (mobile menu) is open. */
export function setScrollLocked(locked: boolean) {
  if (instance) {
    if (locked) instance.stop()
    else instance.start()
  }
  document.documentElement.classList.toggle('lenis-stopped', locked)
}

/** Smoothly scrolls to a section, preferring the active Lenis instance. */
export function scrollToSection(id: string, offset = -76) {
  const el = document.getElementById(id)
  if (!el) return

  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.35 })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({
    top,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

/** Boots Lenis once for the whole document. No-op for reduced motion. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    })
    instance = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      instance = null
    }
  }, [])
}
