"use client";

import Image from "next/image";
import { useState } from "react";
import { isSkoolHeroPosterEnabled, SKOOL_URL } from "@/lib/site-links";
import { toYouTubeEmbed, VideoModal } from "./VideoModal";

/** Community / brand video aligned with dobotai.com (first embed after CTA). */
const COMMUNITY_VIDEO_WATCH =
  "https://www.youtube.com/watch?v=xSQzwaFKTiM";

export function SkoolCommunitySection() {
  const [modalOpen, setModalOpen] = useState(false);
  const posterEnabled = isSkoolHeroPosterEnabled();

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

      <div
        className={`video-hero video-hero--skool${posterEnabled ? " video-hero--poster" : ""}`}
      >
        {posterEnabled ? (
          <div className="video-hero-poster">
            <Image
              src="/skool/video-hero-poster.png"
              alt="Skool community preview — Automation Founders Hub"
              fill
              className="video-hero-poster-img"
              sizes="100vw"
              loading="lazy"
            />
          </div>
        ) : null}
        <div className="video-hero-bg" aria-hidden="true" />
        <div className="video-hero-grid" aria-hidden="true" />
        <div className="video-hero-content">
          <p className="video-hero-label">Inside the community</p>
          <h2 className="video-hero-title">
            See what members get — systems, support, and real builds
          </h2>
          <p className="video-hero-sub">
            A short walkthrough of how we teach and implement automation for B2B
            teams.
          </p>
          <button
            type="button"
            className="video-play-btn"
            onClick={() => setModalOpen(true)}
            aria-label="Play community video"
          >
            ▶
          </button>
          <span className="video-play-label">Play video</span>
        </div>
      </div>

      <VideoModal
        open={modalOpen}
        embedSrc={
          modalOpen ? toYouTubeEmbed(COMMUNITY_VIDEO_WATCH) : null
        }
        onClose={() => setModalOpen(false)}
        title="Skool community video"
      />
    </section>
  );
}
