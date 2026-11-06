import { CORE, SERVICES, serviceHref } from "@/lib/data";
import { BgImage } from "../BgImage";
import { Eyebrow } from "../Eyebrow";
import { CheckList } from "../CheckList";
import { Button } from "../Button";

/**
 * Die Hauptleistungen als Kacheln (2 × 2): Foto als abgedunkelter Hintergrund wie auf der
 * Partnerseite, darüber Titel, ein Satz und drei Stichpunkte. Kacheln erscheinen per
 * data-reveal="cards", die Stichpunkte laufen per data-reveal="checks" nacheinander ein.
 */
export function Core() {
  return (
    <div className="container">
      <div className="core-tiles pm-reveal" data-reveal="cards">
        {CORE.map((c, i) => {
          const s = SERVICES.find((x) => x.id === c.id)!;
          return (
            <article key={c.id} className="core-tile pm-card">
              <BgImage className="core-tile__img" src={c.image ?? s.image} sizes="(max-width: 900px) 100vw, 50vw" />
              <div className="core-tile__scrim" aria-hidden="true" />
              <span className="core-tile__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="core-tile__body">
                <Eyebrow>{c.kicker}</Eyebrow>
                <h3 className="core-tile__title">{c.title}</h3>
                <p className="core-tile__lead">{c.text}</p>
                <div className="core-tile__points pm-reveal" data-reveal="checks">
                  <CheckList items={c.items.map((t) => ({ title: t }))} />
                </div>
                <div className="core-tile__cta">
                  <Button variant="outline" href={serviceHref(s)} icon="arrow-right">{c.link}</Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
