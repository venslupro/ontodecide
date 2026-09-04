'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavLink {
  readonly key: string;
  readonly href: string;
  readonly label: string;
}

export function Navbar(): JSX.Element {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: NavLink[] = [
    { key: 'features', href: '#features', label: t('features') },
    { key: 'scenarios', href: '#scenarios', label: t('scenarios') },
    { key: 'industries', href: '#industries', label: t('industries') },
    { key: 'editions', href: '#editions', label: t('editions') },
    { key: 'contact', href: '#contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-slate-200/60 bg-white/85 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-white/60 backdrop-blur'
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between sm:h-20">
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-semibold text-slate-900"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-md shadow-brand-600/25">
            <LogoMark />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight">OntoDecide</span>
            <span className="text-[10px] font-medium text-slate-500">
              AI Decision Engine
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="navbar" />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-brand-600"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function LogoMark(): JSX.Element {
  return (
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
      <circle cx="9" cy="13" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
