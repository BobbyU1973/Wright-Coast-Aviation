import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description: "Website terms for Wright Coast Aviation.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <main className="bg-white py-16">
      <div className="container-page max-w-4xl">
        <p className="text-sm font-bold uppercase text-[var(--sky)]">Terms</p>
        <h1 className="mt-3 text-4xl font-bold">Website and booking terms.</h1>
        <div className="mt-8 grid gap-6 text-lg leading-8 text-[var(--muted)]">
          <p>
            This website provides general information about Wright Coast
            Aviation services and allows customers to submit inquiries and book
            intro flights through FlightCircle.
          </p>
          <p>
            Service availability, scheduling, pricing, and scope are confirmed
            directly by Wright Coast Aviation and FlightCircle. A submitted
            inquiry does not guarantee service availability until the business
            confirms the request.
          </p>
          <p>
            Refunds, cancellations, passenger information, and booking updates
            are handled according to the written terms provided for the specific
            flight experience or training package.
          </p>
          <p>
            Questions about bookings or service terms can be sent to{" "}
            <a className="font-bold text-[var(--navy)]" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
