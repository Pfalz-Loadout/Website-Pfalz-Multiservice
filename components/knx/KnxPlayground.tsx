"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import type { IconName } from "@/lib/data";

/*
 * Interaktiver Raum: KNX-Tastsensor (PA 1.1.12) und Raumregler (PA 1.1.9) steuern Licht, Lichtfarbe,
 * Szenen, Raffstore und Temperatur. Drei deckungsgleiche Fotos (Licht an / aus / Raffstore unten)
 * werden überblendet, Farbe und Heizen/Kühlen liegen als animierte Ebenen darüber.
 * Gruppenadressen nach Projektschema: Hauptgruppe = Funktion (0 Zentral, 1 Beleuchtung,
 * 2 Beschattung, 3 Heizung/Klima), Mittelgruppe = Ort (1 = Erdgeschoss), Untergruppe = Datenpunkt.
 * Physikalische Adressen (alle Linie 1.1): Taster 1.1.12, Dimmaktor 1.1.3, RGB-Controller 1.1.4,
 * Jalousieaktor 1.1.7, Raumregler 1.1.9.
 */

type Key = "light" | "dim" | "evening" | "off" | "up" | "down";
type Log = { id: number; src: string; ga: string; what: string; dpt: string; val: string };
type Mood = { id: string; name: string; rgb: [number, number, number] };

const KEYS: { id: Key; icon: IconName; label: string }[] = [
  { id: "light", icon: "lightbulb", label: "Licht" },
  { id: "dim", icon: "sliders-horizontal", label: "Dimmen 40 %" },
  { id: "evening", icon: "sparkles", label: "Szene Abend" },
  { id: "off", icon: "x", label: "Alles aus" },
  { id: "up", icon: "arrow-up", label: "Raffstore auf" },
  { id: "down", icon: "chevron-down", label: "Raffstore ab" },
];

const MOODS: Mood[] = [
  { id: "warm", name: "Warmweiß", rgb: [255, 196, 120] },
  { id: "amber", name: "Bernstein", rgb: [255, 140, 40] },
  { id: "blue", name: "Blau", rgb: [60, 120, 255] },
  { id: "violet", name: "Violett", rgb: [170, 80, 255] },
  { id: "green", name: "Grün", rgb: [40, 210, 120] },
];

