// components/layout/Hero.tsx
"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IsometricRubikScrollCube } from "@/components/icons/IsometricRubikScrollCube";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  settings?: SiteSettings;
};

export function Hero({ settings }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const dynamicRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const cubeProgressRef = useRef(0);
  const [cubeProgress, setCubeProgress] = useState(0);

  // 🔍 DEBUG: Vediamo cosa arriva da Sanity
  console.log("=== HERO DEBUG ===");
  console.log("1. settings (tutto):", settings);
  console.log("2. settings.brandName:", settings?.brandName);
  console.log("3. settings.hero:", settings?.hero);
  console.log("4. settings.hero.manifestoLines:", settings?.hero?.manifestoLines);
  console.log("5. settings.hero.headline:", settings?.hero?.headline);
  console.log("6. settings.hero.primaryCtaLabel:", settings?.hero?.primaryCtaLabel);
  console.log("7. settings.hero.secondaryCtaLabel:", settings?.hero?.secondaryCtaLabel);
  console.log("==================");

  // ✅ Tutto da Sanity, fallback minimi solo per evitare crash
  const brandName = settings?.brandName ?? "";
  const manifesto = settings?.hero?.manifestoLines ?? [];
  const headline = settings?.hero?.headline ?? "";
  const primaryCta = settings?.hero?.primaryCtaLabel ?? "";
  const secondaryCta = settings?.hero?.secondaryCtaLabel ?? "";

  // 🔍 DEBUG: Valori finali usati nel render
  console.log("=== VALORI FINALI ===");
  console.log("brandName:", brandName);
  console.log("manifesto:", manifesto);
  console.log("headline:", headline);
  console.log("primaryCta:", primaryCta);
  console.log("secondaryCta:", secondaryCta);
  console.log("=====================");

  const manifestoDep = useMemo(() => manifesto.join("\u0000"), [manifesto]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      dynamicRefs.current.length = manifesto.length;
      const els = dynamicRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (els.length === 0) return;

      gsap.set(els, { opacity: 0, visibility: "hidden" });
      gsap.set(els[0], { opacity: 1, visibility: "visible" });

      cubeProgressRef.current = 0;
      setCubeProgress(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      els.forEach((el, i) => {
        tl.to(el, {
          opacity: 1,
          visibility: "visible",
          duration: 0.25,
          ease: "none",
        });

        tl.to(
          cubeProgressRef,
          {
            current: (i + 1) / els.length,
            duration: 0.4,
            ease: "none",
            onUpdate: () => setCubeProgress(cubeProgressRef.current),
          },
          "<"
        );

        if (i > 0) {
          tl.to(
            els[i - 1],
            {
              opacity: 0,
              visibility: "hidden",
              duration: 0.25,
              ease: "none",
            },
            "<"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [manifestoDep, manifesto.length]);

  return (
    <section ref={sectionRef} className="relative min-h-svh overflow-hidden">
      {/* ======================
          CUBE – BACKGROUND (SEMPRE CENTRATO)
         ====================== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="
              w-[125vw] h-[125vw]
              sm:w-screen sm:h-[100vw]
              lg:w-[82vw] lg:h-[82vw]
              max-w-275 max-h-275
              text-[hsl(var(--cube-soft)/0.22)]
            "
          >
            <IsometricRubikScrollCube
              className="w-full h-full"
              turns={3}
              steppedRotation
              animateLid
              externalProgress={cubeProgress}
            />
          </div>
        </div>
      </div>

      {/* ======================
          CONTENT (SEMPRE CENTRATO)
         ====================== */}
      <div
        className="
          relative z-10
          mx-auto max-w-6xl
          px-6 sm:px-8 md:px-12 lg:px-24
          min-h-svh
          flex flex-col justify-center items-center
          gap-10 sm:gap-14
          py-16 sm:py-20
          text-center
        "
      >
        {/* HERO STATEMENT */}
        <h1
          className="
            uppercase font-bold
            leading-[0.95] sm:leading-[0.9]
            tracking-[-0.04em]
            text-[clamp(2.2rem,8vw,6rem)]
          "
        >
          <span className="block text-[0.75em] opacity-70">
            {brandName}
            <span className="opacity-60">:</span>
          </span>

          <span className="relative block mt-3 min-h-[2.4em] sm:min-h-[1.2em]">
            {manifesto.map((line, i) => (
              <span
                key={i}
                ref={(el) => {
                  dynamicRefs.current[i] = el;
                }}
                className="
                  absolute left-1/2 top-0 -translate-x-1/2
                  opacity-0 pointer-events-none
                  max-w-[90vw] sm:max-w-none
                  whitespace-normal sm:whitespace-nowrap
                  leading-[1.05]
                "
              >
                {line}
              </span>
            ))}
          </span>
        </h1>

        {/* HEADLINE + CTA */}
        <div className="w-full flex flex-col items-center gap-6">
          <p className="text-muted-foreground text-base sm:text-lg max-w-md">
            {headline}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-5 sm:gap-6">
            <Button
              size="lg"
              onClick={() => scrollTo("contatti")}
              className="
                w-full sm:w-auto
                bg-foreground text-background
                rounded-full
                px-10 h-14
                text-sm uppercase tracking-wider font-medium
              "
            >
              {primaryCta}
            </Button>

            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="
                text-sm uppercase tracking-wider font-medium
                underline underline-offset-8
                opacity-70 hover:opacity-100 transition
                inline-flex items-center justify-center
              "
            >
              {secondaryCta} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}