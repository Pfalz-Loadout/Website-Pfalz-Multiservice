"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import type { IconName } from "@/lib/data";

/*
 * Interaktiver Raum: KNX-Tastsensor (PA 1.1.12) und Raumregler (PA 1.1.9) steuern Licht, Lichtszenen,
 * Raffstore und Temperatur. Drei deckungsgleiche Fotos (Licht an / aus / Raffstore unten) plus eine
 * Lichtkarte (= Licht an minus Licht aus): Für farbige Szenen wird die Lichtkarte eingefärbt und
 * additiv (plus-lighter) auf den dunklen Raum gelegt. So werfen Spots und Pendelleuchte das farbige
 * Licht tatsächlich in den Raum, wie bei Hue-Szenen mit mehreren Farben.
 * Gruppenadressen nach Projektschema: Hauptgruppe = Funktion (0 Zentral, 1 Beleuchtung,
 * 2 Beschattung, 3 Heizung/Klima), Mittelgruppe = Ort (1 = Erdgeschoss), Untergruppe = Datenpunkt.
 * Physikalische Adressen (Linie 1.1): Taster 1.1.12, Dimmaktor 1.1.3, RGB-Controller Spots 1.1.4,
 * RGB-Controller Pendel 1.1.5, Jalousieaktor 1.1.7, Raumregler 1.1.9.
 */

type Key = "light" | "dim" | "evening" | "off" | "up" | "down";
type Log = { id: number; t: string; src: string; ga: string; what: string; dpt: string; val: string };
type RGB = [number, number, number];
type Scene = { id: string; name: string; no: number; spots: RGB; pendel: RGB };

const KEYS: { id: Key; icon: IconName; label: string }[] = [
  { id: "light", icon: "lightbulb", label: "Licht" },
  { id: "dim", icon: "sliders-horizontal", label: "Dimmen 40 %" },
  { id: "evening", icon: "sparkles", label: "Szene Abend" },
  { id: "off", icon: "x", label: "Alles aus" },
  { id: "up", icon: "arrow-up", label: "Raffstore auf" },
  { id: "down", icon: "chevron-down", label: "Raffstore ab" },
];

/* Lichtszenen im Stil von Hue: Spots und Pendelleuchte bekommen je eine eigene, abgestimmte Farbe */
const SCENES: Scene[] = [
  { id: "warm", name: "Warmweiß", no: 1, spots: [255, 196, 130], pendel: [255, 196, 130] },
  { id: "cool", name: "Konzentrieren", no: 2, spots: [215, 230, 255], pendel: [225, 236, 255] },
  { id: "sunset", name: "Sonnenuntergang", no: 3, spots: [255, 120, 40], pendel: [255, 60, 110] },
  { id: "aurora", name: "Nordlicht", no: 4, spots: [0, 220, 170], pendel: [120, 90, 255] },
  { id: "tropic", name: "Tropenabend", no: 5, spots: [255, 50, 160], pendel: [255, 170, 40] },
  { id: "deepsea", name: "Tiefsee", no: 6, spots: [40, 110, 255], pendel: [30, 210, 255] },
];

