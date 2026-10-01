-- Customer feedback for glammoresalon.in
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

create table if not exists public.customer_feedback (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 80),
  email       text not null check (char_length(email) between 3 and 254),
  services    text[] not null check (cardinality(services) between 1 and 10),
  rating      smallint not null check (rating between 1 and 5),
  message     text not null check (char_length(message) between 1 and 2000),
  approved    boolean not null default false
);

-- Row Level Security: the website (anon / publishable key) may only ADD feedback,
-- and only as unapproved. It cannot read, edit, or delete rows, so emails stay private.
alter table public.customer_feedback enable row level security;

drop policy if exists "Anyone can submit unapproved feedback" on public.customer_feedback;
create policy "Anyone can submit unapproved feedback"
  on public.customer_feedback
  for insert
  to anon
  with check (approved = false);

-- Public, read-only list of APPROVED feedback without emails. The website reads this
-- to show reviews. To approve one: Table Editor → customer_feedback → set approved = true.
create or replace view public.approved_feedback as
  select id, created_at, name, services, rating, message
  from public.customer_feedback
  where approved = true;

grant select on public.approved_feedback to anon;
