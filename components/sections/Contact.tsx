"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";

type ContactProps = {
  contactEmail?: string;
  copy?: SiteSettings['contactSection'];
};

export function Contact({ contactEmail, copy }: ContactProps) {
  const t = useTranslations('contact');
  
  const title = copy?.title || t('title');
  const subtitle = copy?.subtitle || t('subtitle');
  const submitLabel = copy?.submitLabel || t('submitLabel');

  return (
    <section id="contatti" className="border-t border-border">
      <div className="mx-auto max-w-280 px-6 md:px-8 py-20 md:py-32">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
            {title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-12 text-center">
            {subtitle}
          </p>

          <form className="space-y-6">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <input
                id="name"
                type="text"
                required
                className="mt-2 w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <input
                id="email"
                type="email"
                required
                className="mt-2 w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <Label htmlFor="message">Messaggio *</Label>
              <textarea
                id="message"
                required
                rows={6}
                className="mt-2 w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12"
            >
              {submitLabel}
            </Button>
          </form>

          {contactEmail && (
            <p className="text-sm text-muted-foreground text-center mt-8">
              Oppure scrivimi a:{" "}
              <a href={`mailto:${contactEmail}`} className="text-accent hover:underline">
                {contactEmail}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
