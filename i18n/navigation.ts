import { createNavigation } from 'next-intl/navigation';
import { LOCALES } from './request';

export const { Link } = createNavigation({
  locales: [...LOCALES],
  localePrefix: 'always',
});
