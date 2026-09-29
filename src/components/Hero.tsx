/* ── hero: the guarantee ────────────────────────────────────────────────
   Copy: ask the question, answer with the audit's guarantee. $75K, not
   $150K: most traffic is a $1M-or-under business, where $150K isn't
   findable. Design: the question sets small, the number gets circled.
   Audit first, build second. Obeys the voice guide: numbers on claims,
   question-then-answer, no em dashes, no pricing, verified receipts only. */
import { Kinetic, Ent, Magnetic, Circled } from "@/components/motion";
import { Button } from "@/components/ui/button";

const CALL_URL = "https://calendly.com/dobotai/automation-audit-wb"; // keep in sync with App.tsx
const GUARANTEE = "$75,000";
/* $30K+ recovered reads as short of the $75K guarantee, so it's left out */
const RECEIPTS = ["60–80% manual work cut", "50+ businesses automated"];

export default function Hero() {
  return (
    <header id="top" className="relative flex min-h-svh flex-col border-b border-line pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,24,37,.075) 1px, transparent 1px), linear-gradient(0deg, rgba(15,24,37,.075) 1px, transparent 1px)",
          backgroundSize: "25.05% 42%",
          backgroundPosition: "-1px 12%",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-10 md:pt-14">
        <div className="flex flex-1 flex-col justify-center py-8">
          <h1 className="display-condensed max-w-6xl">
            <Kinetic text="Are you drowning in operations?"
              className="block text-[clamp(1.8rem,4.2vw,3.4rem)] text-ink-2" immediate delay={300} />
            <span className="mt-4 block text-[clamp(2.3rem,6.2vw,5.2rem)]">
              <Kinetic text="We contractually find you" className="inline-block" immediate delay={1100} />{" "}
              {/* mid-line, so the ellipse needs clearance from the next word */}
              <span className="mr-[0.3em] inline-block">
                <Circled immediate delay={2450}>
                  <Kinetic text={GUARANTEE} className="inline-block text-sky-deep" immediate delay={1600} />
                </Circled>
              </span>{" "}
              <Kinetic text="in lost revenue." className="inline-block" immediate delay={1850} />
            </span>
            <span className="block text-[clamp(2.3rem,6.2vw,5.2rem)]">
              <Kinetic text="Or your money back." className="inline-block" immediate delay={2500} />
            </span>
          </h1>
        </div>

        <div className="grid gap-8 pt-10 pb-12 md:grid-cols-[1fr_auto] md:items-end">
          <Ent delay={3000}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-2 text-pretty">
              The audit walks your entire business in 3 audit calls and finds
              every leak. If they don't add up to {GUARANTEE}, you get your money
              back. Then we build the fix, so your team carries the load without
              more people.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button asChild size="lg" className="h-12 rounded-none px-7 text-base font-semibold">
                  <a href={CALL_URL} target="_blank" rel="noopener noreferrer">Book a fit call</a>
                </Button>
              </Magnetic>
              <a href="#math" className="lab underline decoration-sky decoration-2 underline-offset-4 hover:text-ink">
                First: break down the math
              </a>
            </div>
          </Ent>
          <Ent delay={3150} className="lab hidden text-right leading-loose md:block">
            {RECEIPTS.map((s) => <span key={s} className="block">{s}</span>)}
          </Ent>
        </div>
      </div>
    </header>
  );
}
