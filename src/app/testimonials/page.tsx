import type { Metadata } from "next";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { getTestimonials } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Testimonials",
  description:
    "Read customer testimonials from Wright Coast Aviation intro flight and flight training clients.",
  path: "/testimonials"
});

export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <main>
      <section className="bg-white py-16">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            Testimonials
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Stories from first-time flyers, vacation visitors, and student pilots.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Intro flights are made for wonder. Flight training is made for
            progress. Both start with trust.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
