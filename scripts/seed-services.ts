// scripts/seed-services.ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zzlqnau",  // ← Il tuo project ID (lo vedo dall'URL Vision)
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skhXqWDstYsiFvf9PDmlVpJ2GSvwRcP1JRQmVaejW6xNAYEd0CoyQW3wLJItTvRXr8hi7jTvN1ZnuPlq04EeZWJnCVHJqt59D3JATuVWaFTQCKeAH1Y5ZdJStQHc3x46rWn1BCYYqjZNStzT7OpOHJlyYSiFSsGpK25COW2FKfjR2gAdT2hi",  // ← Incolla il token che hai creato
  useCdn: false,
});

const services = [
  {
    _type: "service",
    title: {
      _type: "localizedString",
      it: "MVP Sprint",
      en: "MVP Sprint",
    },
    tagline: {
      _type: "localizedText",
      it: "Demo/MVP per validare un'idea o sbloccare una vendita.",
      en: "Demo/MVP to validate an idea or unlock a sale.",
    },
    deliverables: {
      _type: "localizedStringArray",
      it: [
        "Obiettivo e scope timebox",
        "Prototipo / flusso principale",
        "Versione rilasciabile per demo o primi utenti",
        "Lista next step prioritizzata",
      ],
      en: [
        "Goal and timebox scope",
        "Prototype / main flow",
        "Releasable version for demo or early users",
        "Prioritized next steps list",
      ],
    },
    order: 1,
  },
  {
    _type: "service",
    title: {
      _type: "localizedString",
      it: "Web App su misura",
      en: "Custom Web App",
    },
    tagline: {
      _type: "localizedText",
      it: "Strumenti operativi per gestire processi, contenuti e flussi.",
      en: "Operational tools to manage processes, content and workflows.",
    },
    deliverables: {
      _type: "localizedStringArray",
      it: [
        "Mappatura processo e requisiti essenziali",
        "Interfacce operative (dashboard / gestione)",
        "Ruoli e permessi (se serve)",
        "QA e consegna ordinata",
      ],
      en: [
        "Process and essential requirements mapping",
        "Operational interfaces (dashboard / management)",
        "Roles and permissions (if needed)",
        "QA and clean handoff",
      ],
    },
    order: 2,
  },
  {
    _type: "service",
    title: {
      _type: "localizedString",
      it: "Sito / Landing",
      en: "Site / Landing",
    },
    tagline: {
      _type: "localizedText",
      it: "Pagine chiare e conversion-ready per presentarsi e acquisire contatti.",
      en: "Clear, conversion-ready pages to present yourself and acquire leads.",
    },
    deliverables: {
      _type: "localizedStringArray",
      it: [
        "Struttura messaggi e sezioni",
        "Copy essenziale e gerarchia contenuti",
        "CTA e form contatto efficaci",
        "Setup base per misurare richieste",
      ],
      en: [
        "Message structure and sections",
        "Essential copy and content hierarchy",
        "Effective CTAs and contact forms",
        "Basic setup to measure requests",
      ],
    },
    order: 3,
  },
];

async function seedServices() {
  console.log("🗑️  Deleting old services...");

  // Elimina i vecchi services
  const oldServices = await client.fetch(`*[_type == "service"]._id`);
  if (oldServices.length > 0) {
    const transaction = client.transaction();
    oldServices.forEach((id: string) => transaction.delete(id));
    await transaction.commit();
    console.log(`   Deleted ${oldServices.length} old services`);
  }

  console.log("✨ Creating new services...");

  // Crea i nuovi services
  const transaction = client.transaction();
  services.forEach((service) => transaction.create(service));
  await transaction.commit();

  console.log("✅ Done! Created 3 services with IT/EN content");
}

seedServices().catch(console.error);