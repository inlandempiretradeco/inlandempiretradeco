import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allWatchesQuery, allFragranceQuery } from "@/sanity/lib/queries";
import type { Watch, Fragrance } from "@/lib/filters";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.inlandempiretradingco.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/watches`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/fragrance`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  let watches: Watch[] = [];
  let fragrance: Fragrance[] = [];

  try {
    [watches, fragrance] = await Promise.all([
      client.fetch(allWatchesQuery),
      client.fetch(allFragranceQuery),
    ]);
  } catch {
    // Sanity not configured yet during initial setup - fall back to static routes only.
  }

  const watchRoutes: MetadataRoute.Sitemap = watches.map((w) => ({
    url: `${siteUrl}/watches/${w.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const fragranceRoutes: MetadataRoute.Sitemap = fragrance.map((f) => ({
    url: `${siteUrl}/fragrance/${f.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...watchRoutes, ...fragranceRoutes];
}
