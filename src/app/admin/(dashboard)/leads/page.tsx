import { updateLeadStatusAction } from "@/app/admin/(dashboard)/actions";
import { formatDateTime } from "@/lib/format";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Lead } from "@/lib/types";

export default async function AdminLeadsPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  const leads = (data || []) as Lead[];

  return (
    <div className="grid gap-6">
      <div className="rounded-[8px] border border-[var(--line)] bg-white p-6">
        <h1 className="text-3xl font-bold">Contact Leads</h1>
        <p className="mt-2 text-[var(--muted)]">
          View incoming inquiries and mark them new, contacted, or closed.
        </p>
      </div>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <article
            key={lead.id}
            className="rounded-[8px] border border-[var(--line)] bg-white p-5"
          >
            <div className="grid gap-4 xl:grid-cols-[1fr_220px]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold">{lead.name}</h2>
                  <span className="rounded-[8px] bg-[#e8f4fb] px-3 py-1 text-xs font-bold uppercase text-[var(--navy)]">
                    {lead.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {formatDateTime(lead.created_at)}
                </p>
                <div className="mt-4 grid gap-1 text-[var(--muted)]">
                  <a className="focus-ring hover:text-[var(--navy)]" href={`mailto:${lead.email}`}>
                    {lead.email}
                  </a>
                  {lead.phone ? (
                    <a className="focus-ring hover:text-[var(--navy)]" href={`tel:${lead.phone}`}>
                      {lead.phone}
                    </a>
                  ) : null}
                  {lead.service_interest ? <p>{lead.service_interest}</p> : null}
                </div>
                <p className="mt-5 whitespace-pre-wrap leading-7">
                  {lead.message}
                </p>
              </div>
              <form action={updateLeadStatusAction} className="grid h-fit gap-3">
                <input type="hidden" name="id" value={lead.id} />
                <label className="grid gap-2">
                  <span className="text-sm font-bold">Status</span>
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="focus-ring min-h-12 rounded-[8px] border border-[var(--line)] px-4"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="focus-ring min-h-11 rounded-[8px] bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white"
                >
                  Save Status
                </button>
              </form>
            </div>
          </article>
        ))}
        {!leads.length ? (
          <p className="rounded-[8px] border border-[var(--line)] bg-white p-6 text-[var(--muted)]">
            No leads yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
