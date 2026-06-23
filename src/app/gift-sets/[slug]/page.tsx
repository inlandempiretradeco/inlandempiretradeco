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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g: GiftSet | null = await client.fetch(giftSetBySlugQuery, { slug });
  if (!g) return {};
  return { title: `${g.brand} ${g.name}`, description: g.description?.slice(0, 155) || `${g.brand} ${g.name} gift set — available by inquiry at Inland Empire Trading Co.` };
}

export default async function GiftSetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g: GiftSet | null = await client.fetch(giftSetBySlugQuery, { slug });
  if (!g) notFound();
  return (
    <div className="max-w-[1320px] mx-auto px-6 py-14 lg:px-[72px] lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <Reveal>
          <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#0D0D0D", border: S.border }}>
            {g!.photos?.[0] && (
              <Image src={urlForImage(g!.photos[0] as any).width(900).height(900).url()} alt={`${g!.brand} ${g!.name}`} fill priority style={{ objectFit: "cover" }} />
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={S.monoLabel}>{genderLabel[g!.gender] || "Gift"} Set</p>
          <h1 className="font-display font-light text-white mt-4" style={{ fontSize: "clamp(2.5rem,4vw,4rem)", lineHeight: 1.05 }}>{g!.brand} {g!.name}</h1>
          <div className="flex items-baseline gap-4 mt-6">
            <p className="font-mono text-[22px] text-[#C8A84B]">{formatPrice(g!.price)}</p>
            {g!.originalPrice && g!.price && (
              <p className="font-mono text-[14px] text-white/22 line-through">{formatPrice(g!.originalPrice)}</p>
            )}
          </div>
          {g!.includes && (
            <div className="my-7 py-6" style={{ borderTop: S.border, borderBottom: S.border }}>
              <p style={S.monoLabel}>Includes</p>
              <p className="text-[14px] font-light text-white/65 mt-2">{g!.includes}</p>
            </div>
          )}
          {g!.description && <p className="text-[15px] font-light leading-[1.95] text-white/42 mb-8">{g!.description}</p>}
          <p style={{ ...S.monoLabel, marginBottom: 16 }}>Inquire About This Set</p>
          <ContactBar itemLabel={`${g!.brand} ${g!.name}`} />
        </Reveal>
      </div>
    </div>
  );
}
