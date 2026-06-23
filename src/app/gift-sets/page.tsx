import type { Metadata } from "next";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { allGiftSetsQuery } from "@/sanity/lib/queries";
import { GiftSetCatalog } from "@/components/catalogs/GiftSetCatalog";
import type { GiftSet } from "@/lib/filters";

export const revalidate = 60;
export const metadata: Metadata = { title: "Gift Sets", description: "Curated fragrance gift sets for men and women from top brands." };

const mono = "font-mono text-[8.5px] font-light tracking-[0.42em] uppercase text-white/20";
const border = { borderTop: "1px solid rgba(255,255,255,0.06)" } as const;

export default async function GiftSetsPage() {
  const items: GiftSet[] = await client.fetch(allGiftSetsQuery, {}, { next: { revalidate } });
  return (
    <div className="max-w-[1320px] mx-auto px-6 py-16 lg:px-[72px] lg:py-20">
      <div className="pb-10 mb-16" style={border}>
        <p className={mono}>The Collection</p>
        <h1 className="font-display font-light text-white mt-4" style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", lineHeight: 1 }}>Gift Sets</h1>
        <p className="text-[15px] font-light leading-[1.85] text-white/36 max-w-[480px] mt-4">
          Fragrance and body care, paired and ready to give. Birthdays, holidays, or any reason to make an impression.
        </p>
      </div>
      <Suspense fallback={null}><GiftSetCatalog items={items} /></Suspense>
    </div>
  );
}
