"use client";

import { useEffect, useRef } from "react";
import type { SiteSettings } from "@/types/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Full-bleed divider (stesso pattern di Services) ── */
function FullBleedDivider({ position = "top" }: { position?: "top" | "bottom" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 w-[100vw] border-border ${
        position === "top" ? "top-0 border-t" : "bottom-0 border-b"
      }`}
    />
  );
}

/* ── Step Card ── */
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
        start: "top 85%",
        end: "top 55%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out",
    });
  }, [index]);

  return (
    <div ref={stepRef} className="relative">
      <FullBleedDivider position="top" />

      <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-6 md:gap-12 py-12 md:py-16 lg:py-20">
        {/* Number — ridotto, leggero */}
        <div className="text-2xl md:text-3xl font-medium text-foreground/30 pt-1">
          {number}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight mb-4 md:mb-6">
            {title}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
type ProcessProps = {
  copy?: SiteSettings["process"];
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
    <section id="metodo" className="scroll-mt-24 relative overflow-hidden">
      <div className="relative container py-20 md:py-28 lg:py-36">
       

        {/* Steps */}
        <div className="relative">
          {steps.map((step, index) => (
            <ProcessStepCard key={index} {...step} index={index} />
          ))}
          {/* Divider finale sotto l'ultimo step */}
          <FullBleedDivider position="bottom" />
        </div>
      </div>
    </section>
  );
}