"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

export const EASE = "expo.out";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Wird vom Seiten-Vorhang gesetzt: erster Aufruf = längeres Intro, danach kurze Übergänge */
let visited = false;
export function introDelay() {
  return visited ? 0.55 : 1.65;
}
export function markVisited() {
  visited = true;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/**
 * Überschrift zeilenweise maskiert aufteilen. Auf schmalen Bildschirmen wird nicht gesplittet,
 * damit lange deutsche Wörter natürlich getrennt werden (hyphens: auto) – dann animiert die ganze Überschrift.
 */
export function splitHeading(el: Element, onSplit?: (targets: Element[]) => gsap.core.Animation | void) {
  if (window.matchMedia("(max-width: 640px)").matches) {
    const anim = onSplit?.([el]);
    return { targets: [el] as Element[], revert: () => { anim?.kill(); } };
  }
  const split = SplitText.create(el, {
    type: "lines", mask: "lines", linesClass: "pm-line", autoSplit: true,
    onSplit: onSplit ? (self) => onSplit(self.lines) : undefined,
  });
  return { targets: split.lines as Element[], revert: () => split.revert() };
}
