import { isLocale } from './request';

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0])) {
    segments.shift();
  }
  return '/' + segments.join('/');
}
