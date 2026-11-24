import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = {
  visible: boolean
  hovering: boolean
  pressed: boolean
  label: string | null
}

/**
 * Desktop-only custom cursor: a precise dot, a trailing ring, and contextual
 * labels for project visuals. Disabled for touch and reduced-motion users.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<CursorState>({
    visible: false,
    hovering: false,
    pressed: false,
    label: null,
  })

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.25 })
  const dotY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.25 })
  const ringX = useSpring(x, { stiffness: 170, damping: 26, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 170, damping: 26, mass: 0.6 })
  const raf = useRef(0)
  const latest = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    setEnabled(true)
    document.body.classList.add('cursor-none')

    const move = (event: PointerEvent) => {
      latest.current = { x: event.clientX, y: event.clientY }
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          x.set(latest.current.x)
          y.set(latest.current.y)
          raf.current = 0
        })
      }
      setState((s) => (s.visible ? s : { ...s, visible: true }))
    }

    const over = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      )
      if (!target) {
        setState((s) => (s.hovering || s.label ? { ...s, hovering: false, label: null } : s))
        return
      }
      const label = target.getAttribute('data-cursor-label')
      setState((s) => ({ ...s, hovering: true, label }))
    }

    const down = () => setState((s) => ({ ...s, pressed: true }))
    const up = () => setState((s) => ({ ...s, pressed: false }))
    const leave = () => setState((s) => ({ ...s, visible: false }))

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)

    return () => {
      document.body.classList.remove('cursor-none')
      cancelAnimationFrame(raf.current)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  const labelled = Boolean(state.label)
  const size = labelled ? 78 : state.hovering ? 52 : 32

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[110] hidden md:block">
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-gold"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          opacity: state.visible ? 1 : 0,
          scale: state.pressed ? 0.55 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-gold/50"
        style={{
          x: ringX,
          y: ringY,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          opacity: state.visible ? (labelled ? 1 : 0.55) : 0,
          backgroundColor: labelled
            ? 'rgba(255,138,50,0.14)'
            : state.hovering
              ? 'rgba(255,138,50,0.08)'
              : 'transparent',
        }}
        animate={{ scale: state.pressed ? 0.88 : 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      >
        {labelled ? (
          <span className="mono text-[9px] uppercase tracking-[0.14em] text-gold">{state.label}</span>
        ) : null}
      </motion.div>
    </div>
  )
}
