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

    {/* DESKTOP */}
<div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">

  
  {/* VENN */}
<div className="sticky top-32 flex items-center justify-start">
  <div className="w-[560px] xl:w-[640px] 2xl:w-[720px] -ml-16 xl:-ml-24">


      <VennDiagram 
        instanceId="fitfilter-venn"
        colorA="#3B82F6"
        colorB="#EC4899"
        fillOpacity={0.15}
      />
    </div>
  </div>
      {/* TEXT */}
      <div className="space-y-20">
        
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

    {/* MOBILE / TABLET */}
    <div className="lg:hidden relative">

      {/* Background Venn */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-sm opacity-[0.18]">
          <VennDiagram 
            instanceId="fitfilter-venn-mobile"
            colorA="#3B82F6"
            colorB="#EC4899"
            fillOpacity={0.22}
          />
        </div>
      </div>

      {/* TEXT */}
      <div className="relative z-10 max-w-3xl space-y-16">
        
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