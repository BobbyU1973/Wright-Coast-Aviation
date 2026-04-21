import type { Lead } from "@/lib/types";
import { siteConfig } from "@/lib/site";

type LeadNotification = Pick<
  Lead,
  "name" | "email" | "phone" | "service_interest" | "message"
>;

export async function sendLeadNotification(lead: LeadNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contactEmail;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    `Wright Coast Aviation <no-reply@wrightcoastaviation.com>`;

  if (!apiKey || !to) {
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New Wright Coast Aviation inquiry from ${lead.name}`,
      reply_to: lead.email,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone || "Not provided"}`,
        `Service: ${lead.service_interest || "Not selected"}`,
        "",
        lead.message
      ].join("\n")
    })
  });

  if (!response.ok) {
    console.error("Lead notification failed", await response.text());
  }

  return { skipped: false };
}
