# Technology Stack

> **Status: APPROVED for the foundation** (decision date: 2026-11-05). These choices are final enough to build the development environment on. Items marked **Owner decision** need the repository owner because they involve credentials, paid plans, or product scope. No product features are implemented yet.

Each section records the **role**, **rationale**, **alternatives**, and **decision status**.

---

## 1. Next.js + TypeScript

- **Role:** Full-stack React framework (App Router) and the application language.
- **Rationale:** One codebase for UI and server logic, first-class Vercel support, and strong typing for data-heavy library workflows.
- **Alternatives:** Vite + React SPA with a separate API; Remix; plain React + Express/Fastify; JavaScript instead of TypeScript.
- **Decision:**
  - Next.js **16.x**, App Router, `src/` directory.
  - TypeScript **5.x**, `strict: true`.
  - Node.js **24** pinned in `.nvmrc`; `engines: node >=20`.
  - npm as the package manager (lockfile committed).
  - Import alias `@/*` → `src/*`.
  - ESLint + Prettier for lint/format; Vitest + Testing Library for unit/component tests.
  - Playwright/E2E deferred until there are user flows to test.

## 2. Tailwind CSS

- **Role:** Utility-first styling and design-token layer.
- **Rationale:** Fast, consistent UI work; native fit with Next.js; easy to constrain with tokens.
- **Alternatives:** CSS Modules/plain CSS; shadcn/ui + Radix; Material UI/Ant Design; Bootstrap.
- **Decision:**
  - Tailwind CSS **v4** with the `@tailwindcss/turbopack` integration.
  - No component library yet — design tokens and components will follow the design task. shadcn/ui remains the preferred candidate if a library is adopted.
  - Dark mode currently follows the OS preference; explicit toggle is a design decision.

## 3. Supabase PostgreSQL

- **Role:** Primary relational database (books, members, loans, reservations, users).
- **Rationale:** Library data is relational; Postgres gives joins/constraints, and Supabase provides a managed instance plus RLS.
- **Alternatives:** Prisma + Neon/RDS; MongoDB/Atlas; Firebase/Firestore.
- **Decision:**
  - Supabase-hosted PostgreSQL.
  - **No ORM** for now: Supabase client + SQL migrations managed by the Supabase CLI. Revisit only if query complexity demands it.
  - Local development via Supabase CLI (requires Docker, already available on this machine).
  - **Owner decision:** create the Supabase project (region, free tier), and provide credentials manually via `.env.local`.

## 4. Supabase Auth

- **Role:** Sign-up, sign-in, sessions, JWT, and RLS identity.
- **Rationale:** Native integration with Postgres RLS avoids building auth and a separate session layer.
- **Alternatives:** Auth.js/NextAuth; Clerk/Auth0; custom JWT.
- **Decision:**
  - Supabase Auth with email/password for the foundation.
  - Roles: `admin`, `librarian`, `member` — stored in a `profiles` table and enforced with RLS (final role matrix is a requirements task).
  - OAuth providers and email templates deferred until requirements are approved.
  - **Owner decision:** configure auth providers and email settings in the Supabase dashboard.

## 5. Google Books API

- **Role:** Import book metadata (title, authors, ISBN, cover, description) by search or ISBN.
- **Rationale:** Free, documented, ISBN-aware, and avoids manual cataloguing.
- **Alternatives:** Open Library API; manual/CSV import; commercial metadata providers.
- **Decision:**
  - Server-side calls only (never expose the key to the browser).
  - API key optional for low volume; used when quota requires it.
  - Persist a normalized subset of metadata; deduplicate by ISBN/Google Books ID.
  - Cache imported metadata in Postgres; live search is for import only.
  - Attribution/terms reviewed before feature implementation.
  - **Owner decision:** provide `GOOGLE_BOOKS_API_KEY` if quota requires it.

## 6. Vercel Deployment

- **Role:** Hosting, preview deployments per PR, production deployment.
- **Rationale:** First-party Next.js support and low operational overhead.
- **Alternatives:** Netlify; AWS Amplify/EC2; Render/Railway/Fly.io; self-hosted Docker.
- **Decision:**
  - Vercel with GitHub integration: preview per pull request, production from `main`.
  - Start on the free/Hobby tier.
  - Environment variables managed in the Vercel dashboard; never committed.
  - **Owner decision:** create/link the Vercel project and set environment variables; custom domain choice.
  - No production deployment is performed by the setup work.

---

## Cross-Cutting Decisions

| Area            | Decision                                                       |
| --------------- | -------------------------------------------------------------- |
| Package manager | npm (lockfile committed)                                       |
| Node            | 24 (`.nvmrc`), engines `>=20`                                  |
| Layout          | `src/app` App Router                                           |
| Lint/format     | ESLint (Next config) + Prettier                                |
| Tests           | Vitest + Testing Library; coverage via v8                      |
| CI              | GitHub Actions: lint → typecheck → test → build                |
| Git hooks       | None for now; CI is the gate (revisit if commit hygiene slips) |
| Secrets         | `.env.local` only; `.env.example` documents variable names     |
| Environments    | Local → Vercel preview → production; Supabase local/cloud      |

## Owner Actions (Blocked Until Provided)

1. Create the Supabase project and share URL + anon key + service role key **via the environment file, not chat**.
2. Decide Google Books API key usage/quota.
3. Create/link the Vercel project and set environment variables.
4. Approve custom domain and Vercel plan if the free tier is insufficient.
5. Approve the license (repository currently has none).

All other foundation decisions are recorded in [docs/DECISIONS.md](DECISIONS.md).
