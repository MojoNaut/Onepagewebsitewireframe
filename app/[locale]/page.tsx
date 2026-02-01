import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FitFilter } from "@/components/sections/FitFilter";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { loadSiteContent } from "@/lib/content";

export default async function HomePage() {
  const content = await loadSiteContent();
  const { siteSettings, services, workItems, faqs } = content;

  return (
    <div className="min-h-screen">
      <Header settings={siteSettings} />

      <main>
        <section id="hero" className="scroll-mt-24">
          <Hero settings={siteSettings} />
        </section>

        <section id="servizi" className="scroll-mt-24">
          <Services services={services} />
        </section>

        <section id="fit" className="scroll-mt-24">
          <FitFilter copy={siteSettings.fitFilter} />
        </section>

        <section id="metodo" className="scroll-mt-24">
          <Process copy={siteSettings.process} />
        </section>

        <section id="case" className="scroll-mt-24">
          <Work workItems={workItems} copy={siteSettings.workSection} />
        </section>

        <section id="faq" className="scroll-mt-24">
          <FAQ faqs={faqs} copy={siteSettings.faqSection} />
        </section>

        <section id="contatti" className="scroll-mt-24">
          <Contact contactEmail={siteSettings.contactEmail} copy={siteSettings.contactSection} />
        </section>
      </main>

      <Footer
        brandName={siteSettings.brandName}
        footerLine={siteSettings.footerLine}
        contactEmail={siteSettings.contactEmail}
        linkedinUrl={siteSettings.linkedinUrl}
      />
    </div>
  );
}
