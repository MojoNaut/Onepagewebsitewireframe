"use client";

import { useEffect, useRef } from "react";
import type { SiteSettings } from "@/types/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FitFilterProps = {
  copy?: SiteSettings['fitFilter'];
};

export function FitFilter({ copy }: FitFilterProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const perfectRef = useRef<HTMLDivElement>(null);
  const notForRef = useRef<HTMLDivElement>(null);

  const perfectTitle = copy?.perfectTitle || "Perfetto per te se:";
  const perfectItems = copy?.perfectItems || [
    "Hai un'idea da validare velocemente",
    "Vuoi un prodotto funzionante, non solo bello",
    "Cerchi qualcuno che capisca business e tech",
  ];

  const notForTitle = copy?.notForTitle || "Non per te se:";
  const notForItems = copy?.notForItems || [
    "Cerchi un'agenzia con team di 10+ persone",
    "Hai bisogno di sviluppo mobile nativo (iOS/Android)",
    "Vuoi micro-gestire ogni pixel",
  ];

  useEffect(() => {
    if (!perfectRef.current || !notForRef.current) return;

    gsap.from(perfectRef.current, {
      scrollTrigger: {
        trigger: perfectRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -60,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(notForRef.current, {
      scrollTrigger: {
        trigger: notForRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: 60,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <section ref={sectionRef} id="fit" className="border-t border-border">
      <div className="mx-auto max-w-350 px-6 md:px-12 lg:px-24 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Perfect For */}
          <div ref={perfectRef}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 text-accent">
              {perfectTitle}
            </h3>
            <ul className="space-y-5">
              {perfectItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="text-accent mt-1.5 text-2xl transition-transform group-hover:scale-110">✓</span>
                  <span className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For */}
          <div ref={notForRef}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 opacity-60">
              {notForTitle}
            </h3>
            <ul className="space-y-5">
              {notForItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="opacity-40 mt-1.5 text-2xl transition-transform group-hover:scale-110">✕</span>
                  <span className="text-base md:text-lg text-muted-foreground opacity-70 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
