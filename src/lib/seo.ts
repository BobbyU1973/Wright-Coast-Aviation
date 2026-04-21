import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export const seoDefaults = {
  title: "Wright Coast Aviation",
  description:
    "Book Outer Banks intro flights and flight training in the Birthplace of Flight with Wright Coast Aviation at Dare County Regional Airport in Manteo, NC.",
  keywords: [
    "Wright Coast Aviation",
    "Outer Banks intro flight",
    "Birthplace of Flight",
    "Outer Banks vacation activity",
    "Manteo flight school",
    "Dare County Regional Airport",
    "introductory flight experience",
    "flight training Manteo NC",
    "things to do Outer Banks",
    "fly a plane no experience"
  ],
  image: "/brand/wright-coast-aviation-logo.png"
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.canonicalUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = seoDefaults.image,
  noIndex = false
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: seoDefaults.keywords,
    alternates: {
      canonical: path
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    name: siteConfig.name,
    url: siteConfig.canonicalUrl,
    email: siteConfig.contactEmail,
    telephone: siteConfig.phone,
    image: absoluteUrl("/brand/wright-coast-aviation-logo.png"),
    logo: absoluteUrl("/brand/wright-coast-aviation-logo.png"),
    areaServed: siteConfig.location,
    sameAs: Object.values(siteConfig.social)
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.canonicalUrl
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function serviceJsonLd(services: Array<{ title: string; description: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.canonicalUrl
        }
      }
    }))
  };
}
