// lib/queries.ts
import groq from "groq";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    "brandName": brandName[$locale],
    contactEmail,
    linkedinUrl,
    "hero": {
      "manifestoLines": hero.manifestoLines[$locale],
      "headline": hero.headline[$locale],
      "primaryCtaLabel": hero.primaryCtaLabel[$locale],
      "secondaryCtaLabel": hero.secondaryCtaLabel[$locale]
    }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description
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