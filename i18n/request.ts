import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const LOCALES = ['zh', 'en'] as const;
export const DEFAULT_LOCALE = 'zh' as const;

export type Locale = (typeof LOCALES)[number];

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    timeZone: 'Asia/Shanghai',
    now: new Date(),
  };
});
