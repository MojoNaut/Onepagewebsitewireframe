// components/icons/VennDiagram.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VennDiagramProps = {
  /** Colore dell'intersezione (default: sky-200) */
  intersectionColor?: string;
  /** ID univoco per il component (importante se usi più istanze) */
  instanceId?: string;
};

export function VennDiagram({
  intersectionColor = "#BFDBFE", // sky-200
  instanceId = "venn-default",
}: VennDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleARef = useRef<SVGCircleElement>(null);
  const circleBRef = useRef<SVGCircleElement>(null);
  const intersectionRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !circleARef.current || !circleBRef.current || !intersectionRef.current) {
      return;
    }

    const svg = svgRef.current;
    const circleA = circleARef.current;
    const circleB = circleBRef.current;
    const intersection = intersectionRef.current;

    // Timeline principale
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",    // Inizia quando SVG entra nel viewport
        end: "bottom 20%",   // Termina quando SVG esce dal viewport
        scrub: 1,            // Smooth scrubbing (1 secondo di ritardo)
        // markers: true,    // ← Decommentare per debug
      },
    });

    // Stato iniziale: cerchi separati
    gsap.set(circleA, { x: -60 }); // Spostato a sinistra
    gsap.set(circleB, { x: 60 });  // Spostato a destra
    gsap.set(intersection, { opacity: 0, scale: 0.8 });

    // Animazione: cerchi si avvicinano + intersezione appare
    tl.to(
      circleA,
      {
        x: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      0 // Start time
    )
      .to(
        circleB,
        {
          x: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0 // Parallelo a circleA
      )
      .to(
        intersection,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0.3 // Inizia leggermente dopo i cerchi
      );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === svg) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 300"
      className="w-full h-auto max-w-md mx-auto"
      aria-label="Venn diagram showing perfect fit intersection"
      role="img"
    >
      {/* Definizione clip-path per l'intersezione */}
      <defs>
        <clipPath id={`${instanceId}-intersection-clip`}>
          {/* Path calcolato per l'intersezione di due cerchi r=80 distanza cx=40 */}
          <path d="M 200 120 
                   A 80 80 0 0 1 200 280
                   A 80 80 0 0 1 200 120 Z" />
        </clipPath>
      </defs>

      {/* Cerchio A (sinistra) */}
      <circle
        ref={circleARef}
        cx="160"
        cy="150"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-foreground/30"
        style={{ transformOrigin: "160px 150px" }}
      />

      {/* Cerchio B (destra) */}
      <circle
        ref={circleBRef}
        cx="240"
        cy="150"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-foreground/30"
        style={{ transformOrigin: "240px 150px" }}
      />

      {/* Intersezione colorata */}
      <path
        ref={intersectionRef}
        d="M 160 150 
           A 80 80 0 0 1 160 310
           A 80 80 0 0 0 240 310
           A 80 80 0 0 1 240 150
           A 80 80 0 0 0 160 150 Z"
        fill={intersectionColor}
        opacity="0.6"
        style={{ transformOrigin: "200px 150px" }}
      />

      {/* Label A (opzionale) */}
      <text
        x="120"
        y="155"
        fontSize="14"
        fontWeight="600"
        fill="currentColor"
        className="text-foreground/40 select-none"
        textAnchor="middle"
      >
        A
      </text>

      {/* Label B (opzionale) */}
      <text
        x="280"
        y="155"
        fontSize="14"
        fontWeight="600"
        fill="currentColor"
        className="text-foreground/40 select-none"
        textAnchor="middle"
      >
        B
      </text>
    </svg>
  );
}
