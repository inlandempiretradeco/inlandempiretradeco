import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { client } from "@/sanity/lib/client";
import { fragranceBySlugQuery, allFragranceQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { formatPrice, type Fragrance } from "@/lib/filters";
import { ContactBar } from "@/components/ContactBar";
import { Reveal } from "@/components/ui/Reveal";

export const revalidate = 60;
const S = { monoLabel: { fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" } as React.CSSProperties, border: "1px solid rgba(255,255,255,0.06)" };

export async function generateStaticParams() {
  const items: Fragrance[] = await client.fetch(allFragranceQuery);
  return items.map(f => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const f: Fragrance | null = await client.fetch(fragranceBySlugQuery, { slug: params.slug });
  if (!f) return {};
  return { title: `${f.brand} ${f.name}`, description: f.description?.slice(0, 155) || `${f.brand} ${f.name} — available by inquiry at Inland Empire Trading Co.` };
}

export default async function FragranceDetailPage({ params }: { params: { slug: string } }) {
  const f: Fragrance | null = await client.fetch(fragranceBySlugQuery, { slug: params.slug });
  if (!f) notFound();

  const concLabel: Record<string, string> = { edt: "EDT", edp: "EDP", parfum: "Parfum / Extrait", edc: "Eau de Cologne" };

  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 72px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <Reveal>
          <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#0D0D0D", border: S.border }}>
            {f.photos?.[0] && (
              <Image src={urlForImage(f.photos[0] as any).width(900).height(900).url()} alt={`${f.brand} ${f.name}`} fill priority style={{ objectFit: "cover" }} />
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={S.monoLabel}>{f.category === "perfume" ? "Perfume" : "Cologne"}</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.5rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.05, color: "#fff", marginTop: 16 }}>
            {f.brand} {f.name}
          </h1>
          <p style={{ fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 22, color: "#C8A84B", marginTop: 24 }}>{formatPrice(f.price)}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, borderTop: S.border, borderBottom: S.border, padding: "28px 0", margin: "32px 0" }}>
            {[
              f.size          && { label: "Size",          value: f.size },
              f.concentration && { label: "Concentration", value: concLabel[f.concentration] || f.concentration.toUpperCase() },
              f.category      && { label: "Category",      value: f.category.charAt(0).toUpperCase() + f.category.slice(1) },
            ].filter(Boolean).map((item: any) => (
              <div key={item.label}>
                <p style={S.monoLabel}>{item.label}</p>
                <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.65)", marginTop: 6 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {f.description && <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.95, color: "rgba(255,255,255,0.42)", marginBottom: 32 }}>{f.description}</p>}

          <p style={{ ...S.monoLabel, marginBottom: 16 }}>Inquire About This Piece</p>
          <ContactBar itemLabel={`${f.brand} ${f.name}`} />
        </Reveal>
      </div>
    </div>
  );
}
