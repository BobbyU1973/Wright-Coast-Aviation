import type { Metadata } from "next";
import { FAQ } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { getFaqs } from "@/lib/cms";
import { staticSeoFaqs } from "@/lib/resources";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  webPageJsonLd
} from "@/lib/seo";
import type { FAQItem } from "@/lib/types";

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Frequently asked questions about Wright Coast Aviation intro flights, flight blocks, passengers, and booking.",
  path: "/faq"
});

export const revalidate = 60;

export default async function FAQPage() {
  const faqs = mergeFaqs(await getFaqs(), staticSeoFaqs);

  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          title: "Frequently Asked Questions",
          description:
            "Frequently asked questions about Wright Coast Aviation intro flights, flight blocks, passengers, and booking.",
          path: "/faq",
          type: "FAQPage"
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" }
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
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
          <FAQ faqs={faqs} />
        </div>
      </section>
    </main>
  );
}

function mergeFaqs(
  editableFaqs: FAQItem[],
  fallbackFaqs: Array<{ id: string; question: string; answer: string }>
): FAQItem[] {
  const seen = new Set(editableFaqs.map((faq) => faq.question.toLowerCase()));
  const additions = fallbackFaqs
    .filter((faq) => !seen.has(faq.question.toLowerCase()))
    .map((faq, index) => ({
      ...faq,
      active: true,
      sort_order: editableFaqs.length + index + 1
    }));

  return [...editableFaqs, ...additions];
}
