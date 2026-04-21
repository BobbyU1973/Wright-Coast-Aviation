# Flight School Template Checklist

Use this checklist when cloning the Wright Coast Aviation site for another
flight school.

## Business Settings

Update these first:

- Business name
- Domain
- Contact email
- Phone number
- Airport name
- City and state
- FlightCircle or booking URL
- Social profile URLs
- Logo files in `public/brand`
- Starter photos in `public/images`

Primary config files:

- `src/lib/site.ts`
- `src/lib/seo.ts`
- `src/lib/sample-data.ts`
- `.env.example`
- `supabase/schema.sql`

## SEO Swaps

Replace Wright Coast / Outer Banks language with the new school details:

- City flight school keywords
- Airport name
- Nearby tourist or metro areas
- Discovery flight / intro flight terms
- Flight training terms
- Local "things to do" terms if the school serves visitors

Keep the structure, but rewrite copy so each school feels local and specific.

## CMS Setup

For each new site:

1. Create a new Supabase project.
2. Run `supabase/schema.sql`.
3. Create the owner user in Supabase Auth.
4. Add the owner email to `ADMIN_EMAILS`.
5. Create the `gallery` storage bucket if it was not created by the schema.
6. Test photo upload, service editing, testimonials, and leads.

## Deployment Setup

Recommended stack:

- Vercel for hosting
- Supabase for CMS/database/storage/auth
- Registrar/DNS through Hostinger, Cloudflare, Porkbun, or Vercel
- Email through Hostinger Email, Zoho Mail, Google Workspace, Microsoft 365, or
  another third-party provider

Do not build or host a custom email server.

## Launch QA

Before launch, verify:

- Home page loads on mobile and desktop.
- Reserve Your Spot products are in the right order.
- Every Book Now button opens the correct booking URL.
- Gallery filters, load-more button, and photo viewer work.
- Reviews page has real or approved starter testimonials.
- FAQ reflects the new school's policies.
- Contact form saves leads.
- Optional email notifications arrive at the business email.
- Phone links call or text the correct number.
- Map/directions point to the correct airport.
- Footer email and phone are correct.
- Privacy, Terms, and Accessibility pages use the correct business name.
- Sitemap and robots routes load.
- Production build passes with `npm.cmd run build`.
