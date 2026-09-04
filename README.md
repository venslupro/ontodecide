# ontodecide-web

OntoDecide official website — AI-driven intelligent decision system.

Multi-source heterogeneous data fusion and intelligent decision engine: unify
multi-source heterogeneous data into a single situational picture and empower
decision-makers and operators with real-time AI insights and actionable
recommendations.

## Tech stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS
- next-intl (bilingual zh / en)

## Development

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /zh)
npm run build    # production build
npm run lint     # eslint
npm run typecheck
```

## Project structure

```
app/
  [locale]/          # locale-prefixed routes (zh / en)
    layout.tsx
    page.tsx
  globals.css
  layout.tsx         # pass-through root layout
  page.tsx           # redirects to default locale
  robots.ts
  sitemap.ts
components/
  Navbar.tsx
  Footer.tsx
  LanguageSwitcher.tsx
  Reveal.tsx
  sections/
    Hero.tsx
    Features.tsx
    Scenarios.tsx
    Industries.tsx
    Editions.tsx
    Contact.tsx
i18n/
  request.ts         # locale config + message loader
  navigation.ts      # localized Link / router
  utils.ts           # pathname helpers
lib/
  site-config.ts     # site URL, community URL, contact email, mailto builder
  utils.ts
messages/
  zh.json
  en.json
types/
  global.d.ts        # JSX global namespace shim (React 19)
```

## Deployment

Hosted on Vercel using the default `*.vercel.app` domain. The community
edition lives at https://ontodecide-prd-web.pages.dev/ and requires an
account application via venslu.pro@gmail.com.
