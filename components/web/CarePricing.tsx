"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { WEB_CARE } from "@/lib/data";
import { PackageCard } from "./PackageCard";

/** Wartungspakete mit Schieber monatlich / jährlich (12 Monate nutzen, 10 zahlen) */
export function CarePricing() {
  const [yearly, setYearly] = useState(false);
  const [touched, setTouched] = useState(false);
  const grid = useRef<HTMLDivElement>(null);

  const toggle = (next: boolean) => {
    setTouched(true);
    setYearly(next);
  };

  // Preise beim Umschalten kurz aufblitzen lassen
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(grid.current!.querySelectorAll(".pk__amount, .pk__regular, .pk__billed"),
        { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    });
    return () => mm.revert();
  }, { scope: grid, dependencies: [yearly] });

  return (
    <>
      <div className="billing">
        <span className="billing__label">Monatlich</span>
        <button
          type="button" role="switch" aria-checked={yearly} aria-label="Jährlich zahlen und zwei Monate sparen"
          className={`switch ${yearly ? "is-on" : ""} ${touched ? "is-touched" : ""}`} onClick={() => toggle(!yearly)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") toggle(true);
            if (e.key === "ArrowLeft") toggle(false);
          }}
        >
          <span className="switch__knob" aria-hidden="true" />
        </button>
        <span className="billing__label">Jährlich</span>
        {yearly && <span className="billing__save">2 Monate geschenkt</span>}
      </div>

      <div ref={grid} className="pk-grid pm-reveal" data-reveal="stagger">
        {WEB_CARE.map((p) => <PackageCard key={p.name} p={p} yearly={yearly} />)}
      </div>
    </>
  );
}
