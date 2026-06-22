export type SanityImage = {
  asset: { _ref: string; _type: string };
};

export type Watch = {
  _id: string;
  _createdAt: string;
  brand: string;
  model: string;
  referenceNumber?: string;
  slug: string;
  condition: "new" | "consignment";
  status: "available" | "on_hold" | "sold";
  caseMaterial?: string;
  caseSize?: string;
  movement?: "automatic" | "quartz" | "manual";
  price?: number;
  description?: string;
  photos: SanityImage[];
  featured?: boolean;
};

export type Fragrance = {
  _id: string;
  _createdAt: string;
  brand: string;
  name: string;
  slug: string;
  category: "cologne" | "perfume";
  concentration?: "edt" | "edp" | "parfum" | "edc";
  size?: string;
  status: "available" | "on_hold" | "sold";
  price?: number;
  description?: string;
  photos: SanityImage[];
  featured?: boolean;
};

/** Lot numbers are computed from intake order, not typed in by hand. */
export function withLotNumbers<T extends { _createdAt: string }>(items: T[]): (T & { lotNumber: string })[] {
  const sorted = [...items].sort(
    (a, b) => new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
  );
  return sorted.map((item, i) => ({
    ...item,
    lotNumber: String(i + 1).padStart(3, "0"),
  }));
}

export function uniqueSorted(values: (string | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();
}

export function formatPrice(price?: number): string {
  if (!price) return "Inquire for Price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export type GiftSet = {
  _id: string;
  _createdAt: string;
  brand: string;
  name: string;
  slug: string;
  gender: "mens" | "womens" | "unisex";
  includes?: string;
  status: "available" | "on_hold" | "sold";
  price?: number;
  originalPrice?: number;
  description?: string;
  photos: SanityImage[];
  featured?: boolean;
};
