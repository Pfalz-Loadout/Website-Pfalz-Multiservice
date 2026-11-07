"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import type { IconName } from "@/lib/data";

/*
 * Interaktiver Raum: ein KNX-Tastsensor (PA 1.1.12) schaltet Licht, Szenen und den Raffstore.
 * Drei deckungsgleiche Fotos (Licht an / Licht aus / Raffstore unten) werden überblendet.
 * Adressen nach üblichem 3-Ebenen-Schema: Hauptgruppe 1 = Erdgeschoss,
 * Mittelgruppe 1 = Licht, 3 = Beschattung, 5 = Szenen.
 */

type Key = "light" | "dim" | "evening" | "off" | "up" | "down";
type Log = { id: number; ga: string; what: string; val: string };

const KEYS: { id: Key; icon: IconName; label: string }[] = [
  { id: "light", icon: "lightbulb", label: "Licht" },
  { id: "dim", icon: "sliders-horizontal", label: "Dimmen 40 %" },
  { id: "evening", icon: "sparkles", label: "Szene Abend" },
  { id: "off", icon: "x", label: "Alles aus" },
  { id: "up", icon: "arrow-up", label: "Raffstore auf" },
  { id: "down", icon: "chevron-down", label: "Raffstore ab" },
];

const DEMO: Key[] = ["light", "down", "evening", "up", "dim", "off"];
const SPEED = 0.2; // Raffstore: volle Fahrt in 5 s

/* Glasfläche im Foto (Prozent, nachgemessen). Die Oberkante steigt perspektivisch nach rechts
   und liegt am rechten Bildrand außerhalb des Bildes (ca. -19 %). Der Raffstore fährt so herunter,
   dass seine Unterkante zwischen Ober- und Unterkante des Fensters interpoliert: perspektivisch korrekt. */
const WIN = { tl: [68.6, 16.6], tr: [100.5, -19.2], bl: [69.0, 61.0], br: [100.5, 82.6] } as const;
function blindClip(p: number) {
  const q = Math.max(0, Math.min(1, p));
  const lerp = (a: number, b: number) => (a + (b - a) * q).toFixed(2);
  const lx = lerp(WIN.tl[0], WIN.bl[0]), ly = lerp(WIN.tl[1], WIN.bl[1]);
  const ry = lerp(WIN.tr[1], WIN.br[1]);
  return `polygon(${WIN.tl[0]}% ${WIN.tl[1]}%, ${WIN.tr[0]}% ${WIN.tr[1]}%, ${WIN.tr[0]}% ${ry}%, ${lx}% ${ly}%)`;
}

