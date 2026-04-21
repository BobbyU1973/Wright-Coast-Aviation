import {
  createTestimonialAction,
  deleteTestimonialAction,
  updateTestimonialAction
} from "@/app/admin/(dashboard)/actions";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Testimonial } from "@/lib/types";

export default async function AdminTestimonialsPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order");
  const testimonials = (data || []) as Testimonial[];

  return (
    <div className="grid gap-6">
      <div className="rounded-[8px] border border-[var(--line)] bg-white p-6">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <p className="mt-2 text-[var(--muted)]">
          Add reviews, set star ratings, feature favorites, and hide drafts.
        </p>
      </div>

      <form
        action={createTestimonialAction}
        className="grid gap-4 rounded-[8px] border border-[var(--line)] bg-white p-6"
      >
        <h2 className="text-2xl font-bold">Add Testimonial</h2>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_120px_120px]">
          <input
            required
            name="customer_name"
            placeholder="Customer name"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
          <input
            name="location"
            placeholder="Location"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            defaultValue="5"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
          <input
            name="sort_order"
            type="number"
            placeholder="Sort"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
        </div>
        <textarea
          required
          name="quote"
          placeholder="Quote"
          rows={4}
          className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
        />
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
          Add Testimonial
        </button>
      </form>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="rounded-[8px] border border-[var(--line)] bg-white p-5"
          >
            <form action={updateTestimonialAction} className="grid gap-4">
              <input type="hidden" name="id" value={testimonial.id} />
              <div className="grid gap-4 md:grid-cols-[1fr_1fr_120px_120px]">
                <input
                  required
                  name="customer_name"
                  defaultValue={testimonial.customer_name}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
                <input
                  name="location"
                  defaultValue={testimonial.location || ""}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  defaultValue={testimonial.rating || 5}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={testimonial.sort_order}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
              </div>
              <textarea
                required
                name="quote"
                defaultValue={testimonial.quote}
                rows={4}
                className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
              />
              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-2 font-bold">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={testimonial.active}
                  />{" "}
                  Active
                </label>
                <label className="flex items-center gap-2 font-bold">
                  <input
                    type="checkbox"
                    name="is_featured"
                    defaultChecked={testimonial.is_featured}
                  />{" "}
                  Featured
                </label>
              </div>
              <button
                type="submit"
                className="focus-ring min-h-11 w-fit rounded-[8px] bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white"
              >
                Save Testimonial
              </button>
            </form>
            <form action={deleteTestimonialAction} className="mt-3">
              <input type="hidden" name="id" value={testimonial.id} />
              <button
                type="submit"
                className="focus-ring min-h-11 rounded-[8px] border border-[#fac8bd] px-4 py-2 text-sm font-bold text-[#9a2d18] hover:bg-[#fff0ed]"
              >
                Delete Testimonial
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
