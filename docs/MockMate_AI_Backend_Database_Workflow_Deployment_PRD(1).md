# MockMate AI — Full-Stack Product Requirement Document
### Backend · Database · Workflow · Deployment · Phased Implementation Plan

**Version:** 1.0
**Companion to:** Frontend PRD (your uploaded document, Chapters 1–17)
**Stack:** React + TypeScript · Node.js + Express · PostgreSQL (Prisma) · Clerk Auth · Claude API · Railway + Vercel
**Build workflow:** Stitch (UI) → Antigravity (code) → GitHub (version control) → Railway/Vercel (deploy)

---

## How to use this document

Your uploaded file already contains a complete **Frontend PRD** — design system, every page spec, user journeys. This document is the **other half**: everything needed to actually build, connect, and ship the product. Together, the two files are your entire spec.

This document is written to be implemented **phase by phase**. Each phase is small enough to build and test in isolation before moving to the next — you should never be debugging two unfinished systems at once.

---

# 0. What This App Should Actually Do (Plain Summary)

Before the heavy detail, here is the single-paragraph version of the product, so every later decision can be checked against it:

> MockMate AI lets a student pick a role (e.g. "Frontend Developer", "HR Round"), starts a chat-style mock interview where Claude plays the interviewer, asks one question at a time, reads the student's typed answer, asks a sensible follow-up or moves on, and — at the end — generates a structured feedback report: an overall score, per-answer feedback, strengths, weak areas, and a suggestion on what to study next. Every interview is saved, so the student has a history and can see whether they're improving over time.

That's it. Everything below is in service of that loop: **pick role → answer questions → get scored feedback → see progress over time.** If any feature you're about to build doesn't serve that loop, it belongs in a later phase, not Phase 1.

---

# 1. System Architecture Overview

## 1.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                        │
│   React + TypeScript SPA  —  deployed on Vercel                  │
│   - Clerk SDK (handles login UI + session token)                 │
│   - TanStack Query (server state/caching)                        │
│   - Zustand (UI state: theme, active interview session)          │
└───────────────────────────┬───────────────────────────────────────┘
                             │  HTTPS REST calls
                             │  Authorization: Bearer <Clerk JWT>
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND API (Node + Express)                 │
│                     deployed on Railway                          │
│                                                                    │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐     │
│   │ Auth          │   │ Interview     │   │ Feedback /        │   │
│   │ Middleware    │──▶│ Engine        │──▶│ Scoring Engine    │   │
│   │ (Clerk verify)│   │ (controllers) │   │ (Claude calls)    │   │
│   └──────────────┘   └──────────────┘   └──────────────────┘     │
│           │                  │                     │              │
│           ▼                  ▼                     ▼              │
│   ┌────────────────────────────────────────────────────────┐     │
│   │              Prisma ORM (typed DB client)                │     │
│   └───────────────────────┬────────────────────────────────┘     │
└───────────────────────────┼────────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────────┐
              ▼              ▼                  ▼
     ┌────────────────┐ ┌──────────┐   ┌─────────────────┐
     │ PostgreSQL      │ │ Claude    │   │ Cloudinary       │
     │ (Neon, managed) │ │ API       │   │ (resume/avatar    │
     │                 │ │(Anthropic)│   │  file storage)    │
     └────────────────┘ └──────────┘   └─────────────────┘
```

## 1.2 Why this shape

- **Frontend and backend are two separate deployments** (Vercel + Railway). This matches your stated deployment plan and is the standard pattern for this stack — the frontend is static/CDN-served, the backend is a long-running Node process that can hold API keys safely.
- **Clerk handles identity, your backend handles everything domain-specific.** Clerk never touches interview data. Your Express API is the only thing that talks to Postgres and Claude. This keeps your backend "great" (your word) because it owns 100% of the actual business logic — nothing important is outsourced.
- **All Claude calls happen server-side, never from the browser.** This is non-negotiable: your Anthropic API key must never reach client code. The frontend only ever talks to *your* API; your API talks to Claude.

## 1.3 Request Flow Example (one interview turn)

```
User types answer in browser
        │
        ▼
POST /api/interviews/:id/answer   (Authorization: Bearer <token>)
        │
        ▼
Express route → authMiddleware verifies Clerk token → attaches userId
        │
        ▼
interviewController.submitAnswer()
        │
        ├─▶ Save answer to DB (Answer table)
        │
        ├─▶ Build prompt: persona + role + conversation history + new answer
        │
        ├─▶ Call Claude API → get next question OR closing remark
        │
        ├─▶ Save AI message to DB (Message table)
        │
        ▼
Response JSON → { nextQuestion, isInterviewComplete }
        │
        ▼
