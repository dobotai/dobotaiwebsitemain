import { useEffect, useRef } from "react";

/*
 * The hero diagram: a pipe of dots flowing left to right. Three gaps in the
 * bottom wall leak dots out. The gaps are circled in deepskyblue — the
 * auditor finds the leaks, the page doesn't pretend to fix them.
 * Counters are live counts from the simulation itself, not invented figures.
 */

const INK = "15,24,37";
const SLATE = "126,136,147";
const SKY = "#38c8f8";
const SKY_DEEP = "#0d94c6";

type Dot = { x: number; yn: number; py: number; vx: number; vy: number; leaked: boolean };

const LEAKS = [
  { x: 0.34, w: 0.032 },
  { x: 0.57, w: 0.046 },
  { x: 0.76, w: 0.026 },
];

export default function LeakPipe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1, raf = 0;
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    };
    size();
    addEventListener("resize", size);

    let through = 0, lost = 0;
    const spawn = (x = -0.02): Dot => ({
      x, yn: 0.5 + (Math.random() - 0.5) * 0.62,
      py: 0, vx: 0.085 + Math.random() * 0.05, vy: 0, leaked: false,
    });
    const dots: Dot[] = Array.from({ length: 150 }, () => spawn(Math.random()));

    let t0 = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - t0) / 1000, 0.05); t0 = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const top = H * 0.26, bot = H * 0.62;

      /* pipe walls — the bottom one has the gaps */
      ctx.strokeStyle = `rgba(${INK},.5)`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, top); ctx.lineTo(W, top); ctx.stroke();
      ctx.beginPath();
      let wx = 0;
      for (const L of LEAKS) {
        const a = (L.x - L.w) * W, b = (L.x + L.w) * W;
        ctx.moveTo(wx, bot); ctx.lineTo(a, bot); wx = b;
      }
      ctx.moveTo(wx, bot); ctx.lineTo(W, bot); ctx.stroke();

      /* the audit marks: sky circles around each gap */
      LEAKS.forEach((L, i) => {
        ctx.save();
        ctx.translate(L.x * W, bot);
        ctx.rotate(-0.05 + i * 0.045);
        ctx.strokeStyle = SKY; ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.ellipse(0, 3, L.w * W + 18, 15, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      /* dots */
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (!reduced) {
          if (!d.leaked) {
            d.x += d.vx * dt;
            d.py = top + (bot - top) * d.yn + Math.sin(d.x * 40 + i) * 1.5;
            if (d.yn > 0.72) {
              for (const L of LEAKS) {
                if (Math.abs(d.x - L.x) < L.w && Math.random() < 2.6 * dt) {
                  d.leaked = true; d.vy = 30; lost++;
                  break;
                }
              }
            }
            if (d.x > 1.02) { through++; dots[i] = spawn(); }
          } else {
            d.vy += 620 * dt;
            d.py += d.vy * dt;
            d.x += d.vx * 0.25 * dt;
            if (d.py > H + 10) dots[i] = spawn();
          }
        } else {
          d.py = top + (bot - top) * d.yn;
        }
        const fade = d.leaked ? Math.max(0, 1 - (d.py - bot) / (H - bot)) : 1;
        ctx.fillStyle = d.leaked ? `rgba(${SLATE},${0.9 * fade})` : `rgba(${INK},.62)`;
        ctx.beginPath();
        ctx.arc(d.x * W, d.py, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }

      /* live counters — the sim's own numbers */
      const total = through + lost;
      const pct = total > 0 ? Math.round((lost / total) * 100) : 0;
      ctx.font = "500 11px 'IBM Plex Mono', monospace";
      ctx.textBaseline = "top";
      ctx.fillStyle = `rgba(${INK},.75)`;
      ctx.textAlign = "left";
      ctx.fillText("IN — EVERY LEAD, JOB, INVOICE", 2, 4);
      ctx.textAlign = "right";
      ctx.fillText(`THROUGH ${through.toLocaleString()}`, W - 2, 4);
      ctx.fillStyle = SKY_DEEP;
      ctx.textAlign = "center";
      ctx.fillText(
        reduced ? "THE LEAKS — CIRCLED" : `LEAKED ${lost.toLocaleString()} · ${pct}%`,
        W * 0.55, H - 16,
      );

      if (!reduced) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label="Diagram: a steady stream of dots flows through a pipe. Three gaps in the pipe are circled in blue, and a share of the dots falls out through them — the leaks an audit finds."
    />
  );
}
