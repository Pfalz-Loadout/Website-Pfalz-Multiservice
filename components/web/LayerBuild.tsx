"use client";
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/600.css";
import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { Icon } from "../Icon";


const STEPS: { tag: string; stage: string; title: string; text: string }[] = [
  { tag: "Struktur", stage: "Raster", title: "Erst das Raster, dann das Design.",
    text: "Jede Website steht auf einem festen Raster. So wirkt sie auf dem Handy genauso aufgeräumt wie am großen Bildschirm." },
  { tag: "Nutzerführung", stage: "Wireframe", title: "Der Weg zur Anfrage kommt zuerst.",
    text: "Im Wireframe legen wir fest, was Besucher in welcher Reihenfolge sehen: Leistung, Vertrauen, Anfrage." },
  { tag: "Marke", stage: "Bild & Farbe", title: "Farben und Bilder aus Ihrem Betrieb.",
    text: "Farben, Formen und Fotos kommen aus Ihrem Unternehmen, nicht aus einem Baukasten." },
  { tag: "Texte", stage: "Typografie", title: "Überschriften, die auf den Punkt kommen.",
    text: "Texte, die die Fragen Ihrer Kunden beantworten: kurz, konkret, mit Fakten statt Floskeln." },
  { tag: "Ergebnis", stage: "Fertig", title: "Alles zusammen: eine Website, die Anfragen bringt.",
    text: "Unser Musterdesign „Umraum“ auf Laptop und Handy. Anruf, Formular und Termin sind von überall erreichbar." },
];
const N = STEPS.length;
const nn = (i: number) => String(i).padStart(2, "0");
const v = (o: Record<string, string | number>) => o as CSSProperties;

const LINKS: [string, number][] = [["Start", 3.1], ["Leistungen", 5.7], ["Projekte", 4.5], ["Ablauf", 3.7], ["Über uns", 4.6], ["Kontakt", 4.3]];

