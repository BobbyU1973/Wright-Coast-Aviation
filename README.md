# Wright Coast Aviation

Modern Next.js website for Wright Coast Aviation, an Outer Banks flight school
offering intro flights, flight training, owner-editable content, contact leads,
and a FlightCircle booking link.

## Stack

- Next.js App Router
- Tailwind CSS
- Supabase database, storage, and auth
- Optional Resend contact form email notifications
- Vercel deployment

## Features

- Fun responsive public site with Home, Reserve Your Spot, Gallery, Reviews,
  FAQ, Contact, Privacy, Terms, and Accessibility pages.
- Owner dashboard protected by Supabase Auth.
- Dashboard CRUD for gallery photos, reviews, FAQs, services, lead status,
  homepage copy, and FlightCircle URL.
- Book Now buttons link directly to FlightCircle for booking and passenger
  information.
- Supabase Storage uploads for gallery photos, plus category filters, load more,
  and full-screen photo browsing.
- Contact form lead capture with optional branded email notification.
- Mobile-first navigation, forms, image grids, and admin cards.
- SEO template foundations: canonical metadata, Open Graph, Twitter cards,
  sitemap, robots rules, manifest, reusable SEO helper, and JSON-LD.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

PowerShell may block `npm.ps1`; use `npm.cmd` if that happens:

```bash
npm.cmd install
npm.cmd run dev
```

## Environment Variables

Copy `.env.example` to `.env.local`, then set:

```bash
NEXT_PUBLIC_SITE_URL=https://wrightcoastaviation.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=owner@wrightcoastaviation.com
```

Optional branded email notifications:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=info@wrightcoastaviation.com
CONTACT_FROM_EMAIL="Wright Coast Aviation <no-reply@wrightcoastaviation.com>"
```

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Create the owner user in **Authentication > Users**.
5. Add that email to `ADMIN_EMAILS`.

The schema creates:

- `site_content`
- `services`
- `gallery_photos`
- `testimonials`
- `faqs`
- `leads`
- public `gallery` storage bucket

Public visitors can read active content. Admin writes happen through server
actions using the Supabase service role key.

## Owner Dashboard

Open `/admin/login`, then sign in with the Supabase Auth user listed in
`ADMIN_EMAILS`.

Owner actions:

- Add Photo
- Add Review
- Add FAQ
- Add Service
- View and update leads
- Edit homepage copy
- Edit the FlightCircle booking URL

## FlightCircle Booking

Public Book Now buttons link clients out to FlightCircle for Intro Flights or
Flight Training:

```text
https://www.flightcircle.com/shop/80c1316b45c4
```

The owner can update this URL from the dashboard if FlightCircle changes the
booking link later.

## Vercel Deployment

1. Push this project to GitHub.
2. Import it into Vercel.
3. Add all environment variables in Vercel.
4. Deploy.
5. Add `wrightcoastaviation.com` in Vercel project domain settings.
6. Add `www.wrightcoastaviation.com` as a secondary domain and redirect it to
   `wrightcoastaviation.com`.

See `docs/domain-email-setup.md` for DNS, email, SPF, DKIM, and DMARC notes.
See `docs/flight-school-template-checklist.md` when cloning this for another
flight school.

## Reusing for Another Service Business

Most business-specific content lives in:

- `src/lib/site.ts`
- `src/lib/seo.ts`
- `src/lib/sample-data.ts`
- Supabase `site_content`, `services`, `gallery_photos`, `testimonials`,
  `faqs`, and `leads`
- `public/brand`
- `public/images`

Swap the logo, colors, sample content, service names, and domain/email settings
to clone this for another service business.

For flight school sites, update `src/lib/seo.ts` keywords, Supabase service
records, testimonials, FlightCircle booking URL, domain email addresses, and
local service area copy before launch.
