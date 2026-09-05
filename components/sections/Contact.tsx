import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';
import { CONTACT_EMAIL, buildMailto } from '@/lib/site-config';

export function Contact(): JSX.Element {
  const t = useTranslations('contact');

  const salesBody = [
    'Hello OntoDecide team,',
    '',
    'I am interested in the Commercial Edition.',
    '',
    `- ${t('applyFields.name')}: `,
    `- ${t('applyFields.domain')}: `,
    `- ${t('applyFields.useCase')}: `,
    '',
    'Please share more details about commercial licensing and services.',
    '',
    'Thank you.',
  ].join('\n');

  const salesMailto = buildMailto(
    'OntoDecide Commercial Edition Inquiry',
    salesBody
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 10%, rgba(37,99,235,0.12), transparent 40%), radial-gradient(circle at 85% 90%, rgba(6,182,212,0.12), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">{t('eyebrow')}</p>
            <h2 className="section-title">{t('title')}</h2>
            <p className="section-subtitle">{t('subtitle')}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                  {t('welcome')}
                </span>
                <span className="block text-base font-semibold text-slate-900">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>

            <a href={salesMailto} className="btn-primary">
              {t('salesCta')}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
