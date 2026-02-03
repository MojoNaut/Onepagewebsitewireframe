from __future__ import annotations
from dataclasses import dataclass
from pathlib import Path
from typing import List, Tuple, Dict

Point2 = Tuple[float, float]
Point3 = Tuple[float, float, float]


@dataclass
class Iso:
    sx: float = 44.0
    sy: float = 22.0
    sz: float = 44.0

    def proj(self, x: float, y: float, z: float) -> Point2:
        # iso: x -> down-right, y -> down-left, z -> up
        X = (x - y) * self.sx
        Y = (x + y) * self.sy - z * self.sz
        return (X, Y)


def poly(points: List[Point2]) -> str:
    return " ".join(f"{x:.2f},{y:.2f}" for x, y in points)


def inset2d(points: List[Point2], amount: float) -> List[Point2]:
    cx = sum(x for x, _ in points) / len(points)
    cy = sum(y for _, y in points) / len(points)
    s = max(0.0, 1.0 - amount)
    return [(cx + (x - cx) * s, cy + (y - cy) * s) for x, y in points]


def shift(points: List[Point2], dx: float, dy: float) -> List[Point2]:
    return [(x + dx, y + dy) for x, y in points]


def bbox(polys: List[List[Point2]]) -> Tuple[float, float, float, float]:
    xs = [x for p in polys for x, _ in p]
    ys = [y for p in polys for _, y in p]
    return min(xs), min(ys), max(xs), max(ys)


def face_vertices(i: int, j: int, k: int, face: str) -> List[Point3]:
    # cubie size=1, origin at (i,j,k)
    if face == "top":
        return [(i, j, k + 1), (i + 1, j, k + 1), (i + 1, j + 1, k + 1), (i, j + 1, k + 1)]
    if face == "right":
        return [(i + 1, j, k), (i + 1, j + 1, k), (i + 1, j + 1, k + 1), (i + 1, j, k + 1)]
    if face == "left":
        return [(i, j + 1, k), (i + 1, j + 1, k), (i + 1, j + 1, k + 1), (i, j + 1, k + 1)]
    raise ValueError("face must be top|right|left")


def avg_depth(pts: List[Point3]) -> float:
    return sum((x + y + z) for x, y, z in pts) / len(pts)


def hex_to_rgb(h: str) -> Tuple[int, int, int]:
    h = h.strip().lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def rgb_to_hex(rgb: Tuple[int, int, int]) -> str:
    r, g, b = rgb
    r = max(0, min(255, r))
    g = max(0, min(255, g))
    b = max(0, min(255, b))
    return f"#{r:02x}{g:02x}{b:02x}"


def lighten(rgb: Tuple[int, int, int], amt: float) -> Tuple[int, int, int]:
    r, g, b = rgb
    return (int(r + (255 - r) * amt), int(g + (255 - g) * amt), int(b + (255 - b) * amt))


def darken(rgb: Tuple[int, int, int], amt: float) -> Tuple[int, int, int]:
    r, g, b = rgb
    return (int(r * (1 - amt)), int(g * (1 - amt)), int(b * (1 - amt)))


def cube_color(i: int, j: int, k: int, n: int) -> Tuple[int, int, int]:
    # Palette CTA: violet/fuchsia/sky (pastel)
    V = hex_to_rgb("#ddd6fe")
    F = hex_to_rgb("#f5d0fe")
    S = hex_to_rgb("#bae6fd")

    if n <= 1:
        return V

    wi = i / (n - 1)
    wj = j / (n - 1)
    wk = k / (n - 1)

    s = wi + wj + wk
    if s == 0:
        wi = wj = wk = 1 / 3
        s = 1.0

    wi /= s
    wj /= s
    wk /= s

    # mix triadico
    return (
        int(V[0] * wi + F[0] * wj + S[0] * wk),
        int(V[1] * wi + F[1] * wj + S[1] * wk),
        int(V[2] * wi + F[2] * wj + S[2] * wk),
    )


