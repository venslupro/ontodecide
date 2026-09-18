export const SITE_URL = 'https://ontodecide.vercel.app';
export const COMMUNITY_URL = 'https://ontodecide-ce.pages.dev/';
export const CONTACT_EMAIL = 'venslu.pro@gmail.com';
export const SITE_NAME = 'OntoDecide';

export function buildMailto(
  subject: string,
  body: string
): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
