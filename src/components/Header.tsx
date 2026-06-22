"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+15099517165";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "(509) 951-7165";

const NAV = [
  { href: "/watches",   label: "Watches"   },
  { href: "/fragrance", label: "Fragrance" },
  { href: "/gift-sets", label: "Gift Sets" },
  { href: "/about",     label: "About"     },
];

const S = {
  navLink: {
    fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
    fontSize: 9.5,
    fontWeight: 300,
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    transition: "color 0.2s",
  },
  phone: {
    fontFamily: "var(--font-mono-ibm), ui-monospace, monospace",
    fontSize: 9.5,
    fontWeight: 300,
    letterSpacing: "0.26em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.25)",
    transition: "color 0.2s",
  },
} as const;

export function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          inset: "0 0 auto",
          zIndex: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 52px",
          height: 74,
          transition: "background 0.5s, border-color 0.5s",
          borderBottom: "1px solid",
          borderColor: scrolled ? "rgba(255,255,255,0.06)" : "transparent",
          background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center" style={{ gap: 40 }}>
          {NAV.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  ...S.navLink,
                  color: active ? "#C8A84B" : "rgba(255,255,255,0.42)",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = active ? "#C8A84B" : "rgba(255,255,255,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = active ? "#C8A84B" : "rgba(255,255,255,0.42)")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <a
          href={`tel:${PHONE}`}
          className="hidden lg:block"
          style={S.phone}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
        >
          {PHONE_DISPLAY}
        </a>

        {/* Hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="flex lg:hidden flex-col items-center justify-center"
          style={{ width: 40, height: 40, gap: 5 }}
        >
          <span style={{ height: 1, width: 24, background: "#C8A84B", transition: "all 0.3s", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ height: 1, width: 16, background: "#C8A84B", transition: "all 0.3s", opacity: open ? 0 : 1, alignSelf: "flex-start", marginLeft: 4 }} />
          <span style={{ height: 1, width: 24, background: "#C8A84B", transition: "all 0.3s", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 700,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
        }}
        className="lg:hidden"
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "absolute", inset: 0,
            background: "rgba(8,8,8,0.85)",
            backdropFilter: "blur(8px)",
            transition: "opacity 0.35s",
            opacity: open ? 1 : 0,
          }}
        />

        {/* Panel */}
        <nav
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: 280,
            background: "#080808",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            display: "flex", flexDirection: "column",
            paddingTop: 96, paddingBottom: 48, paddingLeft: 36, paddingRight: 36,
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            transform: open ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {NAV.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 30,
                fontWeight: 300,
                color: "#fff",
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transition: `all 0.3s ${i * 0.06}s`,
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateX(16px)",
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ marginTop: "auto", paddingTop: 32 }}>
            <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
              Reach Us
            </p>
            <a href={`tel:${PHONE}`} style={{ color: "#C8A84B", fontSize: 14, fontFamily: "monospace" }}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ height: 74 }} aria-hidden="true" />
    </>
  );
}
