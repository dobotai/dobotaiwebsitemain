/**
 * Trust bar logos: each client file may be optimized for light OR dark UIs.
 *
 * - `neutral` — works on both; light themes get grayscale; v3 gets a slight lift.
 * - `dark-on-light` — artwork is light/white (disappears on white/cream). On v1/v2 we
 *   force a dark rendition; on v3 (navy) we show the file closer to native colors.
 * - `light-on-dark` — artwork is dark (disappears on navy). On v3 we invert to a light mark;
 *   on v1/v2 we keep grayscale on pale backgrounds.
 *
 * Optional `objectPositionLight` / `objectPositionDark` adjust crop per variant
 * (`object-fit: contain`); use e.g. `"center 35%"` or `"20% center"` if the mark sits
 * off-center in the asset.
 */
export type TrustLogoTreatment = "neutral" | "dark-on-light" | "light-on-dark";

export type TrustLogoConfig = {
  src: string;
  alt: string;
  w: number;
  h: number;
  treatment: TrustLogoTreatment;
  objectPositionLight?: string;
  objectPositionDark?: string;
};

export const TRUST_LOGOS: TrustLogoConfig[] = [
  {
    src: "/trust/fluidcreatives.webp",
    alt: "Fluid Creatives",
    w: 220,
    h: 60,
    treatment: "dark-on-light",
  },
  {
    src: "/trust/markeity.png",
    alt: "Markeity",
    w: 180,
    h: 58,
    treatment: "dark-on-light",
  },
  {
    src: "/trust/staxx.png",
    alt: "Staxx",
    w: 140,
    h: 56,
    treatment: "dark-on-light",
  },
  {
    src: "/trust/social-scout.png",
    alt: "Social Scout",
    w: 220,
    h: 42,
    treatment: "dark-on-light",
  },
  {
    src: "/trust/ksmedia.webp",
    alt: "KS Media",
    w: 64,
    h: 64,
    treatment: "light-on-dark",
  },
  {
    src: "/trust/anevo.png",
    alt: "Anevo Marketing",
    w: 180,
    h: 102,
    treatment: "light-on-dark",
  },
  {
    src: "/trust/pcc.png",
    alt: "PCC",
    w: 140,
    h: 38,
    treatment: "light-on-dark",
  },
  {
    src: "/trust/lifesapitch.webp",
    alt: "Life's A Pitch",
    w: 120,
    h: 52,
    treatment: "light-on-dark",
  },
  {
    src: "/trust/dignano.png",
    alt: "Dignano",
    w: 140,
    h: 42,
    treatment: "light-on-dark",
  },
];
