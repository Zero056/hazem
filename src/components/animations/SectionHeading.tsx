import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionHeadingProps = {
  index: string
  label: string
  title: ReactNode
  description?: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  index,
  label,
  title,
  description,
  className = '',
  align = 'left',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <Reveal y={14}>
        <div className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
          <span className="mono text-[11px] tracking-[0.2em] text-accent">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-accent/70 to-transparent sm:w-14" />
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06} y={30}>
        <h2 className={`display-2 mt-6 max-w-4xl text-paper ${centered ? 'mx-auto' : ''}`}>{title}</h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12} y={22}>
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
