# Implementation Plan — Full 3-Round Interview Simulator

## Complete Feature: 14 Job Roles × 3 Difficulty Levels × 3 Rounds

Transform MockMate AI into a **production-grade interview simulator** with:
- **14 modern tech job roles** (Frontend, Data Science, GenAI, Agentic AI, etc.)
- **3 difficulty levels** (Easy → Medium → Advanced) with different topics per level
- **3 interview rounds** (MCQ → Live Interview → Coding) per session
- **Per-round AI analysis** with strengths, weaknesses, and focus recommendations

---

## Overview

### Current → New
```
Current:  4 categories → 1 difficulty picker → Single round → Results

New:      14 job roles → 3 levels (Easy/Medium/Advanced) →
          Choose Full Interview or Quick Practice →
          Round 1: MCQ → Round 2: Live Interview → Round 3: Coding →
          Per-Round AI Analysis → Level-aware Recommendations
```

---

## Part A — Expanded Job Roles + Difficulty Levels

### The 14 Job Roles

| # | Role | Icon | Domain |
|---|------|------|--------|
| 1 | Frontend Developer | `code-2` | Web |
| 2 | Backend Developer | `database` | Web |
| 3 | Full Stack Developer | `layers` | Web |
| 4 | Data Analyst | `bar-chart-3` | Data |
| 5 | Data Scientist | `brain` | Data/ML |
| 6 | GenAI / LLM Engineer | `sparkles` | AI |
| 7 | Agentic AI Engineer | `bot` | AI |
| 8 | DevOps / SRE | `server` | Infra |
| 9 | Cybersecurity Analyst | `shield` | Infra |
| 10 | Mobile Developer | `smartphone` | App |
| 11 | UI/UX Designer | `palette` | Design |
| 12 | Cloud / AWS Engineer | `cloud` | Infra |
| 13 | Product Manager | `briefcase` | Product |
| 14 | HR & Behavioral | `users` | Soft Skills |

### Difficulty Levels — Topic Coverage Per Role

Each level covers **different topics** of increasing complexity. Here's the full breakdown:

---

#### 🟢 Frontend Developer
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | HTML tags, CSS selectors, JS basics, DOM | What is the DOM? Explain box model | Toggle class on button click, center a div |
| **Medium** | React hooks, state vs props, Flexbox/Grid, closures | Virtual DOM, useEffect lifecycle, CSS-in-JS | Build a todo component, debounce function |
| **Advanced** | SSR vs CSR, Webpack internals, performance APIs, micro-frontends | Code splitting strategies, Web Workers, hydration | Custom hook with caching, virtual scroll implementation |

#### 🟢 Backend Developer
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | HTTP methods, REST basics, JSON, status codes | What is an API? Explain GET vs POST | Simple Express route handler, parse JSON |
| **Medium** | Middleware, auth (JWT/OAuth), SQL joins, indexing | Event Loop, ACID properties, connection pooling | CRUD REST API, SQL query optimization |
| **Advanced** | Microservices, message queues, CQRS, rate limiting | Distributed transactions, CAP theorem, sharding | Design a rate limiter, implement pub-sub |

#### 🟢 Full Stack Developer
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | HTML/CSS + HTTP basics, client-server model | Explain how a webpage loads end-to-end | Connect frontend form to backend API |
| **Medium** | React + Node integration, REST design, auth flow | SPA vs MPA, session vs token auth | Full CRUD app with React + Express |
| **Advanced** | SSR/ISR, GraphQL, WebSockets, caching strategies | Monorepo architecture, edge computing | Real-time chat feature, GraphQL resolver |

#### 📊 Data Analyst
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | SQL SELECT/WHERE/ORDER, basic Excel functions, chart types | What is data cleaning? Explain mean vs median | Simple SQL queries, basic aggregations |
| **Medium** | JOINs, GROUP BY/HAVING, pivot tables, A/B testing basics | How would you handle missing data? Explain KPIs | Multi-table JOIN queries, Pandas groupby |
| **Advanced** | Window functions, CTEs, statistical significance, DAX | Design a dashboard for executive reporting | Complex SQL with ROW_NUMBER, cohort analysis |

#### 🧠 Data Scientist
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | Supervised vs unsupervised, accuracy/precision/recall, NumPy basics | Explain linear regression, overfitting | Train-test split, basic sklearn model |
| **Medium** | Decision trees, random forests, cross-validation, feature scaling | Bias-variance tradeoff, regularization | Build a classification pipeline, confusion matrix |
| **Advanced** | Gradient boosting, neural net architectures, Bayesian methods | Model deployment, A/B testing ML models | Custom loss function, hyperparameter tuning code |

