"use client";

/**
 * This route renders the Sanity Studio at /studio.
 * It is intentionally NOT linked anywhere in the site nav or footer ("the back room").
 * This is where Ramon logs in, uploads photos, types in details, and hits Publish.
 * No code, no GitHub, no deploys required to add inventory.
 *
 * Dynamically imported (no SSR) since the Studio is a large client-only app -
 * keeps it out of the main site bundle entirely, so it never affects the
 * public pages' page-speed scores.
 */

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
