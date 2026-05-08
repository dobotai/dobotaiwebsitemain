"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Review = {
  text: string;
  name: string;
  title: string;
  initials: string;
  avatarBg?: string;
};

const REVIEWS: Review[] = [
  {
    text: "Doby and his team came into our business and immediately identified and resolved the automation bottlenecks that were slowing down our operations. Worth every penny.",
    name: "Dylan Hendrickson",
    title: "Co-Owner · STAXX",
    initials: "DH",
  },
  {
    text: "Doby is a talented and creative professional with a strong solutions-oriented mindset. He's personable, easy to work with, and brought ideas to the table we hadn't considered.",
    name: "Kurt Hynes",
    title: "Founder · Pharmacy Career Coach",
    initials: "KH",
    avatarBg: "#7C3AED",
  },
  {
    text: "Doby isn't just a builder, he's an automation strategist. We came to him with a vague idea and left with a structured, deeply thought-out system that aligns with our business goals.",
    name: "Ro Bhardwaj",
    title: "Founder · Life's A Pitch",
    initials: "RB",
    avatarBg: "#059669",
  },
  {
    text: "We brought Doby into a messy, high-friction system. He not only untangled the chaos but rebuilt it into a clear, scalable workflow using Make.com and Airtable. Exceptional work.",
    name: "Romano Del Bianco",
    title: "Founder · Dignano Digital",
    initials: "RD",
    avatarBg: "#EA580C",
  },
  {
    text: "You took all my ideas and narrowed it down to what makes the most impact. Every single audit call was just different from anything I had experienced before. Highly recommend.",
    name: "Jeppe Schrøder",
    title: "Co-Founder · Markeity",
    initials: "JS",
    avatarBg: "#0284C7",
  },
];

function visibleCount(width: number) {
  if (width <= 600) return 1;
  if (width <= 900) return 2;
  return 3;
}

export function ReviewsCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapW, setWrapW] = useState(0);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);

  const measure = useCallback(() => {
    const el = wrapRef.current;
    if (el) setWrapW(el.offsetWidth);
    const vc = visibleCount(window.innerWidth);
    setVisible(vc);
    const max = Math.max(0, REVIEWS.length - vc);
    setIndex((i) => Math.min(i, max));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const el = wrapRef.current;
    const ro = new ResizeObserver(measure);
    if (el) ro.observe(el);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  const slideW = wrapW > 0 ? wrapW / visible : 0;
  const maxIndex = Math.max(0, REVIEWS.length - visible);
  const safeIndex = Math.min(index, maxIndex);

  const go = (n: number) => {
    setIndex(Math.max(0, Math.min(n, maxIndex)));
  };

  const start = safeIndex + 1;
  const end = Math.min(safeIndex + visible, REVIEWS.length);

  return (
    <>
      <div className="reviews-wrap" ref={wrapRef}>
        <div
          className="reviews-track"
          style={{
            transform:
              slideW > 0
                ? `translateX(-${safeIndex * slideW}px)`
                : undefined,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {REVIEWS.map((r, i) => (
            <div
              className="review-slide"
              key={i}
              style={{
                width: slideW > 0 ? slideW : undefined,
                flex: slideW > 0 ? "none" : "0 0 100%",
              }}
            >
              <div className="review-card">
                <div className="review-header">
                  <div className="review-stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <span className="star filled" key={s}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="review-text">&ldquo;{r.text}&rdquo;</p>
                <div className="review-person">
                  <div
                    className="review-avatar"
                    style={
                      r.avatarBg ? { background: r.avatarBg } : undefined
                    }
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-title">{r.title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="reviews-nav">
        <button
          type="button"
          className="reviews-nav-btn"
          onClick={() => go(safeIndex - 1)}
          disabled={safeIndex <= 0}
          aria-label="Previous reviews"
        >
          ←
        </button>
        <span className="reviews-count">
          {start}–{end} of {REVIEWS.length}
        </span>
        <button
          type="button"
          className="reviews-nav-btn"
          onClick={() => go(safeIndex + 1)}
          disabled={safeIndex >= maxIndex}
          aria-label="Next reviews"
        >
          →
        </button>
      </div>
    </>
  );
}
