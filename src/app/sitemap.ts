import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const pages = [
  "",
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
  const lastModified = new Date();

  return pages.map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
