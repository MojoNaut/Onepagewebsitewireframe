// sanity/schemaTypes/siteSettingsType.ts
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
    { name: "fitFilter", title: "Fit Filter Section" },  
     { name: "process", title: "Process / Metodo" },
     { name: "faq", title: "FAQ Section" },
     { name: "work", title: "Work Section" },
     { name: "contact", title: "Contact Section" },
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
    // SERVICES
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
    // FIT FILTER ✅ NUOVO
    // ==================================================
    defineField({
      name: "fitFilter",
      title: "Fit Filter Section",
      type: "object",
      group: "fitFilter",
      fields: [
        defineField({
          name: "perfectTitle",
          title: "Perfect For Title",
          type: "localizedString",
          description: "Es: Perfetto per te se: / Perfect for you if:",
        }),
        defineField({
          name: "perfectItems",
          title: "Perfect For Items",
          type: "localizedStringArray",
          description: "Lista di punti (3-5 elementi) - cosa rende il servizio perfetto per il cliente",
          validation: (Rule) => Rule.max(5).warning("Massimo 5 elementi per leggibilità"),
        }),
        defineField({
          name: "notForTitle",
          title: "Not For Title",
          type: "localizedString",
          description: "Es: Non per te se: / Not for you if:",
        }),
        defineField({
          name: "notForItems",
          title: "Not For Items",
          type: "localizedStringArray",
          description: "Lista di punti (3-5 elementi) - cosa NON è adatto per questo servizio",
          validation: (Rule) => Rule.max(5).warning("Massimo 5 elementi per leggibilità"),
        }),
      ],
    }),
// ==================================================
// PROCESS / METODO
// ==================================================
defineField({
  name: "process",
  title: "Process Section",
  type: "object",
  group: "process",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "localizedString",
      description: "Es: Metodo / Method",
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Step Number",
              type: "string",
              description: "Es: 01, 02, 03...",
            }),
            defineField({
              name: "title",
              title: "Step Title",
              type: "localizedString",
              description: "Es: Allineamento / Alignment",
            }),
            defineField({
              name: "description",
              title: "Step Description",
              type: "localizedText",
              description: "Descrizione breve dello step",
            }),
          ],
          preview: {
            select: {
              number: "number",
              title: "title.it",
            },
            prepare({ number, title }) {
              return {
                title: `${number} — ${title || "Untitled"}`,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
  ],
}),
// ==================================================
// FAQ SECTION
// ==================================================
defineField({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  group: "faq",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "localizedString",
      description: "Es: FAQ / FAQ",
    }),
    defineField({
      name: "emptyText",
      title: "Empty State Text",
      type: "localizedString",
      description: "Testo quando non ci sono FAQ",
    }),
  ],
}),
// ==================================================
// WORK SECTION
// ==================================================
defineField({
  name: "workSection",
  title: "Work Section",
  type: "object",
  group: "work",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "localizedString",
      description: "Es: Casi / Work",
    }),
    defineField({
      name: "intro",
      title: "Section Intro",
      type: "localizedString",
      description: "Sottotitolo breve",
    }),
    defineField({
      name: "emptyText",
      title: "Empty State Text",
      type: "localizedString",
    }),
  ],
}),
// ==================================================
// CONTACT SECTION
// ==================================================
defineField({
  name: "contactSection",
  title: "Contact Section",
  type: "object",
  group: "contact",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      description: "Es: Parliamone / Let's talk",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedText",
      description: "Testo sotto il titolo",
    }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "localizedString",
      description: "Es: Invia richiesta / Send",
    }),
    defineField({
      name: "nameLabel",
      title: "Name Field Label",
      type: "localizedString",
    }),
    defineField({
      name: "namePlaceholder",
      title: "Name Placeholder",
      type: "localizedString",
    }),
    defineField({
      name: "emailLabel",
      title: "Email Field Label",
      type: "localizedString",
    }),
    defineField({
      name: "emailPlaceholder",
      title: "Email Placeholder",
      type: "localizedString",
    }),
    defineField({
      name: "messageLabel",
      title: "Message Field Label",
      type: "localizedString",
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Message Placeholder",
      type: "localizedString",
    }),
    defineField({
      name: "emailFallbackText",
      title: "Email Fallback Text",
      type: "localizedString",
      description: "Es: Oppure scrivimi direttamente:",
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