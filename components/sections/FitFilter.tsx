// components/sections/FitFilter.tsx
"use client";

import type { SiteSettings } from "@/types/content";
import { VennDiagram } from "@/components/icons/VennDiagram";

type FitFilterProps = {
  copy?: SiteSettings["fitFilter"];
};

export function FitFilter({ copy }: FitFilterProps) {
  const perfectTitle = copy?.perfectTitle || "Perfetto per te se:";
  const perfectItems = copy?.perfectItems || [];
  const notForTitle = copy?.notForTitle || "Non per te se:";
  const notForItems = copy?.notForItems || [];

  return (
    <section id="fit" className="relative scroll-mt-24 overflow-hidden">
      <div className="container py-24 md:py-32">

        {/* ══════════════════════════════════════════
            DESKTOP (1024px+) — Grid 2 colonne
        ══════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">

          {/* VENN */}
          <div className="flex items-center justify-start">
<div className="w-[120%] -ml-24">



              <VennDiagram instanceId="fitfilter-venn" />
            </div>
          </div>

          {/* TEXT */}
          <div className="relative z-10 space-y-20">
            {/* Perfect */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-8 text-accent">
                {perfectTitle}
              </h3>
              <ul className="space-y-5">
                {perfectItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-accent mt-1 text-lg shrink-0">✓</span>
                    <span className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-8 text-foreground/60">
                {notForTitle}
              </h3>
              <ul className="space-y-5">
                {notForItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-foreground/40 mt-1 text-lg shrink-0">✕</span>
                    <span className="text-base md:text-lg text-muted-foreground/70 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

       
  {/* ══════════════════════════════════════════
    MOBILE + TABLET (<1024px) — Testo sx statico, Venn decorativo sotto
══════════════════════════════════════════ */}
<div className="lg:hidden relative">

  {/* Venn — decorativo, absolute, non influenza il layout */}
  <div className="absolute inset-0 pointer-events-none ">
    <div
      className="
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-[95vw]
       sm:left-auto sm:right-0 sm:translate-x-[18%] sm:-translate-y-1/2
       sm:w-[80vw] sm:max-w-[550px]
        opacity-[0.8]"
    >
      <VennDiagram instanceId="fitfilter-venn-mobile" />
    </div>
  </div>

  {/* TEXT — statico, sempre a sinistra, comanda l'altezza */}
  <div className="relative z-10 max-w-[75%] sm:max-w-[65%] space-y-16">
    {/* Perfect */}
    <div>
      <h3 className="text-xl font-semibold mb-6 text-accent">
        {perfectTitle}
      </h3>
      <ul className="space-y-4">
        {perfectItems.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-accent mt-1 text-lg shrink-0">✓</span>
            <span className="text-base text-muted-foreground leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>

    {/* Not For */}
    <div>
      <h3 className="text-xl font-semibold mb-6 text-foreground/60">
        {notForTitle}
      </h3>
      <ul className="space-y-4">
        {notForItems.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-foreground/40 mt-1 text-lg shrink-0">✕</span>
            <span className="text-base text-muted-foreground/70 leading-relaxed">
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