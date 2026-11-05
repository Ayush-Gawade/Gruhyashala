# Sprint Plan

> ⚠️ **Scope guardrail:** This plan defines planning and setup work only. Product features are **out of implementation scope** until requirements and technical decisions are approved by the project owner. No application code will be written from this plan until its tasks are explicitly approved.

**Planning horizon:** Sprint 0 — Foundation & Requirements (no feature code until the Definition of Done below is met).

**Team structure:** Work is assigned to **roles, not individuals**. The project owner fills role assignments at kickoff.

---

## SPRINT 0 — FOUNDATION & REQUIREMENTS

### Track A: Initial Setup Tasks

| ID | Task | Owner Role | Depends On | Acceptance Criteria |
|----|------|-----------|------------|---------------------|
| A1 | Approve proposed tech stack (or record amendments) | Project Owner / Tech Lead | — | `docs/TECH_STACK.md` decisions marked Approved in writing; open-questions table resolved or deferred with dates |
| A2 | Create Next.js + TypeScript scaffold (App Router) | Front-End Developer / Tech Lead | A1 | App builds and runs locally; `npm run dev` serves a blank app; TS strict mode on; ESLint passes |
| A3 | Set Node version + package manager policy | Tech Lead | A2 | `.nvmrc` + `engines` pinned; README setup instructions match reality |
| A4 | Add Tailwind CSS + base theme | Front-End Developer | A2 | Tailwind compiled; a sample page renders styled output; design tokens documented |
| A5 | Configure linting/formatting + git hooks (e.g. Husky) | Tech Lead | A2 | Lint/format run on commit; CI (or manual checklist) enforces them |
| A6 | Provision Supabase project + create `.env.example` | Back-End Developer | A1 | Project created (dev tier); keys in Vercel/local env only; no secrets in repo |
| A7 | Create Vercel project linked to GitHub | DevOps / Project Owner | A2 | Preview + production deploys from branches; env vars set; domain decision recorded |
| A8 | Repo hygiene: license, branch protection, CONTRIBUTING | Project Owner | A1 | License present; `main` protected; contribution flow documented in README |

### Track B: Requirements & Design Tasks

