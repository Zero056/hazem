import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }

    const duration = 1750
    const start = performance.now()
    let frame = 0
    let timer = 0

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setProgress(Math.round(p * 100))
      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        timer = window.setTimeout(() => setLeaving(true), 320)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col overflow-hidden bg-ink"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.95, ease: EASE }}
      onAnimationComplete={() => {
        if (leaving) onComplete()
      }}
      aria-label="Intro"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(720px 420px at 50% 42%, rgba(255,138,50,0.16), transparent 62%), radial-gradient(520px 320px at 78% 72%, rgba(255,184,92,0.1), transparent 65%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.18] edge-fade-b" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          Portfolio — 2026
        </motion.p>

        <div className="mt-5 overflow-hidden">
          <motion.h1
            className="display-1 text-center text-paper"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            Hazem Sharaf
          </motion.h1>
        </div>

        <motion.p
          className="mono mt-6 text-[11px] uppercase tracking-[0.32em] text-muted"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          Frappe · ERPNext · Python
        </motion.p>
      </div>

      <div className="relative h-px w-full bg-white/[0.07]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-gold to-accent"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
        <motion.div
          className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-gold shadow-[0_0_20px_4px_rgba(255,138,50,0.55)]"
          style={{ left: `${progress}%` }}
        />
      </div>

      <div className="relative flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="mono text-[11px] tracking-[0.2em] text-muted">
          {String(progress).padStart(3, '0')}
        </span>
        <button
          type="button"
          onClick={() => setLeaving(true)}
          className="mono rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accent/40 hover:text-paper"
        >
          Skip intro
        </button>
      </div>
    </motion.div>
  )
}
