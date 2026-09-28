"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Dezenter Gold-Cursor (nur Desktop mit Maus, nicht bei reduzierter Bewegung) */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const d = dot.current!, r = ring.current!;
      const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
      const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
      const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
      const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });
      let shown = false;
      const move = (e: PointerEvent) => {
        if (!shown) { gsap.to([d, r], { opacity: 1, duration: 0.4 }); shown = true; }
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
        const t = e.target as Element | null;
        const hot = !!t?.closest?.("a, button, [data-cursor], input, select, textarea, label");
        r.classList.toggle("cursor-ring--active", hot);
      };
      const leave = () => { gsap.to([d, r], { opacity: 0, duration: 0.3 }); shown = false; };
      const down = () => gsap.to(r, { scale: 0.8, duration: 0.2 });
      const up = () => gsap.to(r, { scale: 1, duration: 0.4, ease: "expo.out" });
      window.addEventListener("pointermove", move);
      document.documentElement.addEventListener("pointerleave", leave);
      window.addEventListener("pointerdown", down);
      window.addEventListener("pointerup", up);
      return () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
        window.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
      };
    });
    return () => mm.revert();
  });

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
