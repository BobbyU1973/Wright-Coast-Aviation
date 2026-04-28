import type {
  FAQItem,
  GalleryPhoto,
  Service,
  SiteContent,
  Testimonial
} from "@/lib/types";

export const defaultSiteContent: SiteContent = {
  id: 1,
  hero_eyebrow: "ENJOY FLYING AT THE BIRTHPLACE OF FLIGHT - THE NC OBX!",
  hero_headline:
    "Book an unforgettable vacation flight or start training to become a pilot.",
  hero_subheadline:
    "There is no better place to fly than the coast where aviation history began. Fly from Dare County Regional Airport in Manteo while visiting the Outer Banks, or start training close to home.",
  primary_cta_label: "Book Now",
  secondary_cta_label: "View Flight Experiences",
  intro_heading: "The Outer Banks was made for this moment.",
  intro_text:
    "Visitors come here for ocean air, wide-open views, and the story of flight itself. Wright Coast Aviation lets you become part of that story with hands-on intro flights, while full-time and part-time residents can train with a local school built for confidence, consistency, and real progress.",
  flightcircle_url: "https://www.flightcircle.com/shop/80c1316b45c4",
  scheduling_cta_label: "Book Now",
  scheduling_cta_text:
    "Book Intro Flights or Flight Training through FlightCircle and enter passenger information in one simple flow.",
  contact_cta_headline: "Questions before you fly?",
  contact_cta_text:
    "Message Wright Coast Aviation and we will help you choose the right intro flight or training path."
};

export const sampleServices: Service[] = [
  {
    id: "intro-flight-179",
    title: "Intro Flight Experience",
    slug: "intro-flight-experience",
    description:
      "Fly a real airplane with a Certified Flight Instructor. Perfect for first-time flyers -- no experience needed. Take the controls and experience what it feels like to fly. ~30-35 minutes of flight time.",
    price_label: "$179",
    image_url: "/images/cockpit-approach.jpg",
    is_featured: true,
    active: true,
    sort_order: 1
  },
  {
    id: "intro-flight-219",
    title: "Intro Flight Experience - Most Popular",
    slug: "intro-flight-experience-most-popular",
    description:
      "Our most popular introductory flight experience. Enjoy more time on the controls and a deeper feel for flying -- no experience needed. ~40-45 minutes of flight time.",
    price_label: "$219",
    image_url: "/images/cloud-view.jpg",
    is_featured: true,
    active: true,
    sort_order: 2
  },
  {
    id: "extended-flight-259",
    title: "Extended Flight Experience",
    slug: "extended-flight-experience",
    description:
      "Our most complete and immersive flight experience. Extended time to build confidence on the controls and fully experience what it is like to fly. ~60-70 minutes total experience.",
    price_label: "$259",
    image_url: "/images/ramp-new-plane.jpg",
    is_featured: true,
    active: true,
    sort_order: 3
  },
  {
    id: "ten-hour-flight-block",
    title: "10 Hour Flight Block",
    slug: "10-hour-flight-block",
    description:
      "A structured 10-hour flight training package designed to build consistency, confidence, and real progress in the aircraft.",
    price_label: "$1950",
    image_url: "/images/panel-view.jpg",
    is_featured: true,
    active: true,
    sort_order: 4
  },
  {
    id: "twenty-hour-flight-block",
    title: "20 Hour Flight Block",
    slug: "20-hour-flight-block",
    description:
      "A 20-hour training package for students committed to consistent progression and long-term development as a pilot.",
    price_label: "$3850",
    image_url: "/images/student-plane.jpg",
    is_featured: true,
    active: true,
    sort_order: 5
  }
];

export const samplePhotos: GalleryPhoto[] = [
  {
    id: "obx-coast",
    image_url: "/images/obx-coast.jpg",
    storage_path: null,
    caption: "Outer Banks views from the air make the trip unforgettable.",
    category: "Outer Banks",
    is_featured: true,
    sort_order: 1
  },
  {
    id: "cockpit-approach",
    image_url: "/images/cockpit-approach.jpg",
    storage_path: null,
    caption: "Hands-on flying with a Certified Flight Instructor.",
    category: "Intro Flight",
    is_featured: true,
    sort_order: 2
  },
  {
    id: "ramp-new-plane",
    image_url: "/images/ramp-new-plane.jpg",
    storage_path: null,
    caption: "Your intro flight begins at Dare County Regional Airport.",
    category: "Manteo",
    is_featured: true,
    sort_order: 3
  },
  {
    id: "panel-view",
    image_url: "/images/panel-view.jpg",
    storage_path: null,
    caption: "Flight training builds confidence and consistency.",
    category: "Training",
    is_featured: false,
    sort_order: 4
  },
  {
    id: "cloud-view",
    image_url: "/images/cloud-view.jpg",
    storage_path: null,
    caption: "See the wonder of the coast from above.",
    category: "Scenic",
    is_featured: false,
    sort_order: 5
  }
];

export const sampleTestimonials: Testimonial[] = [
  {
    id: "review-1",
    customer_name: "First-Time Flyer",
    location: "Outer Banks Vacation",
    rating: null,
    quote:
      "I came in nervous and left smiling. Taking the controls over the coast was the highlight of our trip.",
    is_featured: true,
    active: true,
    sort_order: 1
  },
  {
    id: "review-2",
    customer_name: "Vacation Visitor",
    location: "Manteo, NC",
    rating: null,
    quote:
      "Such a fun thing to do while visiting the Outer Banks. Easy to book, friendly instructor, unforgettable views.",
    is_featured: true,
    active: true,
    sort_order: 2
  },
  {
    id: "review-3",
    customer_name: "Student Pilot",
    location: "North Carolina",
    rating: null,
    quote:
      "The intro flight made flight training feel possible. It was hands-on, relaxed, and exciting from start to finish.",
    is_featured: true,
    active: true,
    sort_order: 3
  }
];

export const sampleFaqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do I need flight experience?",
    answer:
      "No experience is needed. Intro flights are designed for first-time flyers and are guided by a Certified Flight Instructor.",
    active: true,
    sort_order: 1
  },
  {
    id: "faq-2",
    question: "Can I really take the controls?",
    answer:
      "Yes, when conditions allow. Your instructor will guide you from the pilot seat so you can feel what flying is like.",
    active: true,
    sort_order: 2
  },
  {
    id: "faq-3",
    question: "Why fly while visiting the Outer Banks?",
    answer:
      "The Outer Banks is the Birthplace of Flight, full of water, sky, history, and wide-open views. An intro flight gives visitors a vacation memory they cannot get anywhere else.",
    active: true,
    sort_order: 3
  },
  {
    id: "faq-4",
    question: "Do you offer training for locals?",
    answer:
      "Yes. Wright Coast Aviation offers flight training for full-time and part-time residents who want to train to be a pilot in the Manteo area.",
    active: true,
    sort_order: 4
  }
];
