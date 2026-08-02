import type { MetadataRoute } from "next";
import { builtRoutes, site } from "@/content/site";

/**
 * Driven by `builtRoutes`, so a page enters the sitemap at the moment it stops
 * being a stub. Every other route is still `noindex` and stays out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return builtRoutes.map((route) => ({
    url: route === "/" ? site.url : `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
