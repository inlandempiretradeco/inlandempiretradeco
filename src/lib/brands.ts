/**
 * Brand data — editorial blurbs, slugs, and category assignments.
 * Brand pages live at /watches/brands/[brand] and /fragrance/brands/[brand].
 * Each page shows live inventory from Sanity + this editorial context.
 * Add a new brand here and a page is automatically created.
 */

export type BrandEntry = {
  slug: string;
  name: string;
  category: "watches" | "fragrance";
  blurb: string;
};

export const watchBrands: BrandEntry[] = [
  {
    slug: "omega",
    name: "Omega",
    category: "watches",
    blurb: "Founded in 1848 and worn on the moon in 1969. Omega's Seamaster and Speedmaster lines are two of the most respected references in horology — built for professional use, collected for life. Their movements are certified by METAS to a standard stricter than COSC.",
  },
  {
    slug: "rolex",
    name: "Rolex",
    category: "watches",
    blurb: "The benchmark since 1905. The Submariner, Daytona, GMT-Master, and Datejust are not just watches — they are proven stores of value that hold and appreciate over decades. Rolex controls every step of production in-house, which is why the standard never slips.",
  },
  {
    slug: "longines",
    name: "Longines",
    category: "watches",
    blurb: "Swiss precision since 1832. Longines makes a clear argument that elegance does not require extravagance. Their Heritage and Conquest collections offer genuine Swiss craftsmanship at price points that respect the buyer. One of the most decorated names in the industry.",
  },
  {
    slug: "tudor",
    name: "Tudor",
    category: "watches",
    blurb: "Rolex's sibling brand, built for buyers who want the DNA without the wait list. Tudor's Black Bay collection has earned its following on merit — not just because of the family connection. In-house movements, serious build quality, serious value.",
  },
  {
    slug: "frederique-constant",
    name: "Frederique Constant",
    category: "watches",
    blurb: "Geneva-based and independently minded. Frederique Constant produces in-house movements at accessible price points, making them a consistent choice among collectors who understand what's inside the case. Dress watches and complications done right.",
  },
  {
    slug: "seiko",
    name: "Seiko",
    category: "watches",
    blurb: "Few brands have done more for watchmaking at every price point. Seiko's entry-level pieces outperform the competition by every objective measure. Their Grand Seiko division competes directly with Swiss giants on finishing — and often wins.",
  },
  {
    slug: "movado",
    name: "Movado",
    category: "watches",
    blurb: "Known for the Museum dial — a single dot at 12, nothing else. Movado makes a bold design statement at mid-range prices. Their pieces reward people who value minimalism over complication, and who understand that restraint is its own kind of confidence.",
  },
  {
    slug: "citizen",
    name: "Citizen",
    category: "watches",
    blurb: "Citizen's Eco-Drive technology — solar-powered, never needs a battery — is one of the genuinely clever innovations in modern watchmaking. Reliable, precise, and well-built at their price point. Their Promaster and Chandler lines have real followings.",
  },
  {
    slug: "bulova",
    name: "Bulova",
    category: "watches",
    blurb: "An American institution since 1875. Bulova's Precisionist line uses a proprietary three-pronged tuning fork to achieve accuracy that rivals quartz movements costing far more. A brand with serious heritage that is currently undervalued.",
  },
  {
    slug: "invicta",
    name: "Invicta",
    category: "watches",
    blurb: "Bold, oversized, and unapologetically confident. Invicta built its following on delivering big watch energy at entry-level prices. The Pro Diver in particular has become a cult reference — a starting point for collectors who are just getting started.",
  },
];

