import type { Metadata } from "next";
import Image from "next/image";
import { ButtonAnchor } from "@/components/site/button-anchor";
import { ButtonLink } from "@/components/site/button-link";
import { JsonLd } from "@/components/site/json-ld";
import { SectionHeading } from "@/components/site/section-heading";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Learn to Fly",
  description:
    "Explore sport, private, and commercial pilot training with Wright Coast Aviation at Dare County Regional Airport in Manteo, NC.",
  path: "/learn-to-fly"
});

const trainingPaths = [
  {
    title: "Sport Pilot",
    subtitle: "The fastest way into the air",
    description:
      "The sport pilot certificate is the quickest, most affordable route to flying for fun. Under the FAA's MOSAIC rules, our Cessna 172 qualifies — train and fly in a real four-seat airplane, not a lightweight two-seater.",
    details: [
      "Fly on a valid U.S. driver's license instead of an FAA medical certificate (some conditions apply)",
      "Minimum 20 hours of flight training",
      "Fly during the day in good weather, with one passenger",
      "Start at age 17 (solo at 16)"
    ],
    bestFor:
      "Recreational flyers who want to get up there without the full private pilot commitment."
  },
  {
    title: "Private Pilot",
    subtitle: "The full license",
    description:
      "The private pilot certificate is the license most pilots mean when they say “I learned to fly.” It's also the required first step toward flying professionally.",
    details: [
      "Minimum 40 hours of flight training (most students finish in 55–70)",
      "Fly day or night, in a wider range of weather, with passengers",
      "FAA medical certificate or BasicMed",
      "Start at age 17 (solo at 16)"
    ],
    bestFor:
      "Anyone who wants the complete license — and everyone headed toward an aviation career."
  },
  {
    title: "Commercial Pilot",
    subtitle: "Make flying your career",
    description:
      "The commercial certificate is how pilots get paid to fly. It builds on your private license and instrument rating, and requires 250 hours of total flight time, advanced maneuvers, and a higher standard of precision.",
    supportingText:
      "Much of your commercial training and time-building can be done right here in our 172, with an instructor who will help you plan the whole path — including the few requirements that need a different airplane, like complex-aircraft time. If you're aiming at the airlines, this is where the road starts: your private license, your instrument rating, then commercial.",
    details: [],
    bestFor:
      "Career-track pilots. Talk to us early and we'll map your hours so every flight counts toward the goal."
  }
];

const trainingSteps = [
  {
    title: "Discovery flight",
    description:
      "Your first lesson. Hands on the controls, instructor beside you. From $179."
  },
  {
    title: "Flight and ground lessons",
    description:
      "Build skills lesson by lesson: takeoffs, landings, maneuvers, and navigation."
  },
  {
    title: "First solo",
    description: "The flight you'll remember for the rest of your life."
  },
  {
    title: "Cross-country flying",
    description:
      "Plan and fly real trips, including longer flights with our hangar survival kit aboard."
  },
  {
    title: "Checkride",
    description: "Pass your FAA practical test and earn your certificate."
  }
];

const reasons = [
  "A small school: you train with your instructor, not a rotation of strangers",
  "Real airspace from day one — you'll work with the KMQI tower and fly the same coast the Wright brothers did",
  "One well-kept Cessna 172 that you'll know inside and out",
  "Students who've soloed and earned their wings here — see them in our Gallery"
];