type Step = { k: Key } | { mood: string } | { temp: number };
const DEMO: Step[] = [{ k: "light" }, { k: "down" }, { mood: "violet" }, { temp: 23.5 }, { k: "evening" }, { mood: "blue" }, { temp: 19.5 }, { k: "up" }, { mood: "warm" }, { k: "off" }];
const SPEED = 0.2; // Raffstore: volle Fahrt in 5 s
const fmt = (t: number) => t.toFixed(1).replace(".", ",");

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
  const [mood, setMood] = useState("warm");
  const [setpoint, setSetpoint] = useState(21.5);
  const [actual, setActual] = useState(21.5);
  const [log, setLog] = useState<Log[]>([]);
  const [flash, setFlash] = useState<{ key: string; n: number } | null>(null);
  const [demo, setDemo] = useState(true);
  const idRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const blindRef = useRef(0);
  blindRef.current = blind;

  const send = useCallback((ga: string, what: string, dpt: string, val: string, src = "1.1.12") => {
    const id = ++idRef.current;
    setLog((l) => [{ id, src, ga, what, dpt, val }, ...l].slice(0, 6));
  }, []);
  /* Rückmeldung eines Aktors kurz nach dem Befehl, wie auf einem echten Bus */
  const reply = useCallback((ga: string, what: string, dpt: string, val: string, src: string, ms = 380) => {
    window.setTimeout(() => send(ga, what, dpt, val, src), ms);
  }, [send]);

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

  // Raffstore steht: Jalousieaktor meldet die erreichte Position
  const wasMoving = useRef(false);
  useEffect(() => {
    const m = Math.abs(target - blind) > 0.001;
    if (wasMoving.current && !m) send("2/1/13", "EG Wohnen Raffstore Status Position", "5.001", `${Math.round(blind * 100)} %`, "1.1.7");
    wasMoving.current = m;
  }, [blind, target, send]);

  // Raumtemperatur läuft dem Sollwert nach (Zeitraffer), Raumregler meldet Betriebsart und Istwert
  const mode: "heat" | "cool" | "idle" = setpoint - actual > 0.05 ? "heat" : actual - setpoint > 0.05 ? "cool" : "idle";
  const lastMode = useRef<"heat" | "cool" | "idle">("idle");
  useEffect(() => {
    if (mode === lastMode.current) return;
    if (mode === "heat") send("3/1/15", "EG Wohnen Betriebsart Heizen/Kühlen", "1.100", "Heizen", "1.1.9");
    if (mode === "cool") send("3/1/15", "EG Wohnen Betriebsart Heizen/Kühlen", "1.100", "Kühlen", "1.1.9");
    if (mode === "idle" && lastMode.current !== "idle") send("3/1/11", "EG Wohnen Ist-Temperatur", "9.001", `${fmt(actual)} °C`, "1.1.9");
    lastMode.current = mode;
  }, [mode, actual, send]);
  useEffect(() => {
    if (mode === "idle") return;
    const t = window.setInterval(() => {
      setActual((a) => {
        const d = setpoint - a;
        return Math.abs(d) <= 0.1 ? setpoint : Math.round((a + Math.sign(d) * 0.1) * 10) / 10;
      });
    }, 420);
    return () => window.clearInterval(t);
  }, [mode, setpoint]);

  const press = useCallback((k: Key, fromUser = true) => {
    if (fromUser) setDemo(false);
    setFlash({ key: k, n: idRef.current + 1 });
    switch (k) {
      case "light": {
        const on = light < 0.5;
        setLight(on ? 1 : 0);
        send("1/1/10", "EG Wohnen Licht schalten", "1.001", on ? "EIN" : "AUS");
        reply("1/1/11", "EG Wohnen Licht Status", "1.001", on ? "EIN" : "AUS", "1.1.3");
        break;
      }
      case "dim": setLight(0.4); send("1/1/13", "EG Wohnen Licht Dimmwert", "5.001", "40 %"); reply("1/1/11", "EG Wohnen Licht Status", "1.001", "EIN", "1.1.3"); break;
      case "evening": setLight(0.45); setTarget(0.5); setMood("amber"); send("1/1/15", "EG Wohnen Szene", "17.001", "Szene 1 „Abend“"); break;
      case "off": setLight(0); send("0/1/1", "EG Zentral Licht aus", "1.001", "AUS"); reply("1/1/11", "EG Wohnen Licht Status", "1.001", "AUS", "1.1.3"); break;
      case "up": setTarget(0); send("2/1/10", "EG Wohnen Raffstore Auf/Ab", "1.008", "AUF"); break;
      case "down": setTarget(1); send("2/1/10", "EG Wohnen Raffstore Auf/Ab", "1.008", "AB"); break;
    }
  }, [light, send, reply]);

  const pickMood = useCallback((id: string, fromUser = true) => {
    if (fromUser) setDemo(false);
    const m = MOODS.find((x) => x.id === id)!;
    setMood(id);
    setFlash({ key: `mood-${id}`, n: idRef.current + 1 });
    if (light < 0.2) setLight(0.7);
    send("1/1/16", "EG Wohnen RGB Farbe", "232.600", `${m.name} (${m.rgb.join(", ")})`);
    reply("1/1/17", "EG Wohnen RGB Status", "232.600", m.name, "1.1.4");
  }, [light, send, reply]);

  const changeTemp = useCallback((v: number, fromUser = true) => {
    if (fromUser) setDemo(false);
    const nv = Math.max(16, Math.min(28, Math.round(v * 2) / 2));
    setSetpoint(nv);
    setFlash({ key: "temp", n: idRef.current + 1 });
    send("3/1/10", "EG Wohnen Sollwert", "9.001", `${fmt(nv)} °C`);
  }, [send]);

  // Kurze Vorführung, solange niemand selbst bedient und der Raum im Bild ist
  useEffect(() => {
    if (!demo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let i = 0, timer = 0, visible = false;
    const tick = () => {
      if (visible) {
        const s = DEMO[i % DEMO.length];
        if ("k" in s) press(s.k, false); else if ("mood" in s) pickMood(s.mood, false); else changeTemp(s.temp, false);
        i++;
      }
      timer = window.setTimeout(tick, 3400);
    };
    const io = new IntersectionObserver((e) => { visible = e.some((x) => x.isIntersecting); }, { threshold: 0.35 });
    io.observe(el);
    timer = window.setTimeout(tick, 1200);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [demo, press, pickMood, changeTemp]);

  const stop = () => { setDemo(false); setTarget(blindRef.current); send("2/1/11", "EG Wohnen Raffstore Stopp", "1.007", "STOPP"); };
  const moving = Math.abs(target - blind) > 0.001;
  const active = (k: Key) =>
    (k === "light" && light > 0.5) || (k === "dim" && Math.abs(light - 0.4) < 0.01) ||
    (k === "evening" && Math.abs(light - 0.45) < 0.01) || (k === "down" && moving && target > blind) || (k === "up" && moving && target < blind);
  const rgb = MOODS.find((m) => m.id === mood)!.rgb;
  const moodStrength = mood === "warm" ? 0.12 : 0.42;
  const power = Math.min(1, Math.abs(setpoint - actual) / 2.5);

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

          <div className="kp__sub">
            <span className="kp__sub-lbl">Lichtfarbe <small>RGB · PA 1.1.4</small></span>
            <div className="kp__moods" role="radiogroup" aria-label="Lichtfarbe">
              {MOODS.map((m) => (
                <button key={m.id} type="button" role="radio" aria-checked={mood === m.id} aria-label={m.name} title={m.name}
                  className={`kp__mood${mood === m.id ? " is-on" : ""}`} style={{ ["--c" as string]: `rgb(${m.rgb.join(",")})` }}
                  onClick={() => pickMood(m.id)} />
              ))}
            </div>
          </div>

          <div className={`kp__climate kp__climate--${mode}`}>
            <div className="kp__climate-top">
              <span className="kp__sub-lbl">Raumregler <small>PA 1.1.9</small></span>
              <span className="kp__mode">{mode === "heat" ? "Heizen" : mode === "cool" ? "Kühlen" : "Temperatur erreicht"}</span>
            </div>
            <div className="kp__climate-row">
              <button type="button" className="kp__tbtn" aria-label="Sollwert senken" onClick={() => changeTemp(setpoint - 0.5)}>−</button>
              <div className="kp__temp" aria-live="polite">
                <b>{fmt(actual)}<span>°C</span></b>
                <small>Soll {fmt(setpoint)} °C</small>
              </div>
              <button type="button" className="kp__tbtn" aria-label="Sollwert erhöhen" onClick={() => changeTemp(setpoint + 0.5)}>+</button>
            </div>
          </div>
          <div className="kp__bus" aria-hidden="true"><span key={flash?.n ?? 0} className="kp__tg" /></div>
        </div>
        <div className="kp__log" aria-live="polite">
          <div className="kp__log-head">Busmonitor <small>Linie 1.1</small></div>
          {log.length === 0 && <div className="kp__log-empty">Drücken Sie eine Taste …</div>}
          {log.map((l) => (
            <div key={l.id} className="kp__log-row">
              <b>{l.ga}</b><span>{l.what}</span><em>{l.val}</em>
              <small>{l.src} → {l.ga} · DPT {l.dpt}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="kp__room">
        <Image className="kp__img" src="/images/knx-raum-aus.jpg" alt="Wohnzimmer mit großer Fensterfront, Licht aus" fill sizes="(max-width: 1080px) 100vw, 860px" />
        <Image className="kp__img kp__img--on" src="/images/knx-raum-an.jpg" alt="" fill sizes="(max-width: 1080px) 100vw, 860px" style={{ opacity: light }} />
        {/* Farbiges Stimmungslicht: färbt die beleuchteten Flächen im Raum, nicht das Fenster */}
        <div className="kp__tint" aria-hidden="true" style={{ ["--c" as string]: `rgb(${rgb.join(",")})`, opacity: light * moodStrength }} />
        <div className={`kp__heat${mode === "heat" ? " is-on" : ""}`} aria-hidden="true" style={{ ["--p" as string]: String(0.35 + 0.65 * power) }} />
        <div className={`kp__cool${mode === "cool" ? " is-on" : ""}`} aria-hidden="true" style={{ ["--p" as string]: String(0.35 + 0.65 * power) }} />
        <div className="kp__blind" style={{ clipPath: blindClip(blind), WebkitClipPath: blindClip(blind) }}>
          <Image className="kp__img" src="/images/knx-raum-zu.jpg" alt="" fill sizes="(max-width: 1080px) 100vw, 860px" style={{ filter: `brightness(${(0.3 + 0.7 * light).toFixed(2)})` }} />
        </div>
        <div className="kp__status" aria-hidden="true">
          <span><Icon name="lightbulb" size={15} /> Licht {Math.round(light * 100)} %</span>
          <span><Icon name="blinds" size={15} /> Raffstore {Math.round(blind * 100)} %{moving ? (target > blind ? " ▼" : " ▲") : ""}</span>
          <span className={`kp__st-temp kp__st-temp--${mode}`}><Icon name="thermometer" size={15} /> {fmt(actual)} °C{mode === "heat" ? " ▲" : mode === "cool" ? " ▼" : ""}</span>
        </div>
        {demo && <span className="kp__demo">Vorführung läuft · selbst ausprobieren</span>}
      </div>
    </div>
  );
}
