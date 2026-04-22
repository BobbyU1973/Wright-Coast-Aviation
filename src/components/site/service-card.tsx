import Image from "next/image";
import type { Service } from "@/lib/types";
import { siteConfig } from "@/lib/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-[var(--line)] bg-white soft-shadow">
      {service.image_url ? (
        <div className="relative aspect-[4/3] bg-[#dcecf5]">
          <Image
            src={service.image_url}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="grid gap-4 p-5">
        <div>
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            {service.price_label || "By request"}
          </p>
          <h3 className="mt-2 text-xl font-bold">{service.title}</h3>
        </div>
        <p className="leading-7 text-[var(--muted)]">{service.description}</p>
        <a
          href={siteConfig.flightCircleUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex w-fit rounded-[8px] border border-[var(--book)] bg-[var(--book)] px-4 py-2 text-sm font-bold text-[var(--book-text)] hover:bg-[var(--book-hover)]"
        >
          Book Now
        </a>
      </div>
    </article>
  );
}
