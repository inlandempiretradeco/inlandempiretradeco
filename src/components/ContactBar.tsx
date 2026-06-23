const PHONE         = process.env.NEXT_PUBLIC_BUSINESS_PHONE         || "+15099517165";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "(509) 951-7165";
const EMAIL         = process.env.NEXT_PUBLIC_BUSINESS_EMAIL         || "sales@inlandempiretradingco.com";

type Props = { itemLabel?: string; variant?: "default" | "compact" };

export function ContactBar({ itemLabel, variant = "default" }: Props) {
  const subject = itemLabel ? `Inquiry: ${itemLabel}` : "Inquiry from Inland Empire Trading Co.";
  const smsBody = itemLabel ? `Hi, I'm interested in the ${itemLabel}.` : "Hi, I have a question about a piece on your website.";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a href={`tel:${PHONE}`}
        className="font-mono text-[9.5px] font-normal tracking-[0.24em] uppercase px-8 py-4 text-center transition-colors"
        style={{ border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.7)", background: "transparent" }}>
        Call {variant === "default" && PHONE_DISPLAY}
      </a>
      <a href={`sms:${PHONE}?&body=${encodeURIComponent(smsBody)}`}
        className="font-mono text-[9.5px] font-normal tracking-[0.24em] uppercase px-8 py-4 text-center transition-colors"
        style={{ border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.7)", background: "transparent" }}>
        Text Us
      </a>
      <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`}
        className="font-mono text-[9.5px] font-normal tracking-[0.24em] uppercase px-8 py-4 text-center transition-colors"
        style={{ border: "1px solid #C8A84B", color: "#080808", background: "#C8A84B" }}>
        Email
      </a>
    </div>
  );
}
