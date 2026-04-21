# Domain, DNS, and Business Email Setup

Use this guide for `wrightcoastaviation.com`. Do not build a custom email
server. Buy the domain from a registrar, deploy the website on Vercel, and use
a third-party email provider for domain email.

## Domain Registrar Recommendation

Any reputable registrar works because Vercel only needs DNS records. Good
options:

| Registrar | Best fit |
| --- | --- |
| Cloudflare Registrar | Lowest-friction DNS, at-cost renewals, free WHOIS privacy |
| Porkbun | Low yearly pricing, simple dashboard, cheap hosted email |
| Hostinger | Fine if the owner wants one beginner-friendly account |
| Vercel Domains | Simple if the owner wants domain and deployment in Vercel |

Avoid buying a web hosting package unless it is needed for another site. This
project is designed to deploy on Vercel.

## Vercel Domain

1. Deploy the project to Vercel.
2. In Vercel, open the project, then go to **Settings > Domains**.
3. Add `wrightcoastaviation.com` as the primary production domain.
4. Add `www.wrightcoastaviation.com` as a secondary domain and redirect it to
   `wrightcoastaviation.com`.
5. Vercel will show the exact DNS records it wants. Use those values if they
   differ from the common defaults below.

Typical records:

| Type | Name | Value | Purpose |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | Apex domain to Vercel |
| CNAME | `www` | `cname.vercel-dns.com` or Vercel-provided value | `www` subdomain |

Vercel's current docs recommend checking the project-specific records in Vercel
because recommended values can vary by project or plan:
https://vercel.com/docs/domains/set-up-custom-domain

## Business Email Recommendation

Recommended addresses:

| Address | Use |
| --- | --- |
| `info@wrightcoastaviation.com` | Contact form and general inquiries |
| `support@wrightcoastaviation.com` | Customer support |
| `dmarc@wrightcoastaviation.com` | DMARC aggregate reports |

Choose one email provider. Do not enable multiple mailbox providers for the
same domain unless an email specialist is managing the migration.

Low-cost options:

| Provider | Use when |
| --- | --- |
| Zoho Mail | You want a real low-cost mailbox with `info@wrightcoastaviation.com` |
| Cloudflare Email Routing | You only need free inbound forwarding to an existing Gmail/Outlook inbox |
| Porkbun Email Hosting | You want simple, cheap email tied to the registrar |
| iCloud+ Custom Email Domain | The owner already lives in Apple Mail and only needs a small setup |
| Proton Mail | Privacy matters more than lowest cost |
| Google Workspace or Microsoft 365 | You want the most familiar business email suite |

Cloudflare Email Routing is not a full mailbox. It forwards inbound mail, but
the owner should use Zoho, Porkbun, Google Workspace, Microsoft 365, iCloud+, or
Proton if they need clean sending from `info@wrightcoastaviation.com`.

## Google Workspace DNS

Google's current MX guidance for newer Workspace setups uses one MX record:

| Type | Name | Priority | Value |
| --- | --- | --- | --- |
| MX | `@` | `1` | `smtp.google.com` |

SPF:

| Type | Name | Value |
| --- | --- | --- |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |

DKIM:

Generate the DKIM record in Google Admin, then add the TXT record Google
provides. The common selector host is `google._domainkey`, but use the exact
host and value from Google Admin.

DMARC starter record:

| Type | Name | Value |
| --- | --- | --- |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@wrightcoastaviation.com; pct=100` |

After SPF and DKIM have been stable, tighten DMARC from `p=none` to
`p=quarantine`, then eventually `p=reject` if reports look healthy.

Official Google references:

- MX records: https://support.google.com/a/answer/7174013
- DKIM: https://support.google.com/a/answer/174124
- DMARC: https://support.google.com/a/answer/2466580

## Microsoft 365 DNS

Microsoft 365 gives a unique MX target in the admin center. Use the exact target
shown there.

Common records:

| Type | Name | Priority | Value |
| --- | --- | --- | --- |
| MX | `@` | `0` | Value shown in Microsoft 365 Admin |
| CNAME | `autodiscover` | n/a | Value shown in Microsoft 365 Admin |
| TXT | `@` | n/a | `v=spf1 include:spf.protection.outlook.com -all` |

DKIM:

Microsoft typically provides two CNAME records:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `selector1._domainkey` | Value shown in Microsoft 365 Admin |
| CNAME | `selector2._domainkey` | Value shown in Microsoft 365 Admin |

DMARC starter record:

| Type | Name | Value |
| --- | --- | --- |
| TXT | `_dmarc` | `v=DMARC1; p=none; pct=100; rua=mailto:dmarc@wrightcoastaviation.com` |

Official Microsoft references:

- DNS records: https://learn.microsoft.com/en-us/microsoft-365/admin/get-help-with-domains/create-dns-records-at-any-dns-hosting-provider
- DMARC: https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure

## Contact Form Email Routing

The contact form always saves leads to Supabase when Supabase is configured. To
send email notifications:

1. Verify `wrightcoastaviation.com` with Resend or another transactional email
   provider.
2. Add the provider's SPF/DKIM records to DNS.
3. Set these Vercel environment variables:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=info@wrightcoastaviation.com
CONTACT_FROM_EMAIL="Wright Coast Aviation <no-reply@wrightcoastaviation.com>"
```

The website does not host or run its own email server.

## FlightCircle Booking

The site includes direct Book Now buttons that link to FlightCircle.
Use this booking URL for Intro Flights or Flight Training:

```text
https://www.flightcircle.com/shop/80c1316b45c4
```

The owner can still update **FlightCircle URL** in the dashboard if the booking
link changes later.
