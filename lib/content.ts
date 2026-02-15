// lib/content.ts

import type { SiteContent } from "@/types/content";
import { getSanityClient } from "@/lib/sanityClient";
import {
  faqsQuery,
  servicesQuery,
  siteSettingsQuery,
  workItemsQuery,
} from "@/lib/queries";

// Fallback MINIMO - solo per evitare crash se Sanity è offline
const fallbackSiteSettings = {
  brandName: "",
  contactEmail: "",
  linkedinUrl: "",
  brand: {
    logo: { url: "" },
    icon: { url: "" },
    logoAlt: "",
  },
  header: {
    menu: {
      servicesLabel: "",
      methodLabel: "",
      caseLabel: "",
      faqLabel: "",
    },
    ctaLabel: "",
    mobileMenuTitle: "",
  },
  hero: {
    manifestoLines: [],
    headline: "",
    primaryCtaLabel: "",
    secondaryCtaLabel: "",
  },
  servicesSection: {
    heading: "",
  },
  // ✅ NUOVO: Fallback fitFilter
  fitFilter: {
    perfectTitle: "Perfect for you if:",
    perfectItems: [],
    notForTitle: "Not for you if:",
    notForItems: [],
  },
process: {
   heading: "Metodo",
   steps: [],
 },
  faqSection: {
    heading: "FAQ",
    emptyText: "Domande frequenti in arrivo",
  },
  workSection: {
    heading: "Casi",
    intro: "Progetti selezionati",
    emptyText: "Casi in arrivo",
  },
 contactSection: {
   title: "Parliamone",
   subtitle: "Compila il form e ti rispondo entro 24h",
   submitLabel: "Invia richiesta",
   nameLabel: "Nome",
   namePlaceholder: "Il tuo nome",
   emailLabel: "Email",
   emailPlaceholder: "la.tua@email.com",
   messageLabel: "Messaggio",
   messagePlaceholder: "Raccontami del tuo progetto...",
   emailFallbackText: "Oppure scrivimi direttamente:",
 },
  footer: {
    headline: "",
    line: "",
  },
};

export const fallbackContent: SiteContent = {
  siteSettings: fallbackSiteSettings,
  services: [],
  workItems: [],
  faqs: [],
};

export async function loadSiteContent(
  locale: string = "it"
): Promise<SiteContent> {
  const client = getSanityClient();

  if (!client) {
    console.warn("Sanity client not available, using fallback");
    return fallbackContent;
  }

  try {
    const [siteSettings, services, workItems, faqs] = await Promise.all([
      client.fetch(siteSettingsQuery, { locale }),
      client.fetch(servicesQuery, { locale }),
     client.fetch(workItemsQuery, { locale }),
      client.fetch(faqsQuery, { locale }),
    ]);

    return {
      siteSettings: siteSettings ?? fallbackSiteSettings,
      services: Array.isArray(services) ? services : [],
      workItems: Array.isArray(workItems) ? workItems : [],
      faqs: Array.isArray(faqs) ? faqs : [],
    };
  } catch (err) {
    console.error("Sanity fetch failed:", err);
    return fallbackContent;
  }
}