"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { CLASSIC_EXAMPLES, type ClassicExample } from "@/lib/data";
import { SITE } from "@/lib/site";
import { Icon } from "./Icon";

const HOST = SITE.replace(/^https?:\/\//, "").replace(/^www\./, "");
const AUTOPLAY_MS = 3800;

/** Klassische Websites mit Menü: Browser-Mockup mit Seiten-Umschalter */
export function ClassicList({ total, grid = false }: { total: number; grid?: boolean }) {
  return (
    <div className={`showcase${grid ? " showcase--grid" : ""}`}>
      {CLASSIC_EXAMPLES.map((e, i) => (
        <ClassicItem key={e.slug} ex={e} index={i} total={total} />
      ))}
    </div>
  );
}

function ClassicItem({ ex, index, total }: { ex: ClassicExample; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(false);
  const [visible, setVisible] = useState(false);
  const page = ex.pages[cur];
  const href = `/beispiele/${ex.slug}${page.path}`;
  const nr = String(index + 1).padStart(2, "0");
  const playing = auto && visible;

  // Automatisch durch die Unterseiten blättern, solange sichtbar und noch nicht angeklickt.
  // Der Timer startet bei jedem Seitenwechsel neu – synchron zum Fortschrittsbalken im Tab.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setCur((c) => (c + 1) % ex.pages.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, cur, ex.pages.length]);

  useGSAP(() => {
    const root = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.set(root.querySelectorAll(".pm-reveal"), { visibility: "visible" });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
      tl.from(root.querySelector(".sc-browser"), { y: 70, opacity: 0, duration: 1.4, ease: "expo.out" }, 0)
        .from(root.querySelectorAll(".cl-tab"), { y: 16, opacity: 0, stagger: 0.05, duration: 0.8 }, 0.35)
        .from(root.querySelectorAll(".sc-copy > *"), { y: 36, opacity: 0, stagger: 0.08, duration: 1.1 }, 0.2);
      const st = ScrollTrigger.create({
        trigger: root, start: "top 70%", end: "bottom 30%",
        onToggle: (self) => setVisible(self.isActive),
      });
      setAuto(true);
      return () => { st.kill(); setAuto(false); };
    });
    return () => mm.revert();
  }, { scope: ref });

  const select = (i: number) => { setAuto(false); setCur(i); };

  return (
    <article ref={ref} className={`sc-item ${index % 2 ? "sc-item--rev" : ""}`}>
      <div className="cl-stage">
        <div className="sc-browser pm-reveal">
          <div className="sc-browser__bar" aria-hidden="true">
            <span className="sc-browser__dots"><i /><i /><i /></span>
            <span className="sc-browser__url">{HOST}/beispiele/{ex.slug}{page.path}</span>
          </div>
          <a className="cl-view" href={href} target="_blank" rel="noopener" data-cursor
            aria-label={`${ex.name}, Seite ${page.label} live ansehen (öffnet in neuem Tab)`}>
            {ex.pages.map((p, i) => (
              <Image key={p.key} className={`cl-shot ${i === cur ? "is-on" : ""}`} src={`/images/beispiele/${ex.slug}-${p.key}.png`}
                alt={i === cur ? `Vorschau ${ex.name}, Seite ${p.label}` : ""} fill sizes="(max-width: 900px) 100vw, 800px" />
            ))}
          </a>
        </div>
        <div className="cl-tabs" role="tablist" aria-label={`Unterseiten von ${ex.name}`}>
          {ex.pages.map((p, i) => (
            <button key={p.key} type="button" role="tab" aria-selected={i === cur} className="cl-tab" onClick={() => select(i)} data-cursor>
              {p.label}
              {i === cur && playing && <span key={cur} className="cl-tab__prog" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>

      <div className="sc-copy">
        <span className="sc-index pm-reveal">{nr}<span> / {String(total).padStart(2, "0")}</span></span>
        <span className="sc-branch pm-reveal">{ex.branch}</span>
        <h3 className="sc-title pm-reveal">{ex.name}</h3>
        <p className="sc-text pm-reveal">{ex.text}</p>
        <ul className="sc-tags pm-reveal">
          {ex.tags.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <div className="pm-reveal">
          <a className="btn btn--outline" href={href} target="_blank" rel="noopener" data-cursor>
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__label">Live ansehen <Icon name="external-link" size={17} className="btn__icon btn__icon--right" /></span>
          </a>
        </div>
      </div>
    </article>
  );
}
