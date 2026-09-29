import { useEffect, useRef, useState, type ReactNode } from "react";
import { Magnetic, TiltCard, DrawRule } from "@/components/motion";
import Hero from "@/components/Hero";
import Logo from "@/components/Logo";
import ClientLogos from "@/components/ClientLogos";
import CircleMark from "@/components/CircleMark";
import CountUp from "@/components/CountUp";
import { LogoLoop } from "@/components/LogoLoop";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CALL_URL = "https://calendly.com/dobotai/automation-audit-wb";

/* ── corner brackets that register around the final CTA ─────────────── */
function BracketMark({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }),
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const base =
    "absolute h-4 w-4 border-sky [transition:all_.45s_cubic-bezier(.16,1,.3,1)]";
  const corners: [string, string, string, number][] = [
    ["top-0 left-0", "border-t-2 border-l-2", "-translate-x-2 -translate-y-2", 300],
    ["top-0 right-0", "border-t-2 border-r-2", "translate-x-2 -translate-y-2", 420],
    ["bottom-0 right-0", "border-b-2 border-r-2", "translate-x-2 translate-y-2", 540],
    ["bottom-0 left-0", "border-b-2 border-l-2", "-translate-x-2 translate-y-2", 660],
  ];
  return (
    <span ref={ref} className="relative inline-block p-3">
      {corners.map(([pos, borders, off, delay]) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`${base} ${pos} ${borders} ${on ? "translate-x-0 translate-y-0 opacity-100" : `${off} opacity-0`}`}
          style={{ transitionDelay: `${delay}ms` }}
        />
      ))}
      {children}
    </span>
  );
}

/* ── scroll reveal: rises in once, house easing ──────────────────────── */
function Rise({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inV, setInV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setInV(true); io.disconnect(); } }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rise ${inV ? "rise-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ── small spring tilt (TiltedCard physics, tamed) ───────────────────── */
function TiltBox({ children, amp = 3 }: { children: ReactNode; amp?: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = outer.current, tgt = inner.current;
    if (!el || !tgt) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const st = { rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0, raf: 0 };
    const run = () => {
      const dt = 1 / 60;
      st.vx += (-100 * (st.rx - st.tx) - 30 * st.vx) * dt; st.rx += st.vx * dt;
      st.vy += (-100 * (st.ry - st.ty) - 30 * st.vy) * dt; st.ry += st.vy * dt;
      tgt.style.transform = `rotateX(${st.rx.toFixed(2)}deg) rotateY(${st.ry.toFixed(2)}deg)`;
      if (Math.abs(st.rx - st.tx) > 0.02 || Math.abs(st.ry - st.ty) > 0.02 ||
          Math.abs(st.vx) > 0.02 || Math.abs(st.vy) > 0.02) st.raf = requestAnimationFrame(run);
      else st.raf = 0;
    };
    const kick = () => { if (!st.raf) st.raf = requestAnimationFrame(run); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      st.tx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -amp;
      st.ty = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * amp;
      kick();
    };
    const leave = () => { st.tx = 0; st.ty = 0; kick(); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(st.raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [amp]);
  return (
    <div ref={outer} style={{ perspective: "700px" }}>
      <div ref={inner} className="will-change-transform">{children}</div>
    </div>
  );
}

/* ── the bottleneck: five lines of work converging on one person ─────── */
const BN_SOURCES = ["SALES", "OPS", "BILLING", "SCHEDULE", "ESCALATIONS"];

function Bottleneck() {
  const ref = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(0);
  const [hl, setHl] = useState(-1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) { setLanded(BN_SOURCES.length); return; }
        BN_SOURCES.forEach((_, i) =>
          setTimeout(() => setLanded((n) => Math.max(n, i + 1)), 350 + i * 300));
      }),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const youScale = 1 + landed * 0.055;
  return (
    <div ref={ref} className="mt-8 max-w-sm">
      <svg viewBox="0 0 360 250" className="w-full" role="img"
        aria-label="Diagram: sales, ops, billing, schedule and escalations all route to a single node labelled you.">
        {BN_SOURCES.map((label, i) => {
          const y = 14 + i * 47;
          const on = i < landed;
          const hot = hl === i;
          return (
            <g key={label}
              onPointerEnter={() => setHl(i)}
              onPointerLeave={() => setHl(-1)}
              style={{ cursor: "default" }}>
              <path
                d={`M116 ${y + 12} C 190 ${y + 12}, 205 125, 268 125`}
                fill="none"
                stroke={hot ? "#0d94c6" : "rgba(15,24,37,.38)"}
                strokeWidth={hot ? 2.2 : 1.4}
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: on ? 0 : 1,
                  transition: "stroke-dashoffset .55s cubic-bezier(.16,1,.3,1), stroke .2s",
                }}
              />
              <rect x="4" y={y} width="112" height="24" rx="3"
                fill="#f8f8f8"
                stroke={hot ? "#0d94c6" : "rgba(15,24,37,.32)"}
                style={{ opacity: on ? 1 : 0.25, transition: "opacity .4s, stroke .2s" }} />
              <text x="60" y={y + 16} textAnchor="middle"
                fontFamily="IBM Plex Mono" fontSize="9.5" letterSpacing="1.5"
                fill={hot ? "#0d94c6" : "#44525f"}
                style={{ opacity: on ? 1 : 0.25, transition: "opacity .4s" }}>
                {label}
              </text>
            </g>
          );
        })}
        <g style={{ transform: `scale(${youScale})`, transformOrigin: "300px 125px", transition: "transform .45s cubic-bezier(.306,.968,.632,1)" }}>
          <circle cx="300" cy="125" r="27" fill="#0f1825" />
          <text x="300" y="129" textAnchor="middle"
            fontFamily="IBM Plex Mono" fontSize="11" fontWeight="600" letterSpacing="2" fill="#f8f8f8">
            YOU
          </text>
        </g>
      </svg>
      <p className="lab mt-2">
        {landed < BN_SOURCES.length ? "Routing…" : "Five departments. One router. That's the bottleneck."}
      </p>
    </div>
  );
}

