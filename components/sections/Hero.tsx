import { useTranslations } from 'next-intl';
import { COMMUNITY_URL } from '@/lib/site-config';
import { Reveal } from '@/components/Reveal';

export function Hero(): JSX.Element {
  const t = useTranslations('hero');

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern [background-size:48px_48px] opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-accent-400/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-12 py-20 lg:grid-cols-2 lg:py-28 lg:items-center">
        <div>
          <Reveal>
            <span className="badge">
              <SparkIcon />
              {t('badge')}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t('title')}{' '}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                {t('titleAccent')}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {t('subtitle')}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t('primaryCta')}
                <ArrowIcon />
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Stat label={t('stats.sources')} />
              <Stat label={t('stats.insight')} />
              <Stat label={t('stats.ontology')} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-500/20 to-accent-400/20 blur-2xl" aria-hidden="true" />
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-2xl shadow-brand-600/10 backdrop-blur">
              <CockpitVisual />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-xl border border-slate-100 bg-white p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-slate-700">Live Cockpit</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">Real-time situational view</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Inline violet + cyan data-fusion visualization. Always renders. */
function CockpitVisual(): JSX.Element {
  return (
    <svg
      viewBox="0 0 800 500"
      className="h-full w-full transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="OntoDecide cockpit visualization"
      role="img"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#faf5ff" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ecfeff" />
        </linearGradient>
        <radialGradient id="nodeA" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="nodeB" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="nodeC" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="55%" stopColor="#c4b5fd" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.15" />
        </radialGradient>
        <linearGradient id="edge1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="800" height="500" fill="url(#bgGrad)" />

      {/* Grid */}
      <g stroke="#c4b5fd" strokeOpacity="0.18" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 80} y1="0" x2={(i + 1) * 80} y2="500" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 70} x2="800" y2={(i + 1) * 70} />
        ))}
      </g>

      {/* Central convergence halo */}
      <circle cx="540" cy="260" r="160" fill="url(#core)" />
      <circle cx="540" cy="260" r="110" fill="none" stroke="#7c3aed" strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="540" cy="260" r="70" fill="none" stroke="#7c3aed" strokeOpacity="0.35" strokeWidth="1" />

      {/* Edges (data streams into core) */}
      <g fill="none" stroke="url(#edge1)" strokeWidth="2" strokeOpacity="0.85">
        <path d="M120 110 C 280 130, 420 220, 540 260" />
        <path d="M90 310 C 240 290, 410 275, 540 260" />
        <path d="M240 410 C 360 360, 470 300, 540 260" />
        <path d="M320 80 C 420 140, 490 200, 540 260" />
      </g>

      {/* Data stream particle dots */}
      <g>
        <circle cx="220" cy="120" r="3.5" fill="#7c3aed" />
        <circle cx="340" cy="190" r="3" fill="#8b5cf6" />
        <circle cx="460" cy="245" r="3" fill="#a78bfa" />
        <circle cx="190" cy="298" r="3.5" fill="#06b6d4" />
        <circle cx="340" cy="280" r="3" fill="#22d3ee" />
        <circle cx="455" cy="268" r="3" fill="#67e8f9" />
        <circle cx="300" cy="385" r="3.5" fill="#7c3aed" />
        <circle cx="420" cy="315" r="3" fill="#8b5cf6" />
        <circle cx="400" cy="115" r="3.5" fill="#06b6d4" />
        <circle cx="480" cy="200" r="3" fill="#22d3ee" />
      </g>

      {/* Source nodes */}
      <g>
        <circle cx="120" cy="110" r="22" fill="url(#nodeA)" />
        <circle cx="90" cy="310" r="20" fill="url(#nodeB)" />
        <circle cx="240" cy="410" r="22" fill="url(#nodeC)" />
        <circle cx="320" cy="80" r="18" fill="url(#nodeB)" />
        {/* inner dots */}
        <circle cx="120" cy="110" r="6" fill="#fff" />
        <circle cx="90" cy="310" r="5" fill="#fff" />
        <circle cx="240" cy="410" r="6" fill="#fff" />
        <circle cx="320" cy="80" r="4.5" fill="#fff" />
      </g>

      {/* Source node labels */}
      <g fontFamily="Inter,system-ui,sans-serif" fontSize="11" fill="#475569" fontWeight="600">
        <text x="150" y="108">DB · API</text>
        <text x="118" y="126" fontSize="10" fill="#64748b" fontWeight="500">Structured</text>

        <text x="20" y="308">IoT · Logs</text>
        <text x="20" y="326" fontSize="10" fill="#64748b" fontWeight="500">Timeseries</text>

        <text x="270" y="410">Docs · Text</text>
        <text x="270" y="428" fontSize="10" fill="#64748b" fontWeight="500">Unstructured</text>

        <text x="185" y="78">Web · Stream</text>
        <text x="348" y="78">Realtime</text>
      </g>

      {/* Core unified node */}
      <circle cx="540" cy="260" r="44" fill="url(#nodeA)" />
      <circle cx="540" cy="260" r="28" fill="#fff" fillOpacity="0.22" />
      <circle cx="540" cy="260" r="14" fill="#fff" />
      <text x="540" y="265" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="12" fontWeight="700" fill="#7c3aed">
        AI
      </text>

      {/* Core label */}
      <text x="540" y="330" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#1e1b4b">
        Unified Situational View
      </text>
      <text x="540" y="348" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="11" fontWeight="500" fill="#64748b">
        Ontology · Insight · Decision
      </text>

      {/* Top-right mini KPI cards */}
      <g>
        <rect x="650" y="40" width="120" height="46" rx="10" fill="#fff" stroke="#c4b5fd" strokeOpacity="0.6" />
        <circle cx="668" cy="63" r="6" fill="#8b5cf6" />
        <text x="684" y="59" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fill="#64748b" fontWeight="600">Data Sources</text>
        <text x="684" y="76" fontFamily="Inter,system-ui,sans-serif" fontSize="14" fill="#4c1d95" fontWeight="700">128 <tspan fontSize="9" fontWeight="500" fill="#64748b">unified</tspan></text>

        <rect x="650" y="95" width="120" height="46" rx="10" fill="#fff" stroke="#67e8f9" strokeOpacity="0.7" />
        <circle cx="668" cy="118" r="6" fill="#06b6d4" />
        <text x="684" y="114" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fill="#64748b" fontWeight="600">Insight Latency</text>
        <text x="684" y="131" fontFamily="Inter,system-ui,sans-serif" fontSize="14" fill="#0e7490" fontWeight="700">1.3s <tspan fontSize="9" fontWeight="500" fill="#64748b">real-time</tspan></text>
      </g>

      {/* Bottom mini bar chart */}
      <g transform="translate(40 450)">
        <text x="0" y="-4" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fill="#64748b" fontWeight="600">Insight impact</text>
        {[28, 42, 34, 56, 46, 64, 58, 74, 68, 82].map((h, i) => (
          <rect
            key={i}
            x={i * 14 + 110}
            y={-h}
            width="9"
            height={h}
            rx="3"
            fill={i % 2 === 0 ? '#7c3aed' : '#06b6d4'}
            fillOpacity="0.85"
          />
        ))}
      </g>
    </svg>
  );
}

function Stat({ label }: { readonly label: string }): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l4 4L19 6" />
        </svg>
      </span>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}

function SparkIcon(): JSX.Element {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
    </svg>
  );
}

function ArrowIcon(): JSX.Element {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
