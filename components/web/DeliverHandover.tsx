"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { WEB_DELIVER, WEB_HANDOVER, type HandoverItem } from "@/lib/data";
import { tidy } from "@/lib/typo";
import { Icon } from "../Icon";

const STEP_MS = 2600;
const HANDOVER: HandoverItem[] = WEB_HANDOVER.flatMap((g) => g.items);

/**
 * „Was bekomme ich?“ und Übergabe-Paket als kompakter Doppelblock: je Spalte nur die Titel als Liste,
 * ein Spotlight läuft automatisch durch und zeigt darunter die Erklärung des aktiven Punkts.
 * Hover, Fokus oder Tippen wählt einen Punkt direkt und hält die Automatik an.
 */
export function DeliverHandover() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [motion, setMotion] = useState(false);

  useGSAP(() => {
    const root = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      setMotion(true);
      const st = ScrollTrigger.create({ trigger: root, start: "top 80%", end: "bottom 20%", onToggle: (s) => setVisible(s.isActive) });
      // Häkchen und Zeilen laufen beim ersten Einscrollen nacheinander ein
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 82%", once: true } });
      root.querySelectorAll<HTMLElement>(".dh-col").forEach((col, c) => {
        const rows = col.querySelectorAll(".dh-row");
        tl.from(rows, { x: -18, opacity: 0, duration: 0.55, stagger: 0.06, ease: "power3.out" }, c * 0.15)
          .from(col.querySelectorAll(".dh-tick"), { scale: 0, rotate: -90, duration: 0.45, stagger: 0.06, ease: "back.out(2.2)" }, c * 0.15 + 0.12)
          .from(col.querySelector(".dh-detail"), { y: 16, opacity: 0, duration: 0.6, ease: "power3.out" }, c * 0.15 + 0.35);
      });
      return () => { st.kill(); setMotion(false); };
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <div ref={ref} className="dh">
      <Column id="leistungsumfang" eyebrow="In jedem Paket" title="Was bekomme ich?" items={WEB_DELIVER} playing={motion && visible} offset={0} />
      <Column id="uebergabe" eyebrow="Übergabe-Paket" title="Ihre Website gehört Ihnen" items={HANDOVER} playing={motion && visible} offset={STEP_MS / 2}
        note="Kein Lock-in: Nach vollständiger Bezahlung bekommen Sie alles, um Ihre Website selbst zu besitzen." />
    </div>
  );
}

function Column({ id, eyebrow, title, items, playing, offset, note }:
  { id: string; eyebrow: string; title: string; items: HandoverItem[]; playing: boolean; offset: number; note?: string }) {
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const [started, setStarted] = useState(offset === 0);
  const run = playing && auto;

  // Zweite Spalte startet versetzt, damit nicht beide Spotlights gleichzeitig springen
  useEffect(() => {
    if (!run || started) return;
    const t = window.setTimeout(() => setStarted(true), offset);
    return () => window.clearTimeout(t);
  }, [run, started, offset]);

  useEffect(() => {
    if (!run || !started) return;
    const t = window.setTimeout(() => setCur((c) => (c + 1) % items.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [run, started, cur, items.length]);

  const pick = (i: number) => { setAuto(false); setCur(i); };
  const active = items[cur];

  return (
    <section className="dh-col" id={id} aria-labelledby={`${id}-t`}>
      <span className="pk-box__eyebrow">{eyebrow}</span>
      <h3 className="dh-title" id={`${id}-t`}>{title}</h3>
      <ul className="dh-list">
        {items.map((it, i) => (
          <li key={it.title}>
            <button type="button" className={`dh-row ${i === cur ? "is-on" : ""}`} aria-pressed={i === cur}
              onClick={() => pick(i)} onMouseEnter={() => pick(i)} onFocus={() => pick(i)} data-cursor>
              <span className="dh-tick" aria-hidden="true"><Icon name="check" size={13} /></span>
              <span className="dh-row__t">{it.title}</span>
              <span className="sr-only">: {it.text.replace(/\n/g, " ")}</span>
              {i === cur && run && started && <i key={cur} className="dh-row__prog" aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ul>
      <div className="dh-detail" aria-hidden="true">
        <span className="dh-detail__icon"><Icon name={active.icon} size={20} /></span>
        <p key={cur} className="dh-detail__text"><b>{active.title}</b>{tidy(active.text.replace(/\n/g, " "))}</p>
      </div>
      {note && <p className="dh-note">{tidy(note)}</p>}
    </section>
  );
}
