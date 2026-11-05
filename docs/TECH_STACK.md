# Proposed Technology Stack

> ⚠️ **Status: PROPOSED — NOT APPROVED.** This document records the intended stack for the Library Management App (Gruhyashala). No dependencies have been installed and no application has been scaffolded yet. All choices below are subject to approval during sprint planning.

This document covers for each technology: **role**, **rationale**, **alternatives considered**, and **unresolved decisions**.

---

## 1. Next.js + TypeScript

- **Role:** Full-stack application framework and language. Next.js provides routing (App Router), server rendering, API routes / Server Actions, and the production build. TypeScript provides static typing for the entire codebase (frontend, backend, and data layers).
- **Rationale:** Single React-based codebase for UI and server logic reduces context-switching; built-in routing, caching, and Vercel integration; TypeScript catches errors early and improves maintainability for a data-heavy app like a library system.
- **Alternatives:**
  - *Vite + React SPA + separate backend* — smaller frontend tooling, but requires a separate API server and auth/session handling.
  - *Remix* — similar full-stack model, smaller ecosystem than Next.js.
  - *Plain React + Express/Fastify* — maximum control, maximum boilerplate.
  - *JavaScript (no TypeScript)* — faster to write, but weaker safety for data models.
  - *tRPC / GraphQL (e.g. Apollo) on top of Next.js* — more structured APIs, but adds a layer; deferred until API needs are clarified.
- **Unresolved decisions:**
  - Next.js version (App Router vs Pages Router; target latest stable at scaffold time).
  - Node.js version to pin (`.nvmrc` / `engines`).
  - Package manager (npm vs pnpm vs yarn).
  - `src/` directory vs root-level `app/` layout.
  - Linting/formatting tooling (ESLint + Prettier configs, strictness level).
  - Testing framework (e.g. Vitest / Jest + Playwright) — to be selected.

## 2. Tailwind CSS

- **Role:** Utility-first CSS framework providing component styling, responsive layout, and the design system layer.
- **Rationale:** Fast iteration without writing custom CSS per component; consistent spacing/typography scales; pairs natively with Next.js; easy to extend with a theme.
- **Alternatives:**
  - *CSS Modules / plain CSS* — no framework, but slower and less consistent.
  - *shadcn/ui + Tailwind* — accessible pre-built components on top of Tailwind; a strong candidate but would be an added dependency to approve.
  - *Material UI / Ant Design* — complete component libraries, but heavier and harder to customise to the intended design.
  - *Bootstrap* — mature, but less flexible and a dated aesthetic.
- **Unresolved decisions:**
  - Tailwind version (v3 vs v4) and PostCSS/autoprefixer setup.
  - Design tokens / theme (colours, fonts) — pending design task.
  - Whether to adopt a component library (shadcn/ui, Radix) or build custom components.
  - Dark mode strategy (class vs media query) — pending design requirements.

## 3. Supabase PostgreSQL

- **Role:** Primary relational datastore (books, members, loans, users, etc.) and, via Supabase, the managed Postgres instance, migrations, and Row Level Security (RLS) policy layer.
- **Rationale:** PostgreSQL is a natural fit for relational library data (books ↔ members ↔ loans with joins and constraints). Supabase adds hosted Postgres, instant REST/GraphQL APIs, realtime, and storage without running a database ourselves.
- **Alternatives:**
  - *Supabase REST/Edge Functions vs direct Postgres client (e.g. Prisma)* — using Supabase's APIs alone vs an ORM for schema management.
  - *Prisma + self-hosted/secret Postgres (e.g. Neon, PlanetScale-style, AWS RDS)* — more ORM control, but we manage connection strings, migrations, and backups.
  - *MongoDB/Atlas (NoSQL)* — flexible schema, but library data is inherently relational; joins and integrity constraints are stronger in Postgres.
  - *Firebase/Firestore* — realtime and simple auth, but weaker relational querying for loan/overdue logic.
- **Unresolved decisions:**
  - Data model (entities, relationships, indexes) — pending database design task.
  - Supabase project provisioning (who creates it, region, tier).
  - Migration tooling (Supabase CLI SQL migrations vs Prisma Migrate) and seed strategy.
  - RLS policies per role (librarian vs member vs admin) — pending requirements.
  - Backups, point-in-time recovery tier, and environment strategy (local Supabase vs cloud dev/prod).

