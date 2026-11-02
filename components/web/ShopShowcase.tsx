"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SHOP_EXAMPLE as ex } from "@/lib/data";
import { SITE } from "@/lib/site";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { Icon } from "../Icon";

const HOST = SITE.replace(/^https?:\/\//, "").replace(/^www\./, "");
const AUTOPLAY_MS = 3600;
const BASE = `/beispiele/${ex.slug}`;

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
      gsap.from(root.querySelectorAll(".shopf-phone"), { y: 60, rotate: 6, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: root.querySelector(".shopf-stage"), start: "top 70%", once: true } });
      return () => { st.kill(); setAuto(false); };
    });
    return () => mm.revert();
  }, { scope: ref });

  const select = (i: number) => { setAuto(false); setCur(i); };

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
                <span className="sc-browser__url">{HOST}{BASE}{page.path}</span>
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
            <p className="sc-text">{tidy(ex.text)}</p>
            <dl className="shopf-stats">
              {ex.stats.map(([n, l]) => (<div key={l}><dt>{n}</dt><dd>{l}</dd></div>))}
            </dl>
            <div className="shopf-actions">
              <a className="btn btn--lg" href={BASE} target="_blank" rel="noopener" data-cursor>
                <span className="btn__fill" aria-hidden="true" />
                <span className="btn__label">Shop live ansehen <Icon name="external-link" size={18} className="btn__icon btn__icon--right" /></span>
              </a>
              <Button variant="outline-light" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Eigenen Shop anfragen</Button>
            </div>
          </div>
        </div>

        <div className="shopf-feats-head">
          <h3 className="sc-group__title">Was Ihr Online-Shop alles kann <span>Alles im Muster ist echt bedienbar. Probieren Sie es aus.</span></h3>
        </div>
        <ul className="shopf-feats pm-reveal" data-reveal="stagger">
          {ex.features.map((f) => (
            <li key={f.title} className="shopf-feat">
              <span className="shopf-feat__icon"><Icon name={f.icon} size={22} /></span>
              <b className="shopf-feat__title">{f.title}</b>
              <span className="shopf-feat__text">{tidy(f.text)}</span>
            </li>
          ))}
        </ul>

        <div className="shopf-cta pm-reveal" data-reveal="up">
          <p><strong>Sie verkaufen etwas Besonderes?</strong> Wir bauen Ihren Shop genauso individuell: vom ruhigen Manufaktur-Shop bis zum Erlebnis-Shop. Paket „Shop / Premium“, Preis nach Angebot.</p>
          <Button variant="accent" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        </div>
        <p className="showcase-note" style={{ marginTop: 20 }}>KIRA KIRA ist ein fiktiver Shop. Produkte, Preise und Events sind erfunden, Marken- und Spielnamen stehen nur als Text.</p>
      </div>
    </section>
  );
}