Frontend renders next question in chat UI
```

---

# 2. Backend Product Requirement Document

## 2.1 Backend Goals

The backend must:

1. Be the **single source of truth** for all interview logic — question generation, conversation flow, scoring. The frontend should be "dumb" — it renders what the backend gives it.
2. Never expose the Claude API key, prompts, or scoring rubric to the client.
3. Be **stateless per request** — every request carries its own auth token; no server-side session storage. This makes Railway scaling trivial later.
4. Validate every input. Never trust the client to send a valid `interviewId`, `roleId`, or score.
5. Be cheap to run. Claude calls are the main cost — the backend must control token usage (capped question count, capped answer length, summarized history rather than full transcript on every call once conversations get long).

## 2.2 Tech Stack (Backend)

| Layer | Choice | Notes |
|---|---|---|
| Runtime | Node.js 20 LTS | Required by Railway's default buildpack |
| Framework | Express.js + TypeScript | Lightweight, huge ecosystem, easy for Antigravity to scaffold |
| ORM | Prisma | Type-safe queries, migrations, works great with Neon Postgres |
| Auth verification | `@clerk/express` (Clerk backend SDK) | Verifies the JWT issued by Clerk on the frontend |
| AI | `@anthropic-ai/sdk` | Official Claude SDK |
| Validation | Zod | Same library as frontend forms — one mental model across the stack |
| File storage | Cloudinary SDK | Resume PDFs (Phase 4+), avatars |
| Logging | `pino` (dev: pretty print, prod: JSON logs) | Railway captures stdout logs automatically |
| Rate limiting | `express-rate-limit` | Protects the Claude-calling endpoints specifically |
| Email (later phase) | Resend SDK | Transactional email only |

## 2.3 Folder Structure (Backend)

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.ts                  # Express app setup, middleware mounting
│   ├── server.ts                # Entry point — starts the HTTP server
│   ├── config/
│   │   ├── env.ts                # Validates process.env with Zod at boot
│   │   └── db.ts                 # Prisma client singleton
│   ├── middleware/
│   │   ├── auth.middleware.ts     # Verifies Clerk JWT, attaches req.userId
│   │   ├── error.middleware.ts    # Centralized error handler
│   │   ├── rateLimit.middleware.ts
│   │   └── validate.middleware.ts # Generic Zod-schema validator
│   ├── routes/
│   │   ├── index.ts
│   │   ├── user.routes.ts
│   │   ├── interview.routes.ts
│   │   ├── role.routes.ts
│   │   ├── feedback.routes.ts
│   │   └── analytics.routes.ts
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   ├── interview.controller.ts
│   │   ├── role.controller.ts
│   │   ├── feedback.controller.ts
│   │   └── analytics.controller.ts
│   ├── services/
│   │   ├── claude.service.ts        # All Claude API calls live here, nowhere else
│   │   ├── interviewEngine.service.ts # Conversation flow logic
│   │   ├── scoring.service.ts        # Feedback/score generation logic
│   │   ├── prompt.templates.ts       # All system prompts as versioned constants
│   │   └── user.service.ts
│   ├── types/
│   │   └── *.types.ts
│   └── utils/
│       ├── asyncHandler.ts
│       └── apiResponse.ts
├── .env.example
├── package.json
└── tsconfig.json
```

**Rule for Antigravity / Claude Code while building:** Claude API calls live in exactly one file (`claude.service.ts`). Nothing else imports the Anthropic SDK directly. This makes it trivial to swap models, add caching, or add retry logic in one place later.

## 2.4 Authentication Flow (Clerk)

```
1. User signs up/logs in on the React frontend via Clerk's prebuilt
   <SignIn />, <SignUp /> components (handled entirely by Clerk UI).
2. Clerk issues a session JWT, stored in browser (Clerk manages this).
3. Every API call from frontend attaches:
       Authorization: Bearer <clerk-session-jwt>
4. Backend's authMiddleware uses Clerk's backend SDK to verify the
   token against Clerk's public keys (no DB call needed for verification).
5. On first verified request from a new Clerk user, the backend
   "upserts" a row in our own User table (synced by clerkUserId).
   This is how Clerk's identity becomes a row our app can join against
   for interviews, scores, history, etc.
6. req.userId (our internal User.id, not Clerk's) is attached to every
   request from here on — all controllers use this, never the Clerk ID
   directly, so the rest of the schema doesn't care which auth provider
   you use.
```

This indirection (Clerk ID → internal User row) is important: if you ever migrate off Clerk, only the auth middleware and the User table's `clerkUserId` column change. Nothing else in the schema or business logic touches Clerk directly.

## 2.5 Core Backend Modules

### Module A — User Service
- Create/sync user on first login (`clerkUserId`, `email`, `name`, `avatarUrl`)
- Get/update profile (target role, experience level, college/branch — used to personalize question generation)
- Get current user's dashboard summary (counts, last interview, average score)

### Module B — Role/Track Service
- Serves the list of interview types available (e.g. Frontend Developer, Backend Developer, HR Round, Data Analyst)
- V1: this is a **static seeded table**, not user-editable. Keeps scope small and avoids needing an admin panel in Phase 1.

### Module C — Interview Engine (the core of the product)
This is the most important service in the whole app. Responsibilities:

1. **Start interview** — given `roleId` + `interviewType` (technical/HR), create an `Interview` row, build the first system prompt, call Claude for question #1, save it as a `Message`, return it to the frontend.
2. **Submit answer** — save the user's answer as a `Message`, send the running conversation (or a compressed summary, see §2.7) to Claude, get back either the next question or a signal that the interview should end (after a fixed question count, e.g. 6–8 questions for V1).
3. **End interview** — mark `Interview.status = COMPLETED`, trigger the Scoring service.

### Module D — Scoring / Feedback Service
- Takes the full transcript of one completed interview.
- Sends it to Claude with a **strict JSON-output prompt** (see §2.8) asking for: overall score (0–100), per-question feedback, 3 strengths, 3 weak areas, and one concrete "what to study next" suggestion.
- Parses and validates the JSON response (Zod schema) before saving — if Claude's output doesn't match the schema, retry once with a stricter prompt, then fall back to a safe default ("feedback generation failed, please contact support") rather than crashing.
- Saves result to `Feedback` table, linked 1:1 with `Interview`.

