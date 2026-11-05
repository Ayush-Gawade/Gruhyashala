# Daily Sprint Plan

> **Scope guardrail:** this plan covers **non-product setup only** — repository, tech stack, development environment, tooling, and sprint operations. Product features remain out of scope until requirements and technical decisions are approved. No feature branches are opened before that gate.

## Operating Model

- **1 day = 1 sprint.** Each day has one theme, a small set of deliverables, and an end-of-day summary.
- **Four lanes run in parallel** (see below). A person owns at most one active task per lane.
- **WIP limit:** 1 task per lane per day; anything else waits in the ready queue.
- **Daily rhythm:** 15-min planning → build → 15-min demo/verification → 10-min retro → written summary.
- **Carryover:** unfinished work moves to the next day only with a written reason; no silent carryover.
- **Blocked work is parked visibly**; the team pulls the next ready task from another lane.

### Lanes

| Lane                          | Focus                        | Typical tasks                                                    |
| ----------------------------- | ---------------------------- | ---------------------------------------------------------------- |
| **R — Repository & Git**      | Branching, PRs, repo hygiene | `.gitignore`, branch protection, PR template, commit conventions |
| **S — Stack & Docs**          | Decisions and documentation  | Tech stack, ADR log, README, onboarding                          |
| **E — Environment & Tooling** | Local dev, scripts, CI       | Scaffold, lint/format, tests, CI, env template                   |
| **P — Planning & Operations** | Sprint mechanics             | Board, labels, DoD, daily summary template, metrics              |

## Task Inventory

Status as of the foundation pass: ✅ done, ▶ in progress, ⬜ backlog.

| ID  | Task                                                                   | Lane | Depends on | Parallel with | Deliverable                     | Definition of Done                                        | Status |
| --- | ---------------------------------------------------------------------- | ---- | ---------- | ------------- | ------------------------------- | --------------------------------------------------------- | ------ |
| R1  | Initialise repository, `.gitignore`, branch `setup/project-foundation` | R    | —          | S1, P1        | Clean repo + ignore rules       | No secrets tracked; branch pushed                         | ✅     |
| R2  | Contribution workflow (branch naming, commit format, PR checklist)     | R    | R1         | S2            | `CONTRIBUTING.md`, PR template  | A new contributor can follow it unaided                   | ✅     |
| R3  | Open pull request for foundation work                                  | R    | R1, R2     | E3            | PR against `main`               | PR links files and test evidence                          | ✅     |
| S1  | Finalise tech stack                                                    | S    | —          | R1, P1        | `docs/TECH_STACK.md`            | Every technology has role/rationale/alternatives/decision | ✅     |
| S2  | Record decision log                                                    | S    | S1         | R2            | `docs/DECISIONS.md`             | Decisions dated, owners flagged                           | ✅     |
| S3  | README and onboarding handoff                                          | S    | S1, E4     | P3            | Updated `README.md`             | Fresh-clone path documented and verified                  | ✅     |
| E1  | Scaffold Next.js + TypeScript + Tailwind (placeholder only)            | E    | S1         | R2            | Buildable app shell             | `npm run dev` and `npm run build` pass                    | ✅     |
| E2  | Lint, format, type-check, test tooling                                 | E    | E1         | P2            | Scripts + configs               | `npm run verify` passes                                   | ✅     |
| E3  | CI pipeline                                                            | E    | E2, R1     | P2            | `.github/workflows/ci.yml`      | CI runs lint/typecheck/test/build on PRs                  | ✅     |
| E4  | Environment variable contract                                          | E    | S1         | P2, R2        | `.env.example` + docs           | Every variable documented; no real values                 | ✅     |
| P1  | Daily sprint plan                                                      | P    | —          | R1, S1        | `docs/SPRINT_PLAN.md`           | Dated days, deliverables, dependencies, DoD               | ✅     |
| P2  | Daily sprint playbook                                                  | P    | P1         | E2            | `docs/DAILY_SPRINT_PLAYBOOK.md` | Ceremonies, board, DoR/DoD, metrics defined               | ✅     |
| P3  | Sprint board structure and labels                                      | P    | P2         | S3            | Board conventions in playbook   | Columns/labels/WIP limits documented                      | ✅     |
| V1  | Clean-clone verification                                               | E    | E1–E4      | P3            | Verification log in PR          | `npm ci && npm run verify` passes from a clean clone      | ▶      |
| V2  | Merge readiness review                                                 | R    | V1         | —             | PR ready for merge              | CI green, docs complete, no blockers                      | ⬜     |

## Daily Sprints

### Day 1 — Repository and Git baseline

- **Lane R:** R1, R3 · **Lane S:** S1 · **Lane P:** P1
- **Deliverables:** repo initialised, `.gitignore`, foundation branch, PR open, stack doc, daily plan.
- **DoD:** no secrets tracked; branch pushed; PR visible; docs reviewed by the owner when available.
- **Status:** ✅ completed.

### Day 2 — Stack finalisation and decision log

