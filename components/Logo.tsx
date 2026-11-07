import Image from "next/image";

/** Pfalz-Multiservice-Logo (weiße Variante für dunklen Hintergrund) */
const RATIO = 900 / 284;

/**
 * Läuft über den Next.js-Bildoptimierer: ausgeliefert wird die zur Anzeigegröße passende
 * Version (statt der großen Originaldatei). `priority` nur für das Logo im sichtbaren Bereich.
 */
export function Logo({ height = 48, className, priority = false }: { height?: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo-white.webp"
      alt="Pfalz Multiservice"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
      style={{ height, width: "auto", display: "block" }}
      priority={priority}
    />
  );
}
