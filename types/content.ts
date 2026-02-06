// types/content.ts

// ==================================================
// SITE SETTINGS
// ==================================================
export type SiteSettings = {
  // ---------- GENERAL ----------
  brandName: string;
  contactEmail: string;
  linkedinUrl: string;

  // Logo/Brand (da Sanity -> query)
  // Nota: li teniamo optional per evitare rotture se non compilati in CMS
brand?: {
  logo?: { url: string } | null;
  icon?: { url: string } | null;
  logoAlt?: string | null;
};

  // ---------- HEADER ----------
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

  // ---------- HERO ----------
  hero: {
    manifestoLines: string[];
    headline: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };

  // ---------- FOOTER ----------
  // (testi localizzati da Sanity)
  footer?: {
    headline: string;
    line: string;
  };
};

// ==================================================
// SUPPORTING TYPES
// ==================================================
export type ServiceItem = {
  _id: string;
  title: string;
  description: string;
};

export type WorkItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

// ==================================================
// SITE CONTENT (PAGE AGGREGATE)
// ==================================================
export type SiteContent = {
  siteSettings: SiteSettings;
  services: ServiceItem[];
  workItems: WorkItem[];
  faqs: FaqItem[];
};
