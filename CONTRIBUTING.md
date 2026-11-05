# Contributing

## Branching

Create branches from `main`:

| Prefix   | Use                                    |
| -------- | -------------------------------------- |
| `setup/` | repository, environment, tooling       |
| `docs/`  | documentation and plans                |
| `ci/`    | pipelines and automation               |
| `feat/`  | product features (only after approval) |
| `fix/`   | bug fixes                              |

Use short, descriptive names: `setup/ci-cache`, `docs/daily-sprints`.

## Commits

Use Conventional Commits:

```text
<type>(<optional scope>): <summary>
```

Types: `chore`, `docs`, `ci`, `test`, `feat`, `fix`, `refactor`.

Keep each commit to one logical change.

## Pull Requests

1. Push the branch and open a PR against `main`.
2. Fill in the PR template: summary, verification, blockers.
3. CI must pass: lint, type-check, tests, build.
4. A PR is mergeable when its acceptance criteria are met and evidence is included.
5. No secrets, `.env` files, or generated build output.

## Local Verification

Run the same gates as CI before pushing:

```bash
npm run verify
```

## Scope Rule

Until product requirements and technical decisions are approved, PRs must be limited to setup, documentation, tooling, and CI. Do not add product features, database schemas, or product UI.

## Daily Sprint Flow

1. Pick one task per lane from [docs/SPRINT_PLAN.md](docs/SPRINT_PLAN.md).
2. Confirm the Definition of Ready in [docs/DAILY_SPRINT_PLAYBOOK.md](docs/DAILY_SPRINT_PLAYBOOK.md).
3. Deliver, verify, and post one end-of-day summary.

## Reporting Blockers

Mark the task `Blocked` + `owner-action`, identify who can unblock it, and continue in another lane. Never share credentials in issues, PRs, or chat.
