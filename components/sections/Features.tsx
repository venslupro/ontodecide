import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';

const FEATURE_KEYS = ['fusion', 'cockpit', 'simulation', 'ontology'] as const;

export function Features(): JSX.Element {
  const t = useTranslations('features');

  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_KEYS.map((key, idx) => (
            <Reveal key={key} delay={idx * 90}>
              <article className="card group h-full">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-md shadow-brand-600/20 transition-transform group-hover:scale-105">
                  <FeatureIcon name={key} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t(`items.${key}.desc`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureName = (typeof FEATURE_KEYS)[number];

function FeatureIcon({ name }: { readonly name: FeatureName }): JSX.Element {
  const common = {
    className: 'h-6 w-6',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };

  switch (name) {
    case 'fusion':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M8.5 6h7M6 8.5v7M18 8.5v7M8.5 18h7M8 8l2.5 2.5M16 8l-2.5 2.5M8 16l2.5-2.5M16 16l-2.5-2.5" />
        </svg>
      );
    case 'cockpit':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M3 17h18M9 20h6M12 17v3" />
          <path d="M7 11l2.5 2.5L11 9M14 11h3" />
        </svg>
      );
    case 'simulation':
      return (
        <svg {...common}>
          <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 8v4l2 1" />
        </svg>
      );
    case 'ontology':
      return (
        <svg {...common}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="13" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M7 6h10M6.5 7.5l4 4M17.5 7.5l-4 4M7 19h10M6.5 17.5l4-4M17.5 17.5l-4-4" />
        </svg>
      );
  }
}
