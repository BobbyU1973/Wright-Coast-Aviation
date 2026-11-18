import type { Service } from "@/lib/types";

const apparelName =
  /\b(?:t[\s-]?shirt|tank[\s-]?top|hoodie|sweatshirt|hat|cap|apparel|merch|tee)\b/i;

function numericPrice(label: string | null) {
  const match = label?.match(/\$\s*([\d,]+(?:\.\d{2})?)/);
  return match ? Number(match[1].replaceAll(",", "")) : Infinity;
}

export function isApparelService(service: Pick<Service, "title" | "slug">) {
  return apparelName.test(`${service.title} ${service.slug.replaceAll("-", " ")}`);
}

export function sortServicesByPrice(services: Service[]) {
  return [...services].sort((a, b) => {
    return numericPrice(a.price_label) - numericPrice(b.price_label) || a.sort_order - b.sort_order;
  });
}
