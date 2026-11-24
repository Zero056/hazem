import { useEffect, useRef } from 'react'
import { processSteps } from '../../data/portfolio'
import SectionHeading from '../animations/SectionHeading'
import Reveal from '../animations/Reveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const listRef = useRef<HTMLOListElement | null>(null)
  const progressRef = useRef<HTMLSpanElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    let cleanup: (() => void) | undefined

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      const context = gsap.context(() => {
        if (progressRef.current && listRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: listRef.current,
                start: 'top 72%',
                end: 'bottom 78%',
                scrub: 0.5,
              },
            },
          )
        }

        gsap.utils.toArray<HTMLElement>('[data-process-step]').forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0.3, x: 22 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 84%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        })
      }, sectionRef)

      const refresh = () => ScrollTrigger.refresh()
      document.fonts?.ready.then(refresh).catch(() => undefined)

      cleanup = () => context.revert()
    }

    run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [reduced])

  return (
    <section id="approach" ref={sectionRef} className="section" aria-labelledby="approach-title">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="06"
              label="Approach"
              title={
                <span id="approach-title">
                  From business complexity to{' '}
                  <span className="serif-accent text-gradient">software clarity.</span>
                </span>
              }
              description="A repeatable path from an operational problem to a system a team can run with confidence."
            />

            <Reveal delay={0.12}>
              <div className="mt-9 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="mono text-[9px] uppercase tracking-[0.18em] text-accent">Principle</p>
                <p className="mt-3 font-display text-[15px] leading-relaxed text-paper/80">
                  “A good system makes the business rule obvious — and makes breaking it difficult.”
                </p>
              </div>
            </Reveal>
          </div>

          <ol ref={listRef} className="relative">
            <span
              aria-hidden
              className="absolute bottom-8 left-[27px] top-3 w-px bg-white/[0.08]"
            />
            <span
              ref={progressRef}
              aria-hidden
              className={`absolute bottom-8 left-[27px] top-3 w-px origin-top bg-gradient-to-b from-accent via-gold to-accent/30 ${
                reduced ? 'scale-y-100' : 'scale-y-0'
              }`}
            />

            {processSteps.map((step) => (
              <li
                key={step.step}
                data-process-step
                className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7"
              >
                <div className="relative z-10 mt-1 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/10 bg-ink">
                  <span className="mono text-[11px] tracking-[0.08em] text-gold">{step.step}</span>
                  <span className="absolute inset-0 rounded-full border border-accent/0 transition duration-500 hover:border-accent/30" />
                </div>

                <div className="pt-2">
                  <h3 className="display-3 text-[1.4rem] text-paper sm:text-[1.6rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-muted">
                    {step.text}
                  </p>
                  <p className="mono mt-3 text-[9px] uppercase tracking-[0.14em] text-muted/55">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
