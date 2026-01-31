interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

function ProcessStep({ number, title, description }: ProcessStepProps) {
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

export function Process() {
  const steps = [
    {
      number: "01",
      title: "Allineamento",
      description:
        "Kickoff call per allineare obiettivi, vincoli e priorità. Definiamo insieme cosa serve davvero.",
    },
    {
      number: "02",
      title: "Scope & Prototipo",
      description:
        "Documento di scope, wireframe e roadmap. Ti presento il piano, milestone per milestone.",
    },
    {
      number: "03",
      title: "Build & QA",
      description:
        "Sviluppo iterativo con checkpoint settimanali. Quality check continui, bug risolti in tempo reale.",
    },
    {
      number: "04",
      title: "Go-live & Handoff",
      description:
        "Deploy, documentazione tecnica e training. Sei autonomo dal day one, supporto disponibile post-lancio.",
    },
  ];

  return (
    <section id="metodo" className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 py-20 md:py-32">
        <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-8 opacity-40">
          Metodo
        </h2>

        <div>
          {steps.map((step, index) => (
            <ProcessStep key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}