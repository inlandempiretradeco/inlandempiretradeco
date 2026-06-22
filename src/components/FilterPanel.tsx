"use client";

export type CheckboxFilterGroup = {
  key: string;
  label: string;
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
  onClear: () => void;
  resultCount: number;
};

const monoLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
  fontSize: 8.5,
  fontWeight: 300,
  letterSpacing: "0.38em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.22)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "transparent",
  padding: "8px 12px",
  fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
  fontSize: 12,
  color: "#fff",
  outline: "none",
};

export function FilterPanel({ groups, priceMin, priceMax, onPriceMinChange, onPriceMaxChange, sort, onSortChange, onClear, resultCount }: Props) {
  return (
    <aside style={{ position: "sticky" as const, top: 96, alignSelf: "start" as const }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 16, marginBottom: 4 }}>
        <span style={monoLabel}>Refine</span>
        <button onClick={onClear} style={{ ...monoLabel, fontSize: 8, cursor: "pointer", background: "none", border: "none", color: "rgba(255,255,255,0.25)" }}>
          Clear all
        </button>
      </div>

      {groups.map(group => (
        <div key={group.key} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 0" }}>
          <p style={{ ...monoLabel, marginBottom: 14 }}>{group.label}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {group.options.map(opt => {
              const checked = group.selected.includes(opt.value);
              return (
                <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, fontWeight: 300, color: checked ? "#fff" : "rgba(255,255,255,0.45)" }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const next = checked
                        ? group.selected.filter(v => v !== opt.value)
                        : [...group.selected, opt.value];
                      group.onChange(next);
                    }}
                    style={{ accentColor: "#C8A84B", width: 12, height: 12 }}
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 0" }}>
        <p style={{ ...monoLabel, marginBottom: 14 }}>Price (USD)</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="number" placeholder="Min" value={priceMin} onChange={e => onPriceMinChange(e.target.value)} style={inputStyle} />
          <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>—</span>
          <input type="number" placeholder="Max" value={priceMax} onChange={e => onPriceMaxChange(e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ padding: "20px 0" }}>
        <p style={{ ...monoLabel, marginBottom: 14 }}>Sort</p>
        <select value={sort} onChange={e => onSortChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <p style={{ ...monoLabel, fontSize: 8, paddingTop: 8 }}>
        {resultCount} {resultCount === 1 ? "piece" : "pieces"}
      </p>
    </aside>
  );
}
