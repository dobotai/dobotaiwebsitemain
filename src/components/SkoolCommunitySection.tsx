import Image from "next/image";
import { SKOOL_URL } from "@/lib/site-links";

const FEATURED = {
  src: "/skool/classroom.png",
  alt: "DobotAI Academy classroom — Start Here, Foundations, and Agentic AI tracks",
};

const THUMBS = [
  {
    src: "/skool/intro.png",
    alt: "Learn to build real AI agents that solve real business problems",
  },
  {
    src: "/skool/lesson.png",
    alt: "Inside an Agentic AI lesson in the DobotAI Academy",
  },
  {
    src: "/skool/join.png",
    alt: "DobotAI Academy on Skool — join the community",
  },
];

export function SkoolCommunitySection() {
  return (
    <section className="skool-block section-alt" id="skool">
      <div className="container skool-block-intro">
        <p className="section-label">Community</p>
        <h2 className="skool-block-title reveal">
          If you&apos;re a B2B business ready to bring back hours of time and
          want to know more
        </h2>
        <p className="skool-block-sub reveal reveal-delay-1">
          Join founders and operators inside our Skool — breakdowns, templates,
          and live Q&amp;A on automation that actually ships.
        </p>
        <a
          href={SKOOL_URL}
          className="btn btn-primary skool-block-cta reveal reveal-delay-2"
          target="_blank"
          rel="noopener noreferrer"
          title="Join the Automation Founders Hub on Skool (opens in new tab)"
        >
          Join our Skool community here <span className="arrow">→</span>
        </a>
      </div>

      <div className="skool-mosaic reveal reveal-delay-2">
        <a
          href={SKOOL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="skool-mosaic-featured"
          aria-label="See the DobotAI Academy classroom (opens in new tab)"
        >
          <Image
            src={FEATURED.src}
            alt={FEATURED.alt}
            fill
            sizes="(max-width: 900px) 100vw, 66vw"
            className="skool-mosaic-img"
          />
        </a>
        <div className="skool-mosaic-thumbs">
          {THUMBS.map((thumb) => (
            <a
              key={thumb.src}
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="skool-mosaic-thumb"
              aria-label={`${thumb.alt} — open Skool (opens in new tab)`}
            >
              <Image
                src={thumb.src}
                alt={thumb.alt}
                fill
                sizes="(max-width: 900px) 50vw, 33vw"
                className="skool-mosaic-img"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
