"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VennDiagramProps = {
  instanceId?: string;
};

export function VennDiagram({ instanceId = "venn-default" }: VennDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleARef = useRef<SVGCircleElement>(null);
  const circleBRef = useRef<SVGCircleElement>(null);
  const circleCRef = useRef<SVGCircleElement>(null);

  // Debug labels — refs per animarle insieme ai cerchi
  const labelARef = useRef<SVGTextElement>(null);
  const labelBRef = useRef<SVGTextElement>(null);
  const labelCRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (
      !svgRef.current ||
      !circleARef.current ||
      !circleBRef.current ||
      !circleCRef.current
    ) return;

    const svg = svgRef.current;
    const circleA = circleARef.current;
    const circleB = circleBRef.current;
    const circleC = circleCRef.current;
    const labelA = labelARef.current;
    const labelB = labelBRef.current;
    const labelC = labelCRef.current;

    // ── Posizioni ──
    // Centro SVG = cy 250. Tutti partono raggruppati lì.
    // A (top) parte da 250, arriva a 150 → si muove di -100
    // B (mid) resta fermo a 250
    // C (bot) parte da 250, arriva a 350 → si muove di +100
    const SPREAD = 100; // distanza che A e C percorrono dal centro

    // Stato iniziale: tutti al centro (overlap massimo)
    gsap.set([circleA, labelA], { y: SPREAD * 0.7 });   // A nasce spostato in basso (+100 → a 250)
    gsap.set([circleC, labelC], { y: -SPREAD * 0.7 });   // C nasce spostato in alto (-100 → a 250)
    // B e labelB restano a 0 (già a 250)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1.2,
      },
    });

    // A torna alla sua posizione naturale (y:0 → cy=150)
    // C torna alla sua posizione naturale (y:0 → cy=350)
    tl.to(
      [circleA, labelA],
      { y: 0, duration: 1, ease: "power2.inOut" },
      0
    ).to(
      [circleC, labelC],
      { y: 0, duration: 1, ease: "power2.inOut" },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === svg) t.kill();
      });
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 440 560"
      className="w-full h-auto"
      aria-label="Venn diagram"
      role="img"
    >
      {/* Cerchio A — top */}
      <circle
        ref={circleARef}
        cx="220"
        cy="160"
        r="140"
        fill="none"
        stroke="currentColor"
       strokeWidth="0.15"
className="text-foreground/22"
      />

      {/* Cerchio B — centro */}
      <circle
        ref={circleBRef}
        cx="220"
        cy="280"
        r="140"
        fill="none"
        stroke="currentColor"
            strokeWidth="0.15"
className="text-foreground/22"
      />

      {/* Cerchio C — bottom */}
      <circle
        ref={circleCRef}
        cx="220"
        cy="400"
        r="140"
        fill="none"
        stroke="currentColor"
       strokeWidth="0.15"
className="text-foreground/22"
      />

      {/* Debug labels — rimuovere dopo */}
      <text ref={labelARef} x="200" y="160" fontSize="14" fontWeight="500" fill="currentColor" className="text-foreground/25 select-none" textAnchor="middle" dominantBaseline="central">A</text>
      <text ref={labelBRef} x="200" y="280" fontSize="14" fontWeight="500" fill="currentColor" className="text-foreground/25 select-none" textAnchor="middle" dominantBaseline="central">B</text>
      <text ref={labelCRef} x="200" y="400" fontSize="14" fontWeight="500" fill="currentColor" className="text-foreground/25 select-none" textAnchor="middle" dominantBaseline="central">C</text>
    </svg>
  );
}