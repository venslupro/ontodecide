import Image from 'next/image';
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

type IndustryName = (typeof INDUSTRY_KEYS)[number];

/** Pexels (CC0) real photos matched to each industry. */
const INDUSTRY_IMAGES: Record<IndustryName, string> = {
  smartCity:
    'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=800',
  emergency:
    'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80&auto=format&fit=crop',
  finance:
    'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=800',
  manufacturing:
    'https://images.pexels.com/photos/1087083/pexels-photo-1087083.jpeg?auto=compress&cs=tinysrgb&w=800',
  energy:
    'https://images.pexels.com/photos/671585/pexels-photo-671585.jpeg?auto=compress&cs=tinysrgb&w=800',
  logistics:
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80&auto=format&fit=crop',
  defense:
    'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80&auto=format&fit=crop',
  healthcare:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop',
};

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
                <Image
                  src={INDUSTRY_IMAGES[key]}
                  alt={t(`items.${key}`)}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
                />
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
