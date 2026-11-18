import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceCard } from "@/components/site/service-card";
import { getServices } from "@/lib/cms";
import { breadcrumbJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";
import { isApparelService, sortServicesByPrice } from "@/lib/services";

export const metadata: Metadata = createPageMetadata({
  title: "Discovery Flights & Training Packages",
  description:
    "Start with a hands-on discovery flight or choose a pilot training block at Wright Coast Aviation. Train at Dare County Regional Airport in Manteo, NC.",
  path: "/services"
});

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();
  const flightServices = sortServicesByPrice(
    services.filter((service) => !isApparelService(service))
  );
  const apparelServices = sortServicesByPrice(services.filter(isApparelService));

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" }
        ])}
      />
      <JsonLd data={serviceJsonLd(flightServices)} />
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
            beside you, making this a real first lesson —{" "}
            <Link href="/learn-to-fly" className="focus-ring font-bold underline">
              hands-on flight training
            </Link>
            {" "}with an instructor beside you, and a strong first step for future
            student pilots who live here full or part time.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[#fff8df] py-8">
        <div className="container-page grid gap-4 text-center md:grid-cols-3">
          {[
            "You may take the controls",
            "No experience needed",
            "Learn to fly over the Outer Banks — the same skies where the Wright brothers learned."
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
          {flightServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {apparelServices.length > 0 ? (
        <section
          className="border-t border-[var(--line)] bg-white py-16"
          aria-labelledby="apparel-heading"
        >
          <div className="container-page">
            <p className="text-sm font-bold uppercase text-[var(--sky)]">
              Wright Coast Aviation
            </p>
            <h2
              id="apparel-heading"
              className="mt-3 text-3xl font-bold sm:text-4xl"
            >
              Apparel Now Available
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {apparelServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
