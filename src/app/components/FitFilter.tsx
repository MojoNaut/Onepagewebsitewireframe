import { Check, X } from "lucide-react";

export function FitFilter() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Circle Placeholder */}
          <div className="w-full aspect-square rounded-full border border-border/60" />

          {/* Two Columns */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Perfect If */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-8 opacity-40">
                Perfetto se
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-1 shrink-0" strokeWidth={1.5} />
                  <p className="text-sm md:text-base leading-relaxed">
                    Hai un'idea validata e vuoi lanciarla entro 4–8 settimane
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-1 shrink-0" strokeWidth={1.5} />
                  <p className="text-sm md:text-base leading-relaxed">
                    Cerchi qualità professionale senza perdere tempo in
                    microgestione
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-1 shrink-0" strokeWidth={1.5} />
                  <p className="text-sm md:text-base leading-relaxed">
                    Vuoi un partner tecnico che propone soluzioni, non solo esegue
                  </p>
                </div>
              </div>
            </div>

            {/* Not For You If */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-8 opacity-40">
                Non fa per te se
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-1 shrink-0 opacity-50" strokeWidth={1.5} />
                  <p className="text-sm md:text-base leading-relaxed">
                    Cerchi un team in-house da integrare a lungo termine
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-1 shrink-0 opacity-50" strokeWidth={1.5} />
                  <p className="text-sm md:text-base leading-relaxed">
                    Hai bisogno di modifiche continue senza roadmap definita
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-1 shrink-0 opacity-50" strokeWidth={1.5} />
                  <p className="text-sm md:text-base leading-relaxed">
                    Vuoi prezzi al ribasso: puntiamo su valore, non su volume
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}