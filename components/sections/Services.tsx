import type { Service } from "@/types/content";
import { useTranslations } from "next-intl";

interface ServiceCardProps {
  title: string;
  tagline?: string;
  deliverables?: string[];
}

function ServiceCard({ title, tagline, deliverables }: ServiceCardProps) {
  return (
    <div className="group p-8 md:p-10 border border-border rounded-2xl hover:border-accent/50 transition-all hover:-translate-y-1">
      <h3 className="text-xl md:text-2xl font-semibold mb-3">{title}</h3>
      {tagline && (
        <p className="text-sm md:text-base text-muted-foreground mb-4">
          {tagline}
        </p>
      )}
      {deliverables && deliverables.length > 0 && (
        <ul className="text-sm text-muted-foreground space-y-2">
          {deliverables.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

type ServicesProps = {
  services?: Service[];
};

export function Services({ services = [] }: ServicesProps) {
  const t = useTranslations('services');

  return (
    <section id="servizi" className="border-t border-border">
      <div className="mx-auto max-w-280 px-6 md:px-8 py-20 md:py-32">
        <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-12 opacity-40">
          {t('heading')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service._id} {...service} />
            ))
          ) : (
            <>
              <ServiceCard
                title="MVP Sprint"
                tagline="Test your idea fast. 2-6 weeks."
                deliverables={["Functional prototype", "User testing", "Quick iterations"]}
              />
              <ServiceCard
                title="Web App"
                tagline="Custom tools for operations. 6-10 weeks."
                deliverables={["Full-stack development", "Database design", "Admin dashboard"]}
              />
              <ServiceCard
                title="Landing / Site"
                tagline="Conversion-ready pages. 2-4 weeks."
                deliverables={["Responsive design", "SEO optimization", "Fast loading"]}
              />
              <ServiceCard
                title="Webflow Development"
                tagline="Marketing sites, fast iteration. 1-3 weeks."
                deliverables={["No-code CMS", "Quick edits", "Professional design"]}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
