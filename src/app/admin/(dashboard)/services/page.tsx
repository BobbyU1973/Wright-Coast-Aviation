import {
  createServiceAction,
  deleteServiceAction,
  updateServiceAction
} from "@/app/admin/(dashboard)/actions";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Service } from "@/lib/types";

export default async function AdminServicesPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");
  const services = (data || []) as Service[];

  return (
    <div className="grid gap-6">
      <div className="rounded-[8px] border border-[var(--line)] bg-white p-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="mt-2 text-[var(--muted)]">
          Add, edit, feature, hide, or remove service cards.
        </p>
      </div>

      <form
        action={createServiceAction}
        className="grid gap-4 rounded-[8px] border border-[var(--line)] bg-white p-6"
      >
        <h2 className="text-2xl font-bold">Add Service</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            required
            name="title"
            placeholder="Service title"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
          <input
            name="price_label"
            placeholder="Price label"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
        </div>
        <textarea
          required
          name="description"
          placeholder="Description"
          rows={4}
          className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
        />
        <div className="grid gap-4 md:grid-cols-[1fr_160px]">
          <input
            name="image_url"
            placeholder="Image URL"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
          <input
            name="sort_order"
            type="number"
            placeholder="Sort"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
        </div>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 font-bold">
            <input type="checkbox" name="active" defaultChecked /> Active
          </label>
          <label className="flex items-center gap-2 font-bold">
            <input type="checkbox" name="is_featured" /> Featured
          </label>
        </div>
        <button
          type="submit"
          className="focus-ring min-h-12 w-fit rounded-[8px] bg-[var(--navy)] px-5 py-3 font-bold text-white"
        >
          Add Service
        </button>
      </form>

      <div className="grid gap-4">
        {services.map((service) => (
          <article
            key={service.id}
            className="rounded-[8px] border border-[var(--line)] bg-white p-5"
          >
            <form action={updateServiceAction} className="grid gap-4">
              <input type="hidden" name="id" value={service.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  name="title"
                  defaultValue={service.title}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
                <input
                  name="price_label"
                  defaultValue={service.price_label || ""}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
              </div>
              <textarea
                required
                name="description"
                defaultValue={service.description}
                rows={4}
                className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
              />
              <div className="grid gap-4 md:grid-cols-[1fr_160px]">
                <input
                  name="image_url"
                  defaultValue={service.image_url || ""}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={service.sort_order}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
              </div>
              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-2 font-bold">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={service.active}
                  />{" "}
                  Active
                </label>
                <label className="flex items-center gap-2 font-bold">
                  <input
                    type="checkbox"
                    name="is_featured"
                    defaultChecked={service.is_featured}
                  />{" "}
                  Featured
                </label>
              </div>
              <button
                type="submit"
                className="focus-ring min-h-11 w-fit rounded-[8px] bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white"
              >
                Save Service
              </button>
            </form>
            <form action={deleteServiceAction} className="mt-3">
              <input type="hidden" name="id" value={service.id} />
              <button
                type="submit"
                className="focus-ring min-h-11 rounded-[8px] border border-[#fac8bd] px-4 py-2 text-sm font-bold text-[#9a2d18] hover:bg-[#fff0ed]"
              >
                Delete Service
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
