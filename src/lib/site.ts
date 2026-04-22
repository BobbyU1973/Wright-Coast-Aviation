export const siteConfig = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Wright Coast Aviation",
  domain: "wrightcoastaviation.com",
  canonicalUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://wrightcoastaviation.com",
  flightCircleUrl:
    process.env.NEXT_PUBLIC_FLIGHTCIRCLE_URL ||
    "https://www.flightcircle.com/shop/80c1316b45c4",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@wrightcoastaviation.com",
  phone: process.env.NEXT_PUBLIC_PHONE || "(336) 416-1834",
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF || "+13364161834",
  location:
    process.env.NEXT_PUBLIC_LOCATION_LABEL ||
    "Dare County Regional Airport, Manteo, NC",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/"
  }
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Reserve Your Spot" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/gallery", label: "Photos" },
  { href: "/admin/testimonials", label: "Reviews" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/leads", label: "Leads" }
];
