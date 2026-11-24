import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { enterpriseSystems, type EnterpriseSystem } from '../../data/portfolio'
import SectionHeading from '../animations/SectionHeading'
import Reveal from '../animations/Reveal'

const EASE = [0.22, 1, 0.36, 1] as const

function WorkflowChain({ steps, systemId }: { steps: string[]; systemId: string }) {
  return (
    <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-stretch">
      {steps.map((step, index) => (
        <div key={`${systemId}-${step}`} className="flex flex-1 flex-col md:flex-row md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 * index, ease: EASE }}
            className="group relative flex-1 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.04]"
          >
            <div className="flex items-center gap-2">
              <span className="mono text-[9px] tracking-[0.12em] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="h-px flex-1 bg-white/[0.07]" />
            </div>
            <p className="mt-1.5 text-[11.5px] leading-snug text-paper/85">{step}</p>
          </motion.div>

          {index < steps.length - 1 ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.06 * index + 0.1 }}
              className="my-0.5 flex justify-center text-accent/50 md:mx-1 md:my-0"
              aria-hidden
            >
              <ArrowRight size={12} className="rotate-90 md:rotate-0" />
            </motion.span>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function SystemDetail({ system }: { system: EnterpriseSystem }) {
  return (
    <motion.div
      key={system.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="flex h-full flex-col p-5 sm:p-7 lg:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-accent/25 bg-accent/[0.07] text-gold">{system.kind}</span>
            <span className="mono text-[9px] uppercase tracking-[0.14em] text-muted/70">
              ERPNext · Frappe
            </span>
          </div>
          <h3 className="mt-4 font-display text-[1.45rem] font-medium leading-tight tracking-tight text-paper sm:text-[1.75rem]">
            {system.title}
          </h3>
        </div>
        <span className="display-2 hidden shrink-0 text-[3.2rem] leading-none text-white/[0.055] sm:block">
          {system.index}
        </span>
      </div>

      <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted sm:text-sm">
        {system.summary}
      </p>

      <div className="mt-6">
        <p className="mono text-[9px] uppercase tracking-[0.18em] text-muted">Workflow</p>
        <WorkflowChain steps={system.workflow} systemId={system.id} />
      </div>

      <div className="mt-6">
        <p className="mono text-[9px] uppercase tracking-[0.18em] text-muted">Capabilities</p>
        <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {system.capabilities.map((capability, index) => (
            <motion.li
              key={capability}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + index * 0.025 }}
              className="flex items-start gap-2 text-[12.5px] leading-relaxed text-paper/75"
            >
              <Check size={12} className="mt-1 shrink-0 text-accent/80" />
              <span>{capability}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {system.rules ? (
        <div className="mt-6 rounded-xl border border-accent/20 bg-accent/[0.05] p-4">
          <p className="mono text-[9px] uppercase tracking-[0.16em] text-gold">Business rules</p>
          <ul className="mt-2 space-y-1.5">
            {system.rules.map((rule) => (
              <li key={rule} className="flex gap-2 text-[12px] leading-relaxed text-paper/70">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {system.scenarios ? (
        <div className="mt-5">
          <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">Handover scenarios</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {system.scenarios.map((scenario) => (
              <span key={scenario} className="chip text-paper/70">
                {scenario}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {system.reports ? (
        <div className="mt-5">
          <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">Report examples</p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {system.reports.map((report) => (
              <li key={report} className="flex gap-2 text-[12px] leading-relaxed text-paper/70">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                {report}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-1.5 border-t border-white/[0.07] pt-4">
        <span className="mono mr-1 text-[9px] uppercase tracking-[0.16em] text-muted">Stack</span>
        {system.stack.map((tech) => (
          <span key={tech} className="chip text-paper/65">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Enterprise() {
  const [activeId, setActiveId] = useState(enterpriseSystems[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = enterpriseSystems.find((system) => system.id === activeId) ?? enterpriseSystems[0]

  const focusTab = (index: number) => {
    const next = (index + enterpriseSystems.length) % enterpriseSystems.length
    setActiveId(enterpriseSystems[next].id)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const current = enterpriseSystems.findIndex((system) => system.id === activeId)
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      focusTab(current + 1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      focusTab(current - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusTab(enterpriseSystems.length - 1)
    }
  }

  return (
    <section id="systems" className="section" aria-labelledby="systems-title">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Enterprise Systems"
          title={
            <span id="systems-title">
              Enterprise systems &{' '}
              <span className="serif-accent text-gradient">business solutions.</span>
            </span>
          }
          description="The core of my work: ERPNext systems built around real operational workflows — financial processes, commissions, handovers, reconciliation and reporting."
        />

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[320px_1fr] lg:gap-6">
          <Reveal className="min-w-0">
            <div
              role="tablist"
              aria-label="Enterprise systems"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {enterpriseSystems.map((system, index) => {
                const selected = system.id === activeId
                return (
                  <button
                    key={system.id}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${system.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${system.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(system.id)}
                    className={`relative shrink-0 rounded-xl px-3.5 py-3 text-left transition-colors duration-300 lg:w-full ${
                      selected ? 'text-paper' : 'text-muted hover:text-paper/85'
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="system-tab-active"
                        className="absolute inset-0 rounded-xl border border-accent/25 bg-accent/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    ) : null}
                    <span className="relative flex items-center gap-3">
                      <span
                        className={`mono text-[10px] ${selected ? 'text-accent' : 'text-muted/50'}`}
                      >
                        {system.index}
                      </span>
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-[12.5px] font-medium lg:whitespace-normal">
                          {system.shortTitle}
                        </span>
                        <span className="mt-0.5 hidden text-[10px] uppercase tracking-[0.1em] text-muted/60 lg:block">
                          {system.kind}
                        </span>
                      </span>
                      <ChevronRight
                        size={13}
                        className={`ml-auto hidden shrink-0 lg:block ${
                          selected ? 'text-accent' : 'text-muted/30'
                        }`}
                      />
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 lg:block">
              <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted/70">Scope</p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">
                Implemented ERPNext systems, custom modules and reporting — not standalone demos.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <div
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              tabIndex={0}
              className="panel noise relative h-full min-h-[560px] overflow-hidden rounded-[24px]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <AnimatePresence mode="wait" initial={false}>
                <SystemDetail key={active.id} system={active} />
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
