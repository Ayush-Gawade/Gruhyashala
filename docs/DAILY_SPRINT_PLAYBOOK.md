# Daily Sprint Playbook

This playbook defines how the team runs **one-day sprints**. It applies to setup, maintenance, and (once approved) product work.

## 1. Daily Rhythm

| Time                  | Activity                                                                 | Output                                        |
| --------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| Start of day (15 min) | Planning: pick one task per lane, confirm dependencies, surface blockers | Board updated, owners named                   |
| During the day        | Build, review, verify                                                    | Small, reviewable commits                     |
| End of day (15 min)   | Demo/verification against acceptance criteria                            | Evidence (command output, screenshots, links) |
| End of day (10 min)   | Retro: what helped, what blocked, one improvement                        | One action for tomorrow                       |
| End of day (5 min)    | Written summary                                                          | Done / remaining / blockers / next day        |

**One summary per day**, not per task.

## 2. Board

Columns: `Backlog → Ready → In Progress → Review → Done` and a separate `Blocked` lane.

Lane labels: `lane:repo`, `lane:stack`, `lane:env`, `lane:planning`.

Type labels: `setup`, `docs`, `ci`, `decision`, `owner-action`.

Rules:

- **WIP limit:** 1 item per lane in `In Progress`.
- An item is `Ready` only when it has a deliverable and a Definition of Done.
- `Blocked` items must state the blocker and the owner who can unblock.
- `Done` requires evidence, not just a merged commit.

## 3. Definition of Ready

- Deliverable is named and testable.
- Dependencies are identified and available.
- Owner role is assigned.
- No credentials or paid resources are required — or they are explicitly marked as owner actions.

## 4. Definition of Done

1. Deliverable exists in the repository (or is verifiably configured).
2. Acceptance criteria are met and demonstrated.
3. Lint, type-check, tests, and build pass where applicable (`npm run verify`).
4. Documentation is updated.
5. No secrets or environment files are committed.
6. Evidence is linked in the PR or daily summary.
7. Owner sign-off recorded when the item is marked **Owner decision**.

## 5. Roles

| Role                        | Daily responsibility                                                |
| --------------------------- | ------------------------------------------------------------------- |
| Project Owner               | Unblocks credentials, paid resources, legal choices; approves scope |
| Tech Lead                   | Runs planning, guards WIP limits, owns architecture decisions       |
| DevOps Engineer             | Repo, CI, environments, deployment preparation                      |
| Front-End Developer         | App shell, styling, tooling that unblocks UI work                   |
| Back-End Developer          | Data/API tooling and local services                                 |
| QA Engineer                 | Test harness, verification evidence                                 |
| Product Analyst / Designers | Idle for setup; engaged when requirements/design are approved       |

## 6. Blockers and Owner Actions

Escalate immediately when a task needs:

- credentials or environment files,
- a paid cloud resource,
- a legal decision (license, terms),
- GitHub repository settings.

Mark the item `Blocked` + `owner-action`, continue in another lane, and include it in the daily summary. Never store secrets in chat, issues, commits, or docs.

## 7. Metrics

Track daily, not as a performance score:

- **Throughput:** items completed per day.
- **Carryover:** items moved to the next day and why.
- **Blocked time:** days an item waits on an owner action.
- **CI health:** first-run pass rate on pull requests.

## 8. Commit and PR Conventions

- Branches: `setup/<topic>`, `feat/<topic>`, `fix/<topic>`, `docs/<topic>`.
- Commits: Conventional Commits (`chore:`, `docs:`, `ci:`, `feat:`, `fix:`, `test:`).
- One logical change per commit.
- PRs must state what changed, how it was verified, and any blockers.

## 9. Daily Summary Template

```md
## Day N — <theme>

**Done**

- ...

**Verification**

- command / result

**Remaining**

- ...

**Blocked**

- item — blocker — owner action needed

**Next day**

- ...
```
