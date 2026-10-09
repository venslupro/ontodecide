# OntoDecide

> AI-driven intelligent decision system — fuse multi-source heterogeneous data
> into a single situational picture and empower decision-makers with real-time
> AI insights and actionable recommendations.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-All%20rights%20reserved-gray)](#license)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Development](#development)
  - [Production Build](#production-build)
  - [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Internationalization](#internationalization)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository hosts the **official marketing website** for OntoDecide. It
showcases the platform's core capabilities — multi-source data fusion,
real-time operations cockpit, AI scenario simulation, and ontology-based
unified modeling — and routes visitors toward commercial edition consultation.

The site is **bilingual** (Simplified Chinese and English), statically
generated, and optimized for search-engine discoverability with locale-aware
sitemap, robots, and OpenGraph metadata.

## Features

- **Multi-source data fusion** — unify structured, semi-structured, and
  unstructured data into a single trusted situational foundation.
- **Real-time operations cockpit** — visual dashboards with real-time metrics
  for second-level operational awareness.
- **AI scenario simulation** — large-model-powered causal analysis and
  actionable strategy recommendations.
- **Ontology-based unified modeling** — domain knowledge graphs for
  explainable and traceable intelligent reasoning.
- **Bilingual (zh / en)** with locale-prefixed routing and automatic
  redirection.
- **SEO-ready** — metadata, sitemap, robots, OpenGraph, and Twitter cards.
- **Environment-configurable** — site URL, community URL, and contact email
  can be changed without code edits.

## Tech Stack

| Category        | Technology                          |
| --------------- | ----------------------------------- |
| Framework       | [Next.js 15](https://nextjs.org/) (App Router) |
| UI Library      | [React 19](https://react.dev/)      |
| Language        | [TypeScript 5.7](https://www.typescriptlang.org/) |
| Styling         | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Internationalization | [next-intl 4](https://next-intl.dev/) |
| Linting         | ESLint + [eslint-config-google](https://github.com/google/eslint-config-google) |
| Deployment      | [Vercel](https://vercel.com/)       |

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** (bundled with Node.js)

### Installation

```bash
git clone https://github.com/venslupro/ontodecide.git
cd ontodecide
npm install
```

## Usage

### Development

Start the local development server with hot reload:

```bash
npm run dev
```

The site is served at <http://localhost:3000> and automatically redirects to
the default locale (`/zh`).

### Production Build

```bash
npm run build    # produce an optimized production build
npm run start    # serve the production build locally
```

### Available Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start the development server               |
| `npm run build`     | Create a production build                  |
| `npm run start`     | Serve the production build                 |
| `npm run lint`      | Run ESLint (Google code style)             |
| `npm run typecheck` | Run the TypeScript type checker            |

## Environment Variables

Runtime configuration is defined in `lib/site-config.ts` and can be
overridden via Vercel environment variables. URL values are validated at
build time — invalid values (e.g. a bare domain without protocol) fall back
to the defaults.

| Variable          | Env Var           | Default                          | Description                                   |
| ----------------- | ----------------- | -------------------------------- | --------------------------------------------- |
| `SITE_URL`        | `SITE_URL`        | `https://ontodecide.vercel.app`  | Canonical site URL (metadata base, sitemap).  |
| `COMMUNITY_URL`   | `COMMUNITY_URL`   | `https://ontodecide-ce.vercel.app` | External URL of the community edition.      |
| `CONTACT_EMAIL`   | `CONTACT_EMAIL`   | `venslu.pro@gmail.com`           | Recipient for commercial inquiry mailto links.|

> Values are read in **server components**. `COMMUNITY_URL` is passed to the
> client `Footer` component as a prop, so no `NEXT_PUBLIC_` prefix is needed.

## Internationalization

- **Locales**: `zh` (Simplified Chinese, default), `en` (English)
- **Routing**: locale-prefixed (`/zh`, `/en`) with `always` prefix strategy
- **Messages**: `messages/zh.json`, `messages/en.json`
- **Provider**: `next-intl` configured in `i18n/request.ts` and
  `i18n/navigation.ts`

## Project Structure

```
ontodecide/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # page metadata (SEO, OpenGraph)
│   │   └── page.tsx          # landing page composition
│   ├── globals.css           # Tailwind + custom component classes
│   ├── layout.tsx            # pass-through root layout
│   ├── page.tsx              # redirects to default locale
│   ├── robots.ts             # crawler rules + sitemap reference
│   └── sitemap.ts            # locale-aware sitemap
├── components/
│   ├── sections/
│   │   ├── Hero.tsx          # hero + community CTA
│   │   ├── Features.tsx      # four core capabilities
│   │   ├── Scenarios.tsx     # application scenarios
│   │   ├── Industries.tsx    # industry verticals
│   │   ├── Editions.tsx      # community vs. commercial table
│   │   └── Contact.tsx       # commercial inquiry
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   └── Reveal.tsx            # scroll-reveal animation wrapper
├── i18n/
│   ├── request.ts            # locale config + message loader
│   ├── navigation.ts         # localized Link
│   └── utils.ts              # pathname helpers
├── lib/
│   ├── site-config.ts        # env-driven runtime configuration
│   └── utils.ts              # cn() class-name helper
├── messages/
│   ├── zh.json
│   └── en.json
├── types/
│   └── global.d.ts           # JSX namespace shim (React 19)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

## Code Style

The project follows the [Google JavaScript Style Guide][google-style],
enforced by `eslint-config-google` and extended with
`next/core-web-vitals`. Project-specific overrides:

- Indentation: 2 spaces
- Object curly spacing: `always`
- Max line length: 100 characters
- JSDoc requirements: disabled

```bash
npm run lint        # check style
npm run typecheck   # check types
```

[google-style]: https://google.github.io/styleguide/jsguide.html

## Deployment

The project is deployed on **Vercel** as a Next.js application.

1. Push to the `main` branch (via pull request).
2. Vercel automatically builds and deploys.
3. Configure environment variables in **Vercel → Settings → Environment
   Variables** (see [Environment Variables](#environment-variables)).

> Direct pushes to `main` are prohibited — all changes must go through a
> pull request.

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes
before submitting a pull request.

1. Create a feature branch from `main`.
2. Make your changes.
3. Ensure `npm run lint` and `npm run typecheck` pass.
4. Open a pull request targeting `main`.

## License

All rights reserved. © OntoDecide.
