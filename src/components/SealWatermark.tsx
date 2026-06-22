import Image from "next/image";

/**
 * A faint, oversized seal placed behind section dividers throughout the site.
 * This is the signature element: the same mark from the logo, used as a
 * structural watermark rather than decoration, tying every section back to it.
 */
export function SealWatermark({
  className = "",
  size = 520,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size, opacity: 0.16, mixBlendMode: "screen" }}
    >
      {/* seal-black.png has a near-black square background; "screen" blend
          makes that background vanish against the page, leaving only the
          gold linework faintly visible as a watermark. */}
      <Image
        src="/seal-black.png"
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </div>
  );
}
