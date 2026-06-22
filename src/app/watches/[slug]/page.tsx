import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { client } from "@/sanity/lib/client";
import { watchBySlugQuery, allWatchesQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { formatPrice, type Watch } from "@/lib/filters";
import { ContactBar } from "@/components/ContactBar";
import { Reveal } from "@/components/ui/Reveal";

export const revalidate = 60;

const S = {
  monoLabel: { fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" } as React.CSSProperties,
  border: "1px solid rgba(255,255,255,0.06)",
};

export async function generateStaticParams() {
  const watches: Watch[] = await client.fetch(allWatchesQuery);
  return watches.map(w => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const w: Watch | null = await client.fetch(watchBySlugQuery, { slug: params.slug });
  if (!w) return {};
  return { title: `${w.brand} ${w.model}`, description: w.description?.slice(0, 155) || `${w.brand} ${w.model} — available by inquiry at Inland Empire Trading Co.` };
}

export default async function WatchDetailPage({ params }: { params: { slug: string } }) {
  const w: Watch | null = await client.fetch(watchBySlugQuery, { slug: params.slug });
  if (!w) notFound();

  const schema = { "@context": "https://schema.org", "@type": "Product", name: `${w.brand} ${w.model}`, brand: { "@type": "Brand", name: w.brand }, ...(w.price ? { offers: { "@type": "Offer", priceCurrency: "USD", price: w.price, availability: "https://schema.org/InStock" } } : {}) };

  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 72px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <Reveal>
          <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#0D0D0D", border: S.border }}>
            {w.photos?.[0] && (
              <Image src={urlForImage(w.photos[0] as any).width(900).height(900).url()} alt={`${w.brand} ${w.model}`} fill priority style={{ objectFit: "cover" }} />
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={S.monoLabel}>{w.condition === "consignment" ? "Consignment" : "New Arrival"}</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.5rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.05, color: "#fff", marginTop: 16 }}>
            {w.brand} {w.model}
          </h1>
          {w.referenceNumber && <p style={{ ...S.monoLabel, marginTop: 10, fontSize: 8 }}>Ref. {w.referenceNumber}</p>}
          <p style={{ fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 22, color: "#C8A84B", marginTop: 24 }}>{formatPrice(w.price)}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, borderTop: S.border, borderBottom: S.border, padding: "28px 0", margin: "32px 0" }}>
            {[
              w.caseMaterial && { label: "Case",     value: w.caseMaterial },
              w.caseSize     && { label: "Size",     value: w.caseSize },
              w.movement     && { label: "Movement", value: w.movement.charAt(0).toUpperCase() + w.movement.slice(1) },
              w.condition    && { label: "Condition", value: w.condition === "consignment" ? "Consignment" : "New" },
            ].filter(Boolean).map((item: any) => (
              <div key={item.label}>
                <p style={S.monoLabel}>{item.label}</p>
                <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.65)", marginTop: 6 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {w.description && <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.95, color: "rgba(255,255,255,0.42)", marginBottom: 32 }}>{w.description}</p>}

          <p style={{ ...S.monoLabel, marginBottom: 16 }}>Inquire About This Piece</p>
          <ContactBar itemLabel={`${w.brand} ${w.model}`} />
        </Reveal>
      </div>
    </div>
  );
}
