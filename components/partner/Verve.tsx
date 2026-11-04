import Image from "next/image";
import { PARTNER_VERVE as p } from "@/lib/data";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { Icon } from "../Icon";

const PAGE = `/partner/${p.slug}`;

/** Logo auf heller Platte: das Verve-Logo ist dunkel und braucht auf der dunklen Seite einen Grund */
export function VerveLogo({ width = 170 }: { width?: number }) {
  return (
    <span className="vv-logo">
      <Image src={p.logo} alt={p.name} width={width} height={Math.round(width * 0.2)} />
    </span>
  );
}

/** Website-Vorschau im Browser-Rahmen, verlinkt auf die echte Seite */
export function VerveBrowser({ priority = false }: { priority?: boolean }) {
  return (
    <a className="wall-feature__img vv-browser" href={p.url} target="_blank" rel="noopener" data-cursor aria-label={`${p.host} ansehen (öffnet in neuem Tab)`}>
      <div className="sc-browser__bar" aria-hidden="true">
        <span className="sc-browser__dots"><i /><i /><i /></span>
        <span className="sc-browser__url">{p.host}</span>
      </div>
      <div className="wall-feature__view">
        <Image src={p.website} alt={`Startseite von ${p.host}`} fill sizes="(max-width: 900px) 100vw, 620px" priority={priority} />
      </div>
    </a>
  );
}

/** Partner-Band für Startseite und Webdesign-Seite */
export function VerveFeature({ alt = false, eyebrow = "Partner aus der Region", title = "Echt statt", highlight = "Muster",
  intro = "Neben unseren Musterdesigns: ein langjähriger Partner aus Worms, für den wir die Website gestaltet haben und den wir bei allem Weiteren unterstützen." }:
  { alt?: boolean; eyebrow?: string; title?: string; highlight?: string; intro?: string }) {
  return (
    <section className={`section ${alt ? "section--alt" : ""}`} id="partner">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} intro={intro} style={{ marginBottom: 48 }} />
        <div className="wall-feature vv-feature pm-reveal" data-reveal="up">
          <VerveBrowser />
          <div className="wall-feature__copy">
            <span className="wall-feature__badge vv-badge">Partner · echtes Kundenprojekt</span>
            <VerveLogo />
            <span className="sc-branch">{p.branch}</span>
            <p>{tidy(p.text)}</p>
            <ul className="vv-awards">
              {p.awards.map((a) => <li key={a}><Icon name="star" size={14} />{a}</li>)}
            </ul>
            <div className="wall-feature__actions">
              <Button variant="accent" icon="arrow-right" href={PAGE}>Zur Partnerseite</Button>
              <Button variant="outline-light" icon="external-link" href={p.url}>{p.host}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Empfehlung auf Leistungsseiten: Unterkunft für Teams, die in Worms im Einsatz sind */
export function VerveTip() {
  return (
    <section className="section vv-tip-wrap">
      <div className="container">
        <aside className="vv-tip pm-reveal" data-reveal="up">
          <div className="vv-tip__img"><Image src={p.photos[0]} alt={`Unterkunft von ${p.name} in Worms`} fill sizes="(max-width: 900px) 100vw, 360px" /></div>
          <div className="vv-tip__copy">
            <span className="vv-tip__eyebrow">Tipp von unserem Partner</span>
            <h2 className="vv-tip__title">Ihr Team ist in Worms im Einsatz?</h2>
            <p>{tidy(`Unser Partner ${p.name} bringt Monteure, Projektteams und Geschäftsreisende unter: vier Wohnungen für bis zu 9 Personen, kontaktloser Check-in auch nachts, schnelles WLAN. ${p.direct}`)}</p>
            <div className="wall-feature__actions">
              <Button variant="accent" icon="external-link" href={p.audiences[0].href}>Unterkunft ansehen</Button>
              <Button variant="outline-light" href={PAGE}>Mehr zur Partnerschaft</Button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