/* ── the deliverable, previewed: a company sketch, broken parts circled ─ */
function DeliverableSketch() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const box = (x: number, y: number, w: number, label: string) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={22} rx={3} fill="#f8f8f8" stroke="rgba(15,24,37,.34)" />
      <text x={x + w / 2} y={y + 15} textAnchor="middle"
        fontFamily="IBM Plex Mono" fontSize="8.5" letterSpacing="1" fill="#44525f">{label}</text>
    </g>
  );
  const circ = (cx: number, cy: number, rx: number, ry: number, i: number, tag: string, tx: number, ty: number) => (
    <g key={tag}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#38c8f8" strokeWidth={2.3}
        pathLength={100}
        transform={`rotate(${i % 2 ? 2.5 : -3} ${cx} ${cy})`}
        style={{
          strokeDasharray: 100,
          strokeDashoffset: on ? 0 : 100,
          transition: `stroke-dashoffset .8s cubic-bezier(.16,1,.3,1) ${350 + i * 550}ms`,
        }} />
      <text x={tx} y={ty} fontFamily="IBM Plex Mono" fontSize="10" fontWeight="600" fill="#0d94c6"
        style={{ opacity: on ? 1 : 0, transition: `opacity .4s ${750 + i * 550}ms` }}>
        {tag}
      </text>
    </g>
  );

  return (
    <div ref={ref}>
      <svg viewBox="0 0 320 240" className="w-full" role="img"
        aria-label="A sketched company flow diagram with three broken points circled in blue and priced.">
        {/* connective lines */}
        <g stroke="rgba(15,24,37,.3)" strokeWidth={1.2} fill="none">
          <path d="M160 32 V52" />
          <path d="M160 52 H60 V70" />
          <path d="M160 52 V70" />
          <path d="M160 52 H260 V70" />
          <path d="M60 92 V112" />
          <path d="M160 92 V112" />
          <path d="M260 92 V112" />
          <path d="M60 134 V156 H110 V172" />
          <path d="M160 134 V172" />
          <path d="M260 134 V156 H210 V172" />
        </g>
        {box(122, 10, 76, "OWNER")}
        {box(24, 70, 72, "LEADS")}
        {box(124, 70, 72, "JOBS")}
        {box(224, 70, 72, "BILLING")}
        {box(24, 112, 72, "QUOTES")}
        {box(124, 112, 72, "SCHEDULE")}
        {box(224, 112, 72, "INVOICES")}
        {box(74, 172, 72, "FOLLOW-UP")}
        {box(174, 172, 72, "COLLECTIONS")}
        {circ(60, 123, 48, 20, 0, "$86K/yr", 8, 158)}
        {circ(110, 183, 50, 20, 1, "$48K/yr", 34, 216)}
        {/* right of the connector that drops from INVOICES, so the tag stays clear */}
        {circ(260, 123, 48, 20, 2, "$17K/yr", 268, 170)}
      </svg>
      <p className="lab mt-2">The deliverable, previewed. Specimen figures.</p>
    </div>
  );
}