#### ✨ GenAI / LLM Engineer
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | What is a transformer? Tokenization basics, prompt types | Explain how ChatGPT works at a high level | Call an LLM API, format prompt template |
| **Medium** | Attention mechanism, RAG pipeline, embeddings, vector DBs | Fine-tuning vs RAG tradeoffs, hallucination mitigation | Build a RAG pipeline, document chunker |
| **Advanced** | LoRA/QLoRA, RLHF, multi-modal models, agent frameworks | Evaluate LLM quality at scale, cost optimization | Custom embedding pipeline, multi-step agent chain |

#### 🤖 Agentic AI Engineer
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | What is an AI agent? ReAct pattern, tool use basics | Explain agent vs chatbot, what is tool calling | Simple agent loop with if/else tool dispatch |
| **Medium** | Planning algorithms, memory systems, multi-agent patterns | Agent evaluation, guardrails, error recovery | Build a ReAct agent, implement tool registry |
| **Advanced** | Hierarchical agents, self-reflection, human-in-the-loop | Production agent systems, observability, safety | Multi-agent orchestrator, dynamic planning engine |

#### 🔧 DevOps / SRE
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | Linux basics, Git commands, what is CI/CD | Explain version control, what is a container | Write a Dockerfile, basic bash script |
| **Medium** | Docker compose, Kubernetes pods, Terraform basics, monitoring | Blue-green deployment, rollback strategies | K8s manifest, GitHub Actions workflow |
| **Advanced** | Service mesh, chaos engineering, SLOs/SLIs, distributed tracing | Incident management, capacity planning | Helm charts, custom monitoring pipeline |

#### 🛡️ Cybersecurity Analyst
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | CIA triad, types of malware, basic encryption | What is a firewall? Explain phishing | Password strength checker, hash comparison |
| **Medium** | OWASP Top 10, SQL injection, XSS, HTTPS/TLS | Explain threat modeling, vulnerability assessment | Input sanitizer, JWT validation logic |
| **Advanced** | Zero trust, penetration testing, SOC operations, SIEM | Incident response plan, security architecture | Log anomaly detector, RBAC implementation |

#### 📱 Mobile Developer
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | Native vs cross-platform, app lifecycle, basic UI components | What is React Native? Explain state in mobile apps | Simple screen with button + state |
| **Medium** | Navigation, local storage, API integration, push notifications | Explain hot reload, performance optimization | List with API data, local caching logic |
| **Advanced** | Native modules, animations, offline-first, app store optimization | Architecture patterns (MVVM, Clean), testing strategies | Custom animation, background sync service |

#### 🎨 UI/UX Designer
| Level | MCQ Topics | Interview Topics | Coding Topics → Case Study |
|-------|-----------|-----------------|---------------------------|
| **Easy** | Color theory, typography basics, Gestalt principles | What is user-centered design? Explain wireframes | *Case study:* Redesign a login page for accessibility |
| **Medium** | Design systems, responsive design, usability heuristics | Conduct a heuristic evaluation of a given app | *Case study:* Design an onboarding flow for a fitness app |
| **Advanced** | Motion design, micro-interactions, design ops, A/B testing | Information architecture for a complex SaaS product | *Case study:* Design a dashboard for a healthcare platform |

#### ☁️ Cloud / AWS Engineer
| Level | MCQ Topics | Interview Topics | Coding Topics |
|-------|-----------|-----------------|--------------|
| **Easy** | Cloud vs on-prem, S3, EC2, basic IAM | What is cloud computing? Explain regions/AZs | Simple S3 upload script, IAM policy |
| **Medium** | Lambda, API Gateway, VPC, RDS, CloudFormation | Serverless vs containers, auto-scaling | Lambda function, CloudFormation template |
| **Advanced** | Multi-region, disaster recovery, cost optimization, CDK | Well-Architected Framework, compliance | Multi-service architecture, IaC pipeline |

#### 📋 Product Manager
| Level | MCQ Topics | Interview Topics | Coding Topics → Case Study |
|-------|-----------|-----------------|---------------------------|
| **Easy** | What is Agile/Scrum, user stories, MVP definition | Explain product lifecycle, how do you prioritize? | *Case study:* Write user stories for a food delivery app |
| **Medium** | Metrics (DAU, MAU, NPS), roadmapping, A/B testing | How would you decide what to build next? | *Case study:* Prioritize a feature backlog with limited resources |
| **Advanced** | Unit economics, platform strategy, growth frameworks | Go-to-market strategy for a B2B SaaS product | *Case study:* Define success metrics for a new AI feature |