export default function LearnToFlyPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Learn to Fly", path: "/learn-to-fly" }
        ])}
      />

      <section className="overflow-hidden bg-[var(--navy)] text-white">
        <div className="container-page grid items-stretch gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--sun)]">
              Flight training in Manteo, North Carolina
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              Learn to fly where flight began.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Flight training at Dare County Regional Airport (KMQI) in Manteo,
              North Carolina — minutes from where the Wright brothers first flew.
              You'll train in our Cessna 172 with an instructor beside you from
              your very first lesson, building real skills in real coastal airspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor href={siteConfig.flightCircleUrl}>
                Book a discovery flight
              </ButtonAnchor>
              <ButtonLink
                href="/contact"
                variant="secondary"
                className="!text-black"
              >
                Talk to an instructor
              </ButtonLink>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[8px] border border-white/15 shadow-2xl lg:min-h-[520px]">
            <Image
              src="/images/student-plane.jpg"
              alt="Pilot standing beside a Cessna 172"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Choose your path"
            title="Three paths, one airplane."
          >
            <p>
              Start with the certificate that fits your goals. Every path builds
              practical skill in the same Cessna 172 and the same coastal airspace.
            </p>
          </SectionHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {trainingPaths.map((path, index) => (
              <article
                key={path.title}
                className="flex h-full flex-col rounded-[8px] border border-[var(--line)] bg-[#f7fbff] p-6 soft-shadow"
              >
                <p className="text-sm font-bold uppercase text-[var(--sky)]">
                  Path {index + 1}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[var(--navy)]">
                  {path.title}
                </h2>
                <p className="mt-1 font-bold text-[var(--foreground)]">
                  {path.subtitle}
                </p>
                <p className="mt-5 leading-7 text-[var(--muted)]">
                  {path.description}
                </p>
                {path.supportingText ? (
                  <p className="mt-4 leading-7 text-[var(--muted)]">
                    {path.supportingText}
                  </p>
                ) : null}
                {path.details.length > 0 ? (
                  <ul className="mt-5 grid gap-3">
                    {path.details.map((detail) => (
                      <li key={detail} className="flex gap-3 leading-6">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--sky)]"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-auto pt-6">
                  <p className="border-t border-[var(--line)] pt-5 text-sm leading-6 text-[var(--muted)]">
                    <strong className="text-[var(--foreground)]">Best for:</strong>{" "}
                    {path.bestFor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--charcoal)] py-16 text-white sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-[var(--sun)]">
              Straightforward pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              What it costs.
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/75">
              No surprises. Choose the flight block that matches your training
              pace, then add instruction when you fly with your instructor.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-[8px] border border-white/15 bg-white/7 p-6">
              <p className="text-sm font-bold uppercase text-[var(--sun)]">
                10-hour flight block
              </p>
              <p className="mt-3 text-4xl font-bold">$1,900</p>
              <p className="mt-3 leading-7 text-white/75">
                Aircraft time; instruction billed separately at $60/hr ($250/hr
                all-in when flying with an instructor).
              </p>
            </article>
            <article className="rounded-[8px] border border-white/15 bg-white/7 p-6">
              <p className="text-sm font-bold uppercase text-[var(--sun)]">
                20-hour flight block
              </p>
              <p className="mt-3 text-4xl font-bold">$3,700</p>
              <p className="mt-3 leading-7 text-white/75">
                Aircraft time; $245/hr all-in when flying with an instructor.
              </p>
            </article>
          </div>

          <div className="mt-6 grid gap-3 rounded-[8px] border border-white/15 bg-white/7 p-6 text-white/80 sm:grid-cols-3">
            <p>Solo flight time is aircraft cost only.</p>
            <p>A complimentary Wright Coast Aviation T-shirt comes with every block purchase.</p>
            <p>Most students fly 2–3 times a week.</p>
          </div>
          <p className="mt-6 max-w-3xl leading-7 text-white/75">
            Your instructor will give you an honest total-cost estimate for your
            certificate before you commit to a block.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading eyebrow="From first lesson to certificate" title="How training works.">
            <p>
              Each stage builds on the last, with a consistent instructor and a
              clear plan for your next milestone.
            </p>
          </SectionHeading>

          <ol className="grid gap-4">
            {trainingSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[48px_1fr] gap-4 rounded-[8px] border border-[var(--line)] bg-white p-5"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-lg font-bold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 leading-7 text-[var(--muted)]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Local, consistent, personal"
            title="Why train at Wright Coast Aviation?"
            align="center"
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex gap-4 rounded-[8px] border border-[var(--line)] bg-[#f7fbff] p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--book)] text-sm font-bold text-black"
                >
                  ✓
                </span>
                <p className="leading-7">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8df] py-16 sm:py-20">
        <div className="container-page max-w-4xl text-center">
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            Ready to start?
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
            Your discovery flight is a real first lesson.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Book a discovery flight — it counts toward your training if you continue.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonAnchor href={siteConfig.flightCircleUrl}>
              Book a discovery flight
            </ButtonAnchor>
            <ButtonLink href="/contact" variant="dark">
              Ask a training question
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm leading-6 text-[var(--muted)]">
            <a className="focus-ring font-bold hover:text-[var(--navy)]" href={`tel:${siteConfig.phoneHref}`}>
              {siteConfig.phone}
            </a>{" "}
            · {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality},{" "}
            {siteConfig.address.addressRegion} {siteConfig.address.postalCode}
          </p>
        </div>
      </section>
    </main>
  );
}
