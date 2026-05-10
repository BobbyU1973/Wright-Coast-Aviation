import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const publicRules = {
    allow: "/",
    disallow: ["/admin", "/admin/"]
  };

  return {
    rules: [
      {
        userAgent: "*",
        ...publicRules
      },
      {
        userAgent: "GPTBot",
        ...publicRules
      },
      {
        userAgent: "ChatGPT-User",
        ...publicRules
      },
      {
        userAgent: "ClaudeBot",
        ...publicRules
      },
      {
        userAgent: "PerplexityBot",
        ...publicRules
      }
    ],
    host: absoluteUrl("/").replace(/\/$/, ""),
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
