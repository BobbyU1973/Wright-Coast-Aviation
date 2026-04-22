import {
  createTestimonialAction,
  deleteTestimonialAction,
  updateTestimonialAction
} from "@/app/admin/(dashboard)/actions";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Testimonial } from "@/lib/types";

function FieldHelp({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-6 text-[var(--muted)]">{children}</p>;
}

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
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="mt-2 text-[var(--muted)]">
          Add customer reviews, set star ratings, feature favorites on the home
          page, and hide drafts without deleting them.
        </p>
      </div>

      <form
        action={createTestimonialAction}
        className="grid gap-4 rounded-[8px] border border-[var(--line)] bg-white p-6"
      >
        <h2 className="text-2xl font-bold">Add Review</h2>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_120px_120px]">
          <label className="grid gap-2">
            <span className="font-bold">Reviewer name</span>
            <FieldHelp>Shown under the review on the public site.</FieldHelp>
            <input
              required
              name="customer_name"
              placeholder="Example: OBX Resident"
              className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
            />
          </label>
          <label className="grid gap-2">
            <span className="font-bold">Location or short label</span>
            <FieldHelp>Optional. Examples: Manteo, NC or OBX Vacation.</FieldHelp>
            <input
              name="location"
              placeholder="Example: OBX Vacation"
              className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
            />
          </label>
          <label className="grid gap-2">
            <span className="font-bold">Star rating</span>
            <FieldHelp>1 to 5 stars. Most reviews will use 5.</FieldHelp>
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              defaultValue="5"
              className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
            />
          </label>
          <label className="grid gap-2">
            <span className="font-bold">Display order</span>
            <FieldHelp>Lower numbers show first.</FieldHelp>
            <input
              name="sort_order"
              type="number"
              placeholder="0"
              className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
            />
          </label>
        </div>
        <label className="grid gap-2">
          <span className="font-bold">Review text</span>
          <FieldHelp>
            This is the customer quote visitors will read. Quotation marks are
            added by the site design.
          </FieldHelp>
          <textarea
            required
            name="quote"
            placeholder="Write the customer review here."
            rows={4}
            className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
          />
        </label>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-start gap-3 rounded-[8px] border border-[var(--line)] p-4">
            <input type="checkbox" name="active" defaultChecked />
            <span>
              <span className="block font-bold">Active</span>
              <span className="block text-sm leading-6 text-[var(--muted)]">
                Checked means this review appears on the public Reviews page.
                Unchecked saves it as a hidden draft.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-[8px] border border-[var(--line)] p-4">
            <input type="checkbox" name="is_featured" />
            <span>
              <span className="block font-bold">Featured</span>
              <span className="block text-sm leading-6 text-[var(--muted)]">
                Checked means this review can appear in the home page review
                preview.
              </span>
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="focus-ring min-h-12 w-fit rounded-[8px] bg-[var(--navy)] px-5 py-3 font-bold text-white"
        >
          Add Review
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
                <label className="grid gap-2">
                  <span className="font-bold">Reviewer name</span>
                  <FieldHelp>Shown under the review on the public site.</FieldHelp>
                  <input
                    required
                    name="customer_name"
                    defaultValue={testimonial.customer_name}
                    className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="font-bold">Location or short label</span>
                  <FieldHelp>Optional. Example: Manteo, NC.</FieldHelp>
                  <input
                    name="location"
                    defaultValue={testimonial.location || ""}
                    className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="font-bold">Star rating</span>
                  <FieldHelp>1 to 5 stars.</FieldHelp>
                  <input
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    defaultValue={testimonial.rating || 5}
                    className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="font-bold">Display order</span>
                  <FieldHelp>Lower numbers show first.</FieldHelp>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={testimonial.sort_order}
                    className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                  />
                </label>
              </div>
              <label className="grid gap-2">
                <span className="font-bold">Review text</span>
                <FieldHelp>
                  This is the customer quote visitors will read.
                </FieldHelp>
                <textarea
                  required
                  name="quote"
                  defaultValue={testimonial.quote}
                  rows={4}
                  className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
                />
              </label>
              <div className="flex flex-wrap gap-5">
                <label className="flex items-start gap-3 rounded-[8px] border border-[var(--line)] p-4">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={testimonial.active}
                  />
                  <span>
                    <span className="block font-bold">Active</span>
                    <span className="block text-sm leading-6 text-[var(--muted)]">
                      Checked means this review appears on the public Reviews
                      page. Unchecked hides it without deleting it.
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3 rounded-[8px] border border-[var(--line)] p-4">
                  <input
                    type="checkbox"
                    name="is_featured"
                    defaultChecked={testimonial.is_featured}
                  />
                  <span>
                    <span className="block font-bold">Featured</span>
                    <span className="block text-sm leading-6 text-[var(--muted)]">
                      Checked means this review can appear in the home page
                      review preview.
                    </span>
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="focus-ring min-h-11 w-fit rounded-[8px] bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white"
              >
                Save Review
              </button>
            </form>
            <form action={deleteTestimonialAction} className="mt-3">
              <input type="hidden" name="id" value={testimonial.id} />
              <button
                type="submit"
                className="focus-ring min-h-11 rounded-[8px] border border-[#fac8bd] px-4 py-2 text-sm font-bold text-[#9a2d18] hover:bg-[#fff0ed]"
              >
                Delete Review
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
