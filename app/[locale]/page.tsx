import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Scenarios } from '@/components/sections/Scenarios';
import { Industries } from '@/components/sections/Industries';
import { Editions } from '@/components/sections/Editions';
import { Contact } from '@/components/sections/Contact';
import type { Locale } from '@/i18n/request';

interface HomePageProps {
  readonly params: Promise<{ locale: string }>;
}

export default async function HomePage({
  params,
}: HomePageProps): Promise<JSX.Element> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Features />
      <Scenarios />
      <Industries />
      <Editions />
      <Contact />
    </>
  );
}
