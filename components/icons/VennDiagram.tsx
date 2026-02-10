// components/icons/VennDiagram.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VennDiagramProps = {
  colorA?: string;
  colorB?: string;
  fillOpacity?: number;
  instanceId?: string;
};

export function VennDiagram({
  colorA = "#3B82F6",
  colorB = "#EC4899",
  fillOpacity = 0.18, // ✅ Aumentato da 0.15
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

    const INITIAL_OFFSET = 50; // ✅ Cerchi iniziano vicini
    const FINAL_OFFSET = 22;   // ✅ 40% overlap

    gsap.set([circleAOutline, circleAFilled], { y: -INITIAL_OFFSET });
    gsap.set([circleBOutline, circleBFilled], { y: INITIAL_OFFSET });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        end: "bottom 30%",
        scrub: 1.5,
        // markers: true,
      },
    });

    tl.to(
      [circleAOutline, circleAFilled],
      { y: -FINAL_OFFSET, duration: 1, ease: "power2.inOut" },
      0
    ).to(
      [circleBOutline, circleBFilled],
      { y: FINAL_OFFSET, duration: 1, ease: "power2.inOut" },
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
      {/* ✅ STROKE ALLINEATO AL RUBIK CUBE */}
      <circle
        ref={circleAOutlineRef}
        cx="200"
        cy="170"
        r="110"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.15"  // ✅ Era 0.5, ora 0.15 (simile al cubo 0.1)
        className="text-foreground/22"  // ✅ Era /20, ora /22 (come cubo)
      />

      <circle
        ref={circleBOutlineRef}
        cx="200"
        cy="330"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.15"  // ✅ Allineato
        className="text-foreground/22"  // ✅ Allineato
      />

      {/* Fill colorati */}
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