import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ContactBar } from "@/components/ContactBar";

export const metadata: Metadata = {
  title: "About",
  description: "Inland Empire Trading Co. is a private dealer of fine watches and fragrance based in Medical Lake, Washington, founded by Ramon J. Guel.",
};

const S = {
  monoLabel: { fontFamily: "var(--font-mono-ibm), ui-monospace, monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" },
  border: "1px solid rgba(255,255,255,0.06)",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "100px 72px" }}>
      <Reveal>
        <p style={S.monoLabel}>About</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 300, lineHeight: 1.04, color: "#fff", marginTop: 20, maxWidth: 900 }}>
          A Watch and Fragrance Dealership for Everyone.
        </h1>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, marginTop: 100, borderTop: S.border, paddingTop: 80 }}>
        <Reveal>
          <div>
            {[
              "We run a lean operation out of Medical Lake, Washington. No showroom. No staff. Just a carefully maintained inventory of watches and fragrance that Ramon sources, inspects, and ships himself.",
              "The range is honest: entry-level pieces starting around $25, investment-grade timepieces climbing past $3,000. New stock from authorized brand relationships alongside hand-picked consignment from private sellers.",
              "We ship anywhere in the United States, fully insured and carefully packed. If something arrives and it's not what you expected, you call and we fix it.",
            ].map((p, i) => (
              <p key={i} style={{ fontSize: 16, fontWeight: 300, lineHeight: 2.05, color: "rgba(255,255,255,0.42)", marginBottom: 24 }}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, fontStyle: "italic", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, marginBottom: 32 }}>
              "My goal is simple: find pieces worth having and make them available to people who appreciate them. Every budget, every taste."
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>Ramon J. Guel, MBA</p>
            <p style={{ ...S.monoLabel, fontSize: 7.5, marginTop: 8 }}>Founder</p>

            <div style={{ marginTop: 52, paddingTop: 40, borderTop: S.border }}>
              <p style={S.monoLabel}>Reach Us</p>
              <div style={{ marginTop: 20 }}>
                <ContactBar variant="compact" />
              </div>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.28)" }}>322 E Grace St #362</p>
                <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.28)" }}>Medical Lake, WA 99022</p>
                <a href="mailto:sales@inlandempiretradingco.com" style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.28)", transition: "color 0.2s" }}>sales@inlandempiretradingco.com</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
