import { useId } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function Grid() {
  const id = useId().replace(/:/g, '')
  return (
    <g opacity="0.5">
      <defs>
        <pattern id={`visual-grid-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(245,245,247,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill={`url(#visual-grid-${id})`} />
    </g>
  )
}

function Modular() {
  const blocks = [
    { x: 35, y: 42, label: 'DocType' },
    { x: 120, y: 42, label: 'Controller' },
    { x: 205, y: 42, label: 'Hook' },
    { x: 290, y: 42, label: 'API' },
    { x: 35, y: 110, label: 'Client' },
    { x: 120, y: 110, label: 'Workflow' },
    { x: 205, y: 110, label: 'App' },
    { x: 290, y: 110, label: 'Report' },
    { x: 35, y: 178, label: 'Perms' },
    { x: 120, y: 178, label: 'Print' },
    { x: 205, y: 178, label: 'Patch' },
    { x: 290, y: 178, label: 'Test' },
  ]
  const hub = { x: 205, y: 110 }

  return (
    <g>
      {blocks.map((block, index) => {
        const isHub = block.x === hub.x && block.y === hub.y
        return (
          <g key={block.label}>
            {!isHub ? (
              <line
                x1={hub.x + 36}
                y1={hub.y + 22}
                x2={block.x + 36}
                y2={block.y + 22}
                stroke="rgba(255,138,50,0.12)"
                strokeWidth="1"
              />
            ) : null}
            <motion.g
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.03 * index, duration: 0.5 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <rect
                x={block.x}
                y={block.y}
                width="72"
                height="44"
                rx="8"
                fill={isHub ? 'rgba(255,138,50,0.12)' : 'rgba(16,19,27,0.9)'}
                stroke={isHub ? 'rgba(255,138,50,0.7)' : 'rgba(245,245,247,0.1)'}
              />
              <circle cx={block.x + 10} cy={block.y + 12} r="1.8" fill={isHub ? '#FFB85C' : 'rgba(245,245,247,0.3)'} />
              <text
                x={block.x + 36}
                y={block.y + 27}
                textAnchor="middle"
                fontSize="8"
                fontFamily="'JetBrains Mono', monospace"
                fill={isHub ? '#FFD6A8' : 'rgba(245,245,247,0.5)'}
              >
                {block.label}
              </text>
            </motion.g>
          </g>
        )
      })}
    </g>
  )
}

function Ticket() {
  const lanes = [
    { x: 26, label: 'OPEN', count: 3 },
    { x: 143, label: 'ACTIVE', count: 2 },
    { x: 260, label: 'DONE', count: 3 },
  ]
  const cards = [
    { lane: 0, y: 74, w: 0.9 },
    { lane: 0, y: 124, w: 0.65 },
    { lane: 0, y: 174, w: 0.8 },
    { lane: 1, y: 74, w: 0.85, active: true },
    { lane: 1, y: 124, w: 0.6 },
    { lane: 2, y: 74, w: 0.7 },
    { lane: 2, y: 124, w: 0.85 },
    { lane: 2, y: 174, w: 0.55 },
  ]

  return (
    <g>
      {lanes.map((lane, index) => (
        <g key={lane.label}>
          <rect
            x={lane.x}
            y={42}
            width="104"
            height="188"
            rx="10"
            fill="rgba(16,19,27,0.55)"
            stroke="rgba(245,245,247,0.07)"
          />
          <text
            x={lane.x + 12}
            y={62}
            fontSize="7.5"
            fontFamily="'JetBrains Mono', monospace"
            fill={index === 1 ? '#FFB85C' : 'rgba(245,245,247,0.4)'}
            letterSpacing="1"
          >
            {lane.label}
          </text>
          <text
            x={lane.x + 92}
            y={62}
            textAnchor="end"
            fontSize="7"
            fontFamily="'JetBrains Mono', monospace"
            fill="rgba(245,245,247,0.25)"
          >
            {lane.count}
          </text>
        </g>
      ))}

      {cards.map((card, index) => {
        const x = lanes[card.lane].x + 10
        const width = 84 * card.w
        return (
          <motion.g
            key={index}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04 * index, duration: 0.45 }}
          >
            <rect
              x={x}
              y={card.y}
              width={width}
              height="38"
              rx="6"
              fill={card.active ? 'rgba(255,138,50,0.13)' : 'rgba(245,245,247,0.04)'}
              stroke={card.active ? 'rgba(255,138,50,0.55)' : 'rgba(245,245,247,0.09)'}
            />
            <rect x={x + 8} y={card.y + 10} width={width * 0.62} height="3" rx="1.5" fill="rgba(245,245,247,0.35)" />
            <rect x={x + 8} y={card.y + 18} width={width * 0.42} height="3" rx="1.5" fill="rgba(245,245,247,0.16)" />
            <circle cx={x + width - 12} cy={card.y + 12} r="2.5" fill={card.active ? '#FFB85C' : 'rgba(245,245,247,0.2)'} />
          </motion.g>
        )
      })}

    </g>
  )
}

