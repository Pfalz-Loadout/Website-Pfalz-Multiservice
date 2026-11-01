import { CORE, SERVICES, serviceHref } from "@/lib/data";
import { BgImage } from "../BgImage";
import { Eyebrow } from "../Eyebrow";
import { CheckList } from "../CheckList";
import { Button } from "../Button";

/**
 * Die drei Kernbereiche als große Blöcke, Bild und Text abwechselnd.
 * Animation wie überall auf der Seite: Bild per data-reveal="clip",
 * Häkchenliste per data-reveal="checks".
 */
export function Core() {
  return (
    <div className="core-list">
      {CORE.map((c, i) => {
        const s = SERVICES.find((x) => x.id === c.id)!;
        return (
          <div key={c.id} className={`container split core${i % 2 ? " core--rev" : ""}`}>
            <div className="stack" style={{ gap: 20 }}>
              <Eyebrow>{c.kicker}</Eyebrow>
              <h3 className="core__title">{c.title}</h3>
              <p className="core__text">{c.text}</p>
              <div className="pm-reveal" data-reveal="checks">
                <CheckList items={c.items.map((t) => ({ title: t }))} />
              </div>
              <div>
                <Button variant="outline" href={serviceHref(s)} icon="arrow-right">{c.link}</Button>
              </div>
            </div>
            <div className="media-frame core__media pm-reveal" data-reveal="clip" style={{ aspectRatio: "4/3" }}>
              <BgImage className="media-frame__img" data-clip-img="" data-parallax="8" src={s.image} sizes="(max-width: 900px) 100vw, 50vw" />
              <span className="media-frame__corner media-frame__corner--tl" />
              <span className="media-frame__corner media-frame__corner--br" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
