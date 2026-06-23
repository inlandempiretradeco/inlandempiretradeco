import Image from "next/image";

/**
 * The actual designed seal with background removed via luminance + gold-hue detection.
 * Transparent PNG — just drop it on any background, no blend mode needed.
 */
type SealProps = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Seal({ size = 100, className = "", style }: SealProps) {
  return (
    <Image
      src="/seal-transparent.png"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain", ...style }}
      priority={size > 100}
    />
  );
}
