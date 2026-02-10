"use client";

import React, { useLayoutEffect, useRef } from "react";

type Coord = [number, number, number];
type CoordGroup = Coord[][];
type Pt2 = [number, number];

type Props = React.SVGProps<SVGSVGElement> & {
  turns?: number;
  duration?: number;
  paused?: boolean;
  steppedRotation?: boolean;
  animateLid?: boolean;

  /**
   * NUOVO:
   * progress controllato dall’esterno (0 → 1)
   * se presente, disabilita il loop interno
   */
  externalProgress?: number;
};

export function IsometricRubikScrollCube({
  turns = 3,
  duration = 5.5,
  paused = false,
  steppedRotation = true,
  animateLid = false,
  externalProgress,
  ...props
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cube = svg.querySelector<SVGGElement>("#cube");
    const lid = svg.querySelector<SVGPathElement>("#lid");
    const base = svg.querySelector<SVGPathElement>("#base");
    if (!cube || !lid || !base) return;

    /* ===============================
       GEOMETRIA (IDENTICA ALLA TUA)
       =============================== */

    const lidCoordinates: CoordGroup = [
      [[-3, 3, 3], [-3, -3, 3], [3, -3, 3], [3, 3, 3], [-3, 3, 3], [-3, 3, 1], [-3, -3, 1], [3, -3, 1], [3, -3, 3]],
      [[3, 1, 3], [-3, 1, 3], [-3, 1, 1]],
      [[3, -1, 3], [-3, -1, 3], [-3, -1, 1]],
      [[-3, -3, 3], [-3, -3, 1]],
      [[-1, -3, 1], [-1, -3, 3], [-1, 3, 3]],
      [[1, -3, 1], [1, -3, 3], [1, 3, 3]],
    ];

    const baseCoordinates: CoordGroup = [
      [[-3, 3, 1], [3, 3, 1], [3, -3, 1], [-3, -3, 1], [-3, 3, 1], [-3, 3, -3], [-3, -3, -3], [3, -3, -3], [3, -3, 1]],
      [[1, -3, -3], [1, -3, 1], [1, 1, 1], [-3, 1, 1], [-3, 1, -3]],
      [[-1, -3, -3], [-1, -3, 1], [-1, -1, 1], [-3, -1, 1], [-3, -1, -3]],
      [[-3, -3, -3], [-3, -3, 1]],
      [[-3, 3, -1], [-3, -3, -1], [3, -3, -1]],
    ];

    const u = 4;
    const cx = 30;
    const cy = 30;

    function project(group: CoordGroup, t: number): Pt2[][] {
      const ct = Math.cos(t);
      const st = Math.sin(t);

      return group.map((sub) =>
        sub.map(([x, y, z]) => {
          const xr = x * ct - y * st;
          const yr = x * -st - y * ct;
          const X = xr * u + cx;
          const Y = (yr - z * Math.sqrt(2)) * u / Math.sqrt(3) + cy;
          return [X, Y];
        })
      );
    }

    function toPath(coords: Pt2[][]): string {
      let d = "";
      for (const sub of coords) {
        if (!sub.length) continue;
        d += `M${sub[0][0].toFixed(2)} ${sub[0][1].toFixed(2)}`;
        for (let i = 1; i < sub.length; i++) {
          d += `L${sub[i][0].toFixed(2)} ${sub[i][1].toFixed(2)}`;
        }
      }
      return d;
    }

    function easing(t: number): number {
      return ((2 - Math.cos(Math.PI * t)) % 2) * Math.PI / 4;
    }

    // Base e lid iniziali
    base.setAttribute("d", toPath(project(baseCoordinates, Math.PI / 4)));
    lid.setAttribute("d", toPath(project(lidCoordinates, Math.PI / 4)));

    cube.style.transformOrigin = "50% 50%";
    (cube.style as CSSStyleDeclaration & { transformBox?: string }).transformBox = "fill-box";

    const cycleMs = Math.max(0.8, duration) * 1000;

    const render = (progress01: number) => {
      const T = progress01 * turns;
      const step = Math.floor(T);
      const rotDeg = steppedRotation ? step * 120 : T * 120;

      cube.style.transform = `rotate(${rotDeg}deg)`;

      if (animateLid) {
        lid.setAttribute("d", toPath(project(lidCoordinates, easing(T))));
      }
    };

    startRef.current = performance.now();
    render(0);

    const loop = (now: number) => {
      if (externalProgress != null) {
        render(externalProgress);
      } else if (!paused) {
        const elapsed = now - startRef.current;
        const p = (elapsed % cycleMs) / cycleMs;
        render(p);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [turns, duration, paused, steppedRotation, animateLid, externalProgress]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 60 60"
      stroke="currentColor"
      strokeWidth={0.1}
      strokeLinejoin="round"
      fill="none"
      aria-label="Isometric Rubik Cube"
      style={{ overflow: "visible" }}
      {...props}
    >
      <g id="cube">
        <path id="base" />
        <path id="lid" />
      </g>
    </svg>
  );
}

