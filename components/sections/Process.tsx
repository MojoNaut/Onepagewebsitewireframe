import type { SiteSettings } from "@/types/content";

interface ProcessStepCardProps {
  number: string;
  title: string;
  description: string;
}

function ProcessStepCard({ number, title, description }: ProcessStepCardProps) {
  return (
    <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-12 py-8 md:py-10 border-t border-border">
      <span className="text-2xl md:text-3xl font-medium opacity-20">
        {number}
      </span>
      <div>
        <h3 className="text-lg md:text-xl font-medium mb-3">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
          {description}
        </p>
      </div>
    </div>
  );
}

type ProcessProps = {
  copy?: SiteSettings['process'];
};

export function Process({ copy }: ProcessProps) {
  const heading = copy?.heading || "Metodo";
  const steps = copy?.steps || [
    {
      number: "01",
      title: "Allineamento",
      description: "Definiamo obiettivo, priorità, vincoli e cosa conta davvero.",
    },
    {
      number: "02",
      title: "Scope & Prototipo",
      description: "Riduciamo complessità: cosa entra, cosa resta fuori, e un prototipo per allinearci.",
    },
    {
      number: "03",
      title: "Build & QA",
      description: "Costruzione, revisione e test: ogni dettaglio è verificato prima del rilascio.",
    },
    {
      number: "04",
      title: "Go-live & Handoff",
      description: "Messa online, consegna ordinata e supporto iniziale per partire senza frizioni.",
    },
  ];

  return (
    <section id="metodo" className="border-t border-border">
      <div className="mx-auto max-w-280 px-6 md:px-8 py-20 md:py-32">
        <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-8 opacity-40">
          {heading}
        </h2>

        <div>
          {steps.map((step, index) => (
            <ProcessStepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
