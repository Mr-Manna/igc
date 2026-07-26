import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Only the homepage is listed. Every other route is currently a stub marked
 * `noindex`; add each one here as it is built out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
