import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getResourcePath, resources } from "@/lib/resources";

const pages = [
  "",
  "/services",
  "/gallery",
  "/testimonials",
  "/faq",
  "/resources",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path || "/"),
      lastModified,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/resources" ? 0.8 : 0.7
    })),
    ...resources.map((resource) => ({
      url: absoluteUrl(getResourcePath(resource.slug)),
      lastModified: new Date(resource.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}