- **Lane S:** S1, S2 · **Lane R:** R2 · **Lane P:** P2
- **Deliverables:** approved stack doc, decision log, contributing guide, playbook.
- **DoD:** every technology has a decision; unresolved items are flagged as owner actions.
- **Status:** ✅ completed.

### Day 3 — Local development environment

- **Lane E:** E1, E4 · **Lane S:** S3 · **Lane P:** P3
- **Deliverables:** minimal Next.js + TypeScript + Tailwind shell, `.nvmrc`, env template, README quick start.
- **DoD:** fresh clone → `npm ci` → `npm run dev` renders the placeholder; `npm run build` succeeds without secrets.
- **Status:** ✅ completed.

### Day 4 — Quality gates and CI

- **Lane E:** E2, E3 · **Lane P:** P3
- **Deliverables:** ESLint, Prettier, Vitest smoke test, `verify` script, GitHub Actions workflow.
- **DoD:** `npm run verify` passes locally; CI workflow is green on the PR.
- **Status:** ✅ completed.

### Day 5 — Environment and deployment preparation

- **Lane E:** E4 · **Lane S:** S3
- **Deliverables:** documented variable matrix, local/preview/production contract, owner provisioning checklist.
- **DoD:** all variables documented; no credentials in Git; owner knows exactly what to create.
- **Status:** ✅ completed except owner-supplied credentials.

### Day 6 — Daily sprint operating model

- **Lane P:** P2, P3 · **Lane R:** R2
- **Deliverables:** playbook, board conventions, DoR/DoD, summary template, role RACI.
- **DoD:** each future day can start with 15-min planning and end with one written summary.
- **Status:** ✅ completed.

### Day 7 — Verification and handoff

- **Lane E:** V1 · **Lane R:** V2 · **Lane S:** S3
- **Deliverables:** clean-clone verification, PR updated with evidence, final summary.
- **DoD:** `npm ci && npm run verify` passes from a fresh clone; PR has test evidence; blockers listed.
- **Status:** ▶ in progress (this pass).

## Remaining Non-Product Backlog

| ID  | Task                                  | Lane | Depends on | Notes                                   |
| --- | ------------------------------------- | ---- | ---------- | --------------------------------------- |
| R4  | Enable branch protection on `main`    | R    | R3         | Requires repository admin; owner action |
| R5  | Add license                           | R    | —          | Owner decision (legal)                  |
| E5  | Add Playwright when UI work starts    | E    | E2         | Deferred until user flows exist         |
| S4  | Design-token documentation            | S    | S1         | Needs design approval                   |
| E6  | Supabase local stack smoke test       | E    | E4         | Requires Supabase CLI + Docker          |
| P4  | Sprint board created in issue tracker | P    | P3         | Board conventions already documented    |
| V2  | Merge foundation PR                   | R    | V1         | After CI green and owner review         |

## Dependencies (compact)

```
R1 ── R2 ── R3 ── V2
 │      │
S1 ── S2 ── S3
 │
E1 ── E2 ── E3
 │      │
E4 ─────┘
P1 ── P2 ── P3
```

- **Critical path:** S1 → E1 → E2 → E3 → V1 → V2.
- **Runs in parallel from Day 1:** R, S, and P lanes.
- **Owner-gated:** Supabase/Vercel provisioning, Google Books key, license, branch protection.

## Roles (RACI, roles not people)

| Activity                     | Responsible         | Accountable   | Consulted          | Informed |
| ---------------------------- | ------------------- | ------------- | ------------------ | -------- |
| Repo & Git workflow          | DevOps Engineer     | Tech Lead     | Project Owner      | Team     |
| Stack & decisions            | Tech Lead           | Project Owner | Security Engineer  | Team     |
| Dev environment & tooling    | Front-End Developer | Tech Lead     | Back-End Developer | Team     |
| CI & quality gates           | DevOps Engineer     | Tech Lead     | QA Engineer        | Team     |
| Sprint planning & board      | Tech Lead           | Project Owner | Team               | Team     |
| Credentials / cloud accounts | Project Owner       | Project Owner | Tech Lead          | Team     |

## How Setup Tasks Fit Daily Sprint Planning

1. **Start of day (15 min):** triage blockers. Any setup/environment task that blocks someone is pulled first and gets a named owner for the day.
2. **Capacity rule:** until product work is approved, setup work may use 100% of capacity. After approval, reserve **10–20%** of each day for setup/maintenance so tooling debt does not accumulate.
3. **One deliverable per lane per day.** Setup tasks are sized to fit a day; larger work is split.
4. **End of day:** demo the deliverable, update the board, post one summary (done / remaining / blockers / next day).
5. **Escalation:** anything requiring credentials, paid resources, or legal choices is marked **Owner decision** and moved to the blocked column immediately — the team continues on other lanes.

## Out of Scope (Until Approved)

- Product requirements, user stories, and acceptance criteria for library features.
- Database schema, RLS policies, and API contracts for product data.
- UI design, components, and user flows.
- Any product feature implementation or production deployment.