#### 👥 HR & Behavioral
| Level | MCQ Topics | Interview Topics | Coding Topics → Case Study |
|-------|-----------|-----------------|---------------------------|
| **Easy** | Workplace etiquette, teamwork basics | Tell me about yourself, strengths & weaknesses | *Case study:* How would you onboard a new team member? |
| **Medium** | Conflict resolution, leadership styles, STAR framework | Describe a time you failed and what you learned | *Case study:* Resolve a disagreement between two senior engineers |
| **Advanced** | Organizational culture, executive communication, negotiation | How would you lead a team through a major pivot? | *Case study:* Build a team culture document for a 50-person startup |

---

### Level Scaling Rules

| Aspect | 🟢 Easy | 🟡 Medium | 🔴 Advanced |
|--------|---------|----------|-------------|
| **MCQ count** | 5 questions | 7 questions | 10 questions |
| **MCQ timer** | 60 sec/question | 45 sec/question | 30 sec/question |
| **Interview questions** | 2 questions | 3 questions | 4 questions |
| **Interview timer** | 8 minutes | 12 minutes | 15 minutes |
| **Coding problems** | 1 easy problem | 1 medium problem | 2 hard problems |
| **Coding timer** | 8 minutes | 12 minutes | 20 minutes |
| **Total full interview** | ~21 minutes | ~29 minutes | ~45 minutes |
| **Scoring threshold** | Pass ≥ 50% | Pass ≥ 60% | Pass ≥ 70% |

> [!NOTE]
> As level increases: fewer seconds per MCQ, harder topics, more questions, longer coding challenges. This mirrors how real interviews scale from fresher to senior roles.

---

## Part B — 3-Round Interview Engine

### User Review Required

> [!IMPORTANT]
> **Interview Mode Options**: Two modes in setup:
> - 🏆 **Full Interview** (all 3 rounds: MCQ → Interview → Coding)
> - ⚡ **Quick Practice** (single round, pick one type)

> [!IMPORTANT]
> **MCQ Format**: 4-option MCQ, single correct answer, auto-graded with instant feedback (green ✅ / red ❌ + correct answer reveal). Timer decreases with difficulty level.

> [!IMPORTANT]
> **Round Transition**: Between rounds, a transition card shows the completed round score and previews the next round. Users can skip any round.

### Open Questions

> [!IMPORTANT]
> **Q1**: For the Live Interview round, it auto-matches the selected role (e.g., Data Scientist → ML questions, PM → product strategy). Sound good?

> [!IMPORTANT]
> **Q2**: MCQ count scales by level (5 → 7 → 10). Does this feel right, or would you prefer a fixed count?

> [!IMPORTANT]
> **Q3**: Independent timers per round (varies by level — see table above). Or single global timer?

> [!IMPORTANT]
> **Q4**: Non-coding roles (HR, PM, UI/UX) get a **case study** in Round 3 instead of a code editor. Good?

---

## Proposed Changes

### Question Library

#### [MODIFY] [app.js](file:///c:/Users/TANVI/OneDrive/Desktop/Antigravity_workspace/app.js) — `MOCK_QUESTIONS` → `QUESTION_BANK`
- Restructure into `QUESTION_BANK[role][level][round]`:
  ```js
  const QUESTION_BANK = {
    "frontend": {
      easy: {
        mcq: [{ text: "What does HTML stand for?", options: [...], correct: 2, explanation: "..." }, ...],
        interview: [{ text: "What is the DOM?", hint: "...", modelAnswer: "..." }, ...],
        coding: [{ text: "Write code to toggle a CSS class on button click.", hint: "...", modelAnswer: "..." }]
      },
      medium: {
        mcq: [...],    // React hooks, closures, Flexbox
        interview: [...], // Virtual DOM, useEffect
        coding: [...]     // Build a todo, debounce
      },
      advanced: {
        mcq: [...],    // SSR, Webpack, performance APIs
        interview: [...], // Code splitting, Web Workers
        coding: [...]     // Virtual scroll, custom hooks
      }
    },
    "genai": {
      easy: { mcq: [...], interview: [...], coding: [...] },
      medium: { mcq: [...], interview: [...], coding: [...] },
      advanced: { mcq: [...], interview: [...], coding: [...] }
    },
    // ... all 14 roles × 3 levels
  }
  ```

