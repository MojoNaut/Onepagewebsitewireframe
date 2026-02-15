// sanity/schemaTypes/workItemType.ts
import { defineField, defineType } from "sanity";

export const workItemType = defineType({
  name: "workItem",
  title: "Work / Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      description: "Opzionale — nome del cliente",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "localizedStringArray",
      description: "Es: MVP, Startup, React, Next.js",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localizedText",
      description: "Descrizione breve del progetto (visibile quando espanso)",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "localizedStringArray",
      description: "Cosa è stato consegnato",
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: { hotspot: true },
      description: "Screenshot o mockup principale",
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      description: "Link al sito/prodotto live",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      titleIt: "title.it",
      titleEn: "title.en",
      client: "clientName",
      order: "order",
      media: "image",
    },
    prepare({ titleIt, titleEn, client, order, media }) {
      return {
        title: titleIt || titleEn || "Untitled",
        subtitle: `#${order ?? 0} ${client ? `— ${client}` : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});