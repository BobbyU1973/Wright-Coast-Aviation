# Next Session Notes

Last updated: April 20, 2026.

## Current Project State

- Local site: `http://localhost:3000`
- Project path: `C:\Users\IEPBU\OneDrive\Desktop\Web Sites\Wright Coast Aviation`
- Target domain: `wrightcoastaviation.com`
- Booking URL: `https://www.flightcircle.com/shop/80c1316b45c4`
- Contact email: `info@wrightcoastaviation.com`
- Phone: `(336) 416-1834`
- Airport: Dare County Regional Airport, Manteo, NC

## Site Direction

Wright Coast Aviation should feel fun, polished, mobile-friendly, and rooted in
the wonder of flying in the Outer Banks, the birthplace of flight. The site is
positioned as a flight school offering intro flight experiences for tourists and
training options for locals, part-time residents, and future pilots.

## Current Public Pages

- Home
- Reserve Your Spot
- Gallery
- Reviews
- FAQ
- Contact
- Privacy
- Terms
- Accessibility
- Admin login

Removed public pages:

- About
- Payments
- Schedule

## Important UX Decisions

- Use the logo prominently because it feels fun and memorable.
- Book Now buttons should always be light green.
- Public booking buttons link out to FlightCircle.
- No Stripe for now.
- No custom email server.
- Gallery supports 50+ photos with thumbnails, category filters, lazy loading,
  load-more behavior, and a mobile-friendly lightbox-style viewer.

## Admin/CMS

Admin dashboard is planned around Supabase Auth and Supabase database/storage.

Owner should be able to manage:

- Photos
- Testimonials/reviews
- Services/flight experiences
- Leads
- Homepage copy
- FlightCircle booking URL

Admin login route:

```text
/admin/login
```

## Deployment Plan

Recommended production setup:

- Domain/DNS/email: likely Hostinger, Cloudflare, or Porkbun
- Website hosting/deployment: Vercel
- CMS/database/storage/auth: Supabase
- Booking/payment/passenger info: FlightCircle
- Business email: Hostinger email, Zoho Mail, Microsoft 365, Google Workspace,
  iCloud+, Proton, or Cloudflare Email Routing depending on budget/needs

If using Hostinger tomorrow:

1. Buy/confirm `wrightcoastaviation.com`.
2. Enable WHOIS privacy, auto-renew, and domain lock.
3. Avoid buying unnecessary web hosting unless needed for another reason.
4. Deploy site to Vercel.
5. Add domain in Vercel.
6. Point Hostinger DNS records to Vercel.
7. Set up branded email and add MX/SPF/DKIM/DMARC records.
8. Create Supabase project.
9. Run `supabase/schema.sql`.
10. Add Vercel environment variables.
11. Create owner user in Supabase Auth.
12. Test admin dashboard, contact form, gallery, services, reviews, FAQ, and
    FlightCircle links.

## Build Status

Production build passed after Stripe removal:

```bash
npm.cmd run build
```

No Stripe references remained in app/docs/package files after cleanup.

## Next Good Tasks

1. Buy or verify the domain.
2. Decide on email provider.
3. Create Supabase project and run schema.
4. Deploy to Vercel.
5. Add production environment variables.
6. Connect domain DNS.
7. Set up business email DNS records.
8. Test the live site end to end.
9. Later, add deeper SEO/local landing pages if needed.
10. Later, clone this using `docs/flight-school-template-checklist.md`.
