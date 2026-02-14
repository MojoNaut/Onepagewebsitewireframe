"use client";

import { useLayoutEffect, useRef } from "react";
import type { SVGProps } from "react";

type Vec3 = [number, number, number];
type Pt2 = [number, number];

type Face = {
  verts: Vec3[];
  normal: Vec3;
  faceId: "+z" | "-z" | "+x" | "-x" | "+y" | "-y" | "interior";
};

type Cubie = {
  ix: number;
  iy: number;
  iz: number;
  faces: Face[];
};

type Props = SVGProps<SVGSVGElement> & {
  externalProgress?: number; // 0..1
  showLabels?: boolean; // default false
};

export function IsometricRubikFullCube({
  externalProgress = 0,
  showLabels = false,
  ...props
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const renderRef = useRef<((p: number) => void) | null>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // ====== COSTANTI (DAL TUO FILE) ======
    const INTERIOR_COLOR = "#D0C9BC";

    const TOP_FULL = Math.PI / 2;
    const RIGHT_FULL = -Math.PI / 2;

    const SCALE = 13;
    const CX = 100;
    const CY = 100;
    const BASE_ANGLE = Math.PI / 4;
    const PAUSE = 0.08;

    const strokeWidth = 0.3;

    // ====== ROTAZIONI ======
    function rotZ(v: Vec3, a: number): Vec3 {
      const c = Math.cos(a),
        s = Math.sin(a);
      return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
    }
    function rotX(v: Vec3, a: number): Vec3 {
      const c = Math.cos(a),
        s = Math.sin(a);
      return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
    }
    function rotY(v: Vec3, a: number): Vec3 {
      const c = Math.cos(a),
        s = Math.sin(a);
      return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
    }

    // ====== BUILD CUBIES (IDENTICO) ======
    function buildCubies(gap: number): Cubie[] {
      const cubies: Cubie[] = [];
      const size = 2,
        half = gap / 2;

      for (let ix = 0; ix < 3; ix++) {
        for (let iy = 0; iy < 3; iy++) {
          for (let iz = 0; iz < 3; iz++) {
            const cx = (ix - 1) * size,
              cy = (iy - 1) * size,
              cz = (iz - 1) * size;
            const s = size / 2 - half;
            const faces: Face[] = [];

            const isOuterPZ = iz === 2;
            const isOuterNZ = iz === 0;
            const isOuterPX = ix === 2;
            const isOuterNX = ix === 0;
            const isOuterPY = iy === 2;
            const isOuterNY = iy === 0;

            faces.push({
              verts: [
                [cx - s, cy - s, cz + s],
                [cx + s, cy - s, cz + s],
                [cx + s, cy + s, cz + s],
                [cx - s, cy + s, cz + s],
              ],
              normal: [0, 0, 1],
              faceId: (isOuterPZ ? "+z" : "interior") as Face["faceId"],
            });

            faces.push({
              verts: [
                [cx - s, cy + s, cz - s],
                [cx + s, cy + s, cz - s],
                [cx + s, cy - s, cz - s],
                [cx - s, cy - s, cz - s],
              ],
              normal: [0, 0, -1],
              faceId: (isOuterNZ ? "-z" : "interior") as Face["faceId"],
            });

            faces.push({
              verts: [
                [cx + s, cy - s, cz - s],
                [cx + s, cy + s, cz - s],
                [cx + s, cy + s, cz + s],
                [cx + s, cy - s, cz + s],
              ],
              normal: [1, 0, 0],
              faceId: (isOuterPX ? "+x" : "interior") as Face["faceId"],
            });

            faces.push({
              verts: [
                [cx - s, cy + s, cz - s],
                [cx - s, cy - s, cz - s],
                [cx - s, cy - s, cz + s],
                [cx - s, cy + s, cz + s],
              ],
              normal: [-1, 0, 0],
              faceId: (isOuterNX ? "-x" : "interior") as Face["faceId"],
            });

            faces.push({
              verts: [
                [cx + s, cy + s, cz - s],
                [cx - s, cy + s, cz - s],
                [cx - s, cy + s, cz + s],
                [cx + s, cy + s, cz + s],
              ],
              normal: [0, 1, 0],
              faceId: (isOuterPY ? "+y" : "interior") as Face["faceId"],
            });

            faces.push({
              verts: [
                [cx - s, cy - s, cz - s],
                [cx + s, cy - s, cz - s],
                [cx + s, cy - s, cz + s],
                [cx - s, cy - s, cz + s],
              ],
              normal: [0, -1, 0],
              faceId: (isOuterNY ? "-y" : "interior") as Face["faceId"],
            });

            cubies.push({ ix, iy, iz, faces });
          }
        }
      }
      return cubies;
    }

    // ====== MEMBERSHIP (IDENTICO) ======
    function getCubieCenter(c: Cubie): Vec3 {
      return [(c.ix - 1) * 2, (c.iy - 1) * 2, (c.iz - 1) * 2];
    }
    function isTopLayer(c: Cubie) {
      return c.iz === 2;
    }
    function isEffectiveRight(c: Cubie) {
      let center = getCubieCenter(c);
      if (isTopLayer(c)) center = rotZ(center, TOP_FULL);
      return Math.abs(center[0] - 2) < 0.5;
    }
    function isEffectiveLeft(c: Cubie) {
      let center = getCubieCenter(c);
      if (isTopLayer(c)) center = rotZ(center, TOP_FULL);
      if (isEffectiveRight(c)) center = rotX(center, RIGHT_FULL);
      return Math.abs(center[1] - 2) < 0.5;
    }
    function computeMembership(cubies: Cubie[]) {
      return cubies.map((c) => ({
        cubie: c,
        isTop: isTopLayer(c),
        isRight: isEffectiveRight(c),
        isLeft: isEffectiveLeft(c),
      }));
    }

    // ====== PROIEZIONE (IDENTICA) ======
    function projectPoint(x: number, y: number, z: number): Pt2 {
      const c = Math.cos(BASE_ANGLE),
        s = Math.sin(BASE_ANGLE);
      return [
        (x * c - y * s) * SCALE + CX,
        ((x * s + y * c - z * Math.SQRT2) * SCALE) / Math.sqrt(3) + CY,
      ];
    }
    function isVisible2D(pts: Pt2[]) {
      const [a, b, c] = pts;
      return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0;
    }
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function centroid2D(pts: Pt2[]): Pt2 {
      let sx = 0,
        sy = 0;
      for (const p of pts) {
        sx += p[0];
        sy += p[1];
      }
      return [sx / pts.length, sy / pts.length];
    }

    function computeAngles(p: number) {
      const third = 1 / 3;
      function frac(start: number, end: number) {
        if (p <= start) return 0;
        if (p >= end) return 1;
        const mp = (p - start) / (end - start);
        const ae = 1 - PAUSE;
        return mp <= ae ? easeInOutCubic(mp / ae) : 1;
      }
      const topF = frac(0, third);
      const rightF = frac(third, 2 * third);
      const leftF = frac(2 * third, 1);
      return {
        topAngle: topF * TOP_FULL,
        rightAngle: rightF * RIGHT_FULL,
        leftAngle: leftF * (Math.PI / 2),
      };
    }

    // ====== INIT STATIC ======
    const cubies = buildCubies(0.08);
    const membership = computeMembership(cubies);

    // ====== RENDER (CON LA TUA DEPTH PATCH) ======
    function render(p: number) {
      const { topAngle, rightAngle, leftAngle } = computeAngles(p);

      const all: Array<{
        points: Pt2[];
        depth: number;
        faceId: Face["faceId"];
        cubie: Cubie;
        faceUID: string;
        isTop: boolean;
        isRight: boolean;
        isLeft: boolean;
      }> = [];

      for (const { cubie, isTop, isRight, isLeft } of membership) {
        for (const face of cubie.faces) {
          if (face.faceId === "interior" && p < 0.001) continue;

          let verts = face.verts.map((v) => [v[0], v[1], v[2]] as Vec3);
          let normal = [face.normal[0], face.normal[1], face.normal[2]] as Vec3;

          if (isTop && topAngle) {
            verts = verts.map((v) => rotZ(v, topAngle));
            normal = rotZ(normal, topAngle);
          }
          if (isRight && rightAngle) {
            verts = verts.map((v) => rotX(v, rightAngle));
            normal = rotX(normal, rightAngle);
          }
          if (isLeft && leftAngle) {
            verts = verts.map((v) => rotY(v, leftAngle));
            normal = rotY(normal, leftAngle);
          }

          const proj = verts.map((v) => projectPoint(v[0], v[1], v[2]));
          if (!isVisible2D(proj)) continue;

          const cs = Math.cos(BASE_ANGLE);
          const ss = Math.sin(BASE_ANGLE);

          const sum = verts.reduce(
            (acc, v) => [acc[0] + v[0], acc[1] + v[1], acc[2] + v[2]] as Vec3,
            [0, 0, 0] as Vec3
          );
          const center: Vec3 = [sum[0] / 4, sum[1] / 4, sum[2] / 4];

          let depth = center[0] * ss + center[1] * cs - center[2] * 0.5;
          if (face.faceId === "interior") depth -= 50;

          // ====== TUO BLOCCO PATCH (IDENTICO) ======
          if (p > 0 && p < 1) {
            if (p < 1 / 3) {
              if (cubie.iz === 2) depth += 40;
            } else if (p < 2 / 3) {
              if (cubie.ix === 2) depth += 40;
            }

            if (p > 1 / 3 && p < 2 / 3) {
              if (cubie.ix === 2 && face.faceId === "+z") {
                depth += 6;
              }
            }

            if (p > 1 / 3 && p < 2 / 3) {
              const is002minusX =
                cubie.ix === 0 &&
                cubie.iy === 0 &&
                cubie.iz === 2 &&
                face.faceId === "-x";

              if (is002minusX) {
                depth += 48;
              }

              const is002plusZ =
                cubie.ix === 0 &&
                cubie.iy === 0 &&
                cubie.iz === 2 &&
                face.faceId === "+z";

              if (is002plusZ) {
                depth += 52;
              }
            } else {
              const { ix, iy, iz } = cubie;

              const isPriorityCubie = (ix === 2 && iz === 2) || (ix === 2 && iy === 2);
              if (isPriorityCubie) depth += 40;

              const isLeftConflict =
                (ix === 0 && iy === 0 && iz === 2) || (ix === 1 && iy === 0 && iz === 2);

              const isPurpleColumn = ix === 2 && face.faceId === "+x";

              if (isLeftConflict) depth += 12;
              if (isPurpleColumn) depth -= 6;

              const is002minusX =
                ix === 0 && iy === 0 && iz === 2 && face.faceId === "-x";

              if (is002minusX) depth += 48;
            }
          }
          // ====== FINE BLOCCO PATCH ======

          const FACE_PRIORITY: Record<string, number> = {
            "+x": 5,
            "+y": 4,
            "+z": 3,
            "-x": 2,
            "-y": 1,
            "-z": 0,
          };
          depth += FACE_PRIORITY[face.faceId] || 0;

          const faceUID = `${cubie.ix}${cubie.iy}${cubie.iz}-${face.faceId}`;

          all.push({
            points: proj,
            depth,
            faceId: face.faceId,
            cubie,
            faceUID,
            isTop,
            isRight,
            isLeft,
          });
        }
      }

      all.sort((a, b) => {
        if (Math.abs(a.depth - b.depth) < 0.0001) {
          return a.faceUID.localeCompare(b.faceUID);
        }
        return a.depth - b.depth;
      });

      let html = "";

      for (const f of all) {
        const isInterior = f.faceId === "interior";

        let color: string;
        if (isInterior) {
          color = INTERIOR_COLOR;
        } else {
          if (f.faceId === "+x") color = "#A78BFA";
          else if (f.faceId === "-x") color = "#E5E7EB";
          else if (f.faceId === "+y") color = "#93C5FD";
          else if (f.faceId === "-y") color = "#FDE68A";
          else if (f.faceId === "+z") color = "#FFFFFF";
          else color = "#FCA5A5"; // -z
        }

        const so = "0.18";
        const pts = f.points.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

        html += `<polygon points="${pts}" fill="${color}" stroke="rgba(26,26,26,${so})" stroke-width="${strokeWidth}" stroke-linejoin="round"/>`;

        if (showLabels) {
          const [cx2, cy2] = centroid2D(f.points);
          html += `
            <text
              x="${cx2.toFixed(1)}"
              y="${cy2.toFixed(1)}"
              text-anchor="middle"
              dominant-baseline="central"
              font-size="3"
              font-family="Inter,system-ui,sans-serif"
              font-weight="700"
              fill="#111">${f.faceUID}</text>
          `;
        }
      }

      svg.innerHTML = html;
    }

    renderRef.current = render;
    render(externalProgress);

    return () => {
      renderRef.current = null;
    };
    // NON mettere externalProgress qui dentro
  }, [showLabels]);

  useLayoutEffect(() => {
    renderRef.current?.(externalProgress);
  }, [externalProgress]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      style={{ overflow: "visible" }}
      aria-hidden
      {...props}
    />
  );
}
