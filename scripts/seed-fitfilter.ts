// scripts/seed-fitfilter.ts
/**
 * Script per popolare il contenuto FitFilter in Sanity
 * 
 * USO:
 * 1. Assicurati di avere il token Sanity in .env.local come SANITY_WRITE_TOKEN
 * 2. Esegui: npx tsx scripts/seed-fitfilter.ts
 * 
 * ATTENZIONE: Questo script AGGIORNA il documento siteSettings esistente,
 * non crea un nuovo documento.
 */

import { createClient } from "@sanity/client";

// ⚠️ IMPORTANTE: Usa variabile d'ambiente per il token
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN || "skhXqWDstYsiFvf9PDmlVpJ2GSvwRcP1JRQmVaejW6xNAYEd0CoyQW3wLJItTvRXr8hi7jTvN1ZnuPlq04EeZWJnCVHJqt59D3JATuVWaFTQCKeAH1Y5ZdJStQHc3x46rWn1BCYYqjZNStzT7OpOHJlyYSiFSsGpK25COW2FKfjR2gAdT2hi"

if (!SANITY_TOKEN) {
  console.error("❌ ERRORE: SANITY_WRITE_TOKEN non trovato in .env.local");
  console.error("Aggiungi questa riga a .env.local:");
  console.error("SANITY_WRITE_TOKEN=il_tuo_token_qui");
  process.exit(1);
}

const client = createClient({
  projectId: "9zzlqnau",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: SANITY_TOKEN,
  useCdn: false,
  
});

// Contenuto fitFilter da seedare
const fitFilterContent = {
  perfectTitle: {
    _type: "localizedString",
    it: "Perfetto per te se:",
    en: "Perfect for you if:",
  },
  perfectItems: {
    _type: "localizedStringArray",
    it: [
      "Hai un'idea da validare velocemente",
      "Vuoi un prodotto funzionante, non solo bello",
      "Cerchi qualcuno che capisca business e tech",
      "Ti serve uno sviluppatore product-minded",
    ],
    en: [
      "You have an idea to validate quickly",
      "You want a working product, not just a pretty one",
      "You're looking for someone who understands business and tech",
      "You need a product-minded developer",
    ],
  },
  notForTitle: {
    _type: "localizedString",
    it: "Non per te se:",
    en: "Not for you if:",
  },
  notForItems: {
    _type: "localizedStringArray",
    it: [
      "Cerchi un'agenzia con team di 10+ persone",
      "Hai bisogno di sviluppo mobile nativo (iOS/Android)",
      "Vuoi micro-gestire ogni pixel",
    ],
    en: [
      "You're looking for an agency with 10+ people",
      "You need native mobile development (iOS/Android)",
      "You want to micromanage every pixel",
    ],
  },
};

async function seedFitFilter() {
  try {
    console.log("🔍 Cerco il documento siteSettings...");

    // Trova il documento siteSettings esistente
    const existingSettings = await client.fetch(
      `*[_type == "siteSettings"][0]{ _id }`
    );

    if (!existingSettings) {
      console.error("❌ Documento siteSettings non trovato!");
      console.error("Crea prima il documento siteSettings in Sanity Studio");
      process.exit(1);
    }

    console.log(`✅ Trovato documento: ${existingSettings._id}`);
    console.log("📝 Aggiorno campo fitFilter...");

    // Aggiorna solo il campo fitFilter
    const result = await client
      .patch(existingSettings._id)
      .set({ fitFilter: fitFilterContent })
      .commit();

    console.log("✅ FitFilter content aggiornato con successo!");
    console.log("\n📋 Contenuto inserito:");
    console.log(JSON.stringify(fitFilterContent, null, 2));
    console.log("\n✨ Fatto! Ora puoi vedere il contenuto in Sanity Studio");
  } catch (error) {
    console.error("❌ Errore durante il seed:", error);
    process.exit(1);
  }
}

// Esegui il seed
seedFitFilter();