// scripts/seed-process.ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zzlqnau",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skhXqWDstYsiFvf9PDmlVpJ2GSvwRcP1JRQmVaejW6xNAYEd0CoyQW3wLJItTvRXr8hi7jTvN1ZnuPlq04EeZWJnCVHJqt59D3JATuVWaFTQCKeAH1Y5ZdJStQHc3x46rWn1BCYYqjZNStzT7OpOHJlyYSiFSsGpK25COW2FKfjR2gAdT2hi",  // ← Incolla il token che hai creato
  useCdn: false,
});

const processContent = {
  heading: {
    _type: "localizedString",
    it: "Metodo",
    en: "Method",
  },
  steps: [
    {
      _type: "object",
      _key: "step01",
      number: "01",
      title: {
        _type: "localizedString",
        it: "Allineamento",
        en: "Alignment",
      },
      description: {
        _type: "localizedText",
        it: "Definiamo obiettivo, priorità, vincoli e cosa conta davvero.",
        en: "We define the goal, priorities, constraints and what truly matters.",
      },
    },
    {
      _type: "object",
      _key: "step02",
      number: "02",
      title: {
        _type: "localizedString",
        it: "Scope & Prototipo",
        en: "Scope & Prototype",
      },
      description: {
        _type: "localizedText",
        it: "Riduciamo complessità: cosa entra, cosa resta fuori, e un prototipo per allinearci.",
        en: "We reduce complexity: what's in, what's out, and a prototype to align.",
      },
    },
    {
      _type: "object",
      _key: "step03",
      number: "03",
      title: {
        _type: "localizedString",
        it: "Build & QA",
        en: "Build & QA",
      },
      description: {
        _type: "localizedText",
        it: "Costruzione, revisione e test: ogni dettaglio è verificato prima del rilascio.",
        en: "Build, review and test: every detail is verified before release.",
      },
    },
    {
      _type: "object",
      _key: "step04",
      number: "04",
      title: {
        _type: "localizedString",
        it: "Go-live & Handoff",
        en: "Go-live & Handoff",
      },
      description: {
        _type: "localizedText",
        it: "Messa online, consegna ordinata e supporto iniziale per partire senza frizioni.",
        en: "Go live, clean handoff and initial support to launch without friction.",
      },
    },
  ],
};

async function seedProcess() {
  const existing = await client.fetch(`*[_type == "siteSettings"][0]{ _id }`);

  if (!existing) {
    console.error("❌ siteSettings non trovato");
    process.exit(1);
  }

  console.log(`✅ Trovato: ${existing._id}`);
  console.log("📝 Aggiorno campo process...");

  await client
    .patch(existing._id)
    .set({ process: processContent })
    .commit();

  console.log("✅ Process seedato con successo!");
}

seedProcess().catch(console.error);