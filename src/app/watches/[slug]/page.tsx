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
const S = { monoLabel: { fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" } as React.CSSProperties, border: "1px solid rgba(255,255,255,0.06)" };

export async function generateStaticParams() {
  const watches: Watch[] = await client.fetch(allWatchesQuery);
  return watches.map(w => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w: Watch | null = await client.fetch(watchBySlugQuery, { slug });
  if (!w) return {};
  return { title: `${w.brand} ${w.model}`, description: w.description?.slice(0, 155) || `${w.brand} ${w.model} — available by inquiry at Inland Empire Trading Co.` };
}

export default async function WatchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w: Watch | null = await client.fetch(watchBySlugQuery, { slug });
  if (!w) notFound();
  return (
    <div className="max-w-[1320px] mx-auto px-6 py-14 lg:px-[72px] lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <Reveal>
          <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#0D0D0D", border: S.border }}>
            {w!.photos?.[0] && (
              <Image src={urlForImage(w!.photos[0] as any).width(900).height(900).url()} alt={`${w!.brand} ${w!.model}`} fill priority style={{ objectFit: "cover" }} />
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={S.monoLabel}>{w!.condition === "consignment" ? "Consignment" : "New Arrival"}</p>
          <h1 className="font-display font-light text-white mt-4" style={{ fontSize: "clamp(2.5rem,4vw,4rem)", lineHeight: 1.05 }}>{w!.brand} {w!.model}</h1>
          {w!.referenceNumber && <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 mt-2">Ref. {w!.referenceNumber}</p>}
          <p className="font-mono text-[22px] text-[#C8A84B] mt-6">{formatPrice(w!.price)}</p>
          <div className="grid grid-cols-2 gap-5 my-8 py-7" style={{ borderTop: S.border, borderBottom: S.border }}>
            {[
              w!.caseMaterial && { label: "Case",      value: w!.caseMaterial },
              w!.caseSize     && { label: "Size",      value: w!.caseSize },
              w!.movement     && { label: "Movement",  value: w!.movement.charAt(0).toUpperCase() + w!.movement.slice(1) },
              w!.condition    && { label: "Condition", value: w!.condition === "consignment" ? "Consignment" : "New" },
            ].filter(Boolean).map((item: any) => (
              <div key={item.label}>
                <p style={S.monoLabel}>{item.label}</p>
                <p className="text-[14px] font-light text-white/65 mt-1.5">{item.value}</p>
              </div>
            ))}
          </div>
          {w!.description && <p className="text-[15px] font-light leading-[1.95] text-white/42 mb-8">{w!.description}</p>}
          <p style={{ ...S.monoLabel, marginBottom: 16 }}>Inquire About This Piece</p>
          <ContactBar itemLabel={`${w!.brand} ${w!.model}`} />
        </Reveal>
      </div>
    </div>
  );
}
