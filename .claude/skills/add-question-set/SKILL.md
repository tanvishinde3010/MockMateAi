---
name: add-question-set
description: Use when adding or authoring a new interview role, difficulty level, or round of questions in MockMate's question-bank.js — writing MCQ, interview, or coding questions, filling in one of the 10 un-authored roles, or topping up the advanced sets.
---

# Adding a question set to MockMate

All interview questions live in **`question-bank.js`** (frontend, runs in the
browser). The shape is `QUESTION_BANK[roleId][level][round]`.

- `level` is one of: `easy`, `medium`, `advanced`
- `round` is one of: `mcq`, `interview`, `coding`

## The exact shape

Copy this real, authored example (from `frontend` → `easy`) — match it exactly:

```js
frontend: {
  easy: {
    mcq: [
      { text: "What does HTML stand for?", options: ["Hyperlinks Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language", "HyperText Machine Language"], correct: 1, explanation: "HTML = HyperText Markup Language — the standard markup language for web pages." }
      // …5 total for easy
    ],
    interview: [
      { text: "What is the DOM and how does JavaScript interact with it?", hint: "Tree of nodes; getElementById / querySelector; event listeners.", modelAnswer: "The DOM is a tree representation of the HTML document…" }
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

Per-round fields:
- **MCQ:** `{ text, options: [4 strings], correct: <index>, explanation }`
- **Interview:** `{ text, hint, modelAnswer }`
- **Coding:** `{ text, hint, modelAnswer }` — for non-coding roles
  (`hasCoding: false`, e.g. `uiux`, `pm`) use this same shape as a short **case
  study**.

Required counts per level:

| Level     | MCQ | Interview | Coding |
|-----------|-----|-----------|--------|
| easy      | 5   | 2         | 1      |
| medium    | 7   | 3         | 1      |
| advanced  | 10  | 4         | 2      |

When you finish a role, also flip its `authored: false` to `authored: true` in
the `ROLES` list at the top of the file. There is a `// TODO` shape marker near
the bottom of `question-bank.js` listing the 10 un-authored roles
(`fullstack, data-analyst, data-scientist, agentic, devops, cyber, mobile,
uiux, cloud, pm`) — follow it.

## The workflow: generate → review → paste

1. **Generate offline with an LLM.** Draft a full role/level/round following the
   shape above. Don't hand-type ~126 questions.
2. **A human reviews every set** with the checklist below. AI drafts contain
   wrong answers, duplicates, and mis-leveled questions. This step is not
   optional.
3. **Paste into `question-bank.js`** under the correct role key, matching the
   shape exactly, and set `authored: true`.

## The MCQ "correct" rule (identity, not position)

`correct` is the **index** of the right option in your `options` list (`0` =
first, `1` = second, …). You do **not** need to worry about shuffling: at render
time (`app.js`, ~line 1956) the app tags each option with correctness **first**,
then shuffles, so correctness rides with the option itself. Just write the index
of the right answer — shuffling stays correct.

## Review checklist (every question)

- [ ] Exactly **4 options** per MCQ.
- [ ] Exactly **one** correct option, and `correct` points to it.
- [ ] **No duplicate answers** and no two options meaning the same thing.
- [ ] Difficulty matches the level (advanced is genuinely hard, not a long easy
      question).
- [ ] `explanation` says *why* the right answer is right.
- [ ] Interview/coding `modelAnswer` is actually correct.

## After editing

`question-bank.js` is plain browser JavaScript — no build step. Reload the
frontend page to see the new questions. If graphify is set up, run
`graphify update .` to keep the graph current.
