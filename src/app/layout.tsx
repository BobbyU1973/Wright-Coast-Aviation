import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JsonLd } from "@/components/site/json-ld";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, organizationJsonLd, seoDefaults, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  title: {
    default: "Wright Coast Aviation",
    template: "%s | Wright Coast Aviation"
  },
  description:
    seoDefaults.description,
  keywords: seoDefaults.keywords,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: seoDefaults.title,
    description: seoDefaults.description,
    url: siteConfig.canonicalUrl,
    siteName: "Wright Coast Aviation",
    images: [
      {
        url: absoluteUrl("/brand/wright-coast-aviation-logo.png"),
        width: 1200,
        height: 630,
        alt: "Wright Coast Aviation"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.title,
    description: seoDefaults.description,
    images: [absoluteUrl("/brand/wright-coast-aviation-logo.png")]
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/brand/wright-coast-aviation-logo.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073763"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
