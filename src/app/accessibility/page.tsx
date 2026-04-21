import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Accessibility",
  description: "Accessibility statement for Wright Coast Aviation.",
  path: "/accessibility"
});

export default function AccessibilityPage() {
  return (
    <main className="bg-white py-16">
      <div className="container-page max-w-4xl">
        <p className="text-sm font-bold uppercase text-[var(--sky)]">
          Accessibility
        </p>
        <h1 className="mt-3 text-4xl font-bold">A site that works for more people.</h1>
        <div className="mt-8 grid gap-6 text-lg leading-8 text-[var(--muted)]">
          <p>
            Wright Coast Aviation aims to keep this website clear, keyboard
            navigable, responsive on mobile devices, and readable with assistive
            technology.
          </p>
          <p>
            The site uses semantic headings, visible focus states, descriptive
            form labels, responsive layouts, and reduced-motion support.
          </p>
          <p>
            If something on the website is difficult to access, email{" "}
            <a className="font-bold text-[var(--navy)]" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>{" "}
            with the page and issue so it can be improved.
          </p>
        </div>
      </div>
    </main>
  );
}
