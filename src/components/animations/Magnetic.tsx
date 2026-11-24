import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type MagneticProps = {
  children: React.ReactNode
  className?: string
  strength?: number
  /** Max travel in pixels, keeps the effect tasteful. */
  max?: number
}

/** Pulls its child gently toward the pointer. Desktop pointers only. */
export default function Magnetic({ children, className, strength = 0.28, max = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 240, damping: 20, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 240, damping: 20, mass: 0.4 })

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    rawX.set(Math.max(-max, Math.min(max, dx * strength)))
    rawY.set(Math.max(-max, Math.min(max, dy * strength)))
  }

  const reset = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  )
}
