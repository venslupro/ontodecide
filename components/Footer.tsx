'use client';

import { useTranslations } from 'next-intl';
import { COMMUNITY_URL, CONTACT_EMAIL } from '@/lib/site-config';

export function Footer(): JSX.Element {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-slate-900 text-slate-300">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(37,99,235,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(6,182,212,0.3), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="container-page relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 16l3-3 3 2 4-6 2 3" />
                  <path d="M5 20h14" />
                </svg>
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-tight text-white">
                  OntoDecide
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {t('tagline')}
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              {t('tagline')}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-brand-200"
            >
              <MailIcon />
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t('product')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-slate-300 transition hover:text-white"
                >
                  {t('productItems.features')}
                </a>
              </li>
              <li>
                <a
                  href="#scenarios"
                  className="text-slate-300 transition hover:text-white"
                >
                  {t('productItems.scenarios')}
                </a>
              </li>
              <li>
                <a
                  href="#editions"
                  className="text-slate-300 transition hover:text-white"
                >
                  {t('productItems.editions')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t('resources')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-300 transition hover:text-white"
                >
                  {t('resourcesItems.community')}
                  <ExternalIcon />
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-300 transition hover:text-white"
                >
                  {t('resourcesItems.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>{t('copyright', { year })}</p>
          <p className="text-slate-500">{CONTACT_EMAIL}</p>
        </div>
      </div>
    </footer>
  );
}

function MailIcon(): JSX.Element {
  return (
    <svg
      className="h-4 w-4"
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
  );
}

function ExternalIcon(): JSX.Element {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
