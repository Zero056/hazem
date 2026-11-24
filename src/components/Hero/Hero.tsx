import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Layers } from 'lucide-react'
import { site } from '../../data/portfolio'
import { scrollToSection } from '../../hooks/useLenis'
import Magnetic from '../animations/Magnetic'

const EASE = [0.22, 1, 0.36, 1] as const

/* ------------------------------------------------------------------ */
/* Ambient particle network                                            */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const count = coarse ? 18 : 46
    const linkDistance = 130

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    const pointer = { x: -9999, y: -9999 }

    const points = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00016,
      r: 0.8 + Math.random() * 1.1,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i]
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > 1) p.vx *= -1
          if (p.y < 0 || p.y > 1) p.vy *= -1
        }
        const px = p.x * width
        const py = p.y * height

        ctx.beginPath()
        ctx.fillStyle = 'rgba(255,184,92,0.5)'
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < points.length; j += 1) {
          const q = points[j]
          const qx = q.x * width
          const qy = q.y * height
          const distance = Math.hypot(px - qx, py - qy)
          if (distance < linkDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,138,50,${0.16 * (1 - distance / linkDistance)})`
            ctx.lineWidth = 0.8
            ctx.moveTo(px, py)
            ctx.lineTo(qx, qy)
            ctx.stroke()
          }
        }

        if (!coarse) {
          const dx = px - pointer.x
          const dy = py - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < 170) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,184,92,${0.22 * (1 - distance / 170)})`
            ctx.lineWidth = 0.7
            ctx.moveTo(px, py)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.stroke()
          }
        }
      }

      if (!reduced && visible) frame = requestAnimationFrame(draw)
    }

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting
        if (next && !visible && !reduced) {
          visible = true
          frame = requestAnimationFrame(draw)
        }
        visible = next
      },
      { threshold: 0 },
    )

    resize()
    draw()
    observer.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full opacity-70" />
}

/* ------------------------------------------------------------------ */
/* Enterprise system map                                               */
/* ------------------------------------------------------------------ */

type NodeProps = {
  x: number
  y: number
  width: number
  label: string
  sub?: string
  hub?: boolean
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

function MapNode({ x, y, width, label, sub, hub = false }: NodeProps) {
  const height = hub ? 62 : 44

  return (
    <motion.g
      variants={nodeVariants}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={11}
        fill={hub ? 'rgba(255,138,50,0.10)' : 'rgba(11,13,19,0.94)'}
        stroke={hub ? 'rgba(255,138,50,0.65)' : 'rgba(245,245,247,0.12)'}
        strokeWidth={hub ? 1.2 : 1}
      />
      <text
        x={x}
        y={sub ? y - 4 : y + 3.5}
        textAnchor="middle"
        fill={hub ? '#FFD6A8' : '#F5F5F7'}
        fontSize={hub ? 12.5 : 11.5}
        fontFamily="'Space Grotesk', sans-serif"
        letterSpacing="-0.2"
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x}
          y={y + 12}
          textAnchor="middle"
          fill="rgba(245,245,247,0.45)"
          fontSize={8}
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="1.2"
        >
          {sub}
        </text>
      ) : null}
      <circle
        cx={x - width / 2 + 11}
        cy={y}
        r={2}
        fill={hub ? '#FF8A32' : 'rgba(255,184,92,0.55)'}
        className={hub ? 'animate-pulse' : undefined}
      />
    </motion.g>
  )
}

function SystemMap({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const links: { id: string; d: string }[] = [
    { id: 'top', d: 'M260 118 L260 249' },
    { id: 'left', d: 'M171 280 L185 280' },
    { id: 'right', d: 'M335 280 L349 280' },
    { id: 'bottom', d: 'M260 311 L260 442' },
    { id: 'dt', d: 'M150 190 L150 214 L214 252' },
    { id: 'py', d: 'M370 190 L370 214 L306 252' },
    { id: 'db', d: 'M150 370 L150 346 L214 308' },
    { id: 'rest', d: 'M370 370 L370 346 L306 308' },
  ]

  return (
    <motion.svg
      viewBox="0 0 520 560"
      className="h-auto w-full"
      initial="hidden"
      animate={ready ? 'show' : 'hidden'}
      variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.35 } } }}
      role="img"
      aria-label="Diagram of an ERPNext system: sales order, sales invoice, payment and ledger connected to a Frappe core"
    >
      <defs>
        <linearGradient id="link-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8A32" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFB85C" stopOpacity="0.12" />
        </linearGradient>
        <filter id="hub-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity="0.35">
        {Array.from({ length: 7 }).map((_, index) => (
          <line
            key={`v${index}`}
            x1={40 + index * 73}
            y1={20}
            x2={40 + index * 73}
            y2={540}
            stroke="rgba(245,245,247,0.05)"
          />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <line
            key={`h${index}`}
            x1={20}
            y1={40 + index * 70}
            x2={500}
            y2={40 + index * 70}
            stroke="rgba(245,245,247,0.05)"
          />
        ))}
      </g>

      {links.map((link, index) => (
        <motion.path
          key={link.id}
          d={link.d}
          fill="none"
          stroke="url(#link-gradient)"
          strokeWidth="1.1"
          className="dash-flow"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            show: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1, ease: EASE, delay: 0.25 + index * 0.05 },
            },
          }}
        />
      ))}

      {!reduced
        ? [
            { id: 'p1', path: 'M260 118 L260 249', delay: 0 },
            { id: 'p2', path: 'M171 280 L185 280', delay: 1 },
            { id: 'p3', path: 'M335 280 L349 280', delay: 2 },
            { id: 'p4', path: 'M260 311 L260 442', delay: 1.5 },
          ].map((pulse) => (
            <circle key={pulse.id} r="2.4" fill="#FFB85C">
              <animateMotion dur="3.6s" begin={`${pulse.delay}s`} repeatCount="indefinite" path={pulse.path} />
            </circle>
          ))
        : null}

      <MapNode x={260} y={280} width={150} label="ERPNext Core" sub="FRAPPE FRAMEWORK" hub />
      <MapNode x={260} y={96} width={152} label="Sales Order" />
      <MapNode x={96} y={280} width={150} label="Sales Invoice" />
      <MapNode x={424} y={280} width={150} label="Payment Entry" />
      <MapNode x={260} y={464} width={152} label="General Ledger" />
      <MapNode x={150} y={168} width={104} label="DocType" />
      <MapNode x={370} y={168} width={104} label="Python" />
      <MapNode x={150} y={392} width={104} label="MariaDB" />
      <MapNode x={370} y={392} width={104} label="REST API" />
    </motion.svg>
  )
}

