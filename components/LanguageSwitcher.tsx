'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LOCALES, type Locale } from '@/i18n/request';
import { stripLocalePrefix } from '@/i18n/utils';
import { Link } from '@/i18n/navigation';

const LABEL_KEYS: Record<Locale, 'langZh' | 'langEn'> = {
  zh: 'langZh',
  en: 'langEn',
};

interface LanguageSwitcherProps {
  readonly variant?: 'navbar' | 'footer';
}

export function LanguageSwitcher({
  variant = 'navbar',
}: LanguageSwitcherProps): JSX.Element {
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const basePath = stripLocalePrefix(pathname || '/');

  const toggle = (): void => setOpen((prev) => !prev);
  const close = (): void => setOpen(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label="Switch language"
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
          variant === 'navbar'
            ? 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700'
            : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
        )}
      >
        <GlobeIcon />
        <span className="tabular-nums">{t(LABEL_KEYS[locale])}</span>
        <svg
          className={cn('h-3 w-3 transition-transform', open && 'rotate-180')}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.068l3.71-3.838a.75.75 0 0 1 1.08 1.04l-4.25 4.4a.75.75 0 0 1-1.08 0l-4.25-4.4a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-2 min-w-[110px] overflow-hidden rounded-lg border border-slate-100 bg-white shadow-lg"
          onMouseLeave={close}
        >
          {LOCALES.map((loc) => {
            const targetLocale = loc as Locale;
            const active = loc === locale;
            return (
              <Link
                key={loc}
                href={basePath}
                locale={targetLocale}
                onClick={close}
                className={cn(
                  'block w-full px-4 py-2 text-left text-sm transition-colors',
                  active
                    ? 'bg-brand-50 font-semibold text-brand-700'
                    : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                {t(LABEL_KEYS[targetLocale])}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GlobeIcon(): JSX.Element {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z" />
    </svg>
  );
}
