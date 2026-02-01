"use client";

import { useState, useEffect, useRef } from "react";
import type { FAQ as FAQType, SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.from(itemRef.current, {
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: index * 0.08,
      ease: "power2.out",
    });
  }, [index]);

  return (
    <div ref={itemRef} className="border-t border-border">
      <button
        onClick={onToggle}
        className="w-full py-8 md:py-10 flex items-start justify-between gap-6 text-left hover:opacity-70 transition-opacity duration-300 group"
      >
        <h3 className="text-base md:text-lg lg:text-xl font-medium pr-4 leading-relaxed">
          {question}
        </h3>
        <span 
          className="text-3xl md:text-4xl font-light flex-shrink-0 transition-transform duration-500"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="pb-8 md:pb-10 -mt-2 animate-fadeIn">
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl">
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const heading = copy?.heading || t('heading');
  const emptyText = copy?.emptyText || t('emptyText');

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-350 px-6 md:px-12 lg:px-24 py-24 md:py-40">
        <p className="text-xs uppercase tracking-[0.3em] font-medium mb-16 md:mb-20 opacity-40">
          {heading}
        </p>

        {faqs.length > 0 ? (
          <div className="border-b border-border">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={faq._id} 
                {...faq} 
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
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
