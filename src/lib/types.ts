export type SiteContent = {
  id: number;
  hero_eyebrow: string;
  hero_headline: string;
  hero_subheadline: string;
  primary_cta_label: string;
  secondary_cta_label: string;
  intro_heading: string;
  intro_text: string;
  flightcircle_url: string;
  scheduling_cta_label: string;
  scheduling_cta_text: string;
  contact_cta_headline: string;
  contact_cta_text: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price_label: string | null;
  image_url: string | null;
  is_featured: boolean;
  active: boolean;
  sort_order: number;
  created_at?: string;
};

export type GalleryPhoto = {
  id: string;
  image_url: string;
  storage_path: string | null;
  caption: string | null;
  category: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at?: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  location: string | null;
  rating: number | null;
  quote: string;
  is_featured: boolean;
  active: boolean;
  sort_order: number;
  created_at?: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  sort_order: number;
  created_at?: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_id: string | null;
  service_interest: string | null;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
};
