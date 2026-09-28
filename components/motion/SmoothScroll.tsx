"use client";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis, scrollToHash } from "@/lib/lenis";

/** Lenis-Smooth-Scroll, synchron mit GSAP ScrollTrigger */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); setLenis(null); };
  }, []);

  // Nach jedem Seitenwechsel: Höhe neu messen, ggf. zum Anker springen
  useEffect(() => {
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.location.hash) scrollToHash(window.location.hash, true);
    }, 80);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    // Anker-Links auf derselben Seite weich scrollen
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")!;
      if (hash.length > 1 && scrollToHash(hash)) { e.preventDefault(); history.replaceState(null, "", hash); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    // Bilder/Fonts verändern Höhen → einmal nachmessen
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
