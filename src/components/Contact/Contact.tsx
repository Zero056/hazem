import { ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { site } from '../../data/portfolio'
import Reveal from '../animations/Reveal'
import Magnetic from '../animations/Magnetic'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const CHANNELS = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: 'GitHub', value: `@${site.githubHandle}`, href: site.github, icon: Github },
  { label: 'LinkedIn', value: 'Connect professionally', href: site.linkedin, icon: Linkedin },
]

export default function Contact() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="contact" className="relative pb-0 pt-10 sm:pt-16" aria-labelledby="contact-title">
      <div className="container-page">
        <div className="panel noise relative overflow-hidden rounded-[28px] px-5 py-14 sm:rounded-[34px] sm:px-9 sm:py-20 lg:px-14 lg:py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-[0.22]" />
            <div
              className={`absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full blur-[110px] ${
                reduced ? '' : 'animate-drift'
              }`}
              style={{ background: 'radial-gradient(circle, rgba(255,138,50,0.22), transparent 65%)' }}
            />
            <div
              className={`absolute -bottom-48 right-0 h-[480px] w-[480px] rounded-full blur-[120px] ${
                reduced ? '' : 'animate-drift [animation-delay:-7s]'
              }`}
              style={{ background: 'radial-gradient(circle, rgba(255,184,92,0.14), transparent 66%)' }}
            />
            <div
              className={`absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] ${
                reduced ? '' : 'animate-spin-slow'
              }`}
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(255,138,50,0.5) 40deg, transparent 90deg, transparent 240deg, rgba(255,184,92,0.4) 280deg, transparent 330deg)',
                maskImage: 'radial-gradient(circle, transparent 58%, black 60%, black 63%, transparent 66%)',
                WebkitMaskImage:
                  'radial-gradient(circle, transparent 58%, black 60%, black 63%, transparent 66%)',
              }}
            />
          </div>

          <div className="relative">
            <Reveal y={14}>
              <div className="flex items-center gap-4">
                <span className="mono text-[11px] tracking-[0.2em] text-accent">07</span>
                <span className="h-px w-10 bg-gradient-to-r from-accent/70 to-transparent sm:w-14" />
                <span className="eyebrow">Contact</span>
              </div>
            </Reveal>

            <Reveal delay={0.06} y={34}>
              <h2 id="contact-title" className="display-1 mt-6 max-w-3xl text-paper">
                Have something{' '}
                <span className="serif-accent text-gradient">complex</span>
                <br className="hidden sm:block" /> to build?
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                Let&apos;s turn your next business challenge into a powerful software solution.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a href={`mailto:${site.email}`} className="btn btn-primary group">
                    Start a conversation
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-ghost"
                  >
                    <Github size={15} />
                    GitHub
                  </a>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="mono mr-1 text-[9px] uppercase tracking-[0.16em] text-muted/60">
                  Direct lines
                </span>
                {site.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.06]"
                  >
                    <Phone size={12} className="text-accent" />
                    <span className="mono text-[11px] text-paper/80 transition-colors group-hover:text-paper">
                      {phone.value}
                    </span>
                    <span className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted/60">
                      {phone.label}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 grid gap-0 border-t border-white/[0.07] sm:mt-14 sm:grid-cols-3">              {CHANNELS.map((channel, index) => {
                const Icon = channel.icon
                const external = channel.href.startsWith('http')
                return (
                  <Reveal key={channel.label} delay={0.05 * index} className="h-full">
                    <a
                      href={channel.href}
                      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="group flex h-full items-start gap-3 border-b border-white/[0.07] py-5 transition-colors sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-colors duration-300 group-hover:border-accent/30 group-hover:text-gold">
                        <Icon size={14} />
                      </span>
                      <span className="min-w-0">
                        <span className="mono block text-[9px] uppercase tracking-[0.16em] text-muted/70">
                          {channel.label}
                        </span>
                        <span className="mt-1 block truncate text-[13px] text-paper/80 transition-colors group-hover:text-paper">
                          {channel.value}
                        </span>
                      </span>
                    </a>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
