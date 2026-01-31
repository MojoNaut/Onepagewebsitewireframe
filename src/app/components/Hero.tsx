import { Button } from "@/app/components/ui/button";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="mx-auto max-w-[1120px] px-6 md:px-8 pt-20 md:pt-28 pb-24 md:pb-32">
      {/* Oversized Wordmark - Centered */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-[18vw] md:text-[12vw] lg:text-[140px] leading-[0.85] font-bold uppercase tracking-tighter">
          LIVOTI<br />STUDIO.
        </h1>
      </div>

      {/* Centered Uppercase Statement */}
      <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
        <h2 className="text-base md:text-xl lg:text-2xl uppercase tracking-[0.15em] font-medium leading-tight">
          CREO MVP, WEB APP E SITI CHE SBLOCCANO CRESCITA E OPERATIVITÀ.
        </h2>
      </div>

      {/* CTAs - Centered */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Button
          size="lg"
          onClick={() => scrollToSection("contatti")}
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 h-11 text-sm"
        >
          Parliamo del progetto
        </Button>
        <button
          onClick={() => scrollToSection("lavori")}
          className="text-sm underline underline-offset-4 hover:no-underline transition-all"
        >
          Vedi lavori
        </button>
      </div>
    </section>
  );
}