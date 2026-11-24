import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { site } from '../../data/portfolio'
import { scrollToSection } from '../../hooks/useLenis'

export default function Footer() {
  return (
    <footer className="relative pb-8 pt-16 sm:pt-20">
      <div className="container-page">
        <div className="hairline" />

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-medium tracking-tight text-paper">
              Hazem
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                / Frappe · ERPNext
              </span>
            </p>
            <p className="mt-2 max-w-sm text-[12.5px] leading-relaxed text-muted">
              Enterprise systems, financial workflows and business automation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition hover:border-accent/30 hover:text-paper"
              aria-label="Email Hazem"
            >
              <Mail size={15} />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition hover:border-accent/30 hover:text-paper"
              aria-label="GitHub profile"
            >
              <Github size={15} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition hover:border-accent/30 hover:text-paper"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={15} />
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-[11px] text-muted transition hover:border-accent/30 hover:text-paper"
            >
              Back to top
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[10px] uppercase tracking-[0.12em] text-muted/60">
            © {new Date().getFullYear()} Hazem — All rights reserved
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.12em] text-muted/50">
            Built with React · TypeScript · Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
