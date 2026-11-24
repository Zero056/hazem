import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  duration?: number
}

const EASE = [0.22, 1, 0.36, 1] as const

/** Fades and lifts content into view once. Motion is skipped when reduced. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
  duration = 0.85,
}: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px 0px -70px 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
