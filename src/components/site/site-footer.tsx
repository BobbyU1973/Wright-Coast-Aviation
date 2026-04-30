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
  { href: siteConfig.social.facebook, label: "Facebook", icon: "f" },
  { href: siteConfig.social.instagram, label: "Instagram", icon: "IG" }
];

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
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit Wright Coast Aviation on ${item.label}`}
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/18 bg-white/8 text-sm font-bold text-white hover:bg-white/16"
              >
                {item.icon}
              </a>
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
