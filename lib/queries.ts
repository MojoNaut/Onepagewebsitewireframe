// lib/queries.ts

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  brandName,
  headline,
  subheadline,
  footerLine,
  contactEmail,
  linkedinUrl,
  header{menu{caseLabel,servicesLabel,methodLabel,faqLabel},ctaLabel,mobileCtaLabel},
  hero{primaryCtaLabel,secondaryCtaLabel},
  fitFilter{perfectTitle,perfectItems,notForTitle,notForItems},
  process{heading,steps[]{number,title,description}},
  workSection{heading,intro,featuredLabel,emptyText,emptyCtaLabel},
  faqSection{heading,emptyText},
  contactSection{title,subtitle,microcopy,submitLabel}
}`;

export const servicesQuery = `*[_type == "service"]|order(order asc){
  _id,
  title,
  tagline,
  deliverables,
  idealFor,
  order
}`;

export const workItemsQuery = `*[_type == "workItem"]|order(featured desc, order asc){
  _id,
  title,
  type,
  summary,
  challenge,
  result,
  coverImage{asset,alt},
  liveUrl,
  demoUrl,
  order,
  featured
}`;

export const faqsQuery = `*[_type == "faq"]|order(_createdAt asc){
  _id,
  question,
  answer
}`;