"use client";

import { useEffect, useRef } from "react";
import type { SiteSettings } from "@/types/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStepCardProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

function ProcessStepCard({ number, title, description, index }: ProcessStepCardProps) {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stepRef.current) return;

    gsap.from(stepRef.current, {
      scrollTrigger: {
        trigger: stepRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 80,
      duration: 0.9,
      delay: index * 0.15,
      ease: "power3.out",
    });
  }, [index]);

  return (
    <div ref={stepRef} className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-10 md:gap-20 py-14 md:py-20 border-t border-border">
      {/* Number */}
      <div className="text-7xl md:text-9xl lg:text-[160px] font-bold opacity-8 leading-none tracking-tighter">
        {number}
      </div>

      {/* Content */}
      <div className="pt-3 md:pt-6">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-6 md:mb-8">
          {title}
        </h3>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
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
  const circleRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    if (!circleRef.current) return;

    gsap.to(circleRef.current, {
      scrollTrigger: {
        trigger: circleRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
      },
      y: 250,
      scale: 1.3,
      ease: "none",
    });
  }, []);

  return (
    <section id="metodo" className="scroll-mt-24 relative  border-border overflow-hidden">
      {/* Decorative Circle */}
      <div
        ref={circleRef}
        className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-150 h-150 md:w-225 md:h-225 rounded-full opacity-35 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #C4B5FD 0%, #BFDBFE 100%)',
          filter: 'blur(120px)',
        }}
      />

<div className="relative z-10 container py-20 md:py-28 lg:py-36">
        <p className="text-xs uppercase tracking-[0.3em] font-medium mb-20 md:mb-24 opacity-40">
          {heading}
        </p>

        <div className="border-b border-border">
          {steps.map((step, index) => (
            <ProcessStepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
