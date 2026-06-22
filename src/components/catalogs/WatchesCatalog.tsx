"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterPanel } from "@/components/FilterPanel";
import { ProductCard } from "@/components/ProductCard";
import { withLotNumbers, uniqueSorted, type Watch } from "@/lib/filters";

const CONDITION_OPTIONS = [
  { value: "new", label: "New" },
  { value: "consignment", label: "Consignment" },
];

const MOVEMENT_OPTIONS = [
  { value: "automatic", label: "Automatic" },
  { value: "quartz", label: "Quartz" },
  { value: "manual", label: "Manual" },
];

function readParam(params: URLSearchParams, key: string): string[] {
  const v = params.get(key);
  return v ? v.split(",") : [];
}

export function WatchesCatalog({ watches }: { watches: Watch[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lotted = useMemo(() => withLotNumbers(watches), [watches]);
  const brandOptions = useMemo(
    () => uniqueSorted(watches.map((w) => w.brand)).map((b) => ({ value: b, label: b })),
    [watches]
  );

  const [brands, setBrands] = useState<string[]>(() => readParam(searchParams, "brand"));
  const [conditions, setConditions] = useState<string[]>(() => readParam(searchParams, "condition"));
  const [movements, setMovements] = useState<string[]>(() => readParam(searchParams, "movement"));
  const [priceMin, setPriceMin] = useState(searchParams.get("min") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("max") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  // Keep the URL in sync so filtered views are shareable + indexable.
  useEffect(() => {
    const params = new URLSearchParams();
    if (brands.length) params.set("brand", brands.join(","));
    if (conditions.length) params.set("condition", conditions.join(","));
    if (movements.length) params.set("movement", movements.join(","));
    if (priceMin) params.set("min", priceMin);
    if (priceMax) params.set("max", priceMax);
    if (sort !== "newest") params.set("sort", sort);
    const qs = params.toString();
    router.replace(qs ? `/watches?${qs}` : "/watches", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands, conditions, movements, priceMin, priceMax, sort]);

  const filtered = useMemo(() => {
    let result = lotted.filter((w) => {
      if (brands.length && !brands.includes(w.brand)) return false;
      if (conditions.length && !conditions.includes(w.condition)) return false;
      if (movements.length && w.movement && !movements.includes(w.movement)) return false;
      if (priceMin && (w.price ?? 0) < Number(priceMin)) return false;
      if (priceMax && (w.price ?? Infinity) > Number(priceMax)) return false;
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
  }, [lotted, brands, conditions, movements, priceMin, priceMax, sort]);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
      <FilterPanel
        groups={[
          { key: "brand", label: "Brand", options: brandOptions, selected: brands, onChange: setBrands },
          { key: "condition", label: "Condition", options: CONDITION_OPTIONS, selected: conditions, onChange: setConditions },
          { key: "movement", label: "Movement", options: MOVEMENT_OPTIONS, selected: movements, onChange: setMovements },
        ]}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        sort={sort}
        onSortChange={setSort}
        onClear={() => {
          setBrands([]);
          setConditions([]);
          setMovements([]);
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
          {filtered.map((w) => (
            <ProductCard
              key={w._id}
              href={`/watches/${w.slug}`}
              lotNumber={w.lotNumber}
              brand={w.brand}
              title={w.model}
              meta={[w.caseMaterial, w.caseSize, w.movement].filter(Boolean).join(" · ")}
              price={w.price}
              status={w.status}
              photo={w.photos?.[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
