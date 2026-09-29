import { useEffect, useRef, useState, type ReactNode } from "react";

/* The auditor's pen: a hand-drawn sky ellipse around a phrase, drawing
   itself in. Fires on scroll-into-view by default; pass `active` to drive
   it manually (e.g. after a counter lands). padX/padY size the ellipse's
   overshoot around the content, in percent. */
export default function CircleMark({
  children,
  delay = 150,
  active,
  padX = 5,
  padY = 16,
}: {
  children: ReactNode;
  delay?: number;
  active?: boolean;
  padX?: number;
  padY?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (active !== undefined) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        }),
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  const shown = active !== undefined ? active : on;

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute overflow-visible"
        style={{
          top: `-${padY}%`,
          left: `-${padX}%`,
          width: `${100 + padX * 2}%`,
          height: `${100 + padY * 2}%`,
        }}
        viewBox="0 0 100 44"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="50"
          cy="22"
          rx="47"
          ry="17"
          pathLength={100}
          fill="none"
          stroke="#38c8f8"
          strokeWidth={2.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: shown ? 0 : 100,
            transition: `stroke-dashoffset 850ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            transform: "rotate(-2.2deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
    </span>
  );
}
