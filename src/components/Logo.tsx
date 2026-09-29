import glyph from "@/assets/brand-glyph-hd.png";
import wordmark from "@/assets/brand-wordmark-hd.png";

/* The official DobotAI lockup, exactly as designed: both parts come straight
   from the source file (keyed off its black background), then upscaled with
   edge re-sharpening so they hold at retina densities. The wordmark renders
   ink on light surfaces via brightness(0) and stays white on dark. */
export default function Logo({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={glyph} alt="" className="h-[1.45em] w-auto shrink-0" />
      <img
        src={wordmark}
        alt="DobotAI"
        className={`h-[0.74em] w-auto ${onDark ? "" : "[filter:brightness(0)]"}`}
      />
    </span>
  );
}
