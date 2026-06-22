import { defineField, defineType } from "sanity";

export const watch = defineType({
  name: "watch",
  title: "Watch",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      description: "e.g. Rolex, Omega, Tudor. Type freely \u2014 filters on the site update automatically.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "model",
      title: "Model name",
      type: "string",
      description: "e.g. Submariner, Speedmaster",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "referenceNumber",
      title: "Reference number",
      type: "string",
      description: "Optional. The manufacturer's reference / model number.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generates from brand + model. Click 'Generate' if it's blank.",
      options: { source: (doc: any) => `${doc.brand}-${doc.model}-${doc.referenceNumber ?? ""}`, maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "condition",
      title: "Condition",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Consignment (Pre-Owned)", value: "consignment" },
        ],
        layout: "radio",
      },
      initialValue: "new",
      validation: (Rule) => Rule.required(),
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
      name: "caseMaterial",
      title: "Case material",
      type: "string",
      description: "e.g. Stainless Steel, 18k Gold, Titanium",
    }),
    defineField({
      name: "caseSize",
      title: "Case size",
      type: "string",
      description: "e.g. 40mm",
    }),
    defineField({
      name: "movement",
      title: "Movement",
      type: "string",
      options: {
        list: [
          { title: "Automatic", value: "automatic" },
          { title: "Quartz", value: "quartz" },
          { title: "Manual", value: "manual" },
        ],
      },
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
      subtitle: "model",
      media: "photos.0",
    },
  },
});
