import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wright Coast Aviation",
    short_name: "Wright Coast",
    description:
      "Outer Banks intro flights and flight training in the Birthplace of Flight.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7fbff",
    theme_color: "#073763",
    icons: [
      {
        src: "/brand/wright-coast-aviation-logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
