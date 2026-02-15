import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zzlqnau",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skhXqWDstYsiFvf9PDmlVpJ2GSvwRcP1JRQmVaejW6xNAYEd0CoyQW3wLJItTvRXr8hi7jTvN1ZnuPlq04EeZWJnCVHJqt59D3JATuVWaFTQCKeAH1Y5ZdJStQHc3x46rWn1BCYYqjZNStzT7OpOHJlyYSiFSsGpK25COW2FKfjR2gAdT2hi",  // ← Incolla il token che hai creato
  useCdn: false,
});

const workItems = [
  {
    _type: "workItem",
    title: {
      _type: "localizedString",
      it: "Validazione MVP — Startup Fintech",
      en: "MVP Validation — Fintech Startup",
    },
    clientName: "FinFlow",
    tags: {
      _type: "localizedStringArray",
      it: ["MVP Sprint", "React", "Next.js", "Stripe"],
      en: ["MVP Sprint", "React", "Next.js", "Stripe"],
    },
    summary: {
      _type: "localizedText",
      it: "Dashboard di gestione pagamenti per una startup fintech. Da zero a MVP validato in 6 settimane, con integrazione Stripe e autenticazione utente.",
      en: "Payment management dashboard for a fintech startup. From zero to validated MVP in 6 weeks, with Stripe integration and user authentication.",
    },
    deliverables: {
      _type: "localizedStringArray",
      it: [
        "Dashboard React con Next.js",
        "Integrazione Stripe Payments",
        "Autenticazione e ruoli utente",
        "Deploy su Vercel + monitoring",
      ],
      en: [
        "React dashboard with Next.js",
        "Stripe Payments integration",
        "Authentication and user roles",
        "Vercel deploy + monitoring",
      ],
    },
    liveUrl: "https://example.com",
    featured: true,
    order: 1,
  },
  {
    _type: "workItem",
    title: {
      _type: "localizedString",
      it: "Piattaforma Booking — Studio Creativo",
      en: "Booking Platform — Creative Studio",
    },
    clientName: "Atelier Studio",
    tags: {
      _type: "localizedStringArray",
      it: ["Web App", "Booking", "Sanity CMS"],
      en: ["Web App", "Booking", "Sanity CMS"],
    },
    summary: {
      _type: "localizedText",
      it: "Sistema di prenotazione online per uno studio creativo. Calendario interattivo, gestione slot e notifiche automatiche via email.",
      en: "Online booking system for a creative studio. Interactive calendar, slot management and automatic email notifications.",
    },
    deliverables: {
      _type: "localizedStringArray",
      it: [
        "Calendario prenotazioni interattivo",
        "CMS per gestione servizi e disponibilità",
        "Notifiche email automatiche",
        "Responsive design mobile-first",
      ],
      en: [
        "Interactive booking calendar",
        "CMS for services and availability",
        "Automatic email notifications",
        "Mobile-first responsive design",
      ],
    },
    liveUrl: "https://example.com",
    featured: false,
    order: 2,
  },
  {
    _type: "workItem",
    title: {
      _type: "localizedString",
      it: "Landing Page — SaaS B2B",
      en: "Landing Page — B2B SaaS",
    },
    clientName: "DataPulse",
    tags: {
      _type: "localizedStringArray",
      it: ["Landing Page", "Conversion", "Analytics"],
      en: ["Landing Page", "Conversion", "Analytics"],
    },
    summary: {
      _type: "localizedText",
      it: "Landing page ad alta conversione per un SaaS B2B nel settore analytics. Focus su copy persuasivo, social proof e CTA ottimizzate.",
      en: "High-conversion landing page for a B2B SaaS in the analytics space. Focus on persuasive copy, social proof and optimized CTAs.",
    },
    deliverables: {
      _type: "localizedStringArray",
      it: [
        "Design e sviluppo landing page",
        "Copy strutturato per conversione",
        "Integrazione form + CRM",
        "Setup analytics e tracking conversioni",
      ],
      en: [
        "Landing page design and development",
        "Conversion-structured copy",
        "Form + CRM integration",
        "Analytics and conversion tracking setup",
      ],
    },
    liveUrl: "https://example.com",
    featured: false,
    order: 3,
  },
];

async function seedWork() {
  console.log("🗑️  Cleaning old work items...");
  const old = await client.fetch(`*[_type == "workItem"]._id`);
  if (old.length > 0) {
    const tx = client.transaction();
    old.forEach((id: string) => tx.delete(id));
    await tx.commit();
  }

  console.log("✨ Creating work items...");
  const tx = client.transaction();
  workItems.forEach((item) => tx.create(item));
  await tx.commit();

  // Seed workSection in siteSettings
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ _id }`);
  if (settings) {
    await client
      .patch(settings._id)
      .set({
        workSection: {
          heading: { _type: "localizedString", it: "Casi", en: "Work" },
          intro: { _type: "localizedString", it: "Progetti selezionati", en: "Selected projects" },
          emptyText: { _type: "localizedString", it: "Casi in arrivo", en: "Cases coming soon" },
        },
      })
      .commit();
  }

  console.log("✅ Done! Created 3 work items + workSection");
}

seedWork().catch(console.error);