import Image from "next/image";
import type { HTMLAttributes } from "react";
import { ALT } from "@/lib/alt";

type Props = HTMLAttributes<HTMLDivElement> & {
  src: string;
  /** Wie breit das Bild auf dem Bildschirm maximal dargestellt wird – steuert, welche Größe ausgeliefert wird */
  sizes?: string;
  /** Bild sofort laden (z. B. Hero) */
  eager?: boolean;
  alt?: string;
  [key: `data-${string}`]: string | undefined;
};

/**
 * Flächenfüllendes Bild. Die PNG-Originale bleiben unverändert im Repo; Next.js liefert je nach
 * Bildschirm automatisch verkleinerte AVIF/WebP-Versionen aus.
 */
export function BgImage({ src, sizes = "100vw", eager = false, alt, className = "", ...rest }: Props) {
  // Ohne eigenes alt greift die zentrale Beschreibung aus lib/alt.ts – leer nur, wenn dort nichts steht
  const text = alt ?? ALT[src] ?? "";
  return (
    <div className={`${className} pm-img`} {...rest}>
      <Image src={src} alt={text} fill sizes={sizes} quality={75} className="pm-img__el"
        {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})} />
    </div>
  );
}
