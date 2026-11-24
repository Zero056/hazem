import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { site } from '../../data/portfolio'
import { scrollToSection, setScrollLocked } from '../../hooks/useLenis'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = site.nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.15, 0.4, 0.75] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    setScrollLocked(open)

    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus()
      wasOpen.current = false
      return
    }

    wasOpen.current = true
    const panel = document.getElementById('mobile-menu')
    const focusables = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : []
    focusables[0]?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setActive(id)
    setOpen(false)
    window.setTimeout(() => scrollToSection(id), open ? 120 : 0)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        initial={{ y: -28, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -28, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: ready ? 0.15 : 0 }}
      >
        <div className="container-page">
          <div
            className={`mt-3 flex items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500 sm:mt-4 sm:px-4 ${
              scrolled
                ? 'glass shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)]'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <button
              type="button"
              onClick={() => go('home')}
              className="group flex items-center gap-2.5 rounded-full px-2 py-1"
              aria-label="Hazem Sharaf — back to top"
            >
              <span className="relative grid h-8 w-8 place-items-center rounded-full border border-accent/30 bg-accent/10">
                <span className="font-display text-[11px] font-semibold tracking-tight text-gold">Z0</span>
                <span className="absolute inset-0 rounded-full bg-accent/20 opacity-0 blur-md transition group-hover:opacity-100" />
              </span>
              <span className="font-display text-[15px] font-medium tracking-tight text-paper">
                Hazem Sharaf
                <span className="ml-1.5 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted lg:inline">
                  / ERP
                </span>
              </span>
            </button>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
              {site.nav.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                    active === item.id ? 'text-paper' : 'text-muted hover:text-paper'
                  }`}
                >
                  {active === item.id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${site.email}`}
                className="group hidden items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-[12.5px] font-medium text-ink transition hover:bg-gold sm:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-paper lg:hidden"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-2xl" />
            <div className="absolute inset-0 grid-bg opacity-[0.14]" />
            <div
              className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(255,138,50,0.18), transparent 65%)' }}
            />

            <motion.div
              className="relative flex h-full flex-col px-5 pb-8 pt-5 sm:px-8"
              initial={{ y: 18 }}
              animate={{ y: 0 }}
              exit={{ y: 12 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base font-medium text-paper">Hazem</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-10 flex flex-1 flex-col justify-center" aria-label="Mobile">
                {site.nav.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.055, duration: 0.6, ease: EASE }}
                    className="group flex items-baseline justify-between border-b border-white/[0.07] py-4 text-left"
                  >
                    <span className="display-3 text-paper transition-colors group-hover:text-gold">
                      {item.label}
                    </span>
                    <span className="mono text-[10px] tracking-[0.18em] text-muted">
                      0{index + 1}
                    </span>
                  </motion.button>
                ))}
              </nav>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="eyebrow">Get in touch</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block font-display text-lg text-paper underline decoration-white/20 underline-offset-4"
                >
                  {site.email}
                </a>
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition hover:text-paper"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition hover:text-paper"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition hover:text-paper"
                    aria-label="Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
