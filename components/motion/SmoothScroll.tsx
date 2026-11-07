"use client";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis, scrollToHash } from "@/lib/lenis";

/** Lenis-Smooth-Scroll, synchron mit GSAP ScrollTrigger */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    // Lenis (Smooth-Scroll) wird erst kurz nach dem Start nachgeladen: kleineres Start-Bundle, weniger Blockierzeit
    const start = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
        setLenis(lenis);
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanup = () => { gsap.ticker.remove(tick); lenis.destroy(); setLenis(null); };
      });
    };
    const id = window.setTimeout(start, 400);
    return () => { cancelled = true; window.clearTimeout(id); cleanup?.(); };
  }, []);

  // Zurück/Vor im Browser merken: dort soll die alte Scroll-Position erhalten bleiben
  const popNav = useRef(false);
  const firstPath = useRef(true);
  useEffect(() => {
    const onPop = () => { popNav.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Neue Seite beginnt immer ganz oben. Wichtig, falls beim Klick noch das weiche
  // Nachrollen von Lenis läuft – sonst rollt Lenis auf der neuen Seite einfach weiter.
  useLayoutEffect(() => {
    if (firstPath.current) { firstPath.current = false; return; }
    if (popNav.current) { popNav.current = false; return; }
    if (window.location.hash) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  // Nach jedem Seitenwechsel: Höhe neu messen, ggf. zum Anker springen
  // (beim allerersten Aufruf übernimmt das die gebündelte Messung nach dem Laden)
  const firstMeasure = useRef(true);
  useEffect(() => {
    const skip = firstMeasure.current;
    firstMeasure.current = false;
    const t = window.setTimeout(() => {
      if (!skip || window.location.hash) ScrollTrigger.refresh();
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
    let t: number | undefined;
    const onLoad = () => { window.clearTimeout(t); t = window.setTimeout(() => ScrollTrigger.refresh(), 150); };
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(onLoad);
    return () => { window.clearTimeout(t); window.removeEventListener("load", onLoad); };
  }, []);

  return null;
}
