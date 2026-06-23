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
export function generateStaticParams() { return allFragranceBrandSlugs; }

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getBrand(brandSlug, "fragrance");
  if (!brand) return {};
  return {
    title: `${brand.name} Fragrance`,
    description: `${brand.name} cologne and perfume at Inland Empire Trading Co., Medical Lake, WA. Ships anywhere in the US.`,
  };
}

const bdr  = { borderTop: "1px solid rgba(255,255,255,0.06)" } as const;
const mono = "font-mono text-[8.5px] font-light tracking-[0.42em] uppercase text-white/35";

export default async function FragranceBrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: brandSlug } = await params;
  const brand = getBrand(brandSlug, "fragrance");
  if (!brand) notFound();

  let items: Fragrance[] = [];
  try { items = await client.fetch(fragranceByBrandQuery, { brand: brand!.name }, { next: { revalidate } }); } catch {}
  const lotted = withLotNumbers(items);

  return (
    <div className="max-w-[1320px] mx-auto px-6 py-14 lg:px-[72px] lg:py-20">
      <div className="flex items-center gap-3 mb-12">
        <Link href="/brands" className={`${mono} text-[8px] hover:text-white/60 transition-colors`}>Brands</Link>
        <span className="text-white/15 text-[10px]">→</span>
        <Link href="/fragrance" className={`${mono} text-[8px] hover:text-white/60 transition-colors`}>Fragrance</Link>
        <span className="text-white/15 text-[10px]">→</span>
        <span className={`${mono} text-[8px] text-white/50`}>{brand!.name}</span>
      </div>
      <Reveal>
        <p className={mono}>{brand!.specialty}</p>
        <h1 className="font-display font-light text-white mt-3" style={{ fontSize: "clamp(3.5rem,8vw,8rem)", lineHeight: 0.92, letterSpacing: "-0.02em" }}>{brand!.name}</h1>
        <div className="w-10 h-px bg-white/15 mt-6 mb-6" />
        <p className="text-[16px] font-light leading-[2] text-white/52 max-w-[680px]">{brand!.blurb}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-px mt-12 bg-white/5">
          {[
            { label: "Founded", value: brand!.founded.toString() },
            { label: "Country", value: brand!.country },
            { label: "Known For", value: brand!.specialty },
          ].map(stat => (
            <div key={stat.label} className="bg-[#080808] px-5 py-6">
              <p className={mono}>{stat.label}</p>
              <p className="font-display text-[17px] font-light text-white mt-2 leading-snug">{stat.value}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-16 pt-12" style={bdr}>
        <Reveal>
          <p className={mono}>The Founder</p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-white mt-3 leading-[1.1]">{brand!.founderName}</h2>
          <div className="w-8 h-px bg-white/15 mt-5" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[15px] font-light leading-[2] text-white/52">{brand!.founderStory}</p>
        </Reveal>
      </div>
      <div className="mt-14 pt-12" style={bdr}>
        <Reveal>
          <p className={mono}>Notable Fragrances</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {brand!.notableModels.map(model => (
              <span key={model} className="px-4 py-2.5 font-mono text-[9px] tracking-[0.28em] uppercase text-white/45 font-light" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>{model}</span>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="mt-14 pt-12" style={bdr}>
        {lotted.length > 0 ? (
          <>
            <Reveal>
              <div className="flex items-baseline justify-between mb-10">
                <p className={mono}>Available Now</p>
                <p className={`${mono} text-[8px]`}>{lotted.length} {lotted.length === 1 ? "piece" : "pieces"}</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lotted.map((f, i) => (
                <Reveal key={f._id} delay={i * 0.06}>
                  <ProductCard href={`/fragrance/${f.slug}`} lotNumber={f.lotNumber} brand={f.brand} title={f.name}
                    meta={[f.size, f.concentration?.toUpperCase()].filter(Boolean).join(" · ")}
                    price={f.price} status={f.status} photo={f.photos?.[0]} />
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal>
            <div className="py-16 text-center">
              <p className="font-display text-[26px] font-light text-white/45 mb-4">No {brand!.name} in stock right now.</p>
              <p className="text-[14px] font-light text-white/32 max-w-[400px] mx-auto mb-10">Reach out and we can source a specific fragrance for you.</p>
              <ContactBar itemLabel={`${brand!.name} fragrance`} />
            </div>
          </Reveal>
        )}
      </div>
      <div className="mt-16 pt-12" style={bdr}>
        <Reveal>
          <p className={mono}>Other Fragrance Brands</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {fragranceBrands.filter(b => b.slug !== brand!.slug).map(b => (
              <Link key={b.slug} href={`/brands/fragrance/${b.slug}`} className="px-4 py-3 font-mono text-[9px] tracking-[0.28em] uppercase text-white/35 transition-colors hover:text-white/70 font-light" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>{b.name}</Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