| ID | Task | Owner Role | Depends On | Acceptance Criteria |
|----|------|-----------|------------|---------------------|
| B1 | Define product requirements (user stories, must/should/won't) | Product Analyst | A8 | Requirements doc merged; every story has acceptance criteria; owner sign-off |
| B2 | Define user roles & permissions matrix | Product Analyst / Security Engineer | B1 | Matrix approved; maps cleanly onto Supabase Auth + RLS |
| B3 | UX research & user flows (catalogue, search, lending, returns) | UX Designer | B1 | Flows documented for each P0 story |
| B4 | UI design: wireframes → high-fidelity mockups + component inventory | UI Designer | B3 | Mockups linked; states (empty/loading/error) covered per screen |
| B5 | Design tokens & visual system update | UI Designer | B4 | Tokens merged into Tailwind theme (A4) |
| B6 | Accessibility + responsive requirements | UX Designer / Front-End Developer | B3 | WCAG target level recorded; breakpoints agreed |

### Track C: Database & API Design Tasks

| ID | Task | Owner Role | Depends On | Acceptance Criteria |
|----|------|-----------|------------|---------------------|
| C1 | Data model: entities, ERD, relationships (books, members, loans, etc.) | Back-End Developer / DBA | B1, B2 | ERD + field dictionary reviewed and approved |
| C2 | Migration strategy + seed data plan | Back-End Developer | C1 | Migration workflow chosen (Supabase CLI vs Prisma); seed dataset defined |
| C3 | Supabase RLS policies per role | Security Engineer | C1, B2 | Policy matrix documented; tests planned |
| C4 | Google Books API integration design (search, ISBN lookup, caching, quota) | Back-End Developer | C1 | API contract + caching + fallback documented; ToS check recorded |
| C5 | Auth design (providers, roles, session policy) | Security Engineer | B2 | Auth design doc approved; aligns with C3 |
| C6 | API surface: which endpoints/queries, pagination, error shape | Tech Lead / Back-End Developer | C1, C4, C5 | OpenAPI or equivalent contract drafted; error codes agreed |

### Track D: Frontend Workstream

| ID | Task | Owner Role | Depends On | Acceptance Criteria |
|----|------|-----------|------------|---------------------|
| D1 | App shell: navigation, layout, auth-aware guards | Front-End Developer | A2–A4, C5 | Shell renders all top-level routes; unauthenticated redirect works |
| D2 | Component library setup (shadcn/ui or custom) + Storybook/docs | Front-End Developer | B4, B5 | Component inventory implemented or documented as custom |
| D3 | Data-fetching patterns (Server Components vs client) | Front-End Developer / Tech Lead | D1, C6 | Pattern documented; sample list/detail pages fetch real (seeded) data |

### Track E: Backend Workstream

| ID | Task | Owner Role | Depends On | Acceptance Criteria |
|----|------|-----------|------------|---------------------|
| E1 | Supabase clients + env wiring (browser/server/admin) | Back-End Developer | A6, C5 | All three clients created with documented usage rules |
| E2 | Migrations + seeds implemented (local Supabase) | Back-End Developer | C2 | `supabase start && supabase db reset` runs cleanly with seed data |
| E3 | RLS policies implemented + automated tests | Security Engineer | C3, E2 | Policy test suite passes per role (positive + negative cases) |
| E4 | Google Books service layer (rate-limit, cache, dedupe) | Back-End Developer | C4, E1 | Service + tests pass; quota failure mode verified |

### Track F: Delivery & Quality

| ID | Task | Owner Role | Depends On | Acceptance Criteria |
|----|------|-----------|------------|---------------------|
| F1 | CI pipeline: lint + type-check + tests on every PR | DevOps / Tech Lead | A5 | Required status checks green on a sample PR |
| F2 | Test strategy (unit, integration, e2e) + coverage targets | QA Engineer | D1, E2 | Strategy doc approved; harness runs in CI |
| F3 | Preview deployment per PR + production promotion process | DevOps | A7 | Working preview URL per PR; promotion checklist documented |
| F4 | Observability: error tracking (e.g. Sentry) + uptime basics | DevOps | A7 | Errors surface in a dashboard; alert route documented |

---

## Dependency Graph (Summary)

```
A1 ──┬─ A2 ── A3
     │    ├─ A4 ── D1 ── D2/D3 ── F2
     │    ├─ A5 ── F1
     │    └─ A7 ── F3/F4
     ├─ A6 ── E1 ── E4
     └─ A8 ── B1 ──┬─ B2 ──┬─ C1 ──┬─ C2 ── E2 ── E3
                   │       │       ├─ C3 ── E3
                   │       │       ├─ C4 ── E4
                   │       │       └─ C6 ── D3
                   │       └─ C5 ── E1
                   ├─ B3 ── B4 ── B5 / B6
                   └─ (design handoff to D2)
```

**Critical path:** A1 → A2 → A6 → E1/E2 → Sprint 1 feature work.  
**Others:** Everything in B depends on project-owner availability; design (B3–B6) and data/API design (C1–C6) can proceed in parallel but must converge before implementation tracks (D/E) begin feature work.

---

## Roles (Not Named Individuals)

| Role | Responsibilities |
|------|------------------|
| Project Owner | Final approvals on stack, requirements, scope, and releases |
| Tech Lead | Architecture decisions, scaffolding, code standards, CI |
| Product Analyst | Requirements, user stories, acceptance criteria |
| UX Designer | User flows, accessibility, responsive behaviour |
| UI Designer | Visual design, mockups, design tokens |
| Front-End Developer | Next.js app, Tailwind, components, data fetching |
| Back-End Developer | Supabase, migrations, APIs, Google Books integration |
| Security Engineer | Auth design, RLS policies, threat review |
| QA Engineer | Test strategy, automated suites, release verification |
| DevOps Engineer | Vercel, environments, CI/CD, observability |

---

## Acceptance Criteria & Definition of Done

### Definition of Done (every task)
1. Code/docs merged into the repository via reviewed pull request.
2. All acceptance criteria for the task are met and verified by the task owner.
3. Linting, formatting, and type-checking pass (for code tasks).
4. Tests pass — and any new logic includes tests per the test strategy (F2).
5. Documentation is updated (README, `docs/`, or inline) to reflect the change.
6. No secrets, credentials, or local env files are committed.
7. The project owner (or their delegate) has signed off where the task is marked as requiring approval.

### Sprint 0 Exit Criteria
- [ ] Tech stack approved (A1) and scaffolding tasks (A2–A8) complete.
- [ ] Requirements + roles/permissions (B1–B2) approved.
- [ ] Design flows and mockups (B3–B6) approved.
- [ ] Data model, RLS, auth, and API contracts (C1–C6) approved.
- [ ] Supabase + Vercel environments live with migrations/seeds running (A6, A7, E2).
- [ ] CI with lint/type-check/tests enforcing on every PR (F1–F3).
- [ ] **Only then** is Sprint 1 (feature implementation) unblocked.

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Stack approval delayed, blocking scaffolding | Owners timebox A1 to the first planning session |
| Google Books quota/ToS constraints | C4 validates quota + terms before E4 builds the service layer |
| RLS policy complexity causing data leaks | C3 + E3: policy matrix first, then automated positive/negative tests |
| Scope creep into features before requirements | Hard gate: no feature branches until Sprint 0 exit criteria pass |

---

## Suggested Cadence

- **Day 1–2:** A1 stack approval + A2–A5 scaffolding in parallel; B1 requirements kickoff.
- **Day 3–5:** B2–B6 design; C1–C6 data/API design; A6–A8 environments + repo hygiene.
- **Week 2:** E1–E4 implementation of the designed data/auth layers; F1–F4 CI/observability.
- **End of Sprint 0:** Owner review of all exit criteria; go/no-go for Sprint 1.

> Next step: the project owner reviews this plan, approves or amends the proposed stack, and confirms which roles will be filled.
