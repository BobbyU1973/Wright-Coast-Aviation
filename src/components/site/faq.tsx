const faqs = [
  {
    question: "Do I need flight experience?",
    answer:
      "No experience is needed. Intro flights are designed for first-time flyers and are guided by a Certified Flight Instructor."
  },
  {
    question: "Can I really take the controls?",
    answer:
      "Yes, when conditions allow. Your instructor will guide you from the pilot seat so you can feel what flying is like."
  },
  {
    question: "Why fly while visiting the Outer Banks?",
    answer:
      "The Outer Banks is the Birthplace of Flight, full of water, sky, history, and wide-open views. An intro flight gives visitors a vacation memory they cannot get anywhere else."
  },
  {
    question: "Do you offer training for locals?",
    answer:
      "Yes. Wright Coast Aviation offers flight training for full-time and part-time residents who want to train to be a pilot in the Manteo area."
  }
];

export function FAQ() {
  return (
    <div className="grid gap-3">
      {faqs.map((faq) => (
        <div
          key={faq.question}
          className="rounded-[8px] border border-[var(--line)] bg-white p-5"
        >
          <h2 className="text-lg font-bold">{faq.question}</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
