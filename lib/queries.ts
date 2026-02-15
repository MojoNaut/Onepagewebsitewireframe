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

    // ✅ FIT FILTER SECTION
    "fitFilter": {
      "perfectTitle": fitFilter.perfectTitle[$locale],
      "perfectItems": fitFilter.perfectItems[$locale],
      "notForTitle": fitFilter.notForTitle[$locale],
      "notForItems": fitFilter.notForItems[$locale]
    },
        // process / metodo
process {
   "heading": heading[$locale],
   "steps": steps[] {
     number,
     "title": title[$locale],
     "description": description[$locale]
   }
 },
 "faqSection": {
    "heading": faqSection.heading[$locale],
     "emptyText": faqSection.emptyText[$locale]
   },
    "workSection": {
      "heading": workSection.heading[$locale],
      "intro": workSection.intro[$locale],
      "emptyText": workSection.emptyText[$locale]
    },
    // FOOTER
    "footer": {
      "headline": footer.headline[$locale],
      "line": footer.line[$locale]
    }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    "title": title[$locale],
    "tagline": tagline[$locale],
    "tags": tags[$locale],
    "deliverables": deliverables[$locale],
    "iconUrl": icon.asset->url
  }
`;

export const workItemsQuery = groq`
  *[_type == "workItem"] | order(order asc) {
    _id,
    "title": title[$locale],
    clientName,
    "tags": tags[$locale],
    "summary": summary[$locale],
    "deliverables": deliverables[$locale],
    "imageUrl": image.asset->url,
    liveUrl,
    featured,
    order
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
   "question": question[$locale],
     "answer": answer[$locale]
  }
`;