## 4. Supabase Auth

- **Role:** User authentication and authorisation — signup, login, session handling, JWT issuance, and integration with RLS policies so reads/writes are enforced per authenticated user.
- **Rationale:** Tightly integrated with Supabase Postgres (RLS uses auth context directly), supports email/password, OAuth, and magic links out of the box, and avoids building auth from scratch.
- **Alternatives:**
  - *NextAuth.js (Auth.js)* — framework-native sessions, more control over providers, but separate from the database auth layer.
  - *Clerk / Auth0* — polished hosted auth with user management UI, but an extra vendor and cost.
  - *Custom JWT auth* — full control, but significant security responsibility.
- **Unresolved decisions:**
  - Auth providers (email/password only vs OAuth like Google) — pending requirements.
  - User roles model (custom `profiles` table vs Supabase roles vs JWT claims).
  - Email verification, password-reset, and session-expiry policies.
  - Which auth approach for the frontend (Supabase JS client vs NextAuth) — must align with the database access layer.

## 5. Google Books API

- **Role:** External source of book metadata (title, author, publisher, ISBN, cover image, description) for cataloguing new books without manual entry.
- **Rationale:** Free, well-documented API with ISBN search; avoids manual data entry and provides cover images. Google Books is the simplest source for initial catalogue enrichment.
- **Alternatives:**
  - *Open Library API* — open data, no key, but metadata quality varies.
  - *OLDB / LibraryThing / Goodreads APIs* — Goodreads API is deprecated for public use; others have terms/rate limits to verify.
  - *Manual entry / CSV import* — full control, but slow and error-prone for large catalogues.
- **Unresolved decisions:**
  - API key requirement and quota handling (daily limits, graceful degradation when exhausted).
  - Caching strategy (cache responses in our DB vs live-fetch per search).
  - Which fields to persist vs display-only, and deduplication by ISBN.
  - Terms-of-service / attribution requirements.
  - Fallback source if Google Books lacks a title.

## 6. Vercel Deployment

- **Role:** Hosting and deployment platform for the Next.js application — git-connected deploys, preview URLs per pull request, environment variables, and edge caching.
- **Rationale:** First-party support for Next.js (zero-config builds, SSR/ISR, edge functions), seamless GitHub integration, and instant preview environments per branch/PR.
- **Alternatives:**
  - *Self-hosted / VPS (Docker + Nginx)* — full control, but we manage servers, TLS, and scaling.
  - *Netlify* — similar Next.js support, slightly less first-party integration.
  - *AWS Amplify / EC2 / S3 + CloudFront* — powerful, but substantially more infrastructure to manage.
  - *Render / Railway / Fly.io* — simpler container hosting, less Next.js-specific optimisation.
- **Unresolved decisions:**
  - Hobby vs Pro plan (team features, build minutes, analytics).
  - Production domain (custom domain vs `*.vercel.app`) and preview URL policy.
  - Environment variable management (Vercel dashboard vs `.env` templates; secrets rotation).
  - CI/CD pipeline beyond Vercel's GitHub integration (preview approvals, branch protection).
  - Regions and edge caching settings.

---

## Cross-Cutting Considerations

- **Environment strategy:** Local development with Supabase CLI (seeded data), a shared cloud dev project, and production — exact setup pending.
- **Observability:** Error tracking (e.g. Sentry) and analytics — not yet decided.
- **File storage:** Book covers (Supabase Storage vs external URLs from Google Books) — pending design.
- **Costs:** Supabase + Vercel free tiers are sufficient for early sprints; limits to be monitored.

## Open Questions Summary

| # | Decision | Blocks |
|---|----------|--------|
| 1 | Next.js/Node versions, package manager, `src/` layout | Scaffolding |
| 2 | Tailwind version, component library, design tokens | Frontend work |
| 3 | Supabase provisioning, ORM/migrations, RLS roles | Database design |
| 4 | Auth providers, role model | API/RLS design |
| 5 | Google Books caching, quota, ToS, fallback | Catalogue import work |
| 6 | Vercel plan, domain, env/CI strategy | Deployment |

All open questions must be resolved and approved by the project owner before scaffolding the application or installing dependencies.
