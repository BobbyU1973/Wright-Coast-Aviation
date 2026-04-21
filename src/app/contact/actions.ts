"use server";

import { redirect } from "next/navigation";
import { sendLeadNotification } from "@/lib/email";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase/admin";
import { formNullableText, formText } from "@/lib/utils";

export async function createLeadAction(formData: FormData) {
  const name = formText(formData, "name");
  const email = formText(formData, "email");
  const phone = formNullableText(formData, "phone");
  const serviceInterest = formNullableText(formData, "service_interest");
  const message = formText(formData, "message");

  if (!name || !email || !message) {
    redirect("/contact?status=missing");
  }

  const lead = {
    name,
    email,
    phone,
    service_id: null,
    service_interest: serviceInterest,
    message,
    status: "new" as const
  };

  if (hasSupabaseAdminConfig()) {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("leads").insert(lead);

    if (error) {
      console.error("Lead insert failed", error);
      redirect("/contact?status=error");
    }
  } else {
    console.warn("Lead received in demo mode. Configure Supabase to save leads.");
  }

  await sendLeadNotification(lead);
  redirect(hasSupabaseAdminConfig() ? "/contact?status=success" : "/contact?status=demo");
}
