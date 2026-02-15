// types/content.ts

export type SiteSettings = {
  brandName: string;
  contactEmail: string;
  linkedinUrl: string;
  brand: {
    logo: { url: string };
    icon: { url: string };
    logoAlt: string;
  };
  header: {
    menu: {
      servicesLabel: string;
      methodLabel: string;
      caseLabel: string;
      faqLabel: string;
    };
    ctaLabel: string;
    mobileMenuTitle: string;
  };
  hero: {
    manifestoLines: string[];
    headline: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  servicesSection: {
    heading: string;
  };
  // ✅ NUOVO: Fit Filter
  fitFilter: {
    perfectTitle: string;
    perfectItems: string[];
    notForTitle: string;
    notForItems: string[];
  };
process: {
   heading: string;
   steps: {
     number: string;
     title: string;
     description: string;
   }[];
 };
  faqSection: {
    heading: string;
    emptyText: string;
  };
  workSection: {
    heading: string;
    intro: string;
    emptyText: string;
  };
  footer: {
    headline: string;
    line: string;
  };
};

export type Service = {
  _id: string;
  title: string;
  tagline: string;
  tags: string[];
  deliverables: string[];
  iconUrl?: string;
};

export type WorkItem = {
  _id: string;
  title: string;
  clientName?: string;
  tags?: string[];
  summary?: string;
  deliverables?: string[];
  imageUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
};

export type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

export type SiteContent = {
  siteSettings: SiteSettings;
  services: Service[];
  workItems: WorkItem[];
  faqs: FAQ[];
};