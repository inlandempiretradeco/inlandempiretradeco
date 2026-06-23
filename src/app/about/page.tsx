import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ContactBar } from "@/components/ContactBar";

export const metadata: Metadata = {
  title: "About",
  description: "Inland Empire Trading Co. is a private dealer of fine watches and fragrance based in Medical Lake, Washington, founded by Ramon J. Guel.",
};

const border = { borderTop: "1px solid rgba(255,255,255,0.06)" } as const;
const mono = "font-mono text-[8.5px] font-light tracking-[0.42em] uppercase text-white/20";

export default function AboutPage() {
  return (
    <div className="max-w-[1320px] mx-auto px-6 py-16 lg:px-[72px] lg:py-24">
      <Reveal>
        <p className={mono}>About</p>
        <h1 className="font-display font-light text-white mt-5 max-w-4xl" style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", lineHeight: 1.04 }}>
          A Watch and Fragrance Dealership for Everyone.
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[100px] mt-16 pt-12" style={border}>
        <Reveal>
          <div className="space-y-6">
            {[
              "We run a lean operation out of Medical Lake, Washington. No showroom. No staff. Just a carefully maintained inventory of watches and fragrance that Ramon sources, inspects, and ships himself.",
              "The range is honest: entry-level pieces starting around $25, investment-grade timepieces climbing past $3,000. New stock from authorized brand relationships alongside hand-picked consignment from private sellers.",
              "We ship anywhere in the United States, fully insured and carefully packed. If something arrives and it's not what you expected, you call and we fix it.",
            ].map((p, i) => (
              <p key={i} className="text-[16px] font-light leading-[2.05] text-white/42">{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="font-display text-[22px] italic font-light text-white/70 leading-[1.5] mb-8">
            "My goal is simple: find pieces worth having and make them available to people who appreciate them. Every budget, every taste."
          </p>
          <p className="font-display text-[20px] italic text-white/65">Ramon J. Guel, MBA</p>
          <p className={`${mono} mt-2`}>Founder</p>

          <div className="mt-12 pt-10" style={border}>
            <p className={mono}>Reach Us</p>
            <div className="mt-5"><ContactBar variant="compact" /></div>
            <div className="mt-6 space-y-1">
              <p className="text-[13px] font-light text-white/28">322 E Grace St #362</p>
              <p className="text-[13px] font-light text-white/28">Medical Lake, WA 99022</p>
              <a href="mailto:sales@inlandempiretradingco.com" className="block text-[13px] font-light text-white/28 hover:text-white/60 transition-colors">
                sales@inlandempiretradingco.com
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
