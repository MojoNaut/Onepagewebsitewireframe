"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import SplitType from "split-type";

type HeroProps = {
  settings?: SiteSettings;
};

export function Hero({ settings }: HeroProps) {
  const t = useTranslations('hero');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  
  const brandName = settings?.brandName || "LIVOTI STUDIO";
  const headline = settings?.headline || t('headline');
  const subheadline = settings?.subheadline || t('subheadline');
  const primaryCta = settings?.hero?.primaryCtaLabel || t('primaryCta');
  const secondaryCta = settings?.hero?.secondaryCtaLabel || t('secondaryCta');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const brandWords = brandName.trim().split(/\s+/);

  useEffect(() => {
    if (!titleRef.current) return;

    const split = new SplitType(titleRef.current, { types: 'chars' });
    const chars = split.chars;
    if (!chars) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Gradient circle
    if (circleRef.current) {
      tl.from(circleRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      }, 0);
    }

    // Brand letters
    tl.from(chars, {
      opacity: 0,
      y: 120,
      rotateX: -90,
      stagger: 0.025,
      duration: 0.9,
    }, "-=1.2");

    // Headline
    tl.from(
      headlineRef.current,
      { opacity: 0, y: 40, duration: 1 },
      "-=0.5"
    );

    // Subheadline
    if (subheadlineRef.current) {
      tl.from(
        subheadlineRef.current,
        { opacity: 0, y: 30, duration: 0.8 },
        "-=0.6"
      );
    }

    // CTAs
    tl.from(
      ctaRef.current,
      { opacity: 0, y: 20, duration: 0.7 },
      "-=0.5"
    );

    return () => {
      split.revert();
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Gradient Circle - UI/UX Enhancement */}
      <div
        ref={circleRef}
        className="absolute -top-32 -right-32 md:-top-48 md:-right-48 w-125 h-125 md:w-175 md:h-175 rounded-full opacity-50 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #C4B5FD 0%, #BFDBFE 100%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-350 w-full px-6 md:px-12 lg:px-24 py-32 md:py-48">
        {/* Brand Name - Left Aligned */}
        <div className="mb-24 md:mb-32">
          <h1
            ref={titleRef}
            className="text-[80px] md:text-[120px] lg:text-[180px] leading-[0.85] font-bold uppercase tracking-tighter"
          >
            {brandWords.map((word, index) => (
              <div key={index} className="inline-block">
                {word}
                {index < brandWords.length - 1 && '.'}
                {index < brandWords.length - 1 && <br />}
              </div>
            ))}
          </h1>
        </div>

        {/* Headline - Centered, Larger */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-16">
          <h2
            ref={headlineRef}
            className="text-[32px] md:text-[42px] lg:text-[52px] font-semibold tracking-tight leading-[1.1]"
          >
            {headline}
          </h2>
        </div>

        {/* Subheadline - More Spacing */}
        {subheadline ? (
          <p
            ref={subheadlineRef}
            className="text-[17px] md:text-[19px] text-muted-foreground max-w-2xl mx-auto text-center mb-20 md:mb-24 leading-relaxed"
          >
            {subheadline}
          </p>
        ) : null}

        {/* CTAs - Enhanced Hover */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Button
            size="lg"
            onClick={() => scrollToSection("contatti")}
            className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-12 h-14 text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {primaryCta}
          </Button>
          <button
            onClick={() => scrollToSection("case")}
            className="text-sm uppercase tracking-wider font-medium underline underline-offset-8 hover:no-underline transition-all duration-300 decoration-2 hover:opacity-70"
          >
            {secondaryCta} →
          </button>
        </div>
      </div>
    </section>
  );
}
