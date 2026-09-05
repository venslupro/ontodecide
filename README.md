# OntoDecide Official Website

AI-driven intelligent decision system. Multi-source heterogeneous data fusion
and intelligent decision engine: unify multi-source heterogeneous data into a
single situational picture and empower decision-makers and operators with
real-time AI insights and actionable recommendations.

## Features

- **Multi-source data fusion** — unify structured, semi-structured and
  unstructured data into a single situational view.
- **Real-time operations cockpit** — visual situational dashboards with
  real-time metrics.
- **AI scenario simulation** — large-model-driven causal analysis and
  actionable strategy recommendations.
- **Ontology-based modeling** — unified semantics with domain knowledge
  graphs for explainable reasoning.
- **Bilingual (zh / en)** via `next-intl`.
- **SEO-ready** — `sitemap.xml`, `robots.txt`, OpenGraph/Twitter metadata,
  and Google Search Console site verification.

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript 5
- Tailwind CSS 3
- next-intl 4 (i18n)
- ESLint with `eslint-config-google`

## Prerequisites

- Node.js >= 20

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /zh)
```

### Available Scripts

| Script              | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start the development server |
| `npm run build`     | Production build             |
| `npm run start`     | Run the production build     |
| `npm run lint`      | Run ESLint (Google style)    |
| `npm run typecheck` | Run TypeScript type check    |

## Project Structure

```
app/
  [locale]/              # locale-prefixed routes (zh / en)
    layout.tsx           # metadata (title, OG, google-site-verification)
    page.tsx             # landing page
  globals.css
  layout.tsx             # pass-through root layout
  page.tsx               # redirects to default locale
  robots.ts              # crawler rules + sitemap reference
  sitemap.ts             # locale-aware sitemap
components/
  Navbar.tsx
  Footer.tsx
  LanguageSwitcher.tsx
  Reveal.tsx             # scroll-reveal animation wrapper
  sections/
    Hero.tsx
    Features.tsx
    Scenarios.tsx
    Industries.tsx
    Editions.tsx         # community vs commercial capability table
    Contact.tsx          # commercial edition consultation
i18n/
  request.ts             # locale config + message loader
  navigation.ts          # localized Link / router
  utils.ts               # pathname helpers
lib/
  site-config.ts         # site URL, community URL, contact email, mailto
  utils.ts
messages/
  zh.json
  en.json
types/
  global.d.ts            # JSX global namespace shim (React 19)
```

## Code Style

The project follows the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
enforced by `eslint-config-google`, extended with `next/core-web-vitals`.
Rules that conflict with modern Next.js / React conventions are overridden
(2-space indent, `{ name }` object spacing, `max-len: 100`).

```bash
npm run lint
```

## SEO

- `app/sitemap.ts` generates a locale-aware sitemap.
- `app/robots.ts` allows all crawlers and points to the sitemap.
- `app/[locale]/layout.tsx` defines `metadataBase`, title, description,
  keywords, OpenGraph, Twitter cards, favicon, and Google Search Console
  verification (`google-site-verification`).

## Deployment

Hosted on Vercel. The community edition runs on Cloudflare Pages at
<https://ontodecide-prd-web.pages.dev/> and requires an account application
via email.

## Contact

For commercial edition inquiries, private deployment or customization,
reach out at <venslu.pro@gmail.com>.
