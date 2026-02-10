// components/sections/FAQ.tsx

"use client";

import { useState } from "react";
import type { FAQ as FAQType, SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex items-start justify-between gap-4 text-left hover:opacity-70 transition-opacity"
      >
        <h3 className="text-base md:text-lg font-medium pr-4">{question}</h3>
        <span className="text-2xl shrink-0 transition-transform" style={{
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
        }}>
          +
        </span>
      </button>

      {isOpen && (
        <div className="pb-6 md:pb-8 -mt-2">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

type FAQProps = {
  faqs?: FAQType[];
  copy?: SiteSettings['faqSection'];
};

export function FAQ({ faqs = [], copy }: FAQProps) {
  const t = useTranslations('faq');
  
  const heading = copy?.heading || t('heading');
  const emptyText = copy?.emptyText || t('emptyText');

  return (
    <section id="faq" className="scroll-mt-24  border-border">
      <div className="mx-auto max-w-280 px-6 md:px-8 py-20 md:py-32">
        <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-8 opacity-40">
          {heading}
        </h2>

        {faqs.length > 0 ? (
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq._id} {...faq} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{emptyText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
