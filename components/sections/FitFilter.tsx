import type { SiteSettings } from "@/types/content";

type FitFilterProps = {
  copy?: SiteSettings['fitFilter'];
};

export function FitFilter({ copy }: FitFilterProps) {
  const perfectTitle = copy?.perfectTitle || "Perfetto per te se:";
  const perfectItems = copy?.perfectItems || [
    "Hai un'idea da validare velocemente",
    "Vuoi un prodotto funzionante, non solo bello",
    "Cerchi qualcuno che capisca business e tech",
  ];

  const notForTitle = copy?.notForTitle || "Non per te se:";
  const notForItems = copy?.notForItems || [
    "Cerchi un'agenzia con team di 10+ persone",
    "Hai bisogno di sviluppo mobile nativo (iOS/Android)",
    "Vuoi micro-gestire ogni pixel",
  ];

  return (
    <section id="fit" className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Perfect For */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-6 text-accent">
              {perfectTitle}
            </h3>
            <ul className="space-y-4">
              {perfectItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-sm md:text-base text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-6 opacity-60">
              {notForTitle}
            </h3>
            <ul className="space-y-4">
              {notForItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="opacity-40 mt-1">✕</span>
                  <span className="text-sm md:text-base text-muted-foreground opacity-70">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
