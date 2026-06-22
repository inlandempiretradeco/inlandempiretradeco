import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allFragranceQuery } from "@/sanity/lib/queries";
import { FragranceCatalog } from "@/components/catalogs/FragranceCatalog";
import { Reveal } from "@/components/ui/Reveal";
import { fragranceBrands } from "@/lib/brands";
import type { Fragrance } from "@/lib/filters";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Fragrance",
  description: "Cologne and perfume from Creed, Tom Ford, Dior, Versace, Byredo, and more. Ships anywhere in the US.",
};

const S = {
  mono: { fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" },
  border: "1px solid rgba(255,255,255,0.06)",
};

export default async function FragrancePage() {
  const items: Fragrance[] = await client.fetch(allFragranceQuery, {}, { next: { revalidate } });

  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 72px" }}>
      <div style={{ marginBottom: 64, paddingBottom: 48, borderBottom: S.border }}>
        <p style={S.mono}>The Collection</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1, color: "#fff", marginTop: 16 }}>
          Fragrance
        </h1>
        <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.36)", maxWidth: 480, marginTop: 16 }}>
          Cologne and perfume from Creed, Tom Ford, Dior, Versace, Byredo, Cartier, and more. EDT, EDP, and Parfum. Ships anywhere in the US.
        </p>
      </div>

      <Suspense fallback={null}>
        <FragranceCatalog items={items} />
      </Suspense>

      {/* Browse by brand */}
      <div style={{ borderTop: S.border, marginTop: 100, paddingTop: 64 }}>
        <Reveal>
          <p style={S.mono}>Browse by Brand</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 28 }}>
            {fragranceBrands.map(brand => (
              <Link
                key={brand.slug}
                href={`/fragrance/brands/${brand.slug}`}
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
