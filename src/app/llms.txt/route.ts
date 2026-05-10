import { NextResponse } from "next/server";
import { absoluteUrl, seoDefaults } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { aiSearchFacts, getResourcePath, resources } from "@/lib/resources";

export const dynamic = "force-static";

export function GET() {
  const resourceLinks = resources
    .map(
      (resource) =>
        `- [${resource.title}](${absoluteUrl(getResourcePath(resource.slug))}): ${resource.description}`
    )
    .join("\n");

  const markdown = `# ${siteConfig.name}

> ${seoDefaults.description}

${aiSearchFacts.map((fact) => `- ${fact}`).join("\n")}

## Core Pages

- [Home](${absoluteUrl("/")}): Overview of Wright Coast Aviation, intro flights, flight training, and Outer Banks aviation experience.
- [Reserve Your Spot](${absoluteUrl("/services")}): Intro flight experiences and flight training blocks available from Dare County Regional Airport in Manteo, NC.
- [FAQ](${absoluteUrl("/faq")}): Practical answers about first-time flights, booking, training, passengers, and location.
- [Contact](${absoluteUrl("/contact")}): Official email, phone, contact form, and directions to Dare County Regional Airport.

## Local Context

- [Gallery](${absoluteUrl("/gallery")}): Aircraft, cockpit, airport, and Outer Banks flight photos.
- [Reviews](${absoluteUrl("/testimonials")}): Visitor, resident, and student pilot feedback.
- [Resources](${absoluteUrl("/resources")}): Planning guides for Outer Banks intro flights and flight training.

## Resources

${resourceLinks}

## Optional

- [Privacy Policy](${absoluteUrl("/privacy")}): Privacy details for visitors and leads.
- [Terms](${absoluteUrl("/terms")}): Website terms for public users.
- [Accessibility](${absoluteUrl("/accessibility")}): Accessibility statement.
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
