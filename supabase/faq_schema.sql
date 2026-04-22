create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists faqs_active_sort_idx
on public.faqs(active, sort_order);

alter table public.faqs enable row level security;

drop policy if exists "Public can read active FAQs" on public.faqs;

create policy "Public can read active FAQs"
on public.faqs for select
using (active = true);

insert into public.faqs (question, answer, active, sort_order)
select *
from (
  values
    ('Do I need flight experience?', 'No experience is needed. Intro flights are designed for first-time flyers and are guided by a Certified Flight Instructor.', true, 1),
    ('Can I really take the controls?', 'Yes, when conditions allow. Your instructor will guide you from the pilot seat so you can feel what flying is like.', true, 2),
    ('Why fly while visiting the Outer Banks?', 'The Outer Banks is the Birthplace of Flight, full of water, sky, history, and wide-open views. An intro flight gives visitors a vacation memory they cannot get anywhere else.', true, 3),
    ('Do you offer training for locals?', 'Yes. Wright Coast Aviation offers flight training for full-time and part-time residents who want to train to be a pilot in the Manteo area.', true, 4)
) as seed(question, answer, active, sort_order)
where not exists (select 1 from public.faqs);
