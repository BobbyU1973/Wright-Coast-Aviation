import type { Metadata } from "next";
import { FAQ } from "@/components/site/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Frequently asked questions about Wright Coast Aviation intro flights, flight blocks, passengers, and booking.",
  path: "/faq"
});

export default function FAQPage() {
  return (
    <main>
      <section className="bg-white py-16">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            Frequently Asked Questions
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            What first-time flyers usually ask.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            A few simple answers before you book an Outer Banks intro flight or
            flight block with Wright Coast Aviation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page max-w-4xl">
          <FAQ />
        </div>
      </section>
    </main>
  );
}
