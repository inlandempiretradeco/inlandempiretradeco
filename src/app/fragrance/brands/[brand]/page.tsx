import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { fragranceByBrandQuery } from "@/sanity/lib/queries";
import { withLotNumbers, type Fragrance } from "@/lib/filters";
import { fragranceBrands, allFragranceBrandSlugs, getBrand } from "@/lib/brands";
import { ProductCard } from "@/components/ProductCard";
import { ContactBar } from "@/components/ContactBar";
import { Reveal } from "@/components/ui/Reveal";

export const revalidate = 60;

export function generateStaticParams() {
  return allFragranceBrandSlugs;
}

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const brand = getBrand(params.brand, "fragrance");
  if (!brand) return {};
  return {
    title: `${brand.name} Fragrance`,
    description: `${brand.name} cologne and perfume available by inquiry at Inland Empire Trading Co. in Medical Lake, WA. Ships anywhere in the US.`,
  };
}

const S = {
  mono: { fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" },
  border: "1px solid rgba(255,255,255,0.06)",
};

export default async function FragranceBrandPage({ params }: { params: { brand: string } }) {
  const brand = getBrand(params.brand, "fragrance");
  if (!brand) notFound();

  let items: Fragrance[] = [];
  try {
    items = await client.fetch(fragranceByBrandQuery, { brand: brand.name }, { next: { revalidate } });
  } catch {}

  const lotted = withLotNumbers(items);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${brand.name} Fragrance — Inland Empire Trading Co.`,
    description: brand.blurb,
    url: `https://www.inlandempiretradingco.com/fragrance/brands/${brand.slug}`,
  };

  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 72px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 64 }}>
        <Link href="/fragrance" style={{ ...S.mono, fontSize: 8 }}>Fragrance</Link>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>→</span>
        <span style={{ ...S.mono, fontSize: 8, color: "rgba(255,255,255,0.4)" }}>{brand.name}</span>
      </div>

      {/* Brand header */}
      <Reveal>
        <p style={S.mono}>The Collection</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(3.5rem,7vw,7rem)", fontWeight: 300, lineHeight: 0.95, color: "#fff", marginTop: 16, letterSpacing: "-0.02em" }}>
          {brand.name}
        </h1>
        <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.12)", margin: "32px 0 28px" }} />
        <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 2, color: "rgba(255,255,255,0.42)", maxWidth: 680 }}>
          {brand.blurb}
        </p>
      </Reveal>

      {/* Inventory grid */}
      <div style={{ borderTop: S.border, marginTop: 80, paddingTop: 64 }}>
        {lotted.length > 0 ? (
          <>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                <p style={S.mono}>Available Now</p>
                <p style={{ ...S.mono, fontSize: 8 }}>{lotted.length} {lotted.length === 1 ? "piece" : "pieces"}</p>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {lotted.map((f, i) => (
                <Reveal key={f._id} delay={i * 0.06}>
                  <ProductCard
                    href={`/fragrance/${f.slug}`}
                    lotNumber={f.lotNumber}
                    brand={f.brand}
                    title={f.name}
                    meta={[f.size, f.concentration?.toUpperCase()].filter(Boolean).join(" · ")}
                    price={f.price}
                    status={f.status}
                    photo={f.photos?.[0]}
                  />
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal>
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 28, fontWeight: 300, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
                No {brand.name} in stock right now.
              </p>
              <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.28)", maxWidth: 420, margin: "0 auto 40px" }}>
                Inventory moves quickly. Reach out and Ramon can let you know what's coming in, or source a specific fragrance for you.
              </p>
              <ContactBar itemLabel={`${brand.name} fragrance`} />
            </div>
          </Reveal>
        )}
      </div>

      {/* Browse other brands */}
      <div style={{ borderTop: S.border, marginTop: 100, paddingTop: 64 }}>
        <Reveal>
          <p style={S.mono}>Other Brands</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 24 }}>
            {fragranceBrands.filter(b => b.slug !== brand.slug).map(b => (
              <Link
                key={b.slug}
                href={`/fragrance/brands/${b.slug}`}
                style={{ padding: "12px 20px", border: S.border, fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", transition: "all 0.2s" }}
              >
                {b.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
