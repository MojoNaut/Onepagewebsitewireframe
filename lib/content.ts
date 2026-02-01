import type { SiteContent } from '@/types/content';
import { getSanityClient } from '@/lib/sanityClient';
import {
  faqsQuery,
  servicesQuery,
  siteSettingsQuery,
  workItemsQuery,
} from '@/lib/queries';

const fallbackSiteSettings = {
  brandName: "LIVOTI STUDIO",
  headline: "Progetti digitali essenziali.",
  subheadline: "Sviluppo MVP, web app e landing page. Scope chiaro, consegna rapida, stack flessibile.",
  footerLine: "Developer con mindset product. Base in Veneto, Italia.",
  contactEmail: "lorenzolivoti0690@gmail.com",
  linkedinUrl: "https://linkedin.com/in/lorenzo-livoti",
  header: {
    menu: {
      caseLabel: "Case",
      servicesLabel: "Servizi",
      methodLabel: "Metodo",
      faqLabel: "FAQ",
    },
    ctaLabel: "Parliamo del progetto",
    mobileCtaLabel: "Parliamo",
  },
  hero: {
    primaryCtaLabel: "Parliamo del progetto",
    secondaryCtaLabel: "Vedi case",
  },
  fitFilter: {
    perfectTitle: "Perfetto per te se:",
    perfectItems: [
      "Hai un'idea da validare velocemente",
      "Vuoi un prodotto funzionante, non solo bello",
      "Cerchi qualcuno che capisca business e tech",
    ],
    notForTitle: "Non per te se:",
    notForItems: [
      "Cerchi un'agenzia con team di 10+ persone",
      "Hai bisogno di sviluppo mobile nativo (iOS/Android)",
      "Vuoi micro-gestire ogni pixel",
    ],
  },
  process: {
    heading: "Metodo",
    steps: [
      {
        number: "01",
        title: "Allineamento",
        description: "Definiamo obiettivo, priorità, vincoli e cosa conta davvero.",
      },
      {
        number: "02",
        title: "Scope & Prototipo",
        description: "Riduciamo complessità: cosa entra, cosa resta fuori, e un prototipo per allinearci.",
      },
      {
        number: "03",
        title: "Build & QA",
        description: "Costruzione, revisione e test: ogni dettaglio è verificato prima del rilascio.",
      },
      {
        number: "04",
        title: "Go-live & Handoff",
        description: "Messa online, consegna ordinata e supporto iniziale per partire senza frizioni.",
      },
    ],
  },
  workSection: {
    heading: "Case",
    intro: "Progetti reali, risultati misurabili.",
    featuredLabel: "Featured",
    emptyText: "Nessun progetto disponibile al momento.",
    emptyCtaLabel: "Contattami",
  },
  faqSection: {
    heading: "FAQ",
    emptyText: "Nessuna domanda frequente al momento.",
  },
  contactSection: {
    title: "Parliamo del tuo progetto",
    subtitle: "Raccontami cosa vuoi costruire. Rispondo entro 24 ore con prossimi step o call gratuita di 30 minuti.",
    microcopy: "",
    submitLabel: "Invia",
  },
};

export const fallbackContent: SiteContent = {
  siteSettings: fallbackSiteSettings,
  services: [],
  workItems: [],
  faqs: [],
};

function mergeSiteSettings(partial: Partial<typeof fallbackSiteSettings>) {
  const base = fallbackSiteSettings;
  const safe = partial && typeof partial === 'object' ? partial : {};

  return {
    ...base,
    ...safe,
    header: {
      ...base.header,
      ...safe.header,
      menu: {
        ...base.header?.menu,
        ...safe.header?.menu,
      },
    },
    hero: {
      ...base.hero,
      ...safe.hero,
    },
    fitFilter: {
      ...base.fitFilter,
      ...safe.fitFilter,
    },
    process: {
      ...base.process,
      ...safe.process,
    },
    workSection: {
      ...base.workSection,
      ...safe.workSection,
    },
    faqSection: {
      ...base.faqSection,
      ...safe.faqSection,
    },
    contactSection: {
      ...base.contactSection,
      ...safe.contactSection,
    },
  };
}

export async function loadSiteContent(): Promise<SiteContent> {
  const client = getSanityClient();
  if (!client) return fallbackContent;

  try {
    const [siteSettings, services, workItems, faqs] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(servicesQuery),
      client.fetch(workItemsQuery),
      client.fetch(faqsQuery),
    ]);

    return {
      siteSettings: mergeSiteSettings(siteSettings),
      services: Array.isArray(services) ? services : [],
      workItems: Array.isArray(workItems) ? workItems : [],
      faqs: Array.isArray(faqs) ? faqs : [],
    };
  } catch (err) {
    console.error('Sanity fetch failed:', err);
    return fallbackContent;
  }
}