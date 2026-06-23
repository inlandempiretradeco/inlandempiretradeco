import type { Metadata } from "next";
import Link from "next/link";
import { watchBrands, fragranceBrands } from "@/lib/brands";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Brands",
  description: "Watch and fragrance brands carried by Inland Empire Trading Co. — Rolex, Omega, TAG Heuer, Creed, Tom Ford, Dior, and more.",
};

const bdr  = { borderTop: "1px solid rgba(255,255,255,0.06)" } as const;
const mono = "font-mono text-[8.5px] font-light tracking-[0.42em] uppercase text-white/35";

export default function BrandsPage() {
  return (
    <div className="max-w-[1320px] mx-auto px-6 py-14 lg:px-[72px] lg:py-20">

      <Reveal>
        <p className={mono}>What We Carry</p>
        <h1 className="font-display font-light text-white mt-4"
          style={{ fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: 1 }}>
          Brands
        </h1>
        <p className="text-[15px] font-light leading-[1.85] text-white/50 max-w-[520px] mt-4">
          We carry new and pre-owned pieces from the following brands.
          Click any to read about the brand and see what's currently available.
        </p>
      </Reveal>

      {/* Watches */}
      <section className="mt-14 pt-12" style={bdr}>
        <Reveal>
          <div className="flex items-center gap-6 mb-10">
            <p className={mono}>Watches</p>
            <div className="flex-1 h-px bg-white/6" />
            <Link href="/watches" className={`${mono} text-[8px] hover:text-white/60 transition-colors`}>
              Browse Inventory →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {watchBrands.map((brand, i) => (
            <Reveal key={brand.slug} delay={(i % 3) * 0.07}>
              <Link href={`/brands/watches/${brand.slug}`}
                className="group block bg-[#080808] p-8 transition-colors hover:bg-[#0D0D0D]">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-display text-[28px] font-light text-white leading-none
                                 group-hover:text-[#C8A84B] transition-colors duration-300">
                    {brand.name}
                  </h2>
                  <span className={`${mono} text-[8px] group-hover:text-[#C8A84B]/60 transition-colors mt-1`}>
                    Est. {brand.founded}
                  </span>
                </div>
                <p className="text-[12px] font-light text-white/35 mb-3">{brand.country} · {brand.specialty}</p>
                <p className="text-[13px] font-light leading-[1.8] text-white/40 line-clamp-3">{brand.blurb}</p>
                <p className={`${mono} text-[8px] mt-5 group-hover:text-[#C8A84B] transition-colors`}>
                  Learn More →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fragrance */}
      <section className="mt-14 pt-12" style={bdr}>
        <Reveal>
          <div className="flex items-center gap-6 mb-10">
            <p className={mono}>Fragrance</p>
            <div className="flex-1 h-px bg-white/6" />
            <Link href="/fragrance" className={`${mono} text-[8px] hover:text-white/60 transition-colors`}>
              Browse Inventory →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {fragranceBrands.map((brand, i) => (
            <Reveal key={brand.slug} delay={(i % 3) * 0.07}>
              <Link href={`/brands/fragrance/${brand.slug}`}
                className="group block bg-[#080808] p-8 transition-colors hover:bg-[#0D0D0D]">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-display text-[28px] font-light text-white leading-none
                                 group-hover:text-[#C8A84B] transition-colors duration-300">
                    {brand.name}
                  </h2>
                  <span className={`${mono} text-[8px] group-hover:text-[#C8A84B]/60 transition-colors mt-1`}>
                    Est. {brand.founded}
                  </span>
                </div>
                <p className="text-[12px] font-light text-white/35 mb-3">{brand.country} · {brand.specialty}</p>
                <p className="text-[13px] font-light leading-[1.8] text-white/40 line-clamp-3">{brand.blurb}</p>
                <p className={`${mono} text-[8px] mt-5 group-hover:text-[#C8A84B] transition-colors`}>
                  Learn More →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}
