import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zzlqnau",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skhXqWDstYsiFvf9PDmlVpJ2GSvwRcP1JRQmVaejW6xNAYEd0CoyQW3wLJItTvRXr8hi7jTvN1ZnuPlq04EeZWJnCVHJqt59D3JATuVWaFTQCKeAH1Y5ZdJStQHc3x46rWn1BCYYqjZNStzT7OpOHJlyYSiFSsGpK25COW2FKfjR2gAdT2hi",  // ← Incolla il token che hai creato
  useCdn: false,
});

const contactContent = {
  title: { _type: "localizedString", it: "Parliamone", en: "Let's talk" },
  subtitle: {
    _type: "localizedText",
    it: "Raccontami cosa vuoi costruire. Ti rispondo entro 24 ore con i prossimi passi o una call gratuita di 30 minuti.",
    en: "Tell me what you want to build. I respond within 24 hours with next steps or a free 30-min discovery call.",
  },
  submitLabel: { _type: "localizedString", it: "Invia richiesta", en: "Send" },
  nameLabel: { _type: "localizedString", it: "Nome", en: "Name" },
  namePlaceholder: { _type: "localizedString", it: "Il tuo nome", en: "Your name" },
  emailLabel: { _type: "localizedString", it: "Email", en: "Email" },
  emailPlaceholder: { _type: "localizedString", it: "la.tua@email.com", en: "your@email.com" },
  messageLabel: { _type: "localizedString", it: "Messaggio", en: "Message" },
  messagePlaceholder: {
    _type: "localizedString",
    it: "Raccontami del tuo progetto...",
    en: "Tell me about your project...",
  },
  emailFallbackText: {
    _type: "localizedString",
    it: "Oppure scrivimi direttamente:",
    en: "Or email me directly:",
  },
};

async function seedContact() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ _id }`);
  if (!settings) {
    console.error("❌ siteSettings non trovato");
    process.exit(1);
  }

  console.log(`✅ Trovato: ${settings._id}`);
  console.log("📝 Aggiorno contactSection...");

  await client
    .patch(settings._id)
    .set({ contactSection: contactContent })
    .commit();

  console.log("✅ Contact section seedata!");
}

seedContact().catch(console.error);