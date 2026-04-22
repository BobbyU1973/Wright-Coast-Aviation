"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createPhotoRecordAction,
  prepareGalleryUploadAction
} from "@/app/admin/(dashboard)/actions";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type UploadStatus = {
  tone: "success" | "error" | "info";
  text: string;
};

const maxUploadBytes = 20 * 1024 * 1024;

function formString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function formNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

function readableBytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function GalleryUploadForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<UploadStatus | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const file = formData.get("image_file");
    const imageUrl = formString(formData, "image_url");

    startTransition(async () => {
      setStatus({ tone: "info", text: "Preparing photo upload..." });

      try {
        if (file instanceof File && file.size > 0) {
          if (file.size > maxUploadBytes) {
            setStatus({
              tone: "error",
              text: `That file is ${readableBytes(file.size)}. Please choose an image under 20 MB.`
            });
            return;
          }

          const prepared = await prepareGalleryUploadAction({
            fileName: file.name,
            fileType: file.type || "image/jpeg",
            fileSize: file.size
          });

          if (
            !prepared.ok ||
            !prepared.bucket ||
            !prepared.path ||
            !prepared.token ||
            !prepared.publicUrl
          ) {
            setStatus({
              tone: "error",
              text: prepared.message || "Could not prepare the photo upload."
            });
            return;
          }

          setStatus({ tone: "info", text: "Uploading photo to storage..." });

          const supabase = createSupabaseBrowserClient();
          const { error: uploadError } = await supabase.storage
            .from(prepared.bucket)
            .uploadToSignedUrl(prepared.path, prepared.token, file, {
              contentType: file.type || "image/jpeg",
              cacheControl: "3600"
            });

          if (uploadError) {
            setStatus({
              tone: "error",
              text: `Photo upload failed: ${uploadError.message}`
            });
            return;
          }

          const saved = await createPhotoRecordAction({
            image_url: prepared.publicUrl,
            storage_path: prepared.path,
            caption: formString(formData, "caption") || null,
            category: formString(formData, "category") || null,
            is_featured: formData.get("is_featured") === "on",
            sort_order: formNumber(formData, "sort_order")
          });

          if (!saved.ok) {
            setStatus({ tone: "error", text: saved.message });
            return;
          }

          form.reset();
          setStatus({ tone: "success", text: saved.message });
          router.refresh();
          return;
        }

        if (imageUrl) {
          const saved = await createPhotoRecordAction({
            image_url: imageUrl,
            storage_path: null,
            caption: formString(formData, "caption") || null,
            category: formString(formData, "category") || null,
            is_featured: formData.get("is_featured") === "on",
            sort_order: formNumber(formData, "sort_order")
          });

          if (!saved.ok) {
            setStatus({ tone: "error", text: saved.message });
            return;
          }

          form.reset();
          setStatus({ tone: "success", text: saved.message });
          router.refresh();
          return;
        }

        setStatus({
          tone: "error",
          text: "Choose a photo file or paste an image URL before adding a photo."
        });
      } catch (error) {
        setStatus({
          tone: "error",
          text:
            error instanceof Error
              ? error.message
              : "The photo could not be uploaded."
        });
      }
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-[8px] border border-[var(--line)] bg-white p-6"
    >
      <h2 className="text-2xl font-bold">Add Photo</h2>
      <p className="text-sm leading-6 text-[var(--muted)]">
        Upload a JPG, PNG, or WebP image under 20 MB. The photo uploads
        directly to Supabase, so larger phone photos can work without going
        through Vercel.
      </p>
      {status ? (
        <div
          className={`rounded-[8px] border p-4 font-bold ${
            status.tone === "success"
              ? "border-[#b8e6c7] bg-[#e8f7ef] text-[#1f6f3d]"
              : status.tone === "info"
                ? "border-[#c7ddec] bg-[#edf8ff] text-[var(--navy)]"
                : "border-[#fac8bd] bg-[#fff0ed] text-[#9a2d18]"
          }`}
        >
          {status.text}
        </div>
      ) : null}
      <input
        name="image_file"
        type="file"
        accept="image/*"
        className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4 py-3"
      />
      <input
        name="image_url"
        placeholder="Or paste an image URL"
        className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
      />
      <div className="grid gap-4 md:grid-cols-[1fr_220px_120px]">
        <input
          name="caption"
          placeholder="Caption"
          className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
        />
        <input
          name="category"
          placeholder="Category"
          className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
        />
        <input
          name="sort_order"
          type="number"
          placeholder="Sort"
          className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
        />
      </div>
      <label className="flex items-center gap-2 font-bold">
        <input type="checkbox" name="is_featured" /> Featured
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="focus-ring min-h-12 w-fit rounded-[8px] bg-[var(--navy)] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Uploading..." : "Add Photo"}
      </button>
    </form>
  );
}
