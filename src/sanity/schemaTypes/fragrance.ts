import { defineField, defineType } from "sanity";

export const fragrance = defineType({
  name: "fragrance",
  title: "Fragrance",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      description: "e.g. Tom Ford, Dior, Creed. Type freely \u2014 filters on the site update automatically.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Fragrance name",
      type: "string",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Cologne", value: "cologne" },
          { title: "Perfume", value: "perfume" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "concentration",
      title: "Concentration",
      type: "string",
      options: {
        list: [
          { title: "Eau de Toilette (EDT)", value: "edt" },
          { title: "Eau de Parfum (EDP)", value: "edp" },
          { title: "Parfum / Extrait", value: "parfum" },
          { title: "Eau de Cologne", value: "edc" },
        ],
      },
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      description: "e.g. 100ml",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "On Hold", value: "on_hold" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "available",
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Leave blank to show \u201cInquire for Price\u201d instead of a number.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
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
    select: {
      title: "brand",
      subtitle: "name",
      media: "photos.0",
    },
  },
});
