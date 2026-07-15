# MockMate AI — Complete UX Flow & State Analysis
### Wireframe-Level Screen States, Empty States, Error States, Edge Cases

**Version:** 1.0
**Companion to:** Frontend PRD (Chapters 1–17) and Backend/DB/Workflow/Deployment PRD
**Purpose:** Your existing Frontend PRD specifies the *default/happy-path* layout for every screen in beautiful detail. This document specifies **every other state** each screen can be in — loading, empty, error, partial, and edge case — because these are the states that get skipped when designing in Stitch and break in production if they're not written down first.

---

## 0. Why this document exists (and how to use it)

A screen's default layout is maybe 20% of what you actually need to build. The other 80% is: *what does this look like before the data arrives, while it's arriving, if it fails to arrive, if there's nothing to show, and if the user does something unexpected?*

This document goes chapter-by-chapter, matching your Frontend PRD's chapter numbers (Chapter 4 = Landing, Chapter 5 = Auth, etc.), and for each screen defines a **state matrix**:

| State | When it happens | What the user sees |
|---|---|---|
| Loading | Data is being fetched | ... |
| Empty | Successful fetch, zero records | ... |
| Error | Fetch/action failed | ... |
| Partial | Some data missing/degraded | ... |
| Edge cases | Unusual but real scenarios | ... |

**Rule for implementation:** when you hand a screen to Stitch or describe it to Antigravity/Claude Code, paste in the relevant state table from this doc alongside the layout spec from the Frontend PRD. A screen isn't "done" until all five rows have been built and manually triggered at least once.

---

## 1. Global States (apply to every screen — define once, reuse everywhere)

These five states recur across nearly every screen in the app. Define the visual pattern once here; each chapter below only notes screen-specific exceptions.

### 1.1 Global Loading Pattern
- **Skeleton screens, not spinners**, for anything showing data shapes we already know (cards, lists, tables) — a gray pulsing placeholder in the exact shape of the real content, so the layout doesn't jump when data arrives.
- **Spinners only** for actions with no predictable shape (e.g. "Generating your next question…").
- Never show a blank white screen for longer than ~150ms — if data might resolve faster than that, don't show loading UI at all (prevents flicker).

### 1.2 Global Empty State Pattern
- Icon or small illustration (not a generic broken-image placeholder) + one-sentence explanation + one primary call-to-action button. Never just the words "No data."
- Tone matches Product Personality (§1.12 of Frontend PRD): encouraging, never apologetic ("Nothing here yet" not "Sorry, no results found").

### 1.3 Global Error State Pattern
- Three tiers, escalating by severity:
  1. **Inline field error** (e.g. invalid email) — red text directly under the field, no modal, no page reload.
  2. **Toast/banner error** (e.g. "Couldn't save changes, try again") — non-blocking, dismissible, doesn't lose the user's place.
  3. **Full-page error** (e.g. interview not found, server unreachable) — only when the page genuinely cannot render without the missing data; always includes a way back (button to Dashboard), never a dead end.
- Error copy is always specific about *what* failed and *what to do next* — never just "Something went wrong."

### 1.4 Global Network-Loss Pattern
- Detect `navigator.onLine` / failed fetch and show a persistent, non-intrusive banner ("You're offline — reconnecting…") rather than letting individual components fail silently.
- Any in-flight form submission should be preserved in local component state and auto-retried or clearly flagged for manual resubmission once connectivity returns — never silently dropped.

