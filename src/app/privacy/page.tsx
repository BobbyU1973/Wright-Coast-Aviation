import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Wright Coast Aviation.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <main className="bg-white py-16">
      <div className="container-page max-w-4xl">
        <p className="text-sm font-bold uppercase text-[var(--sky)]">
          Privacy Policy
        </p>
        <h1 className="mt-3 text-4xl font-bold">Your information matters.</h1>
        <div className="mt-8 grid gap-6 text-lg leading-8 text-[var(--muted)]">
          <p>
            Wright Coast Aviation collects information you choose to provide,
            including contact details, service interests, inquiry messages, and
            details needed to respond to service requests.
          </p>
          <p>
            Contact form submissions are saved in the business database and may
            be routed to a branded business email address. Bookings are handled
            through FlightCircle when visitors use the Book Now links.
          </p>
          <p>
            Information is used to respond to inquiries, coordinate services,
            improve the website, and meet business obligations. It is not sold.
          </p>
          <p>
            For privacy questions, email{" "}
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
