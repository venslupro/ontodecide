import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';
import { LOCALES } from '@/i18n/request';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'zh' ? 1 : 0.8,
  }));
}