### Module E — Analytics Service
- Aggregates a user's `Interview` + `Feedback` history into the dashboard charts: score-over-time, strongest/weakest topic tags, total interviews completed, streak.
- This is pure SQL aggregation (via Prisma) — **no AI calls needed**, which keeps this endpoint fast and free to run as often as the dashboard re-fetches.

## 2.6 API Endpoint Reference (V1)

All routes are prefixed with `/api`. All routes except `/health` require a valid Clerk bearer token.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Uptime check for Railway |
| POST | `/users/sync` | Create/update internal user row after Clerk login |
| GET | `/users/me` | Current user profile + dashboard summary |
| PATCH | `/users/me` | Update profile (name, target role, experience level) |
| GET | `/roles` | List available interview roles/tracks |
| POST | `/interviews` | Start a new interview — body: `{ roleId, type }` → returns `{ interviewId, firstQuestion }` |
| POST | `/interviews/:id/answer` | Submit an answer → returns `{ nextQuestion }` or `{ isComplete: true }` |
| GET | `/interviews/:id` | Get full interview detail (transcript + feedback if completed) |
| GET | `/interviews` | List current user's interview history (paginated) |
| GET | `/feedback/:interviewId` | Get feedback report for one interview |
| GET | `/analytics/summary` | Dashboard aggregate stats |
| GET | `/analytics/progress` | Time-series score data for charts |

V1 deliberately has **no PATCH/DELETE on interviews** — interviews are immutable once created, which avoids a whole class of consistency bugs. Users can abandon an interview (leave it `IN_PROGRESS` forever) but can't edit history, which protects the integrity of the progress charts.

## 2.7 Conversation / Token Management Strategy

This matters for cost and for "great backend" — a naive implementation resends the entire transcript to Claude on every single turn, which gets expensive and slow as conversations grow.

**V1 approach (good enough, simple):**
- Cap every interview at **6 questions** (configurable via env var `MAX_QUESTIONS_PER_INTERVIEW`).
- Since the cap is small, sending the full running transcript each turn is fine — token cost stays bounded and predictable.
- Each turn's prompt = system prompt (persona + role + rules) + full message history so far + the new answer.

**Phase 3+ approach (when you add longer/voice interviews):**
- Switch to a **rolling summary**: after every 4 exchanges, ask Claude to compress the older turns into a 2-sentence summary, and only keep the last 2 exchanges verbatim + the summary in the next prompt. This keeps token usage flat regardless of interview length.

## 2.8 Prompt Design (high-level — not full prompt text)

Keep all prompts as versioned template strings in `prompt.templates.ts`, parameterized by `{role, type, experienceLevel, questionNumber, maxQuestions}`. Two prompt types:

1. **Interviewer prompt** — instructs Claude to behave as a calm, professional interviewer for the given role; ask one question at a time; never ask multiple questions in one message; acknowledge the previous answer briefly before moving on; after the final question, output a fixed sentinel string the backend can detect (e.g. `[INTERVIEW_END]`) so the engine knows to stop without parsing free text.
2. **Scoring prompt** — instructs Claude to act as a strict evaluator, given the full transcript, and to respond with **JSON only**, matching an exact schema the backend defines and validates with Zod (`overallScore`, `perQuestionFeedback[]`, `strengths[]`, `weaknesses[]`, `recommendation`). Always request JSON-only output and validate before trusting it — never `eval` or loosely parse model output.

## 2.9 Error Handling & Reliability Rules

- Every Claude API call is wrapped with: timeout (15s), one retry on failure/timeout, and a graceful fallback message if both attempts fail ("Our AI interviewer is having trouble — please try again in a moment") rather than a raw 500 error reaching the user.
- All controllers use a shared `asyncHandler` wrapper so thrown errors always reach the centralized error middleware (no unhandled promise rejections).
- All errors return a consistent shape: `{ success: false, error: { code, message } }`. All successes return `{ success: true, data: {...} }`. This consistency is what makes the frontend's error handling simple and is a hallmark of a "great backend."
- Rate limit the two AI-calling routes (`POST /interviews`, `POST /interviews/:id/answer`) more strictly than the rest of the API (e.g. 20 requests/min/user) since they're the expensive ones.

## 2.10 Security Checklist (V1 — non-negotiable before deploy)

