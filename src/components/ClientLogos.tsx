import { LogoLoop } from "@/components/LogoLoop";
import allFloors from "@/assets/clients/t-all-floors.png";
import fifteenWords from "@/assets/clients/t-fifteen-words.png";
import anevo from "@/assets/clients/t-anevo-marketing.png";
import breakingB2b from "@/assets/clients/t-breaking-b2b.png";
import fluid from "@/assets/clients/t-fluid-creatives.png";
import ksMedia from "@/assets/clients/t-ks-media.png";
import lifesAPitch from "@/assets/clients/t-lifes-a-pitch.png";
import markeity from "@/assets/clients/t-markeity.png";
import pharmacy from "@/assets/clients/t-pharmacy-career-coach.png";
import socialScout from "@/assets/clients/t-social-scout.png";
import staxx from "@/assets/clients/t-staxx.png";
import vfactor from "@/assets/clients/t-vfactor-health.png";


/* Real client logos. Two render treatments so a mixed set reads as one wall
   of ink on paper: transparent logos get brightness(0) (any art becomes an
   ink silhouette); the one opaque white-background logo gets grayscale +
   multiply so the white blends into the ground. */
const SILHOUETTE = "[filter:brightness(0)] opacity-70";
const MULTIPLY = "mix-blend-multiply [filter:grayscale(1)] opacity-80";

const CLIENTS: { src: string; alt: string; cls: string }[] = [
  { src: allFloors, alt: "All Floors", cls: `h-12 ${MULTIPLY}` },
  { src: fifteenWords, alt: "15 Words", cls: `h-5 ${MULTIPLY}` },
  { src: anevo, alt: "Anevo Marketing", cls: "h-5 [filter:brightness(0)] opacity-100" },
  { src: breakingB2b, alt: "Breaking B2B", cls: `h-8 ${SILHOUETTE}` },
  { src: fluid, alt: "Fluid Creatives", cls: `h-8 ${SILHOUETTE}` },
  { src: ksMedia, alt: "KS Media", cls: `h-10 ${SILHOUETTE}` },
  { src: lifesAPitch, alt: "Life's A Pitch", cls: `h-9 ${SILHOUETTE}` },
  { src: markeity, alt: "Markeity", cls: `h-8 ${SILHOUETTE}` },
  { src: pharmacy, alt: "Pharmacy Career Coach", cls: `h-8 ${SILHOUETTE}` },
  { src: socialScout, alt: "Social Scout", cls: "h-7 [filter:invert(1)_grayscale(1)] opacity-80" },
  { src: staxx, alt: "STAXX", cls: `h-8 ${SILHOUETTE}` },
  { src: vfactor, alt: "VFactor Health", cls: `h-7 ${SILHOUETTE}` },
];

export default function ClientLogos() {
  return (
    <div className="overflow-hidden">
      <LogoLoop
        logos={CLIENTS.map((c) => ({
          node: (
            <img
              src={c.src}
              alt={c.alt}
              className={`w-auto max-w-52 object-contain ${c.cls}`}
              loading="lazy"
            />
          ),
          ariaLabel: c.alt,
        }))}
        speed={36}
        gap={56}
        logoHeight={32}
        pauseOnHover
        fadeOut
        fadeOutColor="#f3f2ed"
        ariaLabel="Businesses we've worked with"
      />
    </div>
  );
}