export const fragranceBrands: BrandEntry[] = [
  {
    slug: "tom-ford",
    name: "Tom Ford",
    category: "fragrance",
    blurb: "Tom Ford's fragrance line is uncompromising. Private Blend and the main collection push concentration and complexity to places mass-market houses do not go. Noir de Noir, Tobacco Vanille, and Oud Wood have become modern classics. These are fragrances that make a statement the moment you enter a room.",
  },
  {
    slug: "creed",
    name: "Creed",
    category: "fragrance",
    blurb: "Founded in 1760, Creed is one of the oldest fragrance houses in the world. Aventus became a cultural touchstone for a reason — projection, longevity, and a complexity that rewards the nose over time. Their silver-top bottles are instantly recognizable to anyone who knows fragrance.",
  },
  {
    slug: "dior",
    name: "Dior",
    category: "fragrance",
    blurb: "Christian Dior's fragrance portfolio spans decades and price points without losing its identity. Sauvage is one of the best-selling men's fragrances globally for good reason. The La Collection Privée line goes deeper for those who want something more singular and less familiar.",
  },
  {
    slug: "versace",
    name: "Versace",
    category: "fragrance",
    blurb: "Versace fragrance is confident by design — bold projection, clear identity, and a price point that makes them genuinely accessible. Eros and Pour Homme have proven staying power over years in the market. The kind of fragrances that generate compliments.",
  },
  {
    slug: "byredo",
    name: "Byredo",
    category: "fragrance",
    blurb: "Swedish-born and deliberately quiet. Byredo does not advertise. Their fragrances — Gypsy Water, Bal d'Afrique, Mojave Ghost — build followings through merit and word of mouth alone. For buyers who know the niche world and want something that won't be on everyone else.",
  },
  {
    slug: "cartier",
    name: "Cartier",
    category: "fragrance",
    blurb: "The house of Cartier brings the same precision to fragrance that defines their jewelry and watches. Déclaration and Les Heures remain among the most refined offerings in men's and unisex perfumery. Understated in the best sense — quality that doesn't need to announce itself.",
  },
  {
    slug: "giorgio-armani",
    name: "Giorgio Armani",
    category: "fragrance",
    blurb: "Armani fragrances anchor the accessible-luxury tier without compromise. Acqua di Giò has been among the best-selling men's fragrances for over 25 years — a record built on genuine quality, not marketing. Si and Sì Intense hold the same standard for women.",
  },
  {
    slug: "paco-rabanne",
    name: "Paco Rabanne",
    category: "fragrance",
    blurb: "1 Million and Invictus created a new template for bold, confident men's fragrance. Paco Rabanne's willingness to push into territory other houses consider too commercial has made them enduring catalog staples that move quickly and generate strong reactions.",
  },
  {
    slug: "burberry",
    name: "Burberry",
    category: "fragrance",
    blurb: "Burberry translates its heritage aesthetic into fragrance with consistency. Her, Weekend, and Brit occupy the refined British middle ground — approachable without being ordinary. Well-constructed, well-priced, and recognizable for the right reasons.",
  },
  {
    slug: "calvin-klein",
    name: "Calvin Klein",
    category: "fragrance",
    blurb: "CK One changed the fragrance industry in 1994 by making unisex mainstream. The line has held that clean, minimalist identity ever since. Eternity and Obsession remain among the most recognizable fragrances in the world. Entry-level luxury done with a real point of view.",
  },
  {
    slug: "azzaro",
    name: "Azzaro",
    category: "fragrance",
    blurb: "Chrome has been a benchmark of fresh, clean men's fragrance since 1996. Azzaro's lineup is consistent — accessible price points, dependable quality, and a signature character that has never tried too hard. Chrome United and Wanted fill out a lineup worth knowing.",
  },
  {
    slug: "coach",
    name: "Coach",
    category: "fragrance",
    blurb: "Coach brings its American leather-goods heritage into fragrance with a clean, polished aesthetic. Dreams and Wild Rose have built a loyal following among buyers who want quality without the European luxury premium. Well-made and distinctly American in character.",
  },
];

/** Get a brand entry by slug and category */
export function getBrand(slug: string, category: "watches" | "fragrance"): BrandEntry | undefined {
  const list = category === "watches" ? watchBrands : fragranceBrands;
  return list.find(b => b.slug === slug);
}

/** Convert a brand name to a URL slug */
export function brandToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

/** All brand slugs for generateStaticParams */
export const allWatchBrandSlugs = watchBrands.map(b => ({ brand: b.slug }));
export const allFragranceBrandSlugs = fragranceBrands.map(b => ({ brand: b.slug }));