type Step = { k: Key } | { scene: string } | { temp: number };
const DEMO: Step[] = [{ k: "light" }, { scene: "sunset" }, { k: "down" }, { temp: 23.5 }, { scene: "aurora" }, { k: "evening" }, { scene: "deepsea" }, { temp: 19.5 }, { k: "up" }, { scene: "tropic" }, { scene: "warm" }, { k: "off" }];
const SPEED = 0.2; // Raffstore: volle Fahrt in 5 s
const fmt = (t: number) => t.toFixed(1).replace(".", ",");
const hex = (c: RGB) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
const css = (c: RGB) => `rgb(${c.join(",")})`;
const now = () => new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

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
  const [scene, setScene] = useState("warm");
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
    setLog((l) => [{ id, t: now(), src, ga, what, dpt, val }, ...l].slice(0, 7));
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
      case "evening": setLight(0.45); setTarget(0.5); setScene("sunset"); send("1/1/15", "EG Wohnen Szene", "17.001", "Szene 7 „Abend“"); break;
      case "off": setLight(0); send("0/1/1", "EG Zentral Licht aus", "1.001", "AUS"); reply("1/1/11", "EG Wohnen Licht Status", "1.001", "AUS", "1.1.3"); break;
      case "up": setTarget(0); send("2/1/10", "EG Wohnen Raffstore Auf/Ab", "1.008", "AUF"); break;
      case "down": setTarget(1); send("2/1/10", "EG Wohnen Raffstore Auf/Ab", "1.008", "AB"); break;
    }
  }, [light, send, reply]);

  const pickScene = useCallback((id: string, fromUser = true) => {
    if (fromUser) setDemo(false);
    const s = SCENES.find((x) => x.id === id)!;
    setScene(id);
    setFlash({ key: `scene-${id}`, n: idRef.current + 1 });
    if (light < 0.2) setLight(0.8);
    send("1/1/15", "EG Wohnen Szene", "17.001", `Szene ${s.no} „${s.name}“`);
    reply("1/1/17", "EG Wohnen Spots RGB Status", "232.600", hex(s.spots), "1.1.4", 360);
    reply("1/1/19", "EG Wohnen Pendel RGB Status", "232.600", hex(s.pendel), "1.1.5", 520);
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
        if ("k" in s) press(s.k, false); else if ("scene" in s) pickScene(s.scene, false); else changeTemp(s.temp, false);
        i++;
      }
      timer = window.setTimeout(tick, 3400);
    };
    const io = new IntersectionObserver((e) => { visible = e.some((x) => x.isIntersecting); }, { threshold: 0.35 });
    io.observe(el);
    timer = window.setTimeout(tick, 1200);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [demo, press, pickScene, changeTemp]);

  const stop = () => { setDemo(false); setTarget(blindRef.current); send("2/1/11", "EG Wohnen Raffstore Stopp", "1.007", "STOPP"); };
  const moving = Math.abs(target - blind) > 0.001;
  const active = (k: Key) =>
    (k === "light" && light > 0.5) || (k === "dim" && Math.abs(light - 0.4) < 0.01) ||
    (k === "evening" && Math.abs(light - 0.45) < 0.01) || (k === "down" && moving && target > blind) || (k === "up" && moving && target < blind);
  const sc = SCENES.find((s) => s.id === scene)!;
  const colored = scene !== "warm";
  const power = Math.min(1, Math.abs(setpoint - actual) / 2.5);
  const sizes = "(max-width: 1080px) 100vw, 860px";

  return (
    <div className="kp" ref={rootRef}>
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
          <span className="kp__sub-lbl">Lichtszenen <small>{sc.name}</small></span>
          <div className="kp__moods" role="radiogroup" aria-label="Lichtszene">
            {SCENES.map((s) => (
              <button key={s.id} type="button" role="radio" aria-checked={scene === s.id} aria-label={s.name} title={s.name}
                className={`kp__mood${scene === s.id ? " is-on" : ""}`}
                style={{ ["--a" as string]: css(s.spots), ["--b" as string]: css(s.pendel) }}
                onClick={() => pickScene(s.id)} />
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

      <div className="kp__main">
        <div className="kp__room">
          <Image className="kp__img" src="/images/knx-raum-aus.jpg" alt="Wohnzimmer mit großer Fensterfront" fill sizes={sizes} />
          <Image className="kp__img kp__img--on" src="/images/knx-raum-an.jpg" alt="" fill sizes={sizes} style={{ opacity: colored ? 0 : light }} />
          {/* Farbiges Licht: Lichtkarte eingefärbt, additiv. Spots außen, Pendelleuchte über dem Tisch */}
          <div className="kp__lm kp__lm--spots" aria-hidden="true" style={{ opacity: colored ? light : 0 }}>
            <Image className="kp__img" src="/images/knx-raum-licht.jpg" alt="" fill sizes={sizes} />
            <span className="kp__lm-tint" style={{ background: css(sc.spots) }} />
          </div>
          <div className="kp__lm kp__lm--pendel" aria-hidden="true" style={{ opacity: colored ? light : 0 }}>
            <Image className="kp__img" src="/images/knx-raum-licht.jpg" alt="" fill sizes={sizes} />
            <span className="kp__lm-tint" style={{ background: css(sc.pendel) }} />
          </div>
          <div className={`kp__heat${mode === "heat" ? " is-on" : ""}`} aria-hidden="true" style={{ ["--p" as string]: String(0.35 + 0.65 * power) }} />
          <div className={`kp__cool${mode === "cool" ? " is-on" : ""}`} aria-hidden="true" style={{ ["--p" as string]: String(0.35 + 0.65 * power) }} />
          <div className="kp__blind" style={{ clipPath: blindClip(blind), WebkitClipPath: blindClip(blind) }}>
            <Image className="kp__img" src="/images/knx-raum-zu.jpg" alt="" fill sizes={sizes} style={{ filter: `brightness(${(0.3 + 0.7 * light).toFixed(2)})` }} />
          </div>
          <div className="kp__status" aria-hidden="true">
            <span><Icon name="lightbulb" size={15} /> {Math.round(light * 100)} % · {sc.name}</span>
            <span><Icon name="blinds" size={15} /> Raffstore {Math.round(blind * 100)} %{moving ? (target > blind ? " ▼" : " ▲") : ""}</span>
            <span className={`kp__st-temp kp__st-temp--${mode}`}><Icon name="thermometer" size={15} /> {fmt(actual)} °C{mode === "heat" ? " ▲" : mode === "cool" ? " ▼" : ""}</span>
          </div>
          {demo && <span className="kp__demo">Vorführung läuft · selbst ausprobieren</span>}
        </div>

        {/* Gruppenmonitor wie in der ETS: Zeit, Quelle, Ziel, Name, DPT, Wert */}
        <div className="kp__mon" aria-live="polite">
          <div className="kp__mon-head">
            <span className="kp__mon-title"><span className="kp__mon-rec" aria-hidden="true" /> Gruppenmonitor <small>Linie 1.1</small></span>
            <span className="kp__mon-count">{idRef.current} Telegramme</span>
          </div>
          <div className="kp__mon-table" role="table" aria-label="Telegramme auf dem KNX-Bus">
            <div className="kp__mon-row kp__mon-row--h" role="row">
              <span role="columnheader">Zeit</span><span role="columnheader">Quelle</span><span role="columnheader">Ziel</span>
              <span role="columnheader">Name</span><span role="columnheader">DPT</span><span role="columnheader">Wert</span>
            </div>
            {log.length === 0 && <div className="kp__mon-empty">Warte auf Telegramme …</div>}
            {log.map((l) => (
              <div key={l.id} className="kp__mon-row" role="row">
                <span role="cell">{l.t}</span><span role="cell">{l.src}</span><span role="cell"><b>{l.ga}</b></span>
                <span role="cell" className="kp__mon-name">{l.what}</span><span role="cell">{l.dpt}</span><span role="cell"><em>{l.val}</em></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
