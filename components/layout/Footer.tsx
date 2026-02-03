"use client";

type FooterProps = {
  brandName?: string;
  footerLine?: string;

  // opzionali (se vuoi tenerli)
  contactEmail?: string;
  linkedinUrl?: string;

  // opzionali per stile reference (coords/location)
  coordinates?: string;
  locationLine?: string;
};

export function Footer({
  brandName = "LIVOTI STU.",
  footerLine = "Guidato da Lorenzo Livoti. Network di specialisti quando serve.",
  contactEmail = "lorenzolivoti0690@gmail.com",
  linkedinUrl = "https://linkedin.com/in/lorenzo-livoti",
  coordinates = `N 45° 33' 00"  E 12° 00' 00"`,
  locationLine = "Located in Veneto, Italy",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const safeBrand = brandName.endsWith(".") ? brandName : `${brandName}.`;

  return (
    <footer className="border-t border-foreground/15">
      <div className="mx-auto max-w-350 px-6 md:px-12 lg:px-24 py-16 md:py-20">
        {/* BIG WORdMARK ONLY */}
        <h2
          className="
            uppercase font-bold
            leading-[0.85]
            tracking-[-0.06em]
            text-[clamp(3.5rem,10vw,9rem)]
          "
        >
          {safeBrand}
        </h2>

        {/* Bottom info row (no extra borders, only spacing) */}
        <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* LEFT */}
          <div className="max-w-xl">
            <p className="text-sm md:text-base text-foreground/80">{footerLine}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/70">
              <span>© {currentYear} {safeBrand.replace(/\.$/, "")}</span>

              {/* Contatti minimal (se vuoi: restano piccoli e non invadenti) */}
              {contactEmail && (
                <>
                  <span className="opacity-40">|</span>
                  <a
                    className="underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground/60 transition"
                    href={`mailto:${contactEmail}`}
                  >
                    Email
                  </a>
                </>
              )}

              {linkedinUrl && (
                <>
                  <span className="opacity-40">|</span>
                  <a
                    className="underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground/60 transition"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-left md:text-right">
            <div className="text-sm uppercase tracking-wider text-foreground/80">
              {coordinates}
            </div>
            <div className="mt-1 text-sm text-foreground/60">{locationLine}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
