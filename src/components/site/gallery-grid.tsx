"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/lib/types";

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null
            ? null
            : (index - 1 + photos.length) % photos.length
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? null : (index + 1) % photos.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, photos.length]);

  const showPreviousPhoto = () => {
    setActiveIndex((index) =>
      index === null
        ? null
        : (index - 1 + photos.length) % photos.length
    );
  };

  const showNextPhoto = () => {
    setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length));
  };

  const scrollRail = (direction: "prev" | "next") => {
    if (!railRef.current) {
      return;
    }

    const amount = railRef.current.clientWidth * 0.82;
    railRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="mb-6 hidden items-end justify-between gap-4 md:flex">
        <div>
          <p className="text-sm font-bold uppercase text-[var(--sky)]">
            Desktop Gallery
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Scroll across the Outer Banks flight story, then open any photo for
            a closer look.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollRail("prev")}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white text-[var(--foreground)] hover:bg-[#e8f4fb]"
            aria-label="Scroll gallery left"
          >
            <ChevronLeft aria-hidden size={22} />
          </button>
          <button
            type="button"
            onClick={() => scrollRail("next")}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white text-[var(--foreground)] hover:bg-[#e8f4fb]"
            aria-label="Scroll gallery right"
          >
            <ChevronRight aria-hidden size={22} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="hidden gap-5 overflow-x-auto pb-4 md:flex md:snap-x md:snap-mandatory"
      >
        {photos.map((photo, index) => (
          <figure
            key={photo.id}
            className="w-[340px] shrink-0 snap-start overflow-hidden rounded-[8px] border border-[var(--line)] bg-white soft-shadow lg:w-[410px]"
          >
            <button
              type="button"
              className="focus-ring group relative block aspect-[4/3] w-full bg-[#dcecf5] text-left"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${photo.caption || "Wright Coast Aviation photo"}`}
            >
              <Image
                src={photo.image_url}
                alt={photo.caption || "Wright Coast Aviation photo"}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </button>
            <figcaption className="min-h-[84px] p-4">
              {photo.category ? (
                <p className="text-xs font-bold uppercase text-[var(--sky)]">
                  {photo.category}
                </p>
              ) : null}
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                {photo.caption || "Wright Coast Aviation"}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="grid gap-5 md:hidden">
        {photos.map((photo, index) => (
          <figure
            key={photo.id}
            className="overflow-hidden rounded-[8px] border border-[var(--line)] bg-white soft-shadow"
          >
            <button
              type="button"
              className="focus-ring group relative block aspect-[4/3] w-full bg-[#dcecf5] text-left"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${photo.caption || "Wright Coast Aviation photo"}`}
            >
              <Image
                src={photo.image_url}
                alt={photo.caption || "Wright Coast Aviation photo"}
                fill
                sizes="100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </button>
            <figcaption className="min-h-[84px] p-4">
              {photo.category ? (
                <p className="text-xs font-bold uppercase text-[var(--sky)]">
                  {photo.category}
                </p>
              ) : null}
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                {photo.caption || "Wright Coast Aviation"}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-[80] bg-[rgba(6,15,24,0.94)] px-4 py-4 text-white sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold uppercase text-[var(--sun)]">
                {activePhoto.category || "Wright Coast Aviation"}
              </p>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/20 bg-white/10 hover:bg-white/18"
                aria-label="Close photo viewer"
              >
                <X aria-hidden size={22} />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[auto_1fr_auto] items-center gap-2 py-4 sm:gap-4">
              <button
                type="button"
                onClick={showPreviousPhoto}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/20 bg-white/10 hover:bg-white/18"
                aria-label="Previous photo"
              >
                <ChevronLeft aria-hidden size={26} />
              </button>

              <div className="relative min-h-0 overflow-hidden rounded-[8px]">
                <div className="relative mx-auto aspect-[4/3] max-h-[74svh] w-full">
                  <Image
                    src={activePhoto.image_url}
                    alt={activePhoto.caption || "Wright Coast Aviation photo"}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={showNextPhoto}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/20 bg-white/10 hover:bg-white/18"
                aria-label="Next photo"
              >
                <ChevronRight aria-hidden size={26} />
              </button>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm text-white/70">
                {(activeIndex ?? 0) + 1} of {photos.length}
              </p>
              <p className="mt-2 text-base leading-7 text-white/88">
                {activePhoto.caption || "Wright Coast Aviation"}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
