# Gruhyashala — Library Management App

Repository foundation for a library management application built with **Next.js, TypeScript, Tailwind CSS, Supabase (PostgreSQL + Auth), Google Books API, and Vercel**.

## Status

🚧 **Foundation only.** The repository contains a minimal buildable app shell, development tooling, CI, and planning docs. **No product features are implemented.** Product work starts only after requirements, design, and data/API decisions are approved.

- Approved stack and decisions: [docs/TECH_STACK.md](docs/TECH_STACK.md), [docs/DECISIONS.md](docs/DECISIONS.md)
- Daily sprint plan: [docs/SPRINT_PLAN.md](docs/SPRINT_PLAN.md)
- Daily sprint playbook: [docs/DAILY_SPRINT_PLAYBOOK.md](docs/DAILY_SPRINT_PLAYBOOK.md)

## Quick Start

```bash
git clone https://github.com/Ayush-Gawade/Gruhyashala.git
cd Gruhyashala
git switch main
npm ci
npm run dev
```

Open <http://localhost:3000>. The placeholder page confirms the environment works.

### Requirements

- Node.js **24** (see `.nvmrc`); minimum supported is Node 20.
- npm 10+ (lockfile is committed).
- Docker (only needed later for the local Supabase stack).

### Environment Variables

Copy the template and fill in values **locally**:

```bash
cp .env.example .env.local
```

`.env.local` is git-ignored. Never commit real keys, and never paste secrets into chat or issues. The variables and their owners are documented in [docs/TECH_STACK.md](docs/TECH_STACK.md). No environment variables are required to run the placeholder or the build.

## Scripts

| Command                           | Purpose                                             |
| --------------------------------- | --------------------------------------------------- |
| `npm run dev`                     | Start the dev server                                |
| `npm run build`                   | Production build                                    |
| `npm run start`                   | Run the production build                            |
| `npm run lint`                    | ESLint                                              |
| `npm run typecheck`               | TypeScript, no emit                                 |
| `npm test`                        | Vitest unit tests                                   |
| `npm run test:coverage`           | Tests with coverage thresholds                      |
| `npm run format` / `format:check` | Prettier                                            |
| `npm run verify`                  | Lint → type-check → test → build (same gates as CI) |

## Repository Structure

```text
.
├── .github/workflows/ci.yml      # lint, type-check, test, build
├── docs/
│   ├── TECH_STACK.md             # approved stack, rationale, alternatives, owner actions
│   ├── DECISIONS.md              # dated decision log
│   ├── SPRINT_PLAN.md            # daily sprints, tasks, dependencies, DoD
│   └── DAILY_SPRINT_PLAYBOOK.md  # daily rhythm, board, DoR/DoD, metrics
├── src/app/                      # minimal Next.js App Router shell (placeholder)
├── src/lib/                      # shared utilities + smoke test
├── supabase/                     # (future) migrations and seeds — not created yet
├── .env.example                  # variable names and safe placeholders
├── CONTRIBUTING.md               # branch, commit, PR workflow
└── package.json
```

## Workflow

- `main` is the integration branch; work happens on `setup/*`, `docs/*`, `ci/*`, `feat/*`, or `fix/*` branches.
- Every change goes through a pull request. CI must pass (lint, type-check, test, build).
- Commits follow Conventional Commits.
- See [CONTRIBUTING.md](CONTRIBUTING.md).

## Owner Actions (Not Automated)

These require the repository owner because they involve credentials, paid resources, or legal choices:

1. Create the Supabase project; put the URL, anon key, and service role key in `.env.local` (never in Git).
2. Decide Google Books API key/quota usage.
3. Create/link the Vercel project and configure environment variables.
4. Approve the license and custom domain (if any).
5. Enable branch protection on `main` if desired.

## License

Not set — owner decision (see [docs/DECISIONS.md](docs/DECISIONS.md), D-015).
