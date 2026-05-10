import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { FAQItem } from "@/lib/types";

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
    "Outer Banks flight school",
    "Manteo NC flight training",
    "Dare County flight training",
    "airplane intro flight Outer Banks",
    "Outer Banks aviation experience",
    "pilot training Outer Banks",
    "things to do Outer Banks",
    "fly a plane no experience"
  ],
  image: "/images/obx-coast.jpg"
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
  const areaServed = siteConfig.serviceAreas.map((name) => ({
    "@type": "Place",
    name
  }));

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization", "Organization"],
    "@id": absoluteUrl("/#business"),
    name: siteConfig.name,
    description: seoDefaults.description,
    url: siteConfig.canonicalUrl,
    email: siteConfig.contactEmail,
    telephone: siteConfig.phone,
    image: absoluteUrl("/brand/wright-coast-aviation-logo.png"),
    logo: absoluteUrl("/brand/wright-coast-aviation-logo.png"),
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude
    },
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Dare%20County%20Regional%20Airport%20Manteo%20NC",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: ["Credit Card", "FlightCircle booking"],
    areaServed,
    serviceArea: areaServed,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: siteConfig.phone,
        email: siteConfig.contactEmail,
        areaServed: "US",
        availableLanguage: "English"
      }
    ],
    knowsAbout: [
      "Introductory flight experiences",
      "Outer Banks intro flights",
      "Flight training",
      "Pilot training",
      "Outer Banks aviation",
      "Dare County Regional Airport",
      "Manteo NC aviation"
    ],
    sameAs: Object.values(siteConfig.social)
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.canonicalUrl,
    inLanguage: "en-US",
    about: {
      "@id": absoluteUrl("/#business")
    },
    publisher: {
      "@id": absoluteUrl("/#business")
    }
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
  type = "WebPage"
}: PageSeo & { type?: "WebPage" | "CollectionPage" | "FAQPage" | "ContactPage" }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: {
      "@id": absoluteUrl("/#website")
    },
    about: {
      "@id": absoluteUrl("/#business")
    },
    inLanguage: "en-US"
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

export function faqJsonLd(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
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
        serviceType: service.title,
        areaServed: siteConfig.serviceAreas.map((name) => ({
          "@type": "Place",
          name
        })),
        url: absoluteUrl("/services"),
        provider: {
          "@type": "Organization",
          "@id": absoluteUrl("/#business"),
          name: siteConfig.name,
          url: siteConfig.canonicalUrl
        }
      }
    }))
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  heroImage: string;
  datePublished: string;
  dateModified: string;
}) {
  const url = absoluteUrl(`/resources/${article.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.heroImage),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    mainEntityOfPage: url,
    author: {
      "@id": absoluteUrl("/#business")
    },
    publisher: {
      "@id": absoluteUrl("/#business")
    },
    about: [
      "Outer Banks intro flights",
      "Manteo flight training",
      "Dare County Regional Airport",
      "First-time flying experience"
    ],
    inLanguage: "en-US"
  };
}
