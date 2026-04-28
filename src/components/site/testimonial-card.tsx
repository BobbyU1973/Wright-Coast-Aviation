import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="rounded-[8px] border border-[var(--line)] bg-white p-5 soft-shadow">
      <blockquote className="text-lg leading-8 text-[var(--foreground)]">
        "{testimonial.quote}"
      </blockquote>
      <p className="mt-5 font-bold">{testimonial.customer_name}</p>
      {testimonial.location ? (
        <p className="text-sm text-[var(--muted)]">{testimonial.location}</p>
      ) : null}
    </article>
  );
}
