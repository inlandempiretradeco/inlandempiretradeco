import Link from "next/link";

/**
 * Clean SVG monogram — IE centered using textAnchor="middle".
 * No coordinate guessing, mathematically centered in the circle.
 */
type LogoProps = {
  href?: string;
  className?: string;
  variant?: "header" | "footer";
};

export function Logo({ href = "/", className = "", variant = "header" }: LogoProps) {
  const dim = variant === "footer";
  const op  = (base: number) => dim ? base * 0.55 : base;

  return (
    <Link
      href={href}
      aria-label="Inland Empire Trading Co. — Home"
      className={`group flex items-center gap-4 ${className}`}
    >
      {/* Monogram — clean centered SVG */}
      <svg width="46" height="46" viewBox="0 0 100 100" fill="none" aria-hidden="true" className="shrink-0">
        {/* Outer ring */}
        <circle cx="50" cy="50" r="46.5" stroke="#C8A84B" strokeWidth="0.8"  opacity={op(0.65)} />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="40"   stroke="#C8A84B" strokeWidth="0.35" opacity={op(0.22)} />

        {/* Diamond separators at 9 & 3 o'clock */}
        <text x="7"  y="53.5" fontSize="5.5" fill="#C8A84B" opacity={op(0.44)} textAnchor="middle">◆</text>
        <text x="93" y="53.5" fontSize="5.5" fill="#C8A84B" opacity={op(0.44)} textAnchor="middle">◆</text>

        {/* Cardinal ticks */}
        <g stroke="#C8A84B" strokeWidth="0.8" opacity={op(0.38)}>
          <line x1="50" y1="3.5" x2="50" y2="9"  />
          <line x1="50" y1="91" x2="50" y2="96.5"/>
        </g>

        {/*
          IE monogram — textAnchor="middle" at x=50 centers it perfectly.
          letterSpacing brings the letters close to suggest interlocking.
        */}
        <text
          x="50" y="67"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="38"
          fontWeight="400"
          fill="#C8A84B"
          opacity={op(0.92)}
          textAnchor="middle"
          letterSpacing="-1"
        >IE</text>

        {/* Flourish */}
        <path
          d="M26 76 Q35 83.5 50 80.5 Q60 78.5 58 74.5"
          stroke="#C8A84B" strokeWidth="0.95" fill="none"
          opacity={op(0.46)} strokeLinecap="round"
        />
      </svg>

      {/* Vertical rule */}
      <div style={{ width:1, height:30, background:"rgba(200,168,75,0.22)", flexShrink:0 }} aria-hidden="true" />

      {/* Wordmark */}
      <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 13.5, fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase" as const,
          color: dim ? "rgba(255,255,255,0.42)" : "#fff", lineHeight: 1,
        }}>Inland Empire</span>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ height:1, width:11, background:"rgba(200,168,75,0.5)" }} />
          <span style={{
            fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
            fontSize: 7, fontWeight: 300,
            letterSpacing: "0.44em", textTransform: "uppercase" as const,
            color: "#C8A84B", lineHeight: 1,
          }}>Trading Co.</span>
          <div style={{ height:1, width:11, background:"rgba(200,168,75,0.5)" }} />
        </div>
        <div aria-hidden="true" style={{ textAlign:"center", fontSize:3.5, color:"rgba(200,168,75,0.3)", lineHeight:1 }}>◆</div>
      </div>
    </Link>
  );
}
