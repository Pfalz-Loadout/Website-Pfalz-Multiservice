"use client";
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/600.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SITE } from "@/lib/site";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { Icon } from "../Icon";

const HOST = SITE.replace(/^https?:\/\//, "").replace(/^www\./, "");
const LIVE = "/beispiele/beratungsbuero";

const STEPS: { tag: string; stage: string; title: string; text: string }[] = [
  { tag: "Struktur", stage: "Raster", title: "Erst das Raster, dann das Design.",
    text: "Jede Website steht bei uns auf einem festen Raster. Dadurch wirkt sie auf dem Handy genauso aufgeräumt wie am großen Bildschirm." },
  { tag: "Nutzerführung", stage: "Wireframe", title: "Der Weg zur Anfrage kommt zuerst.",
    text: "Im Wireframe legen wir fest, was Besucher in welcher Reihenfolge sehen: Leistung, Region, Vertrauen, Anfrage. Erst danach wird gestaltet." },
  { tag: "Marke", stage: "Bild & Farbe", title: "Farben und Bilder aus Ihrem Betrieb.",
    text: "Farben, Formen und Fotos kommen aus Ihrem Unternehmen, nicht aus einem Baukasten. So sieht Ihre Website nach Ihnen aus und nicht nach Vorlage." },
  { tag: "Texte", stage: "Typografie", title: "Überschriften, die auf den Punkt kommen.",
    text: "Die Texte beantworten die Fragen Ihrer Kunden in deren Sprache: kurz, konkret und mit Fakten statt Floskeln." },
  { tag: "Ergebnis", stage: "Fertig", title: "Alles zusammen: eine Website, die Anfragen bringt.",
    text: "So sieht es fertig aus: unser Musterdesign „Umraum“ für ein Beratungsbüro, auf Laptop und Handy. Anruf, Formular und Termin sind von überall erreichbar." },
];
const N = STEPS.length;
const nn = (i: number) => String(i).padStart(2, "0");

/** „Schicht für Schicht“: Die Bühne baut beim Scrollen eine Website in 5 Ebenen auf – am Ende das echte Musterdesign Umraum */
export function LayerBuild() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);

  useGSAP(() => {
    const root = ref.current!;
    const items = gsap.utils.toArray<HTMLElement>(".lay-step", root);
    const mm = gsap.matchMedia();
    // Aktive Schicht: der Schritt, der gerade die Mitte des Bildschirms kreuzt
    items.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el, start: "top 62%", end: "bottom 62%",
        onToggle: (s) => { if (s.isActive) setStep(i + 1); },
      });
    });
    mm.add(`${MOTION_OK} and (min-width: 1081px)`, () => {
      // Bühne kippt beim Einscrollen aus der Schräge in die Fläche
      gsap.fromTo(root.querySelector(".lay-tilt"), { rotateX: 14, rotateY: -10, scale: 0.92 }, {
        rotateX: 0, rotateY: 0, scale: 1, ease: "none",
        scrollTrigger: { trigger: root.querySelector(".lay-body"), start: "top 90%", end: "top 25%", scrub: 0.6 },
      });
    });
    mm.add(MOTION_OK, () => {
      gsap.to(root.querySelector(".lay-rail__fill"), {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: root.querySelector(".lay-steps"), start: "top 62%", end: "bottom 62%", scrub: 0.4 },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  const cls = Array.from({ length: step }, (_, i) => `s${i + 1}`).join(" ");
  const cur = STEPS[step - 1];

  return (
    <section ref={ref} className="section lay" id="schicht-fuer-schicht" aria-labelledby="lay-title">
      <div className="lay__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="Schicht für Schicht" title="So entsteht Ihre" highlight="neue Website"
          intro={"Eine gute Website ist kein Zufall. Wir planen sie wie ein Haus: erst das Fundament, dann die Räume, dann die Einrichtung.\nScrollen Sie durch die Schichten."} />
        <h3 className="sr-only" id="lay-title">Die fünf Schichten einer Website</h3>

        <div className="lay-body">
          {/* ---------- Bühne ---------- */}
          <div className="lay-stage-wrap">
            <div className={`lay-stage ${cls}`} data-step={step} aria-hidden="true">
              <div className="lay-hud">
                <span key={step} className="lay-hud__n">{nn(step)} / {nn(N)}</span>
                <span key={"t" + step} className="lay-hud__t">{cur.stage}</span>
                <span className="lay-hud__dots">{STEPS.map((_, i) => <i key={i} className={i < step ? "on" : ""} />)}</span>
              </div>

              <div className="lay-tilt">
                <div className="lay-device">
                  <div className="lay-browser">
                    <div className="lay-browser__bar">
                      <span className="lay-browser__dots"><i /><i /><i /></span>
                      <span className="lay-browser__url">{step < 5 ? "entwurf." : ""}{HOST}{LIVE}</span>
                    </div>
                    <div className="lay-screen">
                      <Mock />
                      <div className="lay-grid">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ ["--i" as string]: i }} />)}</div>
                      <span key={"scan" + step} className="lay-scan" />
                      <Image className="lay-final" src="/images/beispiele/beratungsbuero-start.png" alt="" fill sizes="(max-width: 1080px) 100vw, 680px" />
                    </div>
                  </div>
                  <div className="lay-base" />
                </div>

                {/* Ebene 1: Lineal */}
                <div className="lay-ruler">
                  <span>12 Spalten · 24 px Abstand</span>
                  <span>1200 px</span>
                </div>
                {/* Ebene 3: Farbpalette */}
                <div className="lay-card lay-swatch">
                  <b>Farben aus dem Betrieb</b>
                  <ul>
                    {[["#2F4A3E", "Tannengrün"], ["#23262A", "Anthrazit"], ["#DCD8CF", "Kalkstein"], ["#F7F6F2", "Papier"]].map(([c, n], i) => (
                      <li key={c} style={{ ["--c" as string]: c, ["--i" as string]: i }}><i />{n}<small>{c}</small></li>
                    ))}
                  </ul>
                </div>
                {/* Ebene 4: Schriften */}
                <div className="lay-card lay-type">
                  <span className="lay-type__aa">Aa</span>
                  <span><b>Inter Tight</b><small>Überschrift · 600</small></span>
                  <span className="lay-type__mono"><b>IBM Plex Mono</b><small>Details · 400</small></span>
                </div>

                {/* Ebene 5: Handy, Anfrage, Kontaktwege */}
                <div className="lay-phone">
                  <div className="lay-phone__screen">
                    <Image src="/images/beispiele/beratungsbuero-mobile.png" alt="" fill sizes="180px" />
                  </div>
                </div>
                <div className="lay-toast">
                  <span className="lay-toast__icon"><Icon name="mail" size={16} /></span>
                  <span><b>Neue Anfrage</b><small>Erstgespräch · gerade eben</small></span>
                </div>
                <ul className="lay-paths">
                  {([["phone", "Anruf"], ["clipboard-list", "Formular"], ["calendar-days", "Termin"]] as const).map(([ic, t], i) => (
                    <li key={t} style={{ ["--i" as string]: i }}><Icon name={ic} size={14} />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ---------- Schritte ---------- */}
          <ol className="lay-steps">
            <span className="lay-rail" aria-hidden="true"><span className="lay-rail__fill" /></span>
            {STEPS.map((s, i) => (
              <li key={s.tag} className={`lay-step ${i + 1 === step ? "is-on" : ""} ${i + 1 < step ? "is-done" : ""}`}>
                <span className="lay-step__n">{nn(i + 1)} / {nn(N)} · {s.tag}</span>
                <h4 className="lay-step__title">{tidy(s.title)}</h4>
                <p className="lay-step__text">{tidy(s.text)}</p>
                {i === N - 1 && (
                  <div className="lay-step__actions">
                    <a className="btn" href={LIVE} target="_blank" rel="noopener" data-cursor>
                      <span className="btn__fill" aria-hidden="true" />
                      <span className="btn__label">Umraum live ansehen <Icon name="external-link" size={16} className="btn__icon btn__icon--right" /></span>
                    </a>
                    <a className="lay-step__more" href="#beispiele" data-cursor>Alle Beispiele <Icon name="arrow-right" size={14} /></a>
                    <small className="lay-step__note">Umraum ist ein fiktiver Betrieb, ein Musterdesign von Pfalz Multiservice.</small>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Nachbau der Umraum-Startseite in Ebenen: Drahtgitter (wf) → Marke → echter Text (tx) */
function Mock() {
  return (
    <div className="mk">
      <div className="mk-top"><span className="wf" /><span className="tx">Musterdesign · Fiktives Unternehmen</span></div>
      <div className="mk-nav">
        <span className="mk-logo"><span className="wf" /><span className="mk-logo__mark" /><span className="tx">Umraum</span></span>
        <span className="mk-links">
          {["Start", "Leistungen", "Projekte", "Ablauf", "Über uns", "Kontakt"].map((l, i) => (
            <span key={l} style={{ ["--i" as string]: i }}><span className="wf" /><span className="tx">{l}</span></span>
          ))}
        </span>
        <span className="mk-btn mk-btn--solid mk-btn--nav"><span className="wf" /><span className="tx">Erstgespräch vereinbaren</span></span>
        <em className="mk-tag" style={{ ["--i" as string]: 0 }}>Navigation</em>
      </div>
      <div className="mk-eyebrow"><span className="wf" /><span className="tx">Beratung &amp; Projektierung · Pfalz und Rhein-Neckar</span></div>
      <div className="mk-h1">
        <span className="wf wf--1" /><span className="wf wf--2" />
        <span className="tx"><span className="mk-line"><span>Aus Leerstand</span></span><span className="mk-line"><span>wird Zuhause.</span></span></span>
        <em className="mk-tag" style={{ ["--i" as string]: 1 }}>Kernbotschaft</em>
      </div>
      <div className="mk-lead">
        <span className="wf" /><span className="wf" /><span className="wf wf--s" />
        <span className="tx">Wir prüfen, rechnen und planen die Umnutzung leerstehender Büroflächen zu Wohnungen. Von der ersten Machbarkeitsstudie bis zur Übergabe der Schlüssel.</span>
        <em className="mk-tag" style={{ ["--i" as string]: 2 }}>Nutzen</em>
      </div>
      <div className="mk-ctas">
        <span className="mk-btn mk-btn--solid"><span className="wf" /><span className="tx">Leistungen ansehen →</span></span>
        <span className="mk-btn mk-btn--ghost"><span className="wf" /><span className="tx">Erstgespräch vereinbaren</span></span>
        <em className="mk-tag" style={{ ["--i" as string]: 3 }}>Anfrage</em>
      </div>
      <div className="mk-trust"><span className="wf" /><span className="tx">Für Eigentümer · Investoren · Kommunen</span>
        <em className="mk-tag" style={{ ["--i" as string]: 4 }}>Vertrauen</em></div>
      <div className="mk-img">
        <span className="mk-img__x" />
        <span className="mk-img__photo"><Image src="/images/schichten/umraum-haus.jpg" alt="" fill sizes="(max-width: 1080px) 40vw, 260px" /></span>
        <em className="mk-tag" style={{ ["--i" as string]: 5 }}>Bild</em>
      </div>
      <div className="mk-caption"><span className="wf" /><span className="tx">Bild 01 · Umgebautes Bürohaus mit neuen Balkonen</span></div>
    </div>
  );
}