### 1.5 Global Session-Expiry Pattern
- Clerk session expires mid-use → next API call returns 401 → frontend redirects to login **but preserves intended destination** (e.g. mid-interview), so after re-login the user lands back where they were, not back at the dashboard from scratch. (Note: an in-progress interview's conversation state lives in the database per-turn, so this is recoverable — see Chapter 8 analysis below for exactly how.)

---

## 2. Chapter 4 — Landing Page: State Analysis

Your Frontend PRD covers the default layout fully. Additional states:

| State | Trigger | Behavior |
|---|---|---|
| **Already logged in** | A logged-in user navigates to `/` directly | Redirect straight to Dashboard — don't show marketing copy to existing users. This is a common miss that makes a product feel unfinished. |
| **Slow image/asset load** | Hero illustration or animation hasn't loaded | Reserve the exact layout space (fixed aspect-ratio container) before the asset loads, so the page doesn't jump/reflow once it arrives. |
| **JS disabled / very slow connection** | Rare, but real for some users on poor mobile networks | Core value proposition text and the Sign Up CTA must be in the initial HTML, not injected only after JS hydration — keeps the page meaningful even in degraded conditions. |
| **Direct deep-link to a feature anchor** (e.g. `/#features`) | User arrives from a shared link | Page should scroll to that section on load, not just land at the top. |

---

## 3. Chapter 5 — Authentication (Login & Signup): State Analysis

This is the highest-stakes screen for state coverage — auth bugs directly block usage.

| State | Trigger | Behavior |
|---|---|---|
| **Loading (submit)** | User clicks Sign Up/Login | Button shows inline spinner + disables itself immediately (prevents double-submit, the single most common auth bug). Form fields lock, not hide. |
| **Validation error (inline)** | Invalid email format, password too short, etc. | Inline red text under the exact field, on blur — not only on submit. Never clear the user's other valid fields. |
| **Wrong credentials** | Login attempt fails | Single generic message ("Email or password is incorrect") — never reveal which field was wrong (security: prevents account enumeration). |
| **Account already exists** | Signup attempt with existing email | Clear message + direct link to Login, pre-filling the email if possible — turn the dead-end into a one-click recovery. |
| **Email not verified** | Clerk requires verification, user hasn't completed it | Don't silently fail — show a clear "check your inbox" state with a resend-verification action. |
| **OAuth (Google/GitHub) cancelled** | User closes the OAuth popup | Return to the auth form in its prior state — don't show an error for a deliberate cancellation, just silently reset. |
| **Network failure mid-auth** | Clerk request times out | Toast error + button re-enables; never leave the button stuck in a permanent loading state (the "frozen button" is one of the most trust-destroying bugs in any app). |
| **Already logged in, visits /login** | Logged-in user navigates back to auth page | Redirect to Dashboard immediately. |
| **Password reset flow** | User clicks "Forgot password" | Needs its own three states: request-sent confirmation, invalid/expired reset link, and successful-reset confirmation redirecting to login. |
| **Rate-limited by Clerk** | Too many failed attempts | Show the cooldown clearly ("Too many attempts — try again in 2 minutes") rather than a generic error that looks like a bug. |

---

## 4. Chapter 7 — Interview Setup Page: State Analysis

| State | Trigger | Behavior |
|---|---|---|
| **Loading roles** | `GET /roles` in flight | Skeleton cards in the exact grid shape the real role cards will use. |
| **Empty roles list** | Backend seed failed or returned nothing (shouldn't happen in V1, but must not crash) | Friendly fallback message + a "Contact support" link rather than a blank selection grid. |
| **No role selected, user clicks Start** | User tries to proceed without choosing | Disable the Start button until a valid selection exists, rather than allowing the click and then erroring — prevents a wasted round trip. |
| **Interview-start API failure** | Claude API or backend error on `POST /interviews` | Stay on the Setup page, show a toast ("Couldn't start your interview — try again"), do **not** navigate to the Live Interview screen with broken/empty state. |
| **Slow start (Claude is slow to generate Q1)** | Network/API latency | Setup button shows a loading state with reassuring copy ("Preparing your interviewer…") rather than appearing frozen; cap at a reasonable timeout (e.g. 15s) before falling back to an error with a retry button. |
| **User has an existing in-progress interview** | User abandoned a previous interview without finishing | Detect this on page load and offer a choice: "Resume your unfinished [Role] interview" vs. "Start a new one" — don't let incomplete interviews silently accumulate and confuse the history later. |

---

## 5. Chapter 8 — Live Interview Experience: State Analysis

This is the **single highest-risk screen** in the entire app — it's where a user spends the most time, where the most things can go wrong mid-flow, and where a bad state handling decision directly costs the user their progress. Treat this section as mandatory reading before building this screen.

| State | Trigger | Behavior |
|---|---|---|
| **Question loading** | Claude generating the next question after an answer is submitted | Typing-indicator animation (per §6.2 of the Backend/Workflow PRD) in the AI panel — never a blank gap between questions. Disable the answer input while this is happening so the user can't submit a second answer before the first round-trip completes. |
| **Empty answer submission attempt** | User clicks Submit with an empty/whitespace-only textarea | Block client-side, inline message ("Type an answer before submitting") — never send an empty answer to the backend; it pollutes the transcript and wastes a Claude call. |
| **Very short / low-effort answer** | User types "idk" or one word and submits | Allow it (don't block — that's the user's choice), but the *interviewer's next response* should naturally acknowledge a thin answer and probe further, exactly as a real interviewer would. This is a prompt-design concern (Backend PRD §2.8), not a UI block — the UI's job is just to allow honest input. |
| **Very long answer** | User pastes an essay-length answer | Set a soft max length (e.g. 2000 characters) with a live counter that turns amber near the limit — protects against runaway token cost without feeling restrictive for genuine detailed answers. |
| **Answer submission fails (network/API error)** | `POST .../answer` fails | **Critical: never clear the user's typed answer from the input on failure.** Keep it in the textarea, show an inline retry button. Losing a typed answer to a network blip is one of the most frustrating things that can happen in this kind of app. |
| **User tries to navigate away mid-interview** | Browser back button, closing tab, clicking a nav link | Trigger a confirmation dialog ("Leave this interview? Your progress will be saved, but the interview will end as incomplete.") — use `beforeunload` for tab close, and a router guard for in-app navigation. |
| **User refreshes the page mid-interview** | Accidental F5/Cmd+R | On reload, check for an `IN_PROGRESS` interview belonging to the user and **restore the exact conversation state** by re-fetching `GET /interviews/:id` (which returns the full message history) rather than restarting — this is exactly why every message is persisted to the database per-turn, not held only in frontend memory. |
| **Session expires mid-interview** | Clerk token expires during a long interview | Per the Global Session-Expiry Pattern (§1.5): redirect to login, then back to this exact interview ID afterward — the conversation resumes, it does not restart. |
| **Claude returns something malformed or off-topic** | Rare model failure | Backend should already guard this (see Backend PRD §2.9 retry/fallback logic) — but the frontend should specifically handle a fallback message gracefully (display it like a normal interviewer line) rather than showing a raw error inside the chat thread. |
| **User reaches the last question** | `questionCount` hits the cap | The "Submit" button on the final answer should relabel itself contextually (e.g. "Finish Interview" instead of "Next Question") so the user isn't surprised when the screen transitions to Analysis afterward. |
| **User wants to exit early on purpose** | Clicks "Exit Interview" button (per Chapter 8.5 of Frontend PRD) | Confirmation dialog distinguishing this from an accidental close; on confirm, mark `Interview.status = ABANDONED` (not `COMPLETED`) — this matters for analytics accuracy (don't count abandoned interviews as completed ones in the Phase 2 dashboard stats). |
| **Multiple tabs open on the same interview** | User opens the same interview in two browser tabs | Out of scope to fully solve in V1 — acceptable behavior is "last write wins," but the UI should not crash; each tab simply reflects its own fetch. Document this as a known limitation rather than silently risking a confusing bug report. |

---

## 6. Chapter 9 — AI Analysis Page: State Analysis

This screen is intentionally a "waiting room" — but waiting rooms are exactly where users lose patience or assume the app broke.

| State | Trigger | Behavior |
|---|---|---|
| **Normal wait (a few seconds)** | Scoring call in flight | Rotating status messages (per Backend/Workflow PRD §6.2) — never a static "Loading…" for more than ~2 seconds. |
| **Long wait (Claude is slow)** | Scoring call taking longer than expected | After ~8–10 seconds, status text should shift to acknowledge the wait explicitly ("Almost there, just double-checking the details…") rather than looping the same 3 messages indefinitely, which starts to feel broken even if it isn't. |
| **Scoring fails entirely (after backend retries)** | Backend's Claude call fails twice (per Backend PRD §2.9) | Full-page-level error, not a silent infinite spinner: "We couldn't generate your feedback right now. Your answers are saved — you can try generating feedback again." Include a manual retry button that re-triggers scoring server-side rather than forcing the user to redo the interview. |
| **User navigates away during analysis** | Closes tab / hits back while scoring is in progress | This must be safe — scoring happens server-side regardless of whether the frontend is still watching, so the result is simply waiting in the database when the user next visits the History page. The frontend polling/waiting state is disposable; the backend process is not. |
| **Scoring completes faster than the minimum animation time** | Claude responds in under a second | Still show the status sequence for a minimum floor (e.g. 2–3 seconds total) rather than instantly flashing through it — an instant transition here reads as unfinished/cheap rather than impressively fast. |

---

## 7. Chapter 10 — Interview Results & AI Feedback: State Analysis

| State | Trigger | Behavior |
|---|---|---|
| **Normal load** | `GET /feedback/:interviewId` succeeds | Per §6.2 of Backend/Workflow PRD: count-up score animation, staggered card reveal. |
| **Feedback genuinely doesn't exist yet** | User somehow lands here before scoring finished (e.g. manually edited URL) | Redirect back to the Analysis screen for that interview rather than showing a broken/empty results page. |
| **Feedback exists but interview was abandoned** | User tries to view results for an `ABANDONED` interview | These should never have feedback (scoring only triggers on `COMPLETED`) — show a clear state instead: "This interview was not completed, so no feedback is available," with an option to start a new one. |
| **Very low score** | Overall score is low (e.g. under 40) | This is a tone/microcopy state, not a technical one — per Backend/Workflow PRD §6.3, feedback copy must stay encouraging regardless of score. Visually, avoid harsh red for the score number even at low scores — use the brand's warning/amber tone rather than alarm-red, consistent with Chapter 2's color system, so a bad score still feels like useful information rather than a punishment. |
| **Perfect/very high score** | Score near 100 | Don't over-celebrate to the point of seeming insincere or gamified for what's meant to be a serious prep tool — a tasteful acknowledgment (per §6.2's micro-celebration guidance) is enough; avoid full-screen confetti takeovers. |
| **Sharing/exporting results** | If this exists in scope (check Frontend PRD Chapter 10 for whether export is in V1) | If included: handle the case where export (PDF/image generation) fails independently of the page itself having loaded fine — export failure shouldn't make it look like the whole results page is broken. |
| **Trying to view someone else's results** | Manipulated interview ID in URL | 403/404 full-page state with a clear message and a button back to Dashboard — never a blank page or raw JSON error (ties back to the security checklist in Backend PRD §2.10). |

---

## 8. Chapter 11 — Interview History Page: State Analysis

| State | Trigger | Behavior |
|---|---|---|
| **Loading** | History list fetching | Skeleton rows matching the real list-item shape. |
| **Empty (brand new user)** | Zero interviews ever completed | Per Backend/Workflow PRD §6.2: illustrated empty state + single CTA ("Take your first mock interview"). |
| **Only abandoned interviews exist** | User started but never finished any interview | Distinct from the zero-interviews empty state — message should acknowledge the attempt rather than acting like nothing happened: "You've started practicing — finish an interview to see your results here," with a CTA to resume or start fresh. |
| **Pagination edge** | User has many interviews | Loading-more state at the bottom of the list (skeleton row(s), not a full-page reload) when fetching the next page. |
| **One item fails to load detail** | Clicking into a specific past interview fails | Error scoped to that detail view only — the list itself, and the rest of its items, must remain usable; one bad record shouldn't take down navigation to everything else. |
| **Filtering/sorting (if in scope)** | User filters by role/type/date | Explicit empty state for "no results match this filter" — distinct from the true zero-interviews empty state, with a clear "clear filters" action. |

---

## 9. Chapter 12 — Analytics Dashboard: State Analysis

| State | Trigger | Behavior |
|---|---|---|
| **Insufficient data for a trend line** | User has completed only 1 interview | A single data point can't show a "trend" — show that one point clearly labeled, with a message like "Complete 2+ interviews to see your progress trend" rather than an empty/broken-looking chart axis. |
| **Zero data** | No completed interviews yet | Full empty state, same pattern as History — don't render an empty chart frame with no explanation. |
| **Loading** | Analytics aggregation in flight | Skeleton chart shapes (a grayed-out placeholder bar/line chart silhouette) rather than a generic spinner — sets the expectation of what's about to appear. |
| **Aggregation/calculation error** | Backend analytics endpoint fails | Scoped error within the chart's card only — the rest of the dashboard (summary cards, etc.) should still render independently if their own data fetched successfully. Treat each dashboard widget as independently loadable/failable, not one all-or-nothing page load. |
| **Streak just broken** | User missed a day after an active streak | Don't hide the streak number or silently reset to 0 without context — a brief, gentle acknowledgment ("Your streak reset — let's start a new one today!") turns a potentially discouraging moment into a re-engagement nudge, consistent with the Product Personality. |

---

## 10. Chapter 13 — User Profile & Career Profile: State Analysis

| State | Trigger | Behavior |
|---|---|---|
| **Loading profile** | Initial fetch | Skeleton form fields, not a blank form that suddenly populates (which reads as a layout jump). |
| **Save in progress** | User submits profile edits | Disable the save button + show inline saving indicator; don't let a second click double-submit. |
| **Save succeeds** | `PATCH /users/me` returns 200 | Brief, non-intrusive success confirmation (e.g. a toast or a button that briefly shows a checkmark) — avoid a jarring full-page reload to show success. |
| **Save fails (validation)** | e.g. an invalid field format | Inline field-level error, exactly as in the Auth screen's pattern — preserve every other field's entered value. |
| **Save fails (network/server)** | API/network error | Toast error, form values remain exactly as the user left them, retry is just clicking save again — never force a page refresh to retry. |
| **Resume upload in progress** *(Phase 4 feature)* | File uploading to Cloudinary | Progress indicator on the upload control itself; disable starting a new interview action until upload settles, since Phase 4's prompt-personalization depends on having a stable resume reference. |
| **Resume upload fails** | File too large / wrong format / network failure | Specific error per cause ("File must be a PDF under 5MB" vs. "Upload failed, try again") — don't collapse different failure reasons into one generic message. |
| **Avatar image fails to load** | Broken Cloudinary URL or slow CDN | Fallback to initials-based avatar (a colored circle with the user's initials) rather than a broken-image icon — this is a one-line frontend rule that prevents a surprisingly common "ugly" first impression. |

---

## 11. Chapter 14 — Settings Page: State Analysis

| State | Trigger | Behavior |
|---|---|---|
| **Toggle saves instantly** | e.g. theme toggle, notification preference toggle | Optimistic UI update (flip immediately in the UI) + fire the save request in the background; on failure, revert the toggle and show a brief error — don't make the user wait for a round-trip just to flip a switch. |
| **Account deletion requested** | User clicks "Delete Account" (required per Pre-Launch Checklist, Backend/Workflow PRD §8) | This needs its own confirmation flow, not a single click: explicit confirmation dialog stating exactly what will be deleted, ideally requiring the user to type a confirmation phrase or re-enter their password — irreversible actions need deliberately higher friction than everything else in the app. |
| **Account deletion succeeds** | Deletion completes | Immediate logout + redirect to landing page with a neutral confirmation ("Your account has been deleted") — not the dashboard, not a broken authenticated state. |
| **Account deletion fails** | Server error mid-deletion | Critical to get right: never leave the account in a half-deleted state. The backend operation should be wrapped in a single database transaction; the frontend should show a clear failure message and the account should remain fully intact and usable if the transaction rolled back. |
| **Changing email (if supported via Clerk)** | User updates email | Needs a "check your new inbox to confirm" intermediate state — the email shouldn't change in the UI until Clerk confirms the change is verified. |

---

## 12. Chapter 15 — Notifications & Activity Center: State Analysis

| State | Trigger | Behavior |
|---|---|---|
| **Loading** | Fetching notification list | Skeleton list items. |
| **Empty** | No notifications yet | Light, simple empty state — this one doesn't need a strong CTA like other empty states, since "no notifications" is a normal, non-actionable state, not a missed opportunity. A quiet "You're all caught up" is enough. |
| **New notification arrives while viewing the app** | Real-time or next-poll arrival | Badge count updates without requiring a manual refresh — if true real-time isn't in V1 scope, a periodic poll (e.g. every 60s) is an acceptable substitute; just don't require a full page reload to see new ones. |
| **Marking as read fails** | Network error on a read-state update | Fail silently with a background retry rather than surfacing an error toast for something this low-stakes — not every failure needs to interrupt the user. |
| **Notification links to deleted/missing content** | e.g. a notification about an interview that was later somehow removed | Clicking it shows a graceful "this is no longer available" state rather than a broken navigation or crash. |

---

## 13. Chapter 16 — Help & Support Center: State Analysis

| State | Trigger | Behavior |
|---|---|---|
| **Search with no results** | User searches the help center for something not covered | Explicit "no matching articles" state with a fallback action (e.g. "Contact support" or "Suggest a topic") rather than a blank results area. |
| **Contact form submission** | User submits a support request | Standard loading → success/error pattern as in Auth/Profile; success state should set clear expectations ("We typically respond within 24 hours") rather than just "Sent!" with no context. |
| **Contact form fails to send** | Network/server error | Preserve everything the user typed; never make them retype a support message because of a transient failure — this is especially important since they're already reaching out because something went wrong elsewhere. |

---

## 14. Cross-Cutting Edge Cases (apply across multiple screens)

These don't belong to one chapter — they're scenarios that touch the whole app and are easy to miss if only thought about screen-by-screen.

| Edge case | Why it matters | Required behavior |
|---|---|---|
| **User has JavaScript-disabled image blocking / ad-blocker interfering with Cloudinary or Clerk's embedded scripts** | Real-world browser environments aren't clean | Auth and core interview flow must not silently break if a non-essential asset (e.g. an avatar image) is blocked — fail gracefully per-component, never block the whole page on a non-critical resource. |
| **Clock skew / timezone differences** | Interview timestamps, streak calculations | All timestamps stored in UTC in the database (Prisma's `DateTime` does this by default); streak/date-based logic computed using the user's local timezone on the frontend for *display*, but the backend's "consecutive day" calculation should be timezone-aware too, or a student practicing late at night near midnight will see an incorrectly broken streak. Flag this explicitly to whoever builds the streak logic. |
| **Concurrent requests from a flaky network (double-tap on mobile)** | Mobile users often double-tap buttons | Every mutating action (submit answer, start interview, save profile) must be idempotent-safe on the frontend — disable-on-click is the minimum; ideally the backend also tolerates a duplicate request gracefully rather than creating two rows. |
| **Browser back/forward through the interview flow** | Users naturally use back/forward navigation | Back button from Results shouldn't silently re-trigger Analysis or duplicate a Claude call — route guards should treat completed interviews as read-only history, not as a flow to be replayed. |
| **Extremely small or extremely large viewport** | Real device diversity beyond "desktop/tablet/mobile" buckets | Test at actual edge widths (e.g. 320px iPhone SE width, and ultra-wide 2560px+ monitors) — most responsive bugs hide exactly at these extremes, not at the common breakpoints already specified in Chapter 17 of the Frontend PRD. |
| **Long names / long role titles / long feedback text overflowing fixed-width containers** | Real user data is messier than placeholder text | Every text container that holds user- or AI-generated content needs an explicit overflow strategy (truncate with ellipsis + tooltip, or wrap) decided at design time — "it just breaks the layout" is not an acceptable fallback. |
| **User's first language isn't English / answers in another language** | Real, especially likely given the target audience | Decide and document the behavior explicitly: does the AI interviewer respond in kind, or does the system gently redirect to English for V1? This should be a deliberate product decision, not an accident of however Claude happens to respond — recommend stating in the system prompt that the interview is conducted in English for V1, with multilingual support as a clearly scoped future phase. |

---

## 15. State-Coverage Checklist (use this before considering any screen "done")

For every screen you build, confirm you can answer yes to all of these:

- [ ] Have I seen this screen's loading state with my own eyes (not just assumed it works)?
- [ ] Have I seen this screen's empty state with a fresh/zero-data account?
- [ ] Have I deliberately broken the network (devtools offline mode) on this screen and confirmed it fails gracefully?
- [ ] Have I tried submitting this screen's primary action twice quickly (double-click/double-tap)?
- [ ] If this screen shows another user's data by ID, have I tried accessing an ID that isn't mine?
- [ ] Does this screen behave correctly after a hard refresh in the middle of whatever it's doing?
- [ ] Is every error message on this screen specific enough that a non-technical user would know what to do next?

This checklist is intentionally the same regardless of which chapter/screen you're on — running it consistently is what turns "looks done" into "actually done."
