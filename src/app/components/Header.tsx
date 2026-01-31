import { Button } from "@/app/components/ui/button";

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium hover:opacity-60 transition-opacity"
          >
            LIVOTI STUDIO.
          </button>

          {/* Center Pill Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-sm border border-border/50 rounded-full px-2 py-1.5">
            <button
              onClick={() => scrollToSection("lavori")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              Lavori
            </button>
            <button
              onClick={() => scrollToSection("servizi")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              Servizi
            </button>
            <button
              onClick={() => scrollToSection("metodo")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              Metodo
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contatti")}
              className="px-4 py-1.5 text-[13px] rounded-full hover:bg-white transition-colors"
            >
              Contatti
            </button>
          </nav>

          {/* CTA */}
          <Button
            onClick={() => scrollToSection("contatti")}
            className="hidden lg:block bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-5 h-9 text-[13px]"
          >
            Parliamo del progetto
          </Button>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => scrollToSection("contatti")}
            className="lg:hidden bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-4 h-9 text-xs"
          >
            Contatti
          </Button>
        </div>
      </div>
    </header>
  );
}