"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { EXAMPLES, type Example } from "@/lib/data";
import { SITE } from "@/lib/site";
import { Icon } from "./Icon";

const HOST = SITE.replace(/^https?:\/\//, "").replace(/^www\./, "");

/** Webdesign-Musterdesigns: Browser- und Smartphone-Mockup, Scroll-Vorschau, 3D-Tilt */
export function ShowcaseList({ offset = 0, total = EXAMPLES.length, grid = false }: { offset?: number; total?: number; grid?: boolean }) {
  return (
    <div className={`showcase${grid ? " showcase--grid" : ""}`}>
      {EXAMPLES.map((e, i) => (
        <ShowcaseItem key={e.slug} ex={e} index={i + offset} total={total} />
      ))}
    </div>
  );
}

function ShowcaseItem({ ex, index, total }: { ex: Example; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const href = `/beispiele/${ex.slug}`;
  const nr = String(index + 1).padStart(2, "0");

  useGSAP(() => {
    const root = ref.current!;
    const stage = root.querySelector<HTMLElement>(".sc-stage")!;
    const browser = root.querySelector<HTMLElement>(".sc-browser")!;
    const view = root.querySelector<HTMLElement>(".sc-browser__view")!;
    const shot = root.querySelector<HTMLImageElement>(".sc-browser__shot")!;
    const phone = root.querySelector<HTMLElement>(".sc-phone")!;
    const copy = root.querySelectorAll(".sc-copy > *");
    const mm = gsap.matchMedia();

    const maxScroll = () => Math.max(0, shot.offsetHeight - view.offsetHeight);

    mm.add(MOTION_OK, () => {
      gsap.set(root.querySelectorAll(".pm-reveal"), { visibility: "visible" });

      // Einflug: Browser kippt aus der Tiefe nach vorn, Smartphone folgt
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
      tl.from(browser, { y: 90, rotationX: 18, rotationY: index % 2 ? 8 : -8, opacity: 0, transformPerspective: 1400, duration: 1.6, ease: "expo.out" }, 0)
        .from(phone, { y: 140, rotation: index % 2 ? -8 : 8, opacity: 0, duration: 1.5, ease: "expo.out" }, 0.25)
        .from(copy, { y: 36, opacity: 0, stagger: 0.08, duration: 1.1 }, 0.2);

      // Smartphone schwebt beim Scrollen gegenläufig
      gsap.fromTo(phone, { yPercent: 10 }, {
        yPercent: -14, ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // Desktop: Maus über dem Browser scrollt durch die ganze Seite, dazu 3D-Tilt
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(stage, { transformPerspective: 1600 });
      const rx = gsap.quickTo(stage, "rotationX", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(stage, "rotationY", { duration: 0.8, ease: "power3.out" });
      let scrollTween: gsap.core.Tween | null = null;

      const move = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        stage.style.setProperty("--mx", `${px * 100}%`);
        stage.style.setProperty("--my", `${py * 100}%`);
        ry((px - 0.5) * 6);
        rx((0.5 - py) * 5);
      };
      const enter = () => {
        const d = maxScroll();
        scrollTween?.kill();
        scrollTween = gsap.to(shot, { y: -d, duration: Math.max(4, d / 420), ease: "power1.inOut" });
      };
      const leave = () => {
        rx(0); ry(0);
        scrollTween?.kill();
        scrollTween = gsap.to(shot, { y: 0, duration: 1.4, ease: "expo.out" });
      };
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerenter", enter);
      stage.addEventListener("pointerleave", leave);
      return () => {
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerenter", enter);
        stage.removeEventListener("pointerleave", leave);
        scrollTween?.kill();
      };
    });

    // Touch: die Seite im Browser scrollt mit, während man an ihr vorbeiscrollt
    mm.add("(hover: none), (pointer: coarse)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(shot, { y: 0 }, {
        y: () => -maxScroll() * 0.45, ease: "none",
        scrollTrigger: { trigger: view, start: "top 85%", end: "bottom 15%", scrub: 0.6, invalidateOnRefresh: true },
      });
    });

    // Nachladen der langen Bilder verschiebt Höhen → Trigger neu berechnen
    const refresh = () => ScrollTrigger.refresh();
    if (!shot.complete) shot.addEventListener("load", refresh, { once: true });

    return () => { mm.revert(); shot.removeEventListener("load", refresh); };
  }, { scope: ref });

  return (
    <article ref={ref} className={`sc-item ${index % 2 ? "sc-item--rev" : ""}`}>
      <a className="sc-stage" href={href} target="_blank" rel="noopener" aria-label={`${ex.name} live ansehen (öffnet in neuem Tab)`} data-cursor>
        <div className="sc-browser pm-reveal">
          <div className="sc-browser__bar" aria-hidden="true">
            <span className="sc-browser__dots"><i /><i /><i /></span>
            <span className="sc-browser__url">{HOST}/beispiele/{ex.slug}</span>
          </div>
          <div className="sc-browser__view">
            <Image className="sc-browser__shot" src={`/images/beispiele/${ex.slug}-scroll.png`} alt={`Vorschau der Website ${ex.name}`}
              width={1000} height={3750} sizes="(max-width: 900px) 100vw, 800px" />
            <span className="sc-browser__hint" aria-hidden="true">Maus drauf – Seite scrollt</span>
          </div>
          <div className="sc-spot" aria-hidden="true" />
        </div>
        <div className="sc-phone pm-reveal" aria-hidden="true">
          <Image src={`/images/beispiele/${ex.slug}-mobile.png`} alt="" width={390} height={844} sizes="(max-width: 900px) 30vw, 220px" />
        </div>
      </a>

      <div className="sc-copy">
        <span className="sc-index pm-reveal">{nr}<span> / {String(total).padStart(2, "0")}</span></span>
        <span className="sc-branch pm-reveal">{ex.branch}</span>
        <h3 className="sc-title pm-reveal">{ex.name}</h3>
        <p className="sc-text pm-reveal">{ex.text}</p>
        <ul className="sc-tags pm-reveal">
          {ex.tags.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <div className="pm-reveal">
          <a className="btn btn--outline" href={href} target="_blank" rel="noopener" data-cursor>
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__label">Live ansehen <Icon name="external-link" size={17} className="btn__icon btn__icon--right" /></span>
          </a>
        </div>
      </div>
    </article>
  );
}
