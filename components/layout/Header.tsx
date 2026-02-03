"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type HeaderProps = {
  settings?: SiteSettings;
};

export function Header({ settings }: HeaderProps) {
  const t = useTranslations("header");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const brandName = settings?.brandName || "LIVOTI STUDIO";
  const menu = settings?.header?.menu;
  const ctaLabel = settings?.header?.ctaLabel || t("cta");

  const menuItems = [
    { id: "servizi", label: menu?.servicesLabel || "Servizi" },
    { id: "metodo", label: menu?.methodLabel || "Metodo" },
    { id: "case", label: menu?.caseLabel || "Casi" },
    { id: "faq", label: menu?.faqLabel || "FAQ" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Scroll: header state + active section
  useEffect(() => {
    const sections = ["case", "servizi", "metodo", "faq", "contatti"];

    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 120;
      let current = "";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          current = sectionId;
          break;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu with ESC
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-350 px-6 md:px-12 lg:px-24">
          <div className="h-20 md:h-24 grid items-center grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr]">
            {/* LEFT: Brand */}
            <div className="flex items-center justify-self-start">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm md:text-base font-bold uppercase tracking-tight hover:opacity-60 transition-opacity duration-300"
                aria-label="Torna all'inizio"
              >
                {brandName.replace(" ", "")}
              </button>
            </div>

            {/* CENTER: Desktop menu (centrato) */}
            <nav className="hidden lg:flex justify-self-center items-center gap-1.5 px-2 py-2 rounded-full border border-foreground/15 bg-background/50 backdrop-blur-sm shadow-sm">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm transition-all duration-200",
                    activeSection === item.id
                      ? "bg-foreground text-background shadow-sm"
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* RIGHT: CTA (desktop) + Burger (mobile/tablet) */}
            <div className="flex items-center justify-self-end gap-4">
              {/* CTA separata a destra (solo desktop) */}
              <Button
                onClick={() => scrollToSection("contatti")}
                className="
                  hidden lg:inline-flex
                  h-11 px-7 rounded-full
                  border border-foreground/20
                  bg-gradient-to-r from-violet-200 via-fuchsia-200 to-sky-200
                  text-foreground
                  shadow-sm
                  transition-all duration-300
                  hover:brightness-105 hover:-translate-y-0.5
                  active:translate-y-0
                "
              >
                {ctaLabel}
              </Button>

              {/* Burger: solo mobile & tablet */}
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="flex lg:hidden flex-col gap-1.5 w-8 h-8 items-end justify-center group"
                aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
                aria-expanded={isMenuOpen}
              >
                <span
                  className={cn(
                    "w-full h-0.5 bg-foreground transition-all duration-300",
                    isMenuOpen && "rotate-45 translate-y-2"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-foreground transition-all duration-300",
                    isMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-foreground transition-all duration-300",
                    isMenuOpen && "-rotate-45 -translate-y-2"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Menu: Right Drawer */}
      <div
        className={cn(
          "fixed inset-0 lg:hidden z-[60]",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={cn(
            "absolute right-0 top-0 h-dvh w-[min(420px,100%)] bg-background border-l border-foreground/10",
            "transition-transform duration-500 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-foreground/10">
            <span className="text-sm uppercase tracking-wider opacity-70">Menu</span>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-foreground/15 hover:bg-foreground/5 transition"
              aria-label="Chiudi menu"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>

          {/* Drawer content */}
          <nav className="px-6 py-8 flex flex-col gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-2xl transition-all duration-200",
                  activeSection === item.id
                    ? "bg-foreground text-background"
                    : "bg-foreground/5 hover:bg-foreground/10 text-foreground"
                )}
              >
                <span className="text-lg uppercase tracking-tight">{item.label}</span>
              </button>
            ))}

            {/* CTA inside drawer */}
            <Button
              onClick={() => scrollToSection("contatti")}
              className="
                mt-6
                h-14 w-full rounded-full
                border border-foreground/20
                bg-gradient-to-r from-violet-200 via-fuchsia-200 to-sky-200
                text-foreground
                shadow-sm
                text-sm uppercase tracking-wider
                transition-all duration-300
                hover:brightness-105
              "
            >
              {ctaLabel}
            </Button>

          </nav>
        </div>
      </div>
    </>
  );
}
