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

function galleryRedirect(status: string, message?: string): never {
  const params = new URLSearchParams({ status });

  if (message) {
    params.set("message", message);
  }

  redirect(`/admin/gallery?${params.toString()}`);
}

function dashboardRedirect(status: string, message?: string): never {
  const params = new URLSearchParams({ status });

  if (message) {
    params.set("message", message);
  }

  redirect(`/admin?${params.toString()}`);
}

const directUploadMaxBytes = 20 * 1024 * 1024;

type PrepareGalleryUploadInput = {
  fileName: string;
  fileType: string;
  fileSize: number;
};

type CreatePhotoRecordInput = {
  image_url: string;
  storage_path?: string | null;
  caption?: string | null;
  category?: string | null;
  is_featured?: boolean;
  sort_order?: number;
};

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

export async function prepareGalleryUploadAction(input: PrepareGalleryUploadInput) {
  await requireOwner();

  const fileName = String(input.fileName || "photo.jpg");
  const fileType = String(input.fileType || "image/jpeg");
  const fileSize = Number(input.fileSize || 0);

  if (!fileType.startsWith("image/")) {
    return {
      ok: false,
      message: "Please choose a JPG, PNG, WebP, or other image file."
    };
  }

  if (!fileSize || fileSize > directUploadMaxBytes) {
    return {
      ok: false,
      message: "Please choose an image under 20 MB."
    };
  }

  const supabase = createSupabaseAdminClient();
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "gallery";
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const baseName = slugify(fileName.replace(/\.[^/.]+$/, "")) || "photo";
  const storagePath = `${Date.now()}-${baseName}.${extension}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(storagePath);

  if (error || !data?.token) {
    return {
      ok: false,
      message: error?.message || "Could not prepare the photo upload."
    };
  }

  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(storagePath);

  return {
    ok: true,
    bucket,
    path: storagePath,
    token: data.token,
    publicUrl: publicData.publicUrl
  };
}

export async function createPhotoRecordAction(input: CreatePhotoRecordInput) {
  await requireOwner();

  if (!input.image_url) {
    return {
      ok: false,
      message: "Choose a photo file or paste an image URL before adding a photo."
    };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("gallery_photos").insert({
    image_url: input.image_url,
    storage_path: input.storage_path || null,
    caption: input.caption || null,
    category: input.category || null,
    is_featured: Boolean(input.is_featured),
    sort_order: Number.isFinite(input.sort_order) ? input.sort_order : 0
  });

  if (error) {
    return {
      ok: false,
      message: `Photo record failed: ${error.message}`
    };
  }

  revalidatePublicPaths();
  revalidatePath("/admin/gallery");

  return {
    ok: true,
    message: "Photo added."
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
  const { error } = await supabase.from("site_content").upsert({
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

  if (error) {
    dashboardRedirect("homepage-error", `Homepage save failed: ${error.message}`);
  }

  revalidatePublicPaths();
  revalidatePath("/admin");
  dashboardRedirect("homepage-saved");
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
  let uploaded;

  try {
    uploaded = await uploadGalleryFile(formData);
  } catch (error) {
    galleryRedirect(
      "error",
      error instanceof Error ? error.message : "Photo upload failed."
    );
  }

  if (!uploaded.image_url) {
    galleryRedirect("missing-image");
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("gallery_photos").insert({
    image_url: uploaded.image_url,
    storage_path: uploaded.storage_path,
    caption: formNullableText(formData, "caption"),
    category: formNullableText(formData, "category"),
    is_featured: formBoolean(formData, "is_featured"),
    sort_order: formNumber(formData, "sort_order", 0)
  });

  if (error) {
    galleryRedirect("error", `Photo record failed: ${error.message}`);
  }

  revalidatePublicPaths();
  galleryRedirect("added");
}

export async function updatePhotoAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");

  if (!id) {
    return;
  }

  const oldStoragePath = formNullableText(formData, "storage_path");
  let uploaded;

  try {
    uploaded = await uploadGalleryFile(formData, oldStoragePath);
  } catch (error) {
    galleryRedirect(
      "error",
      error instanceof Error ? error.message : "Photo upload failed."
    );
  }

  if (!uploaded.image_url) {
    galleryRedirect("missing-image");
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
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

  if (error) {
    galleryRedirect("error", `Photo update failed: ${error.message}`);
  }

  revalidatePublicPaths();
  galleryRedirect("updated");
}

export async function deletePhotoAction(formData: FormData) {
  await requireOwner();
  const id = formText(formData, "id");
  const storagePath = formNullableText(formData, "storage_path");

  if (!id) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("gallery_photos").delete().eq("id", id);

  if (error) {
    galleryRedirect("error", `Photo delete failed: ${error.message}`);
  }

  if (storagePath) {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "gallery";
    await supabase.storage.from(bucket).remove([storagePath]);
  }

  revalidatePublicPaths();
  galleryRedirect("deleted");
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
