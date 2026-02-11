// components/sections/Services.tsx
"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { Service } from "@/types/content";
import { cn } from "@/lib/utils";

type ServicesProps = {
  services?: Service[];
};

interface AccordionItemProps {
  title: string;
  tagline?: string;
  tags?: string[];
  deliverables?: string[];
  iconUrl?: string;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
}

function FullBleedDivider({
  className,
  position = "top",
}: {
  className?: string;
  position?: "top" | "bottom";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 -translate-x-1/2 w-[100vw] border-border",
        position === "top" ? "top-0 border-t" : "bottom-0 border-b",
        className
      )}
    />
  );
}

function WatermarkLayer({
  iconUrl,
  isOpen,
  ease,
}: {
  iconUrl?: string;
  isOpen: boolean;
  ease: string;
}) {
  if (!iconUrl) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        "flex items-center justify-center",
        "transition-[opacity,transform] duration-700 motion-reduce:transition-none",
        ease,
        isOpen ? "opacity-100 scale-100 delay-150" : "opacity-0 scale-95 delay-0"
      )}
    >
      <div className="relative w-full h-full max-w-[600px] max-h-[400px]">
        <Image
          src={iconUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 600px, 90vw"
          className={cn(
            "object-contain select-none",
            "opacity-[0.06]"
          )}
        />
      </div>
    </div>
  );
}

function AccordionItem({
  title,
  tagline,
  tags,
  deliverables,
  isOpen,
  onToggle,
  panelId,
}: AccordionItemProps) {
  const buttonId = `${panelId}-btn`;
  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  const revealBase =
    "transform-gpu will-change-transform will-change-opacity transition-all duration-500 motion-reduce:transition-none";
  const revealOpen = "opacity-100 translate-y-0";
  const revealClosed = "opacity-0 -translate-y-3";

  return (
    <div className="relative isolate">
      <FullBleedDivider position="top" />

      <div className="relative">
        {/* HEADER */}
<button
  id={buttonId}
  type="button"
  onClick={onToggle}
  aria-expanded={isOpen}
  aria-controls={panelId}
  className={cn(
    "relative w-full h-24 md:h-28",
    "hover:opacity-70 transition-opacity duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
  )}
>
  <div className="flex items-center justify-between gap-6">
<h3 className="flex-1 text-left text-2xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight">
      {title}
    </h3>

    <span
      className={cn(
        "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center",
        "text-3xl md:text-4xl font-light",
        "transition-transform duration-500",
        ease,
        isOpen && "rotate-45"
      )}
    >
      +
    </span>
  </div>
</button>






        {/* CONTENT */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-700",
            ease,
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
<div className="pb-12 md:pb-10 max-w-3xl">
              {tagline && (
                <p
                  className={cn(
                    "text-base sm:text-lg md:text-xl text-muted-foreground mb-6",
                    revealBase,
                    isOpen ? `${revealOpen} delay-200` : revealClosed
                  )}
                >
                  {tagline}
                </p>
              )}

              {deliverables && deliverables.length > 0 && (
                <ul
                  className={cn(
                    "space-y-3 text-base md:text-lg text-muted-foreground",
                    revealBase,
                    isOpen ? `${revealOpen} delay-300` : revealClosed
                  )}
                >
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-foreground">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
              )}{tags && tags.length > 0 && (
  <div
    className={cn(
      "mt-8",
      revealBase,
      isOpen ? `${revealOpen} delay-400` : revealClosed
    )}
  >
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-4 py-1.5 text-xs uppercase tracking-wider border border-foreground/30 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function Services({ services = [] }: ServicesProps) {
  // state zero: tutti chiusi
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="servizi" className="scroll-mt-24 relative">
<div className="container ">
        <div className="relative">
          <FullBleedDivider position="bottom" />

          {services.map((service, index) => (
            <AccordionItem
              key={service._id}
              title={service.title}
              tagline={service.tagline}
              tags={service.tags}
              deliverables={service.deliverables}
              iconUrl={service.iconUrl}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              panelId={`${baseId}-service-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
