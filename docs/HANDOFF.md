# MockMate AI — Handoff

Welcome! This document is your map. It explains what MockMate AI is, how to run
it, what already works, what's left to build, and the few things you must be
careful about. It's written for someone who is new to "vibe-coding" (building
software by chatting with an AI agent instead of typing every line yourself).
You're smart — you just haven't seen this codebase yet. By the end of this page
you'll know your way around.

Jargon note: when a technical word shows up for the first time, it gets a short
plain-English meaning right after it. Don't worry if a term is new.

---

## 1. What MockMate is

MockMate AI is a practice tool for job interviews. You pick a role (like
Frontend Developer) and a difficulty level, and it runs you through a 3-round
mock interview: multiple-choice questions, spoken/typed interview questions, and
a coding question. A real AI model reads your answers and gives you a score plus
honest feedback — strengths, things to improve, and a model answer. It also
keeps a history of your past sessions and shows analytics so you can see
yourself improving.

---

## 2. Set up by: ______________________________

*(Previous developer: put your name/handle here, or delete this line.)*

---

## 3. Quickstart — how to actually run it

The app has two parts:

- A **backend** — a small server (in the `backend/` folder) that talks to the AI
  and to the database. "Backend" just means the part the user never sees
  directly; it does the thinking behind the scenes.
- A **frontend** — the web page you look at (`index.html`, `app.js`,
  `styles.css`, `question-bank.js` in the top folder). "Frontend" means the part
  that runs in your browser.

You'll run both at the same time, each in its own terminal window.

### Step A — Get your own AI key

MockMate uses **Groq** to run the AI. Groq is a service that runs AI models very
fast. To use it you need an **API key** — think of it as a password that lets
the app call the AI on your account.

1. Go to **https://console.groq.com/keys** and create a free key. It looks like
   a long string starting with `gsk_...`.
2. In a terminal, go into the backend folder and make your own settings file:
   ```bash
   cd backend
   cp .env.example .env
   ```
   `.env` is a file that holds secret settings. `cp .env.example .env` copies the
   example template into a real file you can fill in.
3. Open `backend/.env` in your editor and paste your key after `GROQ_API_KEY=`
   so the line reads:
   ```
   GROQ_API_KEY=gsk_your_key_here
   ```
   The other two lines (`GROQ_MODEL` and `PORT`) already have good defaults —
   leave them alone.

**Never commit your `.env` file.** "Commit" means saving a snapshot into Git
(the version-history system). Your key is a secret; it must not go into the
project history. The project is already set up to ignore it. Prove it to
yourself:
```bash
git check-ignore backend/.env
```
If it prints `backend/.env`, Git is ignoring it — you're safe. If it prints
nothing, stop and ask before committing anything.

### Step B — Run the backend

In your first terminal:
```bash
cd backend
npm install      # only the first time — downloads the code libraries
npm run dev
```
You should see: `MockMate Backend server running on http://localhost:5000`.
Leave this terminal open. `:5000` is the "address" the backend listens on.

### Step C — Run the frontend

In a **second** terminal, from the top project folder (not inside `backend`):
```bash
python3 -m http.server 5500
```
This serves the web page on `http://localhost:5500`. Open that address in your
browser.

### What a working run looks like

You land on the home page, click through to log in (any email/password works —
see the honesty note in section 6), pick a role and level, and do an interview.
When you finish a round, the app sends your answers to the backend, the backend
asks Groq to grade them, and you get a real score with feedback. History and
analytics fill in from there.

### The one gotcha (this is by design, not a bug)

If your key is missing or wrong, grading fails with an **HTTP 502** error. HTTP
status codes are short numbers a server sends back; **502 means "the thing I
depend on (the AI) failed."** MockMate does this **on purpose**. It will *never*
make up a fake score when the AI is unavailable — it would rather show an error.
In the app you'll see a message like *"AI evaluation unavailable — check the
backend and GROQ_API_KEY."* That means: fix your key or make sure the backend is
running. (Why this matters so much is explained in section 9.)

