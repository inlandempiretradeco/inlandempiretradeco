import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"], weight: ["300","400","500"],
  style: ["normal","italic"], variable: "--font-cormorant", display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"], weight: ["300","400"],
  variable: "--font-mono-ibm", display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.inlandempiretradingco.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Inland Empire Trading Co. | Watches & Fragrance", template: "%s | Inland Empire Trading Co." },
  description: "A private dealer of fine watches, fragrance, and gift sets. New and consignment. Ships anywhere in the US. Based in Medical Lake, WA.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <LocalBusinessSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
