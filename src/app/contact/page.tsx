import type { Metadata } from "next";
import { createLeadAction } from "@/app/contact/actions";
import { getServices } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Wright Coast Aviation with questions about Outer Banks intro flights and flight training.",
  path: "/contact"
});

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = searchParams ? await searchParams : {};
  const status = typeof params.status === "string" ? params.status : "";
  const selectedService =
    typeof params.service === "string" ? params.service : "";
  const services = await getServices();
  const mapUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
    "https://www.google.com/maps?q=Dare%20County%20Regional%20Airport%20Manteo%20NC&output=embed";
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Dare%20County%20Regional%20Airport%20Manteo%20NC";

  return (
    <main>
      <section className="bg-white py-16">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Questions before you take the controls?
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Ask about Intro Flights, Flight Training, passengers, timing, or
            what to expect at Dare County Regional Airport in Manteo.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <form
            action={createLeadAction}
            className="grid min-w-0 gap-5 rounded-[8px] border border-[var(--line)] bg-white p-5 soft-shadow sm:p-7"
          >
            {status === "success" ? (
              <p className="rounded-[8px] bg-[#e8f7ef] p-4 font-bold text-[#1f6f3d]">
                Thanks. Your inquiry was sent.
              </p>
            ) : null}
            {status === "demo" ? (
              <p className="rounded-[8px] bg-[#fff8df] p-4 font-bold text-[#7a5a00]">
                Demo mode: connect Supabase to save leads in production.
              </p>
            ) : null}
            {status === "missing" || status === "error" ? (
              <p className="rounded-[8px] bg-[#fff0ed] p-4 font-bold text-[#9a2d18]">
                Please check the required fields and try again.
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid min-w-0 gap-2">
                <span className="text-sm font-bold">Name</span>
                <input
                  required
                  name="name"
                  className="focus-ring min-h-12 w-full rounded-[8px] border border-[var(--line)] px-4"
                />
              </label>
              <label className="grid min-w-0 gap-2">
                <span className="text-sm font-bold">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="focus-ring min-h-12 w-full rounded-[8px] border border-[var(--line)] px-4"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid min-w-0 gap-2">
                <span className="text-sm font-bold">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  className="focus-ring min-h-12 w-full rounded-[8px] border border-[var(--line)] px-4"
                />
              </label>
              <label className="grid min-w-0 gap-2">
                <span className="text-sm font-bold">How Can We Help?</span>
                <select
                  name="service_interest"
                  defaultValue={selectedService}
                  className="focus-ring min-h-12 w-full rounded-[8px] border border-[var(--line)] bg-white px-4"
                >
                  <option value="">Choose one</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Passenger question">Passenger question</option>
                  <option value="Gift or vacation question">
                    Gift or vacation question
                  </option>
                  <option value="Other question">Other question</option>
                </select>
              </label>
            </div>

            <label className="grid min-w-0 gap-2">
              <span className="text-sm font-bold">Message</span>
              <textarea
                required
                name="message"
                rows={6}
                className="focus-ring w-full rounded-[8px] border border-[var(--line)] px-4 py-3"
              />
            </label>

            <button
              type="submit"
              className="focus-ring min-h-12 rounded-[8px] bg-[var(--book)] px-5 py-3 font-bold text-[var(--charcoal)] transition hover:bg-[var(--book-hover)]"
            >
              Send Inquiry
            </button>
          </form>

          <aside className="grid min-w-0 gap-5">
            <div className="rounded-[8px] border border-[var(--line)] bg-white p-6">
              <h2 className="text-2xl font-bold">Business contact</h2>
              <dl className="mt-5 grid gap-4 text-[var(--muted)]">
                <div>
                  <dt className="font-bold text-[var(--foreground)]">Email</dt>
                  <dd>
                    <a className="focus-ring hover:text-[var(--navy)]" href={`mailto:${siteConfig.contactEmail}`}>
                      {siteConfig.contactEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-[var(--foreground)]">Phone</dt>
                  <dd>
                    <a className="focus-ring hover:text-[var(--navy)]" href={`tel:${siteConfig.phoneHref}`}>
                      {siteConfig.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  className="focus-ring inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--book)] px-4 py-2 text-sm font-bold text-[var(--charcoal)] hover:bg-[var(--book-hover)]"
                  href={`tel:${siteConfig.phoneHref}`}
                >
                  Call {siteConfig.phone}
                </a>
                <a
                  className="focus-ring inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--book)] px-4 py-2 text-sm font-bold text-[var(--charcoal)] hover:bg-[var(--book-hover)]"
                  href={`sms:${siteConfig.phoneHref}`}
                >
                  Text Us
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-[var(--line)] bg-white">
              <iframe
                title="Dare County Regional Airport map"
                src={mapUrl}
                className="h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-4">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-[8px] bg-[var(--book)] px-4 py-2 text-sm font-bold text-[var(--charcoal)] hover:bg-[var(--book-hover)]"
                >
                  Get Directions to Dare County Regional Airport
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
