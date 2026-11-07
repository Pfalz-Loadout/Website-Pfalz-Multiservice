"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Setzt die Klasse „is-in“, sobald der Block ins Bild kommt (IntersectionObserver).
 * Animationen hängen per CSS an „.io.is-in“. Ohne JavaScript, ohne Observer oder bei
 * reduzierter Bewegung ist alles sofort sichtbar; spätestens nach 6 s wird alles gezeigt.
 */
export function InView({ className = "", style, children, threshold = 0.2, as: Tag = "div", id }: {
  className?: string; style?: CSSProperties; children: ReactNode; threshold?: number; as?: "div" | "section" | "aside"; id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    el.classList.add("io-armed");
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { el.classList.add("is-in"); io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px", threshold });
    io.observe(el);
    const fail = window.setTimeout(() => el.classList.add("is-in"), 6000);
    return () => { io.disconnect(); window.clearTimeout(fail); };
  }, [threshold]);
  return <Tag ref={ref as never} id={id} className={`io ${className}`.trim()} style={style}>{children}</Tag>;
}
