// components/sections/FAQ.tsx
"use client";

import { useState } from "react";
import type { FAQ as FAQType, SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";

/* ── Full-bleed divider (stesso pattern Services/Process) ── */
function FullBleedDivider({ position = "top" }: { position?: "top" | "bottom" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 w-[100vw] border-border ${
        position === "top" ? "top-0 border-t" : "bottom-0 border-b"
      }`}
    />
  );
}

/* ── FAQ Item ── */
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="relative">
      <FullBleedDivider position="top" />

      <button
        onClick={onToggle}
        className="w-full py-6 md:py-8 flex items-center justify-between gap-6 text-left hover:opacity-70 transition-opacity"
      >
        <h3 className="text-base md:text-lg font-medium pr-4">{question}</h3>
        <span
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-3xl md:text-4xl font-light shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 md:pb-8 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
type FAQProps = {
  faqs?: FAQType[];
  copy?: SiteSettings["faqSection"];
};

export function FAQ({ faqs = [], copy }: FAQProps) {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const heading = copy?.heading || t("heading");
  const emptyText = copy?.emptyText || t("emptyText");

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-24">
      <div className="container py-20 md:py-28 lg:py-36">
      

        {faqs.length > 0 ? (
          <div className="relative">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq._id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
            <FullBleedDivider position="bottom" />
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