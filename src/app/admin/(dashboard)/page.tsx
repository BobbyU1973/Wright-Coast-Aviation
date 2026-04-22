import { updateSiteContentAction } from "@/app/admin/(dashboard)/actions";
import { getSiteContent } from "@/lib/cms";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Lead } from "@/lib/types";
import { formatDateTime } from "@/lib/format";

type AdminDashboardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const statusMessages: Record<string, { tone: "success" | "error"; text: string }> = {
  "homepage-saved": {
    tone: "success",
    text: "Homepage content saved."
  },
  "homepage-error": {
    tone: "error",
    text: "Homepage content could not be saved."
  }
};

async function countRows(table: string) {
  const supabase = createSupabaseAdminClient();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  return count || 0;
}

export default async function AdminDashboardPage({
  searchParams
}: AdminDashboardPageProps) {
  const params = searchParams ? await searchParams : {};
  const status = typeof params.status === "string" ? params.status : "";
  const message = typeof params.message === "string" ? params.message : "";
  const statusMessage = statusMessages[status];

  const supabase = createSupabaseAdminClient();
  const [siteContent, serviceCount, photoCount, reviewCount, faqCount, leadCount] =
    await Promise.all([
      getSiteContent(),
      countRows("services"),
      countRows("gallery_photos"),
      countRows("testimonials"),
      countRows("faqs"),
      countRows("leads")
    ]);
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="grid gap-6">
      <div className="rounded-[8px] border border-[var(--line)] bg-white p-6">
        <p className="text-sm font-bold uppercase text-[var(--sky)]">
          Owner dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold">Manage the business website</h1>
        <p className="mt-3 text-[var(--muted)]">
          Edit homepage content, photos, reviews, FAQs, services, FlightCircle
          booking details, and contact leads from one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Services", serviceCount],
          ["Photos", photoCount],
          ["Reviews", reviewCount],
          ["FAQs", faqCount],
          ["Leads", leadCount]
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[8px] border border-[var(--line)] bg-white p-5"
          >
            <p className="text-sm font-bold uppercase text-[var(--sky)]">
              {label}
            </p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
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
        action={updateSiteContentAction}
        className="grid gap-5 rounded-[8px] border border-[var(--line)] bg-white p-6"
      >
        <div>
          <h2 className="text-2xl font-bold">Homepage featured content</h2>
          <p className="mt-2 text-[var(--muted)]">
            Keep the first screen, intro, FlightCircle link, and contact CTA
            fresh.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold">Hero eyebrow</span>
            <input
              name="hero_eyebrow"
              defaultValue={siteContent.hero_eyebrow}
              className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">Primary CTA label</span>
            <input
              name="primary_cta_label"
              defaultValue={siteContent.primary_cta_label}
              className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
            />
          </label>
        </div>

        {[
          ["hero_headline", "Hero headline", siteContent.hero_headline],
          [
            "hero_subheadline",
            "Hero subheadline",
            siteContent.hero_subheadline
          ],
          ["intro_heading", "Intro heading", siteContent.intro_heading],
          ["intro_text", "Intro text", siteContent.intro_text],
          [
            "flightcircle_url",
            "FlightCircle URL",
            siteContent.flightcircle_url
          ],
          [
            "scheduling_cta_label",
            "Scheduling CTA label",
            siteContent.scheduling_cta_label
          ],
          [
            "scheduling_cta_text",
            "Scheduling CTA text",
            siteContent.scheduling_cta_text
          ],
          [
            "contact_cta_headline",
            "Contact CTA headline",
            siteContent.contact_cta_headline
          ],
          ["contact_cta_text", "Contact CTA text", siteContent.contact_cta_text]
        ].map(([name, label, value]) => (
          <label key={name} className="grid gap-2">
            <span className="text-sm font-bold">{label}</span>
            <textarea
              name={name}
              defaultValue={value}
              rows={name.includes("headline") ? 2 : 4}
              className="focus-ring rounded-[8px] border border-[var(--line)] px-4 py-3"
            />
          </label>
        ))}

        <label className="grid gap-2 sm:max-w-md">
          <span className="text-sm font-bold">Secondary CTA label</span>
          <input
            name="secondary_cta_label"
            defaultValue={siteContent.secondary_cta_label}
            className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
          />
        </label>

        <button
          type="submit"
          className="focus-ring min-h-12 w-fit rounded-[8px] bg-[var(--navy)] px-5 py-3 font-bold text-white"
        >
          Save homepage content
        </button>
      </form>

      <div className="rounded-[8px] border border-[var(--line)] bg-white p-6">
        <h2 className="text-2xl font-bold">Recent leads</h2>
        <div className="mt-4 grid gap-3">
          {((recentLeads || []) as Lead[]).map((lead) => (
            <div
              key={lead.id}
              className="rounded-[8px] border border-[var(--line)] p-4"
            >
              <p className="font-bold">{lead.name}</p>
              <p className="text-sm text-[var(--muted)]">
                {lead.email} - {formatDateTime(lead.created_at)}
              </p>
            </div>
          ))}
          {!recentLeads?.length ? (
            <p className="text-[var(--muted)]">No leads yet.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
