// sanity/schemaTypes/serviceType.ts
import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "localizedString",
      description: "Es: MVP Sprint / MVP Sprint",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "localizedText",
      description: "Breve descrizione del servizio",
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "localizedStringArray",
      description: "Badge/etichette per il servizio (es: Validazione, Startup)",
    }),

    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "localizedStringArray",
      description: "Lista di cosa include il servizio",
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Ordine di visualizzazione (1, 2, 3...)",
      initialValue: 0,
    }),
    defineField({
  name: "icon",
  title: "Icon (SVG)",
  type: "image",
  description: "Icona/illustrazione per il servizio (solo desktop)",
  options: {
    accept: "image/svg+xml,image/png,image/webp",
  },
}),
  ],

  preview: {
    select: {
      titleIt: "title.it",
      titleEn: "title.en",
      order: "order",
    },
    prepare({ titleIt, titleEn, order }) {
      return {
        title: titleIt || titleEn || "Untitled Service",
        subtitle: `#${order ?? 0} | EN: ${titleEn || "—"}`,
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