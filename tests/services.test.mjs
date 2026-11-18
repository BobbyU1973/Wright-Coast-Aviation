import assert from "node:assert/strict";
import test from "node:test";
import {
  isApparelService,
  serviceDescriptionParagraphs,
  sortServicesByPrice
} from "../src/lib/services.ts";

const services = [
  ["Intro Flight Experience", "$179"],
  ["20 Hour Flight Block", "$3,700"],
  ["Wright Coast Aviation Hoodie", "$50"],
  ["Wright Coast Aviation T-Shirt", "$25"],
  ["10 Hour Flight Block", "$1,900"],
  ["Intro Flight Experience - Most Popular", "$219"],
  ["Extended Flight Experience", "$259"],
  ["Wright Coast Aviation Tank Top", "$25"]
].map(([title, price_label], sort_order) => ({
  title,
  slug: title.toLowerCase().replaceAll(" ", "-"),
  price_label,
  sort_order
}));

test("flight offerings stay ahead of apparel and sort by price", () => {
  const flights = sortServicesByPrice(services.filter((service) => !isApparelService(service)));
  assert.deepEqual(
    flights.map((service) => service.price_label),
    ["$179", "$219", "$259", "$1,900", "$3,700"]
  );
});

test("apparel has its own least-to-most-expensive order", () => {
  const apparel = sortServicesByPrice(services.filter(isApparelService));
  assert.deepEqual(
    apparel.map((service) => service.price_label),
    ["$25", "$25", "$50"]
  );
});

test("items without a numeric price sort last", () => {
  const unpriced = { ...services[0], price_label: null, sort_order: 9 };
  assert.equal(sortServicesByPrice([unpriced, services[0]])[1], unpriced);
});

test("service descriptions separate blank-line paragraphs", () => {
  assert.deepEqual(
    serviceDescriptionParagraphs("First line\r\nSecond line\r\n\r\n  Next paragraph  \r\n\r\n\r\nLast."),
    ["First line\r\nSecond line", "Next paragraph", "Last."]
  );
  assert.deepEqual(serviceDescriptionParagraphs("  Single paragraph.  "), ["Single paragraph."]);
});
