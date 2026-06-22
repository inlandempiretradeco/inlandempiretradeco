const PHONE         = process.env.NEXT_PUBLIC_BUSINESS_PHONE         || "+15099517165";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "(509) 951-7165";
const EMAIL         = process.env.NEXT_PUBLIC_BUSINESS_EMAIL         || "sales@inlandempiretradingco.com";

type Props = { itemLabel?: string; variant?: "default" | "compact" };

export function ContactBar({ itemLabel, variant = "default" }: Props) {
  const subject  = itemLabel ? `Inquiry: ${itemLabel}` : "Inquiry from Inland Empire Trading Co.";
  const smsBody  = itemLabel ? `Hi, I'm interested in the ${itemLabel}.` : "Hi, I have a question about a piece on your website.";
  const px       = variant === "compact" ? "16px 24px" : "15px 32px";

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
    fontSize: 9.5,
    fontWeight: 400,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    padding: px,
    transition: "all 0.25s",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      <a href={`tel:${PHONE}`} style={{ ...base, border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.7)", background: "transparent" }}>
        Call {variant === "default" && PHONE_DISPLAY}
      </a>
      <a href={`sms:${PHONE}?&body=${encodeURIComponent(smsBody)}`} style={{ ...base, border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.7)", background: "transparent" }}>
        Text Us
      </a>
      <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`} style={{ ...base, border: "1px solid #C8A84B", color: "#080808", background: "#C8A84B" }}>
        Email
      </a>
    </div>
  );
}
