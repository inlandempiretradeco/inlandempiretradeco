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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f: Fragrance | null = await client.fetch(fragranceBySlugQuery, { slug });
  if (!f) return {};
  return { title: `${f.brand} ${f.name}`, description: f.description?.slice(0, 155) || `${f.brand} ${f.name} — available by inquiry at Inland Empire Trading Co.` };
}

export default async function FragranceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f: Fragrance | null = await client.fetch(fragranceBySlugQuery, { slug });
  if (!f) notFound();
  const concLabel: Record<string, string> = { edt: "EDT", edp: "EDP", parfum: "Parfum / Extrait", edc: "Eau de Cologne" };
  return (
    <div className="max-w-[1320px] mx-auto px-6 py-14 lg:px-[72px] lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <Reveal>
          <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#0D0D0D", border: S.border }}>
            {f!.photos?.[0] && (
              <Image src={urlForImage(f!.photos[0] as any).width(900).height(900).url()} alt={`${f!.brand} ${f!.name}`} fill priority style={{ objectFit: "cover" }} />
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={S.monoLabel}>{f!.category === "perfume" ? "Perfume" : "Cologne"}</p>
          <h1 className="font-display font-light text-white mt-4" style={{ fontSize: "clamp(2.5rem,4vw,4rem)", lineHeight: 1.05 }}>{f!.brand} {f!.name}</h1>
          <p className="font-mono text-[22px] text-[#C8A84B] mt-6">{formatPrice(f!.price)}</p>
          <div className="grid grid-cols-2 gap-5 my-8 py-7" style={{ borderTop: S.border, borderBottom: S.border }}>
            {[
              f!.size          && { label: "Size",          value: f!.size },
              f!.concentration && { label: "Concentration", value: concLabel[f!.concentration] || f!.concentration.toUpperCase() },
              f!.category      && { label: "Category",      value: f!.category.charAt(0).toUpperCase() + f!.category.slice(1) },
            ].filter(Boolean).map((item: any) => (
              <div key={item.label}>
                <p style={S.monoLabel}>{item.label}</p>
                <p className="text-[14px] font-light text-white/65 mt-1.5">{item.value}</p>
              </div>
            ))}
          </div>
          {f!.description && <p className="text-[15px] font-light leading-[1.95] text-white/42 mb-8">{f!.description}</p>}
          <p style={{ ...S.monoLabel, marginBottom: 16 }}>Inquire About This Piece</p>
          <ContactBar itemLabel={`${f!.brand} ${f!.name}`} />
        </Reveal>
      </div>
    </div>
  );
}
