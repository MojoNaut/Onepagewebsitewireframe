// components/sections/Contact.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ContactProps = {
  contactEmail?: string;
  copy?: SiteSettings["contactSection"];
};

export function Contact({ contactEmail, copy }: ContactProps) {
  const t = useTranslations("contact");
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  const title = copy?.title || t("title");
  const subtitle = copy?.subtitle || t("subtitle");
  const submitLabel = copy?.submitLabel || t("submitLabel");
  const nameLabel = copy?.nameLabel || "Nome";
  const namePlaceholder = copy?.namePlaceholder || "Il tuo nome";
  const emailLabel = copy?.emailLabel || "Email";
  const emailPlaceholder = copy?.emailPlaceholder || "la.tua@email.com";
  const messageLabel = copy?.messageLabel || "Messaggio";
  const messagePlaceholder = copy?.messagePlaceholder || "Raccontami del tuo progetto...";
  const emailFallbackText = copy?.emailFallbackText || "Oppure scrivimi direttamente:";

  // Scroll reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section id="contatti" className="scroll-mt-24">
      <div className="container py-20 md:py-28 lg:py-36">
        <div ref={sectionRef} className="max-w-3xl mx-auto text-center">
          {/* ── Statement ── */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95] mb-6">
            {title}
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 md:mb-12 max-w-xl mx-auto">
            {subtitle}
          </p>

          {/* ── CTA Trigger ── */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "inline-flex items-center gap-3",
              "px-10 h-14 rounded-full",
              "bg-foreground text-background",
              "text-sm uppercase tracking-wider font-medium",
              "hover:opacity-80 transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            )}
          >
            {isOpen ? submitLabel : title}
            <span
              className={cn(
                "transition-transform duration-500",
                ease,
                isOpen ? "rotate-45" : "rotate-0"
              )}
            >
              +
            </span>
          </button>

          {/* ── Expandable Form ── */}
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-700",
              ease,
              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <form className="pt-12 md:pt-16 space-y-6 text-left max-w-xl mx-auto">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">
                    {nameLabel} *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder={namePlaceholder}
                    className="w-full px-5 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all bg-background text-base"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-2 block">
                    {emailLabel} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder={emailPlaceholder}
                    className="w-full px-5 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all bg-background text-base"
                  />
                </div>

                {/* Messaggio */}
                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-2 block">
                    {messageLabel} *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder={messagePlaceholder}
                    className="w-full px-5 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all resize-none bg-background text-base"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 h-14 rounded-xl text-sm uppercase tracking-wider font-medium transition-all duration-300"
                >
                  {submitLabel}
                </Button>

              {/* Email fallback */}
{contactEmail && (
  <p className="text-sm text-muted-foreground text-center pt-4">
    {emailFallbackText}{" "}
    <a
      href={`mailto:${contactEmail}`}
      className="text-foreground underline underline-offset-4 hover:opacity-70 transition font-medium"
    >
      {contactEmail}
    </a>
  </p>
)}

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}