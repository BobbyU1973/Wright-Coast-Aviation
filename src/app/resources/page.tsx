import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  webPageJsonLd
} from "@/lib/seo";
import { getResourcePath, getResourceUrl, resources } from "@/lib/resources";

export const metadata: Metadata = createPageMetadata({
  title: "Outer Banks Flight Resources",
  description:
    "Helpful Wright Coast Aviation resources for Outer Banks intro flights, Manteo flight training, and first-time flyers.",
  path: "/resources"
});

export default function ResourcesPage() {
  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          title: "Outer Banks Flight Resources",
          description:
            "Helpful Wright Coast Aviation resources for Outer Banks intro flights, Manteo flight training, and first-time flyers.",
          path: "/resources",
          type: "CollectionPage"
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" }
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: resources.map((resource, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: getResourceUrl(resource.slug),
            name: resource.title
          }))
        }}
      />

      <section className="bg-white py-16">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            Resources
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Helpful planning notes before you fly the Outer Banks.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Short guides for first-time flyers, vacation visitors, and future
            student pilots preparing for an intro flight or flight training in
            Manteo, NC.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-5 md:grid-cols-2">
          {resources.map((resource) => (
            <article
              key={resource.slug}
              className="overflow-hidden rounded-[8px] border border-[var(--line)] bg-white soft-shadow"
            >
              <div className="relative aspect-[16/10] bg-[#dcecf5]">
                <Image
                  src={resource.heroImage}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 p-5">
                <div>
                  <p className="text-sm font-bold uppercase text-[var(--sky)]">
                    {resource.category} - {resource.readingTime}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{resource.title}</h2>
                </div>
                <p className="leading-7 text-[var(--muted)]">
                  {resource.description}
                </p>
                <ButtonLink
                  href={getResourcePath(resource.slug)}
                  className="w-fit"
                >
                  Read Guide
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
