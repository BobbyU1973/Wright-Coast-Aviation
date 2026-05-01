"use client";

import { useMemo, useState } from "react";
import { formatDateTime } from "@/lib/format";

type LeadEmailActionsProps = {
  name: string;
  email: string;
  phone?: string | null;
  serviceInterest?: string | null;
  message: string;
  createdAt: string;
};

export function LeadEmailActions({
  name,
  email,
  phone,
  serviceInterest,
  message,
  createdAt
}: LeadEmailActionsProps) {
  const [copied, setCopied] = useState(false);

  const gmailUrl = useMemo(() => {
    const originalInquiry = [
      "",
      "",
      "---",
      "Original inquiry",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      serviceInterest ? `How can we help?: ${serviceInterest}` : null,
      `Submitted: ${formatDateTime(createdAt)}`,
      "",
      message
    ]
      .filter(Boolean)
      .join("\n");

    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: email,
      su: "Re: Wright Coast Aviation inquiry",
      body: `Hi ${firstName(name)},\n\nThanks for reaching out to Wright Coast Aviation.\n\n${originalInquiry}`
    });

    return `https://mail.google.com/mail/?${params.toString()}`;
  }, [createdAt, email, message, name, phone, serviceInterest]);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-2">
      <a
        href={gmailUrl}
        target="_blank"
        rel="noreferrer"
        className="focus-ring inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--book)] px-4 py-2 text-sm font-bold !text-black transition hover:bg-[var(--book-hover)]"
      >
        Reply in Gmail
      </a>
      <button
        type="button"
        onClick={copyEmail}
        className="focus-ring min-h-11 rounded-[8px] border border-[var(--line)] bg-white px-4 py-2 text-sm font-bold text-[var(--navy)] transition hover:bg-[#e8f4fb]"
      >
        {copied ? "Copied" : "Copy Email"}
      </button>
      <p className="text-xs leading-5 text-[var(--muted)]">
        Gmail opens in a new tab using the signed-in Google account.
      </p>
    </div>
  );
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}
