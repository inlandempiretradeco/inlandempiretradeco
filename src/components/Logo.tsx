import Link from "next/link";
import { Seal } from "@/components/Seal";

type LogoProps = {
  href?: string;
  className?: string;
  variant?: "header" | "footer";
};

export function Logo({ href = "/", className = "", variant = "header" }: LogoProps) {
  const dim = variant === "footer";

  return (
    <Link
      href={href}
      aria-label="Inland Empire Trading Co. — Home"
      className={`group flex items-center gap-4 ${className}`}
    >
      {/* Actual designed seal — CSS mask approach, no background box */}
      <div style={{ opacity: dim ? 0.55 : 1 }}>
        <Seal size={46} />
      </div>

      {/* Vertical rule */}
      <div
        style={{ width: 1, height: 30, background: "rgba(200,168,75,0.22)", flexShrink: 0 }}
        aria-hidden="true"
      />

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 13.5, fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase" as const,
          color: dim ? "rgba(255,255,255,0.42)" : "#fff",
          lineHeight: 1,
        }}>
          Inland Empire
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ height: 1, width: 11, background: "rgba(200,168,75,0.5)" }} />
          <span style={{
            fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
            fontSize: 7, fontWeight: 300,
            letterSpacing: "0.44em", textTransform: "uppercase" as const,
            color: "#C8A84B", lineHeight: 1,
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
