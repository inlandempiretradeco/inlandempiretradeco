"use client";

export type CheckboxFilterGroup = {
  key: string; label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
};

type Props = {
  groups: CheckboxFilterGroup[];
  priceMin: string; priceMax: string;
  onPriceMinChange: (v: string) => void;
  onPriceMaxChange: (v: string) => void;
  sort: string; onSortChange: (v: string) => void;
  onClear: () => void; resultCount: number;
};

const mono = "font-mono text-[8.5px] font-light tracking-[0.38em] uppercase text-white/22";
const inputCls = "w-full bg-transparent px-3 py-2 font-mono text-[12px] text-white outline-none";

export function FilterPanel({ groups, priceMin, priceMax, onPriceMinChange, onPriceMaxChange, sort, onSortChange, onClear, resultCount }: Props) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="flex items-center justify-between pb-4 mb-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className={mono}>Refine</span>
        <button onClick={onClear} className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25 bg-none border-none cursor-pointer">Clear</button>
      </div>

      {groups.map(group => (
        <div key={group.key} className="py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className={`${mono} mb-3`}>{group.label}</p>
          <div className="flex flex-col gap-2.5">
            {group.options.map(opt => {
              const checked = group.selected.includes(opt.value);
              return (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer text-[13px] font-light text-white/45 hover:text-white transition-colors">
                  <input type="checkbox" checked={checked} onChange={() => group.onChange(checked ? group.selected.filter(v => v !== opt.value) : [...group.selected, opt.value])}
                    className="w-3 h-3" style={{ accentColor: "#C8A84B" }} />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p className={`${mono} mb-3`}>Price (USD)</p>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" value={priceMin} onChange={e => onPriceMinChange(e.target.value)}
            className={inputCls} style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
          <span className="text-white/20 shrink-0">—</span>
          <input type="number" placeholder="Max" value={priceMax} onChange={e => onPriceMaxChange(e.target.value)}
            className={inputCls} style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
      </div>

      <div className="py-5">
        <p className={`${mono} mb-3`}>Sort</p>
        <select value={sort} onChange={e => onSortChange(e.target.value)}
          className={`${inputCls} cursor-pointer`} style={{ border: "1px solid rgba(255,255,255,0.1)", background: "#080808" }}>
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <p className={`${mono} text-[8px] pt-2`}>{resultCount} {resultCount === 1 ? "piece" : "pieces"}</p>
    </aside>
  );
}
