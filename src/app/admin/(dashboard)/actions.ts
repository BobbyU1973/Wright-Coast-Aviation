"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  formBoolean,
  formNullableText,
  formNumber,
  formText,
  slugify
} from "@/lib/utils";

const publicPaths = [
  "/",
  "/services",
  "/gallery",
  "/testimonials",
  "/faq",
  "/contact"
];

function revalidatePublicPaths() {
  for (const path of publicPaths) {
    revalidatePath(path);
  }
}

async function uploadGalleryFile(formData: FormData, oldStoragePath?: string | null) {
  const file = formData.get("image_file");

  if (!(file instanceof File) || file.size === 0) {
    return {
      image_url: formNullableText(formData, "image_url"),
      storage_path: oldStoragePath || null
    };
  }

  const supabase = createSupabaseAdminClient();
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "gallery";
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const baseName = slugify(file.name.replace(/\.[^/.]+$/, "")) || "photo";
  const storagePath = `${Date.now()}-${baseName}.${extension}`;

  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, {
    contentType: file.type || "image/jpeg",
    upsert: false
  });

  if (error) {
    throw new Error(`Photo upload failed: ${error.message}`);
  }

  if (oldStoragePath && oldStoragePath !== storagePath) {
    await supabase.storage.from(bucket).remove([oldStoragePath]);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);

  return {
    image_url: data.publicUrl,
    storage_path: storagePath
  };
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function updateSiteContentAction(formData: FormData) {
  await requireOwner();

  const supabase = createSupabaseAdminClient();
  await supabase.from("site_content").upsert({
    id: 1,
    hero_eyebrow: formText(formData, "hero_eyebrow"),
    hero_headline: formText(formData, "hero_headline"),
    hero_subheadline: formText(formData, "hero_subheadline"),
    primary_cta_label: formText(formData, "primary_cta_label"),
    secondary_cta_label: formText(formData, "secondary_cta_label"),
    intro_heading: formText(formData, "intro_heading"),
    intro_text: formText(formData, "intro_text"),
    flightcircle_url: formText(formData, "flightcircle_url"),
    scheduling_cta_label: formText(formData, "scheduling_cta_label"),
    scheduling_cta_text: formText(formData, "scheduling_cta_text"),
    contact_cta_headline: formText(formData, "contact_cta_headline"),
    contact_cta_text: formText(formData, "contact_cta_text")
  });

  revalidatePublicPaths();
}

export async function createServiceAction(formData: FormData) {
  await requireOwner();
  const title = formText(formData, "title");

  if (!title) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase.from("services").insert({
    title,
    slug: slugify(title),
    description: formText(formData, "description"),
    price_label: formNullableText(formData, "price_label"),
    image_url: formNullableText(formData, "image_url"),
    is_featured: formBoolean(formData, "is_featured"),
    active: formBoolean(formData, "active"),
    sort_order: formNumber(formData, "sort_order", 0)
  });

  revalidatePublicPaths();
}

export async function updateServiceAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");
  const title = formText(formData, "title");

  if (!id || !title) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase
    .from("services")
    .update({
      title,
      slug: slugify(title),
      description: formText(formData, "description"),
      price_label: formNullableText(formData, "price_label"),
      image_url: formNullableText(formData, "image_url"),
      is_featured: formBoolean(formData, "is_featured"),
      active: formBoolean(formData, "active"),
      sort_order: formNumber(formData, "sort_order", 0),
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  revalidatePublicPaths();
}

export async function deleteServiceAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");

  if (!id) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase.from("services").delete().eq("id", id);
  revalidatePublicPaths();
}

export async function createPhotoAction(formData: FormData) {
  await requireOwner();
  const uploaded = await uploadGalleryFile(formData);

  if (!uploaded.image_url) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase.from("gallery_photos").insert({
    image_url: uploaded.image_url,
    storage_path: uploaded.storage_path,
    caption: formNullableText(formData, "caption"),
    category: formNullableText(formData, "category"),
    is_featured: formBoolean(formData, "is_featured"),
    sort_order: formNumber(formData, "sort_order", 0)
  });

  revalidatePublicPaths();
}

export async function updatePhotoAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");

  if (!id) {
    return;
  }

  const oldStoragePath = formNullableText(formData, "storage_path");
  const uploaded = await uploadGalleryFile(formData, oldStoragePath);

  if (!uploaded.image_url) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase
    .from("gallery_photos")
    .update({
      image_url: uploaded.image_url,
      storage_path: uploaded.storage_path,
      caption: formNullableText(formData, "caption"),
      category: formNullableText(formData, "category"),
      is_featured: formBoolean(formData, "is_featured"),
      sort_order: formNumber(formData, "sort_order", 0)
    })
    .eq("id", id);

  revalidatePublicPaths();
}

export async function deletePhotoAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");
  const storagePath = formNullableText(formData, "storage_path");

  if (!id) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase.from("gallery_photos").delete().eq("id", id);

  if (storagePath) {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "gallery";
    await supabase.storage.from(bucket).remove([storagePath]);
  }

  revalidatePublicPaths();
}

export async function createTestimonialAction(formData: FormData) {
  await requireOwner();
  const customerName = formText(formData, "customer_name");
  const quote = formText(formData, "quote");

  if (!customerName || !quote) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase.from("testimonials").insert({
    customer_name: customerName,
    location: formNullableText(formData, "location"),
    rating: formNumber(formData, "rating", 5),
    quote,
    is_featured: formBoolean(formData, "is_featured"),
    active: formBoolean(formData, "active"),
    sort_order: formNumber(formData, "sort_order", 0)
  });

  revalidatePublicPaths();
}

export async function updateTestimonialAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");

  if (!id) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase
    .from("testimonials")
    .update({
      customer_name: formText(formData, "customer_name"),
      location: formNullableText(formData, "location"),
      rating: formNumber(formData, "rating", 5),
      quote: formText(formData, "quote"),
      is_featured: formBoolean(formData, "is_featured"),
      active: formBoolean(formData, "active"),
      sort_order: formNumber(formData, "sort_order", 0),
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  revalidatePublicPaths();
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");

  if (!id) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePublicPaths();
}

export async function updateLeadStatusAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");
  const status = formText(formData, "status");

  if (!id || !["new", "contacted", "closed"].includes(status)) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
