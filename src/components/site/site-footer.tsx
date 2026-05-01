"use client";

import Image from "next/image";
import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/admin/login", label: "Login" }
];

const socialLinks = [
  {
    href: siteConfig.social.facebook,
    label: "Facebook",
    Icon: FacebookIcon,
    className: "bg-[#1877f2] hover:bg-[#0f67da]"
  },
  {
    href: siteConfig.social.instagram,
    label: "Instagram",
    Icon: InstagramIcon,
    className:
      "bg-[linear-gradient(135deg,#f58529_0%,#feda77_22%,#dd2a7b_48%,#8134af_73%,#515bd4_100%)] hover:brightness-110"
  },
  {
    href: siteConfig.social.tiktok,
    label: "TikTok",
    Icon: TikTokIcon,
    className: "bg-white hover:bg-white/90"
  }
];

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M14.17 8.46h1.98V5.2a24.82 24.82 0 0 0-2.88-.15c-2.84 0-4.78 1.74-4.78 4.93v2.76H5.28v3.64h3.21v7.08h3.9v-7.08h3.2l.5-3.64h-3.7v-2.4c0-1.05.3-1.88 1.78-1.88Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
    >
      <rect
        x="4.8"
        y="4.8"
        width="14.4"
        height="14.4"
        rx="4.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.55" cy="7.45" r="1.05" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  const notePath =
    "M13.42 3.3v10.04a4.38 4.38 0 1 1-3.85-4.34v2.7a1.71 1.71 0 1 0 1.11 1.6V2.9h2.74c.26 1.6 1.43 2.92 3 3.36v2.72a7.05 7.05 0 0 1-3-.74Z";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
    >
      <path d={notePath} fill="#25F4EE" transform="translate(-0.7 0.55)" />
      <path d={notePath} fill="#FE2C55" transform="translate(0.65 -0.45)" />
      <path d={notePath} fill="#050505" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--charcoal)] text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
        <div>
          <Link href="/" className="focus-ring inline-flex">
            <Image
              src="/brand/wright-coast-aviation-logo.svg"
              alt="Wright Coast Aviation"
              width={210}
              height={110}
              className="h-[82px] w-auto"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/72">
            Intro flights and flight training from Dare County Regional Airport
            in Manteo, NC. Take the controls and make the Outer Banks memorable.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase text-[var(--sun)]">
            Explore
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/72">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="focus-ring hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase text-[var(--sun)]">
            Company
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/72">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link className="focus-ring hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase text-[var(--sun)]">
            Contact
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/72">
            <li>
              <a className="focus-ring hover:text-white" href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>
            </li>
            <li>
              <a className="focus-ring hover:text-white" href={`tel:${siteConfig.phoneHref}`}>
                {siteConfig.phone}
              </a>
            </li>
            <li>{siteConfig.location}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((item) => (
              <SocialLink key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-sm text-white/62 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright{" "}
            <time dateTime={String(new Date().getFullYear())} suppressHydrationWarning>
              {new Date().getFullYear()}
            </time>{" "}
            Wright Coast Aviation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  Icon,
  className
}: {
  href: string;
  label: string;
  Icon: () => React.ReactElement;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit Wright Coast Aviation on ${label}`}
      className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[8px] text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition ${className}`}
    >
      <Icon />
    </a>
  );
}
