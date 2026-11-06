"use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Blendet die Leistungs-Kacheln beim Hineinscrollen ein (IntersectionObserver + CSS).
 * Ohne JavaScript, ohne Observer oder bei reduzierter Bewegung sind die Kacheln sofort sichtbar.
 */
export function TileReveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>(".core-tile"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tiles.forEach((t) => t.classList.add("is-in"));
      return;
    }
    root.classList.add("is-armed");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    tiles.forEach((t) => io.observe(t));
    // Sicherheitsnetz: spätestens nach 6 s alles zeigen
    const fail = window.setTimeout(() => tiles.forEach((t) => t.classList.add("is-in")), 6000);
    return () => { io.disconnect(); window.clearTimeout(fail); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