---

## 4. What's already been done

Quite a lot works already:

- **The setup wizard** — the screens where you pick a role, a difficulty level,
  and start a session.
- **The question bank** — a big organized list of interview questions living in
  `question-bank.js`. It's structured as
  `QUESTION_BANK[role][level][round]` (more on this in section 7).
- **The 3-round interview engine** — each session runs three rounds: MCQ
  (multiple-choice), interview (open questions), and coding.
- **Multiple-choice (MCQ) round** — questions with four options; it shuffles the
  options each time and tells you the correct one with an explanation.
- **Real AI grading, per round** — your open and coding answers go to the real
  Groq model through the backend (`/api/evaluate`). It also generates adaptive
  follow-up questions (`/api/followup`) and level-aware recommendations
  (`/api/recommend`).
- **Results, history, and analytics** — scores are saved to a database, past
  sessions are listed, and charts show your progress over time.

---

## 5. What's LEFT to do

The honest gap is **content, not code**. The engine works; it just doesn't have
all its questions yet.

- There are **14 roles** in the picker, but only **4 are actually written**:
  `frontend`, `backend`, `genai` (GenAI / LLM Engineer), and `hr`. These are
  marked `authored: true` in the `ROLES` list in `question-bank.js`.
- The other **10 roles are empty**: `fullstack`, `data-analyst`,
  `data-scientist`, `agentic`, `devops`, `cyber`, `mobile`, `uiux`, `cloud`,
  `pm`. Until someone writes them, the app quietly falls back to a related
  written role (each role has a `fallback` listed). So the app still runs — the
  user just gets a stand-in role's questions.
- Even the 4 written roles are **thin at the "advanced" level**. The bank's own
  rule (in the TODO comment near the bottom of `question-bank.js`) says advanced
  should have **10 multiple-choice / 4 interview / 2 coding** questions, but the
  written advanced sets currently have around **6 / 2 / 2**. So advanced needs
  topping up too.

None of this requires new code. It's writing and checking questions. Section 7
is the recipe for doing it well.

---

## 6. Known risks — NOT production-ready yet

This is a solid demo for **one person on their own laptop**. It is **not** ready
to put in front of real users on the internet yet. Here's the honest list so you
don't ship it thinking it's safe.

### XSS: user text is injected into the page unescaped
XSS ("cross-site scripting") is when a user types something that contains hidden
HTML or code, and the page runs it instead of just showing it. It can hijack the
page. In `app.js` there are **more than 50 spots** (about 54) that build the page
by dropping text straight into `innerHTML` (a way of setting a chunk of the page
from a string). For example, MCQ explanations and the many "view" functions that
render screens do this. On your own machine with your own text, that's fine. But
if real strangers can type answers that show up on the page, this becomes risky
and must be cleaned up first (escape the text, or use safe DOM methods).

### Auth is fake — everyone is the same person
"Auth" (authentication) is the login system. Right now the login and signup
screens are **visual only**. Look at the login handler in `app.js` (around line
815): it ignores the email and password you type and just flips a
`isLoggedIn` switch to true. There's one hardcoded user in the database
(`user-1`, seeded as "Rahul"), and **every visitor becomes that same user**.
There are no real accounts yet. Fine for a demo; must be built for real before
multiple people use it.

### The question bank lives in the FRONTEND — don't duplicate it on the backend
The multiple-choice questions the interview engine uses come from
`question-bank.js`, which runs **in the browser** (frontend). So your AI agent
should **never build a backend endpoint to serve MCQ questions**. It would just
copy the same data to the server and become dead, unused code — more to maintain,
nothing gained. (Heads-up so you're not confused: the backend *does* have a tiny
old `/api/questions` route with a few sample questions, but the real 3-round
engine does **not** use it for MCQs. Don't grow that route; don't add a new one.)

---

## 7. The content recipe — how to add the missing 10 roles the RIGHT way

