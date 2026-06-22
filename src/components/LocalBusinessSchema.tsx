export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: "Inland Empire Trading Co.",
    description: "A private dealer of fine new and consignment watches, fragrance, and gift sets.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.inlandempiretradingco.com",
    telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+15099517165",
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "sales@inlandempiretradingco.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "322 E Grace St #362",
      addressLocality: "Medical Lake",
      addressRegion: "WA",
      postalCode: "99022",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.instagram.com/inlandempiretc/",
      "https://www.facebook.com/profile.php?id=61590087723571",
      "https://www.tiktok.com/@ramon.guel",
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
