"use client";

import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";

type HeroProps = {
  settings?: SiteSettings;
};

function splitBrand(brandName: string) {
  const clean = brandName.trim();
  if (!clean) return { line1: "", line2: "" };
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return { line1: parts[0], line2: "" };
  return { line1: parts[0], line2: parts.slice(1).join(" ") };
}

export function Hero({ settings }: HeroProps) {
  const t = useTranslations('hero');
  
  const brandName = settings?.brandName || "LIVOTI STUDIO";
  const headline = settings?.headline || t('headline');
  const subheadline = settings?.subheadline || t('subheadline');
  const primaryCta = settings?.hero?.primaryCtaLabel || t('primaryCta');
  const secondaryCta = settings?.hero?.secondaryCtaLabel || t('secondaryCta');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const { line1, line2 } = splitBrand(brandName);

  return (
    <section className="mx-auto max-w-280 px-6 md:px-8 pt-20 md:pt-28 pb-24 md:pb-32">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-[18vw] md:text-[12vw] lg:text-[140px] leading-[0.85] font-bold uppercase tracking-tighter">
          {line1}
          {line2 ? (
            <>
              <br />
              {line2}
            </>
          ) : null}
        </h1>
      </div>

      <div className="text-center mb-6 md:mb-8 max-w-3xl mx-auto">
        <h2 className="text-base md:text-xl lg:text-2xl uppercase tracking-[0.15em] font-medium leading-tight">
          {headline}
        </h2>
      </div>

      {subheadline ? (
        <p className="text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheadline}
        </p>
      ) : null}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Button
          size="lg"
          onClick={() => scrollToSection("contatti")}
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 h-11 text-sm"
        >
          {primaryCta}
        </Button>
        <button
          onClick={() => scrollToSection("case")}
          className="text-sm underline underline-offset-4 hover:no-underline transition-all"
        >
          {secondaryCta}
        </button>
      </div>
    </section>
  );
}
