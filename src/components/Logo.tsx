import Link from "next/link";

/**
 * IE Monogram positioning:
 * ViewBox 100x100, circle center (50,50)
 * E drawn first (behind), I drawn second (in front) = interlocked.
 * Combined visual mass: I~x34-44, E~x40-62 → centered ~x48 ≈ 50 ✓
 */

type LogoProps = {
  href?: string;
  className?: string;
  variant?: "header" | "footer";
};

function SealMark({ dim = false, size = 44 }: { dim?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true" className="shrink-0">
      {/* Rings */}
      <circle cx="50" cy="50" r="46.5" stroke="#C8A84B" strokeWidth="0.8" opacity={dim ? "0.38" : "0.62"} />
      <circle cx="50" cy="50" r="40"   stroke="#C8A84B" strokeWidth="0.35" opacity={dim ? "0.12" : "0.2"} />

      {/* Diamond separators at 9 & 3 o'clock */}
      <text x="6.5"  y="53" fontSize="5" fill="#C8A84B" opacity={dim ? "0.28" : "0.42"}>◆</text>
      <text x="85.5" y="53" fontSize="5" fill="#C8A84B" opacity={dim ? "0.28" : "0.42"}>◆</text>

      {/* Cardinal tick marks */}
      <g stroke="#C8A84B" strokeWidth="0.75" opacity={dim ? "0.18" : "0.35"}>
        <line x1="50" y1="3.5" x2="50" y2="9"  />
        <line x1="50" y1="91" x2="50" y2="96.5"/>
      </g>

      {/*
        MONOGRAM — centered in circle:
        E at x=40, behind (drawn first)
        I at x=34, in front (drawn second) — creates the interlocked overlap
        I spans ~x34→44, E spans ~x40→62, overlap at x40→44
        Combined center ≈ (34+62)/2 = 48, close to circle center 50 ✓
      */}
      <text
        x="40" y="68"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="31" fontWeight="400"
        fill="#C8A84B" opacity={dim ? "0.72" : "0.88"}
      >E</text>
      <text
        x="34" y="70"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="46" fontWeight="400"
        fill="#C8A84B" opacity={dim ? "0.78" : "0.94"}
      >I</text>

      {/* Calligraphic flourish */}
      <path
        d="M22 79.5 Q31 88 47 84.5 Q56 82 53.5 77.5"
        stroke="#C8A84B" strokeWidth="1" fill="none"
        opacity={dim ? "0.3" : "0.48"} strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ href = "/", className = "", variant = "header" }: LogoProps) {
  const dim = variant === "footer";

  return (
    <Link
      href={href}
      aria-label="Inland Empire Trading Co. — Home"
      className={`group flex items-center gap-4 ${className}`}
    >
      <SealMark dim={dim} />

      {/* Vertical rule */}
      <div style={{ width: 1, height: 30, background: "rgba(200,168,75,0.22)", flexShrink: 0 }} aria-hidden="true" />

      {/* Wordmark */}
      <div className="flex flex-col gap-[5px]">
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 13.5,
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: dim ? "rgba(255,255,255,0.42)" : "#fff",
          lineHeight: 1,
        }}>
          Inland Empire
        </span>
        <div className="flex items-center gap-[5px]">
          <div style={{ height: 1, width: 11, background: "rgba(200,168,75,0.5)" }} />
          <span style={{
            fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
            fontSize: 7,
            fontWeight: 300,
            letterSpacing: "0.44em",
            textTransform: "uppercase" as const,
            color: "#C8A84B",
            lineHeight: 1,
          }}>
            Trading Co.
          </span>
          <div style={{ height: 1, width: 11, background: "rgba(200,168,75,0.5)" }} />
        </div>
        <div aria-hidden="true" style={{ textAlign: "center", fontSize: 3.5, color: "rgba(200,168,75,0.3)", lineHeight: 1 }}>◆</div>
      </div>
    </Link>
  );
}

// Export the seal mark for use in hero and CTAs
export { SealMark };