def make():
    n = 3
    gap = 0.10  # gap tra cubetti (effetto “floating tiles”)
    pad = 18.0

    iso = Iso()

    cubies: List[Dict] = []
    all_polys: List[List[Point2]] = []

    # --- build visible cubies (surface only) ---
    for k in range(n):
        for j in range(n):
            for i in range(n):
                is_top = (k == n - 1)
                is_right = (i == n - 1)
                is_left = (j == n - 1)

                faces: List[str] = []
                if is_top:
                    faces.append("top")
                if is_right:
                    faces.append("right")
                if is_left:
                    faces.append("left")
                if not faces:
                    continue

                base = cube_color(i, j, k, n)
                fill_top = rgb_to_hex(lighten(base, 0.12))
                fill_left = rgb_to_hex(base)
                fill_right = rgb_to_hex(darken(base, 0.12))

                face_polys = []
                depths = []

                for face in faces:
                    pts3 = face_vertices(i, j, k, face)
                    depths.append(avg_depth(pts3))

                    pts2 = [iso.proj(x, y, z) for x, y, z in pts3]
                    pts2i = inset2d(pts2, gap)
                    all_polys.append(pts2i)

                    if face == "top":
                        fill = fill_top
                    elif face == "right":
                        fill = fill_right
                    else:
                        fill = fill_left

                    face_polys.append({"face": face, "pts": pts2i, "fill": fill})

                cubies.append(
                    {
                        "id": f"cubie-{i}-{j}-{k}",
                        "depth": sum(depths) / len(depths),
                        "faces": face_polys,
                    }
                )

    # painter: far -> near
    cubies.sort(key=lambda c: c["depth"])

    # viewBox
    x0, y0, x1, y1 = bbox(all_polys)
    w = (x1 - x0) + pad * 2
    h = (y1 - y0) + pad * 2
    dx = -x0 + pad
    dy = -y0 + pad

    # outlines (outer cube)
    def proj_pts(pts3: List[Point3]) -> List[Point2]:
        return shift([iso.proj(x, y, z) for x, y, z in pts3], dx, dy)

    top_outline = proj_pts([(0, 0, n), (n, 0, n), (n, n, n), (0, n, n)])
    left_outline = proj_pts([(0, n, 0), (0, n, n), (0, 0, n), (0, 0, 0)])
    right_outline = proj_pts([(n, 0, 0), (n, 0, n), (n, n, n), (n, n, 0)])
    bottom_front = proj_pts([(0, n, 0), (n, n, 0)])

    inner: List[str] = []
    inner.append("<style>")
    inner.append(
        """
      .face { stroke: currentColor; stroke-width: 2.2; stroke-linejoin: miter; stroke-linecap: square; }
      .edge { stroke: currentColor; stroke-width: 3.6; stroke-linejoin: miter; stroke-linecap: square; opacity: .98; }
      .cubie { transform-box: fill-box; transform-origin: center; }
    """.strip()
    )
    inner.append("</style>")

    # ✅ IMPORTANT: edges UNDER faces (so they don't “cut” the top surface)
    inner.append('<g class="edge">')
    inner.append(f'<polygon points="{poly(top_outline)}" fill="none"/>')
    inner.append(f'<polyline points="{poly(left_outline)}" fill="none"/>')
    inner.append(f'<polyline points="{poly(right_outline)}" fill="none"/>')
    inner.append(
        f'<line x1="{bottom_front[0][0]:.2f}" y1="{bottom_front[0][1]:.2f}" '
        f'x2="{bottom_front[1][0]:.2f}" y2="{bottom_front[1][1]:.2f}"/>'
    )
    inner.append("</g>")

    # faces ABOVE edges
    inner.append('<g class="face">')
    for c in cubies:
        inner.append(f'<g id="{c["id"]}" class="cubie">')
        for f in c["faces"]:
            pts = shift(f["pts"], dx, dy)
            inner.append(f'<polygon points="{poly(pts)}" fill="{f["fill"]}"/>')
        inner.append("</g>")
    inner.append("</g>")

    inner_svg = "\n".join(inner)

    # preview svg
    Path("public/icons").mkdir(parents=True, exist_ok=True)
    public_svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
        f'fill="none" role="img" aria-label="Kubrick cube full">\n{inner_svg}\n</svg>\n'
    )
    Path("public/icons/kubrick-cube-full.svg").write_text(public_svg, encoding="utf-8")

    # TSX component (inline so GSAP can target #cubie-*)
    Path("components/icons").mkdir(parents=True, exist_ok=True)
    tsx = f'''\"use client\";

import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export function KubrickCubeFull(props: Props) {{
  return (
    <svg
      viewBox="0 0 {w:.2f} {h:.2f}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kubrick cube"
      {{...props}}
      dangerouslySetInnerHTML={{{{ __html: {inner_svg!r} }}}}
    />
  );
}}
'''
    Path("components/icons/KubrickCubeFull.tsx").write_text(tsx, encoding="utf-8")

    print("✅ wrote: public/icons/kubrick-cube-full.svg")
    print("✅ wrote: components/icons/KubrickCubeFull.tsx")


if __name__ == "__main__":
    make()
