/* eslint-disable @next/next/no-img-element */
/** Pfalz-Multiservice-Logo (weiße Variante für dunklen Hintergrund) */
const RATIO = 900 / 284;

export function Logo({ height = 48, className }: { height?: number; className?: string }) {
  return (
    <img
      src="/logo-white.png"
      alt="Pfalz Multiservice"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
      style={{ height, width: "auto", display: "block" }}
      decoding="async"
    />
  );
}
