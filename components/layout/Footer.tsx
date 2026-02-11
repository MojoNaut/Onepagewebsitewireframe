"use client";

import Image from "next/image";
import type { SiteSettings } from "@/types/content";

type FooterProps = {
  settings?: SiteSettings;
  coordinates?: string;
  locationLine?: string;
};

export function Footer({
  settings,
  coordinates = `N 45° 33' 00"  E 12° 00' 00"`,
  locationLine = "Located in Veneto, Italy",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const brandName = settings?.brandName ?? "STUDIO";
  const safeBrand = brandName.endsWith(".") ? brandName : `${brandName}.`;

  const logoUrl = settings?.brand?.logo?.url;
  const logoAlt = settings?.brand?.logoAlt || brandName;

  // Un solo testo (come hai deciso tu)
  const footerLine = settings?.footer?.line ?? "";

  const contactEmail = settings?.contactEmail;
  const linkedinUrl = settings?.linkedinUrl;

  // micro-logo accanto all'anno: se non lo vuoi, metti a null
  const microLogoUrl = settings?.brand?.icon?.url || null;

  return (
    <footer className="border-t border-foreground/15">
<div className="container py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          {/* LEFT */}
          <div>
            {/* LOGO GRANDE A SINISTRA */}
            {logoUrl ? (
              <div className="flex items-start">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  width={1200}
                  height={320}
                  priority
                  sizes="(min-width: 1024px) 720px, 90vw"
                  className="
                    block
                    h-24 md:h-32 lg:h-40
                    w-auto
                    object-contain object-left
                  "
                />
              </div>
            ) : (
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
            )}

            {/* TESTO SOTTO (uno solo) */}
            {footerLine && (
              <p className="mt-6 text-sm md:text-base text-foreground/80 max-w-xl">
                {footerLine}
              </p>
            )}

            {/* COPYRIGHT + LINK */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/70">
              <span className="inline-flex items-center gap-2">
                © {currentYear}
                {microLogoUrl ? (
                  <Image
                    src={microLogoUrl}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px]"
                  />
                ) : null}
              </span>

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
          <div className="text-left lg:text-right">
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
