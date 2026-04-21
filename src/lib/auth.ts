import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function ownerEmails() {
  return String(process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function requireOwner() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  const allowedEmails = ownerEmails();
  const userEmail = user.email?.toLowerCase();

  if (allowedEmails.length && (!userEmail || !allowedEmails.includes(userEmail))) {
    redirect("/admin/login?error=not-owner");
  }

  return user;
}
