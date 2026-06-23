import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allWatchesQuery, allFragranceQuery, allGiftSetsQuery } from "@/sanity/lib/queries";
import { watchBrands, fragranceBrands } from "@/lib/brands";
import type { Watch, Fragrance, GiftSet } from "@/lib/filters";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.inlandempiretradingco.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`,          changeFrequency: "weekly",  priority: 1   },
    { url: `${siteUrl}/watches`,   changeFrequency: "daily",   priority: 0.9 },
    { url: `${siteUrl}/fragrance`, changeFrequency: "daily",   priority: 0.9 },
    { url: `${siteUrl}/gift-sets`, changeFrequency: "daily",   priority: 0.8 },
    { url: `${siteUrl}/brands`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteUrl}/about`,     changeFrequency: "monthly", priority: 0.5 },
  ];

  // Brand pages — always included even if no inventory yet
  const watchBrandRoutes: MetadataRoute.Sitemap = watchBrands.map(b => ({
    url: `${siteUrl}/brands/watches/${b.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const fragranceBrandRoutes: MetadataRoute.Sitemap = fragranceBrands.map(b => ({
    url: `${siteUrl}/brands/fragrance/${b.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  let watches: Watch[] = [];
  let fragrance: Fragrance[] = [];
  let giftSets: GiftSet[] = [];

  try {
    [watches, fragrance, giftSets] = await Promise.all([
      client.fetch(allWatchesQuery),
      client.fetch(allFragranceQuery),
      client.fetch(allGiftSetsQuery),
    ]);
  } catch {}

  const watchRoutes: MetadataRoute.Sitemap = watches.map(w => ({
    url: `${siteUrl}/watches/${w.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const fragranceRoutes: MetadataRoute.Sitemap = fragrance.map(f => ({
    url: `${siteUrl}/fragrance/${f.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const giftSetRoutes: MetadataRoute.Sitemap = giftSets.map(g => ({
    url: `${siteUrl}/gift-sets/${g.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...watchBrandRoutes,
    ...fragranceBrandRoutes,
    ...watchRoutes,
    ...fragranceRoutes,
    ...giftSetRoutes,
  ];
}
