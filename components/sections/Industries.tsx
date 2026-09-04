import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';

const INDUSTRY_KEYS = [
  'smartCity',
  'emergency',
  'finance',
  'manufacturing',
  'energy',
  'logistics',
  'defense',
  'healthcare',
] as const;

export function Industries(): JSX.Element {
  const t = useTranslations('industries');

  return (
    <section id="industries" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRY_KEYS.map((key, idx) => (
            <Reveal key={key} delay={idx * 50}>
              <article className="group relative h-56 overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/10">
                {/* SVG illustration tile */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-brand-50/40">
                  <IndustryIllustration name={key} />
                </div>
                {/* Overlay gradient + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-base font-semibold leading-tight text-white drop-shadow-sm">
                    {t(`items.${key}`)}
                  </h3>
                </div>
                {/* Hover accent ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition group-hover:ring-brand-400/40" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type IndustryName = (typeof INDUSTRY_KEYS)[number];

/** Procedural SVG illustration per industry. Each uses violet + cyan palette. */
function IndustryIllustration({ name }: { readonly name: IndustryName }): JSX.Element {
  const base = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 400 240',
    className: 'h-full w-full',
    preserveAspectRatio: 'xMidYMid slice' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'smartCity':
      return (
        <svg {...base}>
          <defs>
            <linearGradient id="sc-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ede9fe" />
              <stop offset="100%" stopColor="#ecfeff" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sc-sky)" />
          {/* Sun */}
          <circle cx="320" cy="55" r="26" fill="#c4b5fd" fillOpacity="0.7" />
          <circle cx="320" cy="55" r="14" fill="#a78bfa" />
          {/* Skyline silhouettes */}
          <g fill="#7c3aed" fillOpacity="0.85">
            <rect x="30" y="130" width="45" height="90" />
            <rect x="82" y="100" width="35" height="120" />
            <rect x="123" y="70" width="50" height="150" />
            <rect x="179" y="115" width="38" height="105" />
            <rect x="223" y="85" width="42" height="135" />
            <rect x="271" y="120" width="32" height="100" />
            <rect x="309" y="100" width="55" height="120" />
          </g>
          {/* Windows */}
          <g fill="#22d3ee">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={130 + (i % 3) * 14} y={82 + Math.floor(i / 3) * 26} width="8" height="14" fillOpacity="0.9" />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={230 + (i % 2) * 16} y={97 + Math.floor(i / 2) * 28} width="8" height="14" fillOpacity="0.85" />
            ))}
          </g>
          {/* Connect lines (IOT) */}
          <g stroke="#06b6d4" strokeOpacity="0.55" strokeWidth="1.5" fill="none">
            <path d="M90 100 C 150 50, 220 50, 290 95" strokeDasharray="3 4" />
          </g>
          <g fill="#06b6d4">
            <circle cx="90" cy="100" r="3" />
            <circle cx="290" cy="95" r="3" />
          </g>
        </svg>
      );
    case 'emergency':
      return (
        <svg {...base}>
          <defs>
            <radialGradient id="em-g" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#ede9fe" />
              <stop offset="100%" stopColor="#fff1f2" />
            </radialGradient>
          </defs>
          <rect width="400" height="240" fill="url(#em-g)" />
          {/* Flashing beacon */}
          <g>
            <circle cx="200" cy="110" r="44" fill="#ef4444" fillOpacity="0.1" />
            <circle cx="200" cy="110" r="28" fill="#ef4444" fillOpacity="0.18" />
            <circle cx="200" cy="110" r="14" fill="#ef4444" fillOpacity="0.35" />
            <circle cx="200" cy="110" r="6" fill="#ef4444" />
          </g>
          {/* Radar beams */}
          <g stroke="#7c3aed" strokeOpacity="0.35" fill="none" strokeWidth="1.5">
            <path d="M200 110 L 290 70" />
            <path d="M200 110 L 310 140" />
            <path d="M200 110 L 90 160" />
            <path d="M200 110 L 110 70" />
            <circle cx="200" cy="110" r="70" strokeDasharray="3 3" />
            <circle cx="200" cy="110" r="110" strokeDasharray="3 5" />
          </g>
          {/* Alert dots */}
          <g fill="#06b6d4">
            <circle cx="290" cy="70" r="5" />
            <circle cx="310" cy="140" r="4" />
            <circle cx="90" cy="160" r="5" />
            <circle cx="110" cy="70" r="4" />
          </g>
          {/* Bottom bar */}
          <rect x="30" y="200" width="340" height="18" rx="4" fill="#c4b5fd" fillOpacity="0.6" />
          <rect x="30" y="200" width="180" height="18" rx="4" fill="#7c3aed" />
        </svg>
      );
    case 'finance':
      return (
        <svg {...base}>
          <rect width="400" height="240" fill="#fdf4ff" />
          {/* Bar chart */}
          <g>
            {[60, 80, 55, 110, 75, 130, 95, 155, 110, 170].map((h, i) => (
              <rect
                key={i}
                x={30 + i * 34}
                y={200 - h}
                width="22"
                height={h}
                rx="4"
                fill={i % 2 === 0 ? '#a78bfa' : '#22d3ee'}
                fillOpacity={0.9}
              />
            ))}
          </g>
          {/* Trending line */}
          <polyline
            points="50,160 85,140 118,148 152,105 186,130 220,86 254,105 288,65 322,85 356,45"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrow */}
          <path d="M50 50 L360 180" stroke="#06b6d4" strokeOpacity="0.3" strokeDasharray="4 5" fill="none" />
          {/* Coin */}
          <circle cx="340" cy="55" r="20" fill="#8b5cf6" />
          <circle cx="340" cy="55" r="14" fill="#fff" fillOpacity="0.35" />
          <text x="340" y="61" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="Inter,system-ui,sans-serif">¥</text>
          {/* Baseline */}
          <line x1="20" y1="202" x2="380" y2="202" stroke="#e2e8f0" strokeWidth="2" />
        </svg>
      );
    case 'manufacturing':
      return (
        <svg {...base}>
          <rect width="400" height="240" fill="#faf5ff" />
          {/* Factory skyline */}
          <g fill="#4c1d95" fillOpacity="0.9">
            <rect x="30" y="120" width="90" height="100" />
            <rect x="125" y="90" width="70" height="130" />
            <rect x="200" y="130" width="90" height="90" />
            <rect x="295" y="100" width="75" height="120" />
          </g>
          {/* Roofs */}
          <polygon points="20,120 75,80 130,120" fill="#7c3aed" fillOpacity="0.6" />
          <polygon points="115,90 160,55 205,90" fill="#7c3aed" fillOpacity="0.6" />
          {/* Chimneys */}
          <rect x="155" y="30" width="14" height="60" fill="#6d28d9" />
          <rect x="325" y="45" width="14" height="55" fill="#6d28d9" />
          {/* Smoke clouds */}
          <g fill="#06b6d4" fillOpacity="0.5">
            <circle cx="162" cy="22" r="10" />
            <circle cx="174" cy="14" r="8" />
            <circle cx="150" cy="16" r="7" />
          </g>
          {/* Gear */}
          <g transform="translate(300 60)">
            <circle r="20" fill="none" stroke="#06b6d4" strokeWidth="4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <rect
                key={a}
                x="-3"
                y="-26"
                width="6"
                height="8"
                fill="#06b6d4"
                transform={`rotate(${a})`}
              />
            ))}
            <circle r="7" fill="#06b6d4" />
          </g>
          {/* Conveyor */}
          <rect x="20" y="220" width="360" height="10" rx="4" fill="#c4b5fd" fillOpacity="0.7" />
          <g fill="#7c3aed">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={35 + i * 60} y="212" width="18" height="6" rx="2" />
            ))}
          </g>
        </svg>
      );
    case 'energy':
      return (
        <svg {...base}>
          <defs>
            <linearGradient id="e-sky" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ede9fe" />
              <stop offset="100%" stopColor="#cffafe" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#e-sky)" />
          {/* Lightning bolt center */}
          <path
            d="M200 40 L150 130 L190 130 L170 200 L260 90 L215 90 L240 40 Z"
            fill="#7c3aed"
            fillOpacity="0.85"
          />
          <path
            d="M200 40 L150 130 L190 130 L170 200 L260 90 L215 90 L240 40 Z"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeOpacity="0.6"
          />
          {/* Transmission tower */}
          <g stroke="#4c1d95" strokeWidth="2" fill="none">
            <line x1="50" y1="170" x2="50" y2="220" />
            <line x1="20" y1="180" x2="80" y2="180" />
            <line x1="25" y1="175" x2="30" y2="185" />
            <line x1="70" y1="175" x2="75" y2="185" />
            <line x1="340" y1="170" x2="340" y2="220" />
            <line x1="310" y1="180" x2="370" y2="180" />
            <line x1="315" y1="175" x2="320" y2="185" />
            <line x1="360" y1="175" x2="365" y2="185" />
            {/* Wire */}
            <path d="M50 180 Q 195 200, 340 180" strokeWidth="1.5" stroke="#8b5cf6" />
            <path d="M50 175 Q 195 195, 340 175" strokeWidth="1.5" stroke="#06b6d4" strokeOpacity="0.6" />
          </g>
          {/* Sun / solar */}
          <circle cx="70" cy="55" r="18" fill="#fde68a" />
          <circle cx="70" cy="55" r="10" fill="#fbbf24" />
          {/* Wind */}
          <g transform="translate(330 70)">
            <circle r="5" fill="#7c3aed" />
            {[0, 120, 240].map((a) => (
              <ellipse
                key={a}
                cx="0"
                cy="-22"
                rx="6"
                ry="22"
                fill="#7c3aed"
                fillOpacity="0.75"
                transform={`rotate(${a})`}
              />
            ))}
          </g>
        </svg>
      );
    case 'logistics':
      return (
        <svg {...base}>
          <rect width="400" height="240" fill="#faf5ff" />
          {/* Road */}
          <rect x="0" y="155" width="400" height="70" fill="#e2e8f0" />
          <g stroke="#fff" strokeWidth="3" strokeDasharray="16 12">
            <line x1="0" y1="190" x2="400" y2="190" />
          </g>
          {/* Truck body */}
          <g transform="translate(70 110)">
            <rect width="160" height="60" rx="6" fill="#7c3aed" />
            <rect x="150" width="55" height="80" rx="6" fill="#7c3aed" />
            <rect x="160" y="15" width="38" height="32" rx="3" fill="#06b6d4" fillOpacity="0.85" />
            <rect x="-8" y="52" width="240" height="10" fill="#6d28d9" />
          </g>
          {/* Wheels */}
          <g fill="#1e293b">
            <circle cx="120" cy="175" r="15" />
            <circle cx="250" cy="175" r="15" />
          </g>
          <g fill="#cbd5e1">
            <circle cx="120" cy="175" r="6" />
            <circle cx="250" cy="175" r="6" />
          </g>
          {/* Packages on road */}
          <g transform="translate(20 60)">
            <rect width="40" height="40" rx="4" fill="#a78bfa" fillOpacity="0.85" />
            <path d="M0 0 L40 0 L20 15 Z" fill="#8b5cf6" fillOpacity="0.6" />
            <path d="M20 0 L20 40" stroke="#6d28d9" strokeWidth="1.5" />
          </g>
          {/* Location pin */}
          <g transform="translate(350 60)">
            <path d="M0 0 C -15 -20, 0 -32, 0 -32 C 0 -32, 15 -20, 0 0 Z" fill="#ef4444" />
            <circle cx="0" cy="-18" r="5" fill="#fff" />
          </g>
          {/* Airplane */}
          <path
            d="M40 45 L 100 30 L 180 50 L 100 65 Z"
            fill="#22d3ee"
            fillOpacity="0.85"
          />
          <path d="M90 30 L 100 15 L 110 30 Z" fill="#06b6d4" fillOpacity="0.7" />
        </svg>
      );
    case 'defense':
      return (
        <svg {...base}>
          <defs>
            <radialGradient id="d-bg" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#ede9fe" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </radialGradient>
          </defs>
          <rect width="400" height="240" fill="url(#d-bg)" />
          {/* Shield */}
          <path
            d="M200 30 L 320 60 V 120 C 320 170, 270 200, 200 215 C 130 200, 80 170, 80 120 V 60 Z"
            fill="#7c3aed"
            fillOpacity="0.9"
          />
          <path
            d="M200 30 L 320 60 V 120 C 320 170, 270 200, 200 215 C 130 200, 80 170, 80 120 V 60 Z"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
          />
          {/* Star */}
          <polygon
            points="200,90 210,118 240,118 216,136 225,164 200,149 175,164 184,136 160,118 190,118"
            fill="#fff"
            fillOpacity="0.95"
          />
          {/* Radar ring */}
          <g stroke="#06b6d4" strokeOpacity="0.45" fill="none" strokeWidth="1.5">
            <circle cx="70" cy="70" r="40" />
            <circle cx="70" cy="70" r="22" />
            <path d="M70 70 L 100 55" />
            <path d="M70 70 L 50 95" />
          </g>
          <circle cx="96" cy="53" r="4" fill="#06b6d4" />
          {/* Network nodes */}
          <g>
            <circle cx="340" cy="55" r="8" fill="#a78bfa" />
            <circle cx="360" cy="100" r="6" fill="#22d3ee" />
            <circle cx="325" cy="115" r="7" fill="#a78bfa" />
          </g>
          <g stroke="#7c3aed" strokeOpacity="0.45" strokeWidth="1.2" fill="none">
            <line x1="340" y1="55" x2="360" y2="100" />
            <line x1="340" y1="55" x2="325" y2="115" />
            <line x1="360" y1="100" x2="325" y2="115" />
          </g>
          <circle cx="340" cy="55" r="3" fill="#fff" />
        </svg>
      );
    case 'healthcare':
      return (
        <svg {...base}>
          <rect width="400" height="240" fill="#faf5ff" />
          {/* Heart monitor backdrop pulses */}
          <g stroke="#7c3aed" strokeOpacity="0.3" fill="none" strokeWidth="1.5">
            <path d="M0 70 Q 100 50, 200 70 T 400 70" />
            <path d="M0 95 Q 100 75, 200 95 T 400 95" />
          </g>
          {/* EKG waveform */}
          <polyline
            points="20,170 80,170 95,130 110,200 125,100 140,170 200,170 220,140 240,210 260,105 280,170 380,170"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cross / plus */}
          <g transform="translate(60 60)">
            <rect x="-8" y="-28" width="16" height="56" rx="4" fill="#06b6d4" />
            <rect x="-28" y="-8" width="56" height="16" rx="4" fill="#06b6d4" />
            <rect x="-5" y="-25" width="10" height="50" rx="3" fill="#22d3ee" />
            <rect x="-25" y="-5" width="50" height="10" rx="3" fill="#22d3ee" />
          </g>
          {/* Pill */}
          <g transform="translate(320 70) rotate(30)">
            <rect x="-26" y="-14" width="52" height="28" rx="14" fill="#8b5cf6" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#fff" strokeWidth="2" strokeOpacity="0.7" />
            <rect x="-26" y="-14" width="26" height="28" rx="14" fill="#22d3ee" fillOpacity="0.7" />
          </g>
          {/* Baseline */}
          <line x1="0" y1="195" x2="400" y2="195" stroke="#e9d5ff" strokeWidth="2" />
        </svg>
      );
  }
}
