/** Canonical external destinations (aligned with dobotai.com / Framer snapshot). */

export const SITE_DEFAULT_TITLE =
  "DobotAI — AI Automation for Agencies & Service Businesses";

export const SITE_DEFAULT_DESCRIPTION =
  "DobotAI builds custom AI automations that cut 60–80% of manual work for agencies, home service businesses, and finance firms. Guaranteed ROI in 90 days.";

export const CALENDLY_AUDIT_URL =
  "https://calendly.com/dobotai/automation-audit-wb";

export const SKOOL_URL =
  "https://www.skool.com/automation-founders-hub-9222";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/doby-lanete/",
  youtube: "https://www.youtube.com/@DobyLanete",
  x: "https://x.com/_dobylanete",
} as const;

const DEFAULT_SITE_URL = "https://dobotai.com";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function isSkoolHeroPosterEnabled(): boolean {
  const v = (process.env.NEXT_PUBLIC_SKOOL_HERO_POSTER ?? "").toLowerCase();
  return v === "true" || v === "1";
}
