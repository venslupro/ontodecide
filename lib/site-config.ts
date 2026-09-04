export const SITE_URL = 'https://ontodecide-web.vercel.app';
export const COMMUNITY_URL = 'https://ontodecide-prd-web.pages.dev/';
export const CONTACT_EMAIL = 'venslu.pro@gmail.com';
export const SITE_NAME = 'OntoDecide';

export function buildMailto(
  subject: string,
  body: string
): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
