# Decision Log

Short, dated records of technical and process decisions. Statuses: **Accepted**, **Superseded**, **Owner decision**.

| ID    | Date       | Decision                                               | Rationale                                                             | Status         |
| ----- | ---------- | ------------------------------------------------------ | --------------------------------------------------------------------- | -------------- |
| D-001 | 2026-11-05 | Use Next.js 16 (App Router) + TypeScript strict        | Single codebase, typed data boundaries, first-class deployment target | Accepted       |
| D-002 | 2026-11-05 | Use npm and commit `package-lock.json`                 | Deterministic installs; no extra tooling                              | Accepted       |
| D-003 | 2026-11-05 | Pin Node 24 in `.nvmrc`, allow `>=20` in engines       | Match local runtime; broad CI compatibility                           | Accepted       |
| D-004 | 2026-11-05 | Use `src/` + `@/*` alias                               | Clear separation of app code from tooling                             | Accepted       |
| D-005 | 2026-11-05 | Tailwind CSS v4, no component library yet              | Fast styling; component choice needs design input                     | Accepted       |
| D-006 | 2026-11-05 | Supabase PostgreSQL + Supabase Auth                    | Relational data + integrated auth/RLS                                 | Accepted       |
| D-007 | 2026-11-05 | No ORM; Supabase client + SQL migrations               | Fewer layers; RLS stays authoritative                                 | Accepted       |
| D-008 | 2026-11-05 | Google Books API called server-side only               | Protects API key and quota                                            | Accepted       |
| D-009 | 2026-11-05 | Vercel for hosting, preview per PR                     | Native Next.js support, low ops                                       | Accepted       |
| D-010 | 2026-11-05 | Vitest + Testing Library for unit/component tests      | Fast, Vite-native, jsdom support                                      | Accepted       |
| D-011 | 2026-11-05 | ESLint + Prettier; CI enforces both                    | Consistent code without local-hook friction                           | Accepted       |
| D-012 | 2026-11-05 | GitHub Actions runs lint, typecheck, test, build       | Single required gate for every PR                                     | Accepted       |
| D-013 | 2026-11-05 | No product features until requirements/design approved | Prevents rework and scope drift                                       | Accepted       |
| D-014 | 2026-11-05 | 1 day = 1 sprint for setup work                        | Faster feedback; avoids a monolithic Sprint 0                         | Accepted       |
| D-015 | 2026-11-05 | License selection deferred to owner                    | Legal choice, not a technical default                                 | Owner decision |
| D-016 | 2026-11-05 | Supabase/Vercel projects not created by automation     | Paid/credential-bearing; owner must provision                         | Owner decision |

## Changing a decision

1. Add a new row; do not rewrite history.
2. Mark the old row **Superseded** and link the new ID.
3. Note the impact in the related daily sprint summary.
