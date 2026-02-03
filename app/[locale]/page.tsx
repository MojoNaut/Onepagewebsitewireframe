import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Services } from "@/components/sections/Services";
import { FitFilter } from "@/components/sections/FitFilter";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { loadSiteContent } from "@/lib/content";

export default async function HomePage() {
  const content = await loadSiteContent();
  const { siteSettings, services, workItems, faqs } = content;

  return (
    <div className="min-h-screen">
      <Header settings={siteSettings} />

      <main>
  <Hero settings={siteSettings} />
  <Services services={services} />
  <FitFilter copy={siteSettings.fitFilter} />
  <Process copy={siteSettings.process} />
  <Work workItems={workItems} copy={siteSettings.workSection} />
  <FAQ faqs={faqs} copy={siteSettings.faqSection} />
  <Contact contactEmail={siteSettings.contactEmail} copy={siteSettings.contactSection} />
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
