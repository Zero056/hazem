import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type TiltProps = {
  children: React.ReactNode
  className?: string
  /** Maximum rotation in degrees. */
  max?: number
}

/** Subtle pointer-driven 3D tilt with a spring return. */
export default function Tilt({ children, className, max = 5 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 160, damping: 18, mass: 0.5 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 160, damping: 18, mass: 0.5 })

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * max * 2)
    rotateX.set(-py * max * 2)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        className={className}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={onMove}
        onPointerLeave={reset}
        onBlur={reset}
      >
        {children}
      </motion.div>
    </div>
  )
}
