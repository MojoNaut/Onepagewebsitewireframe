// components/sections/FitFilter.tsx
"use client";

import type { SiteSettings } from "@/types/content";
import { VennDiagram } from "@/components/icons/VennDiagram";

type FitFilterProps = {
  copy?: SiteSettings["fitFilter"];
};

export function FitFilter({ copy }: FitFilterProps) {
  // ✅ Dati da Sanity con fallback
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

  return (
    <section id="fit" className="scroll-mt-24 border-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-24 py-20 md:py-32">
        {/* DESKTOP: SVG sinistra | Testo destra */}
        {/* MOBILE: Testo sopra | SVG sotto (order) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* SVG: visibile sempre, ma comportamento diverso desktop/mobile */}
          <div className="order-2 lg:order-1">
            <div className="lg:opacity-100 opacity-20 lg:sticky lg:top-32">
              <VennDiagram instanceId="fitfilter-venn" />
            </div>
          </div>

          {/* Testo: Liste Perfect/NotFor */}
          <div className="order-1 lg:order-2 space-y-12">
            {/* Perfect For */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-accent">
                {perfectTitle}
              </h3>
              <ul className="space-y-4">
                {perfectItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent mt-1 text-lg">✓</span>
                    <span className="text-base md:text-lg text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-foreground/60">
                {notForTitle}
              </h3>
              <ul className="space-y-4">
                {notForItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-foreground/40 mt-1 text-lg">✕</span>
                    <span className="text-base md:text-lg text-muted-foreground/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
