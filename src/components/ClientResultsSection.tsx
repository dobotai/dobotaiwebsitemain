"use client";

import Image from "next/image";
import { useState } from "react";
import results from "../../content/results.json";
import { toYouTubeEmbed, VideoModal } from "./VideoModal";

type ResultCard = {
  client: string;
  company: string;
  tag: string;
  quote: string;
  thumbGradient?: string;
  thumbImage?: string;
  videoUrl?: string;
};

const typedResults = results as ResultCard[];

export function ClientResultsSection() {
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  function openVideo(url: string, label: string) {
    setModalSrc(toYouTubeEmbed(url));
    setModalTitle(label);
  }

  function closeVideo() {
    setModalSrc(null);
    setModalTitle("");
  }

  return (
    <>
      <div className="videos-grid reveal reveal-delay-2">
        {typedResults.map((v) => {
          const thumbStyle = v.thumbImage
            ? undefined
            : v.thumbGradient
              ? { background: v.thumbGradient }
              : undefined;

          const innerThumb = v.thumbImage ? (
            <Image
              src={v.thumbImage}
              alt={`Video thumbnail — ${v.client}, ${v.company}`}
              fill
              className="video-thumb-img"
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
          ) : null;

          if (v.videoUrl) {
            return (
              <button
                type="button"
                className="video-card"
                key={`${v.client}-${v.company}`}
                onClick={() =>
                  openVideo(
                    v.videoUrl!,
                    `${v.client} — ${v.company}`,
                  )
                }
                aria-label={`Play video: ${v.client} from ${v.company}`}
              >
                <div className="video-thumb" style={thumbStyle}>
                  {innerThumb}
                  <div className="video-play">▶</div>
                </div>
                <div className="video-info">
                  <div className="video-client">{v.client}</div>
                  <div className="video-company">{v.company}</div>
                  <span className="video-tag">{v.tag}</span>
                  <div className="video-quote">&ldquo;{v.quote}&rdquo;</div>
                </div>
              </button>
            );
          }

          return (
            <div className="video-card" key={`${v.client}-${v.company}`}>
              <div className="video-thumb" style={thumbStyle}>
                {innerThumb}
                <div className="video-play">▶</div>
              </div>
              <div className="video-info">
                <div className="video-client">{v.client}</div>
                <div className="video-company">{v.company}</div>
                <span className="video-tag">{v.tag}</span>
                <div className="video-quote">&ldquo;{v.quote}&rdquo;</div>
              </div>
            </div>
          );
        })}
      </div>
      <VideoModal
        open={modalSrc !== null}
        embedSrc={modalSrc}
        onClose={closeVideo}
        title={modalTitle}
      />
    </>
  );
}
