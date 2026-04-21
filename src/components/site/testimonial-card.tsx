import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating || 5;

  return (
    <article className="rounded-[8px] border border-[var(--line)] bg-white p-5 soft-shadow">
      <div className="flex gap-1 text-[var(--sun)]" aria-label={`${rating} star rating`}>
        {Array.from({ length: rating }).map((_, index) => (
          <span key={index} aria-hidden>
            *
          </span>
        ))}
      </div>
      <blockquote className="mt-4 text-lg leading-8 text-[var(--foreground)]">
        "{testimonial.quote}"
      </blockquote>
      <p className="mt-5 font-bold">{testimonial.customer_name}</p>
      {testimonial.location ? (
        <p className="text-sm text-[var(--muted)]">{testimonial.location}</p>
      ) : null}
    </article>
  );
}
