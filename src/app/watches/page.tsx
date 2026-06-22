import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allWatchesQuery } from "@/sanity/lib/queries";
import { WatchesCatalog } from "@/components/catalogs/WatchesCatalog";
import { Reveal } from "@/components/ui/Reveal";
import { watchBrands } from "@/lib/brands";
import type { Watch } from "@/lib/filters";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Watches",
  description: "New and consignment timepieces available by inquiry. Browse by brand, condition, and movement. Ships anywhere in the US.",
};

const S = {
  mono: { fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" },
  border: "1px solid rgba(255,255,255,0.06)",
};

export default async function WatchesPage() {
  const watches: Watch[] = await client.fetch(allWatchesQuery, {}, { next: { revalidate } });

  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 72px" }}>
      {/* Page header */}
      <div style={{ marginBottom: 64, paddingBottom: 48, borderBottom: S.border }}>
        <p style={S.mono}>The Collection</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1, color: "#fff", marginTop: 16 }}>
          Watches
        </h1>
        <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.36)", maxWidth: 480, marginTop: 16 }}>
          New from authorized brands and consignment from private sellers. Every piece inspected before listing. Ships anywhere in the US, fully insured.
        </p>
      </div>

      {/* Catalog */}
      <Suspense fallback={null}>
        <WatchesCatalog watches={watches} />
      </Suspense>

      {/* Browse by brand */}
      <div style={{ borderTop: S.border, marginTop: 100, paddingTop: 64 }}>
        <Reveal>
          <p style={S.mono}>Browse by Brand</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 28 }}>
            {watchBrands.map(brand => (
              <Link
                key={brand.slug}
                href={`/watches/brands/${brand.slug}`}
                style={{ padding: "14px 22px", border: S.border, background: "#0A0A0A", fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", transition: "all 0.2s", display: "block" }}
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
