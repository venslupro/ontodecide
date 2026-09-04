import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';
import {
  COMMUNITY_URL,
  CONTACT_EMAIL,
  buildMailto,
} from '@/lib/site-config';

export function Contact(): JSX.Element {
  const t = useTranslations('contact');

  const applyBody = [
    'Hello OntoDecide team,',
    '',
    'I would like to apply for a Community Edition account.',
    '',
    `- ${t('applyFields.email')}: `,
    `- ${t('applyFields.name')}: `,
    `- ${t('applyFields.domain')}: `,
    `- ${t('applyFields.useCase')}: `,
    '',
    'Thank you.',
  ].join('\n');

  const applyMailto = buildMailto(
    'OntoDecide Community Edition Account Application',
    applyBody
  );

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
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <ContactCard
              title={t('applyTitle')}
              desc={t('applyDesc')}
              cta={t('applyCta')}
              href={applyMailto}
              tone="primary"
              icon="apply"
            />
          </Reveal>
          <Reveal delay={100}>
            <ContactCard
              title={t('salesTitle')}
              desc={t('salesDesc')}
              cta={t('salesCta')}
              href={salesMailto}
              tone="secondary"
              icon="sales"
            />
          </Reveal>
          <Reveal delay={200}>
            <ContactCard
              title={t('communityLinkTitle')}
              desc={t('communityLinkDesc')}
              cta={t('communityLinkCta')}
              href={COMMUNITY_URL}
              external
              tone="outline"
              icon="link"
            />
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t('emailLabel')}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-lg font-semibold text-slate-900 transition hover:text-brand-600"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-outline"
            >
              {t('salesCta')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface ContactCardProps {
  readonly title: string;
  readonly desc: string;
  readonly cta: string;
  readonly href: string;
  readonly external?: boolean;
  readonly tone: 'primary' | 'secondary' | 'outline';
  readonly icon: 'apply' | 'sales' | 'link';
}

function ContactCard({
  title,
  desc,
  cta,
  href,
  external,
  tone,
  icon,
}: ContactCardProps): JSX.Element {
  const toneClass = {
    primary:
      'border-brand-200 bg-gradient-to-br from-brand-50 to-white text-slate-900',
    secondary:
      'border-slate-200 bg-white text-slate-900',
    outline:
      'border-slate-200 bg-white text-slate-900',
  }[tone];

  const ctaClass = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800',
    outline:
      'border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700',
  }[tone];

  return (
    <article className={`flex h-full flex-col rounded-2xl border p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${toneClass}`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
        <ContactIcon name={icon} />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{desc}</p>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${ctaClass}`}
      >
        {cta}
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </article>
  );
}

function ContactIcon({
  name,
}: {
  readonly name: 'apply' | 'sales' | 'link';
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
    case 'apply':
      return (
        <svg {...common}>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case 'sales':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 11l-3 3-2-2" />
        </svg>
      );
    case 'link':
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
          <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
        </svg>
      );
  }
}
