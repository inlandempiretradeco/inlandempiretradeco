"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Seal } from "@/components/Seal";

export function Hero() {
  const reduce = useReducedMotion();
  const ease   = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]" style={{ minHeight: "92vh" }}>

        {/* ── Left: type ── */}
        <div className="relative z-10 flex flex-col justify-center
                        px-6 pt-28 pb-14 lg:px-[72px] lg:pt-32 lg:pb-20">

          <motion.p
            className="font-mono text-[9px] font-light tracking-[0.44em] uppercase text-[#C8A84B]/65 mb-7"
            initial={reduce ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            Medical Lake, Washington
          </motion.p>

          <h1 className="font-display font-light text-white"
            style={{ fontSize: "clamp(3.8rem,10vw,9rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
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
            className="text-[15px] font-light leading-[1.9] text-white/52 max-w-[360px]"
            initial={reduce ? {} : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
          >
            New and consignment timepieces. Distinguished fragrance and gift sets.
            Ships anywhere in the US. First watch or fortieth — we can help.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 mt-9"
            initial={reduce ? {} : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35, ease }}>
            <Link href="/watches"
              className="font-mono text-[9.5px] font-normal tracking-[0.26em] uppercase
                         px-9 py-4 text-center transition-colors"
              style={{ background: "#C8A84B", border: "1px solid #C8A84B", color: "#080808" }}>
              View Watches
            </Link>
            <Link href="/fragrance"
              className="font-mono text-[9.5px] font-normal tracking-[0.26em] uppercase
                         px-9 py-4 text-center transition-colors"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
              View Fragrance
            </Link>
          </motion.div>
        </div>

        {/* ── Right: seal ── */}
        <div className="hidden lg:flex relative items-center justify-center">
          {/* Ambient glow */}
          <div className="absolute rounded-full pointer-events-none"
            style={{
              width: 480, height: 480,
              background: "radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%)",
            }}
          />
          <motion.div
            className="relative z-10"
            initial={reduce ? {} : { opacity: 0, scale: 1.25, rotate: -8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.15, ease }}
          >
            <Seal size={300} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
