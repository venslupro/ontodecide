// Runtime configuration. Values can be overridden via Vercel environment
// variables. These are read in server components; values needed by client
// components are passed down as props.
export const SITE_URL =
  process.env.SITE_URL || 'https://ontodecide.vercel.app';
export const COMMUNITY_URL =
  process.env.COMMUNITY_URL || 'https://ontodecide-ce.vercel.app';
export const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL || 'venslu.pro@gmail.com';
export const SITE_NAME = 'OntoDecide';

export function buildMailto(
  subject: string,
  body: string
): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
