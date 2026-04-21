export function formatCurrencyFromCents(amountCents: number | null) {
  if (amountCents === null) {
    return "Custom amount";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amountCents % 100 === 0 ? 0 : 2
  }).format(amountCents / 100);
}

export function dollarsToCents(value: FormDataEntryValue | null) {
  const amount = Number(String(value || "").replace(/[^0-9.]/g, ""));

  if (!Number.isFinite(amount)) {
    return null;
  }

  return Math.round(amount * 100);
}

export function centsToDollarsInput(amountCents: number | null) {
  if (amountCents === null) {
    return "";
  }

  return (amountCents / 100).toFixed(2);
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
