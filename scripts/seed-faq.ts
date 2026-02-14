import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zzlqnau",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skhXqWDstYsiFvf9PDmlVpJ2GSvwRcP1JRQmVaejW6xNAYEd0CoyQW3wLJItTvRXr8hi7jTvN1ZnuPlq04EeZWJnCVHJqt59D3JATuVWaFTQCKeAH1Y5ZdJStQHc3x46rWn1BCYYqjZNStzT7OpOHJlyYSiFSsGpK25COW2FKfjR2gAdT2hi",  // ← Incolla il token che hai creato
  useCdn: false,
});

const faqs = [
  {
    _type: "faq",
    question: {
      _type: "localizedString",
      it: "Quanto costa un progetto?",
      en: "How much does a project cost?",
    },
    answer: {
      _type: "localizedText",
      it: "Dipende da complessità e scope. Un MVP parte da €3-5k, un sito landing da €1.5-3k. Dopo una call di allineamento ti invio un preventivo fisso, senza sorprese.",
      en: "It depends on complexity and scope. An MVP starts from €3-5k, a landing site from €1.5-3k. After an alignment call I send a fixed quote, no surprises.",
    },
    order: 1,
  },
  {
    _type: "faq",
    question: {
      _type: "localizedString",
      it: "Quanto tempo serve per un MVP?",
      en: "How long does an MVP take?",
    },
    answer: {
      _type: "localizedText",
      it: "Tipicamente 4-8 settimane dalla definizione dello scope al go-live. Landing page e siti più semplici possono essere pronti in 2-3 settimane.",
      en: "Typically 4-8 weeks from scope definition to go-live. Landing pages and simpler sites can be ready in 2-3 weeks.",
    },
    order: 2,
  },
  {
    _type: "faq",
    question: {
      _type: "localizedString",
      it: "Lavori da solo o hai un team?",
      en: "Do you work alone or with a team?",
    },
    answer: {
      _type: "localizedText",
      it: "Sono il punto di contatto unico e gestisco design e sviluppo. Per progetti che richiedono competenze specifiche (copywriting, branding, infrastruttura) collaboro con specialisti fidati.",
      en: "I'm the single point of contact handling design and development. For projects requiring specific skills (copywriting, branding, infrastructure) I collaborate with trusted specialists.",
    },
    order: 3,
  },
  {
    _type: "faq",
    question: {
      _type: "localizedString",
      it: "Cosa succede dopo il lancio?",
      en: "What happens after launch?",
    },
    answer: {
      _type: "localizedText",
      it: "Includo 2 settimane di supporto post-lancio per bugfix e piccoli aggiustamenti. Per manutenzione continuativa e nuove feature, definiamo un accordo separato.",
      en: "I include 2 weeks of post-launch support for bugfixes and small adjustments. For ongoing maintenance and new features, we define a separate agreement.",
    },
    order: 4,
  },
];

async function seedFaqs() {
  console.log("🗑️  Cleaning old FAQs...");
  const old = await client.fetch(`*[_type == "faq"]._id`);
  if (old.length > 0) {
    const tx = client.transaction();
    old.forEach((id: string) => tx.delete(id));
    await tx.commit();
  }

  console.log("✨ Creating FAQs...");
  const tx = client.transaction();
  faqs.forEach((faq) => tx.create(faq));
  await tx.commit();

  // Seed faqSection in siteSettings
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ _id }`);
  if (settings) {
    await client
      .patch(settings._id)
      .set({
        faqSection: {
          heading: { _type: "localizedString", it: "FAQ", en: "FAQ" },
          emptyText: {
            _type: "localizedString",
            it: "Domande frequenti in arrivo",
            en: "FAQs coming soon",
          },
        },
      })
      .commit();
  }

  console.log("✅ Done! Created 4 FAQs + faqSection");
}

seedFaqs().catch(console.error);