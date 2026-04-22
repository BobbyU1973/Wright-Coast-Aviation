import Image from "next/image";
import { ButtonAnchor } from "@/components/site/button-anchor";
import { ButtonLink } from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import { SectionHeading } from "@/components/site/section-heading";
import { TestimonialCard } from "@/components/site/testimonial-card";
import {
  getServices,
  getSiteContent,
  getTestimonials
} from "@/lib/cms";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export const revalidate = 60;

export default async function HomePage() {
  const [content, services, testimonials] = await Promise.all([
    getSiteContent(),
    getServices({ featured: true }),
    getTestimonials({ featured: true })
  ]);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: siteConfig.name, path: "/" }])} />
      <JsonLd data={serviceJsonLd(services)} />

      <section className="relative min-h-[78svh] overflow-hidden">
        <Image
          src="/images/obx-coast.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-page relative z-10 flex min-h-[78svh] items-center py-16">
          <div className="fade-up max-w-3xl text-white">
            <Image
              src="/brand/wright-coast-aviation-logo.svg"
              alt="Wright Coast Aviation"
              width={300}
              height={156}
              priority
              className="mb-5 h-[116px] w-auto drop-shadow-[0_18px_28px_rgba(0,0,0,0.38)] sm:h-[148px]"
            />
            <p className="text-sm font-bold uppercase text-[var(--sun)]">
              {content.hero_eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
              {content.hero_headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">
              {content.hero_subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor href={content.flightcircle_url}>
                {content.primary_cta_label}
              </ButtonAnchor>
              <ButtonLink href="/services">{content.secondary_cta_label}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <SectionHeading title={content.intro_heading}>
            <p>{content.intro_text}</p>
          </SectionHeading>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Birthplace of Flight", "Outer Banks aviation history"],
              ["Vacation adventure", "A memory beyond the beach"],
              ["Local training", "For full-time and part-time residents"]
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-[8px] border border-[var(--line)] bg-[#f7fbff] p-5"
              >
                <p className="text-2xl font-bold text-[var(--navy)]">{value}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Reviews"
                title="The kind of story people tell long after vacation."
              />
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
