import type { Metadata } from "next";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { allFragranceQuery } from "@/sanity/lib/queries";
import { FragranceCatalog } from "@/components/catalogs/FragranceCatalog";
import type { Fragrance } from "@/lib/filters";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Fragrance",
  description: "Cologne and perfume from heritage and niche houses. Browse by brand, category, and concentration.",
};

const S = { monoLabel: { fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" }, border: "1px solid rgba(255,255,255,0.06)" };

export default async function FragrancePage() {
  const items: Fragrance[] = await client.fetch(allFragranceQuery, {}, { next: { revalidate } });
  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 72px" }}>
      <div style={{ marginBottom: 64, paddingBottom: 48, borderBottom: S.border }}>
        <p style={S.monoLabel}>The Collection</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1, color: "#fff", marginTop: 16 }}>Fragrance</h1>
        <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.36)", maxWidth: 480, marginTop: 16 }}>
          Cologne and perfume from Creed, Tom Ford, Dior, Versace, Byredo, and more. EDT, EDP, and Parfum concentrations. Ships anywhere in the US.
        </p>
      </div>
      <Suspense fallback={null}>
        <FragranceCatalog items={items} />
      </Suspense>
    </div>
  );
}