function Fleet() {
  const reduced = usePrefersReducedMotion()

  return (
    <g>
      <path
        d="M42 206 C 92 176, 96 118, 152 128 S 226 186, 272 146 S 330 78, 362 92"
        fill="none"
        stroke="rgba(255,138,50,0.55)"
        strokeWidth="1.6"
        strokeDasharray="5 7"
      />
      <path
        d="M42 206 C 92 176, 96 118, 152 128 S 226 186, 272 146 S 330 78, 362 92"
        fill="none"
        stroke="rgba(255,184,92,0.9)"
        strokeWidth="1.6"
        strokeDasharray="26 300"
        className={reduced ? undefined : 'dash-flow'}
      />

      {[
        [42, 206],
        [152, 128],
        [272, 146],
        [362, 92],
      ].map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="9" fill="rgba(255,138,50,0.12)" />
          <circle cx={x} cy={y} r="3" fill="#FFB85C" />
          {!reduced ? (
            <circle cx={x} cy={y} r="9" fill="none" stroke="rgba(255,184,92,0.4)">
              <animate attributeName="r" values="5;16" dur="2.8s" begin={`${index * 0.6}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0" dur="2.8s" begin={`${index * 0.6}s`} repeatCount="indefinite" />
            </circle>
          ) : null}
        </g>
      ))}

      <g>
        <rect x="252" y="196" width="112" height="46" rx="8" fill="rgba(11,13,19,0.9)" stroke="rgba(245,245,247,0.1)" />
        <text x="264" y="212" fontSize="7" fontFamily="'JetBrains Mono', monospace" fill="rgba(245,245,247,0.4)">
          VEHICLE
        </text>
        <text x="264" y="226" fontSize="9" fontFamily="'Space Grotesk', sans-serif" fill="#F5F5F7">
          GPS · ONLINE
        </text>
        <circle cx="352" cy="210" r="3" fill="#FF8A32" />
      </g>
    </g>
  )
}

function Ocr() {
  const reduced = usePrefersReducedMotion()

  return (
    <g>
      <rect x="40" y="34" width="176" height="192" rx="10" fill="rgba(16,19,27,0.85)" stroke="rgba(245,245,247,0.1)" />
      <path d="M196 34 L216 54 L196 54 Z" fill="rgba(245,245,247,0.08)" />

      {[0, 1, 2, 3, 4, 5, 6, 7].map((line) => (
        <rect
          key={line}
          x="58"
          y={58 + line * 18}
          width={line % 3 === 0 ? 118 : line % 3 === 1 ? 92 : 136}
          height="4"
          rx="2"
          fill="rgba(245,245,247,0.22)"
        />
      ))}

      <motion.rect
        x="48"
        width="160"
        height="2"
        rx="1"
        fill="#FF8A32"
        initial={{ y: 50, opacity: 0.9 }}
        animate={reduced ? { y: 120 } : { y: [50, 210, 50], opacity: [0.9, 0.6, 0.9] }}
        transition={reduced ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.rect
        x="48"
        width="160"
        height="22"
        fill="rgba(255,138,50,0.08)"
        initial={{ y: 40 }}
        animate={reduced ? { y: 110 } : { y: [40, 198, 40] }}
        transition={reduced ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {[
        { y: 72, label: 'INVOICE NO' },
        { y: 122, label: 'DATE' },
        { y: 172, label: 'TOTAL' },
      ].map((item, index) => (
        <motion.g
          key={item.label}
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
        >
          <rect x="246" y={item.y - 12} width="112" height="30" rx="7" fill="rgba(255,138,50,0.07)" stroke="rgba(255,138,50,0.3)" />
          <text x="256" y={item.y - 2} fontSize="6.5" fontFamily="'JetBrains Mono', monospace" fill="rgba(255,184,92,0.75)" letterSpacing="0.8">
            {item.label}
          </text>
          <rect x="256" y={item.y + 4} width={index === 0 ? 62 : index === 1 ? 44 : 52} height="3" rx="1.5" fill="rgba(245,245,247,0.4)" />
        </motion.g>
      ))}

      <path d="M216 90 L246 90" stroke="rgba(255,138,50,0.3)" strokeDasharray="3 4" />
      <path d="M216 126 L246 126" stroke="rgba(255,138,50,0.3)" strokeDasharray="3 4" />
      <path d="M216 172 L246 172" stroke="rgba(255,138,50,0.3)" strokeDasharray="3 4" />
    </g>
  )
}

function Copilot() {
  const nodes = Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2
    return { x: 200 + Math.cos(angle) * 88, y: 130 + Math.sin(angle) * 74, index }
  })

  return (
    <g>
      <circle cx="200" cy="130" r="74" fill="none" stroke="rgba(245,245,247,0.06)" strokeDasharray="3 6" />
      <circle cx="200" cy="130" r="108" fill="none" stroke="rgba(245,245,247,0.04)" strokeDasharray="3 6" />

      {nodes.map((node) => (
        <line key={node.index} x1="200" y1="130" x2={node.x} y2={node.y} stroke="rgba(255,138,50,0.18)" strokeWidth="1" />
      ))}

      {nodes.map((node) => (
        <motion.g
          key={node.index}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 * node.index, duration: 0.5 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <circle cx={node.x} cy={node.y} r="14" fill="rgba(16,19,27,0.95)" stroke="rgba(245,245,247,0.14)" />
          <circle cx={node.x} cy={node.y} r="3" fill="rgba(255,184,92,0.75)" />
        </motion.g>
      ))}

      <circle cx="200" cy="130" r="40" fill="rgba(255,138,50,0.1)" stroke="rgba(255,138,50,0.55)" />
      <text x="200" y="127" textAnchor="middle" fontSize="13" fontFamily="'Space Grotesk', sans-serif" fill="#FFD6A8">
        AI
      </text>
      <text x="200" y="142" textAnchor="middle" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" fill="rgba(245,245,247,0.45)" letterSpacing="1">
        HR · SKILLS
      </text>
    </g>
  )
}

export default function ProjectVisual({
  variant,
  image,
  title,
}: {
  variant: Product['visual']
  image?: string | null
  title?: string
}) {
  if (image) {
    const src = image.startsWith('http') ? image : `${import.meta.env.BASE_URL}${image}`
    return (
      <div className="relative h-full w-full overflow-hidden bg-surface">
        <img
          src={src}
          alt={title ? `${title} preview` : ''}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090D]/70 via-transparent to-transparent" />
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0c11]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(320px 200px at 50% 40%, rgba(255,138,50,0.10), transparent 70%)',
        }}
      />
      <svg
        viewBox="0 0 400 260"
        className="relative h-full w-full transition-transform duration-700 ease-editorial group-hover:scale-[1.035]"
        aria-hidden
      >
        <Grid />
        {variant === 'modular' ? <Modular /> : null}
        {variant === 'ticket' ? <Ticket /> : null}
        {variant === 'fleet' ? <Fleet /> : null}
        {variant === 'ocr' ? <Ocr /> : null}
        {variant === 'copilot' ? <Copilot /> : null}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-70" />
    </div>
  )
}
