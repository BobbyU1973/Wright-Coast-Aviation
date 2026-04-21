create extension if not exists "pgcrypto";

create table if not exists public.site_content (
  id integer primary key default 1 check (id = 1),
  hero_eyebrow text not null,
  hero_headline text not null,
  hero_subheadline text not null,
  primary_cta_label text not null,
  secondary_cta_label text not null,
  intro_heading text not null,
  intro_text text not null,
  flightcircle_url text not null default 'https://www.flightcircle.com/shop/80c1316b45c4',
  scheduling_cta_label text not null default 'Book Now',
  scheduling_cta_text text not null default 'Book Intro Flights or Flight Training through FlightCircle and enter passenger information in one simple flow.',
  contact_cta_headline text not null,
  contact_cta_text text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content
add column if not exists flightcircle_url text not null default 'https://www.flightcircle.com/shop/80c1316b45c4';

alter table public.site_content
add column if not exists scheduling_cta_label text not null default 'Book Now';

alter table public.site_content
add column if not exists scheduling_cta_text text not null default 'Book Intro Flights or Flight Training through FlightCircle and enter passenger information in one simple flow.';

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  description text not null,
  price_label text,
  image_url text,
  is_featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  storage_path text,
  caption text,
  category text,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  location text,
  rating integer check (rating between 1 and 5),
  quote text not null,
  is_featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_id uuid references public.services(id) on delete set null,
  service_interest text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists services_active_sort_idx on public.services(active, sort_order);
create index if not exists gallery_featured_sort_idx on public.gallery_photos(is_featured, sort_order);
create index if not exists testimonials_active_sort_idx on public.testimonials(active, sort_order);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create unique index if not exists services_slug_unique_idx on public.services(slug);
create unique index if not exists gallery_image_url_unique_idx on public.gallery_photos(image_url);

alter table public.site_content enable row level security;
alter table public.services enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.testimonials enable row level security;
alter table public.leads enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content for select
using (true);

drop policy if exists "Public can read active services" on public.services;
create policy "Public can read active services"
on public.services for select
using (active = true);

drop policy if exists "Public can read gallery photos" on public.gallery_photos;
create policy "Public can read gallery photos"
on public.gallery_photos for select
using (true);

drop policy if exists "Public can read active testimonials" on public.testimonials;
create policy "Public can read active testimonials"
on public.testimonials for select
using (active = true);

drop policy if exists "Public can create leads" on public.leads;
create policy "Public can create leads"
on public.leads for insert
with check (true);

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read gallery storage" on storage.objects;
create policy "Public can read gallery storage"
on storage.objects for select
using (bucket_id = 'gallery');

insert into public.site_content (
  id,
  hero_eyebrow,
  hero_headline,
  hero_subheadline,
  primary_cta_label,
  secondary_cta_label,
  intro_heading,
  intro_text,
  flightcircle_url,
  scheduling_cta_label,
  scheduling_cta_text,
  contact_cta_headline,
  contact_cta_text
)
values (
  1,
  'ENJOY FLYING AT THE BIRTHPLACE OF FLIGHT - THE NC OBX!',
  'Book an unforgettable vacation flight or start training to become a pilot.',
  'There is no better place to fly than the coast where aviation history began. Fly from Dare County Regional Airport in Manteo while visiting the Outer Banks, or start training close to home.',
  'Book Now',
  'View Flight Experiences',
  'The Outer Banks was made for this moment.',
  'Visitors come here for ocean air, wide-open views, and the story of flight itself. Wright Coast Aviation lets you become part of that story with hands-on intro flights, while full-time and part-time residents can train with a local school built for confidence, consistency, and real progress.',
  'https://www.flightcircle.com/shop/80c1316b45c4',
  'Book Now',
  'Book Intro Flights or Flight Training through FlightCircle and enter passenger information in one simple flow.',
  'Questions before you fly?',
  'Message Wright Coast Aviation and we will help you choose the right intro flight or training path.'
)
on conflict (id) do update set
  hero_eyebrow = excluded.hero_eyebrow,
  hero_headline = excluded.hero_headline,
  hero_subheadline = excluded.hero_subheadline,
  primary_cta_label = excluded.primary_cta_label,
  secondary_cta_label = excluded.secondary_cta_label,
  intro_heading = excluded.intro_heading,
  intro_text = excluded.intro_text,
  flightcircle_url = excluded.flightcircle_url,
  scheduling_cta_label = excluded.scheduling_cta_label,
  scheduling_cta_text = excluded.scheduling_cta_text,
  contact_cta_headline = excluded.contact_cta_headline,
  contact_cta_text = excluded.contact_cta_text;

insert into public.services (title, slug, description, price_label, image_url, is_featured, active, sort_order)
values
  ('Intro Flight Experience', 'intro-flight-experience', 'Fly a real airplane with a Certified Flight Instructor. Perfect for first-time flyers -- no experience needed. Take the controls and experience what it feels like to fly. ~30-35 minutes of flight time.', '$179', '/images/cockpit-approach.jpg', true, true, 1),
  ('Intro Flight Experience - Most Popular', 'intro-flight-experience-most-popular', 'Our most popular introductory flight experience. Enjoy more time on the controls and a deeper feel for flying -- no experience needed. ~40-45 minutes of flight time.', '$219', '/images/cloud-view.jpg', true, true, 2),
  ('Extended Flight Experience', 'extended-flight-experience', 'Our most complete and immersive flight experience. Extended time to build confidence on the controls and fully experience what it is like to fly. ~60-70 minutes total experience.', '$259', '/images/ramp-new-plane.jpg', true, true, 3),
  ('10 Hour Flight Block', '10-hour-flight-block', 'A structured 10-hour flight training package designed to build consistency, confidence, and real progress in the aircraft.', '$1950', '/images/panel-view.jpg', true, true, 4),
  ('20 Hour Flight Block', '20-hour-flight-block', 'A 20-hour training package for students committed to consistent progression and long-term development as a pilot.', '$3850', '/images/student-plane.jpg', true, true, 5)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  price_label = excluded.price_label,
  image_url = excluded.image_url,
  is_featured = excluded.is_featured,
  active = excluded.active,
  sort_order = excluded.sort_order;

insert into public.gallery_photos (image_url, caption, category, is_featured, sort_order)
values
  ('/images/obx-coast.jpg', 'Outer Banks views from the air make the trip unforgettable.', 'Outer Banks', true, 1),
  ('/images/cockpit-approach.jpg', 'Hands-on flying with a Certified Flight Instructor.', 'Intro Flight', true, 2),
  ('/images/ramp-new-plane.jpg', 'Your intro flight begins at Dare County Regional Airport.', 'Manteo', true, 3),
  ('/images/panel-view.jpg', 'Flight training builds confidence and consistency.', 'Training', false, 4),
  ('/images/cloud-view.jpg', 'See the wonder of the coast from above.', 'Scenic', false, 5)
on conflict (image_url) do update set
  caption = excluded.caption,
  category = excluded.category,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;

insert into public.testimonials (customer_name, location, rating, quote, is_featured, active, sort_order)
values
  ('First-Time Flyer', 'Outer Banks Vacation', 5, 'I came in nervous and left smiling. Taking the controls over the coast was the highlight of our trip.', true, true, 1),
  ('Vacation Visitor', 'Manteo, NC', 5, 'Such a fun thing to do while visiting the Outer Banks. Easy to book, friendly instructor, unforgettable views.', true, true, 2),
  ('Student Pilot', 'North Carolina', 5, 'The intro flight made flight training feel possible. It was hands-on, relaxed, and exciting from start to finish.', true, true, 3)
on conflict do nothing;