---

### Setup Wizard

#### [MODIFY] [app.js](file:///c:/Users/TANVI/OneDrive/Desktop/Antigravity_workspace/app.js) — `viewSetup()`
- **Step 1 — Choose Mode**: Full Interview vs Quick Practice
- **Step 2 — Choose Role**: 14-card grid with icons, searchable
  ```
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 💻       │ │ 🗄️       │ │ 📊       │ │ 🧠       │
  │ Frontend │ │ Backend  │ │ Data     │ │ Data     │
  │Developer │ │Developer │ │ Analyst  │ │Scientist │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ ✨       │ │ 🤖       │ │ 🔧       │ │ 🛡️       │
  │ GenAI    │ │ Agentic  │ │ DevOps   │ │ Cyber    │
  │ Engineer │ │AI Engr.  │ │ / SRE    │ │ Security │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 📱       │ │ 🎨       │ │ ☁️       │ │ 📋       │
  │ Mobile   │ │ UI/UX    │ │ Cloud    │ │ Product  │
  │Developer │ │ Designer │ │ / AWS    │ │ Manager  │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘
                    ┌──────────┐
                    │ 👥 HR &  │
                    │Behavioral│
                    └──────────┘
  ```
- **Step 3 — Choose Level**: 3 level cards with topic preview:
  ```
  ┌─────────────────────────────────────────────────────────┐
  │ 🟢 EASY — Fresher / Entry Level                        │
  │ Topics: HTML tags, CSS selectors, JS basics, DOM        │
  │ Duration: ~21 mins | 5 MCQs | 2 Interview Qs | 1 Code  │
  ├─────────────────────────────────────────────────────────┤
  │ 🟡 MEDIUM — Mid-Level / 1-3 Years                      │
  │ Topics: React hooks, closures, Flexbox/Grid, state mgmt │
  │ Duration: ~29 mins | 7 MCQs | 3 Interview Qs | 1 Code  │
  ├─────────────────────────────────────────────────────────┤
  │ 🔴 ADVANCED — Senior / 3+ Years                        │
  │ Topics: SSR, Webpack, performance, micro-frontends      │
  │ Duration: ~45 mins | 10 MCQs | 4 Interview Qs | 2 Code │
  └─────────────────────────────────────────────────────────┘
  ```
  Each card shows the **specific topics** for the selected role at that level.
- **Step 4 — Settings**: Webcam, voice, resume (existing)
- **Step 5 — Confirmation**: Full summary with role + level + round breakdown

---

### Interview Engine

#### [MODIFY] `startInterviewSession()`
- Add `level: "easy" | "medium" | "advanced"` to session config
- Load questions from `QUESTION_BANK[role][level]` for each round
- Scale MCQ count, timer, and coding problems based on level rules table

#### [NEW] `viewMCQRound()` — Round 1
- Level-aware MCQ timer (60s / 45s / 30s per question)
- Level-aware question count (5 / 7 / 10)
- Instant feedback with correct answer + brief explanation
- Round header shows level badge: "🟡 Medium — MCQ Fundamentals"

#### [MODIFY] `viewInterview()` — Round 2 (existing, adapted)
- Level-aware question count and timer
- Round header: "🟡 Medium — Live Technical Interview"

#### [MODIFY] `viewInterview()` for Coding — Round 3 (existing, adapted)
- Level-aware problem count (1 easy / 1 medium / 2 hard)
- Non-coding roles → case study text area

#### [NEW] `viewRoundTransition()` — Between rounds
- Shows round score + next round preview with level-appropriate topic hints

---

### AI Analysis & Results

#### [MODIFY] `generateFinalAnalysisReport()`
- Per-round scores + level context:
  ```js
  {
    role: "frontend",
    level: "medium",
    roundScores: {
      mcq: { score: 80, correct: 5, total: 7 },
      interview: { score: 72, avgPerQuestion: 72 },
      coding: { score: 85 }
    },
    overallScore: 79,
    aiRecommendations: {
      strengths: ["Strong React fundamentals", "Good code structure"],
      focusAreas: ["Practice explaining closures verbally", "Review CSS Grid"],
      levelAdvice: "You scored 79% on Medium. Try Advanced to challenge yourself!",
      nextSteps: "Focus on: useEffect cleanup patterns, CSS Grid template-areas"
    }
  }
  ```
