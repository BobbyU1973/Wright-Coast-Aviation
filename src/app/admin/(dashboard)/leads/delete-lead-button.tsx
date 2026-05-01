"use client";

import type { FormEvent } from "react";
import { deleteLeadAction } from "@/app/admin/(dashboard)/actions";

type DeleteLeadButtonProps = {
  leadId: string;
  leadName: string;
};

export function DeleteLeadButton({ leadId, leadName }: DeleteLeadButtonProps) {
  function confirmDelete(event: FormEvent<HTMLFormElement>) {
    const confirmed = window.confirm(
      `Delete the email from ${leadName}? This cannot be undone.`
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteLeadAction} onSubmit={confirmDelete} className="grid gap-2">
      <input type="hidden" name="id" value={leadId} />
      <button
        type="submit"
        className="focus-ring min-h-11 rounded-[8px] border border-[#b42318] bg-white px-4 py-2 text-sm font-bold text-[#b42318] transition hover:bg-[#fff3f0]"
      >
        Delete Email
      </button>
      <p className="text-xs leading-5 text-[var(--muted)]">
        Delete permanently removes this inquiry from the dashboard.
      </p>
    </form>
  );
}