/* ── math tile: the equation types, the number lands, the pen circles ── */
function MathTile({ m }: { m: (typeof MATH)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState(0);
  const [eqDone, setEqDone] = useState(false);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) { setChars(m.eq.length); setEqDone(true); return; }
        let i = 0;
        const id = setInterval(() => {
          i++;
          setChars(i);
          if (i >= m.eq.length) { clearInterval(id); setEqDone(true); }
        }, 34);
      }),
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [m.eq]);

  return (
    <TiltCard className="h-full">
    <div ref={ref} className="flex h-full flex-col gap-4 bg-smoke p-7">
      <p className="lab !normal-case !tracking-normal !text-ink-2">{m.small}</p>
      <p className="font-mono text-xs text-slate" aria-label={m.eq}>
        {m.eq.slice(0, chars)}
        {!eqDone && <span className="text-sky-deep">▌</span>}
      </p>
      <div className="font-mono text-[clamp(1.8rem,2.9vw,2.7rem)] font-semibold tracking-tight tabular-nums">
        <CircleMark active={landed} padX={10} padY={24} delay={0}>
          {m.prefix}
          <CountUp to={m.to} duration={1.4} startWhen={eqDone} onEnd={() => setLanded(true)} className="tabular-nums" />
          {m.suffix && <span className="text-sky-deep">{m.suffix}</span>}
        </CircleMark>
      </div>
      <p className="text-sm leading-relaxed text-ink-2">{m.after}</p>
    </div>
    </TiltCard>
  );
}


/* ── nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="text-2xl">
          <Logo />
        </a>
        <div className="hidden items-center gap-7 md:flex">
          <a href="#math" className="lab transition-colors hover:text-ink">The math</a>
          <a href="#audit" className="lab transition-colors hover:text-ink">The audit</a>
          <a href="#community" className="lab transition-colors hover:text-ink">Community</a>
          <a href="#faq" className="lab transition-colors hover:text-ink">FAQ</a>
        </div>
        <Button asChild className="rounded-none px-5 font-semibold">
          <a href={CALL_URL} target="_blank" rel="noopener noreferrer">Book a fit call</a>
        </Button>
      </div>
    </nav>
  );
}

/* ── question ticker ─────────────────────────────────────────────────── */
const QUESTIONS = [
  "If you stopped working tomorrow, what breaks?",
  "What is one customer worth? Name the number.",
  "How many leads went quiet last month? Why?",
  "Whose phone rings when something breaks at 4:55 on a Friday?",
  "What did the last missed call cost you?",
];

function QuestionTicker() {
  return (
    <div className="overflow-hidden border-b border-line bg-alice py-4">
      <LogoLoop
        logos={QUESTIONS.map((q) => ({
          node: (
            <span className="lab flex items-center gap-3 whitespace-nowrap !text-ink-2">
              {q} <span aria-hidden="true" className="text-sky">●</span>
            </span>
          ),
          ariaLabel: q,
        }))}
        speed={50}
        gap={48}
        logoHeight={16}
        pauseOnHover
        fadeOut
        fadeOutColor="#f1f7fb"
        ariaLabel="Questions worth sitting with"
      />
    </div>
  );
}

