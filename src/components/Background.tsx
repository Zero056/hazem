/**
 * Ambient, fixed page atmosphere: fine grid, warm light pools and film grain.
 * Purely decorative and pointer-transparent.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1100px 620px at 78% -8%, rgba(255,138,50,0.10), transparent 62%), radial-gradient(900px 540px at 8% 12%, rgba(255,184,92,0.06), transparent 60%), radial-gradient(1200px 800px at 50% 108%, rgba(255,138,50,0.05), transparent 65%)',
        }}
      />

      <div
        className="absolute inset-0 grid-bg opacity-[0.55]"
        style={{
          maskImage: 'radial-gradient(ellipse 85% 70% at 50% 30%, black 20%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 30%, black 20%, transparent 78%)',
        }}
      />

      <div
        className="animate-drift absolute -right-40 top-[8%] h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,138,50,0.20), transparent 65%)' }}
      />
      <div
        className="animate-drift absolute -left-40 top-[46%] h-[460px] w-[460px] rounded-full blur-[130px] [animation-delay:-6s]"
        style={{ background: 'radial-gradient(circle, rgba(255,184,92,0.13), transparent 68%)' }}
      />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}
