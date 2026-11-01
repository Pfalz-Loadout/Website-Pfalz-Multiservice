"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const SATZ = "Wir sind ein Familienbetrieb aus Worms und …";

/** Kleine Vorschau auf das Briefing: der Satz tippt sich, danach füllen sich die Antworten */
export function BriefingPreview() {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const root = ref.current!;
    const feld = root.querySelector<HTMLElement>(".bft__typed")!;
    const chips = root.querySelectorAll<HTMLElement>(".bft__chips span");
    const bar = root.querySelector<HTMLElement>(".bft__bar i")!;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const zeichen = { n: 0 };
      const tl = gsap.timeline({
        repeat: -1, repeatDelay: 3.5,
        scrollTrigger: { trigger: root, start: "top 85%" },
      });

      tl.set(feld, { textContent: "" })
        .set(chips, { opacity: 0.35 })
        .set(bar, { scaleX: 0.1, transformOrigin: "left center" })
        .to(zeichen, {
          n: SATZ.length, duration: 2.6, ease: "none",
          onUpdate: () => { feld.textContent = SATZ.slice(0, Math.round(zeichen.n)); },
        })
        .to(chips[0], { opacity: 1, duration: 0.3 }, "+=0.5")
        .to(chips[2], { opacity: 1, duration: 0.3 }, "+=0.2")
        .to(bar, { scaleX: 0.2, duration: 0.6, ease: "power2.out" }, "<");

      return () => { tl.kill(); ScrollTrigger.getAll().forEach((s) => s.trigger === root && s.kill()); };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      feld.textContent = SATZ;
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <Link ref={ref} href="/briefing" className="bft__preview pm-reveal" data-reveal="up" aria-label="Zum Website-Briefing" data-cursor>
      <span className="bft__top" aria-hidden="true">
        <span className="bft__step">Schritt 2 von 11</span>
        <span className="bft__bar"><i /></span>
      </span>
      <span className="bft__head" aria-hidden="true"><b>02</b> Ihr Unternehmen &amp; Angebot</span>
      <span className="bft__label" aria-hidden="true">Was macht Ihr Unternehmen?</span>
      <span className="bft__input" aria-hidden="true"><span className="bft__typed">{SATZ}</span><i /></span>
      <span className="bft__label" aria-hidden="true">Was soll die Website erreichen?</span>
      <span className="bft__chips" aria-hidden="true">
        <span className="is-on">Mehr Anfragen</span><span>Online verkaufen</span><span className="is-on">Vertrauen &amp; Image</span>
      </span>
      <span className="bft__label" aria-hidden="true">Logo &amp; Fotos</span>
      <span className="bft__drop" aria-hidden="true">Dateien hierher ziehen · bis 25 MB</span>
      <span className="bft__cta" aria-hidden="true">Weiter →</span>
    </Link>
  );
}
