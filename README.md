
<<<<<<< HEAD
A cinematic, animation-driven portfolio for **Hazem**, a Frappe & ERPNext developer and Python backend engineer.

The site presents real enterprise work — ERPNext business systems, financial workflows, customisations and reporting — alongside standalone Frappe applications and clearly-labelled product concepts.

## Stack

- **React 18** + **TypeScript**
- **Vite 6** (code-split production build)
- **Tailwind CSS 3** with a custom design-token layer
- **Framer Motion** for component and scroll-reveal motion
- **GSAP + ScrollTrigger** for the scroll-driven process timeline (loaded on demand)
- **Lenis** for smooth scrolling
- **Lucide** icons

## Getting started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    About/         Editorial introduction + layered "how I work" diagram
    Enterprise/    Enterprise systems explorer with animated workflow chains
    Frappe/        Frappe framework capability map
    Hero/          Canvas particle field + animated ERP system map
    Loader/        Intro sequence with skip control
    Navbar/        Floating nav, active-section tracking, mobile overlay
    Process/       GSAP scroll-driven timeline
    Projects/      Product development showcase + generative visuals
    Skills/        Capability bento grid with 3D tilt
    Contact/       Closing section and contact channels
    Cursor/        Desktop-only contextual cursor
    animations/    Reveal, Magnetic, Tilt, SectionHeading primitives
  data/
    portfolio.ts   All personal details, systems, projects and copy
  hooks/
    useLenis.ts
    usePrefersReducedMotion.ts
  styles/
    index.css      Design tokens, surfaces, typography, motion utilities
```

## Editing content

Everything personal lives in `src/data/portfolio.ts`:

- `site` — name, titles, brand statement, email, social links, navigation
- `about` — introduction, philosophy and principles
- `skillGroups` — capability groups and technology descriptions
- `enterpriseSystems` — ERPNext systems, workflows, capabilities and business rules
- `frappePillars` — framework engineering capabilities
- `products` — standalone applications and product concepts with real statuses
- `processSteps` — the engineering approach

### Before publishing

1. Confirm the canonical URL and Open Graph URLs in `index.html` (`https://zero056.github.io/hazem/`).
2. If the repository name changes, update `base` in `vite.config.ts` and the paths in `public/404.html`.
3. `public/og.png` is the social preview image (1200×630). Edit `public/og.svg` and re-export if the artwork changes.

Contact details (email and both phone numbers) and the LinkedIn/GitHub links are defined once in the `site` object of `src/data/portfolio.ts` and are reused by the navigation, contact section and footer.

## Accuracy policy

The portfolio distinguishes between:

1. Implemented ERPNext business systems
2. Custom ERPNext modules and enhancements
3. Standalone Frappe applications
4. Product concepts and research

No customer names, company names, user counts, financial results or completion dates are claimed. Product concepts are labelled with their real status.

## Accessibility & performance

- Semantic landmarks, skip link and visible focus states
- Full keyboard support for the enterprise systems tabs and mobile navigation
- `prefers-reduced-motion` respected across CSS, Framer Motion, Lenis, GSAP and canvas
- Custom cursor and pointer-driven tilt disabled on touch devices
- Canvas particle count reduced on coarse pointers and paused off-screen
- No raster images; all project visuals are lightweight, original SVG compositions

### Adding a new project

Everything is generated from the `products` array, so no component changes are needed.

1. Open `src/data/portfolio.ts`.
2. Copy the template inside the comment block above `products`.
3. Paste it at the end of the array and edit `id`, `index`, `title`, `kind`, `description`, `stack`, `status`, `statusTone` and `repo`.
4. Keep exactly one project with `featured: true` — it renders as the large card. Every other project appears in the grid automatically.

Available `visual` styles: `modular`, `ticket`, `fleet`, `ocr`, `copilot`.

To use a real screenshot instead of a generated visual:

1. Add the image to `public/projects/` (for example `public/projects/ticketing.png`).
2. Add `image: 'projects/ticketing.png'` to that project.

Enterprise systems follow the same pattern: copy an object inside `enterpriseSystems`, update its `workflow` array, and the tabbed section and animated workflow chain rebuild themselves.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist` to GitHub Pages.

See **[DEPLOY.md](./DEPLOY.md)** for the complete first-time setup, the shareable link, custom domains and troubleshooting.

## License

MIT — see [LICENSE](./LICENSE).
=======
>>>>>>> c9870a5afc508ab9510aaff7745f442d24189970
