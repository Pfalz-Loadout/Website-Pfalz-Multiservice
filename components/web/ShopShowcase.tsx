"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SHOP_EXAMPLE as ex } from "@/lib/data";
import { EXAMPLES_URL, EXAMPLES_HOST } from "@/lib/site";
import { ExpandText } from "../ExpandText";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { Icon } from "../Icon";

const AUTOPLAY_MS = 3600;
const FEAT_MS = 2800;
const BASE = `${EXAMPLES_URL}/${ex.slug}`;
const BASE_SHOWN = `${EXAMPLES_HOST}/${ex.slug}`;

/** Neues Shop-Design: eigene Bühne auf der Webdesign-Seite, getrennt vom Beispiel-Raster */
export function ShopShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(false);
  const [visible, setVisible] = useState(false);
  const page = ex.pages[cur];
  const playing = auto && visible;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setCur((c) => (c + 1) % ex.pages.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, cur]);

  useGSAP(() => {
    const root = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const st = ScrollTrigger.create({ trigger: root.querySelector(".shopf-stage"), start: "top 75%", end: "bottom 25%", onToggle: (s) => setVisible(s.isActive) });
      setAuto(true);
      const st2 = ScrollTrigger.create({ trigger: root.querySelector(".shopf-spot"), start: "top 85%", end: "bottom 15%", onToggle: (s) => setFeatVisible(s.isActive) });
      setFeatAuto(true);
      gsap.from(root.querySelectorAll(".shopf-phone"), { y: 60, rotate: 6, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: root.querySelector(".shopf-stage"), start: "top 70%", once: true } });
      return () => { st.kill(); st2.kill(); setAuto(false); setFeatAuto(false); };
    });
    return () => mm.revert();
  }, { scope: ref });

  const select = (i: number) => { setAuto(false); setCur(i); };

  // Funktions-Spotlight: blättert automatisch, solange sichtbar und nicht angefasst
  const spotRef = useRef<HTMLDivElement>(null);
  const [feat, setFeat] = useState(0);
  const [featAuto, setFeatAuto] = useState(false);
  const [featVisible, setFeatVisible] = useState(false);
  const featPlaying = featAuto && featVisible;
  const pickFeat = (i: number) => { setFeatAuto(false); setFeat(i); };
  useEffect(() => {
    if (!featPlaying) return;
    const id = window.setTimeout(() => setFeat((f) => (f + 1) % ex.features.length), FEAT_MS);
    return () => window.clearTimeout(id);
  }, [featPlaying, feat]);
  // Handy: aktive Funktion in der wischbaren Chip-Zeile sichtbar halten (nur waagerecht, die Seite scrollt nicht mit)
  useEffect(() => {
    const list = spotRef.current?.querySelector<HTMLElement>(".shopf-list");
    const chip = list?.children[feat] as HTMLElement | undefined;
    if (!list || !chip || list.scrollWidth <= list.clientWidth + 2) return;
    const left = chip.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft - 16;
    list.scrollTo({ left, behavior: "smooth" });
  }, [feat]);

  return (
    <section ref={ref} className="section shopf" id="shop-design" aria-labelledby="shopf-title">
      <div className="shopf__glow" aria-hidden="true" />
      <div className="container">
        <div className="shopf-head">
          <SectionHeading eyebrow="Neu · Shop-Design" title="Online-Shops, die man" highlight="erleben will" intro={ex.claim} />
          <span className="shopf-badge pm-reveal" data-reveal="pop" aria-hidden="true">Neu</span>
        </div>

        <div className="shopf-main">
          <div className="shopf-stage">
            <div className="sc-browser">
              <div className="sc-browser__bar" aria-hidden="true">
                <span className="sc-browser__dots"><i /><i /><i /></span>
                <span className="sc-browser__url">{BASE_SHOWN}{page.path}</span>
              </div>
              <a className="cl-view" href={BASE + page.path} target="_blank" rel="noopener" data-cursor
                aria-label={`${ex.name}, Ansicht ${page.label} live ansehen (öffnet in neuem Tab)`}>
                {ex.pages.map((p, i) => (
                  <Image key={p.key} className={`cl-shot ${i === cur ? "is-on" : ""}`} src={`/images/beispiele/${ex.slug}-${p.key}.png`}
                    alt={i === cur ? `Vorschau ${ex.name}: ${p.label}` : ""} fill sizes="(max-width: 1080px) 100vw, 760px" priority={i === 0} />
                ))}
              </a>
            </div>
            <div className="shopf-phone" aria-hidden="true">
              <Image src={`/images/beispiele/${ex.slug}-mobile.png`} alt="" fill sizes="200px" />
            </div>
            <div className="cl-tabs" role="tablist" aria-label={`Ansichten von ${ex.name}`}>
              {ex.pages.map((p, i) => (
                <button key={p.key} type="button" role="tab" aria-selected={i === cur} className="cl-tab" onClick={() => select(i)} data-cursor>
                  {p.label}
                  {i === cur && playing && <span key={cur} className="cl-tab__prog" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>

          <div className="shopf-copy">
            <span className="sc-branch">{ex.branch}</span>
            <h3 className="sc-title" id="shopf-title">{ex.name}</h3>
            <ExpandText className="sc-text" text={tidy(ex.text)} />
            <dl className="shopf-stats">
              {ex.stats.map(([n, l]) => (<div key={l}><dt>{n}</dt><dd>{l}</dd></div>))}
            </dl>
            <div className="shopf-actions">
              <a className="btn btn--lg" href={BASE} target="_blank" rel="noopener" data-cursor>
                <span className="btn__fill" aria-hidden="true" />
                <span className="btn__label">Shop live ansehen <Icon name="external-link" size={18} className="btn__icon btn__icon--right" /></span>
              </a>
            </div>
          </div>
        </div>

        <div className="shopf-spot" ref={spotRef}>
          <div className="shopf-spot__side">
            <h3 className="shopf-spot__title">Was Ihr Online-Shop alles kann</h3>
            <ul className="shopf-list" aria-label="Funktionen">
              {ex.features.map((f, i) => (
                <li key={f.title}>
                  <button type="button" className={`shopf-li ${i === feat ? "is-on" : ""}`} aria-pressed={i === feat} aria-controls="shopf-card"
                    onClick={() => pickFeat(i)} onMouseEnter={() => pickFeat(i)} onFocus={() => pickFeat(i)} data-cursor>
                    <Icon name={f.icon} size={16} />
                    <span>{f.title}</span>
                    {i === feat && featPlaying && <i key={feat} className="shopf-li__prog" aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="shopf-card" id="shopf-card">
            <div key={feat} className="shopf-card__in">
              <span className="shopf-card__n" aria-hidden="true">{String(feat + 1).padStart(2, "0")}<small> / {ex.features.length}</small></span>
              <span className="shopf-card__icon"><Icon name={ex.features[feat].icon} size={28} /></span>
              <b className="shopf-card__title">{ex.features[feat].title}</b>
              <p className="shopf-card__text">{tidy(ex.features[feat].text)}</p>
            </div>
            <p className="shopf-card__hint">Alles im Muster ist echt bedienbar.</p>
          </div>
        </div>

        <div className="shopf-cta pm-reveal" data-reveal="up">
          <p><strong>Sie verkaufen etwas Besonderes?</strong> Wir bauen Ihren Shop genauso individuell: vom ruhigen Manufaktur-Shop bis zum Erlebnis-Shop. Paket „Shop / Premium“, Preis nach Angebot.</p>
          <Button variant="accent" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        </div>
      </div>
    </section>
  );
}
