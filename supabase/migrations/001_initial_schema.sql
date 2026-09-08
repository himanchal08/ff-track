-- ============================================================
-- 001_initial_schema.sql
-- Full schema for the Fitness Tracker website (all phases).
-- Apply with: supabase db push  OR  supabase migration up
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- WEIGHT TRACKING (Phase 1)
-- ============================================================

create table if not exists public.weight_logs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  date         date not null,
  weight_kg    numeric(5,2) not null check (weight_kg > 0),
  notes        text,
  created_at   timestamptz not null default now(),
  unique (user_id, date)
);

-- NOTE: pace is NEVER stored — it is always calculated from distance_km / time_seconds.
-- A stored pace column would be a bug.

alter table public.weight_logs enable row level security;

create policy "weight_logs_select" on public.weight_logs
  for select using (auth.uid() = user_id);
create policy "weight_logs_insert" on public.weight_logs
  for insert with check (auth.uid() = user_id);
create policy "weight_logs_update" on public.weight_logs
  for update using (auth.uid() = user_id);
create policy "weight_logs_delete" on public.weight_logs
  for delete using (auth.uid() = user_id);

-- ============================================================
-- WORKOUT PLANS (Phase 2)
-- ============================================================

create table if not exists public.workout_plans (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  day_label    text not null,
  exercises    jsonb not null default '[]',
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.workout_plans enable row level security;

create policy "workout_plans_select" on public.workout_plans
  for select using (auth.uid() = user_id);
create policy "workout_plans_insert" on public.workout_plans
  for insert with check (auth.uid() = user_id);
create policy "workout_plans_update" on public.workout_plans
  for update using (auth.uid() = user_id);
create policy "workout_plans_delete" on public.workout_plans
  for delete using (auth.uid() = user_id);

-- ============================================================
-- WORKOUT LOGS (Phase 2)
-- sets stores an array of rep counts, e.g. [12, 10, 9]
-- ============================================================

create table if not exists public.workout_logs (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  date             date not null,
  workout_plan_id  uuid not null references public.workout_plans(id) on delete restrict,
  exercise         text not null,
  sets             jsonb not null default '[]',
  weight_used_kg   numeric(6,2),
  created_at       timestamptz not null default now()
);

alter table public.workout_logs enable row level security;

create policy "workout_logs_select" on public.workout_logs
  for select using (auth.uid() = user_id);
create policy "workout_logs_insert" on public.workout_logs
  for insert with check (auth.uid() = user_id);
create policy "workout_logs_update" on public.workout_logs
  for update using (auth.uid() = user_id);
create policy "workout_logs_delete" on public.workout_logs
  for delete using (auth.uid() = user_id);

-- ============================================================
-- PERSONAL RECORDS (Phase 2)
-- Derived from workout_logs; updated when a new log beats the record.
-- ============================================================

create table if not exists public.personal_records (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  exercise        text not null,
  best_reps       integer,
  best_weight_kg  numeric(6,2),
  achieved_at     date not null,
  created_at      timestamptz not null default now(),
  unique (user_id, exercise)
);

alter table public.personal_records enable row level security;

create policy "personal_records_select" on public.personal_records
  for select using (auth.uid() = user_id);
create policy "personal_records_insert" on public.personal_records
  for insert with check (auth.uid() = user_id);
create policy "personal_records_update" on public.personal_records
  for update using (auth.uid() = user_id);
create policy "personal_records_delete" on public.personal_records
  for delete using (auth.uid() = user_id);

-- ============================================================
-- RUNNING LOGS (Phase 3)
-- pace is NEVER stored — derived as: (time_seconds / 60) / distance_km
-- ============================================================

create table if not exists public.running_logs (
  id                        uuid primary key default gen_random_uuid(),
  user_id                   uuid not null references auth.users(id) on delete cascade,
  date                      date not null,
  distance_km               numeric(6,3) not null check (distance_km > 0),
  time_seconds              integer not null check (time_seconds > 0),
  continuous_run_seconds    integer,
  created_at                timestamptz not null default now(),
  unique (user_id, date)
);

alter table public.running_logs enable row level security;

create policy "running_logs_select" on public.running_logs
  for select using (auth.uid() = user_id);
create policy "running_logs_insert" on public.running_logs
  for insert with check (auth.uid() = user_id);
create policy "running_logs_update" on public.running_logs
  for update using (auth.uid() = user_id);
create policy "running_logs_delete" on public.running_logs
  for delete using (auth.uid() = user_id);

-- ============================================================
-- BODY PROGRESS (Phase 4)
-- ============================================================

create table if not exists public.body_progress (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  date             date not null,
  weight_kg        numeric(5,2),
  waist_cm         numeric(5,1),
  chest_cm         numeric(5,1),
  front_photo_url  text,
  side_photo_url   text,
  created_at       timestamptz not null default now(),
  unique (user_id, date)
);

alter table public.body_progress enable row level security;

create policy "body_progress_select" on public.body_progress
  for select using (auth.uid() = user_id);
create policy "body_progress_insert" on public.body_progress
  for insert with check (auth.uid() = user_id);
create policy "body_progress_update" on public.body_progress
  for update using (auth.uid() = user_id);
create policy "body_progress_delete" on public.body_progress
  for delete using (auth.uid() = user_id);

-- ============================================================
-- MEALS — REFERENCE DATA (Phase 6)
-- These three tables are READ-ONLY from the app — no RLS user_id needed.
-- They are populated once by the admin (service role) and never change.
-- ============================================================

-- Daily constants (e.g., chana, almonds, bhunja chana, fruit)
create table if not exists public.meal_constants (
  id                      uuid primary key default gen_random_uuid(),
  item_name               text not null unique,
  requires_overnight_soak boolean not null default false
);

-- Weekday-keyed lunch rotation
create table if not exists public.meal_rotation (
  id                      uuid primary key default gen_random_uuid(),
  weekday                 integer not null check (weekday between 0 and 6), -- 0=Sun
  ingredient              text not null,
  requires_overnight_soak boolean not null default false,
  unique (weekday)
);

-- Breakfast / snack / dinner option sets (choose ONE per meal type per day)
create table if not exists public.meal_choices (
  id           uuid primary key default gen_random_uuid(),
  meal_type    text not null check (meal_type in ('breakfast', 'snack', 'dinner')),
  option_label text not null,
  ingredients  jsonb not null default '[]'
  -- ingredients: [{ "name": "...", "requires_overnight_soak": false }]
);

-- Public read-only access for the reference tables
alter table public.meal_constants enable row level security;
alter table public.meal_rotation enable row level security;
alter table public.meal_choices enable row level security;

create policy "meal_constants_public_read" on public.meal_constants
  for select using (true);
create policy "meal_rotation_public_read" on public.meal_rotation
  for select using (true);
create policy "meal_choices_public_read" on public.meal_choices
  for select using (true);

-- ============================================================
-- DAILY MEAL SELECTION (Phase 6)
-- Which "choose ONE" option is active today/tomorrow.
-- NOT a log/history table — only today's and optionally tomorrow's selection.
-- ============================================================

create table if not exists public.daily_meal_selection (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  date              date not null,
  meal_type         text not null check (meal_type in ('breakfast', 'snack', 'dinner')),
  chosen_option_id  uuid not null references public.meal_choices(id) on delete restrict,
  unique (user_id, date, meal_type)
);

alter table public.daily_meal_selection enable row level security;

create policy "daily_meal_selection_select" on public.daily_meal_selection
  for select using (auth.uid() = user_id);
create policy "daily_meal_selection_insert" on public.daily_meal_selection
  for insert with check (auth.uid() = user_id);
create policy "daily_meal_selection_update" on public.daily_meal_selection
  for update using (auth.uid() = user_id);
create policy "daily_meal_selection_delete" on public.daily_meal_selection
  for delete using (auth.uid() = user_id);

-- ============================================================
-- INDEXES for performance (Phase 5 — pre-aggregation support)
-- ============================================================

create index if not exists idx_weight_logs_user_date
  on public.weight_logs (user_id, date desc);

create index if not exists idx_workout_logs_user_date
  on public.workout_logs (user_id, date desc);

create index if not exists idx_running_logs_user_date
  on public.running_logs (user_id, date desc);

create index if not exists idx_body_progress_user_date
  on public.body_progress (user_id, date desc);

create index if not exists idx_daily_meal_selection_user_date
  on public.daily_meal_selection (user_id, date desc);