/** „Schicht für Schicht“: Titel und Bühne bleiben stehen, beim Scrollen wechseln die Schritte; vier Ebenen in 3D klappen am Ende zur fertigen Website (Musterdesign Umraum) zusammen */
export function LayerBuild() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);

  useGSAP(() => {
    const root = ref.current!;
    const tilt = root.querySelector<HTMLElement>(".l3-tilt")!;
    const scene = root.querySelector<HTMLElement>(".l3-scene")!;
    // Ein einziger Trigger über die ganze Strecke: Schritt aus dem Fortschritt (auch bei schnellem Scrollen stabil)
    const st = ScrollTrigger.create({
      trigger: root.querySelector(".lay-track"), start: "top top", end: "bottom bottom",
      onUpdate: (self) => setStep(Math.min(N, Math.floor(self.progress * N) + 1)),
    });
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (pointer: fine)`, () => {
      // Leichte Neigung zur Maus, direkt auf dem Transform (kein Neuberechnen der ganzen Szene)
      const rx = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = scene.getBoundingClientRect();
        rx(((e.clientX - r.left) / r.width - 0.5) * 8);
        ry(((e.clientY - r.top) / r.height - 0.5) * -6);
      };
      const leave = () => { rx(0); ry(0); };
      scene.addEventListener("pointermove", move);
      scene.addEventListener("pointerleave", leave);
      return () => { scene.removeEventListener("pointermove", move); scene.removeEventListener("pointerleave", leave); };
    });
    return () => { st.kill(); mm.revert(); };
  }, { scope: ref });

  const cls = Array.from({ length: step }, (_, i) => `s${i + 1}`).join(" ");

  return (
    <section ref={ref} className="lay" id="schicht-fuer-schicht" aria-labelledby="lay-title" style={v({ "--steps": N })}>
      <div className="lay-track">
        <div className="lay-pin">
          <div className="lay__glow" aria-hidden="true" />
          <div className="container lay-grid">
            <div className="lay-left">
              <div className="lay-head">
                <SectionHeading eyebrow="Schicht für Schicht" title="So entsteht Ihre" highlight="neue Website"
                  intro="Geplant wie ein Haus: erst das Fundament, dann die Räume, dann die Einrichtung." />
              </div>
              <h3 className="sr-only" id="lay-title">Die fünf Schichten einer Website</h3>
              <ol className="lay-steps">
                {STEPS.map((s, i) => (
                  <li key={s.tag} className={`lay-step ${i + 1 === step ? "is-on" : ""} ${i + 1 < step ? "is-done" : ""}`} aria-current={i + 1 === step ? "step" : undefined}>
                    <span className="lay-step__n">{s.tag}</span>
                    <h4 className="lay-step__title">{tidy(s.title)}</h4>
                    <p className="lay-step__text">{tidy(s.text)}</p>
                    {i === N - 1 && (
                      <div className="lay-step__actions">
                        <a className="lay-step__more" href="#beispiele" data-cursor tabIndex={i + 1 === step ? 0 : -1}>Alle Beispiele <Icon name="arrow-right" size={14} /></a>
                        <small className="lay-step__note">Umraum ist ein fiktiver Betrieb, ein Musterdesign von Pfalz Multiservice.</small>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className={`lay-stage ${cls}`} data-step={step} aria-hidden="true">
              <div className="lay-hud">
                <span key={step} className="lay-hud__n">{nn(step)} / {nn(N)}</span>
                <span key={"t" + step} className="lay-hud__t">{STEPS[step - 1].stage}</span>
                <span className="lay-hud__dots">{STEPS.map((_, i) => <i key={i} className={i < step ? "on" : ""} />)}</span>
              </div>

              <div className="l3-scene">
                <div className="l3-floor" />
                <div className="l3-tilt">
                  <div className="l3-stack">
                    <div className="l3-bezel" /><i className="l3-cam" /><div className="l3-base"><i className="l3-notch" /></div>
                    <GridPlane />
                    <WirePlane />
                    <BrandPlane />
                    <TextPlane />
                    <div className="pl pl--final" style={v({ "--z": 4 })}>
                      <Image src="/images/beispiele/beratungsbuero-start.png" alt="" fill sizes="(max-width: 1080px) 92vw, 640px" />
                    </div>
                  </div>
                  <Phone />
                </div>

                <div className="lay-card lay-swatch">
                  <span className="lay-swatch__title">Farbpalette</span>
                  <div className="lay-swatch__row">
                    {[["#2F4A3E", "Tannengrün"], ["#23262A", "Anthrazit"], ["#DCD8CF", "Kalkstein"], ["#F7F6F2", "Papier"]].map(([c, n], i) => (
                      <span key={c} className="sw" style={v({ "--c": c, "--i": i })}>
                        <span className="sw__slot"><i className="sw__chip" /><b className="sw__tick"><Icon name="check" size={9} /></b></span>
                        <small>{n}</small>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lay-card lay-type">
                  <span className="lay-type__aa">Aa</span>
                  <span><b>Inter Tight</b><small>IBM Plex Mono</small></span>
                </div>

                <div className="lay-toast">
                  <span className="lay-toast__icon"><Icon name="mail" size={14} /></span>
                  <span><b>Neue Anfrage</b><small>Erstgespräch · gerade eben</small></span>
                </div>
                <ul className="lay-paths">
                  {([["phone", "Anruf"], ["clipboard-list", "Formular"], ["calendar-days", "Termin"]] as const).map(([ic, t], i) => (
                    <li key={t} style={v({ "--i": i })}><Icon name={ic} size={13} />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Smartphone wie bei den Musterbeispielen: maximales Display, schmaler Rand */
function Phone() {
  return (
    <div className="lay-phone">
      <Image src="/images/beispiele/beratungsbuero-mobile.png" alt="" fill sizes="170px" />
    </div>
  );
}

function Chip({ n, t }: { n: number; t: string }) {
  return <span className="pl-chip"><b>{nn(n)}</b>{t}</span>;
}

/** Ebene 1: Fundament mit 12-Spalten-Raster */
function GridPlane() {
  return (
    <div className="pl pl--grid" style={v({ "--z": 0, "--n": 1 })}>
      <Chip n={1} t="Raster" />
      <div className="pl-cols">{Array.from({ length: 12 }, (_, i) => <i key={i} style={v({ "--i": i })} />)}</div>
    </div>
  );
}

/** Ebene 2: Drahtgitter mit Beschriftung */
function WirePlane() {
  return (
    <div className="pl pl--wire" style={v({ "--z": 1, "--n": 2 })}>
      <Chip n={2} t="Wireframe" />
      <div className="p-nav">
        <span className="p-logo"><i className="w" /></span>
        <span className="p-links">{LINKS.map(([l, w]) => <span key={l} style={v({ "--w": w })}><i className="w w--thin" /></span>)}</span>
        <span className="p-btn p-btn--nav w-box"><i className="w w--thin" /></span>
      </div>
      <div className="p-eyebrow"><i className="w w--thin" style={v({ "--w": 28 })} /></div>
      <div className="p-h1"><i className="w w--h1" style={v({ "--w": 37 })} /><i className="w w--h1" style={v({ "--w": 33 })} /></div>
      <div className="p-lead">{[30, 31, 28, 12].map((w, i) => <i key={i} className="w w--txt" style={v({ "--w": w })} />)}</div>
      <div className="p-ctas"><span className="p-btn p-btn--a w-box" /><span className="p-btn p-btn--b w-box" /></div>
      <div className="p-trust"><i className="w w--thin" style={v({ "--w": 22 })} /></div>
      <div className="p-img w-box w-x" />
      <em className="p-tag" style={v({ "--i": 0, top: "8%", left: "30%" })}>Navigation</em>
      <em className="p-tag" style={v({ "--i": 1, top: "41%", left: "46%" })}>Kernbotschaft</em>
      <em className="p-tag" style={v({ "--i": 2, top: "78%", left: "40%" })}>Anfrage</em>
      <em className="p-tag" style={v({ "--i": 3, top: "52%", left: "70%" })}>Bild</em>
    </div>
  );
}

/** Ebene 3: Marke – Farben, Logo, Foto */
function BrandPlane() {
  return (
    <div className="pl pl--brand" style={v({ "--z": 2, "--n": 3 })}>
      <Chip n={3} t="Bild & Farbe" />
      <div className="p-strip" />
      <div className="p-nav p-nav--line">
        <span className="p-logo"><span className="p-mark" /></span>
        <span />
        <span className="p-btn p-btn--nav b-solid" />
      </div>
      <div className="p-ctas"><span className="p-btn p-btn--a b-solid" /><span className="p-btn p-btn--b b-ghost" /></div>
      <div className="p-trust p-trust--line" />
      <div className="p-img b-photo"><Image src="/images/schichten/umraum-haus.jpg" alt="" fill sizes="(max-width: 1080px) 32vw, 220px" /></div>
    </div>
  );
}

/** Ebene 4: Texte */
function TextPlane() {
  return (
    <div className="pl pl--text" style={v({ "--z": 3, "--n": 4 })}>
      <Chip n={4} t="Typografie" />
      <div className="p-strip t-mono t-center">Musterdesign · Fiktives Unternehmen</div>
      <div className="p-nav">
        <span className="p-logo t-logo">Umraum</span>
        <span className="p-links">{LINKS.map(([l, w]) => <span key={l} className="t-link" style={v({ "--w": w })}>{l}</span>)}</span>
        <span className="p-btn p-btn--nav t-btn t-btn--light">Erstgespräch vereinbaren</span>
      </div>
      <div className="p-eyebrow t-mono">Beratung &amp; Projektierung · Pfalz und Rhein-Neckar</div>
      <div className="p-h1 t-h1"><span className="t-line"><span>Aus Leerstand</span></span><span className="t-line"><span>wird Zuhause.</span></span></div>
      <div className="p-lead t-lead">Wir prüfen, rechnen und planen die Umnutzung leerstehender Büroflächen zu Wohnungen. Von der ersten Machbarkeitsstudie bis zur Übergabe der Schlüssel.</div>
      <div className="p-ctas"><span className="p-btn p-btn--a t-btn t-btn--light">Leistungen ansehen →</span><span className="p-btn p-btn--b t-btn">Erstgespräch vereinbaren</span></div>
      <div className="p-trust t-mono">Für Eigentümer · Investoren · Kommunen</div>
      <div className="p-cap t-mono">Bild 01 · Umgebautes Bürohaus mit neuen Balkonen</div>
    </div>
  );
}
