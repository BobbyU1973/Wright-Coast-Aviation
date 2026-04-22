import type { FAQItem } from "@/lib/types";

export function FAQ({ faqs }: { faqs: FAQItem[] }) {
  return (
    <div className="grid gap-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="rounded-[8px] border border-[var(--line)] bg-white p-5"
        >
          <h2 className="text-lg font-bold">{faq.question}</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
