import { defineField, defineType } from "sanity";

export const giftSet = defineType({
  name: "giftSet",
  title: "Gift Set",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      description: "e.g. Versace, Calvin Klein, Marc Jacobs",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Set name",
      type: "string",
      description: "e.g. Eros EDT + Shower Gel",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: (doc: any) => `${doc.brand}-${doc.name}`, maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gender",
      title: "For",
      type: "string",
      options: {
        list: [
          { title: "Men's", value: "mens" },
          { title: "Women's", value: "womens" },
          { title: "Unisex", value: "unisex" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "includes",
      title: "What's included",
      type: "string",
      description: "e.g. 3.4 oz EDT + Shower Gel + Body Lotion",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "On Hold",   value: "on_hold"   },
          { title: "Sold",      value: "sold"       },
        ],
        layout: "radio",
      },
      initialValue: "available",
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Leave blank to show 'Inquire for Price'.",
    }),
    defineField({
      name: "originalPrice",
      title: "Original / Retail price (USD)",
      type: "number",
      description: "Optional. Shows a crossed-out retail value next to your price.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).error("Add at least one photo."),
    }),
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "brand", subtitle: "name", media: "photos.0" },
  },
});
