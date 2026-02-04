// sanity/schemaTypes/siteSettingsType.ts
import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "general", title: "General", default: true },
  ],
  fields: [
    // ===== GENERAL =====
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "localizedString",
      group: "general",
      description: "Es: CREIAMO / WE CREATE",
    }),

    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "general",
    }),

    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      group: "general",
    }),

    // ===== HERO =====
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "manifestoLines",
          title: "Manifesto Lines (max 3)",
          type: "localizedStringArray",
          description: "Le parole che scorrono sotto il brand name",
        }),

        defineField({
          name: "headline",
          title: "Headline",
          type: "localizedString",
          description: "Testo sotto il manifesto",
        }),

        defineField({
          name: "primaryCtaLabel",
          title: "Primary CTA Button",
          type: "localizedString",
        }),

        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary CTA Link",
          type: "localizedString",
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Configurazione globale del sito",
      };
    },
  },
});