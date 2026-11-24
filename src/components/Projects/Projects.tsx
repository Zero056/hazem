import { ArrowUpRight, ExternalLink, Info } from 'lucide-react'
import { products, type Product } from '../../data/portfolio'
import SectionHeading from '../animations/SectionHeading'
import Reveal from '../animations/Reveal'
import ProjectVisual from './ProjectVisual'

const DOT: Record<Product['statusTone'], string> = {
  active: 'bg-accent',
  concept: 'bg-gold/80',
  research: 'bg-muted/70',
}

function Status({ product }: { product: Product }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[product.statusTone]}`} />
      <span className="mono text-[9px] uppercase tracking-[0.1em] text-paper/65">{product.status}</span>
    </span>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="chip text-paper/60">
          {item}
        </span>
      ))}
    </div>
  )
}

function Featured({ product }: { product: Product }) {
  return (
    <article className="panel noise group relative overflow-hidden rounded-[26px] transition-colors duration-500 hover:border-accent/25">
      <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative order-1 min-h-[260px] border-b border-white/[0.07] sm:min-h-[320px] lg:order-1 lg:min-h-[430px] lg:border-b-0 lg:border-r">
          <ProjectVisual variant={product.visual} image={product.image} title={product.title} />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 backdrop-blur-md">
            <span className="mono text-[9px] uppercase tracking-[0.16em] text-gold">Featured</span>
            <span className="h-1 w-1 rounded-full bg-gold/60" />
            <span className="mono text-[9px] uppercase tracking-[0.16em] text-muted">
              {product.index} / {String(products.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="order-2 flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {product.kind}
            </span>
            <Status product={product} />
          </div>

          <h3 className="display-3 mt-6 text-[2rem] text-paper sm:text-[2.4rem]">
            {product.title}
          </h3>

          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted/70">Stack</p>
            <div className="mt-2">
              <Stack items={product.stack} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/[0.07] pt-5 lg:mt-auto">
            {product.repo ? (
              <a
                href={product.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex items-center gap-2 text-sm text-paper transition-colors hover:text-gold"
              >
                <ExternalLink size={15} className="text-accent" />
                <span className="link-underline">View repository</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            ) : (
              <span className="mono text-[10px] uppercase tracking-[0.12em] text-muted/60">
                Repository not public
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ product }: { product: Product }) {
  return (
    <article className="panel panel-hover group flex h-full flex-col overflow-hidden rounded-[22px]">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.06]">
        <ProjectVisual variant={product.visual} image={product.image} title={product.title} />
        <div className="absolute right-3 top-3">
          <Status product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
            {product.kind}
          </span>
          <span className="mono text-[10px] tracking-[0.16em] text-muted/35">{product.index}</span>
        </div>

        <h3 className="mt-3 font-display text-xl font-medium leading-tight tracking-tight text-paper transition-colors duration-300 group-hover:text-gold">
          {product.title}
        </h3>

        <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">{product.description}</p>

        <div className="mt-auto pt-5">
          <Stack items={product.stack} />
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const featured = products.find((product) => product.featured) ?? products[0]
  const rest = products.filter((product) => product.id !== featured.id)

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-page">
        <SectionHeading
          index="05"
          label="Product Development"
          title={
            <span id="projects-title">
              Applications & <span className="serif-accent text-gradient">product ideas.</span>
            </span>
          }
          description="Standalone Frappe applications and early-stage product concepts — kept separate from the enterprise systems above."
        />

        <Reveal delay={0.1}>
          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
            <Info size={14} className="mt-0.5 shrink-0 text-muted" />
            <p className="text-[11.5px] leading-relaxed text-muted">
              Concept projects are exploratory. They are shown with their real status and are not
              presented as shipped products.
            </p>
          </div>
        </Reveal>

        <div className="mt-8">
          <Reveal>
            <Featured product={featured} />
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {rest.map((product, index) => (
            <Reveal key={product.id} delay={0.06 * index} className="h-full">
              <ProjectCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
