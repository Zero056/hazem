import { Boxes, Cable, Database, LayoutTemplate, Terminal, type LucideIcon } from 'lucide-react'
import { skillGroups, type SkillGroup } from '../../data/portfolio'
import SectionHeading from '../animations/SectionHeading'
import Reveal from '../animations/Reveal'
import Tilt from '../animations/Tilt'

const ICONS: Record<SkillGroup['icon'], LucideIcon> = {
  backend: Terminal,
  erp: Boxes,
  frontend: LayoutTemplate,
  database: Database,
  tools: Cable,
}

const SPANS: Record<string, string> = {
  backend: 'lg:col-span-5',
  erp: 'lg:col-span-7',
  frontend: 'lg:col-span-4',
  database: 'lg:col-span-4',
  tools: 'lg:col-span-4',
}

const TOOLKIT = [
  'Python',
  'Frappe Framework',
  'ERPNext',
  'JavaScript',
  'MariaDB',
  'SQL',
  'REST APIs',
  'Git',
  'Linux',
  'Bench CLI',
]

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = ICONS[group.icon]

  return (
    <Tilt max={3} className="h-full">
      <article
        className="panel panel-hover noise group relative h-full overflow-hidden rounded-[22px] p-6 sm:p-7"
        aria-labelledby={`skill-${group.id}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle, rgba(255,138,50,0.22), transparent 65%)' }}
        />

        <div className="flex items-start justify-between">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-gold transition-colors duration-500 group-hover:border-accent/30 group-hover:bg-accent/10">
            <Icon size={17} />
          </span>
          <span className="mono text-[10px] tracking-[0.18em] text-muted/50">{group.index}</span>
        </div>

        <h3
          id={`skill-${group.id}`}
          className="display-3 mt-6 text-[1.35rem] text-paper sm:text-[1.5rem]"
        >
          {group.name}
        </h3>
        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">{group.blurb}</p>

        <ul className="mt-6 space-y-3">
          {group.items.map((item) => (
            <li
              key={item.name}
              className="border-t border-white/[0.06] pt-3 transition-colors duration-300 group-hover:border-white/[0.1]"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent/80" />
                <p className="text-[13.5px] font-medium text-paper">{item.name}</p>
              </div>
              <p className="mt-1 pl-[14px] text-[12.5px] leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </article>
    </Tilt>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            label="Capabilities"
            title={
              <span id="skills-title">
                A stack built for{' '}
                <span className="serif-accent text-gradient">business systems.</span>
              </span>
            }
            description="Not a list of languages. A working toolkit for designing, extending and operating enterprise applications."
          />

          <Reveal delay={0.15} className="shrink-0 lg:max-w-[280px]">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className="mono text-[9px] uppercase tracking-[0.18em] text-muted">Daily toolkit</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {TOOLKIT.map((tool) => (
                  <span key={tool} className="chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.id}
              delay={0.05 * index}
              className={`h-full md:last:col-span-2 lg:last:col-span-4 ${SPANS[group.id] ?? ''}`}
            >
              <SkillCard group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
