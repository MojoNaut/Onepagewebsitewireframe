"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IsometricRubikScrollCube } from "@/components/icons/IsometricRubikScrollCube";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  settings?: SiteSettings;
};

export function Hero({ settings }: HeroProps) {
  const t = useTranslations("hero");

  const sectionRef = useRef<HTMLElement>(null);
  const dynamicRefs = useRef<HTMLSpanElement[]>([]);
  const cubeProgressRef = useRef(0);
  const [cubeProgress, setCubeProgress] = useState(0);



  const staticPrefix = settings?.brandName ?? "CREIAMO";

  const getSafe = (key: string, fallback: string) => {
    const value = t(key);
    return value === key || value.includes(".") ? fallback : value;
  };

  const manifesto = [
    getSafe("manifestoLine1", "MVP"),
    getSafe("manifestoLine2", "WEB APP"),
    getSafe("manifestoLine3", "SITI CHE CRESCONO"),
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (dynamicRefs.current.length === 0) return;

      gsap.set(dynamicRefs.current, {
        opacity: 0,
        visibility: "hidden",
      });

      gsap.set(dynamicRefs.current[0], {
        opacity: 1,
        visibility: "visible",
      });

      cubeProgressRef.current = 0;
      setCubeProgress(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });

      dynamicRefs.current.forEach((el, i) => {
        tl.to(el, {
          opacity: 1,
          visibility: "visible",
          duration: 0.25,
          ease: "none",
        });

        tl.to(
          cubeProgressRef,
          {
            current: (i + 1) / dynamicRefs.current.length,
            duration: 0.4,
            ease: "none",
            onUpdate: () => setCubeProgress(cubeProgressRef.current),
          },
          "<"
        );

        if (i > 0) {
          tl.to(
            dynamicRefs.current[i - 1],
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* ======================
          CUBE – BACKGROUND
         ====================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[-1] flex items-center justify-center"
      >
        <div
          className="
            w-[110vw] h-[110vw]
            sm:w-[90vw] sm:h-[90vw]
            lg:w-[80vw] lg:h-[80vw]
           max-w-275 max-h-275
            text-[hsl(var(--cube-soft)/0.3)]
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

      {/* ======================
          CONTENT
         ====================== */}
      <div
        className="
          relative z-10
          mx-auto max-w-6xl
          px-6 sm:px-8 md:px-12 lg:px-24
          min-h-screen
          flex flex-col justify-center
          gap-10 sm:gap-14
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
            {staticPrefix}
            <span className="opacity-60">:</span>
          </span>

          <span className="relative block mt-3 h-[1.2em]">
            {manifesto.map((line, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) dynamicRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 opacity-0 pointer-events-none"
              >
                {line}
              </span>
            ))}
          </span>
        </h1>

        {/* HEADLINE + CTA */}
        <div className="max-w-md space-y-5">
          <p className="text-muted-foreground text-base sm:text-lg">
            {t("headline")}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
  <Button
    size="lg"
    className="
      bg-foreground text-background
      rounded-full
      px-10 h-14
      text-sm uppercase tracking-wider font-medium
    "
  >
    Let’s talk about your project
  </Button>

  <a
    href="#projects"
    className="
      text-sm uppercase tracking-wider font-medium
      underline underline-offset-8
      opacity-70 hover:opacity-100 transition
    "
  >
    View projects →
  </a>
</div>

        </div>
      </div>
    </section>
  );
}
