import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { client } from "@/sanity/lib/client";
import { giftSetBySlugQuery, allGiftSetsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { formatPrice, type GiftSet } from "@/lib/filters";
import { ContactBar } from "@/components/ContactBar";
import { Reveal } from "@/components/ui/Reveal";

export const revalidate = 60;
const S = { monoLabel: { fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" } as React.CSSProperties, border: "1px solid rgba(255,255,255,0.06)" };
const genderLabel: Record<string, string> = { mens: "Men's", womens: "Women's", unisex: "Unisex" };

export async function generateStaticParams() {
  const items: GiftSet[] = await client.fetch(allGiftSetsQuery);
  return items.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const g: GiftSet | null = await client.fetch(giftSetBySlugQuery, { slug: params.slug });
  if (!g) return {};
  return { title: `${g.brand} ${g.name}`, description: g.description?.slice(0, 155) || `${g.brand} ${g.name} gift set — available by inquiry at Inland Empire Trading Co.` };
}

export default async function GiftSetDetailPage({ params }: { params: { slug: string } }) {
  const g: GiftSet | null = await client.fetch(giftSetBySlugQuery, { slug: params.slug });
  if (!g) notFound();

  return (
    <div style={{ className="max-w-[1320px] mx-auto px-6 py-14 lg:px-[72px] lg:py-20" }}>
      <div style={{ className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start" }}>
        <Reveal>
          <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#0D0D0D", border: S.border }}>
            {g.photos?.[0] && (
              <Image src={urlForImage(g.photos[0] as any).width(900).height(900).url()} alt={`${g.brand} ${g.name}`} fill priority style={{ objectFit: "cover" }} />
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={S.monoLabel}>{genderLabel[g.gender] || "Gift"} Set</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.5rem,4vw,4rem)", fontWeight: 300, lineHeight: 1.05, color: "#fff", marginTop: 16 }}>
            {g.brand} {g.name}
          </h1>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 24 }}>
            <p style={{ fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 22, color: "#C8A84B" }}>{formatPrice(g.price)}</p>
            {g.originalPrice && g.price && (
              <p style={{ fontFamily: "monospace", fontSize: 14, color: "rgba(255,255,255,0.22)", textDecoration: "line-through" }}>{formatPrice(g.originalPrice)}</p>
            )}
          </div>

          {g.includes && (
            <div style={{ borderTop: S.border, borderBottom: S.border, padding: "24px 0", margin: "28px 0" }}>
              <p style={S.monoLabel}>Includes</p>
              <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.65)", marginTop: 10 }}>{g.includes}</p>
            </div>
          )}

          {g.description && <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.95, color: "rgba(255,255,255,0.42)", marginBottom: 32 }}>{g.description}</p>}

          <p style={{ ...S.monoLabel, marginBottom: 16 }}>Inquire About This Set</p>
          <ContactBar itemLabel={`${g.brand} ${g.name}`} />
        </Reveal>
      </div>
    </div>
  );
}
