import {
  defaultSiteContent,
  sampleFaqs,
  samplePhotos,
  sampleServices,
  sampleTestimonials
} from "@/lib/sample-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  GalleryPhoto,
  FAQItem,
  Service,
  SiteContent,
  Testimonial
} from "@/lib/types";

async function getPublicClient() {
  return createSupabaseServerClient();
}

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = await getPublicClient();

  if (!supabase) {
    return defaultSiteContent;
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    return defaultSiteContent;
  }

  return data as SiteContent;
}

export async function getServices(options?: {
  featured?: boolean;
  includeInactive?: boolean;
}): Promise<Service[]> {
  const supabase = await getPublicClient();

  if (!supabase) {
    return sampleServices.filter((service) =>
      options?.featured ? service.is_featured : true
    );
  }

  let query = supabase.from("services").select("*").order("sort_order");

  if (!options?.includeInactive) {
    query = query.eq("active", true);
  }

  if (options?.featured) {
    query = query.eq("is_featured", true);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return sampleServices.filter((service) =>
      options?.featured ? service.is_featured : true
    );
  }

  return data as Service[];
}

export async function getGalleryPhotos(options?: {
  featured?: boolean;
}): Promise<GalleryPhoto[]> {
  const supabase = await getPublicClient();

  if (!supabase) {
    return samplePhotos.filter((photo) =>
      options?.featured ? photo.is_featured : true
    );
  }

  let query = supabase.from("gallery_photos").select("*").order("sort_order");

  if (options?.featured) {
    query = query.eq("is_featured", true);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return samplePhotos.filter((photo) =>
      options?.featured ? photo.is_featured : true
    );
  }

  return data as GalleryPhoto[];
}

export async function getTestimonials(options?: {
  featured?: boolean;
  includeInactive?: boolean;
}): Promise<Testimonial[]> {
  const supabase = await getPublicClient();

  if (!supabase) {
    return sampleTestimonials.filter((testimonial) =>
      options?.featured ? testimonial.is_featured : true
    );
  }

  let query = supabase.from("testimonials").select("*").order("sort_order");

  if (!options?.includeInactive) {
    query = query.eq("active", true);
  }

  if (options?.featured) {
    query = query.eq("is_featured", true);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return sampleTestimonials.filter((testimonial) =>
      options?.featured ? testimonial.is_featured : true
    );
  }

  return data as Testimonial[];
}

export async function getFaqs(options?: {
  includeInactive?: boolean;
}): Promise<FAQItem[]> {
  const supabase = await getPublicClient();

  if (!supabase) {
    return sampleFaqs.filter((faq) =>
      options?.includeInactive ? true : faq.active
    );
  }

  let query = supabase.from("faqs").select("*").order("sort_order");

  if (!options?.includeInactive) {
    query = query.eq("active", true);
  }

  const { data, error } = await query;

  if (error) {
    return sampleFaqs.filter((faq) =>
      options?.includeInactive ? true : faq.active
    );
  }

  return (data || []) as FAQItem[];
}
