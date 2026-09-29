/* ── motion kit (ported from the v3 "Loud Audit" take, tuned down) ──────
   Anime.js: letter choreography and self-drawing strokes.
   react-spring: magnetic buttons and massy card tilts.
   Everything collapses under prefers-reduced-motion. */
import { useEffect, useRef, type ReactNode } from "react";
import { animate, stagger } from "animejs";
import { useSpring, animated, to } from "@react-spring/web";

export const RM =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const HOVERABLE =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches;

/* ── Kinetic: per-letter split headline, anime staggered rise ────────── */
export function Kinetic({
  text, className = "", delay = 0, letterClassName = "", immediate = false,
}: {
  text: string; className?: string; delay?: number;
  letterClassName?: string; immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || RM) return;
    const run = () => {
      if (played.current) return;
      played.current = true;
      animate(el.querySelectorAll<HTMLElement>(".kin-l"), {
        translateY: ["112%", "0%"],
        rotate: ["9deg", "0deg"],
        delay: stagger(24, { start: delay }),
        duration: 700,
        ease: "outQuint",
      });
    };
    if (immediate) { run(); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, immediate]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, wi) => (
          <span key={wi}>
            <span className="inline-block overflow-hidden whitespace-nowrap pb-[0.08em] align-bottom">
              {w.split("").map((c, ci) => (
                <span
                  key={ci}
                  className={`kin-l inline-block will-change-transform ${letterClassName}`}
                  style={RM ? undefined : { transform: "translateY(112%) rotate(9deg)" }}
                >
                  {c}
                </span>
              ))}
            </span>{" "}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ── Ent: anime entrance for blocks (rise + fade) ────────────────────── */
export function Ent({
  children, className = "", delay = 0, y = 30, threshold = 0.2,
}: {
  children: ReactNode; className?: string; delay?: number; y?: number; threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || RM) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        animate(el, {
          translateY: [y, 0], opacity: [0, 1],
          delay, duration: 750, ease: "outQuint",
        });
      }),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y, threshold]);
  return (
    <div ref={ref} className={className}
      style={RM ? undefined : { opacity: 0, transform: `translateY(${y}px)` }}>
      {children}
    </div>
  );
}

/* ── Magnetic + press: spring physics on buttons ─────────────────────── */
export function Magnetic({ children, strength = 0.3, className = "inline-block", max = Infinity }: {
  children: ReactNode; strength?: number; className?: string;
  /* px cap on the pull, for buttons that sit inside a frame */
  max?: number;
}) {
  const clamp = (v: number) => Math.max(-max, Math.min(max, v));
  const ref = useRef<HTMLDivElement>(null);
  const [spr, api] = useSpring(() => ({
    x: 0, y: 0, s: 1, config: { tension: 260, friction: 15 },
  }));
  if (RM || !HOVERABLE) return <div className={className}>{children}</div>;
  return (
    <animated.div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: to([spr.x, spr.y, spr.s],
          (x, y, s) => `translate3d(${x}px,${y}px,0) scale(${s})`),
      }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        api.start({
          x: clamp((e.clientX - r.left - r.width / 2) * strength),
          y: clamp((e.clientY - r.top - r.height / 2) * strength),
        });
      }}
      onPointerDown={() => api.start({ s: 0.93 })}
      onPointerUp={() => api.start({ s: 1, config: { tension: 300, friction: 8 } })}
      onPointerLeave={() => api.start({ x: 0, y: 0, s: 1 })}
    >
      {children}
    </animated.div>
  );
}

/* ── TiltCard: massy 3D hover ────────────────────────────────────────── */
export function TiltCard({ children, className = "", max = 6, lift = -5 }: {
  children: ReactNode; className?: string; max?: number; lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [spr, api] = useSpring(() => ({
    rx: 0, ry: 0, ty: 0, s: 1, config: { tension: 220, friction: 18 },
  }));
  if (RM || !HOVERABLE) return <div className={className}>{children}</div>;
  return (
    <animated.div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: to([spr.rx, spr.ry, spr.ty, spr.s],
          (rx, ry, ty, s) =>
            `perspective(820px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${ty}px) scale(${s})`),
      }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        api.start({
          rx: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -max,
          ry: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * max,
          ty: lift, s: 1.012,
        });
      }}
      onPointerLeave={() => api.start({ rx: 0, ry: 0, ty: 0, s: 1 })}
    >
      {children}
    </animated.div>
  );
}

/* ── DrawRule: sky rule that draws itself ────────────────────────────── */
export function DrawRule({ className = "", delay = 0, stroke = "#38c8f8", width = 3 }: {
  className?: string; delay?: number; stroke?: string; width?: number;
}) {
  const ref = useRef<SVGLineElement>(null);
  const box = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    const sv = box.current;
    if (!el || !sv || RM) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        animate(el, {
          strokeDashoffset: [1, 0], delay, duration: 900, ease: "outQuint",
        });
      }),
      { threshold: 0.4 },
    );
    io.observe(sv);
    return () => io.disconnect();
  }, [delay]);
  return (
    <svg ref={box} aria-hidden="true" className={`block ${className}`} height={width}>
      <line
        ref={ref}
        x1="0" y1={width / 2} x2="100%" y2={width / 2}
        stroke={stroke} strokeWidth={width} pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: RM ? 0 : 1 }}
      />
    </svg>
  );
}

/* ── Circled: the auditor's ellipse, drawn live around a phrase ──────── */
export function Circled({ children, delay = 0, immediate = false, tilt = -2 }: {
  children: ReactNode; delay?: number; immediate?: boolean; tilt?: number;
}) {
  const ref = useRef<SVGEllipseElement>(null);
  const wrap = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const w = wrap.current;
    if (!el || !w || RM) return;
    /* non-scaling-stroke makes Chrome ignore pathLength, so the dash
       offset alone leaves arcs showing; stay invisible until the draw */
    const run = () => animate(el, {
      strokeDashoffset: [1, 0], opacity: { to: 1, duration: 1 },
      delay, duration: 950, ease: "outQuint",
    });
    if (immediate) { run(); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.6 },
    );
    io.observe(w);
    return () => io.disconnect();
  }, [delay, immediate]);
  return (
    <span ref={wrap} className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-[0.16em] -inset-x-[0.3em] h-[calc(100%+0.32em)] w-[calc(100%+0.6em)] overflow-visible"
        viewBox="0 0 100 40" preserveAspectRatio="none"
      >
        <ellipse
          ref={ref}
          cx="50" cy="20" rx="48.5" ry="17.5"
          fill="none" stroke="#38c8f8" strokeWidth="3.2"
          vectorEffect="non-scaling-stroke" pathLength={1}
          transform={`rotate(${tilt} 50 20)`}
          style={{ strokeDasharray: 1, strokeDashoffset: RM ? 0 : 1, opacity: RM ? 1 : 0 }}
        />
      </svg>
    </span>
  );
}
