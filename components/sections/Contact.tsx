"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ContactProps = {
  contactEmail?: string;
  copy?: SiteSettings['contactSection'];
};

export function Contact({ contactEmail, copy }: ContactProps) {
  const t = useTranslations('contact');
  const formRef = useRef<HTMLFormElement>(null);
  
  const title = copy?.title || t('title');
  const subtitle = copy?.subtitle || t('subtitle');
  const submitLabel = copy?.submitLabel || t('submitLabel');

  useEffect(() => {
    if (!formRef.current) return;

    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
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
    <section id="contatti" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24 py-24 md:py-40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
            {title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-14 md:mb-16 text-center leading-relaxed">
            {subtitle}
          </p>

          <form ref={formRef} className="space-y-7">
            <div>
              <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                Nome *
              </Label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-5 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background text-base"
                placeholder="Il tuo nome"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email *
              </Label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-5 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background text-base"
                placeholder="la.tua@email.com"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                Messaggio *
              </Label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full px-5 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none bg-background text-base"
                placeholder="Raccontami del tuo progetto..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-foreground text-background hover:bg-foreground/90 h-14 text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {submitLabel}
            </Button>
          </form>

          {contactEmail && (
            <p className="text-sm text-muted-foreground text-center mt-10">
              Oppure scrivimi direttamente:{" "}
              <a 
                href={`mailto:${contactEmail}`} 
                className="text-accent hover:underline font-medium transition-colors"
              >
                {contactEmail}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
