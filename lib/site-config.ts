// Runtime configuration. Values can be overridden via Vercel environment
// variables. These are read in server components; values needed by client
// components are passed down as props.

/**
 * Resolve a URL from an environment variable with a fallback default.
 * Returns the default if the env value is missing or not a valid URL
 * (e.g. a bare domain without protocol).
 */
function resolveUrl(envValue: string | undefined, fallback: string): string {
  if (!envValue) return fallback;
  try {
    // Validate by constructing a URL object.
    new URL(envValue);
    return envValue;
  } catch {
    return fallback;
  }
}

export const SITE_URL = resolveUrl(
  process.env.SITE_URL,
  'https://ontodecide.vercel.app'
);
export const COMMUNITY_URL = resolveUrl(
  process.env.COMMUNITY_URL,
  'https://ontodecide-ce.vercel.app'
);
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
