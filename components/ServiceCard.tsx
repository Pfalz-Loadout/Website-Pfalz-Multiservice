"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { bg } from "@/lib/bg";
import { Icon } from "./Icon";

type Props = {
  href: string;
  image: string;
  title: string;
  text?: string;
  linkLabel?: string;
  variant?: "stacked" | "overlay";
};

/** Service-Karte mit 3D-Tilt und goldenem Spotlight, das dem Cursor folgt */
export function ServiceCard({ href, image, title, text, linkLabel = "Mehr erfahren", variant = "stacked" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { transformPerspective: 900 });
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
      const lift = gsap.quickTo(el, "yPercent", { duration: 0.6, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        ry((px - 0.5) * 7);
        rx((0.5 - py) * 6);
      };
      const enter = () => lift(-1);
      const leave = () => { rx(0); ry(0); lift(0); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  }, { scope: ref });

  if (variant === "overlay") {
    return (
      <Link ref={ref} href={href} className="card card--overlay pm-card" data-cursor>
        <div className="card__parallax"><div className="card__img pm-img" style={bg(image)} /></div>
        <div className="card__shade" />
        <div className="card__spot" />
        <div className="card__body">
          <h3 className="card__title">{title}</h3>
          {text && <p className="card__text">{text}</p>}
          <span className="card__link">{linkLabel} <Icon name="arrow-right" size={16} /></span>
        </div>
      </Link>
    );
  }

  return (
    <Link ref={ref} href={href} className="card pm-card" data-cursor>
      <div className="card__media">
        <div className="card__parallax"><div className="card__img pm-img" style={bg(image)} /></div>
      </div>
      <div className="card__spot" />
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        {text && <p className="card__text">{text}</p>}
        <span className="card__link">{linkLabel} <Icon name="arrow-right" size={16} /></span>
      </div>
    </Link>
  );
}
