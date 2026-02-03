"use client";

import { useState, useEffect, useRef } from "react";
import type { Service } from "@/types/content";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AccordionItemProps {
  title: string;
  tagline?: string;
  deliverables?: string[];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ title, tagline, deliverables, isOpen, onToggle, index }: AccordionItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.from(itemRef.current, {
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power2.out",
    });
  }, [index]);

  return (
    <div ref={itemRef} className="border-t border-border">
      <button
        onClick={onToggle}
        className="w-full py-10 md:py-14 flex items-center justify-between gap-8 text-left hover:opacity-70 transition-opacity duration-300 group"
      >
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight">
          {title}
        </h3>
        <span 
          className="text-4xl md:text-5xl font-light transition-transform duration-500 shrink-0"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>

      {/* Content */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? '1000px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-14 md:pb-16 pr-16">
          {tagline && (
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl leading-relaxed">
              {tagline}
            </p>
          )}
          
          {deliverables && deliverables.length > 0 && (
            <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-foreground mt-1 text-xl">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

type ServicesProps = {
  services?: Service[];
};

export function Services({ services = [] }: ServicesProps) {
  const t = useTranslations('services');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const defaultServices: Service[] = [
    {
      _id: '1',
      title: 'MVP Sprint',
      tagline: 'Demo/MVP per validare un\'idea o sbloccare una vendita.',
      deliverables: [
        'Obiettivo e scope timebox',
        'Prototipo / flusso principale',
        'Versione riasciabile per demo o primi utenti',
        'Lista next step prioritizzata',
      ],
    },
    {
      _id: '2',
      title: 'Web App su misura',
      tagline: 'Strumenti operativi per gestire processi, contenuti e flussi.',
      deliverables: [
        'Mappatura processo e requisiti essenziali',
        'Interfacce operative (dashboard / gestione)',
        'Ruoli e permessi (se serve)',
        'QA e consegna ordinata',
      ],
    },
    {
      _id: '3',
      title: 'Sito / Landing',
      tagline: 'Pagine chiare e conversion-ready per presentarsi e acquisire contatti.',
      deliverables: [
        'Struttura messaggi e sezioni',
        'Copy essenziale e gerarchia contenuti',
        'CTA e form contatto efficaci',
        'Setup base per misurare richieste',
      ],
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="servizi" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-350 px-6 md:px-12 lg:px-24 py-24 md:py-40">
        {/* Label */}
        <p className="text-xs uppercase tracking-[0.3em] font-medium mb-20 md:mb-24 opacity-40">
          {t('heading')}
        </p>

        {/* Accordion */}
        <div className="border-b border-border">
          {displayServices.map((service, index) => (
            <AccordionItem
              key={service._id}
              title={service.title}
              tagline={service.tagline}
              deliverables={service.deliverables}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
