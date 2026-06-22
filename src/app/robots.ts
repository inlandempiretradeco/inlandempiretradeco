import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.inlandempiretradingco.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio"], // keep the admin out of search results
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
