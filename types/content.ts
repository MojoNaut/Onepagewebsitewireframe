// types/content.ts

export type SiteSettings = {
  brandName: string;
  contactEmail: string;
  linkedinUrl: string;
  hero: {
    manifestoLines: string[];
    headline: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  // Aggiungi altre sezioni quando le localizzi
  header?: any;
  fitFilter?: any;
  process?: any;
  workSection?: any;
  faqSection?: any;
  contactSection?: any;
  footerLine?: string;
};

export type SiteContent = {
  siteSettings: SiteSettings;
  services: any[];
  workItems: any[];
  faqs: any[];
};