function SystemPanel({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 60])
  const scale = useTransform(scrollY, [0, 700], [1, 0.97])

  return (
    <motion.div
      className="relative"
      style={reduced ? undefined : { y, scale }}
      initial={{ opacity: 0, y: 30 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
    >
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(255,138,50,0.20), transparent 62%), radial-gradient(circle at 20% 80%, rgba(255,184,92,0.12), transparent 60%)',
        }}
      />

      <div className="panel noise overflow-hidden rounded-[26px] p-2.5 shadow-card">
        <div className="rounded-[19px] border border-white/[0.06] bg-[#0a0c12]/85 p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-muted">
                system.map
              </span>
            </div>
            <span className="mono text-[9px] uppercase tracking-[0.16em] text-muted/70">
              erpnext · v15
            </span>
          </div>

          <div className="mt-2">
            <SystemMap ready={ready} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-white/[0.06] pt-3">
            {['DocTypes', 'Controllers', 'Hooks', 'Reports'].map((item) => (
              <span
                key={item}
                className="mono rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute -left-4 top-24 hidden items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-3 py-1.5 backdrop-blur-xl xl:flex"
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Layers size={12} className="text-gold" />
        <span className="mono text-[10px] tracking-[0.12em] text-paper/80">Business logic</span>
      </motion.div>

      <motion.div
        className="absolute -right-3 bottom-16 hidden items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-3 py-1.5 backdrop-blur-xl xl:flex"
        animate={reduced ? undefined : { y: [0, 9, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="mono text-[10px] tracking-[0.12em] text-paper/80">Python · MariaDB</span>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero({ ready }: { ready: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % site.heroRoles.length)
    }, 3400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-24 sm:pt-28 lg:pb-16"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <ParticleField />
        <div className="absolute inset-0 grid-bg opacity-[0.35] edge-fade-b" />
        <div
          className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(ellipse, rgba(255,138,50,0.14), transparent 65%)' }}
        />
      </div>

      <div className="container-page relative z-10">
        <div className="grid items-center gap-14 min-[900px]:grid-cols-[1.04fr_0.96fr] min-[900px]:gap-10">
          <div className="max-w-2xl">
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-paper/70">
                  Enterprise application engineering
                </span>
              </span>
            </motion.div>

            <h1 id="hero-title" className="display-1 mt-6 text-paper">
              {site.heroHeadline.map((word, index) => (
                <span key={word} className="block overflow-hidden pb-[0.055em]">
                  <motion.span
                    className={`block ${index === 1 ? 'serif-accent text-gradient text-[1.04em]' : ''}`}
                    initial={{ y: '112%' }}
                    animate={ready ? { y: 0 } : { y: '112%' }}
                    transition={{ duration: 1.15, ease: EASE, delay: 0.18 + index * 0.1 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              <div className="relative h-6 min-w-0 flex-1 overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.p
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="mono absolute inset-x-0 top-0 text-[11px] uppercase tracking-[0.2em] text-gold sm:text-xs"
                  >
                    {site.heroRoles[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <motion.p
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.9, delay: 0.65 }}
            >
              {site.brandStatement}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.9, delay: 0.78 }}
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="btn btn-primary group"
                >
                  Explore my work
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-ghost group"
                >
                  Let&apos;s connect
                  <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
                </button>
              </Magnetic>
            </motion.div>

            <motion.div
              className="hero-stats mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/[0.07] pt-5"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.95 }}
            >
              {['Business systems', 'Financial workflows', 'Automation'].map((item) => (
                <div key={item}>
                  <p className="mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-muted/80">
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative hidden min-[900px]:block">
            <SystemPanel ready={ready} />
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        className="scroll-cue absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label="Scroll to about section"
      >
        <span className="mono text-[9px] uppercase tracking-[0.28em] text-muted">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-accent to-transparent"
            animate={{ y: [-12, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <ArrowDown size={12} className="text-muted" />
      </motion.button>
    </section>
  )
}
