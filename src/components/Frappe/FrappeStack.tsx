import { Building2, Code2, FileCode2, MousePointerClick, type LucideIcon } from 'lucide-react'
import { frappePillars, type FrappePillar } from '../../data/portfolio'
import SectionHeading from '../animations/SectionHeading'
import Reveal from '../animations/Reveal'
import Tilt from '../animations/Tilt'

const ICONS: Record<FrappePillar['icon'], LucideIcon> = {
  backend: Code2,
  frontend: MousePointerClick,
  erp: Building2,
  advanced: FileCode2,
}

function PillarCard({ pillar, index }: { pillar: FrappePillar; index: number }) {
  const Icon = ICONS[pillar.icon]

  return (
    <Tilt max={3} className="h-full">
      <article className="panel panel-hover group relative h-full overflow-hidden rounded-[22px] p-6">
        <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle, rgba(255,138,50,0.25), transparent 65%)' }}
        />

        <div className="flex items-center justify-between">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-gold transition-colors duration-500 group-hover:border-accent/30">
            <Icon size={16} />
          </span>
          <span className="mono text-[10px] tracking-[0.16em] text-muted/40">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-paper">
          {pillar.title}
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{pillar.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {pillar.items.map((item) => (
            <li
              key={item}
              className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[10.5px] leading-none text-paper/65 transition-colors duration-300 group-hover:border-white/[0.12]"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Tilt>
  )
}

export default function FrappeStack() {
  return (
    <section className="section pt-0" aria-labelledby="frappe-title">
      <div className="container-page">
        <div className="panel noise relative overflow-hidden rounded-[28px] px-5 py-10 sm:px-8 md:px-10 md:py-12">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(255,138,50,0.16), transparent 65%)' }}
          />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.18]" />

          <div className="relative grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                index="04"
                label="Framework Engineering"
                title={
                  <span id="frappe-title">
                    Inside the <span className="serif-accent text-gradient">framework.</span>
                  </span>
                }
                description="Frappe is not a constraint — it is a precise instrument. These are the layers I work in every day."
              />

              <Reveal delay={0.12}>
                <div className="mt-8 space-y-2 rounded-2xl border border-white/[0.07] bg-ink/40 p-4">
                  {[
                    ['Client layer', 'Client Scripts · Form Events'],
                    ['Application layer', 'DocTypes · Controllers · Hooks'],
                    ['Data layer', 'MariaDB · SQL · Query Reports'],
                  ].map(([layer, detail], index) => (
                    <div key={layer} className="flex items-center gap-3">
                      <span className="mono text-[9px] text-accent/70">0{index + 1}</span>
                      <div className="min-w-0 flex-1 border-b border-white/[0.06] pb-2">
                        <p className="text-[11.5px] text-paper/80">{layer}</p>
                        <p className="mono text-[9.5px] text-muted/70">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {frappePillars.map((pillar, index) => (
                <Reveal key={pillar.id} delay={0.06 * index} className="h-full">
                  <PillarCard pillar={pillar} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
