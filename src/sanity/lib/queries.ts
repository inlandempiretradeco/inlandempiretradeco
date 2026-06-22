import { groq } from "next-sanity";

export const allWatchesQuery = groq`
  *[_type == "watch" && status != "sold"] | order(_createdAt asc) {
    _id,
    _createdAt,
    brand,
    model,
    referenceNumber,
    "slug": slug.current,
    condition,
    status,
    caseMaterial,
    caseSize,
    movement,
    price,
    description,
    photos,
    featured
  }
`;

export const watchBySlugQuery = groq`
  *[_type == "watch" && slug.current == $slug][0] {
    _id,
    _createdAt,
    brand,
    model,
    referenceNumber,
    "slug": slug.current,
    condition,
    status,
    caseMaterial,
    caseSize,
    movement,
    price,
    description,
    photos
  }
`;

export const allFragranceQuery = groq`
  *[_type == "fragrance" && status != "sold"] | order(_createdAt asc) {
    _id,
    _createdAt,
    brand,
    name,
    "slug": slug.current,
    category,
    concentration,
    size,
    status,
    price,
    description,
    photos,
    featured
  }
`;

export const fragranceBySlugQuery = groq`
  *[_type == "fragrance" && slug.current == $slug][0] {
    _id,
    _createdAt,
    brand,
    name,
    "slug": slug.current,
    category,
    concentration,
    size,
    status,
    price,
    description,
    photos
  }
`;

export const featuredItemsQuery = groq`
  {
    "watches": *[_type == "watch" && featured == true && status != "sold"] | order(_createdAt desc) [0...4] {
      _id, brand, model, "slug": slug.current, price, photos, "kind": "watch"
    },
    "fragrance": *[_type == "fragrance" && featured == true && status != "sold"] | order(_createdAt desc) [0...4] {
      _id, brand, name, "slug": slug.current, price, photos, "kind": "fragrance"
    }
  }
`;

export const allGiftSetsQuery = groq`
  *[_type == "giftSet" && status != "sold"] | order(_createdAt asc) {
    _id, _createdAt, brand, name, "slug": slug.current,
    gender, includes, status, price, originalPrice, description, photos, featured
  }
`;

export const giftSetBySlugQuery = groq`
  *[_type == "giftSet" && slug.current == $slug][0] {
    _id, brand, name, "slug": slug.current,
    gender, includes, status, price, originalPrice, description, photos
  }
`;

export const watchesByBrandQuery = groq`
  *[_type == "watch" && status != "sold" && lower(brand) == lower($brand)] | order(_createdAt asc) {
    _id, _createdAt, brand, model, referenceNumber, "slug": slug.current,
    condition, status, caseMaterial, caseSize, movement, price, photos, featured
  }
`;

export const fragranceByBrandQuery = groq`
  *[_type == "fragrance" && status != "sold" && lower(brand) == lower($brand)] | order(_createdAt asc) {
    _id, _createdAt, brand, name, "slug": slug.current,
    category, concentration, size, status, price, photos, featured
  }
`;