- [ ] Anthropic API key, database URL, Clerk secret key all in environment variables — never committed to GitHub (`.env` in `.gitignore` from commit #1)
- [ ] CORS configured to only allow your actual Vercel frontend domain in production (not `*`)
- [ ] Helmet.js middleware for standard HTTP security headers
- [ ] Every route handler checks that the resource being accessed (`interviewId`, etc.) actually belongs to `req.userId` before returning it — prevents one user from reading another user's interview by guessing an ID
- [ ] Input validation (Zod) on every POST/PATCH body before it touches the database or a prompt
- [ ] No raw error stack traces sent to the client in production

---

# 3. Database Product Requirement Document

## 3.1 Database Choice

**PostgreSQL**, hosted on **Neon** (serverless Postgres, generous free tier, scales to zero when idle — ideal for a portfolio project that won't have constant traffic). Accessed exclusively through **Prisma ORM** from the backend. The frontend never talks to the database directly.

## 3.2 Entity Relationship Diagram (V1 Schema)

```
┌─────────────┐        ┌──────────────┐        ┌─────────────┐
│    User      │1      *│  Interview    │1      *│   Message    │
│─────────────│────────│──────────────│────────│─────────────│
│ id (PK)      │        │ id (PK)       │        │ id (PK)      │
│ clerkUserId  │        │ userId (FK)   │        │ interviewId  │
│ email        │        │ roleId (FK)   │        │ role         │
│ name         │        │ type          │        │ content      │
│ targetRole   │        │ status        │        │ createdAt    │
│ experience   │        │ startedAt     │        └─────────────┘
│ avatarUrl    │        │ completedAt   │
│ createdAt    │        │ createdAt     │
└─────────────┘        └──────┬───────┘
       │                       │1
       │                       │
       │                       ▼1
       │                ┌──────────────┐
       │                │  Feedback     │
       │                │──────────────│
       │                │ id (PK)       │
       │                │ interviewId   │ (unique FK — 1:1)
       │                │ overallScore  │
       │                │ strengths     │ (JSON)
       │                │ weaknesses    │ (JSON)
       │                │ perQuestion   │ (JSON)
       │                │ recommendation│
       │                │ createdAt     │
       │                └──────────────┘
       │
       │                ┌──────────────┐
       └───────────────▶│   Role        │
              *        1│──────────────│
                         │ id (PK)       │
                         │ title         │
                         │ category      │ (technical/hr)
                         │ description   │
                         │ iconKey       │
                         │ isActive      │
                         └──────────────┘
```

## 3.3 Prisma Schema (V1 — copy-ready)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum InterviewType {
  TECHNICAL
  HR
}

enum InterviewStatus {
  IN_PROGRESS
  COMPLETED
  ABANDONED
}

enum MessageRole {
  INTERVIEWER
  USER
}

model User {
  id            String   @id @default(cuid())
  clerkUserId   String   @unique
  email         String   @unique
  name          String?
  targetRole    String?
  experience    String?  // "student" | "fresher" | "1-3yrs" etc.
  avatarUrl     String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  interviews    Interview[]

  @@index([clerkUserId])
}

model Role {
  id          String   @id @default(cuid())
  title       String   // "Frontend Developer", "HR Round"
  category    InterviewType
  description String
  iconKey     String   // maps to a frontend icon, e.g. "code", "users"
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  interviews  Interview[]
}

model Interview {
  id           String          @id @default(cuid())
  userId       String
  roleId       String
  type         InterviewType
  status       InterviewStatus @default(IN_PROGRESS)
  questionCount Int            @default(0)
  startedAt    DateTime        @default(now())
  completedAt  DateTime?

  user         User            @relation(fields: [userId], references: [id])
  role         Role            @relation(fields: [roleId], references: [id])
  messages     Message[]
  feedback     Feedback?

  @@index([userId])
  @@index([status])
}

model Message {
  id          String      @id @default(cuid())
  interviewId String
  role        MessageRole
  content     String      @db.Text
  createdAt   DateTime    @default(now())

  interview   Interview   @relation(fields: [interviewId], references: [id])

  @@index([interviewId])
}

model Feedback {
  id             String   @id @default(cuid())
  interviewId    String   @unique
  overallScore   Int      // 0–100
  strengths      Json     // string[]
  weaknesses     Json     // string[]
  perQuestion    Json     // [{ question, answer, feedback, score }]
  recommendation String   @db.Text
  createdAt      DateTime @default(now())

  interview      Interview @relation(fields: [interviewId], references: [id])
}
```

## 3.4 Indexing & Performance Notes

- `User.clerkUserId` and `User.email` are unique-indexed — every auth-synced request looks up by one of these.
- `Interview.userId` is indexed — the dashboard and history pages always filter "this user's interviews."
- `Message.interviewId` is indexed — the engine always fetches "this interview's messages" in order.
- `Feedback.interviewId` is a unique FK, enforcing the 1:1 relationship at the database level, not just in application code.
- JSON columns (`strengths`, `weaknesses`, `perQuestion`) are used deliberately for V1 — they're written once by the scoring service and read once by the feedback page, never queried/filtered at the SQL level. If Phase 4+ adds "show me all interviews where I was weak in 'React hooks'", that's the trigger to normalize these into proper tables — not before.

## 3.5 Migration Workflow

```bash
# After any schema.prisma change:
npx prisma migrate dev --name describe_the_change

# Applying migrations in production (Railway build/start step):
npx prisma migrate deploy

# Regenerate the typed client after every schema change:
npx prisma generate
```

Railway should run `npx prisma migrate deploy && node dist/server.js` as its start command, so every deploy automatically brings the production database schema up to date — this is what makes the backend deployment "great" rather than fragile (no manual SQL ever run by hand against production).

## 3.6 Seed Data (required before Phase 1 testing)

Create `prisma/seed.ts` that inserts a starter set of `Role` rows so the role-selection screen has real data immediately:

```
Technical: Frontend Developer, Backend Developer, Full-Stack Developer,
           Data Analyst, DSA / Problem-Solving
HR:        General HR Round, Behavioral / Situational Round
```

Run with `npx prisma db seed` locally and once against production after first deploy.

---

# 4. Workflow & Sequence Diagrams

## 4.1 End-to-End User Workflow (Phase 1 scope)

```
 [Landing Page]
       │
       ▼
 [Sign Up / Log In]  ──── handled entirely by Clerk
       │
       ▼
 [Dashboard]
       │
       ▼
 [Select Role + Interview Type]
       │
       ▼
 POST /interviews  ───────────────▶  Backend creates Interview row,
       │                              calls Claude for Q1, saves Message
       ▼
 [Live Interview Screen]
       │
       │   loop until questionCount === MAX_QUESTIONS
       │   ┌─────────────────────────────────────────┐
       │   │  User types answer                       │
       │   │       │                                   │
       │   │       ▼                                   │
       │   │  POST /interviews/:id/answer              │
       │   │       │                                   │
       │   │       ▼                                   │
       │   │  Backend saves answer, calls Claude,      │
       │   │  saves next question, returns it          │
       │   │       │                                   │
       │   │       ▼                                   │
       │   │  Frontend renders next question           │
       │   └─────────────────────────────────────────┘
       │
       ▼  (Claude signals [INTERVIEW_END] or questionCount cap hit)
 Backend marks Interview COMPLETED, triggers Scoring Service
       │
       ▼
 [AI Analysis (loading) Screen] ── polls or waits on the response of the
       │                            final answer call, which can return
       │                            synchronously once V1 scope is small
       ▼
 [Results / Feedback Screen]  ◀── GET /feedback/:interviewId
       │
       ▼
 [Dashboard]  ◀── updated history + analytics
```

## 4.2 Sequence Diagram — Starting an Interview

```
Frontend          Backend              Database          Claude API
   │                 │                     │                  │
   │ POST /interviews│                     │                  │
   │────────────────▶│                     │                  │
   │                 │ verify Clerk token  │                  │
   │                 │ create Interview     │                  │
   │                 │────────────────────▶│                  │
   │                 │◀────────────────────│ row created       │
   │                 │ build system prompt  │                  │
   │                 │ (role + type)        │                  │
   │                 │─────────────────────────────────────────▶│
   │                 │                     │   first question  │
   │                 │◀─────────────────────────────────────────│
   │                 │ save Message (INTERVIEWER)               │
   │                 │────────────────────▶│                  │
   │◀────────────────│ { interviewId,       │                  │
   │ render Q1       │   firstQuestion }    │                  │
```

## 4.3 Sequence Diagram — Completing an Interview & Scoring

```
Frontend          Backend              Database          Claude API
   │                 │                     │                  │
   │ POST .../answer │                     │                  │
   │────────────────▶│                     │                  │
   │                 │ save user Message    │                  │
   │                 │────────────────────▶│                  │
   │                 │ questionCount == max?│                  │
   │                 │ → yes: end interview │                  │
   │                 │─────────────────────────────────────────▶│
   │                 │         (scoring prompt + full transcript)│
   │                 │◀─────────────────────────────────────────│
   │                 │      strict JSON feedback                │
   │                 │ validate w/ Zod       │                  │
   │                 │ save Feedback row     │                  │
   │                 │────────────────────▶│                  │
   │                 │ mark Interview        │                  │
   │                 │ COMPLETED             │                  │
   │                 │────────────────────▶│                  │
   │◀────────────────│ { isComplete: true,  │                  │
   │ redirect to      │   interviewId }      │                  │
   │ results page     │                     │                  │
```

## 4.4 CI/CD Workflow (GitHub → Railway/Vercel)

```
 Local (Antigravity / VS Code)
       │  git push
       ▼
 GitHub repo (main branch protected; feature branches + PRs)
       │
       ├──────────────────────────┬──────────────────────────────┐
       ▼                          ▼                                
 Vercel GitHub integration   Railway GitHub integration             
 (auto-detects /frontend)    (auto-detects /backend)                
       │                          │                                
       ▼                          ▼                                
 Build: npm run build        Build: npm install && npm run build    
 Deploy to CDN                Run: prisma migrate deploy            
 Preview URL per PR            Start: node dist/server.js            
       │                          │                                
       ▼                          ▼                                
 https://mockmate.vercel.app  https://mockmate-api.up.railway.app
```

Both platforms should be connected directly to the GitHub repo (not manual CLI deploys) so every push to `main` auto-deploys, and every pull request gets its own preview environment to test before merging — this is what makes iterating "phase by phase" safe.

---

# 5. Deployment Notes

## 5.1 Environment Variables

**Backend (Railway) — `.env`**
```
DATABASE_URL=               # from Neon
CLERK_SECRET_KEY=           # from Clerk dashboard
ANTHROPIC_API_KEY=          # from Anthropic console
CLOUDINARY_URL=             # Phase 4+
RESEND_API_KEY=             # Phase 5+
FRONTEND_URL=                # for CORS allowlist, e.g. https://mockmate.vercel.app
MAX_QUESTIONS_PER_INTERVIEW=6
NODE_ENV=production
PORT=                        # Railway sets this automatically — read from process.env.PORT
```

**Frontend (Vercel) — `.env`**
```
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_BASE_URL=           # e.g. https://mockmate-api.up.railway.app/api
```

Rule: validate all backend env vars at boot with a Zod schema in `config/env.ts` and **crash immediately with a clear error** if any are missing, rather than failing mysteriously on the first real request. This single habit prevents most "works locally, broken in production" bugs.

## 5.2 Railway Setup (Backend)

1. New Project → Deploy from GitHub repo → select the repo, set **root directory** to `/backend`.
2. Add a PostgreSQL-compatible `DATABASE_URL` — either provision Neon separately (recommended, free tier is generous) and paste the connection string, or use Railway's own Postgres plugin.
3. Set Build Command: `npm install && npm run build`
4. Set Start Command: `npx prisma migrate deploy && node dist/server.js`
5. Add all environment variables from §5.1.
6. Enable **"Deploy on push"** for the `main` branch.
7. After first deploy, run the seed script once via Railway's shell: `npx prisma db seed`.
8. Note the generated public URL — this becomes `VITE_API_BASE_URL` on the frontend.

## 5.3 Vercel Setup (Frontend)

1. New Project → Import from GitHub → select the repo, set **root directory** to `/frontend`.
2. Framework preset: Vite (or Next.js if you choose that router later — V1 spec assumes Vite + React Router per the tech stack chosen in your uploaded doc).
3. Add environment variables from §5.1.
4. Enable automatic Preview Deployments for every PR.
5. Add your production domain (or use the free `*.vercel.app` one for the portfolio version).

## 5.4 Neon (Database) Setup

1. Create a project, choose a region close to Railway's region (reduces latency between API and DB).
2. Copy the **pooled connection string** (Neon gives both pooled and direct — use the pooled one for the app, since serverless/managed Postgres connections benefit from pooling under concurrent requests).
3. Enable "Scale to zero" for the free tier — fine for a project without 24/7 traffic; first request after idle will be slightly slower (cold start), which is an acceptable tradeoff at this stage.

## 5.5 Domain & HTTPS

Both Railway and Vercel provision HTTPS automatically on their default domains — no extra setup needed for the portfolio version. Custom domain is optional and can be added later without any architecture change.

## 5.6 Monitoring (V1 — minimal but real)

- Railway's built-in log viewer is your primary tool in V1. Use `pino` with structured JSON logs in production so they're greppable.
- Add a `/health` endpoint that checks DB connectivity (`SELECT 1`) — point Railway's health check at it so failed deploys are caught automatically rather than silently serving a broken app.
- Phase 5+: add Sentry for error tracking once the app has real users.

## 5.7 Cost Control Checklist

- [ ] Cap `MAX_QUESTIONS_PER_INTERVIEW` so no single interview can run away in Claude token cost.
- [ ] Rate-limit the AI-calling endpoints per user (see §2.9).
- [ ] Use a smaller/cheaper Claude model for question generation if cost becomes a concern, and reserve a stronger model only for the final scoring call (the part that most needs reasoning quality) — both are configured in `claude.service.ts`, so this is a one-line change.
- [ ] Neon free tier + Railway free/hobby tier + Vercel free tier comfortably covers a portfolio project's traffic.

---

# 6. Making the UI/UX Interesting, Not Boring

Your frontend PRD already nails the structural design system (Chapter 2) and page specs. This section adds the layer that turns "a form-and-table app" into something that feels alive — without contradicting anything already specified.

## 6.1 The core idea

A mock-interview app's biggest UX risk is feeling like **a quiz form with extra steps**. The fix is to make the *process* feel like a conversation with a presence, and to make *progress* feel rewarding to look at. Concretely:

| Boring version | Interesting version |
|---|---|
| Static question text on a page | Chat-bubble interface where the question "types in" with a subtle animation, like a real interviewer composing a thought |
| A plain "Submit" button | A textarea with a live word-count and a gentle pulse on the send button once there's enough content to submit meaningfully |
| A results page that's just a number | An animated score reveal (counts up from 0 to the final score), with strengths/weaknesses appearing as staggered cards, not a wall of text |
| A history table | A timeline/calendar-style view with mini score-trend sparklines, so progress is visually obvious at a glance |
| Generic loading spinner during AI analysis | A short sequence of rotating status lines ("Reviewing your answers…", "Checking technical accuracy…", "Preparing feedback…") so the wait feels purposeful, not stuck |
| Silent success states | Small, tasteful micro-celebrations — e.g. a subtle confetti burst or badge unlock the first time a user scores above 80, or completes 5 interviews — using Framer Motion, never anything garish |

## 6.2 Specific additions to wire into existing pages

- **Live Interview screen (Chapter 8 in your frontend PRD):** add a typing-indicator animation (three pulsing dots) for the 1–2 seconds while Claude is generating the next question, instead of an abrupt content swap. This single detail is what makes it *feel* like a real interviewer rather than a form refresh.
- **AI Analysis screen (Chapter 9):** never make this feel like dead time. Rotate 3–4 short status messages while the scoring call is in flight (real ones, tied to what's actually happening server-side, not fake busy-work text).
- **Results screen (Chapter 10):** animate the score number counting up, and reveal strengths/weaknesses one card at a time with a slight stagger (50–100ms delay between cards) rather than all at once — this is a small Framer Motion detail with an outsized "polish" payoff.
- **Dashboard:** show a streak indicator ("3-day practice streak 🔥") if the user has practiced on consecutive days — this is pure SQL (max consecutive `DATE(startedAt)` per user), no AI needed, and it's one of the most effective habit-forming UI patterns in modern SaaS.
- **Empty states:** a brand-new user's dashboard, history, and analytics pages should never show a blank "No data" message. Show an illustrated empty state with a clear single call-to-action ("Take your first mock interview →") — this matters more than it sounds, since it's literally the first impression after signup.

## 6.3 Tone of microcopy

Per your frontend PRD's "Product Personality" (§1.12 — professional, friendly, encouraging, never robotic), apply that same tone to system-generated text, not just marketing copy:

- Feedback should never say "You scored 42/100. Weak performance." It should say something like "You're at 42/100 — here's exactly what to focus on next" followed by specific, actionable points.
- Loading/status text should sound like a person, not a system log: "Almost done reviewing your answers…" rather than "Processing…".

This is a backend concern as much as a frontend one — the Claude scoring prompt (see §2.8) should explicitly instruct the model to write feedback in this encouraging-but-honest tone, since the *quality of the AI's words* is itself a UX surface, not just the UI chrome around it.

---

# 7. Phased Implementation Plan

**Rule for every phase:** don't start the next phase until the current phase's "Definition of Done" is checked off and manually tested. Each phase produces something you can actually click through and verify — never a half-working system spanning two phases at once.

---

## Phase 0 — Project Setup (no features yet)

**Goal:** empty but fully wired skeleton — repo, both deployments live, talking to each other, with auth working end-to-end.

**Tasks**
- Create GitHub repo with `/frontend` and `/backend` folders (monorepo, simplest for a solo project).
- Scaffold backend: Express + TypeScript + Prisma + the folder structure in §2.3. Add `/health` route.
- Scaffold frontend: Vite + React + TypeScript + Tailwind + shadcn/ui, per your frontend PRD's tech stack.
- Set up Clerk on both sides (publishable key on frontend, secret key on backend); wire `<SignIn />`/`<SignUp />` pages.
- Set up Neon database, run first Prisma migration with just the `User` model.
- Implement `POST /users/sync` and call it once on login (Clerk's `afterSignIn` hook or a `useEffect` on app load).
- Deploy backend to Railway, frontend to Vercel, connect both to GitHub for auto-deploy.

**Definition of Done**
- [ ] Visiting the Vercel URL shows the landing page.
- [ ] You can sign up, get redirected, and see a (blank) dashboard shell.
- [ ] Backend logs show a `User` row was created in Neon after signup.
- [ ] `GET /health` returns 200 from the live Railway URL.
- [ ] A push to `main` redeploys both automatically without manual steps.

**Manual test:** sign up with a real email, log out, log back in, confirm no duplicate user row is created (sync should upsert, not insert blindly).

---

## Phase 1 — Core Interview Loop (text-only) — *this is the MVP*

**Goal:** a user can pick a role, complete a full text-based mock interview, and see a feedback report. This phase alone is a demoable product.

**Tasks**
- Backend: add `Role`, `Interview`, `Message`, `Feedback` models + migration; seed `Role` table.
- Backend: build `claude.service.ts` (single wrapper around the Anthropic SDK).
- Backend: build the interviewer prompt template and `POST /interviews` (start).
- Backend: build `POST /interviews/:id/answer` (the turn loop) with the 6-question cap.
- Backend: build the scoring prompt + Zod-validated JSON parsing + `Feedback` save on completion.
- Backend: `GET /interviews/:id`, `GET /feedback/:interviewId`, `GET /interviews` (history list).
- Frontend: Role Selection screen wired to `GET /roles`.
- Frontend: Live Interview chat UI wired to the start/answer endpoints (per Chapter 8 of your frontend PRD).
- Frontend: AI Analysis loading screen, then Results screen wired to the feedback endpoint (Chapters 9–10).
- Frontend: basic Interview History list (Chapter 11) — just needs to list past interviews and link to their results; charts come in Phase 2.

**Definition of Done**
- [ ] Selecting a role and clicking "Start" creates a real `Interview` row and shows a real first question from Claude (not a placeholder).
- [ ] Typing 6 answers in a row produces 6 distinct, contextually relevant follow-up questions (verify Claude is actually using conversation history, not repeating itself).
- [ ] After the 6th answer, the app transitions to the Analysis screen and then to a Results screen with a real score and real feedback text.
- [ ] Refreshing the Results page still shows the same feedback (confirms it's persisted, not just held in frontend state).
- [ ] The History page lists the completed interview and clicking it re-opens the same results.
- [ ] Trying to fetch another user's `interviewId` by guessing/editing the URL returns a 403/404, not their data (security check from §2.10).

**Manual test:** complete two full interviews back-to-back as two different role types (one technical, one HR) and confirm the question style genuinely differs between them.

---

## Phase 2 — Dashboard, Analytics & Profile

**Goal:** turn single interviews into a sense of ongoing progress — this is what makes someone come back a second time.

**Tasks**
- Backend: `GET /analytics/summary` (total interviews, average score, last activity) and `GET /analytics/progress` (score-over-time series).
- Backend: streak calculation (consecutive practice days).
- Backend: `PATCH /users/me` for profile fields (target role, experience level).
- Frontend: real Dashboard (Chapter 1.9 core feature) showing summary cards + "continue practicing" CTA.
- Frontend: Analytics Dashboard with Recharts (Chapter 12) — score trend line chart at minimum; radar/topic-breakdown can wait if `perQuestion` tagging isn't built yet.
- Frontend: Profile page (Chapter 13) wired to real PATCH/GET.
- Frontend: empty states for brand-new users on Dashboard, History, Analytics (per §6.2).

**Definition of Done**
- [ ] A user with zero interviews sees a friendly empty state, not a blank/broken page, on Dashboard/History/Analytics.
- [ ] After completing 3 interviews, the Analytics page shows a real line chart with 3 real data points.
- [ ] Editing profile fields persists across a page refresh and a full logout/login cycle.
- [ ] Streak counter correctly shows 0 after a missed day (test by manually adjusting a `startedAt` value in the DB, or just trust the SQL logic and unit-test it).

**Manual test:** create a second test account, confirm its dashboard/analytics are completely independent from the first account's data.

---

## Phase 3 — UX Polish Pass

**Goal:** apply §6 (Making the UI/UX Interesting) across all Phase 1–2 screens. This phase is explicitly about *feel*, not new backend capability.

**Tasks**
- Add typing-indicator animation during question generation.
- Add rotating status messages on the AI Analysis screen.
- Add count-up score animation + staggered card reveal on Results.
- Add streak badge / first-80%-score micro-celebration (Framer Motion).
- Add Settings page (Chapter 14) — at minimum theme toggle (if your design system supports dark mode) and account deletion (required for a real, deployable app — see §8 below).
- Polish loading/microcopy tone throughout per §6.3.

**Definition of Done**
- [ ] Every loading state in the app (question generation, scoring, page loads) has *something* moving on screen — no bare spinners with no context.
- [ ] A first-time visitor who has never seen the app can correctly guess what's happening on the Analysis screen without reading any prior explanation, just from the rotating text.
- [ ] Settings page can actually change something that persists and visibly affects the app.

**Manual test:** ask a friend who has never seen the project to complete one full interview with no explanation from you, and watch where they hesitate or look confused — fix those specific spots before moving on.

---

## Phase 4 — Resume Upload & File Storage

**Goal:** add the first "Future Feature" from your frontend PRD (§1.10) — resume-aware interviews — now that the core loop is solid.

**Tasks**
- Backend: Cloudinary integration for PDF upload; `POST /users/me/resume`.
- Backend: extract resume text (simple text extraction library) and pass a short summary into the interview's system prompt so questions can reference the user's actual background.
- Frontend: resume upload UI on Profile page.

**Definition of Done**
- [ ] Uploading a resume and starting a new interview produces at least one question that clearly references something from the resume (e.g. a named project or skill).
- [ ] Re-uploading a resume replaces the old one (in storage and in DB reference), no orphaned files accumulating in Cloudinary.

---

## Phase 5 — Voice Mode (Both Text & Voice Available)

**Goal:** per your decision, V2 should support both text and voice — this phase adds voice as an additional input mode, not a replacement.

**Tasks**
- Frontend: add a mode toggle on the interview setup screen ("Type your answers" / "Speak your answers").
- Frontend: integrate browser Speech-to-Text (Web Speech API for a fast V2, or a hosted STT API if you need cross-browser reliability) to convert spoken answers to text client-side.
- Backend: **no change needed to the core engine** — voice mode still ultimately calls `POST /interviews/:id/answer` with text content; the backend never needs to know whether the text came from typing or speech. This is exactly why the Phase 1 architecture decision (text-based engine) pays off — voice is purely an additive frontend feature.
- Optional: add Text-to-Speech so Claude's questions are read aloud too, for a fuller voice-interview feel.

**Definition of Done**
- [ ] A user can complete an entire interview using only their voice, with answers correctly transcribed and submitted.
- [ ] A user can switch back to typing mid-interview without breaking the session.
- [ ] Text-mode users see zero behavior change from before this phase shipped.

---

## Phase 6 — Notifications, Email & Retention

**Goal:** implement Chapter 15 (Notifications) and bring users back over time.

**Tasks**
- Backend: Resend integration for a welcome email on signup and a weekly progress summary email (simple cron — Railway supports scheduled jobs, or use a lightweight external cron hitting a protected endpoint).
- Frontend: in-app Notifications/Activity Center (Chapter 15).

**Definition of Done**
- [ ] New signup reliably receives a welcome email within a minute.
- [ ] A test user with interview history receives a correctly personalized weekly summary email.

---

## Phase 7 — Scale-Readiness (only if/when real traffic justifies it)

Everything before this point is sufficient for a portfolio project and even a small real user base. Only revisit this phase if you have actual concurrent users:

- Add Sentry error tracking.
- Normalize `Feedback.perQuestion` topic tags into their own table if you want topic-level analytics ("you're consistently weak in System Design").
- Add Redis-backed rate limiting if `express-rate-limit`'s in-memory store becomes insufficient across multiple Railway instances.
- Revisit the rolling-summary conversation strategy from §2.7 if interview length grows beyond the V1 cap.

---

# 8. Pre-Launch Checklist (before sharing the live link with anyone)

- [ ] Privacy basics: a simple privacy note stating what data is stored (email, interview answers, AI-generated feedback) — required even for a portfolio project if real people will sign up with real emails.
- [ ] Account deletion actually deletes (or clearly explains retention of) a user's data — implement this in Phase 3's Settings page, don't skip it.
- [ ] Rate limits are live (§2.9) — a public link without this can run up a real Anthropic bill from a single bad actor or bug.
- [ ] Error states (network failure, Claude API failure, expired session) all show a friendly message — test by deliberately turning off your wifi mid-interview.
- [ ] Test the full flow once on an actual phone (not just resized desktop browser) — Chapter 1.14's "responsive across desktop, tablet, mobile" principle from your frontend PRD must hold in practice, not just in the design file.

---

# 9. What Goes Where — Quick Reference

| If you're working on... | You need section... |
|---|---|
| Designing a new screen in Stitch | Your Frontend PRD (Chapters 4–17) |
| Writing an Express route or controller | §2 (Backend PRD) |
| Writing a Prisma model or migration | §3 (Database PRD) |
| Unsure what calls what, in what order | §4 (Workflow & Sequence Diagrams) |
| Setting up Railway/Vercel/Neon | §5 (Deployment Notes) |
| The app works but feels flat | §6 (UI/UX Delight) |
| Deciding what to build this week | §7 (Phased Implementation Plan) |
| About to share the live link | §8 (Pre-Launch Checklist) |
