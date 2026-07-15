# AGENTS.md — MockMate AI

MockMate AI is a practice tool for job interviews: pick a role and difficulty, run a 3-round mock interview (multiple-choice, interview, coding), and a **real AI model** scores your answers with honest feedback. **See `docs/HANDOFF.md` for the full guide.**

These are always-on rules. Follow them every session, on every change.

---

## How this repo works

- **Frontend** — plain vanilla JavaScript served as static files. The main files are `index.html`, `app.js`, `styles.css`, and `question-bank.js`. No build step: edit a file, reload the page.
- **Backend** — an Express server using Prisma (for the database), running on **port 5000**. Lives in `backend/`; the main file is `backend/src/server.ts`.
- **Questions** — all interview questions live in **`question-bank.js`** (frontend). Shape: `QUESTION_BANK[roleId][level][round]`.
- **Scoring** — answers are graded by a real AI model (Groq) through the backend route **`/api/evaluate`**. The frontend sends answers there; the backend calls the model.

---

## RULE 1 — Real AI only, never fake a score (no-fake-ai)

MockMate's whole point is that scores come from a **real AI model**, not a made-up number. The original app faked its "AI" with random numbers and answer length. Never let that back in.

**All scoring MUST go through the real Groq path** — the `/api/evaluate` route in `backend/src/server.ts`, which calls `callGroqJSON(...)` (the real Groq API). Follow-ups and recommendations go through `callGroqJSON` too.

**Banned — reject these if any plan, prompt, or draft suggests them:**

- Scoring by **string length** (a longer answer is not a better answer).
- Scoring by **random numbers**.
- Scoring by **keyword grep** / counting matched words.
- Scoring from a **static lookup table** (a fixed "this level = this score" map).

If asked to do any of these, refuse and route through the real model call instead.

**On failure: error, never fake.** When the Groq call fails (missing/bad key, network problem, bad response), the code returns an **HTTP 502** and the frontend records a score of **0** with a "try again / check the backend and GROQ_API_KEY" message. A visible error is correct; a silent fake number is not. Keep it that way.

**Randomness is fine for non-scoring things** — generating ID numbers, shuffling MCQ options, cosmetic labels. `Math.random()` is banned *only* for scoring. Don't flag ID generation or option shuffling as violations.

---

## RULE 2 — Safe agent workflow (safe-agent-workflow)

Follow this on any task bigger than a one-line fix — new features, refactors, backend or database edits.

1. **Plan first, then wait.** Before touching any file, show two columns and stop:
   - **DOING NOW** — the concrete steps you're about to take, in order.
   - **BLOCKED** — anything you need a decision on, are unsure about, or where the request disagrees with what the code actually does.

   Wait for an "OK" before you start. This catches wrong assumptions before they become wrong code.

2. **Stop before any database / schema migration for review.** A migration changes the database's structure and is hard to undo. Here that means editing `backend/prisma/schema.prisma` and running the Prisma migrate command. Before running one: show exactly what changes, explain what it adds/removes, and **wait for a look**. Never run a migration as a surprise inside a bigger change.

3. **Flag conflicts — never guess.** If the task says one thing but the code does another, stop and say so (put it in BLOCKED). A flagged question costs a minute; a wrong guess costs a debugging session.

4. **Keep changes small; don't touch working code.** Make the smallest change that does the job. Do not edit, "improve", or refactor code the task didn't ask about. Fewest files, shortest working diff. Work in phases — one clear chunk at a time, each easy to check and undo.

---

## RULE 3 — Adding roles or questions (add-question-set)

To add a new role, level, or round of questions, follow the **content recipe in `docs/HANDOFF.md`** plus the **`// TODO` shape marker** in `question-bank.js` (it lists the 10 un-authored roles: `fullstack, data-analyst, data-scientist, agentic, devops, cyber, mobile, uiux, cloud, pm`).

Questions live in `question-bank.js` at `QUESTION_BANK[roleId][level][round]`:

- `level` — `easy`, `medium`, or `advanced`
- `round` — `mcq`, `interview`, or `coding`

Per-round fields:

- **MCQ:** `{ text, options: [4 strings], correct: <index>, explanation }`
- **Interview:** `{ text, hint, modelAnswer }`
- **Coding:** `{ text, hint, modelAnswer }` — for non-coding roles (`uiux`, `pm`) use the same shape as a short case study.

Required counts per level:

| Level    | MCQ | Interview | Coding |
|----------|-----|-----------|--------|
| easy     | 5   | 2         | 1      |
| medium   | 7   | 3         | 1      |
| advanced | 10  | 4         | 2      |

**Workflow: generate → human-review → paste.**

1. **Generate offline** with an LLM following the shape above — don't hand-type ~126 questions.
2. **A human reviews every set** (correct answers, no duplicates, difficulty matches the level, explanations say *why*). Not optional — AI drafts contain wrong and mis-leveled questions.
3. **Paste into `question-bank.js`** under the correct role key, then flip that role's `authored: false` to `authored: true` in the `ROLES` list at the top.

**The MCQ answer is stored as an index, and shuffling is safe.** `correct` is the position of the right option in your `options` list (`0` = first, `1` = second, …). You don't need to pre-shuffle: at render time the app tags each option with its correctness **first**, then shuffles, so correctness rides with the option. Just write the index of the right answer.
