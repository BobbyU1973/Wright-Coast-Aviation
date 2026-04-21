import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export function formNullableText(formData: FormData, key: string) {
  const value = formText(formData, key);
  return value.length ? value : null;
}

export function formBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export function formNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
}
