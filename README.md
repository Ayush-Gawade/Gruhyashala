# Gruhyashala — Library Management App

> A library management application built with **Next.js, TypeScript, Tailwind CSS, Supabase (PostgreSQL + Auth), Google Books API, and Vercel deployment**.

## Project Status

🚧 **Initial setup / sprint planning phase.** This repository currently contains only project foundation documentation. The Next.js application has not been scaffolded yet, dependencies are not installed, and the tech stack is **proposed but not yet approved** (see [docs/TECH_STACK.md](docs/TECH_STACK.md)). Product features are out of implementation scope until requirements and technical decisions are approved (see [docs/SPRINT_PLAN.md](docs/SPRINT_PLAN.md)).

## Project Overview

Gruhyashala aims to centralise library operations — book cataloguing, member management, and lending workflows — into a single web app. The intended approach imports book metadata from the Google Books API, persists library data in Supabase PostgreSQL, secures access with Supabase Auth, and deploys on Vercel.

**Planned stack:**
| Layer | Technology |
|-------|------------|
| Framework / Language | Next.js + TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Book data | Google Books API |
| Hosting | Vercel |

See [docs/TECH_STACK.md](docs/TECH_STACK.md) for roles, rationale, alternatives, and open decisions for each technology.

## Setup Instructions

### Prerequisites (to be confirmed during setup tasks)
- Node.js (version to be pinned in `.nvmrc` / `package.json` engines once scaffolded)
- npm / pnpm / yarn (package manager to be selected)
- Git

### First-time setup
```bash
git clone https://github.com/Ayush-Gawade/Gruhyashala.git
cd Gruhyashala
git checkout setup/project-foundation
```

> The Next.js app is not yet scaffolded. Do not run `npm install` until the foundation tasks in [docs/SPRINT_PLAN.md](docs/SPRINT_PLAN.md) are approved and the app is created.

Once scaffolded, the standard workflow will be:

```bash
# Install dependencies
npm install        # or pnpm install / yarn install, per approved package manager

# Copy env template (to be created, never commit real secrets)
cp .env.example .env.local
# Fill in Supabase + Google Books keys in .env.local

# Start dev server
npm run dev        # http://localhost:3000
```

## Development Workflow

| Activity | Command / Action |
|----------|------------------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Type-check | `npx tsc --noEmit` (or project script) |
| Build | `npm run build` |
| Start (prod) | `npm run start` |
| Tests | TBD (framework to be selected in sprint planning) |

- Work on feature branches branched from `main`; do not commit directly to `main`.
- Never commit `.env.local` or any secret — `.gitignore` already excludes env files.
- Document decisions and changes in `docs/` and reference them in pull requests.

## Repository Structure (planned)

```
.
├── README.md                  # This file
├── .gitignore
├── docs/
│   ├── TECH_STACK.md          # Proposed stack, rationale, alternatives, open decisions
│   └── SPRINT_PLAN.md         # Sprint tasks, owners (roles), dependencies, acceptance criteria
├── .env.example               # To be created (placeholder keys only)
├── app/ or src/               # Next.js application (to be scaffolded)
└── ...                        # Config files (to be scaffolded)
```

See [docs/SPRINT_PLAN.md](docs/SPRINT_PLAN.md) for the full task breakdown and [docs/TECH_STACK.md](docs/TECH_STACK.md) for technology decisions.

## License

TBD

## Contact

Maintainer: repository owner via GitHub (@Ayush-Gawade on GitHub).
