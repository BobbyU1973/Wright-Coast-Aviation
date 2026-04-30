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
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon }
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
  Icon
}: {
  href: string;
  label: string;
  Icon: () => React.ReactElement;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit Wright Coast Aviation on ${label}`}
      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/18 bg-white/8 text-white transition hover:bg-white/16"
    >
      <Icon />
    </a>
  );
}
