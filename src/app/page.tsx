import type { CSSProperties } from "react";
import Image from "next/image";
import { ClientResultsSection } from "@/components/ClientResultsSection";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { SkoolCommunitySection } from "@/components/SkoolCommunitySection";
import {
  CALENDLY_AUDIT_URL,
  SKOOL_URL,
  SOCIAL_LINKS,
} from "@/lib/site-links";
import { TRUST_LOGOS } from "../../content/trust-logos";

/** Two stacked crops: mark (left) stays full color on light themes; type (right) can go monochrome. */
function BrandLogoImages({
  sizes,
  priority,
}: {
  sizes: string;
  priority?: boolean;
}) {
  return (
    <>
      <span className="logo-layer logo-layer--mark" aria-hidden="true">
        <Image
          src="/brand/logo.avif"
          alt=""
          fill
          sizes={sizes}
          className="logo-img"
          priority={priority}
        />
      </span>
      <span className="logo-layer logo-layer--type" aria-hidden="true">
        <Image
          src="/brand/logo.avif"
          alt=""
          fill
          sizes={sizes}
          className="logo-img"
          priority={priority}
        />
      </span>
    </>
  );
}

export default function Home() {

  return (
    <>
      <nav className="nav" id="mainnav">
        <div className="nav-inner">
          <a href="#top" className="logo" aria-label="DobotAI — Home">
            <span className="logo-crop">
              <BrandLogoImages
                sizes="(max-width: 640px) 52vw, 243px"
                priority
              />
            </span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#industries">Industries</a>
            </li>
            <li>
              <a href="#results">Results</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
          <div className="nav-cta">
            <a href="#contact" className="btn btn-primary">
              Book a Call <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-eyebrow reveal">
                <span className="tag">For Agencies &amp; Service Businesses</span>
                <span className="tag">90-Day Guarantee</span>
              </div>
              <h1 className="hero-h1 reveal reveal-delay-1">
                Stop Running Your
                <br />
                Business. Let <span className="blue">Automation</span>
                <br />
                Run It For You.
              </h1>
              <p className="hero-sub reveal reveal-delay-2">
                DobotAI builds custom AI systems that cut 60–80% of manual work
                for marketing agencies, home service businesses, and finance
                firms — giving you back the time to actually grow.
              </p>
              <div className="hero-ctas reveal reveal-delay-3">
                <a href="#contact" className="btn btn-primary">
                  Book a Free Audit Call <span className="arrow">→</span>
                </a>
                <a href="#results" className="btn btn-ghost">
                  See Client Results
                </a>
              </div>
              <div className="hero-proof reveal reveal-delay-4">
                <div className="hero-proof-avatars">
                  <span>ES</span>
                  <span>DH</span>
                  <span>MZ</span>
                  <span>DJ</span>
                </div>
                <p className="hero-proof-text">
                  <strong>50+ businesses</strong> automated. Avg. $30K+ saved in
                  90 days.
                </p>
              </div>
            </div>

            <div className="hero-visual reveal reveal-delay-2">
              <div className="wf-canvas">
                <div className="wf-head">
                  <div className="wf-live-label">
                    <span className="wf-live-dot" />
                    Live Automation System
                  </div>
                  <div className="wf-active-badge">Active</div>
                </div>

                <div className="wf-step-card is-active">
                  <div className="wf-icon-box">📋</div>
                  <div className="wf-step-text">
                    <div className="wf-step-title">Lead Capture</div>
                    <div className="wf-step-sub">New inquiry received</div>
                  </div>
                  <span className="wf-status wf-s-trigger">Triggered</span>
                </div>

                <div className="wf-vconn">
                  <div className="wf-dash" />
                  <div className="wf-dash" />
                  <div className="wf-dash" />
                  <div className="wf-conn-dot" />
                </div>

                <div className="wf-step-card">
                  <div className="wf-icon-box">🤖</div>
                  <div className="wf-step-text">
                    <div className="wf-step-title">AI Qualification</div>
                    <div className="wf-step-sub">Tagged, scored, enriched</div>
                  </div>
                  <span className="wf-status wf-s-proc">→ Processing</span>
                </div>

                <svg
                  className="wf-fork-svg"
                  viewBox="0 0 340 32"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden
                >
                  <line
                    className="wf-fork-line"
                    x1="170"
                    y1="0"
                    x2="170"
                    y2="14"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <line
                    className="wf-fork-line"
                    x1="82"
                    y1="14"
                    x2="258"
                    y2="14"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <circle className="wf-fork-dot" cx="170" cy="14" r="4" />
                  <line
                    className="wf-fork-line"
                    x1="82"
                    y1="14"
                    x2="82"
                    y2="32"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <line
                    className="wf-fork-line"
                    x1="258"
                    y1="14"
                    x2="258"
                    y2="32"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                </svg>

                <div className="wf-branch-row">
                  <div className="wf-branch-card">
                    <div className="wf-icon-box">✉️</div>
                    <div>
                      <div className="wf-branch-title">Email Nurture</div>
                      <div className="wf-branch-sub">
                        Personalized follow-up sent
                      </div>
                    </div>
                  </div>
                  <div className="wf-branch-card">
                    <div className="wf-icon-box">🔔</div>
                    <div>
                      <div className="wf-branch-title">Team Alert</div>
                      <div className="wf-branch-sub">
                        Sales instantly notified
                      </div>
                    </div>
                  </div>
                </div>

                <svg
                  className="wf-fork-svg"
                  viewBox="0 0 340 32"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden
                >
                  <line
                    className="wf-fork-line"
                    x1="82"
                    y1="0"
                    x2="82"
                    y2="18"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <line
                    className="wf-fork-line"
                    x1="258"
                    y1="0"
                    x2="258"
                    y2="18"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <line
                    className="wf-fork-line"
                    x1="82"
                    y1="18"
                    x2="258"
                    y2="18"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <circle className="wf-fork-dot" cx="170" cy="18" r="4" />
                  <line
                    className="wf-fork-line"
                    x1="170"
                    y1="18"
                    x2="170"
                    y2="32"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                </svg>

                <div className="wf-step-card">
                  <div className="wf-icon-box">🚀</div>
                  <div className="wf-step-text">
                    <div className="wf-step-title">Client Onboarding</div>
                    <div className="wf-step-sub">
                      Resources created automatically
                    </div>
                  </div>
                  <span className="wf-status wf-s-done">Complete</span>
                </div>

                <div className="wf-stats-bar">
                  <div className="wf-stat-box">
                    <div className="wf-stat-n hi">12h</div>
                    <div className="wf-stat-l">Saved weekly</div>
                  </div>
                  <div className="wf-stat-box">
                    <div className="wf-stat-n">0</div>
                    <div className="wf-stat-l">Manual steps</div>
                  </div>
                  <div className="wf-stat-box">
                    <div className="wf-stat-n">24/7</div>
                    <div className="wf-stat-l">Always running</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="container">
          <div className="trust-inner">
            <p className="trust-label">
              Trusted by 7-figure agency founders &amp; business owners
            </p>
            <div className="trust-logos">
              {TRUST_LOGOS.map((logo) => (
                <div
                  className="trust-logo-cell"
                  key={logo.src}
                  data-trust-tone={logo.treatment}
                  style={
                    {
                      "--trust-op-light": logo.objectPositionLight ?? "center",
                      "--trust-op-dark": logo.objectPositionDark ?? "center",
                    } as CSSProperties
                  }
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.w}
                    height={logo.h}
                    className="trust-logo-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="section" id="industries">
        <div className="container">
          <p className="section-label">Who We Work With</p>
          <h2 style={{ fontSize: 42, maxWidth: 520 }} className="reveal">
            Built for businesses where time literally equals money
          </h2>
          <div className="industries">
            <div className="ind-card reveal reveal-delay-1">
              <div className="ind-icon">📢</div>
              <h3>Marketing Agencies</h3>
              <p>
                Automate client onboarding, CRM management, lead nurture
                sequences, and sales call transcriptions — so your team delivers
                faster without growing headcount.
              </p>
              <div className="ind-results">
                <span className="ind-result-item">Onboarding in minutes</span>
                <span className="ind-result-item">Zero manual CRM entry</span>
                <span className="ind-result-item">Faster client delivery</span>
              </div>
            </div>
            <div className="ind-card reveal reveal-delay-2">
              <div className="ind-icon">🏠</div>
              <h3>Home Service Businesses</h3>
              <p>
                From lead capture to follow-up to scheduling — stop losing jobs
                to missed calls and slow responses. Your automated ops system
                works while your crews are in the field.
              </p>
              <div className="ind-results">
                <span className="ind-result-item">Instant lead response</span>
                <span className="ind-result-item">Automated follow-ups</span>
                <span className="ind-result-item">Job tracking &amp; reports</span>
              </div>
            </div>
            <div className="ind-card reveal reveal-delay-3">
              <div className="ind-icon">💼</div>
              <h3>Finance &amp; Professional Services</h3>
              <p>
                Streamline client intake, compliance documentation, appointment
                nurture, and reporting. Show measurable ROI to clients while
                running a leaner back office.
              </p>
              <div className="ind-results">
                <span className="ind-result-item">Client intake automated</span>
                <span className="ind-result-item">No-show reduction</span>
                <span className="ind-result-item">Reporting automated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="services">
        <div className="container">
          <p className="section-label">What We Build</p>
          <h2 style={{ fontSize: 42, maxWidth: 520 }} className="reveal">
            Five core systems. Infinite hours recovered.
          </h2>
          <div className="services-grid reveal">
            <div className="service-card">
              <div className="service-num">01</div>
              <h3>CRM Infrastructure</h3>
              <p>
                A solid CRM is the backbone of every scalable business. We build
                it right — so every lead is automatically structured, tagged,
                and scored without anyone lifting a finger.
              </p>
              <div className="service-impacts">
                <span className="impact-pill">Auto lead scoring</span>
                <span className="impact-pill">Consistent naming conventions</span>
                <span className="impact-pill">Pipeline automation</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-num">02</div>
              <h3>Lead Capture</h3>
              <p>
                Every inquiry from every channel flows automatically into your
                CRM. No more manual copy-paste, no more lost leads from slow
                response times.
              </p>
              <div className="service-impacts">
                <span className="impact-pill">Omni-channel capture</span>
                <span className="impact-pill">Instant qualification</span>
                <span className="impact-pill">Zero data entry errors</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-num">03</div>
              <h3>Lead Nurture</h3>
              <p>
                Prospects who don&apos;t book immediately get systematically
                engaged with personalized touchpoints — dramatically reducing
                no-shows and building trust before the call.
              </p>
              <div className="service-impacts">
                <span className="impact-pill">Reduced no-shows</span>
                <span className="impact-pill">Personalized sequences</span>
                <span className="impact-pill">Better-qualified leads</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-num">04</div>
              <h3>Transcript Analysis</h3>
              <p>
                Every sales call is automatically recorded, transcribed, and
                analyzed. Get strategic insights, action items, and performance
                data without reviewing a single recording yourself.
              </p>
              <div className="service-impacts">
                <span className="impact-pill">Auto transcription</span>
                <span className="impact-pill">AI insights extraction</span>
                <span className="impact-pill">Sales performance data</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-num">05</div>
              <h3>Client Onboarding</h3>
              <p>
                From signed contract to full access — automated. Resources
                created, comms sent, permissions set. Your clients hit the
                ground running the moment ink dries.
              </p>
              <div className="service-impacts">
                <span className="impact-pill">Instant resource creation</span>
                <span className="impact-pill">Consistent experience</span>
                <span className="impact-pill">Zero missed steps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <p className="section-label">The Process</p>
          <h2
            style={{
              fontSize: 42,
              textAlign: "center",
              maxWidth: 560,
              margin: "0 auto",
            }}
            className="reveal"
          >
            Up and running in 30 days. Optimizing forever.
          </h2>
          <div className="steps">
            <div className="step reveal reveal-delay-1">
              <div className="step-num">1</div>
              <div className="step-body">
                <h3>Free Audit Call</h3>
                <p>
                  We map your business, find the biggest bottlenecks eating your
                  time, and build a custom automation roadmap.
                </p>
              </div>
              <span className="step-time">Day 1</span>
            </div>
            <div className="step reveal reveal-delay-2">
              <div className="step-num">2</div>
              <div className="step-body">
                <h3>Onboarding &amp; Setup</h3>
                <p>
                  Your dedicated automation engineer learns your systems, tools,
                  and workflows. We&apos;re in your Slack within 48 hours.
                </p>
              </div>
              <span className="step-time">Week 1</span>
            </div>
            <div className="step reveal reveal-delay-3">
              <div className="step-num">3</div>
              <div className="step-body">
                <h3>Weekly Builds</h3>
                <p>
                  Each week we ship new automations based on your priorities.
                  Weekly strategy calls keep everything aligned.
                </p>
              </div>
              <span className="step-time">Ongoing</span>
            </div>
            <div className="step reveal reveal-delay-4">
              <div className="step-num">4</div>
              <div className="step-body">
                <h3>24/7 Maintenance</h3>
                <p>
                  We monitor, fix, and optimize every system we build. Under
                  24-hour response to any issue, guaranteed.
                </p>
              </div>
              <span className="step-time">Always On</span>
            </div>
          </div>
        </div>
      </section>

      <div className="guarantee">
        <div className="container">
          <div className="guarantee-inner">
            <p
              className="section-label"
              style={{
                color: "rgba(255,255,255,0.7)",
                justifyContent: "center",
              }}
            >
              Our Promise
            </p>
            <h2>
              $30,000 in recovered time
              <br />
              within 90 days — guaranteed.
            </h2>
            <p>
              If we don&apos;t deliver measurable ROI in your first 90 days, we
              keep working until we do. No extra charge. No excuses.
            </p>
            <a href="#contact" className="btn-dark">
              Claim Your Free Audit Call <span>→</span>
            </a>
            <p className="guarantee-sub">
              Month-to-month. No long-term contracts. You own everything we
              build.
            </p>
          </div>
        </div>
      </div>

      <SkoolCommunitySection />

      <section className="section" id="results">
        <div className="container">
          <p className="section-label">Client Results</p>
          <h2 style={{ fontSize: 42, maxWidth: 520 }} className="reveal">
            Real founders. Real results. All on camera.
          </h2>
          <p
            style={{
              marginTop: 12,
              fontSize: 16,
              color: "var(--text-b)",
              maxWidth: 560,
            }}
            className="reveal reveal-delay-1"
          >
            10 agency owners and business founders share exactly what changed
            after working with DobotAI.
          </p>
          <ClientResultsSection />
        </div>
      </section>

      <section className="section section-alt" id="reviews">
        <div className="container">
          <p className="section-label">Reviews</p>
          <h2 style={{ fontSize: 42, maxWidth: 640 }} className="reveal">
            What clients say
          </h2>
          <p
            style={{
              marginTop: 12,
              fontSize: 16,
              color: "var(--text-b)",
              maxWidth: 560,
            }}
            className="reveal reveal-delay-1"
          >
            Verified reviews from founders who&apos;ve worked with DobotAI.
          </p>
          <div className="reveal reveal-delay-2">
            <ReviewsCarousel />
          </div>
        </div>
      </section>

      <section className="section section-alt" id="faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 style={{ fontSize: 42, textAlign: "center" }} className="reveal">
            Common questions
          </h2>
          <div className="faq-list reveal">
            {/* Interactions added later; markup matches the HTML. */}
            <div className="faq-item open">
              <div className="faq-q">
                How is this different from hiring a full-time ops person?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a">
                An ops hire costs $60–80K+ per year, takes months to ramp, and
                can only work on one thing at a time. DobotAI brings a full team
                — strategy, AI automation, and implementation — from day one.
                You get an entire ops department at a fraction of the cost, and
                the systems work 24/7 without calling in sick.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                What industries do you specialize in?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a">
                We work with marketing agencies (ads, email, SEO, PPC, social,
                video), home service businesses (HVAC, roofing, plumbing,
                landscaping, cleaning), and finance &amp; professional service
                firms. If your business has repetitive client management or
                fulfillment processes, there&apos;s almost always a major
                automation opportunity.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                What does the monthly fee include?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a">
                Everything needed to keep your operations running and improving:
                ongoing automation management, new workflow builds each week,
                system optimization, priority Slack support (under 24-hr
                response), weekly strategy calls, and a monthly systems report.
                Think of it as having an AI ops team on retainer — not just a
                tool subscription.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                Is there a long-term contract?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a">
                No. Month-to-month only. We earn your business every single
                month by delivering results — not by locking you into a
                contract. And you own everything we build. If you ever leave,
                the automations stay with you.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                What if I already have some automations running?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a">
                We&apos;ll work with what you have. During the audit call, we
                map your existing systems, identify gaps, and build on top of
                what&apos;s already working. We&apos;re not here to rip and
                replace — we optimize what exists and fill the holes.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                What tools do you work with?
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a">
                We primarily build on Make.com, Airtable, and Slack — but we
                integrate with virtually any CRM, calendar tool, payment
                processor, or project management platform your business already
                uses. We work with your stack, not against it.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-inner reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>
              Ready to get your time back?
            </p>
            <h2>Book your free automation audit call</h2>
            <p>
              In 45 minutes, we&apos;ll map your biggest bottlenecks and hand
              you a custom roadmap — whether you hire us or not.
            </p>
            <div className="cta-btns">
              <a
                href={CALENDLY_AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: 16, padding: "18px 40px" }}
                title="Book a 45-minute automation audit (opens in new tab)"
              >
                Book a Call <span className="arrow">→</span>
              </a>
            </div>
            <p className="cta-disclaimer">
              No commitment. No sales pressure. Just a clear roadmap for your
              business.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <a href="#top" className="logo logo--footer" aria-label="DobotAI — Home">
                <span className="logo-crop">
                  <BrandLogoImages sizes="(max-width: 640px) 44vw, 220px" />
                </span>
              </a>
              <p>
                Your embedded automation team. We build the systems that let
                you run your business instead of your business running you.
              </p>
              <div className="socials">
                <a
                  className="social-btn"
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Doby Lanete on LinkedIn (opens in new tab)"
                  aria-label="DobotAI on LinkedIn (opens in new tab)"
                >
                  in
                </a>
                <a
                  className="social-btn"
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="DobotAI on YouTube (opens in new tab)"
                  aria-label="DobotAI on YouTube (opens in new tab)"
                >
                  ▶
                </a>
                <a
                  className="social-btn"
                  href={SOCIAL_LINKS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="DobotAI on X (opens in new tab)"
                  aria-label="DobotAI on X (opens in new tab)"
                >
                  𝕏
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="#services">CRM Infrastructure</a>
                </li>
                <li>
                  <a href="#services">Lead Capture</a>
                </li>
                <li>
                  <a href="#services">Lead Nurture</a>
                </li>
                <li>
                  <a href="#services">Transcript Analysis</a>
                </li>
                <li>
                  <a href="#services">Client Onboarding</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Industries</h4>
              <ul>
                <li>
                  <a href="#industries">Marketing Agencies</a>
                </li>
                <li>
                  <a href="#industries">Home Services</a>
                </li>
                <li>
                  <a href="#industries">Finance &amp; Professional</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#results">Case Studies</a>
                </li>
                <li>
                  <a
                    href={SKOOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Automation Founders Hub on Skool (opens in new tab)"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a href="#contact">Book a Call</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 DobotAI. All rights reserved.</span>
            <div className="footer-legal">
              <a href="#top">Privacy Policy</a>
              <a href="#top">Terms of Service</a>
              <a href="#top">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