This is the main work left. Do it in a way that stays sane.

### Don't hand-type everything
Each role needs all 3 levels × 3 rounds. At the target counts that's roughly
**126 questions per role**. Typing those by hand is slow and error-prone. Instead:

1. **Generate offline with an LLM.** Ask an AI model to draft a full role
   following the exact shape below. "Offline" here just means: do it as a
   separate drafting step, not something the running app does.
2. **A human reviews every set.** AI drafts have wrong answers, duplicates, and
   questions that are too easy or too hard. A person must read each one. Use the
   checklist below.
3. **Paste into `question-bank.js`** as a new role key, following the TODO shape
   marker that's already in the file (near the bottom, starting
   `// TODO — remaining 10 roles are NOT authored yet`). Also flip that role's
   `authored: false` to `authored: true` in the `ROLES` list at the top.

### The exact shape to follow

The bank is `QUESTION_BANK[roleId][level][round]`, where `level` is one of
`easy`, `medium`, `advanced`, and `round` is one of `mcq`, `interview`, `coding`.
Here's a real authored example (copied from the `frontend` → `easy` block) so you
can see each round's shape:

```js
frontend: {
  easy: {
    mcq: [
      { text: "What does HTML stand for?", options: ["Hyperlinks Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language", "HyperText Machine Language"], correct: 1, explanation: "HTML = HyperText Markup Language — the standard markup language for web pages." },
      // …5 total for easy
    ],
    interview: [
      { text: "What is the DOM and how does JavaScript interact with it?", hint: "Tree of nodes; getElementById / querySelector; event listeners.", modelAnswer: "The DOM (Document Object Model) is a tree representation of the HTML document…" },
      // …2 total for easy
    ],
    coding: [
      { text: "Write JavaScript to toggle the CSS class 'active' on a button each time it is clicked.", hint: "addEventListener('click') + classList.toggle.", modelAnswer: "const btn = document.querySelector('button');\nbtn.addEventListener('click', () => {\n  btn.classList.toggle('active');\n});" }
      // …1 for easy, 2 for advanced
    ]
  },
  medium:   { mcq: [ /* 7 */ ], interview: [ /* 3 */ ], coding: [ /* 1 */ ] },
  advanced: { mcq: [ /* 10 */ ], interview: [ /* 4 */ ], coding: [ /* 2 */ ] }
},
```

Shapes per round:
- **MCQ:** `{ text, options: [4 strings], correct: <index>, explanation }`
- **Interview:** `{ text, hint, modelAnswer }`
- **Coding:** `{ text, hint, modelAnswer }` — for non-coding roles (like `uiux`,
  `pm`) use this same coding shape as a short **case study** instead.

