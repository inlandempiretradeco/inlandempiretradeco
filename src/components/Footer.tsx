import Link from "next/link";
import { Logo } from "@/components/Logo";

const EMAIL        = process.env.NEXT_PUBLIC_BUSINESS_EMAIL        || "sales@inlandempiretradingco.com";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "(509) 951-7165";
const PHONE        = process.env.NEXT_PUBLIC_BUSINESS_PHONE        || "+15099517165";

export function Footer() {
  const label = { fontFamily: "var(--font-mono-ibm), ui-monospace, monospace", fontSize: 7.5, fontWeight: 300, letterSpacing: "0.4em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.18)", marginBottom: 22, display: "block" };
  const link  = { display: "block", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.32)", marginBottom: 14, transition: "color 0.2s" };

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#080808" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 72px 64px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 72 }}>

        <div>
          <Logo variant="footer" />
          <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 2, color: "rgba(255,255,255,0.22)", maxWidth: 240, marginTop: 24 }}>
            Watches, fragrance, and gift sets for every budget. Ships to all 50 states from Medical Lake, Washington.
          </p>
        </div>

        <div>
          <span style={label}>Catalog</span>
          {[
            { href: "/watches",   text: "Watches"   },
            { href: "/fragrance", text: "Fragrance" },
            { href: "/gift-sets", text: "Gift Sets" },
            { href: "/about",     text: "About"     },
          ].map(l => (
            <Link key={l.href} href={l.href} style={link}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
            >{l.text}</Link>
          ))}
        </div>

        <div>
          <span style={label}>Contact</span>
          <a href={`tel:${PHONE}`} style={link}
            onMouseEnter={e => (e.currentTarget.style.color = "#C8A84B")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
          >{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`} style={{ ...link, wordBreak: "break-all" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C8A84B")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
          >{EMAIL}</a>
          <p style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.9, color: "rgba(255,255,255,0.18)", marginTop: 4 }}>
            322 E Grace St #362<br />Medical Lake, WA 99022
          </p>
        </div>

        <div>
          <span style={label}>Follow</span>
          {[
            { href: "https://www.instagram.com/inlandempiretc/",                  text: "Instagram" },
            { href: "https://www.facebook.com/profile.php?id=61590087723571",     text: "Facebook"  },
            { href: "https://www.tiktok.com/@ramon.guel",                         text: "TikTok"    },
          ].map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" style={link}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
            >{l.text}</a>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "22px 72px", maxWidth: 1320, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-mono-ibm), ui-monospace, monospace", fontSize: 8, fontWeight: 300, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.12)" }}>
          {new Date().getFullYear()} Inland Empire Trading Co. &nbsp;&nbsp; Founded by Ramon J. Guel, MBA &nbsp;&nbsp; Medical Lake, WA
        </p>
      </div>
    </footer>
  );
}
