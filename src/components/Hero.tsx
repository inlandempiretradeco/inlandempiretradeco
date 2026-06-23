"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

function HeroSeal() {
  return (
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <circle cx="50" cy="50" r="47"   stroke="#C8A84B" strokeWidth="0.6"  opacity="0.5"/>
      <circle cx="50" cy="50" r="44"   stroke="#C8A84B" strokeWidth="0.22" opacity="0.18"/>
      <circle cx="50" cy="50" r="40"   stroke="#C8A84B" strokeWidth="0.45" opacity="0.28"/>
      <g stroke="#C8A84B" strokeWidth="0.65" opacity="0.4">
        <line x1="50" y1="3"    x2="50"  y2="8.5" />
        <line x1="50" y1="91.5" x2="50"  y2="97"  />
        <line x1="3"  y1="50"   x2="8.5" y2="50"  />
        <line x1="91.5" y1="50" x2="97"  y2="50"  />
        <line x1="17" y1="12"   x2="20.5" y2="18.1"/>
        <line x1="83" y1="12"   x2="79.5" y2="18.1"/>
        <line x1="17" y1="88"   x2="20.5" y2="81.9"/>
        <line x1="83" y1="88"   x2="79.5" y2="81.9"/>
      </g>
      <defs>
        <path id="hta2" d="M9,50 a41,41 0 1,1 82,0" fill="none"/>
        <path id="hba2" d="M18,64 a35,35 0 0,0 64,0" fill="none"/>
      </defs>
      <text fontFamily="var(--font-mono-ibm),ui-monospace,monospace" fontSize="7.6" fill="#C8A84B" opacity="0.82" letterSpacing="4.3">
        <textPath href="#hta2" startOffset="8.5%">INLAND EMPIRE</textPath>
      </text>
      <text fontFamily="var(--font-mono-ibm),ui-monospace,monospace" fontSize="6.5" fill="#C8A84B" opacity="0.72" letterSpacing="3.4">
        <textPath href="#hba2" startOffset="13.5%">TRADING CO.</textPath>
      </text>
      <text x="8.5" y="52"  fontSize="5.5" fill="#C8A84B" opacity="0.48">◆</text>
      <text x="84"  y="52"  fontSize="5.5" fill="#C8A84B" opacity="0.48">◆</text>
      {/* E behind, I in front — centered */}
      <text x="40" y="68" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="33" fontWeight="400" fill="#C8A84B" opacity="0.88">E</text>
      <text x="34" y="70" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="46" fontWeight="400" fill="#C8A84B" opacity="0.94">I</text>
      <path d="M22 80 Q31 89 47 85.5 Q56 83 53.5 78.5" stroke="#C8A84B" strokeWidth="1.1" fill="none" opacity="0.46" strokeLinecap="round"/>
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ease   = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]" style={{ minHeight: "92vh" }}>

        {/* Left: editorial type */}
        <div className="relative z-10 flex flex-col justify-center px-6 pt-28 pb-16 lg:px-[72px] lg:pt-32 lg:pb-20">

          <motion.p
            className="font-mono text-[9px] font-light tracking-[0.44em] uppercase text-[#C8A84B]/65 mb-7"
            initial={reduce ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            Medical Lake, Washington
          </motion.p>

          <h1 className="font-display font-light text-white" style={{ fontSize: "clamp(3.8rem,10vw,9rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            <motion.span className="block"
              initial={reduce ? {} : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}>Fine</motion.span>
            <motion.span className="block"
              initial={reduce ? {} : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.72, ease }}>Watches</motion.span>
            <motion.span className="block italic text-white/55"
              initial={reduce ? {} : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.94, ease }}>&amp; Fragrance.</motion.span>
          </h1>

          <motion.div className="w-10 h-px bg-white/15 my-7"
            initial={reduce ? {} : { opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1.1, ease }} />

          <motion.p
            className="text-[15px] font-light leading-[1.9] text-white/50 max-w-[360px]"
            initial={reduce ? {} : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
          >
            New and consignment timepieces. Distinguished fragrance and gift sets. Ships anywhere in the US. Priced for every budget.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 mt-9"
            initial={reduce ? {} : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35, ease }}>
            <Link href="/watches"
              className="font-mono text-[9.5px] font-normal tracking-[0.26em] uppercase px-9 py-4 text-center transition-colors"
              style={{ background: "#C8A84B", border: "1px solid #C8A84B", color: "#080808" }}>
              View Watches
            </Link>
            <Link href="/fragrance"
              className="font-mono text-[9.5px] font-normal tracking-[0.26em] uppercase px-9 py-4 text-center transition-colors"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
              View Fragrance
            </Link>
          </motion.div>
        </div>

        {/* Right: seal — hidden on mobile */}
        <div className="hidden lg:flex relative items-center justify-center">
          <div className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%)" }} />
          <motion.div className="relative z-10 w-[280px] h-[280px]"
            initial={reduce ? {} : { opacity: 0, scale: 1.25, rotate: -8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.15, ease }}>
            <HeroSeal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
