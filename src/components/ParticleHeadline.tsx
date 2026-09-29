import { useEffect, useRef } from "react";

/*
 * The hero: the headline rendered as ~8,000 ink particles that assemble from
 * scatter into type on load, and reassemble after the cursor tears through
 * them. Chaos in, order out — the thesis, running live.
 *
 * Canvas 2D, no dependencies. The accent word renders in deepskyblue via a
 * two-pass paint on the sampling canvas. A real (visually hidden) h1 carries
 * the text for screen readers and search; the canvas is aria-hidden.
 * Reduced motion: particles draw once, settled, no loop.
 */

const INK = "#0f1825";
const SKY = "#0d94c6";

type P = {
  x: number; y: number; vx: number; vy: number;
  tx: number; ty: number; sky: boolean; r: number;
};

export default function ParticleHeadline({
  line1,
  line2pre,
  line2accent,
  className = "",
}: {
  line1: string;
  line2pre: string;
  line2accent: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvEl = ref.current;
    if (!cvEl) return;
    const ctxEl = cvEl.getContext("2d");
    if (!ctxEl) return;
    const cv = cvEl;
    const ctx = ctxEl;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let W = 0, H = 0, dpr = 1, raf = 0, killed = false;
    let parts: P[] = [];
    const ptr = { x: -9999, y: -9999, vx: 0, lastX: 0, lastY: 0 };

    /* build particle targets by rasterising the type offscreen */
    function build() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);

      const oc = document.createElement("canvas");
      oc.width = W; oc.height = H;
      const o = oc.getContext("2d");
      if (!o) return;

      /* size type to fill the box: two lines, left-aligned */
      const longest = Math.max(line1.length, (line2pre + line2accent).length);
      let fs = Math.min((W * 1.62) / longest, H * 0.44);
      const font = (px: number) => `800 condensed ${px}px "Archivo", sans-serif`;
      o.font = font(fs);
      /* shrink until both lines fit the width */
      const fits = () =>
        Math.max(o.measureText(line1).width, o.measureText(line2pre + line2accent).width) <= W - 4;
      while (!fits() && fs > 20) { fs -= 4; o.font = font(fs); }

      const lh = fs * 1.04;
      const baseY = H / 2 - lh / 2 + fs * 0.36;
      o.textBaseline = "alphabetic";
      o.fillStyle = "#000";
      o.fillText(line1, 2, baseY);
      o.fillText(line2pre, 2, baseY + lh);
      const preW = o.measureText(line2pre).width;
      o.fillStyle = "#00a0ff";
      o.fillText(line2accent, 2 + preW, baseY + lh);

      const img = o.getImageData(0, 0, W, H).data;

      /* choose a stride that lands near the particle budget */
      const budget = coarse ? 3800 : 8200;
      let stride = 2;
      const countAt = (s: number) => {
        let n = 0;
        for (let y = 0; y < H; y += s)
          for (let x = 0; x < W; x += s)
            if (img[(y * W + x) * 4 + 3] > 120) n++;
        return n;
      };
      while (countAt(stride) > budget && stride < 8) stride++;

      const next: P[] = [];
      let i = 0;
      for (let y = 0; y < H; y += stride) {
        for (let x = 0; x < W; x += stride) {
          const idx = (y * W + x) * 4;
          if (img[idx + 3] > 120) {
            const sky = img[idx + 2] > 180 && img[idx] < 120;
            const prev = parts[i];
            next.push({
              /* reuse live positions on resize so it morphs, not restarts */
              x: prev ? prev.x : Math.random() * W,
              y: prev ? prev.y : Math.random() * H,
              vx: 0, vy: 0,
              tx: x, ty: y, sky,
              r: stride * 0.42 + Math.random() * 0.5,
            });
            i++;
          }
        }
      }
      parts = next;
    }

    function drawStatic() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        ctx.fillStyle = p.sky ? SKY : INK;
        ctx.beginPath();
        ctx.arc(p.tx, p.ty, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let t0 = performance.now();
    let idleT = 0;
    function frame(now: number) {
      if (killed) return;
      const dt = Math.min((now - t0) / 16.7, 2.4); t0 = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      /* ambient pulse for touch devices: a slow wandering disturbance */
      let ax = ptr.x, ay = ptr.y, radius = 92;
      if (coarse) {
        idleT += dt * 0.012;
        ax = W * (0.5 + 0.42 * Math.sin(idleT * 1.7));
        ay = H * (0.5 + 0.34 * Math.sin(idleT * 2.3 + 1.4));
        radius = 60;
      }

      const r2 = radius * radius;
      ctx.fillStyle = INK;
      let lastSky = false;
      for (const p of parts) {
        /* spring home */
        p.vx += (p.tx - p.x) * 0.045 * dt;
        p.vy += (p.ty - p.y) * 0.045 * dt;
        /* cursor repulsion */
        const dx = p.x - ax, dy = p.y - ay;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((radius - d) / radius) * (2.6 + Math.abs(ptr.vx) * 0.12) * dt;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.865; p.vy *= 0.865;
        p.x += p.vx * dt; p.y += p.vy * dt;

        if (p.sky !== lastSky) { ctx.fillStyle = p.sky ? SKY : INK; lastSky = p.sky; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const nx = e.clientX - r.left, ny = e.clientY - r.top;
      ptr.vx = nx - ptr.lastX;
      ptr.lastX = nx; ptr.lastY = ny;
      ptr.x = nx; ptr.y = ny;
    };
    const onLeave = () => { ptr.x = -9999; ptr.y = -9999; ptr.vx = 0; };
    const onDown = (e: PointerEvent) => {
      /* shockwave: scatter everything near the tap */
      const r = cv.getBoundingClientRect();
      const cx = e.clientX - r.left, cy = e.clientY - r.top;
      for (const p of parts) {
        const dx = p.x - cx, dy = p.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 240) {
          const f = ((240 - d) / 240) * 26;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
    };

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { build(); if (reduced) drawStatic(); }, 140); };

    /* wait for the display face so the raster samples real glyphs */
    const start = () => {
      build();
      if (reduced) { drawStatic(); return; }
      cv.addEventListener("pointermove", onMove);
      cv.addEventListener("pointerleave", onLeave);
      cv.addEventListener("pointerdown", onDown);
      raf = requestAnimationFrame(frame);
    };
    if (document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(() => { if (!killed) start(); });
    } else {
      start();
    }
    addEventListener("resize", onResize);

    return () => {
      killed = true;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      removeEventListener("resize", onResize);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      cv.removeEventListener("pointerdown", onDown);
    };
  }, [line1, line2pre, line2accent]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
