"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

function HeroSeal({ size = 300 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" width={size} height={size}>
      <circle cx="50" cy="50" r="47" stroke="#C8A84B" strokeWidth="0.6" opacity="0.5"/>
      <circle cx="50" cy="50" r="44" stroke="#C8A84B" strokeWidth="0.22" opacity="0.18"/>
      <circle cx="50" cy="50" r="40" stroke="#C8A84B" strokeWidth="0.45" opacity="0.28"/>
      <g stroke="#C8A84B" strokeWidth="0.65" opacity="0.4">
        <line x1="50" y1="3" x2="50" y2="8.5"/><line x1="50" y1="91.5" x2="50" y2="97"/>
        <line x1="3" y1="50" x2="8.5" y2="50"/><line x1="91.5" y1="50" x2="97" y2="50"/>
        <line x1="17" y1="12" x2="20.5" y2="18.1"/><line x1="83" y1="12" x2="79.5" y2="18.1"/>
        <line x1="17" y1="88" x2="20.5" y2="81.9"/><line x1="83" y1="88" x2="79.5" y2="81.9"/>
      </g>
      <defs>
        <path id="hta" d="M9,50 a41,41 0 1,1 82,0" fill="none"/>
        <path id="hba" d="M18,64 a35,35 0 0,0 64,0" fill="none"/>
      </defs>
      <text fontFamily="var(--font-mono-ibm),ui-monospace,monospace" fontSize="7.6" fill="#C8A84B" opacity="0.82" letterSpacing="4.3">
        <textPath href="#hta" startOffset="8.5%">INLAND EMPIRE</textPath>
      </text>
      <text fontFamily="var(--font-mono-ibm),ui-monospace,monospace" fontSize="6.5" fill="#C8A84B" opacity="0.72" letterSpacing="3.4">
        <textPath href="#hba" startOffset="13.5%">TRADING CO.</textPath>
      </text>
      <text x="8.5" y="52" fontSize="5.5" fill="#C8A84B" opacity="0.48">◆</text>
      <text x="84" y="52" fontSize="5.5" fill="#C8A84B" opacity="0.48">◆</text>
      <text x="31" y="68" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="33" fontWeight="400" fill="#C8A84B" opacity="0.9">E</text>
      <text x="19" y="70" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="46" fontWeight="400" fill="#C8A84B" opacity="0.95">I</text>
      <path d="M18 80 Q28 89.5 46 85.5 Q56 83 53.5 78" stroke="#C8A84B" strokeWidth="1.1" fill="none" opacity="0.48" strokeLinecap="round"/>
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Mobile: stacked. Desktop: side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-screen">

        {/* Left: type — always visible */}
        <div className="relative z-10 flex flex-col justify-end px-6 pb-16 pt-32 lg:px-[72px] lg:pb-[88px]">
          <motion.p className="font-mono text-[9px] font-light tracking-[0.44em] uppercase text-[#C8A84B]/65 mb-8"
            initial={reduce ? {} : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}>
            Medical Lake, Washington
          </motion.p>

          <h1 className="font-display font-light text-white" style={{ fontSize: "clamp(3.8rem,10vw,9rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            <motion.span className="block" initial={reduce ? {} : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease }}>Fine</motion.span>
            <motion.span className="block" initial={reduce ? {} : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.72, ease }}>Watches</motion.span>
            <motion.span className="block italic text-white/58" initial={reduce ? {} : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.94, ease }}>&amp; Fragrance.</motion.span>
          </h1>

          <motion.div className="w-11 h-px bg-white/12 my-8"
            initial={reduce ? {} : { opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1.15, ease }} />

          <motion.p className="text-[15px] font-light leading-[1.9] text-white/36 max-w-[340px]"
            initial={reduce ? {} : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25, ease }}>
            New and consignment timepieces. Distinguished fragrance and gift sets. Ships anywhere in the US. Priced for every budget.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 mt-10"
            initial={reduce ? {} : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.42, ease }}>
            <Link href="/watches" className="font-mono text-[9.5px] font-normal tracking-[0.26em] uppercase px-9 py-4 text-center transition-colors"
              style={{ background: "#C8A84B", border: "1px solid #C8A84B", color: "#080808" }}>
              View Watches
            </Link>
            <Link href="/fragrance" className="font-mono text-[9.5px] font-normal tracking-[0.26em] uppercase px-9 py-4 text-center transition-colors"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}>
              View Fragrance
            </Link>
          </motion.div>
        </div>

        {/* Right: seal — hidden on mobile, visible on lg */}
        <div className="hidden lg:flex relative items-center justify-center">
          <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%)" }} />
          <motion.div className="relative z-10"
            initial={reduce ? {} : { opacity: 0, scale: 1.3, rotate: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.15, ease }}>
            <HeroSeal />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint — desktop only */}
      <motion.div className="hidden lg:flex absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}>
        <div className="w-px h-11" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }} />
        <span className="font-mono text-[7.5px] tracking-[0.4em] uppercase text-white/18 [writing-mode:vertical-lr]">Scroll</span>
      </motion.div>
    </section>
  );
}
