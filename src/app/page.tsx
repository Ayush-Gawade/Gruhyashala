const setupItems = [
  { label: "Repository, .gitignore and branch workflow", done: true },
  { label: "Tech stack decision log", done: true },
  { label: "Next.js + TypeScript + Tailwind scaffold", done: true },
  { label: "Lint, format, type-check and test tooling", done: true },
  { label: "CI pipeline (lint, type-check, test, build)", done: true },
  { label: "Daily sprint plan and playbook", done: true },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
        Project foundation
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Gruhyashala
      </h1>
      <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
        Library management application. This placeholder confirms the
        development environment works. No product features are implemented yet —
        product work starts only after requirements and technical decisions are
        approved.
      </p>

      <ul className="mt-8 space-y-2">
        {setupItems.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm">
            <span aria-hidden className="text-emerald-600">
              ✔
            </span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-zinc-500">
        See{" "}
        <code className="rounded bg-zinc-200 px-1 py-0.5 dark:bg-zinc-800">
          docs/SPRINT_PLAN.md
        </code>{" "}
        for the daily sprint plan and{" "}
        <code className="rounded bg-zinc-200 px-1 py-0.5 dark:bg-zinc-800">
          docs/TECH_STACK.md
        </code>{" "}
        for approved technology decisions.
      </p>
    </main>
  );
}
