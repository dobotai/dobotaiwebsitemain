"use client";

import { useEffect } from "react";

export function toYouTubeEmbed(url: string): string {
  const u = url.trim();
  const fromEmbed = u.match(/embed\/([a-zA-Z0-9_-]+)/);
  if (fromEmbed) {
    return `https://www.youtube-nocookie.com/embed/${fromEmbed[1]}?autoplay=1&rel=0&modestbranding=1`;
  }
  const fromV =
    u.match(/[?&]v=([a-zA-Z0-9_-]+)/) ?? u.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (fromV) {
    return `https://www.youtube-nocookie.com/embed/${fromV[1]}?autoplay=1&rel=0&modestbranding=1`;
  }
  return `https://www.youtube-nocookie.com/embed/${u}?autoplay=1&rel=0&modestbranding=1`;
}

export function VideoModal({
  open,
  embedSrc,
  onClose,
  title = "Video",
}: {
  open: boolean;
  embedSrc: string | null;
  onClose: () => void;
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !embedSrc) return null;

  return (
    <div
      className="video-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="video-modal-inner">
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close video"
        >
          ×
        </button>
        <div className="video-modal-frame">
          <iframe
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}
