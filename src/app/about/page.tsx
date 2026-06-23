import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ContactBar } from "@/components/ContactBar";

export const metadata: Metadata = {
  title: "About",
  description: "Inland Empire Trading Co. is a private dealer of fine watches and fragrance based in Medical Lake, Washington, founded by Ramon J. Guel.",
};

const bdr = { borderTop: "1px solid rgba(255,255,255,0.06)" } as const;
const mono = "font-mono text-[8.5px] font-light tracking-[0.42em] uppercase text-white/35";
const body = "text-[16px] font-light leading-[2.05] text-white/55";

export default function AboutPage() {
  return (
    <div className="max-w-[1320px] mx-auto px-6 py-16 lg:px-[72px] lg:py-24">
      <Reveal>
        <p className={mono}>About</p>
        <h1 className="font-display font-light text-white mt-5 max-w-4xl"
          style={{ fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: 1.04 }}>
          A Watch and Fragrance Dealership for Everyone.
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-14 pt-12" style={bdr}>
        <Reveal>
          <div className="space-y-5">
            <p className={body}>
              We run a lean operation out of Medical Lake, Washington. No showroom. No staff.
              Just a carefully maintained inventory of watches and fragrance that we source,
              inspect, and ship ourselves.
            </p>
            <p className={body}>
              The range spans everything — a first watch for a teenager, a grail piece for a serious collector, a signature scent for any occasion. New stock from authorized brand relationships alongside hand-picked consignment from private sellers.
            </p>
            <p className={body}>
              We ship anywhere in the United States, fully insured and carefully packed.
              If something arrives and it's not right, you call and we fix it.
            </p>
            <p className={body}>
              Every inquiry gets a personal response. No bots, no scripted replies —
              just a real conversation about the piece you're interested in.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="font-display text-[21px] italic font-light text-white/68 leading-[1.55] mb-8">
            "My goal is simple: find pieces worth having and make them available to people
            who appreciate them. Every budget, every taste."
          </p>
          <p className="font-display text-[20px] italic text-white/65">Ramon J. Guel, MBA</p>
          <p className={`${mono} mt-2`}>Founder</p>

          <div className="mt-10 pt-9" style={bdr}>
            <p className={mono}>Reach Us</p>
            <div className="mt-5"><ContactBar variant="compact" /></div>
            <div className="mt-5 space-y-1.5">
              <p className="text-[13px] font-light text-white/40">322 E Grace St #362</p>
              <p className="text-[13px] font-light text-white/40">Medical Lake, WA 99022</p>
              <a href="mailto:sales@inlandempiretradingco.com"
                className="block text-[13px] font-light text-white/40 hover:text-white/70 transition-colors">
                sales@inlandempiretradingco.com
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
