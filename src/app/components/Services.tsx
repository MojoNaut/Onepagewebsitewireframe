import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface ServiceRowProps {
  title: string;
  description: string;
  index: number;
}

function ServiceRow({ title, description, index }: ServiceRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-8 md:py-10 hover:opacity-60 transition-opacity"
      >
        <span className="text-xl md:text-3xl uppercase tracking-wide font-medium text-left">
          {title}
        </span>
        <div className="shrink-0 ml-6">
          {isOpen ? (
            <Minus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          ) : (
            <Plus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="pb-8 md:pb-10 max-w-2xl">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

export function Services() {
  const services = [
    {
      title: "MVP SPRINT",
      description:
        "Da concept a prodotto funzionante in 4–6 settimane. Scope definito, feature core, interfaccia curata, pronto per i primi utenti.",
    },
    {
      title: "WEB APP SU MISURA",
      description:
        "Applicazioni su misura per processi interni o prodotti SaaS. Scalabilità, user experience e performance al centro del progetto.",
    },
    {
      title: "SITO / LANDING (WEBFLOW)",
      description:
        "Siti aziendali, landing page ad alta conversione, portali. Design pulito, SEO-friendly, pronti per campagne marketing.",
    },
  ];

  return (
    <section id="servizi" className="mx-auto max-w-[1120px] px-6 md:px-8 py-16 md:py-20">
      <div className="border-t border-border">
        {services.map((service, index) => (
          <ServiceRow key={index} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}