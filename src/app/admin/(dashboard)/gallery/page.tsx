import Image from "next/image";
import {
  createPhotoAction,
  deletePhotoAction,
  updatePhotoAction
} from "@/app/admin/(dashboard)/actions";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { GalleryPhoto } from "@/lib/types";

type AdminGalleryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const statusMessages: Record<string, { tone: "success" | "error"; text: string }> = {
  added: { tone: "success", text: "Photo added." },
  updated: { tone: "success", text: "Photo updated." },
  deleted: { tone: "success", text: "Photo deleted." },
  "missing-image": {
    tone: "error",
    text: "Choose a photo file or paste an image URL before adding a photo."
  },
  error: {
    tone: "error",
    text: "The photo could not be saved. Check the message below and try again."
  }
};

export default async function AdminGalleryPage({
  searchParams
}: AdminGalleryPageProps) {
  const params = searchParams ? await searchParams : {};
  const status = typeof params.status === "string" ? params.status : "";
  const message = typeof params.message === "string" ? params.message : "";
  const statusMessage = statusMessages[status];

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("sort_order");
  const photos = (data || []) as GalleryPhoto[];

  return (
    <div className="grid gap-6">
      <div className="rounded-[8px] border border-[var(--line)] bg-white p-6">
        <h1 className="text-3xl font-bold">Gallery Photos</h1>
        <p className="mt-2 text-[var(--muted)]">
          Upload new photos, edit captions, set featured images, and remove old
          photos.
        </p>
      </div>

      {statusMessage ? (
        <div
          className={`rounded-[8px] border p-4 font-bold ${
            statusMessage.tone === "success"
              ? "border-[#b8e6c7] bg-[#e8f7ef] text-[#1f6f3d]"
              : "border-[#fac8bd] bg-[#fff0ed] text-[#9a2d18]"
          }`}
        >
          <p>{statusMessage.text}</p>
          {message ? <p className="mt-2 font-normal">{message}</p> : null}
        </div>
      ) : null}

      <form
        action={createPhotoAction}
        encType="multipart/form-data"
        className="grid gap-4 rounded-[8px] border border-[var(--line)] bg-white p-6"
      >
        <h2 className="text-2xl font-bold">Add Photo</h2>
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
          className="focus-ring min-h-12 w-fit rounded-[8px] bg-[var(--navy)] px-5 py-3 font-bold text-white"
        >
          Add Photo
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-2">
        {photos.map((photo) => (
          <article
            key={photo.id}
            className="rounded-[8px] border border-[var(--line)] bg-white p-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] border border-[var(--line)]">
              <Image
                src={photo.image_url}
                alt={photo.caption || "Gallery photo"}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <form
              action={updatePhotoAction}
              encType="multipart/form-data"
              className="mt-4 grid gap-4"
            >
              <input type="hidden" name="id" value={photo.id} />
              <input
                type="hidden"
                name="storage_path"
                value={photo.storage_path || ""}
              />
              <input
                name="image_file"
                type="file"
                accept="image/*"
                className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4 py-3"
              />
              <input
                name="image_url"
                defaultValue={photo.image_url}
                className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
              />
              <div className="grid gap-4 md:grid-cols-[1fr_180px_100px]">
                <input
                  name="caption"
                  defaultValue={photo.caption || ""}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
                <input
                  name="category"
                  defaultValue={photo.category || ""}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={photo.sort_order}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
              </div>
              <label className="flex items-center gap-2 font-bold">
                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={photo.is_featured}
                />{" "}
                Featured
              </label>
              <button
                type="submit"
                className="focus-ring min-h-11 w-fit rounded-[8px] bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white"
              >
                Save Photo
              </button>
            </form>
            <form action={deletePhotoAction} className="mt-3">
              <input type="hidden" name="id" value={photo.id} />
              <input
                type="hidden"
                name="storage_path"
                value={photo.storage_path || ""}
              />
              <button
                type="submit"
                className="focus-ring min-h-11 rounded-[8px] border border-[#fac8bd] px-4 py-2 text-sm font-bold text-[#9a2d18] hover:bg-[#fff0ed]"
              >
                Delete Photo
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