- **Level-aware AI recommendations**:
  | Score × Level | AI Says |
  |---------------|---------|
  | Easy ≥ 80% | "Great fundamentals! Move up to Medium to test deeper knowledge." |
  | Easy < 50% | "Review basics before progressing. Focus on: [weak MCQ topics]." |
  | Medium ≥ 80% | "Solid mid-level skills! Try Advanced for senior-level challenges." |
  | Medium 60-80% | "Good progress. Strengthen: [lowest-scoring round topics]." |
  | Advanced ≥ 80% | "🏆 Interview-ready! You're performing at senior engineer level." |
  | Advanced < 60% | "Advanced is tough. Revisit Medium-level [topic] before retrying." |

#### [MODIFY] `viewResults()` — Enhanced report
- **Level badge** in header: "🟡 Medium — Frontend Developer"
- **Per-round score cards**: MCQ / Interview / Coding with individual scores
- **AI Coach panel**: Level-aware strengths, focus areas, and "try next level" prompt
- **Round tabs**: Drill into each round's detailed Q&A with correct/incorrect breakdowns
- **Level progression indicator**: "You've completed: Easy ✅ → Medium ✅ → Advanced 🔒"

---

### History & Analytics

#### [MODIFY] `viewHistory()`
- Add **Level** column showing 🟢/🟡/🔴 badge
- Add **Role** column with role name
- Add **per-round score pills**: `MCQ: 80% | INT: 72% | CODE: 85%`

#### [MODIFY] `viewAnalytics()`
- **Performance by Role** chart — avg scores per job role
- **Level Progression** chart — scores across Easy → Medium → Advanced over time
- **Round Comparison** chart — MCQ vs Interview vs Coding trend lines
- **AI Focus Heatmap** — which topics/areas need the most work

---

### Backend

#### [MODIFY] [server.ts](file:///c:/Users/TANVI/OneDrive/Desktop/Antigravity_workspace/backend/src/server.ts)
- Expand `INTERVIEW_LIBRARY` with all 14 roles × 3 levels × 3 round types
- New endpoint: `GET /api/questions/mcq?role=genai&level=medium`
- Modify: `GET /api/questions?role=frontend&level=advanced&round=interview`
- Modify: `POST /api/history` to accept `level` and `roundScores`

#### [MODIFY] [schema.prisma](file:///c:/Users/TANVI/OneDrive/Desktop/Antigravity_workspace/backend/prisma/schema.prisma)
- Add `mode` (`String` — "full" / "quick") to `InterviewSession`
- Add `level` (`String` — "easy" / "medium" / "advanced") to `InterviewSession`
- Add `roundScores` (`String?` — JSON) to `InterviewSession`
- Add `roundType` (`String?` — "mcq" / "interview" / "coding") to `QuestionAnswer`

---

### Styling

#### [MODIFY] [styles.css](file:///c:/Users/TANVI/OneDrive/Desktop/Antigravity_workspace/styles.css)
- **Role grid**: 4-column responsive grid with hover-lift cards and Lucide icons
- **Level selector**: 3 stacked cards with color-coded left border (green/amber/red), topic preview, and duration badge
- **Level badges**: Pill-shaped colored badges (🟢 Easy, 🟡 Medium, 🔴 Advanced)
- **MCQ round**: Option cards with A/B/C/D, circular timer, correct/incorrect animations
- **Round transition**: Centered card with score badge and countdown
- **Results round tabs**: Tab navigation (MCQ | Interview | Coding)
- **AI Focus panel**: Gradient-bordered card with recommendations
- **Level progression bar**: Visual showing Easy ✅ → Medium ✅ → Advanced 🔒
- **Responsive**: Role grid → 2 cols on mobile, MCQ options → stacked on mobile

---

## Verification Plan

### Manual Testing
1. **Quick Practice**: Verify single-round flow works with all 14 roles × 3 levels
2. **Full Interview (Easy)**: Start as "GenAI Engineer Easy" → MCQ (5 Qs, 60s each) → Interview (2 Qs) → Coding (1 Q) → Results with level badge
3. **Full Interview (Advanced)**: Start as "Frontend Advanced" → MCQ (10 Qs, 30s each) → Interview (4 Qs) → Coding (2 Qs) → Results with level progression
4. **Non-coding roles**: HR/PM/UI/UX get case study in Round 3
5. **Level recommendations**: Score 85% on Easy → AI says "Move up to Medium"
6. **Round skipping**: Skip a round → still get partial analysis
7. **Timer scaling**: Verify MCQ timer changes per level (60s/45s/30s)
8. **History page**: Shows role, level badge, and per-round scores
9. **Analytics**: Charts show level progression and role comparison
