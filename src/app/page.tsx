import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { featuredItemsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { formatPrice } from "@/lib/filters";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactBar } from "@/components/ContactBar";

export const revalidate = 60;

type FeaturedItem = {
  _id: string; brand: string; model?: string; name?: string;
  slug: string; price?: number;
  photos: { asset: { _ref: string; _type: string } }[];
  kind: "watch" | "fragrance";
};

const S = {
  monoLabel: { fontFamily: "var(--font-mono-ibm), ui-monospace, monospace", fontSize: 8.5, fontWeight: 300, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)" },
  border: "1px solid rgba(255,255,255,0.06)",
} as const;

export default async function HomePage() {
  let featured: { watches: FeaturedItem[]; fragrance: FeaturedItem[] } = { watches: [], fragrance: [] };
  try { featured = await client.fetch(featuredItemsQuery, {}, { next: { revalidate } }); } catch {}
  const featuredItems = [...(featured.watches ?? []), ...(featured.fragrance ?? [])].slice(0, 4);

  return (
    <>
      <Hero />

      {/* MANIFESTO */}
      <section style={{ borderTop: S.border }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "160px 72px", display: "grid", gridTemplateColumns: "300px 1fr", gap: 100, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 120 }}>
              <p style={S.monoLabel}>The Operation</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.2rem,3.2vw,3.2rem)", fontWeight: 400, lineHeight: 1.12, color: "#fff", marginTop: 18 }}>
                Not a store.<br />A private<br />dealership.
              </h2>
              <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.12)", marginTop: 28 }} />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                <>We run a lean operation out of Medical Lake, Washington. No showroom. No staff. Just a <strong style={{ fontWeight: 400, color: "rgba(255,255,255,0.75)" }}>carefully maintained inventory of watches and fragrance</strong> that Ramon sources, inspects, and ships himself.</>,
                <>The range is honest: entry-level pieces starting around $25, investment-grade timepieces climbing past $3,000. New stock from authorized brand relationships alongside hand-picked consignment from private sellers. Whatever the price, every piece gets the same attention before it goes up.</>,
                <>We <strong style={{ fontWeight: 400, color: "rgba(255,255,255,0.75)" }}>ship anywhere in the United States</strong>, fully insured and carefully packed. If something arrives and it's not what you expected, you call and we fix it. That's the whole model.</>,
                <>If you have a question about a piece, call or text. Either way, you're talking to Ramon directly.</>,
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 16, fontWeight: 300, lineHeight: 2.05, color: "rgba(255,255,255,0.42)", marginBottom: i < 3 ? 24 : 0 }}>{text}</p>
              ))}
              <div style={{ marginTop: 48, paddingTop: 36, borderTop: S.border }}>
                <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 21, fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>Ramon J. Guel, MBA</p>
                <p style={{ ...S.monoLabel, fontSize: 7.5, marginTop: 7 }}>Founder, Inland Empire Trading Co.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOGISTICS */}
      <div style={{ borderTop: S.border, borderBottom: S.border, background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,0.05)" }}>
            {[
              { n: "01", title: "Ships Nationwide", body: "We ship to all 50 states. Every order is carefully packed and fully insured. Watches ship with tracking and signature confirmation." },
              { n: "02", title: "Every Budget",     body: "Entry-level pieces from $25. Investment-grade timepieces past $3,000. New from authorized brands and pre-owned from private sellers." },
              { n: "03", title: "Personal Service", body: "Call, text, or email and you get Ramon — not a support ticket. He can answer questions about any piece in the inventory, in detail." },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.1}>
                <div style={{ background: "#0A0A0A", padding: "52px 44px" }}>
                  <p style={{ ...S.monoLabel, color: "rgba(200,168,75,0.4)", marginBottom: 18 }}>{item.n}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 24, fontWeight: 400, color: "#fff", marginBottom: 14 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.32)" }}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* COLLECTION */}
      <div style={{ borderTop: S.border }}>
        <div style={{ padding: "22px 72px", display: "flex", justifyContent: "space-between", maxWidth: 1320, margin: "0 auto" }}>
          <span style={S.monoLabel}>The Collection</span>
          <span style={S.monoLabel}>Watches &nbsp;&nbsp; Fragrance &nbsp;&nbsp; Gift Sets</span>
        </div>

        {/* Panels */}
        <div style={{ display: "grid", gridTemplateColumns: "58fr 42fr" }}>
          {[
            { href: "/watches",   num: "I",  ghost: "W", title: "Timepieces", body: "New from authorized brands and consignment from private sellers. Automatic, quartz, and manual. Inspected before listing. Ships insured." },
            { href: "/fragrance", num: "II", ghost: "F", title: "Scent",       body: "Cologne and perfume from Creed, Tom Ford, Dior, Versace, Byredo, and more. EDT, EDP, and Parfum. Ships nationwide." },
          ].map((panel, i) => (
            <Reveal key={panel.href} delay={i * 0.08}>
              <Link href={panel.href} className="group" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "82vh", padding: 60, overflow: "hidden", background: i === 0 ? "#080808" : "#0C0C0C", borderRight: i === 0 ? S.border : undefined, borderTop: S.border, cursor: "pointer", transition: "background 0.55s" }}>
                {/* Ghost letter */}
                <span aria-hidden="true" style={{ position: "absolute", top: "-0.12em", left: "-0.03em", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "28vw", fontWeight: 300, lineHeight: 1, color: "rgba(255,255,255,0.025)", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>{panel.ghost}</span>
                {/* Seal watermark */}
                <svg aria-hidden="true" style={{ position: "absolute", top: "50%", right: -60, transform: "translateY(-50%)", width: 340, height: 340, opacity: 0.028, pointerEvents: "none" }} viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="47" stroke="#fff" strokeWidth="0.4"/>
                  <circle cx="50" cy="50" r="40" stroke="#fff" strokeWidth="0.2"/>
                  <text x="31" y="68" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="31" fill="#fff">E</text>
                  <text x="19" y="70" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="44" fill="#fff">I</text>
                </svg>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <p style={{ ...S.monoLabel, marginBottom: 18 }}>{panel.num} / {panel.title === "Timepieces" ? "Watches" : "Fragrance"}</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(3rem,5vw,5rem)", fontWeight: 300, lineHeight: 0.93, color: "#fff" }}>{panel.title}</h2>
                  <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,0.28)", maxWidth: 280, marginTop: 18 }}>{panel.body}</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 32, fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 9, fontWeight: 300, letterSpacing: "0.36em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                    <div style={{ height: 1, width: 26, background: "currentColor" }} />
                    Browse Collection
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Gift sets strip */}
        <Link href="/gift-sets" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 72px", borderTop: S.border, background: "#0A0A0A", cursor: "pointer", transition: "background 0.4s", textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
            <span style={S.monoLabel}>III</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2rem,3.2vw,3rem)", fontWeight: 300, color: "#fff" }}>Gift Sets</h3>
          </div>
          <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.28)", maxWidth: 360 }}>
            Fragrance and body care, paired and ready. Versace, Calvin Klein, Marc Jacobs, Dior, and more. Men's and Women's.
          </p>
          <div style={{ fontFamily: "var(--font-mono-ibm),ui-monospace,monospace", fontSize: 9, fontWeight: 300, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", display: "flex", alignItems: "center", gap: 14 }}>
            Browse Sets
            <div style={{ height: 1, width: 22, background: "currentColor" }} />
          </div>
        </Link>
      </div>

      {/* FEATURED */}
      {featuredItems.length > 0 && (
        <section style={{ borderTop: S.border }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "100px 72px" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: S.border, paddingBottom: 24, marginBottom: 48 }}>
                <p style={S.monoLabel}>Available Now</p>
                <Link href="/watches" style={{ ...S.monoLabel, fontSize: 8 }}>All Pieces</Link>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {featuredItems.map((item, i) => (
                <Reveal key={item._id} delay={i * 0.06}>
                  <Link href={`/${item.kind === "watch" ? "watches" : "fragrance"}/${item.slug}`} style={{ display: "block" }}>
                    <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#0D0D0D" }}>
                      {item.photos?.[0] && (
                        <Image src={urlForImage(item.photos[0] as any).width(600).height(600).url()} alt={`${item.brand} ${item.model || item.name}`} fill sizes="25vw" style={{ objectFit: "cover" }} />
                      )}
                    </div>
                    <div style={{ marginTop: 14, paddingLeft: 12, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                      <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(200,168,75,0.6)" }}>{item.brand}</p>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 400, color: "#fff", lineHeight: 1.2 }}>{item.model || item.name}</h3>
                      <p style={{ fontFamily: "monospace", fontSize: 12, color: "#C8A84B", marginTop: 4 }}>{formatPrice(item.price)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section style={{ borderTop: S.border }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "120px 72px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 64 }}>
              <span style={S.monoLabel}>What People Say</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,0.05)" }}>
            {[
              { quote: "Great and enthusiastic seller. Watches are in super good condition and exceeded my expectations.", author: "Jatanats" },
              { quote: "Bought a beautiful watch at a great price. Got my package right away. Will definitely be buying more.", author: "jem_mint10" },
              { quote: "Great seller and even better friend. Always a good experience and someone you can trust.", author: "pghplan91" },
            ].map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div style={{ background: "#080808", padding: "44px 36px" }}>
                  <p style={{ color: "#C8A84B", fontSize: 11, letterSpacing: 3, marginBottom: 20 }}>★★★★★</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontStyle: "italic", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.62)" }}>"{t.quote}"</p>
                  <p style={{ ...S.monoLabel, fontSize: 8, marginTop: 24 }}>{t.author}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: S.border, background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "160px 72px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200,168,75,0.05), transparent 65%)", pointerEvents: "none" }} />
        <Reveal>
          <svg style={{ width: 56, height: 56, opacity: 0.32, margin: "0 auto 28px" }} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="47" stroke="#C8A84B" strokeWidth="0.7"/>
            <circle cx="50" cy="50" r="40" stroke="#C8A84B" strokeWidth="0.35"/>
            <text x="31" y="68" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="31" fontWeight="400" fill="#C8A84B">E</text>
            <text x="19" y="70" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="44" fontWeight="400" fill="#C8A84B">I</text>
          </svg>
          <p style={{ ...S.monoLabel, position: "relative", zIndex: 1 }}>By Inquiry Only</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.4rem,4.5vw,4.4rem)", fontWeight: 300, lineHeight: 1.1, color: "#fff", maxWidth: 680, margin: "18px auto 0", position: "relative", zIndex: 1 }}>
            Every sale begins<br />with a conversation.
          </h2>
          <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.95, color: "rgba(255,255,255,0.32)", maxWidth: 440, margin: "20px auto 0", position: "relative", zIndex: 1 }}>
            No cart. No checkout. Reach out and Ramon responds personally. He'll walk you through the piece, answer your questions, and take care of everything from there.
          </p>
          <div style={{ marginTop: 48, position: "relative", zIndex: 1 }}>
            <ContactBar />
          </div>
        </Reveal>
      </section>
    </>
  );
}
