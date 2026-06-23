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
export const metadata: Metadata = { title: "Fragrance", description: "Cologne and perfume from Creed, Tom Ford, Dior, Versace, Byredo, and more. Ships anywhere in the US." };

const mono = "font-mono text-[8.5px] font-light tracking-[0.42em] uppercase text-white/20";
const border = { borderTop: "1px solid rgba(255,255,255,0.06)" } as const;

export default async function FragrancePage() {
  const items: Fragrance[] = await client.fetch(allFragranceQuery, {}, { next: { revalidate } });
  return (
    <div className="max-w-[1320px] mx-auto px-6 py-16 lg:px-[72px] lg:py-20">
      <div className="pb-10 mb-16" style={border}>
        <p className={mono}>The Collection</p>
        <h1 className="font-display font-light text-white mt-4" style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", lineHeight: 1 }}>Fragrance</h1>
        <p className="text-[15px] font-light leading-[1.85] text-white/36 max-w-[480px] mt-4">
          Cologne and perfume from Creed, Tom Ford, Dior, Versace, Byredo, Cartier, and more. Ships anywhere in the US.
        </p>
      </div>
      <Suspense fallback={null}><FragranceCatalog items={items} /></Suspense>
      <div className="mt-20 pt-14" style={border}>
        <Reveal>
          <p className={mono}>Browse by Brand</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {fragranceBrands.map(brand => (
              <Link key={brand.slug} href={`/fragrance/brands/${brand.slug}`}
                className="px-4 py-3 font-mono text-[9px] tracking-[0.28em] uppercase text-white/38 transition-colors hover:text-white/75"
                style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#0A0A0A" }}>
                {brand.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
