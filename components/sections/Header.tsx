"use client";

import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";

type HeaderProps = {
  settings?: SiteSettings;
};

export function Header({ settings }: HeaderProps) {
  const t = useTranslations('header');
  
  const brandName = settings?.brandName || "LIVOTI STUDIO";
  const menu = settings?.header?.menu;
  const ctaLabel = settings?.header?.ctaLabel || t('cta');
  const mobileCtaLabel = settings?.header?.mobileCtaLabel || t('mobileCta');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-280 px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium hover:opacity-60 transition-opacity"
          >
            {brandName}
          </button>

          <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-sm border border-border/50 rounded-full px-2 py-1.5">
            <button
              onClick={() => scrollToSection("case")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              {menu?.caseLabel || t('menu.case')}
            </button>
            <button
              onClick={() => scrollToSection("servizi")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              {menu?.servicesLabel || t('menu.services')}
            </button>
            <button
              onClick={() => scrollToSection("metodo")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              {menu?.methodLabel || t('menu.method')}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              {menu?.faqLabel || t('menu.faq')}
            </button>
          </nav>

          <Button
            onClick={() => scrollToSection("contatti")}
            className="hidden lg:block bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-5 h-9 text-[13px]"
          >
            {ctaLabel}
          </Button>

          <Button
            onClick={() => scrollToSection("contatti")}
            className="lg:hidden bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-4 h-9 text-xs"
          >
            {mobileCtaLabel}
          </Button>
        </div>
      </div>
    </header>
  );
}
