# LLM Development Rules — Fitness Tracker Website

Rules for any LLM/coding agent working on this codebase: Next.js + TypeScript mobile-first website, Supabase (Postgres/Auth/Storage), deployed on Vercel. Read before generating code.

---

## 1. Non-negotiable scope boundary

1. **Meals & Soak is display-only.** Never add a table, API route, or UI element that logs "did I eat this," tracks adherence, or computes calories/macros from the meal-plan data. If a task description implies logging a meal as eaten, stop and flag it — that's out of scope by explicit product decision, not an oversight.
2. **This is a website, not a native app.** Don't introduce React Native, Capacitor, or any native-wrapper tooling unless explicitly asked — "mobile-first" here means responsive web design, not a packaged app.
3. **Single-user product.** Don't add multi-tenant abstractions, team/sharing features, or public-facing account creation flows — one account, one person, ever.
4. **No calorie tracker, no nutrition database, no social features.** These are explicit exclusions in the product spec. Don't add them "as a nice bonus" on an unrelated task.
5. **Pace, 7-day average, and PR detection are always derived, never manually entered.** A form field for "pace" or "weekly average weight" is a bug — these are calculated from raw distance/time or raw weight entries.

---

## 2. Tech stack — current APIs

- **Next.js App Router**, TypeScript strict mode, no `any`.
- **Tailwind CSS** for mobile-first layout — design for one-handed, large-touch-target use first, then verify it also works on desktop, not the other way around.
- **Supabase JS client v2**, typed from the generated DB schema — regenerate types after every migration.
- **Recharts** (or an equivalently lightweight chart library) for trend lines — avoid heavyweight analytics/BI-style charting libraries; the product spec explicitly wants "simple graphs and trend indicators rather than complicated analytics."
- **Supabase Storage** for Body Progress photos, private bucket, path-scoped to the single user.
- **SQL migrations committed to Git**, applied via the Supabase CLI — no ad hoc schema edits through the dashboard for anything meant to persist.

---

## 3. Row Level Security

Even for a single-user product, apply RLS on every table exactly as if it were multi-user: `auth.uid() = user_id` on select/insert/update/delete. This costs nothing extra to build now and prevents a future mistake (e.g., a leaked Supabase anon key) from exposing the data. Explicit per-operation policies, not one broad policy assumed to cover all four.

---

## 4. Calculation correctness

1. **7-day average, pace, and PR detection each live in one shared calculation function**, reused by the Home summary, the dedicated Weight/Running/Workout pages, and the Progress Dashboard — never reimplemented per-screen.
2. **Weekly/Monthly/Quarterly/Yearly views share one aggregation function** parameterized by date range — a quarterly bug is a monthly bug waiting to happen if these are implemented separately.
3. **Pre-aggregate for wider date ranges** (weekly/monthly rollups) rather than recomputing from every raw daily row on every yearly-view render — a year of daily weight/workout logs should not make the Yearly dashboard slow.
4. **Guard every average/trend calculation against sparse data** (e.g., only 2 weight entries this month) — show "not enough data yet" rather than a misleading trend line drawn from too few points.

---

## 5. Meals & Soak implementation rules

1. The soak-required flag lives on the ingredient/reference data, not hardcoded into the reminder-generation logic — if a task involves adding a new meal option, the soak flag is set on that new row, and the existing Soak Tonight logic picks it up automatically without a code change.
2. The Soak Tonight card's logic order is fixed: always show the daily constant → check tomorrow's fixed lunch rotation → check tomorrow's dinner only if already pre-selected. Don't have it guess or default a dinner choice that hasn't been made.
3. This feature has no database table for history — it computes from `meal_constants` + `meal_rotation` + `meal_choices` + today's/tomorrow's `daily_meal_selection` and today's date, live, on every page load. Don't add a `soak_log` or `meal_log` table unless the product scope explicitly changes to include logging.

---

## 6. Code style & architecture

- Functional components, named exports, feature-based folders (`features/weight`, `features/workouts`, `features/running`, `features/body-progress`, `features/meals`).
- Shared calculation logic (averages, pace, PR detection, date-range aggregation) lives in plain TypeScript modules with no React/Next imports, so they're independently unit-testable.
- Every date-range query is explicit about which boundary it uses (calendar week/month/quarter/year) — don't let "week" silently mean different date ranges in different parts of the codebase.

---

## 7. Testing rules

- Unit tests for: 7-day average, pace calculation, PR detection, weight/measurement delta calculation, and the Soak Tonight selection logic (test with fixtures covering "no dinner pre-selected," "dinner pre-selected with a soak item," and "tomorrow's rotation has no soak-required ingredient").
- RLS policies tested with an actual authenticated Supabase client, not only as the service role.

---

## 8. When acting as a coding agent on this repo

1. Before adding a field or table, check §1 — if it looks like it would let the user log something about meals eaten, don't build it without confirming the scope has actually changed.
2. If a task touches an existing calculation (average, pace, PR, aggregation), reuse the shared module — don't reimplement it inline for a new screen.
3. Prefer the smallest correct change; this is a small, deliberately simple product — resist the urge to add analytics, fields, or feature depth beyond what's specified.