export function KnxPlayground() {
  const [light, setLight] = useState(1);            // 0 … 1
  const [blind, setBlind] = useState(0);            // 0 offen … 1 zu
  const [target, setTarget] = useState(0);
  const [log, setLog] = useState<Log[]>([]);
  const [flash, setFlash] = useState<{ key: Key; n: number } | null>(null);
  const [demo, setDemo] = useState(true);
  const idRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const blindRef = useRef(0);
  blindRef.current = blind;

  // Raffstore fährt mit realistischer Geschwindigkeit
  useEffect(() => {
    if (Math.abs(target - blindRef.current) < 0.001) return;
    let raf = 0, last = performance.now();
    const step = (t: number) => {
      const dt = (t - last) / 1000; last = t;
      const cur = blindRef.current, dir = Math.sign(target - cur);
      const next = dir > 0 ? Math.min(target, cur + SPEED * dt) : Math.max(target, cur - SPEED * dt);
      setBlind(next);
      if (next !== target) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const send = useCallback((ga: string, what: string, val: string) => {
    const id = ++idRef.current;
    setLog((l) => [{ id, ga, what, val }, ...l].slice(0, 5));
  }, []);

  const press = useCallback((k: Key, fromUser = true) => {
    if (fromUser) setDemo(false);
    setFlash({ key: k, n: idRef.current + 1 });
    switch (k) {
      case "light": {
        const on = light < 0.5;
        setLight(on ? 1 : 0);
        send("1/1/1", "Licht Wohnen schalten", on ? "EIN" : "AUS");
        break;
      }
      case "dim": setLight(0.4); send("1/1/2", "Licht Wohnen Dimmwert", "40 %"); break;
      case "evening": setLight(0.45); setTarget(0.5); send("1/5/1", "Szene Wohnen", "Szene 1 „Abend“"); break;
      case "off": setLight(0); send("1/1/1", "Licht Wohnen schalten", "AUS"); break;
      case "up": setTarget(0); send("1/3/1", "Raffstore Süd Auf/Ab", "AUF"); break;
      case "down": setTarget(1); send("1/3/1", "Raffstore Süd Auf/Ab", "AB"); break;
    }
  }, [light, send]);

  // Kurze Vorführung, solange niemand selbst drückt und der Raum im Bild ist
  useEffect(() => {
    if (!demo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let i = 0, timer = 0, visible = false;
    const tick = () => { if (visible) { press(DEMO[i % DEMO.length], false); i++; } timer = window.setTimeout(tick, 3400); };
    const io = new IntersectionObserver((e) => { visible = e.some((x) => x.isIntersecting); }, { threshold: 0.35 });
    io.observe(el);
    timer = window.setTimeout(tick, 1200);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [demo, press]);

  const stop = () => { setDemo(false); setTarget(blindRef.current); send("1/3/2", "Raffstore Süd Stopp", "STOPP"); };
  const moving = Math.abs(target - blind) > 0.001;
  const active = (k: Key) =>
    (k === "light" && light > 0.5) || (k === "dim" && Math.abs(light - 0.4) < 0.01) ||
    (k === "evening" && Math.abs(light - 0.45) < 0.01) || (k === "down" && moving && target > blind) || (k === "up" && moving && target < blind);

  return (
    <div className="kp" ref={rootRef}>
      <div className="kp__panel">
        <div className="kp__device" role="group" aria-label="KNX-Tastsensor Wohnzimmer">
          <div className="kp__device-head"><span>Tastsensor Wohnen</span><small>PA 1.1.12</small></div>
          <div className="kp__keys">
            {KEYS.map((k) => (
              <button key={k.id} type="button" className={`kp__key${active(k.id) ? " is-on" : ""}`} aria-pressed={active(k.id)}
                onClick={() => press(k.id)}>
                <span className="kp__led" aria-hidden="true" />
                <Icon name={k.icon} size={22} />
                <span className="kp__lbl">{k.label}</span>
                {flash?.key === k.id && <span key={flash.n} className="kp__ripple" aria-hidden="true" />}
              </button>
            ))}
          </div>
          <button type="button" className="kp__stop" onClick={stop} disabled={!moving}>Raffstore stoppen</button>
          <div className="kp__bus" aria-hidden="true"><span key={flash?.n ?? 0} className="kp__tg" /></div>
        </div>
        <div className="kp__log" aria-live="polite">
          <div className="kp__log-head">Busmonitor <small>Linie 1.1 · Absender PA 1.1.12</small></div>
          {log.length === 0 && <div className="kp__log-empty">Drücken Sie eine Taste …</div>}
          {log.map((l) => (
            <div key={l.id} className="kp__log-row">
              <b>GA {l.ga}</b><span>{l.what}</span><em>{l.val}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="kp__room">
        <Image className="kp__img" src="/images/knx-raum-aus.jpg" alt="Wohnzimmer mit großer Fensterfront, Licht aus" fill sizes="(max-width: 1080px) 100vw, 860px" />
        <Image className="kp__img kp__img--on" src="/images/knx-raum-an.jpg" alt="" fill sizes="(max-width: 1080px) 100vw, 860px" style={{ opacity: light }} />
        <div className="kp__blind" style={{ clipPath: blindClip(blind), WebkitClipPath: blindClip(blind) }}>
          <Image className="kp__img" src="/images/knx-raum-zu.jpg" alt="" fill sizes="(max-width: 1080px) 100vw, 860px" style={{ filter: `brightness(${(0.3 + 0.7 * light).toFixed(2)})` }} />
        </div>
        <div className="kp__status" aria-hidden="true">
          <span><Icon name="lightbulb" size={15} /> Licht {Math.round(light * 100)} %</span>
          <span><Icon name="blinds" size={15} /> Raffstore {Math.round(blind * 100)} %{moving ? (target > blind ? " ▼" : " ▲") : ""}</span>
        </div>
        {demo && <span className="kp__demo">Vorführung läuft · selbst ausprobieren</span>}
      </div>
    </div>
  );
}
