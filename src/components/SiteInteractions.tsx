"use client";

import { useEffect } from "react";

/**
 * Mirrors the inline script from the static HTML:
 * - `.reveal` elements start hidden in CSS until `.visible` is added
 * - IntersectionObserver reveals on scroll; hero gets a staggered reveal
 * - FAQ accordion, sticky nav shadow, smooth in-page anchor links
 */
export function SiteInteractions() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    document.querySelectorAll(".hero .reveal").forEach((el, i) => {
      window.setTimeout(() => el.classList.add("visible"), i * 120);
    });

    function toggleFaq(el: HTMLElement) {
      const item = el.parentElement;
      if (!item || !item.classList.contains("faq-item")) return;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((node) => {
        node.classList.remove("open");
      });
      if (!isOpen) item.classList.add("open");
    }

    const faqQs = Array.from(document.querySelectorAll<HTMLElement>(".faq-q"));
    const onFaqClick = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      toggleFaq(el);
    };
    faqQs.forEach((q) => q.addEventListener("click", onFaqClick));

    const nav = document.getElementById("mainnav");
    function onScroll() {
      if (!nav) return;
      nav.style.boxShadow =
        window.scrollY > 10 ? "0 2px 24px rgba(0,0,0,0.08)" : "none";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function onAnchorClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest?.(
        "a[href^='#']",
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.querySelectorAll(".reveal").forEach((el) => observer.unobserve(el));
      observer.disconnect();
      faqQs.forEach((q) => q.removeEventListener("click", onFaqClick));
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return null;
}
