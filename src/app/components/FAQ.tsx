import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 md:py-8 hover:opacity-60 transition-opacity"
      >
        <span className="text-base md:text-lg font-medium text-left pr-6">
          {question}
        </span>
        <div className="shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Plus className="w-5 h-5" strokeWidth={1.5} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="pb-6 md:pb-8 max-w-2xl">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const faqs = [
    {
      question: "Quanto dura un MVP Sprint?",
      answer:
        "Un MVP Sprint dura tipicamente 4–6 settimane dall'allineamento al go-live. Include scope, design, sviluppo e testing. Ogni progetto ha milestone chiare con checkpoint settimanali.",
    },
    {
      question: "Che budget serve per partire?",
      answer:
        "Dipende dal tipo di progetto. Landing page: da €5k. MVP Sprint: da €10k. Web App custom: da €20k. Durante il kickoff ti presento un preventivo dettagliato senza sorprese.",
    },
    {
      question: "Lavorate anche con agenzie?",
      answer:
        "Sì, collaboro spesso come partner tecnico per agenzie creative o marketing. Posso gestire l'intero build o supportare su feature specifiche. Massima flessibilità e comunicazione diretta.",
    },
    {
      question: "Cosa vi serve per iniziare?",
      answer:
        "Un brief chiaro con obiettivo, target, vincoli (tempo/budget). Se hai mockup o specifiche tecniche, ottimo. Altrimenti ti aiuto a strutturare tutto durante lo scope. Basta avere l'idea chiara.",
    },
    {
      question: "Cosa succede dopo il go-live?",
      answer:
        "30 giorni di bugfix inclusi. Per nuove feature, manutenzione o ottimizzazioni, propongo retainer mensili o interventi spot. Ti formo per essere autonomo, ma resto sempre disponibile.",
    },
  ];

  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 py-20 md:py-32">
        <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-12 opacity-40">
          FAQ
        </h2>

        <div className="max-w-3xl">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}