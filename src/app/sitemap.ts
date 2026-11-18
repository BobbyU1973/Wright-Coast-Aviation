import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const pages = [
  "",
  "/learn-to-fly",
  "/services",
  "/gallery",
  "/testimonials",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: absoluteUrl(path || "/")
  }));
}
