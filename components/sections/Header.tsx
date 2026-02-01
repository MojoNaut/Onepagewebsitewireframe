"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";

type HeaderProps = {
  settings?: SiteSettings;
};

export function Header({ settings }: HeaderProps) {
  const t = useTranslations('header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const brandName = settings?.brandName || "LIVOTI STUDIO";
  const menu = settings?.header?.menu;
  const ctaLabel = settings?.header?.ctaLabel || t('cta');

  // Detect scroll for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-350 px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm md:text-base font-bold uppercase tracking-tight hover:opacity-60 transition-opacity duration-300"
            >
              {brandName.replace(' ', '')}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 w-8 h-8 items-end justify-center group"
              aria-label="Menu"
            >
              <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 bg-background z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => scrollToSection("case")}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight hover:opacity-60 transition-all duration-300"
          >
            {menu?.caseLabel || 'Casi'}
          </button>
          <button
            onClick={() => scrollToSection("servizi")}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight hover:opacity-60 transition-all duration-300"
          >
            {menu?.servicesLabel || 'Servizi'}
          </button>
          <button
            onClick={() => scrollToSection("metodo")}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight hover:opacity-60 transition-all duration-300"
          >
            {menu?.methodLabel || 'Metodo'}
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight hover:opacity-60 transition-all duration-300"
          >
            {menu?.faqLabel || 'FAQ'}
          </button>
          
          <Button
            onClick={() => scrollToSection("contatti")}
            className="mt-12 bg-foreground text-background hover:bg-foreground/90 rounded-none px-12 h-16 text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-1"
          >
            {ctaLabel}
          </Button>
        </nav>
      </div>
    </>
  );
}
