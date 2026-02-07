// lib/queries.ts
import groq from "groq";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    // GENERAL
    "brandName": brandName[$locale],
    "brand": {
      "logo": { "url": brand.logo.asset->url },
      "icon": { "url": brand.icon.asset->url },
      "logoAlt": brand.logoAlt[$locale]
    },
    contactEmail,
    linkedinUrl,

    // HEADER
    "header": {
      "menu": {
        "servicesLabel": header.menu.servicesLabel[$locale],
        "methodLabel": header.menu.methodLabel[$locale],
        "caseLabel": header.menu.caseLabel[$locale],
        "faqLabel": header.menu.faqLabel[$locale]
      },
      "ctaLabel": header.ctaLabel[$locale],
      "mobileMenuTitle": header.mobileMenuTitle[$locale]
    },

    // HERO
    "hero": {
      "manifestoLines": hero.manifestoLines[$locale],
      "headline": hero.headline[$locale],
      "primaryCtaLabel": hero.primaryCtaLabel[$locale],
      "secondaryCtaLabel": hero.secondaryCtaLabel[$locale]
    },

    // SERVICES SECTION
    "servicesSection": {
      "heading": servicesSection.heading[$locale]
    },

    // FOOTER
    "footer": {
      "headline": footer.headline[$locale],
      "line": footer.line[$locale]
    }
  }
`;

// ✅ AGGIORNATA: Services con campi localizzati
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    "title": title[$locale],
    "tagline": tagline[$locale],
    "deliverables": deliverables[$locale]
  }
`;

export const workItemsQuery = groq`
  *[_type == "workItem"] | order(order asc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  }
`;