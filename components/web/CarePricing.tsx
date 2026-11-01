"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { WEB_CARE } from "@/lib/data";
import { PackageCard } from "./PackageCard";

/** Wartungspakete mit Schalter monatlich / jährlich (12 Monate nutzen, 10 zahlen) */
export function CarePricing() {
  const [yearly, setYearly] = useState(false);
  const grid = useRef<HTMLDivElement>(null);

  // Preise beim Umschalten kurz aufblitzen lassen
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const prices = grid.current!.querySelectorAll(".pk__price");
      gsap.fromTo(prices, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" });
    });
    return () => mm.revert();
  }, { scope: grid, dependencies: [yearly] });

  return (
    <>
      <div className="toggle" role="group" aria-label="Zahlungsweise">
        <span className="toggle__track" data-on={yearly ? "year" : "month"}>
          <span className="toggle__pill" aria-hidden="true" />
          <button type="button" className={`toggle__btn ${yearly ? "" : "is-on"}`} aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Monatlich
          </button>
          <button type="button" className={`toggle__btn ${yearly ? "is-on" : ""}`} aria-pressed={yearly} onClick={() => setYearly(true)}>
            Jährlich
          </button>
        </span>
        <span className="toggle__hint">2 Monate geschenkt</span>
      </div>

      <div ref={grid} className="pk-grid pm-reveal" data-reveal="stagger">
        {WEB_CARE.map((p) => <PackageCard key={p.name} p={p} yearly={yearly} />)}
      </div>
    </>
  );
}
