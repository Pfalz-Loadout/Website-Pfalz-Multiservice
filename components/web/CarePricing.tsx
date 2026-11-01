"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { WEB_CARE } from "@/lib/data";
import { PackageCard } from "./PackageCard";

/** Wartungspakete mit Schieber monatlich / jährlich (12 Monate nutzen, 10 zahlen) */
export function CarePricing() {
  const [yearly, setYearly] = useState(false);
  const [touched, setTouched] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  const toggle = (next: boolean) => {
    setTouched(true);
    setYearly(next);
  };

  // Knopf bewegen; solange niemand angefasst hat, wippt er einladend nach rechts
  useGSAP(() => {
    const knob = root.current!.querySelector<HTMLElement>(".switch__knob")!;
    const track = root.current!.querySelector<HTMLElement>(".switch")!;
    const travel = () => Math.max(0, track.clientWidth - knob.offsetWidth - 8);
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.to(knob, { x: yearly ? travel() : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      if (yearly || touched) return;
      const hint = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 1.2 });
      hint.to(knob, { x: travel() * 0.42, duration: 0.6, ease: "power2.inOut" })
        .to(knob, { x: 0, duration: 0.7, ease: "power2.inOut" }, ">0.25");
      return () => hint.kill();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(knob, { x: yearly ? travel() : 0 });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [yearly, touched] });

  // Preise beim Umschalten kurz aufblitzen lassen
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(grid.current!.querySelectorAll(".pk__price"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" });
    });
    return () => mm.revert();
  }, { scope: grid, dependencies: [yearly] });

  return (
    <>
      <div ref={root} className="billing">
        <span className={`billing__label ${yearly ? "" : "is-on"}`}>Monatlich</span>
        <button
          type="button" role="switch" aria-checked={yearly} aria-label="Jährlich zahlen und zwei Monate sparen"
          className={`switch ${yearly ? "is-on" : ""}`} onClick={() => toggle(!yearly)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") toggle(true);
            if (e.key === "ArrowLeft") toggle(false);
          }}
        >
          <span className="switch__knob" aria-hidden="true" />
        </button>
        <span className={`billing__label ${yearly ? "is-on" : ""}`}>Jährlich</span>
        {yearly && <span className="billing__save">2 Monate geschenkt</span>}
      </div>

      <div ref={grid} className="pk-grid pm-reveal" data-reveal="stagger">
        {WEB_CARE.map((p) => <PackageCard key={p.name} p={p} yearly={yearly} />)}
      </div>
    </>
  );
}
