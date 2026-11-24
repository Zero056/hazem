import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { about, site } from '../../data/portfolio'
import SectionHeading from '../animations/SectionHeading'
import Reveal from '../animations/Reveal'
import Tilt from '../animations/Tilt'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function LayerStack() {
  const reduced = usePrefersReducedMotion()

  return (
    <Tilt max={4} className="h-full">
      <div className="panel noise relative h-full overflow-hidden rounded-[24px] p-5 sm:p-7">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted">how i work</span>
          <span className="mono text-[10px] text-accent">01 → 03</span>
        </div>

        <div className="relative mt-6">
          <div className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-accent/60 via-white/10 to-accent/40" />

          {about.layers.map((layer, index) => (
            <motion.div
              key={layer.label}
              className="group relative flex gap-4 pb-4 last:pb-0"
              initial={reduced ? undefined : { opacity: 0, x: -14 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.12 * index }}
            >
              <div className="relative z-10 mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-surface">
                <span className="mono text-[10px] text-gold">0{index + 1}</span>
                <span className="absolute inset-0 rounded-full border border-accent/0 transition group-hover:border-accent/40" />
              </div>

              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-500 group-hover:border-accent/25 group-hover:bg-accent/[0.04]">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-base font-medium text-paper">{layer.label}</h3>
                  <span className="mono hidden text-[9px] uppercase tracking-[0.1em] text-muted/70 sm:block">
                    layer 0{index + 1}
                  </span>
                </div>
                <p className="mono mt-1 text-[10px] uppercase tracking-[0.1em] text-accent/80">
                  {layer.meta}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{layer.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <p className="mono text-[9px] uppercase tracking-[0.14em] text-muted">
            Requirement → structure → automation
          </p>
        </div>
      </div>
    </Tilt>
  )
}

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-page">
        <SectionHeading
          index="01"
          label="About"
          title={
            <span id="about-title">
              {about.headline[0]}
              <br />
              {about.headline[1]}{' '}
              <span className="serif-accent text-gradient">{about.headline[2]}</span>
            </span>
          }
          description={about.intro}
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
                {about.philosophy}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
                {about.specialties}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
                {about.approach}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-0 border-t border-white/[0.07] sm:grid-cols-3">
              {about.principles.map((principle, index) => (
                <Reveal key={principle.title} delay={0.06 * index} className="h-full">
                  <div className="group h-full border-b border-white/[0.07] py-5 sm:border-b-0 sm:border-r sm:pr-5 sm:last:border-r-0">
                    <span className="mono text-[10px] tracking-[0.16em] text-accent">
                      0{index + 1}
                    </span>
                    <h3 className="mt-2 font-display text-[15px] font-medium text-paper">
                      {principle.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{principle.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {['Frappe Framework', 'ERPNext', 'Python', 'MariaDB', 'SQL', 'Jinja'].map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline mt-8 inline-flex text-sm text-paper/80 transition hover:text-gold"
              >
                More on GitHub
                <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-2">
            <LayerStack />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
