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
  description?: string;
  imageUrl?: string;
  type?: string;
  summary?: string;
  liveUrl?: string;
  featured?: boolean;
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