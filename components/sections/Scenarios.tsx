import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';

const SCENARIO_KEYS = [
  'urban',
  'supply',
  'industrial',
  'finance',
  'energy',
  'intel',
] as const;

export function Scenarios(): JSX.Element {
  const t = useTranslations('scenarios');

  return (
    <section id="scenarios" className="bg-slate-50 py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SCENARIO_KEYS.map((key, idx) => (
            <Reveal key={key} delay={idx * 70}>
              <article className="group h-full rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <ScenarioIcon name={key} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type ScenarioName = (typeof SCENARIO_KEYS)[number];

function ScenarioIcon({
  name,
}: {
  readonly name: ScenarioName;
}): JSX.Element {
  const common = {
    className: 'h-5 w-5',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };

  switch (name) {
    case 'urban':
      return (
        <svg {...common}>
          <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M9 11h.01M15 11h.01" />
        </svg>
      );
    case 'supply':
      return (
        <svg {...common}>
          <path d="M3 7h13l4 4-4 4H3z" />
          <path d="M3 7v8M7 11h.01" />
        </svg>
      );
    case 'industrial':
      return (
        <svg {...common}>
          <path d="M3 21h18M5 21V10l5 3V10l5 3V7l5 3v11M9 21v-4h6v4" />
        </svg>
      );
    case 'finance':
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 14l3-3 3 2 5-6" />
        </svg>
      );
    case 'energy':
      return (
        <svg {...common}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case 'intel':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
        </svg>
      );
  }
}
