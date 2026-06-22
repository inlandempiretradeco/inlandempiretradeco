"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/** Full-detail seal SVG used in the hero — includes circular text, tick marks, IE monogram. */
function HeroSeal() {
  return (
    <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
      <circle cx="50" cy="50" r="47"   stroke="#C8A84B" strokeWidth="0.6"  opacity="0.5" />
      <circle cx="50" cy="50" r="44"   stroke="#C8A84B" strokeWidth="0.22" opacity="0.18" />
      <circle cx="50" cy="50" r="40"   stroke="#C8A84B" strokeWidth="0.45" opacity="0.28" />

      {/* 12 tick marks */}
      <g stroke="#C8A84B" strokeWidth="0.65" opacity="0.4">
        <line x1="50"  y1="3"    x2="50"  y2="8.5"  />
        <line x1="50"  y1="91.5" x2="50"  y2="97"   />
        <line x1="3"   y1="50"   x2="8.5" y2="50"   />
        <line x1="91.5"y1="50"   x2="97"  y2="50"   />
        <line x1="17"  y1="12"   x2="20.5"y2="18.1" />
        <line x1="83"  y1="12"   x2="79.5"y2="18.1" />
        <line x1="17"  y1="88"   x2="20.5"y2="81.9" />
        <line x1="83"  y1="88"   x2="79.5"y2="81.9" />
        <line x1="11.7"y1="28.5" x2="17.2"y2="31.4" />
        <line x1="88.3"y1="28.5" x2="82.8"y2="31.4" />
        <line x1="11.7"y1="71.5" x2="17.2"y2="68.6" />
        <line x1="88.3"y1="71.5" x2="82.8"y2="68.6" />
      </g>

      <defs>
        <path id="hta" d="M9,50 a41,41 0 1,1 82,0" fill="none" />
        <path id="hba" d="M18,64 a35,35 0 0,0 64,0" fill="none" />
      </defs>
      <text fontFamily="var(--font-mono-ibm), ui-monospace, monospace" fontSize="7.6" fill="#C8A84B" opacity="0.82" letterSpacing="4.3">
        <textPath href="#hta" startOffset="8.5%">INLAND EMPIRE</textPath>
      </text>
      <text fontFamily="var(--font-mono-ibm), ui-monospace, monospace" fontSize="6.5" fill="#C8A84B" opacity="0.72" letterSpacing="3.4">
        <textPath href="#hba" startOffset="13.5%">TRADING CO.</textPath>
      </text>

      <text x="8.5" y="52"  fontSize="5.5" fill="#C8A84B" opacity="0.48">◆</text>
      <text x="84"  y="52"  fontSize="5.5" fill="#C8A84B" opacity="0.48">◆</text>

      {/* E behind, I in front */}
      <text x="31" y="68" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="33" fontWeight="400" fill="#C8A84B" opacity="0.9">E</text>
      <text x="19" y="70" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="46" fontWeight="400" fill="#C8A84B" opacity="0.95">I</text>

      <path d="M18 80 Q28 89.5 46 85.5 Q56 83 53.5 78" stroke="#C8A84B" strokeWidth="1.1" fill="none" opacity="0.48" strokeLinecap="round" />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "55fr 45fr",
        overflow: "hidden",
      }}
    >
      {/* Left: editorial type stack */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 72px 88px" }}>

        <motion.p
          style={{ fontFamily: "var(--font-mono-ibm), ui-monospace, monospace", fontSize: 9, fontWeight: 300, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(200,168,75,0.65)", marginBottom: 32 }}
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          Medical Lake, Washington
        </motion.p>

        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(4rem, 10vw, 9rem)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#fff" }}>
          <motion.span
            style={{ display: "block" }}
            initial={reduce ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
          >Fine</motion.span>
          <motion.span
            style={{ display: "block" }}
            initial={reduce ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.72, ease }}
          >Watches</motion.span>
          <motion.span
            style={{ display: "block", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.58)" }}
            initial={reduce ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.94, ease }}
          >&amp; Fragrance.</motion.span>
        </h1>

        <motion.div
          style={{ width: 44, height: 1, background: "rgba(255,255,255,0.12)", margin: "36px 0 28px" }}
          initial={reduce ? {} : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.15, ease }}
        />

        <motion.p
          style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "rgba(255,255,255,0.36)", maxWidth: 340 }}
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25, ease }}
        >
          New and consignment timepieces. Distinguished fragrance and gift sets. Ships anywhere in the US. Priced for every budget.
        </motion.p>

        <motion.div
          style={{ display: "flex", gap: 12, marginTop: 40 }}
          initial={reduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.42, ease }}
        >
          <Link href="/watches" style={{ fontFamily: "var(--font-mono-ibm), ui-monospace, monospace", fontSize: 9.5, fontWeight: 400, letterSpacing: "0.26em", textTransform: "uppercase", padding: "15px 36px", background: "#C8A84B", border: "1px solid #C8A84B", color: "#080808", transition: "background 0.25s" }}>
            View Watches
          </Link>
          <Link href="/fragrance" style={{ fontFamily: "var(--font-mono-ibm), ui-monospace, monospace", fontSize: 9.5, fontWeight: 400, letterSpacing: "0.26em", textTransform: "uppercase", padding: "15px 36px", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", transition: "border-color 0.25s" }}>
            View Fragrance
          </Link>
        </motion.div>
      </div>

      {/* Right: animated seal */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <motion.div
          style={{ position: "relative", zIndex: 2, width: 300, height: 300 }}
          initial={reduce ? {} : { opacity: 0, scale: 1.3, rotate: -10, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.15, ease }}
        >
          <HeroSeal />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }} />
        <span style={{ fontFamily: "monospace", fontSize: 7.5, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", writingMode: "vertical-lr" }}>Scroll</span>
      </motion.div>
    </section>
  );
}
