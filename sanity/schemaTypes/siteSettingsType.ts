// sanity/schemaTypes/siteSettingsType.ts
import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand / Prefix (es. CREIAMO)",
      type: "string",
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subheadline", title: "Subheadline", type: "text" }),

        defineField({
          name: "manifestoLines",
          title: "Manifesto Lines (max 3)",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.max(3),
        }),

        defineField({
          name: "primaryCtaLabel",
          title: "Primary CTA",
          type: "string",
        }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary CTA",
          type: "string",
        }),
      ],
    }),
  ],
});
