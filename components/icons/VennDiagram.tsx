// components/icons/VennDiagram.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VennDiagramProps = {
  /** Colore cerchio A (più grande) */
  colorA?: string;
  /** Colore cerchio B (più piccolo) */
  colorB?: string;
  /** Opacity fissa dei fill */
  fillOpacity?: number;
  /** ID univoco */
  instanceId?: string;
};

export function VennDiagram({
  colorA = "#3B82F6", // blue-500
  colorB = "#EC4899", // pink-500
  fillOpacity = 0.15,  // Molto più trasparente
  instanceId = "venn-default",
}: VennDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleAOutlineRef = useRef<SVGCircleElement>(null);
  const circleBOutlineRef = useRef<SVGCircleElement>(null);
  const circleAFilledRef = useRef<SVGCircleElement>(null);
  const circleBFilledRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (
      !svgRef.current ||
      !circleAOutlineRef.current ||
      !circleBOutlineRef.current ||
      !circleAFilledRef.current ||
      !circleBFilledRef.current
    ) {
      return;
    }

    const svg = svgRef.current;
    const circleAOutline = circleAOutlineRef.current;
    const circleBOutline = circleBOutlineRef.current;
    const circleAFilled = circleAFilledRef.current;
    const circleBFilled = circleBFilledRef.current;

    const INITIAL_OFFSET = 120; // Distanza iniziale maggiore

    // Stato iniziale: cerchi separati verticalmente
    gsap.set([circleAOutline, circleAFilled], { y: -INITIAL_OFFSET });
    gsap.set([circleBOutline, circleBFilled], { y: INITIAL_OFFSET });

    // Timeline scroll - SOLO movimento, opacity FISSA
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        // markers: true,
      },
    });

    tl.to(
      [circleAOutline, circleAFilled],
      {
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    ).to(
      [circleBOutline, circleBFilled],
      {
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

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
      viewBox="0 0 400 600"
      className="w-full h-auto"
      aria-label="Venn diagram showing perfect fit intersection"
      role="img"
    >
      {/* Outline sempre visibili - LINEE SOTTILI */}
      <circle
        ref={circleAOutlineRef}
        cx="200"
        cy="170"
        r="110"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-foreground/20"
        style={{ transformOrigin: "200px 170px" }}
      />

      <circle
        ref={circleBOutlineRef}
        cx="200"
        cy="330"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-foreground/20"
        style={{ transformOrigin: "200px 330px" }}
      />

      {/* Fill colorati - OPACITY FISSA, sempre visibili */}
      <circle
        ref={circleAFilledRef}
        cx="200"
        cy="170"
        r="110"
        fill={colorA}
        opacity={fillOpacity}
        style={{ transformOrigin: "200px 170px", mixBlendMode: "multiply" }}
      />

      <circle
        ref={circleBFilledRef}
        cx="200"
        cy="330"
        r="80"
        fill={colorB}
        opacity={fillOpacity}
        style={{ transformOrigin: "200px 330px", mixBlendMode: "multiply" }}
      />

      {/* Labels */}
      <text
        x="200"
        y="45"
        fontSize="16"
        fontWeight="500"
        fill="currentColor"
        className="text-foreground/30 select-none"
        textAnchor="middle"
      >
        A
      </text>

      <text
        x="200"
        y="430"
        fontSize="16"
        fontWeight="500"
        fill="currentColor"
        className="text-foreground/30 select-none"
        textAnchor="middle"
      >
        B
      </text>
    </svg>
  );
}