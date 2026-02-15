// components/sections/Work.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { WorkItem, SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/* ── Work Card ── */
interface WorkCardProps {
  title: string;
  tags?: string[];
  summary?: string;
  deliverables?: string[];
  imageUrl?: string;
  liveUrl?: string;
  isOpen: boolean;
  onToggle: () => void;
  imageRight: boolean;
}

function WorkCard({
  title,
  tags,
  summary,
  deliverables,
  imageUrl,
  liveUrl,
  isOpen,
  onToggle,
  imageRight,
}: WorkCardProps) {
  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div className="border border-border rounded-3xl overflow-hidden">
      {/* ── HEADER (clickable) ── */}
      <button
        type="button"
        onClick={onToggle}
        className="relative w-full p-6 md:p-10 hover:opacity-70 transition-opacity duration-300 text-left"
      >
        <div
          className={cn(
            "flex flex-col gap-6",
            "md:grid md:grid-cols-2 md:gap-12 md:items-center",
            imageRight && "md:[direction:rtl]"
          )}
        >
          {/* Image */}
          <div className="md:[direction:ltr]">
            {imageUrl ? (
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[16/10] rounded-2xl bg-muted" />
            )}
          </div>

          {/* Title + Tags + Toggle */}
          <div className="md:[direction:ltr]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-tight mb-4">
                  {title}
                </h3>
                {tags && tags.length > 0 && (
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
                )}
              </div>

              <span
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0",
                  "text-3xl md:text-4xl font-light",
                  "transition-transform duration-500",
                  ease,
                  isOpen && "rotate-45"
                )}
              >
                +
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* ── EXPANDED CONTENT ── */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-700",
          ease,
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "px-6 md:px-10 pb-6 md:pb-10",
              "md:grid md:grid-cols-2 md:gap-12",
              imageRight && "md:[direction:rtl]"
            )}
          >
            {/* Spacer (sotto l'immagine) */}
            <div className="hidden md:block md:[direction:ltr]" />

            {/* Details (sotto titolo/tags) */}
            <div className="md:[direction:ltr] space-y-6">
              {summary && (
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {summary}
                </p>
              )}

              {deliverables && deliverables.length > 0 && (
                <ul className="space-y-2 text-base text-muted-foreground">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-foreground">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium underline underline-offset-8 opacity-70 hover:opacity-100 transition"
                >
                  Vedi progetto →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
type WorkProps = {
  workItems?: WorkItem[];
  copy?: SiteSettings["workSection"];
};

export function Work({ workItems = [], copy }: WorkProps) {
  const t = useTranslations("work");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const heading = copy?.heading || t("heading");
  const emptyText = copy?.emptyText || t("emptyText");

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="case" className="scroll-mt-24">
      <div className="container py-20 md:py-28 lg:py-36">
      

        {workItems.length > 0 ? (
          <div className="space-y-6">
            {workItems.map((item, index) => (
              <WorkCard
                key={item._id}
                title={item.title}
                tags={item.tags}
                summary={item.summary}
                deliverables={item.deliverables}
                imageUrl={item.imageUrl}
                liveUrl={item.liveUrl}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                imageRight={index % 2 !== 0}
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