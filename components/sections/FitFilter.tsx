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
      <div className="mx-auto max-w-[1400px] px-6 md:px-24 py-20 md:py-32">
        
        {/* DESKTOP: Grid 2 colonne */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-20 items-start">
          
          {/* SVG Sinistra - Sticky */}
          <div className="sticky top-32">
            <VennDiagram 
              instanceId="fitfilter-venn"
              colorA="#3B82F6"
              colorB="#EC4899"
              fillOpacity={0.15}
            />
          </div>

          {/* Testo Destra */}
          <div className="space-y-16">
            {/* Perfect For */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-accent">
                {perfectTitle}
              </h3>
              <ul className="space-y-5">
                {perfectItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-accent mt-1 text-xl shrink-0">✓</span>
                    <span className="text-lg text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-foreground/60">
                {notForTitle}
              </h3>
              <ul className="space-y-5">
                {notForItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-foreground/40 mt-1 text-xl shrink-0">✕</span>
                    <span className="text-lg text-muted-foreground/70 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* MOBILE/TABLET: SVG come background (stile Rubik Cube) */}
        <div className="lg:hidden relative">
          
          {/* ✅ SVG Background - Opacity aumentata da 0.08 a 0.18 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-sm opacity-[0.22]">
              <VennDiagram 
                instanceId="fitfilter-venn-mobile"
                colorA="#3B82F6"
                colorB="#EC4899"
                fillOpacity={0.22}
              />
            </div>
          </div>

          {/* Testo in primo piano */}
          <div className="relative z-10 space-y-12">
            {/* Perfect For */}
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