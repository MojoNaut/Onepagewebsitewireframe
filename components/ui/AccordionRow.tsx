'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

export interface AccordionRowProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
}

export function AccordionRow({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  defaultOpen = false,
}: AccordionRowProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  // Calculate content height for smooth animation
  useEffect(() => {
    let frameId: number;
    if (contentRef.current) {
      frameId = window.requestAnimationFrame(() => {
        setHeight(isOpen ? contentRef.current!.scrollHeight : 0);
      });
    }
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isOpen]);

  // Recalculate height on window resize
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current && isOpen) {
        setHeight(contentRef.current.scrollHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <div className="border-t border-border first:border-t-0">
      {/* Accordion Button */}
      <button
        onClick={handleToggle}
        className={cn(
          'w-full flex items-center justify-between',
          'py-6 md:py-8',
          'text-left',
          'transition-all duration-200',
          'hover:opacity-70',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
          'group'
        )}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="text-lg md:text-xl font-semibold text-foreground pr-8">
          {title}
        </span>
        
        {/* Icon with smooth rotation */}
        <span
          className={cn(
            'flex-shrink-0',
            'transition-transform duration-200',
            isOpen && 'rotate-45'
          )}
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          ) : (
            <Plus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          )}
        </span>
      </button>

      {/* Accordion Content */}
      <div
        ref={contentRef}
        id={`accordion-content-${title.toLowerCase().replace(/\s+/g, '-')}`}
        style={{
          height: height !== undefined ? `${height}px` : 'auto',
        }}
        className={cn(
          'overflow-hidden',
          'transition-all duration-300 ease-in-out'
        )}
        aria-hidden={!isOpen}
      >
        <div className="pb-6 md:pb-8 pr-12">
          <div className="text-base text-mutedForeground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Accordion container component for grouping multiple rows
export interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultIndex?: number | number[];
  className?: string;
}

export function Accordion({
  children,
  type = 'single',
  defaultIndex,
  className,
}: AccordionProps) {
  return (
    <div className={cn('border-b border-border', className)}>
      {children}
    </div>
  );
}