// types/content.ts

export interface SiteSettings {
  brandName: string;
  headline?: string;
  subheadline?: string;
  footerLine?: string;
  contactEmail: string;
  linkedinUrl?: string;
  header?: {
    menu?: {
      caseLabel?: string;
      servicesLabel?: string;
      methodLabel?: string;
      faqLabel?: string;
    };
    ctaLabel?: string;
    mobileCtaLabel?: string;
  };
  hero?: {
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
      manifestoLines?: string[];
  };
  fitFilter?: {
    perfectTitle?: string;
    perfectItems?: string[];
    notForTitle?: string;
    notForItems?: string[];
  };
  process?: {
    heading?: string;
    steps?: ProcessStep[];
  };
  workSection?: {
    heading?: string;
    intro?: string;
    featuredLabel?: string;
    emptyText?: string;
    emptyCtaLabel?: string;
  };
  faqSection?: {
    heading?: string;
    emptyText?: string;
  };
  contactSection?: {
    title?: string;
    subtitle?: string;
    microcopy?: string;
    submitLabel?: string;
  };
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Service {
  _id: string;
  title: string;
  tagline?: string;
  deliverables?: string[];
  idealFor?: string[];
  order?: number;
}

export interface WorkItem {
  _id: string;
  title: string;
  type?: string;
  summary?: string;
  challenge?: string;
  result?: string;
  coverImage?: {
    asset?: {
      _id: string;
      url: string;
      [key: string]: unknown;
    };
    alt?: string;
  };
  liveUrl?: string;
  demoUrl?: string;
  order?: number;
  featured?: boolean;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  siteSettings: SiteSettings;
  services: Service[];
  workItems: WorkItem[];
  faqs: FAQ[];
}
