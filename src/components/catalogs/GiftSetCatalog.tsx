"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterPanel } from "@/components/FilterPanel";
import { ProductCard } from "@/components/ProductCard";
import { withLotNumbers, uniqueSorted, type GiftSet } from "@/lib/filters";

const GENDER_OPTIONS = [
  { value: "mens",    label: "Men's"   },
  { value: "womens",  label: "Women's" },
  { value: "unisex",  label: "Unisex"  },
];

function readParam(params: URLSearchParams, key: string): string[] {
  const v = params.get(key);
  return v ? v.split(",") : [];
}

export function GiftSetCatalog({ items }: { items: GiftSet[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lotted = useMemo(() => withLotNumbers(items), [items]);
  const brandOptions = useMemo(
    () => uniqueSorted(items.map((g) => g.brand)).map((b) => ({ value: b, label: b })),
    [items]
  );

  const [brands,   setBrands]   = useState<string[]>(() => readParam(searchParams, "brand"));
  const [genders,  setGenders]  = useState<string[]>(() => readParam(searchParams, "gender"));
  const [priceMin, setPriceMin] = useState(searchParams.get("min") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("max") || "");
  const [sort,     setSort]     = useState(searchParams.get("sort") || "newest");

  useEffect(() => {
    const params = new URLSearchParams();
    if (brands.length)  params.set("brand",  brands.join(","));
    if (genders.length) params.set("gender", genders.join(","));
    if (priceMin) params.set("min", priceMin);
    if (priceMax) params.set("max", priceMax);
    if (sort !== "newest") params.set("sort", sort);
    const qs = params.toString();
    router.replace(qs ? `/gift-sets?${qs}` : "/gift-sets", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands, genders, priceMin, priceMax, sort]);

  const filtered = useMemo(() => {
    let result = lotted.filter((g) => {
      if (brands.length  && !brands.includes(g.brand))   return false;
      if (genders.length && !genders.includes(g.gender)) return false;
      if (priceMin && (g.price ?? 0)        < Number(priceMin)) return false;
      if (priceMax && (g.price ?? Infinity) > Number(priceMax)) return false;
      return true;
    });

    if (sort === "price-asc")  result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "price-desc") result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else result = [...result].sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());

    return result;
  }, [lotted, brands, genders, priceMin, priceMax, sort]);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
      <FilterPanel
        groups={[
          { key: "brand",  label: "Brand",    options: brandOptions,  selected: brands,  onChange: setBrands  },
          { key: "gender", label: "For",       options: GENDER_OPTIONS, selected: genders, onChange: setGenders },
        ]}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        sort={sort}
        onSortChange={setSort}
        onClear={() => { setBrands([]); setGenders([]); setPriceMin(""); setPriceMax(""); setSort("newest"); }}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <p className="font-display text-2xl text-[#F2ECDE]/60">No sets match those filters.</p>
          <p className="mt-2 text-sm text-[#F2ECDE]/30">Adjust your filters or check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((g) => (
            <ProductCard
              key={g._id}
              href={`/gift-sets/${g.slug}`}
              lotNumber={g.lotNumber}
              brand={g.brand}
              title={g.name}
              meta={[g.gender === "mens" ? "Men's" : g.gender === "womens" ? "Women's" : "Unisex", g.includes].filter(Boolean).join(" · ")}
              price={g.price}
              status={g.status}
              photo={g.photos?.[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
