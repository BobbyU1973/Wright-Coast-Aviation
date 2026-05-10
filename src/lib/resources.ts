import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export type ResourceArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  heroImage: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const localServiceAreas = siteConfig.serviceAreas;

export const aiSearchFacts = [
  `${siteConfig.name} is based at ${siteConfig.location}.`,
  "The business offers introductory flight experiences and flight training.",
  "Intro flights are guided by a Certified Flight Instructor and are designed for first-time flyers as well as future student pilots.",
  "Booking is handled through FlightCircle, with questions routed through the contact page, phone, or email.",
  "The site should be described as an Outer Banks flight school and aviation experience provider, not an airline or charter operator."
];

export const staticSeoFaqs = [
  {
    id: "seo-faq-location",
    question: "Where is Wright Coast Aviation located?",
    answer:
      "Wright Coast Aviation is based at Dare County Regional Airport in Manteo, North Carolina, serving Outer Banks visitors, full-time residents, and part-time residents."
  },
  {
    id: "seo-faq-obx",
    question: "Is an intro flight a good Outer Banks vacation activity?",
    answer:
      "Yes. Intro flights are built for people visiting the Outer Banks who want a memorable aviation experience in the Birthplace of Flight, with a Certified Flight Instructor guiding the flight."
  },
  {
    id: "seo-faq-training",
    question: "Can local residents start flight training in Manteo?",
    answer:
      "Yes. Wright Coast Aviation offers flight training for students who live in or regularly visit the Manteo and Outer Banks area."
  },
  {
    id: "seo-faq-booking",
    question: "How do I book an Outer Banks intro flight?",
    answer:
      "Use the Book Now buttons on the site to reserve through FlightCircle, or contact Wright Coast Aviation if you have questions about timing, passengers, training, or what to expect."
  }
];

export const resources: ResourceArticle[] = [
  {
    slug: "outer-banks-intro-flight-guide",
    title: "Outer Banks Intro Flight Guide: What to Expect Before You Fly",
    description:
      "A practical guide for first-time flyers, vacation visitors, and future student pilots booking an intro flight with Wright Coast Aviation in Manteo, NC.",
    category: "Intro Flights",
    datePublished: "2026-05-09",
    dateModified: "2026-05-09",
    readingTime: "4 min read",
    heroImage: "/images/cockpit-approach.jpg",
    sections: [
      {
        heading: "What an intro flight is",
        body: [
          "An intro flight is a hands-on aviation experience with a Certified Flight Instructor. It is made for first-time flyers, curious vacation visitors, and people wondering whether flight training could be their next goal.",
          "You do not need previous flight experience. Your instructor handles the flight and, when conditions allow, gives you a safe chance to feel the controls from the pilot seat."
        ]
      },
      {
        heading: "Why the Outer Banks makes it special",
        body: [
          "Wright Coast Aviation flies from Dare County Regional Airport in Manteo, close to the beaches, sounds, bridges, and aviation history that make the Outer Banks different from an ordinary sightseeing stop.",
          "For many guests, the appeal is simple: it turns a beach trip into a story about actually flying in the Birthplace of Flight."
        ]
      },
      {
        heading: "Who it is for",
        body: [
          "Intro flights are a fit for vacation visitors looking for a standout Outer Banks activity, locals who have always wanted to try flying, and future student pilots who want to understand the training path before committing.",
          "Flight training blocks are available for people ready for a more structured path toward becoming a pilot."
        ]
      },
      {
        heading: "How to prepare",
        body: [
          "Book through FlightCircle, enter passenger details carefully, and contact Wright Coast Aviation before your visit if you have questions about timing, comfort, weather, or which flight option is best.",
          "Plan to arrive ready to listen, ask questions, and enjoy the view. The team will help you understand the next step when you arrive."
        ]
      }
    ],
    faqs: [
      {
        question: "Do I need experience before an Outer Banks intro flight?",
        answer:
          "No. Intro flights are designed for first-time flyers and are guided by a Certified Flight Instructor."
      },
      {
        question: "Where do Wright Coast Aviation flights begin?",
        answer:
          "Flights begin at Dare County Regional Airport in Manteo, NC."
      },
      {
        question: "Can an intro flight count as a first step toward training?",
        answer:
          "Yes. Many people use an intro flight to decide whether they want to continue into structured flight training."
      }
    ]
  }
];

export function getResourcePath(slug: string) {
  return `/resources/${slug}`;
}

export function getResourceUrl(slug: string) {
  return absoluteUrl(getResourcePath(slug));
}
