---
name: safe-agent-workflow
description: Use before any non-trivial build or change task in MockMate — new features, refactors, backend/database edits, or anything touching more than a line or two. Keeps AI-written changes reviewable and prevents silent wrong guesses.
---

# Safe agent workflow

This is the habit that keeps AI-built code sane. Follow it on any task bigger
than a one-line fix.

## 1. Before writing code, produce a DOING-NOW vs BLOCKED map — then wait

List two columns and show them before touching any file:

- **DOING NOW** — the concrete steps you're about to take, in order.
- **BLOCKED** — anything you need a decision on, are unsure about, or where the
  request disagrees with what the code actually does.

Then **stop and wait for confirmation.** Do not start until the human agrees.
This catches wrong assumptions before they become wrong code.

## 2. Stop before database / schema migrations for review

A "migration" changes the database's structure and is hard to undo. In this
project that means edits to `backend/prisma/schema.prisma` and running
`npm run prisma:migrate` (Prisma). Before running a migration:

- Show exactly what the schema change is.
- Explain what it adds/removes.
- **Wait for a look** before running the migrate command.

Never run a migration as a surprise inside a larger change.

## 3. Flag conflicts and ambiguity — never guess

If the task says one thing but the code does another, **stop and say so.** Put it
in the BLOCKED column. Guessing is how AI quietly introduces bugs. A flagged
question costs a minute; a wrong guess costs a debugging session.

## 4. Keep changes small; don't touch working code

- Make the smallest change that does the job.
- Do **not** edit, "improve", or refactor code the task didn't ask you to touch.
- Fewest files, shortest working diff.
- Work in phases — one clear chunk at a time, each easy to check and undo.

## Note on ponytail

If the **ponytail** skill is installed, it already covers the "don't over-build"
side — climb the laziness ladder (does this need to exist? is it already in the
codebase? does the stdlib/platform do it? can it be one line?) before writing
anything new. This skill is about *how you communicate the plan and gate risky
steps*; ponytail is about *keeping the solution minimal*. Use both together.
