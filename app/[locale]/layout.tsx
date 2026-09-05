import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, isLocale, type Locale } from '@/i18n/request';
import { SITE_URL } from '@/lib/site-config';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../globals.css';

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale: locale as Locale }));
}

interface LocaleLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    zh: 'OntoDecide | AI 驱动的智能决策系统',
    en: 'OntoDecide | AI-Driven Intelligent Decision System',
  };
  const descriptions: Record<string, string> = {
    zh: '多源数据融合与智能决策引擎：将多源异构数据统一融合为单一态势视图，通过实时 AI 洞察与可执行建议为决策者与运营人员赋能。',
    en: 'Multi-source data fusion and intelligent decision engine: unify heterogeneous data into a single situational picture with real-time AI insights and actionable recommendations.',
  };

  return {
    metadataBase: new URL(SITE_URL),
    verification: {
      google: 'w4jJfM2FK6kCLlmnpZdnVa17ByyfQmDT8Q5WFxUMT9U',
    },
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    keywords: [
      'OntoDecide',
      'intelligent decision',
      'data fusion',
      'ontology',
      'AI decision',
      '智能决策',
      '数据融合',
      '本体建模',
    ],
    authors: [{ name: 'OntoDecide' }],
    openGraph: {
      type: 'website',
      locale,
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      siteName: 'OntoDecide',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'OntoDecide',
      description: 'AI-Driven Intelligent Decision System',
    },
    icons: {
      icon: [
        {
          url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%232563eb'/%3E%3Cpath d='M6 16l3-3 3 2 4-6 2 3' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Cpath d='M5 20h14' stroke='white' stroke-width='2' stroke-linecap='round' fill='none'/%3E%3Ccircle cx='9' cy='13' r='1.4' fill='white'/%3E%3Ccircle cx='12' cy='15' r='1.4' fill='white'/%3E%3Ccircle cx='16' cy='9' r='1.4' fill='white'/%3E%3C/svg%3E`,
          type: 'image/svg+xml',
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<JSX.Element> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    notFound();
  }
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
