import type { Metadata } from "next";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { JsonLd } from "@/components/site/json-ld";
import { getGalleryPhotos } from "@/lib/cms";
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description:
    "View Wright Coast Aviation intro flight, flight training, aircraft, cockpit, and Manteo airport photos.",
  path: "/gallery"
});

export const revalidate = 60;

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          title: "Gallery",
          description:
            "View Wright Coast Aviation intro flight, flight training, aircraft, cockpit, and Manteo airport photos.",
          path: "/gallery",
          type: "CollectionPage"
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" }
        ])}
      />
      <section className="bg-white py-16">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            Gallery
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            A closer look at where your Outer Banks flight begins.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Aircraft, cockpit, hangar, and training photos from Wright Coast
            Aviation at Dare County Regional Airport in Manteo. Scroll through
            the photo story on desktop, or browse down the page on mobile, then
            open any photo for a larger view.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <GalleryGrid photos={photos} />
        </div>
      </section>
    </main>
  );
}
