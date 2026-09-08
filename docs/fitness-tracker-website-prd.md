# Fitness Tracker Website — PRD

**Type:** Personal, mobile-first website (not a native app) for tracking weight and performance, with one supporting display feature for meals and soak reminders.
**Core principle:** LOG → TRACK → SEE PROGRESS. Weight and performance (workouts, running, body measurements) are tracked and logged. Meals & Soak is a read-only display feature — it is never logged or tracked as data.

---

## 1. Scope boundary (read this before building anything)

**Tracked (has history, has trend charts):** weight, workouts (sets/reps/PRs), running (distance/time/pace), body measurements + photos.
**Displayed only (no logging, no history, no adherence stats):** today's meal plan, tonight's soak checklist.

This boundary matters because it's easy to accidentally build a diet-logging feature by analogy with the other modules — don't. The Meals & Soak page reads from a fixed reference table and today's date; it does not write anything to a "did I eat this" log.

---

## 2. Recommended tech stack

| Layer | Recommendation | Notes |
|---|---|---|
| Framework | Next.js + TypeScript | Responsive/mobile-first from the same codebase — no separate native app needed |
| Styling | Tailwind CSS | Fast to build large-touch-target, one-hand-friendly mobile layouts |
| Charts | Recharts (or a lightweight alternative) | Simple trend lines only — no complex analytics library needed |
| Database | Supabase (Postgres + Auth + Storage) | Gives persistent cross-device history and photo storage for Body Progress with minimal setup; single-user, so no complex multi-tenant design needed |
| Auth | Supabase Auth, single account | This is a personal site, not a public product — a simple login is enough, no social sign-in needed |
| Hosting | Vercel | Matches the Next.js deployment target |
| Photos | Supabase Storage | Front/side photos for Body Progress, private bucket scoped to the one user |

---

## 3. Data model

- **`weight_logs`** — date, weight (kg), notes on measurement conditions optional
- **`workout_plans`** — day label (e.g., "Push Day"), ordered list of planned exercises
- **`workout_logs`** — date, workout_plan_id, exercise, sets (array of reps, e.g. `[12,10,9]`), optional weight used
- **`personal_records`** — derived: best set/rep/weight per exercise, auto-updated when a new log beats the existing record
- **`running_logs`** — date, distance, time, pace (calculated, not entered), continuous-run duration
- **`body_progress`** — date, weight, waist, chest, front_photo_url, side_photo_url
- **`meal_constants`** — fixed daily items (chana, bhunja chana, almonds, fruit), each with a `requires_overnight_soak` flag
- **`meal_rotation`** — weekday-keyed lunch pairing, each ingredient flagged for soak requirement
- **`meal_choices`** — the choose-one option sets for breakfast/snack/dinner, ingredients + soak flags
- **`daily_meal_selection`** — which "choose ONE" option is active today (and optionally tomorrow, if pre-picked) — this exists only so the Meals & Soak page knows what to display, not as a log/history table

---

## Phase 0 — Foundation

**Goal:** mobile-first site shell with the account and data layer in place; nothing analytical yet.

**Requirements**
- Next.js site, mobile-first responsive layout, large touch targets, one-hand-reachable primary actions
- Supabase project: schema, Auth (single account), Storage bucket for photos
- Home page shell with placeholders for: today's weight, today's workout, today's run, quick progress summary, today's meals preview

**Acceptance criteria**
- Site loads and is fully usable one-handed on a phone screen
- Login works; data persists across sessions and devices

---

## Phase 1 — Weight Tracking

**Requirements**
- Single quick-entry field for today's weight
- Automatic 7-day rolling average calculation
- Weight-trend graph emphasizing the trend line, with daily points shown but visually de-emphasized relative to the average line

**Acceptance criteria**
- Entering a weight takes one field and one tap
- The trend graph reads clearly even with noisy day-to-day fluctuation

---

## Phase 2 — Workout Tracking

**Requirements**
- Select a workout day (from a predefined plan); see the planned exercise list
- Enter sets × reps per exercise (matching the log format: e.g., Push-ups → 12/10/9)
- Automatic comparison against the previous session for the same workout day
- Automatic personal-record detection per exercise (best reps at a given set position, or heaviest weight if tracked)

**Acceptance criteria**
- Logging a full workout day takes under a minute of typing
- A new PR is visibly flagged at the moment it's logged, not just buried in history

---

## Phase 3 — Running Tracking

**Requirements**
- Enter distance and time; pace calculated automatically, never entered manually
- Continuous running time field
- Weekly progression view (distance/pace trend across the week, then rolling)

**Acceptance criteria**
- Pace is always derived, never a manually-entered field that could disagree with distance/time
- Weekly progression is visible without needing to open a separate report

---

## Phase 4 — Body Progress

**Requirements**
- Log weight, waist, chest, front photo, side photo
- Biweekly (every 2 weeks) comparison view: current vs. previous checkpoint, side-by-side photos, measurement deltas

**Acceptance criteria**
- Photo comparison is a simple side-by-side or slider view, not a separate gallery app
- Measurement deltas are shown as plain differences (e.g., "waist −1.5 cm"), not additional derived analytics

---

## Phase 5 — Progress Dashboard & Multi-Period Analysis

**Goal:** the same four indicators, viewable across week / month / quarter / year without any new logging.

**Requirements**
- Four indicators only: Weight ↓, Waist ↓, Strength ↑ (from workout progression/PRs), Running/Stamina ↑ (from running progression)
- A period switcher: Weekly / Monthly / Quarterly / Yearly — same charts, wider aggregation window; no new metrics are introduced at wider windows
- Yearly view additionally shows a compact month-by-month mini-chart per indicator and a chronological photo timeline (using the biweekly Body Progress photos already captured)

**Acceptance criteria**
- Switching periods re-renders the same four charts over a different date range — it never requires re-entering or re-deriving data
- Quarterly/yearly views remain fast even with a full year of daily weight logs and workout history (pre-aggregate rather than recomputing from raw rows on every view)

---

## Phase 6 — Meals & Soak (display-only feature)

**Requirements**
- Reference data loaded once: `meal_constants`, `meal_rotation`, `meal_choices`, each ingredient flagged for overnight-soak requirement
- **Today's Meals card:** daily constants + today's chosen breakfast option; today's fixed lunch rotation + daily staples; today's chosen snack option; today's chosen dinner option + staples + night milk
- **Soak Tonight card:** always includes the daily constant (chana); includes tomorrow's lunch-rotation ingredient if soak-required; includes tomorrow's dinner ingredient only if tomorrow's dinner has already been pre-selected and contains a soak-required item
- No logging: no "did I eat this," no history, no adherence percentage, no protein/calorie totals

**Acceptance criteria**
- The page requires zero data entry beyond picking which "choose ONE" option applies today (and optionally tomorrow's dinner in advance)
- Nothing on this page persists as trackable history — it reflects only today/tonight

---

## 4. Design rules (unchanged across all phases)

Mobile-first · large touch targets · one-hand friendly · very few input fields · fast logging · important information visible immediately · no social features · no calorie tracker · no nutrition database beyond the fixed meal-plan lookup needed for Phase 6 · no unnecessary notifications (the one allowed exception is a single, opt-in, off-by-default daily "soak tonight" reminder).
