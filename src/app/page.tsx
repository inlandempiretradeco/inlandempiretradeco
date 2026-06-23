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

// Shared style tokens
const mono  = "font-mono text-[8.5px] font-light tracking-[0.42em] uppercase text-white/35";
const body  = "text-[15px] font-light leading-[2] text-white/55";
const bdr   = { borderTop: "1px solid rgba(255,255,255,0.06)" } as const;

export default async function HomePage() {
  let featured: { watches: FeaturedItem[]; fragrance: FeaturedItem[] } = { watches: [], fragrance: [] };
  try { featured = await client.fetch(featuredItemsQuery, {}, { next: { revalidate } }); } catch {}
  const featuredItems = [...(featured.watches ?? []), ...(featured.fragrance ?? [])].slice(0, 4);

  return (
    <>
      <Hero />

      {/* ── MANIFESTO ──────────────────────────────────────── */}
      <section style={bdr}>
        <div className="max-w-[1320px] mx-auto px-6 py-16 lg:px-[72px] lg:py-32
                        grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-24">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className={mono}>The Operation</p>
              <h2 className="font-display font-light text-white mt-4"
                style={{ fontSize: "clamp(1.9rem,3.2vw,3rem)", lineHeight: 1.14 }}>
                Not a store.<br />A private<br />dealership.
              </h2>
              <div className="w-8 h-px bg-white/15 mt-7" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5">
              <p className={body}>
                We run a lean operation out of Medical Lake, Washington. No showroom. No staff. Just a{" "}
                <strong className="font-normal text-white/80">carefully maintained inventory of watches and fragrance</strong>{" "}
                we source, inspect, and ship ourselves.
              </p>
              <p className={body}>
                The range spans everything — a first watch for a teenager, a grail piece for a seasoned collector, a signature fragrance for any occasion.
                New stock from authorized brand relationships alongside hand-picked consignment from private sellers.
                Whatever the price, every piece gets the same attention before it goes up.
              </p>
              <p className={body}>
                We{" "}
                <strong className="font-normal text-white/80">ship anywhere in the United States</strong>,
                fully insured and carefully packed. If something arrives and it's not right, you call and we fix it.
              </p>
              <p className={body}>
                If you have a question about a piece, call or text. You reach a real person, not a bot.
              </p>
              <div className="pt-8 mt-8" style={bdr}>
                <p className="font-display text-[20px] italic font-light text-white/68">Ramon J. Guel, MBA</p>
                <p className={`${mono} mt-2`}>Founder, Inland Empire Trading Co.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LOGISTICS ──────────────────────────────────────── */}
      <div style={{ ...bdr, borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0A0A0A" }}>
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 1, background: "rgba(255,255,255,0.05)" }}>
            {[
              { n: "01", title: "Ships Nationwide",
                body: "We ship to all 50 states. Every order is carefully packed and fully insured. Watches ship with tracking and signature confirmation." },
              { n: "02", title: "Every Budget",
                body: "From a first watch to a grail piece. New from authorized brands and pre-owned from private sellers. Whatever the occasion, we can find the right piece." },
              { n: "03", title: "Personal Service",
                body: "Call, text, or email and you reach us directly — not a support ticket. We respond personally to every inquiry." },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.1}>
                <div className="bg-[#0A0A0A] px-8 py-12 lg:px-11 lg:py-14">
                  <p className="font-mono text-[8px] font-light tracking-[0.4em] uppercase text-[#C8A84B]/45 mb-4">{item.n}</p>
                  <h3 className="font-display text-[22px] font-light text-white mb-3">{item.title}</h3>
                  <p className="text-[13px] font-light leading-[1.85] text-white/45">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── COLLECTION ─────────────────────────────────────── */}
      <div style={bdr}>
        <div className="max-w-[1320px] mx-auto px-6 py-5 lg:px-[72px] flex items-center justify-between">
          <span className={mono}>The Collection</span>
          <span className={`${mono} hidden sm:block`}>Watches · Fragrance · Gift Sets</span>
        </div>

        {/* Main panels */}
        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr]" style={bdr}>
          {[
            { href: "/watches",   num: "I",  ghost: "W", title: "Timepieces",
              body: "New from authorized brands and consignment from private sellers. Automatic, quartz, and manual. Inspected before listing." },
            { href: "/fragrance", num: "II", ghost: "F", title: "Scent",
              body: "Cologne and perfume from Creed, Tom Ford, Dior, Versace, Byredo, and more. EDT, EDP, and Parfum. Ships nationwide." },
          ].map((panel, i) => (
            <Link key={panel.href} href={panel.href}
              className="relative flex flex-col justify-end overflow-hidden cursor-pointer transition-colors duration-500 group"
              style={{
                minHeight: "70vh", padding: "48px 40px",
                background: i === 0 ? "#080808" : "#0C0C0C",
                borderRight:  i === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                borderTop:    i === 1 ? "1px solid rgba(255,255,255,0.06)" : undefined,
              }}
            >
              {/* Ghost letter */}
              <span aria-hidden="true"
                className="absolute top-[-0.1em] left-[-0.02em] font-display font-light leading-none
                           pointer-events-none select-none whitespace-nowrap text-white/[0.028]
                           group-hover:text-white/[0.045] transition-colors duration-500"
                style={{ fontSize: "clamp(120px,26vw,380px)" }}>
                {panel.ghost}
              </span>
              {/* Corner brackets */}
              <span className="absolute top-6 left-6 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-350"
                style={{ borderTop: "1px solid #C8A84B", borderLeft: "1px solid #C8A84B" }} />
              <span className="absolute bottom-6 right-6 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-350"
                style={{ borderBottom: "1px solid #C8A84B", borderRight: "1px solid #C8A84B" }} />
              <div className="relative z-10">
                <p className={`${mono} mb-4`}>{panel.num} / {i === 0 ? "Watches" : "Fragrance"}</p>
                <h2 className="font-display font-light text-white leading-[0.93]"
                  style={{ fontSize: "clamp(2.6rem,5vw,4.8rem)" }}>
                  {panel.title}
                </h2>
                <p className="text-[13px] font-light leading-[1.85] text-white/40 mt-4 max-w-[280px]">{panel.body}</p>
                <div className="flex items-center gap-3 mt-8 font-mono text-[9px] font-light tracking-[0.36em] uppercase text-white/45
                                group-hover:text-white/80 transition-colors duration-300">
                  <div className="h-px w-6 bg-current transition-all duration-400 group-hover:w-10" />
                  Browse Collection
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Gift Sets strip */}
        <Link href="/gift-sets"
          className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6
                     px-6 py-10 lg:px-[72px] lg:py-[52px] transition-colors"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0A0A0A" }}
        >
          <div className="flex items-center gap-10">
            <span className={mono}>III</span>
            <h3 className="font-display font-light text-white"
              style={{ fontSize: "clamp(1.8rem,3.2vw,3rem)" }}>Gift Sets</h3>
          </div>
          <p className="text-[13px] font-light leading-[1.8] text-white/40 max-w-[360px]">
            Fragrance and body care, paired and ready. Versace, Calvin Klein, Marc Jacobs, Dior, and more.
          </p>
          <div className="flex items-center gap-3 font-mono text-[9px] font-light tracking-[0.3em] uppercase
                          text-white/35 whitespace-nowrap group-hover:text-white/70 transition-colors">
            Browse Sets <div className="h-px w-5 bg-current" />
          </div>
        </Link>
      </div>

      {/* ── FEATURED ───────────────────────────────────────── */}
      {featuredItems.length > 0 && (
        <section style={bdr}>
          <div className="max-w-[1320px] mx-auto px-6 py-14 lg:px-[72px] lg:py-20">
            <Reveal>
              <div className="flex items-baseline justify-between pb-5 mb-10" style={bdr}>
                <p className={mono}>Available Now</p>
                <Link href="/watches" className={`${mono} text-[8px]`}>All Pieces</Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredItems.map((item, i) => (
                <Reveal key={item._id} delay={i * 0.06}>
                  <Link href={`/${item.kind === "watch" ? "watches" : "fragrance"}/${item.slug}`} className="block group">
                    <div className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
                      {item.photos?.[0] && (
                        <Image
                          src={urlForImage(item.photos[0] as any).width(600).height(600).url()}
                          alt={`${item.brand} ${item.model || item.name}`}
                          fill sizes="(min-width:1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <div className="mt-3 pl-3" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                      <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-[#C8A84B]/65">{item.brand}</p>
                      <h3 className="font-display text-[17px] font-light text-white leading-tight">{item.model || item.name}</h3>
                      <p className="font-mono text-[12px] text-[#C8A84B] mt-1">{formatPrice(item.price)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section style={bdr}>
        <div className="max-w-[1320px] mx-auto px-6 py-14 lg:px-[72px] lg:py-[110px]">
          <Reveal>
            <div className="flex items-center gap-6 mb-14">
              <p className={mono}>What People Say</p>
              <div className="flex-1 h-px bg-white/6" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { quote: "Great and enthusiastic seller. Watches are in super good condition and exceeded my expectations.", author: "Jatanats" },
              { quote: "Bought a beautiful watch at a great price. Got my package right away. Will definitely be buying more.", author: "jem_mint10" },
              { quote: "Great seller and even better friend. Always a good experience and someone you can trust.", author: "pghplan91" },
            ].map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div className="bg-[#080808] p-8 lg:p-10">
                  <p className="text-[#C8A84B] text-[11px] tracking-[3px] mb-5">★★★★★</p>
                  <p className="font-display text-[17px] italic font-light leading-[1.7] text-white/65">"{t.quote}"</p>
                  <p className={`${mono} mt-6`}>{t.author}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex flex-col items-center text-center
                          px-6 py-20 lg:py-36 bg-[#0A0A0A]" style={bdr}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200,168,75,0.05), transparent 65%)" }} />
        <Reveal>
          <svg className="w-12 h-12 opacity-30 mx-auto mb-6" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="47" stroke="#C8A84B" strokeWidth="0.7"/>
            <circle cx="50" cy="50" r="40" stroke="#C8A84B" strokeWidth="0.35"/>
            <text x="40" y="68" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="31" fontWeight="400" fill="#C8A84B">E</text>
            <text x="34" y="70" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="46" fontWeight="400" fill="#C8A84B">I</text>
          </svg>
          <p className={mono}>By Inquiry Only</p>
          <h2 className="font-display font-light text-white max-w-[640px] mx-auto mt-4"
            style={{ fontSize: "clamp(2rem,4.5vw,4rem)", lineHeight: 1.1 }}>
            Every sale begins<br />with a conversation.
          </h2>
          <p className="text-[15px] font-light leading-[1.95] text-white/45 max-w-[420px] mx-auto mt-5">
            No cart. No checkout. Reach out and we respond personally —
            with full details on the piece and how to make it yours.
          </p>
          <div className="mt-10">
            <ContactBar />
          </div>
        </Reveal>
      </section>
    </>
  );
}
