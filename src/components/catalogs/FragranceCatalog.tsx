"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterPanel } from "@/components/FilterPanel";
import { ProductCard } from "@/components/ProductCard";
import { withLotNumbers, uniqueSorted, type Fragrance } from "@/lib/filters";

const CATEGORY_OPTIONS = [
  { value: "cologne", label: "Cologne" },
  { value: "perfume", label: "Perfume" },
];

const CONCENTRATION_OPTIONS = [
  { value: "edt", label: "EDT" },
  { value: "edp", label: "EDP" },
  { value: "parfum", label: "Parfum / Extrait" },
  { value: "edc", label: "Eau de Cologne" },
];

function readParam(params: URLSearchParams, key: string): string[] {
  const v = params.get(key);
  return v ? v.split(",") : [];
}

export function FragranceCatalog({ items }: { items: Fragrance[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lotted = useMemo(() => withLotNumbers(items), [items]);
  const brandOptions = useMemo(
    () => uniqueSorted(items.map((f) => f.brand)).map((b) => ({ value: b, label: b })),
    [items]
  );

  const [brands, setBrands] = useState<string[]>(() => readParam(searchParams, "brand"));
  const [categories, setCategories] = useState<string[]>(() => readParam(searchParams, "category"));
  const [concentrations, setConcentrations] = useState<string[]>(() => readParam(searchParams, "concentration"));
  const [priceMin, setPriceMin] = useState(searchParams.get("min") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("max") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  useEffect(() => {
    const params = new URLSearchParams();
    if (brands.length) params.set("brand", brands.join(","));
    if (categories.length) params.set("category", categories.join(","));
    if (concentrations.length) params.set("concentration", concentrations.join(","));
    if (priceMin) params.set("min", priceMin);
    if (priceMax) params.set("max", priceMax);
    if (sort !== "newest") params.set("sort", sort);
    const qs = params.toString();
    router.replace(qs ? `/fragrance?${qs}` : "/fragrance", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands, categories, concentrations, priceMin, priceMax, sort]);

  const filtered = useMemo(() => {
    let result = lotted.filter((f) => {
      if (brands.length && !brands.includes(f.brand)) return false;
      if (categories.length && !categories.includes(f.category)) return false;
      if (concentrations.length && f.concentration && !concentrations.includes(f.concentration)) return false;
      if (priceMin && (f.price ?? 0) < Number(priceMin)) return false;
      if (priceMax && (f.price ?? Infinity) > Number(priceMax)) return false;
      return true;
    });

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else {
      result = [...result].sort(
        (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      );
    }

    return result;
  }, [lotted, brands, categories, concentrations, priceMin, priceMax, sort]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
      <FilterPanel
        groups={[
          { key: "brand", label: "Brand", options: brandOptions, selected: brands, onChange: setBrands },
          { key: "category", label: "Category", options: CATEGORY_OPTIONS, selected: categories, onChange: setCategories },
          { key: "concentration", label: "Concentration", options: CONCENTRATION_OPTIONS, selected: concentrations, onChange: setConcentrations },
        ]}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        sort={sort}
        onSortChange={setSort}
        onClear={() => {
          setBrands([]);
          setCategories([]);
          setConcentrations([]);
          setPriceMin("");
          setPriceMax("");
          setSort("newest");
        }}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <p className="font-display text-2xl text-parchment/70">
            No pieces match those filters.
          </p>
          <p className="mt-2 text-sm text-parchment/40">
            New inventory moves quickly — adjust your filters or check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((f) => (
            <ProductCard
              key={f._id}
              href={`/fragrance/${f.slug}`}
              lotNumber={f.lotNumber}
              brand={f.brand}
              title={f.name}
              meta={[f.size, f.concentration?.toUpperCase()].filter(Boolean).join(" · ")}
              price={f.price}
              status={f.status}
              photo={f.photos?.[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
