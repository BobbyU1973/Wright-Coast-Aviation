import {
  createFaqAction,
  deleteFaqAction,
  updateFaqAction
} from "@/app/admin/(dashboard)/actions";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { FAQItem } from "@/lib/types";

type AdminFaqsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const statusMessages: Record<string, { tone: "success" | "error"; text: string }> = {
  added: { tone: "success", text: "FAQ added." },
  updated: { tone: "success", text: "FAQ saved." },
  deleted: { tone: "success", text: "FAQ deleted." },
  missing: {
    tone: "error",
    text: "Question and answer are both required."
  },
  error: {
    tone: "error",
    text: "The FAQ could not be saved. Check the message below and try again."
  }
};

function FieldHelp({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-6 text-[var(--muted)]">{children}</p>;
}

export default async function AdminFaqsPage({
  searchParams
}: AdminFaqsPageProps) {
  const params = searchParams ? await searchParams : {};
  const status = typeof params.status === "string" ? params.status : "";
  const message = typeof params.message === "string" ? params.message : "";
  const statusMessage = statusMessages[status];

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order");
  const faqs = (data || []) as FAQItem[];

  return (
    <div className="grid gap-6">
      <div className="rounded-[8px] border border-[var(--line)] bg-white p-6">
        <h1 className="text-3xl font-bold">FAQs</h1>
        <p className="mt-2 text-[var(--muted)]">
          Add, edit, hide, reorder, or remove questions on the public Frequently
          Asked Questions page.
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

      {error ? (
        <div className="rounded-[8px] border border-[#fac8bd] bg-[#fff0ed] p-4 text-[#9a2d18]">
          <p className="font-bold">FAQ database table is not ready yet.</p>
          <p className="mt-2 leading-6">
            Run the FAQ SQL setup in Supabase once, then come back here. The
            public FAQ page will keep showing the default questions until this
            table exists.
          </p>
          <p className="mt-2 text-sm">{error.message}</p>
        </div>
      ) : null}

      <form
        action={createFaqAction}
        className="grid gap-4 rounded-[8px] border border-[var(--line)] bg-white p-6"
      >
        <h2 className="text-2xl font-bold">Add FAQ</h2>
        <label className="grid gap-2">
          <span className="font-bold">Question</span>
          <FieldHelp>
            This is the question visitors see on the Frequently Asked Questions
            page.
          </FieldHelp>
          <input
            required
            name="question"
            placeholder="Example: Can I take the controls?"
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
        </label>
        <label className="grid gap-2">
          <span className="font-bold">Answer</span>
          <FieldHelp>
            This answer displays directly under the question. Keep it clear and
            helpful for first-time visitors.
          </FieldHelp>
          <textarea
            required
            name="answer"
            placeholder="Write the answer visitors should read."
            rows={4}
            className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-[160px_1fr]">
          <label className="grid gap-2">
            <span className="font-bold">Display order</span>
            <FieldHelp>Lower numbers show first.</FieldHelp>
            <input
              name="sort_order"
              type="number"
              defaultValue="0"
              className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
            />
          </label>
          <label className="flex items-start gap-3 rounded-[8px] border border-[var(--line)] p-4">
            <input type="checkbox" name="active" defaultChecked />
            <span>
              <span className="block font-bold">Active</span>
              <span className="block text-sm leading-6 text-[var(--muted)]">
                Checked means this FAQ appears on the public site. Unchecked
                saves it as a hidden draft.
              </span>
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="focus-ring min-h-12 w-fit rounded-[8px] bg-[var(--navy)] px-5 py-3 font-bold text-white"
        >
          Add FAQ
        </button>
      </form>

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <article
            key={faq.id}
            className="rounded-[8px] border border-[var(--line)] bg-white p-5"
          >
            <form action={updateFaqAction} className="grid gap-4">
              <input type="hidden" name="id" value={faq.id} />
              <label className="grid gap-2">
                <span className="font-bold">Question</span>
                <FieldHelp>Shown as the FAQ headline on the public site.</FieldHelp>
                <input
                  required
                  name="question"
                  defaultValue={faq.question}
                  className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-bold">Answer</span>
                <FieldHelp>Shown under the question on the public site.</FieldHelp>
                <textarea
                  required
                  name="answer"
                  defaultValue={faq.answer}
                  rows={4}
                  className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-[160px_1fr]">
                <label className="grid gap-2">
                  <span className="font-bold">Display order</span>
                  <FieldHelp>Lower numbers show first.</FieldHelp>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={faq.sort_order}
                    className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                  />
                </label>
                <label className="flex items-start gap-3 rounded-[8px] border border-[var(--line)] p-4">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={faq.active}
                  />
                  <span>
                    <span className="block font-bold">Active</span>
                    <span className="block text-sm leading-6 text-[var(--muted)]">
                      Checked means this FAQ appears on the public site.
                      Unchecked hides it without deleting it.
                    </span>
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="focus-ring min-h-11 w-fit rounded-[8px] bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white"
              >
                Save FAQ
              </button>
            </form>
            <form action={deleteFaqAction} className="mt-3">
              <input type="hidden" name="id" value={faq.id} />
              <button
                type="submit"
                className="focus-ring min-h-11 rounded-[8px] border border-[#fac8bd] px-4 py-2 text-sm font-bold text-[#9a2d18] hover:bg-[#fff0ed]"
              >
                Delete FAQ
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
