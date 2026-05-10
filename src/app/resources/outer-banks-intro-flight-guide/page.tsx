import type { Metadata } from "next";
import Image from "next/image";
import { ButtonAnchor } from "@/components/site/button-anchor";
import { ButtonLink } from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  webPageJsonLd
} from "@/lib/seo";
import { resources } from "@/lib/resources";
import { siteConfig } from "@/lib/site";

const article = resources.find(
  (resource) => resource.slug === "outer-banks-intro-flight-guide"
)!;

export const metadata: Metadata = createPageMetadata({
  title: article.title,
  description: article.description,
  path: `/resources/${article.slug}`,
  image: article.heroImage
});

export default function OuterBanksIntroFlightGuidePage() {
  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          title: article.title,
          description: article.description,
          path: `/resources/${article.slug}`
        })}
      />
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={faqJsonLd(article.faqs.map((faq, index) => ({
        id: `${article.slug}-faq-${index + 1}`,
        question: faq.question,
        answer: faq.answer,
        active: true,
        sort_order: index + 1
      })))} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: article.title, path: `/resources/${article.slug}` }
        ])}
      />

      <article>
        <section className="bg-white py-12 sm:py-16">
          <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase text-[var(--sky)]">
                {article.category} - {article.readingTime}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                {article.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonAnchor href={siteConfig.flightCircleUrl}>
                  Book Now
                </ButtonAnchor>
                <ButtonLink href="/contact" variant="ghost">
                  Ask a Question
                </ButtonLink>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#dcecf5] soft-shadow">
              <Image
                src={article.heroImage}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="grid min-w-0 gap-8">
              {article.sections.map((section) => (
                <section
                  key={section.heading}
                  className="rounded-[8px] border border-[var(--line)] bg-white p-5 sm:p-7"
                >
                  <h2 className="text-2xl font-bold text-[var(--navy)]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 grid gap-4 leading-8 text-[var(--muted)]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="rounded-[8px] border border-[var(--line)] bg-white p-5 sm:p-7">
                <h2 className="text-2xl font-bold text-[var(--navy)]">
                  Quick answers
                </h2>
                <div className="mt-5 grid gap-4">
                  {article.faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="rounded-[8px] bg-[#f7fbff] p-4"
                    >
                      <h3 className="font-bold">{faq.question}</h3>
                      <p className="mt-2 leading-7 text-[var(--muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-[8px] border border-[var(--line)] bg-white p-5 soft-shadow">
              <h2 className="text-xl font-bold">Plan your flight</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">
                Ready to compare intro flights or training blocks? Start with
                the service list, then book through FlightCircle when you know
                the option that fits.
              </p>
              <div className="mt-5 grid gap-3">
                <ButtonLink href="/services">View Flight Experiences</ButtonLink>
                <ButtonAnchor href={siteConfig.flightCircleUrl} variant="ghost">
                  Open FlightCircle
                </ButtonAnchor>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
