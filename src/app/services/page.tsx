import type { Metadata } from "next";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceCard } from "@/components/site/service-card";
import { getServices } from "@/lib/cms";
import { breadcrumbJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Book Outer Banks Intro Flight Experiences and Flight Training in the Birthplace of Flight with Wright Coast Aviation in Manteo, NC.",
  path: "/services"
});

export const revalidate = 60;

export default async function ServicesPage() {
  const services = (await getServices()).sort((a, b) => {
    const aPrice = Number(a.price_label?.replace(/[^0-9]/g, "") || 0);
    const bPrice = Number(b.price_label?.replace(/[^0-9]/g, "") || 0);
    return aPrice - bPrice;
  });

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" }
        ])}
      />
      <JsonLd data={serviceJsonLd(services)} />
      <section className="bg-white py-16">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            Introductory Flight Experiences
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Fly in the place flight calls home.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Choose an intro flight experience at Dare County Regional Airport in
            Manteo. You may take the controls with a Certified Flight Instructor
            beside you, making this a standout Outer Banks vacation activity and
            a strong first step for future student pilots who live here full or
            part time.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[#fff8df] py-8">
        <div className="container-page grid gap-4 text-center md:grid-cols-3">
          {[
            "You may take the controls",
            "No experience needed",
            "Fly over the Outer Banks, a narrow strip of coast like nowhere else"
          ].map((item) => (
            <p
              key={item}
              className="mx-auto max-w-xs text-lg font-bold text-[var(--charcoal)]"
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}