/* ── section head ────────────────────────────────────────────────────── */
function SectionHead({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return (
    <div className="mb-12 grid gap-4 md:grid-cols-[9rem_1fr] md:items-baseline">
      <p className="lab">{eyebrow}</p>
      <div>
        <h2 className="display-condensed max-w-3xl text-[clamp(1.7rem,3.6vw,2.9rem)] text-balance">
          {title}
        </h2>
        <DrawRule className="mt-3 w-24" />
      </div>
    </div>
  );
}

/* ── the math ────────────────────────────────────────────────────────── */
const MATH: {
  small: string;
  eq: string;
  prefix?: string;
  to: number;
  suffix?: string;
  after: string;
}[] = [
  {
    small: "A missed phone call.",
    eq: "$20K/yr × 5 yr =",
    prefix: "$",
    to: 100,
    suffix: "K",
    after:
      "One $20,000-a-year customer, kept five years. That one missed call cost you a hundred grand.",
  },
  {
    small: "A quote nobody follows up.",
    eq: "1 of every 4 quotes =",
    to: 25,
    suffix: "%",
    after: "A quarter of your quotes go quiet. Nobody calls them back, and the buyer books someone else.",
  },
  {
    small: "A $60,000 salary.",
    eq: "$60,000 ÷ 2,080 hrs =",
    prefix: "$",
    to: 28.85,
    suffix: "/hr",
    after:
      "Now you know what an hour of their day costs. The audit asks what each hour gives back.",
  },
];

function TheMath() {
  return (
    <section id="math" aria-labelledby="h-math" className="scroll-mt-20 border-b border-line bg-alice">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead eyebrow="The math" title="Small losses repeat. Break one down." />
        <h2 id="h-math" className="sr-only">The math</h2>
        <Rise>
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {MATH.map((m) => (
              <MathTile key={m.small} m={m} />
            ))}
          </div>
        </Rise>
        <p className="lab mt-6">
          That's one process. The audit goes through every process you run.
        </p>
      </div>
    </section>
  );
}

/* ── role collapse ───────────────────────────────────────────────────── */
function RoleCollapse() {
  return (
    <section aria-labelledby="h-role" className="border-b border-line bg-ghost">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-2">
        <div>
          <p className="lab mb-4">Key man risk</p>
          <h2
            id="h-role"
            className="display-condensed text-[clamp(1.7rem,3.6vw,2.9rem)] text-balance"
          >
            If you got sick for a month, what percentage of revenue disappears?
          </h2>
          <Bottleneck />
        </div>
        <Rise className="space-y-5 text-ink-2 md:pt-12">
          <p>
            You're the CEO, the COO, the head of sales, the escalation point, and the
            person every problem finds first.{" "}
            <strong>That's a single point of failure with a salary.</strong>
          </p>
          <p>
            One founder is the sales pipeline. Another is the only person who knows how
            the invoicing works. Different companies. Same bottleneck: everything routes
            through you.
          </p>
          <p>
            The fix is a machine that runs when you don't. That starts with knowing, on
            paper, what happens all day.
          </p>
        </Rise>
      </div>
    </section>
  );
}

/* ── the audit ───────────────────────────────────────────────────────── */
const PHASES = [
  {
    n: "01",
    t: "Map",
    when: "Calls 1 to 3",
    d: "Every lead source and every handoff, plus the numbers nobody tracks. We come in like a customer: the form, the phone, the follow-up. You see what a lead sees. You get the diagram and the leak list.",
  },
  {
    n: "02",
    t: "Build",
    when: "After the map",
    d: "Process first: who owns what, and what happens when it breaks. AI and automation get added where they earn their keep. Nowhere else.",
  },
  {
    n: "03",
    t: "Run",
    when: "Until it sticks",
    d: "A system nobody runs is a PDF. We stay until your team runs it without you.",
  },
];

function TheAudit() {
  return (
    <section id="audit" aria-labelledby="h-audit" className="scroll-mt-20 border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow="The offer"
          title="Three audit calls. We map the machine you already have."
        />
        <h2 id="h-audit" className="sr-only">The audit</h2>
        <div className="mb-12 grid gap-10 md:grid-cols-[1fr_19rem] md:items-center">
          <div>
            <p className="mb-4 max-w-2xl text-lg leading-relaxed text-ink-2">
              We spend the first phase mapping what already happens: where leads come from,
              who touches them, and what gets dropped. From that map
              we build the new process and get your team running it.
            </p>
            <p className="max-w-2xl text-lg font-medium leading-relaxed">
              Phase one hands you a diagram of your company with the
              broken parts <CircleMark>circled</CircleMark>.
            </p>
          </div>
          <DeliverableSketch />
        </div>
        <Rise>
        <div className="relative">
          <div className="absolute -top-4 left-[16%] right-[16%] hidden md:block" aria-hidden="true">
            <div className="relative h-px bg-line-2">
              <span className="phase-dot absolute -top-[3.5px] h-2 w-2 rounded-full bg-sky-deep" />
            </div>
          </div>
        <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
          {PHASES.map((p) => (
            <li key={p.n} className="bg-smoke p-7">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-sm font-semibold text-sky-deep">{p.n}</span>
                <span className="lab">{p.when}</span>
              </div>
              <h3 className="display-condensed mt-5 text-2xl">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{p.d}</p>
            </li>
          ))}
        </ol>
        </div>
        </Rise>
        <div className="mt-6 border-l-2 border-sky bg-alice p-5">
          <p className="max-w-3xl text-sm leading-relaxed text-ink-2">
            <strong>Where the tech fits:</strong> automation is a multiplier. Multiply a
            broken process and you get broken, faster. That's why the AI and the
            automations come after the map, pointed at leaks we've already measured.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── community (skool) ───────────────────────────────────────────────── */
const SKOOL_URL = "https://www.skool.com/automation-founders-hub-9222";

/* Drop the community banner at src/assets/community-banner.png (or .jpg/.webp)
   and it renders automatically; until then the card is text-only. */
const bannerGlob = import.meta.glob("./assets/community-banner.*", {
  eager: true,
  query: "?url",
  import: "default",
});
const communityBanner = Object.values(bannerGlob)[0] as string | undefined;

const MODULES = [
  { t: "Start Here", d: "Orientation. What you're building, and in what order." },
  { t: "Foundations", d: "The non-negotiables of AI agents and automations." },
  { t: "Agentic AI: From Zero to Frontier", d: "The training we run for our own engineers. Condensed." },
  { t: "Agentic OS", d: "Your second brain. The operating system everything else plugs into." },
  { t: "Worlds", d: "Custom agents that run alongside your OS." },
  { t: "Build Your Agent", d: "Hands-on. You build, with Dobot." },
  { t: "Business Applications", d: "Real automations we built for real clients." },
  { t: "Playbooks", d: "Every copy and paste playbook we've made." },
];

function SkoolWord() {
  const letters: [string, string][] = [
    ["s", "#3230c0"],
    ["k", "#e5432c"],
    ["o", "#e6a33e"],
    ["o", "#54baf2"],
    ["l", "#d9502e"],
  ];
  return (
    <span className="normal-case">
      {letters.map(([ch, col], i) => (
        <span key={i} style={{ color: col }}>{ch}</span>
      ))}
    </span>
  );
}

function Community() {
  return (
    <section id="community" aria-labelledby="h-comm" className="scroll-mt-20 border-b border-line bg-alice">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow="The community"
          title={<>Want to build this stuff yourself? There's a room for that. Join our <SkoolWord />.</>}
        />
        <h2 id="h-comm" className="sr-only">The community</h2>
        <div className="grid gap-10 md:grid-cols-[1fr_19rem]">
          <div>
            {communityBanner && (
              <TiltBox>
                <a
                  href={SKOOL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-10 block w-full border border-line transition-colors hover:border-sky-deep"
                >
                  <img
                    src={communityBanner}
                    alt="Build your AI operating system: join the DobotAI Skool community"
                    className="block w-full"
                  />
                </a>
              </TiltBox>
            )}
            <p className="mb-10 max-w-2xl leading-relaxed text-ink-2">
              Some owners want AI working in their business and want to build it with
              their own hands. Cool. The community is where we teach it, with courses
              and playbooks, alongside other owners building the AI operating system
              that runs their whole business. Taught from real builds. You do the
              work. You keep the machine.
            </p>
            <ol className="border-t border-line">
              {MODULES.map((m, i) => (
                <li key={m.t} className="group grid grid-cols-[2.6rem_1fr] gap-x-4 gap-y-1 border-b border-line py-4 transition-colors sm:grid-cols-[2.6rem_15rem_1fr] sm:items-baseline">
                  <span className="font-mono text-sm font-semibold text-sky-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold transition-colors group-hover:text-sky-deep">{m.t}</h3>
                  <p className="col-start-2 text-sm text-ink-2 sm:col-start-3">{m.d}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="h-fit border border-line bg-smoke p-7 md:sticky md:top-24">
            <p className="lab">The deal</p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-ink-2">
              <li>
                <strong>Who it's for:</strong> anyone who wants AI running in their business and likes to build.
              </li>
              <li>
                <strong>What's inside:</strong> 8 modules, in order, plus every playbook
                we've written.
              </li>
              <li>
                <strong>The pace:</strong> yours. Start at 01, build as you go. And if
                the business outgrows DIY, you already know how we think.
              </li>
            </ul>
            <Magnetic strength={0.18} className="mt-7 block">
              <Button asChild className="w-full rounded-none font-semibold">
                <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
                  Join the community
                </a>
              </Button>
            </Magnetic>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ── faq ─────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "We're busy. Do we have time for an audit?",
    a: "Being busy is the reason to do it. It's what a business looks like when the work has nowhere to go but you. The audit takes a few hours of your team's time across three calls, and what it hands back is measured in days a month.",
  },
  {
    q: "Can't you just set up the automation?",
    a: "We could. You'd be automating the leak. Process first, then tech. In that order, the tech pays for itself. In the other order, you get the same broken week, delivered faster.",
  },
  {
    q: "How is this different from a consultant's report?",
    a: "A report says margins should improve. We hand you the full architecture of your business: how it should run end to end, every system, every handoff, with the broken parts circled. Then we stay and build it. If a deck could have fixed it, it'd be fixed.",
  },
  {
    q: "What if it's not worth fixing?",
    a: "Then we tell you, and you don't hire us for the build. Sometimes the honest answer is no. If we're not a fit, you hear that on the first call. A 30-minute no beats a three-call maybe.",
  },
];

function Faq() {
  return (
    <section id="faq" aria-labelledby="h-faq" className="scroll-mt-20 border-b border-line bg-smoke">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <SectionHead eyebrow="FAQ" title="What owners ask before the fit call" />
        <h2 id="h-faq" className="sr-only">Frequently asked questions</h2>
        <Rise><Accordion type="single" collapsible className="w-full">
          {FAQS.map((o) => (
            <AccordionItem key={o.q} value={o.q} className="border-line">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline hover:text-sky-deep">
                {o.q}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-ink-2">
                {o.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion></Rise>
      </div>
    </section>
  );
}

/* ── testimonials — client videos, lite-embedded ─────────────────────── */
const VIDEOS: { id: string; title: string }[] = [
  { id: "rGW1eGetVuc", title: "How we moved this 7-figure SEO agency off of Google Sheets" },
  { id: "xSQzwaFKTiM", title: "Why this 7-figure ads agency ditched offshore automation builders" },
  { id: "mIPfV0Q7-1s", title: "This email agency cut a 4-hour task to 10 minutes" },
  { id: "o0Kfo51o-D4", title: "Why this email agency stopped paying $140 per email flow" },
  { id: "e1VzYe6PycM", title: "He tried for 1 year. We built his sales dashboard in 3 weeks." },
  { id: "YVk_pAuqJEg", title: "This YouTube agency was drowning in leads. Here's what fixed it." },
  { id: "RsW7vr1BMBo", title: "Dan's case study" },
  { id: "aMPbjjnNyfQ", title: "How a 6-figure-a-month agency onboards clients in one click" },
];

function VideoCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="border border-line bg-smoke transition-colors hover:border-sky-deep">
      <div className="relative aspect-video overflow-hidden bg-ink">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-ink/85 transition-colors group-hover:bg-sky-deep">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-smoke" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-4 text-sm font-medium leading-snug">{title}</figcaption>
    </figure>
  );
}

function Testimonials() {
  return (
    <section id="proof" aria-labelledby="h-proof" className="scroll-mt-20 border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <p className="lab mb-4">Proof</p>
        <h2
          id="h-proof"
          className="display-condensed mb-12 max-w-3xl text-[clamp(1.7rem,3.6vw,2.9rem)] text-balance"
        >
          In their words
        </h2>
        <div className="mb-4">
          <ClientLogos />
        </div>
        <p className="lab mb-12">Businesses we've worked with</p>
        <Rise><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div></Rise>
        <p className="lab mt-6">Real clients, on camera.</p>
      </div>
    </section>
  );
}

/* ── cta ─────────────────────────────────────────────────────────────── */
function Cta() {
  return (
    <section aria-labelledby="h-cta" className="relative overflow-hidden bg-ink text-smoke">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(248,248,248,.05) 1px, transparent 1px), linear-gradient(0deg, rgba(248,248,248,.05) 1px, transparent 1px)",
          backgroundSize: "25.05% 46%",
          backgroundPosition: "-1px 14%",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-28">
        <p className="lab !text-sky">One call</p>
        <h2
          id="h-cta"
          className="display-condensed mt-5 max-w-4xl text-[clamp(2rem,5vw,4rem)] text-balance"
        >
          First we see if we fit. Then we go find the number.
        </h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-smoke/70">
          30 minutes. You talk about the business, we ask the questions you just
          scrolled past. If it's not a fit, we say so and you keep the answers. If it
          is, the audit starts: three calls to map the machine and find
          every leak.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <BracketMark>
            {/* BracketMark pads 12px; cap the pull so the button stays inside the corners */}
            <Magnetic max={9}>
              <Button
                asChild
                size="lg"
                className="h-13 rounded-none bg-sky px-8 text-base font-bold text-ink hover:bg-sky/85"
              >
                <a href={CALL_URL} target="_blank" rel="noopener noreferrer">
                  Book a fit call
                </a>
              </Button>
            </Magnetic>
          </BracketMark>
          <span className="lab !text-smoke/50">Worst case, the answer is no.</span>
        </div>
      </div>
    </section>
  );
}

/* ── footer ──────────────────────────────────────────────────── */
const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/doby-lanete/",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "X",
    href: "https://x.com/_dobylanete",
    path: "M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.4L6.48 22H3.36l7.24-8.28L2.4 2h6.4l4.42 5.85L18.9 2zm-1.1 18.1h1.72L7.62 3.8H5.78l12.02 16.3z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@doby_lanete",
    path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
  },
];

function Footer() {
  return (
    <footer className="bg-ink text-smoke/50">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-start justify-between gap-8 border-t border-smoke/10 pt-2">
          <div className="pt-6">
            <Logo onDark className="text-base" />
            <p className="mt-3 text-sm leading-relaxed">
              Systems &amp; operations.
              <br />
              Diagnosis first, tech second.
            </p>
          </div>
          <div className="flex gap-2 pt-6">
            {SOCIALS.map((so) => (
              <a
                key={so.label}
                href={so.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`DobotAI on ${so.label}`}
                className="grid h-11 w-11 place-items-center border border-smoke/15 text-smoke/60 transition-colors hover:border-sky hover:text-sky"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                  <path d={so.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-smoke/10 pt-5">
          <p className="text-xs text-smoke/40">© 2026 DobotAI. All rights reserved.</p>
          <a
            href="#top"
            className="lab !text-smoke/40 transition-colors hover:!text-smoke"
          >
            dobotai.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-[-4rem] left-4 z-[100] bg-ink px-4 py-2 font-mono text-sm text-smoke transition-all focus-visible:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <Hero />
      <main id="main">
        <QuestionTicker />
        <TheMath />
        <RoleCollapse />
        <TheAudit />
        <Faq />
        <Testimonials />
        <Community />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