Required counts per level (this is the bank's own rule):

| Level     | MCQ | Interview | Coding |
|-----------|-----|-----------|--------|
| easy      | 5   | 2         | 1      |
| medium    | 7   | 3         | 1      |
| advanced  | 10  | 4         | 2      |

### Important: the "correct" answer is safe to shuffle
In the MCQ shape, `correct` is the **position** (index) of the right option in
your `options` list — `0` is the first option, `1` the second, and so on. You
might worry: "if the app shuffles the options, won't the index point to the wrong
one?" It won't. When the app shows a question (`app.js`, around line 1956), it
first tags each option with whether it's correct, **then** shuffles. So
correctness travels *with the option itself* (its identity), not with its
original slot. You just write the index of the right answer in your list; the app
handles the rest. Shuffling is safe.

### Review checklist (run this on every question)
- [ ] Exactly **4 options** for each MCQ.
- [ ] Exactly **one** option is correct, and `correct` points to it.
- [ ] Difficulty matches the level (easy is genuinely easy; advanced is genuinely
      hard — not just a longer easy question).
- [ ] **No duplicate options** inside a question, and no two options that mean the
      same thing.
- [ ] The `explanation` actually explains *why* the right answer is right.
- [ ] Interview/coding `modelAnswer` is correct and something a strong candidate
      would actually say/write.

---

## 8. How my AI handled this project (learn this working method)

This is the part that keeps AI-built code from turning into a mess. The way we
worked together mattered as much as what we built:

- **We worked in phases.** One clear chunk at a time, not "build the whole thing
  at once." Small steps are easy to check and easy to undo.
- **The AI produced a "DOING vs BLOCKED" map before writing code.** Before
  touching anything, it listed what it was about to do *right now* versus what it
  was *blocked on* (needed a decision, or was unclear). I confirmed the plan
  before it started. This catches wrong assumptions before they become wrong
  code.
- **We stopped before the database migration to check it.** A "migration" is a
  change to the database's structure (its shape) — it's hard to undo once it
  runs. So the AI paused, showed the change, and waited for a look before running
  it.
- **We made the AI flag conflicts instead of guessing.** When something in the
  request disagreed with what the code actually did, the AI stopped and said so
  rather than picking one and hoping. (Guessing is how AI quietly introduces
  bugs.)

Three of these habits are saved as reusable skills for your own agent — see the
list at the end. Use them.

---

## 9. The landmine — never let fake AI back in

The **original** version of this app faked its "AI." It made up scores from
**random numbers** and the **length of your answer** — a longer answer looked
smarter, regardless of whether it was right. That is the single worst thing about
this project and the #1 thing to never allow back.

Everything real about MockMate depends on scoring going through the **real Groq
model call**. The code is deliberately built to protect this:
- Grading happens in `gradeAnswers` (`app.js`) → the backend `/api/evaluate` →
  the real model. Its comment literally says *"No random fallback."*
- The recommendation route says *"Replaces any static 'score × level' lookup
  table with a real model call."*
- When the AI fails, the app returns an **error (502)** and shows a score of 0
  with a "try again" message — it does **not** substitute a fake number.

So: **if your AI agent ever suggests scoring by answer length, by random numbers,
by counting keywords, or by a fixed lookup table — reject it.** Scoring must go
through the real model call, always.

(One clarification so you don't panic: you'll find `Math.random()` in a few
places in `app.js`. Those make **ID numbers** and one cosmetic label — that's
totally fine. Random is only forbidden for **scoring**, never for making up IDs.)

---

## 10. What you can do next — the fork

You've got two good paths, and both are fine:

- **Keep it as a polished 4-role demo.** Frontend, backend, GenAI, and HR are
  written and work end to end. You could stop here and just refine those.
- **Turn it into a real product.** Write the other 10 roles using the recipe in
  section 7, top up the advanced sets, then start hardening it for real users
  (fix the XSS in section 6, build real login in section 6). That order —
  content first, then hardening — is the sensible one.

Either way: build in small phases, keep the real AI real, and make your agent
show you a plan before it writes. You've got this.

---

## The important stuff you'll actually use

**Files:**
- `docs/HANDOFF.md` — this document.
- `question-bank.js` — all the interview questions (frontend, in the browser).
- `app.js` — the whole frontend app (screens, interview engine, grading calls).
- `index.html`, `styles.css` — the page and its styling.
- `backend/src/server.ts` — the backend: AI calls and all `/api/...` routes.
- `backend/.env.example` — the settings template you copy to `.env`.
- `backend/prisma/schema.prisma` — the database shape.

**Skills (auto-help for your AI agent, in `.claude/skills/`):**
- `add-question-set` — triggers when you add a new role/level/round of questions.
- `safe-agent-workflow` — triggers on any non-trivial build/change task.
- `no-fake-ai` — triggers on anything touching scoring/evaluation/feedback.

**Run it:** backend → `cd backend && npm run dev` (port 5000). Frontend →
`python3 -m http.server 5500` from the top folder, then open
`http://localhost:5500`.

**Read this handoff:** open `docs/HANDOFF.md` in any text editor or Markdown
viewer (in VS Code, right-click the file → *Open Preview* for a nicely formatted
version).
