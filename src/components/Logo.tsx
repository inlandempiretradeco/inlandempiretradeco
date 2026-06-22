import Link from "next/link";

/**
 * IE Monogram: E drawn first (sits behind), I drawn second (sits in front).
 * This creates the interlocked effect from the original wordmark.
 * No circular text at header scale — too small to read cleanly.
 * Full version with circular text is used in the Hero seal only.
 */

type LogoProps = {
  href?: string;
  className?: string;
  /** "header" = compact no circular text | "footer" = dimmed */
  variant?: "header" | "footer";
};

export function Logo({ href = "/", className = "", variant = "header" }: LogoProps) {
  const dim = variant === "footer";

  return (
    <Link
      href={href}
      aria-label="Inland Empire Trading Co. — Home"
      className={`group flex items-center gap-[18px] ${className}`}
    >
      {/* ── Seal monogram ─────────────────────── */}
      <svg
        width="44" height="44"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Rings */}
        <circle cx="50" cy="50" r="46.5" stroke="#C8A84B"
          strokeWidth="0.75" opacity={dim ? "0.4" : "0.65"} />
        <circle cx="50" cy="50" r="40" stroke="#C8A84B"
          strokeWidth="0.35" opacity={dim ? "0.15" : "0.22"} />

        {/* Diamond separators at 9 o'clock / 3 o'clock */}
        <text x="7.5" y="52.5" fontSize="5" fill="#C8A84B" opacity={dim ? "0.3" : "0.45"}>◆</text>
        <text x="83" y="52.5" fontSize="5" fill="#C8A84B" opacity={dim ? "0.3" : "0.45"}>◆</text>

        {/* Tick marks at cardinal points */}
        <g stroke="#C8A84B" strokeWidth="0.7" opacity={dim ? "0.2" : "0.38"}>
          <line x1="50" y1="3.5" x2="50" y2="8.5" />
          <line x1="50" y1="91.5" x2="50" y2="96.5" />
        </g>

        {/*
          E drawn FIRST = sits behind the I.
          I drawn SECOND = sits in front, creating the interlocked look.
          E starts at x=31 so it overlaps the right edge of the I serif.
        */}
        <text
          x="31" y="68"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="31"
          fontWeight="400"
          fill="#C8A84B"
          opacity={dim ? "0.75" : "0.9"}
        >E</text>
        <text
          x="19" y="70"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="44"
          fontWeight="400"
          fill="#C8A84B"
          opacity={dim ? "0.8" : "0.95"}
        >I</text>

        {/* Calligraphic flourish */}
        <path
          d="M18 78.5 Q28 87.5 45 84 Q54.5 81.5 52 77"
          stroke="#C8A84B"
          strokeWidth="0.95"
          fill="none"
          opacity={dim ? "0.35" : "0.5"}
          strokeLinecap="round"
        />
      </svg>

      {/* ── Vertical rule ─────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          width: 1,
          height: 30,
          background: "rgba(200,168,75,0.22)",
          flexShrink: 0,
        }}
      />

      {/* ── Wordmark ──────────────────────────── */}
      <div className="flex flex-col gap-[5px]">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            color: dim ? "rgba(255,255,255,0.45)" : "#fff",
            lineHeight: 1,
          }}
        >
          Inland Empire
        </span>

        {/* — TRADING CO. — */}
        <div className="flex items-center gap-[5px]">
          <div style={{ height: 1, width: 11, background: "rgba(200,168,75,0.5)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
              fontSize: 7,
              fontWeight: 300,
              letterSpacing: "0.44em",
              textTransform: "uppercase" as const,
              color: "#C8A84B",
              lineHeight: 1,
            }}
          >
            Trading Co.
          </span>
          <div style={{ height: 1, width: 11, background: "rgba(200,168,75,0.5)" }} />
        </div>

        {/* Diamond detail */}
        <div
          aria-hidden="true"
          style={{
            textAlign: "center",
            fontSize: 3.5,
            color: "rgba(200,168,75,0.32)",
            lineHeight: 1,
          }}
        >◆</div>
      </div>
    </Link>
  );
}
