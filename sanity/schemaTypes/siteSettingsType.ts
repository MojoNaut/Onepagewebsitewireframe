import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  groups: [
    { name: "general", title: "General", default: true },
    { name: "header", title: "Header" },
    { name: "hero", title: "Hero Section" },
    { name: "services", title: "Services Section" },
    { name: "footer", title: "Footer" },
  ],

  fields: [
    // ==================================================
    // GENERAL
    // ==================================================
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "localizedString",
      group: "general",
      description: "Es: CREIAMO / WE CREATE",
    }),

    defineField({
      name: "brand",
      title: "Brand Identity",
      type: "object",
      group: "general",
      fields: [
        defineField({
          name: "logo",
          title: "Logo / Symbol",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "logoAlt",
          title: "Logo Alt Text",
          type: "localizedString",
        }),
        defineField({
  name: "icon",
  title: "Micro Logo / Favicon",
  type: "image",
  options: { hotspot: true },
  description: "Icona piccola usata nei dettagli (es. riga copyright)",
}),

      ],
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

    // ==================================================
    // HEADER
    // ==================================================
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      group: "header",
      fields: [
        defineField({
          name: "menu",
          title: "Menu Labels",
          type: "object",
          fields: [
            defineField({ name: "servicesLabel", type: "localizedString" }),
            defineField({ name: "methodLabel", type: "localizedString" }),
            defineField({ name: "caseLabel", type: "localizedString" }),
            defineField({ name: "faqLabel", type: "localizedString" }),
          ],
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Button Label",
          type: "localizedString",
        }),
        defineField({
          name: "mobileMenuTitle",
          title: "Mobile Menu Title",
          type: "localizedString",
        }),
      ],
    }),

    // ==================================================
    // HERO
    // ==================================================
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
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "localizedString",
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
    // ==================================================
    //  SERVICES
    // ==================================================
defineField({
  name: "servicesSection",
  title: "Services Section",
  type: "object",
  group: "services",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "localizedString",
      description: "Es: Servizi / Services",
    }),
  ],
}),
    // ==================================================
    // FOOTER
    // ==================================================
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "headline",
          title: "Footer Headline",
          type: "localizedString",
          description: "Testo breve sotto il logo",
        }),
        
        defineField({
          name: "line",
          title: "Footer Line",
          type: "localizedString",
          description: 'Es: "Guidato da Lorenzo..."',
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Global site configuration",
      };
    },
  },
});
