---
name: no-fake-ai
description: Use on anything touching scoring, evaluation, grading, or feedback in MockMate. Enforces that all scoring goes through the real Groq model call and blocks any fake scoring (random, string length, keyword grep, or lookup tables).
---

# No fake AI

MockMate's whole value is that scores come from a **real AI model**, not a
made-up number. The original app faked its "AI" using random numbers and answer
length — that is the #1 thing to never let back in.

## The rule

**All evaluation MUST go through the real Groq model call.**

- Answers are graded via `/api/evaluate` in `backend/src/server.ts`, which calls
  `callGroqJSON(...)` (the real Groq API).
- The frontend grades through `gradeAnswers` in `app.js`, which POSTs to
  `/api/evaluate`. Its comment says *"No random fallback."*
- Follow-ups (`/api/followup`) and recommendations (`/api/recommend`) also go
  through `callGroqJSON`. The recommend route explicitly *"replaces any static
  'score × level' lookup table with a real model call."*

## Banned — reject these if a plan, prompt, or draft suggests them

- Scoring by **string length** (longer answer ≠ better answer).
- Scoring by **random numbers**.
- Scoring by **keyword grep / counting matched words**.
- Scoring from a **static lookup table** (fixed "score for this level" maps).

If asked to do any of the above, **refuse and route through the real model call
instead.**

## On API failure: error, never fake

When the Groq call fails (missing/bad key, network, bad JSON), the code returns
an **HTTP 502** error and the frontend records a score of **0** with a
"try again / check the backend and GROQ_API_KEY" message. It does **not**
substitute a fake score. Keep it that way — a visible error is correct; a
silent fake number is not.

## Allowed use of randomness

`Math.random()` is fine for **non-scoring** things: generating ID numbers,
shuffling MCQ options, or a cosmetic label. Random is banned **only for
scoring/evaluation**. Don't flag ID generation as a violation.
