"use client";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const EMAIL        = process.env.NEXT_PUBLIC_BUSINESS_EMAIL        || "sales@inlandempiretradingco.com";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "(509) 951-7165";
const PHONE        = process.env.NEXT_PUBLIC_BUSINESS_PHONE        || "+15099517165";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#080808" }}>
      <div className="max-w-[1320px] mx-auto px-6 pt-14 pb-10 lg:px-[72px] lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-[72px]">

          <div className="col-span-2 lg:col-span-1">
            <Logo variant="footer" />
            <p className="text-[13px] font-light leading-[2] text-white/22 max-w-[240px] mt-6">
              From a first watch to a grail piece. Fragrance and gift sets for every occasion. Ships to all 50 states.
            </p>
          </div>

          <div>
            <p className="font-mono text-[7.5px] font-light tracking-[0.4em] uppercase text-white/18 mb-5">Catalog</p>
            {[{href:"/watches",text:"Watches"},{href:"/fragrance",text:"Fragrance"},{href:"/gift-sets",text:"Gift Sets"},{href:"/brands",text:"Brands"},{href:"/about",text:"About"}].map(l => (
              <Link key={l.href} href={l.href} className="block text-[13px] font-light text-white/32 mb-3 hover:text-white/75 transition-colors">{l.text}</Link>
            ))}
          </div>

          <div>
            <p className="font-mono text-[7.5px] font-light tracking-[0.4em] uppercase text-white/18 mb-5">Contact</p>
            <a href={`tel:${PHONE}`} className="block text-[13px] font-light text-white/32 mb-3 hover:text-[#C8A84B] transition-colors">{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`} className="block text-[12px] font-light text-white/32 mb-3 hover:text-[#C8A84B] transition-colors break-all">{EMAIL}</a>
            <p className="text-[12px] font-light leading-[1.9] text-white/18">322 E Grace St #362<br/>Medical Lake, WA 99022</p>
          </div>

          <div>
            <p className="font-mono text-[7.5px] font-light tracking-[0.4em] uppercase text-white/18 mb-5">Follow</p>
            {[
              {href:"https://www.instagram.com/inlandempiretc/",text:"Instagram"},
              {href:"https://www.facebook.com/profile.php?id=61590087723571",text:"Facebook"},
              {href:"https://www.tiktok.com/@ramon.guel",text:"TikTok"},
            ].map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="block text-[13px] font-light text-white/32 mb-3 hover:text-white/75 transition-colors">{l.text}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1320px] mx-auto px-6 py-5 lg:px-[72px]" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="font-mono text-[8px] font-light tracking-[0.24em] uppercase text-white/12">
          {new Date().getFullYear()} Inland Empire Trading Co. · Founded by Ramon J. Guel, MBA · Medical Lake, WA
        </p>
      </div>
    </footer>
  );
}
