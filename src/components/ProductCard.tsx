"use client";

import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { formatPrice } from "@/lib/filters";
import { useState } from "react";

type Props = {
  href: string;
  lotNumber: string;
  brand: string;
  title: string;
  meta: string;
  price?: number;
  status: "available" | "on_hold" | "sold";
  photo?: { asset: { _ref: string; _type: string } };
};

export function ProductCard({ href, lotNumber, brand, title, meta, price, status, photo }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        background: hovered ? "#0D0D0D" : "#080808",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", background: "#0D0D0D" }}>
        {photo ? (
          <Image
            src={urlForImage(photo as any).width(640).height(800).url()}
            alt={`${brand} ${title}`}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            style={{ objectFit: "cover", transition: "transform 0.7s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.08 }}>
              <circle cx="50" cy="50" r="46" stroke="#C8A84B" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="39" stroke="#C8A84B" strokeWidth="0.4" />
              <text x="31" y="68" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="31" fontWeight="400" fill="#C8A84B">E</text>
              <text x="19" y="70" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="44" fontWeight="400" fill="#C8A84B">I</text>
            </svg>
          </div>
        )}

        {/* Lot number */}
        <span style={{ position: "absolute", left: 12, top: 12, fontFamily: "monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(200,168,75,0.75)" }}>
          Lot {lotNumber}
        </span>

        {/* On hold badge */}
        {status === "on_hold" && (
          <span style={{ position: "absolute", right: 12, top: 12, border: "1px solid rgba(92,42,42,0.7)", background: "rgba(8,8,8,0.85)", padding: "4px 8px", fontFamily: "monospace", fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#8B3A3A" }}>
            On Hold
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "20px 20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(200,168,75,0.6)" }}>
          {brand}
        </p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 400, color: "#fff", marginTop: 4, lineHeight: 1.2 }}>
          {title}
        </h3>
        {meta && (
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4, fontWeight: 300 }}>{meta}</p>
        )}
        <p style={{ fontFamily: "monospace", fontSize: 13, color: "#C8A84B", marginTop: 12 }}>
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}
