import { DEFAULT_LOCALE, isLocale } from './request';
import type { Locale } from './request';

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const candidate = segments[1];
  return isLocale(candidate) ? (candidate as Locale) : DEFAULT_LOCALE;
}

export function localizePath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return '/' + segments.join('/');
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0])) {
    segments.shift();
  }
  return '/' + segments.join('/');
}
