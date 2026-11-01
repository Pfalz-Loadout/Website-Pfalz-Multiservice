"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { WEB_CARE } from "@/lib/data";
import { PackageCard } from "./PackageCard";

/** Wartungspakete mit Schieber monatlich / jährlich (12 Monate nutzen, 10 zahlen) */
export function CarePricing() {
  const [yearly, setYearly] = useState(false);
  const grid = useRef<HTMLDivElement>(null);

  // Preise beim Umschalten kurz aufblitzen lassen
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const prices = grid.current!.querySelectorAll(".pk__price, .pk__billed");
      gsap.fromTo(prices, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" });
    });
    return () => mm.revert();
  }, { scope: grid, dependencies: [yearly] });

  return (
    <>
      <div className="billing">
        <span className={`billing__label ${yearly ? "" : "is-on"}`}>Monatlich</span>
        <button
          type="button" role="switch" aria-checked={yearly} aria-label="Jährlich zahlen und zwei Monate sparen"
          className={`switch ${yearly ? "is-on" : ""}`} onClick={() => setYearly(!yearly)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setYearly(true);
            if (e.key === "ArrowLeft") setYearly(false);
          }}
        >
          <span className="switch__knob" aria-hidden="true" />
        </button>
        <span className={`billing__label ${yearly ? "is-on" : ""}`}>Jährlich</span>
        <span className="billing__save">2 Monate geschenkt</span>
      </div>

      <div ref={grid} className="pk-grid pm-reveal" data-reveal="stagger">
        {WEB_CARE.map((p) => <PackageCard key={p.name} p={p} yearly={yearly} />)}
      </div>
    </>
  );
}
