import Link from "next/link";
import { AREA, CTA, CONTACT, IMG, SERVICES, USPS, homeServiceOrder } from "@/lib/data";
import { bg } from "@/lib/bg";
import { SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../ServiceCard";
import { CheckList } from "../CheckList";
import { Button } from "../Button";
import { Eyebrow } from "../Eyebrow";
import { Icon } from "../Icon";

export function TrustStrip() {
  const ic = ["layers", "file-check", "map-pin"] as const;
  return (
    <div className="trust">
      <div className="container trust__grid pm-reveal" data-reveal="stagger">
        {USPS.map((u, i) => (
          <div key={u.title} className="trust__item">
            <Icon name={ic[i]} size={28} className="trust__icon" />
            <div>
              <span className="trust__title">{u.title}</span>
              <span className="trust__text">{u.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const side = SERVICES.filter((s) => s.side);
  return (
    <section className="section" id="leistungen">
      <div className="container">
        <SectionHeading
          align="center" eyebrow="Kompetenzbereiche" title="Unsere" highlight="Leistungen"
          intro="Kompetenzbereiche, einzeln buchbar oder als kombinierte Lösung." style={{ marginBottom: 56 }}
        />
        <div className="pm-reveal" data-reveal="cards">
          <div className="grid-3">
            {homeServiceOrder().map((s) => (
              <ServiceCard key={s.id} href={`/leistungen/${s.id}`} image={s.image} title={s.title} text={s.short} linkLabel="Details" />
            ))}
          </div>
          {side.map((s) => (
            <Link key={s.id} href={`/leistungen/${s.id}`} className="side-card pm-card" data-cursor>
              <div className="side-card__media">
                <div className="card__parallax"><div className="card__img pm-img" style={bg(s.image)} /></div>
              </div>
              <div className="side-card__body">
                <Eyebrow>Ergänzende Leistung</Eyebrow>
                <h3 className="side-card__title">{s.title}</h3>
                <p className="side-card__text">
                  {s.short}. KNX-Programmierung, Szenen und Visualisierung für Wohn- und Gewerbeobjekte.
                </p>
                <span className="card__link" style={{ color: "var(--brand-accent)" }}>
                  Details <Icon name="arrow-right" size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section section--alt" id="ueber">
      <div className="container split">
        <div className="stack" style={{ gap: 24 }}>
          <SectionHeading eyebrow="Inhabergeführt · Worms" title="Über" highlight="uns" />
          <div className="stack pm-reveal" data-reveal="stagger" style={{ gap: 24 }}>
            <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>
              Pfalz Loadout ist ein inhabergeführtes Dienstleistungsunternehmen mit Sitz in Worms, gewachsen aus dem E-Commerce. Die
              Erfahrung aus Handel, Logistik und digitalen Prozessen bildet heute die Grundlage für ein breites Dienstleistungsportfolio.
            </p>
            <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>
              Wir denken lösungsorientiert, arbeiten strukturiert und legen Wert auf langfristige Geschäftsbeziehungen.
            </p>
          </div>
          <div className="pm-reveal" data-reveal="checks"><CheckList items={USPS} /></div>
          <div className="stack pm-reveal" data-reveal="stagger" style={{ gap: 24 }}>
            <span style={{ font: "400 15px var(--font-body)", color: "var(--text-body)" }}>Mehrere Bereiche kombinieren? Sprechen Sie uns an.</span>
            <div style={{ display: "flex", gap: 14 }}>
              <Button href="/kontakt">Unverbindlich anfragen</Button>
            </div>
          </div>
        </div>
        <div className="media-frame pm-reveal" data-reveal="clip" style={{ aspectRatio: "4/3.4" }}>
          <div className="media-frame__img pm-img" data-clip-img data-parallax="8" style={bg(IMG + "lager-ware.png")} />
          <span className="media-frame__corner media-frame__corner--tl" />
          <span className="media-frame__corner media-frame__corner--br" />
        </div>
      </div>
    </section>
  );
}

export function Region() {
  return (
    <section className="section section--alt" id="region">
      <div className="container split split--region" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
        <div className="media-frame pm-reveal" data-reveal="clip" style={{ aspectRatio: "16/11" }}>
          <div className="media-frame__img pm-img" data-clip-img data-parallax="8" style={bg(IMG + "pfalz-landschaft.png")} />
        </div>
        <div className="stack" style={{ gap: 28 }}>
          <SectionHeading
            eyebrow="Region Worms" title="Unser" highlight="Einzugsgebiet"
            intro="Worms, Frankenthal, Ludwigshafen, Mannheim, Alzey, Grünstadt, Bensheim und Umgebung. Digitale Leistungen erbringen wir standortunabhängig im gesamten deutschsprachigen Raum."
          />
          <div className="chips pm-reveal" data-reveal="pop">
            {AREA.map((o) => (
              <span key={o} className="chip"><Icon name="map-pin" size={15} />{o}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ image }: { image?: string }) {
  return (
    <section className="cta">
      {image && (
        <div className="cta__bg" data-parallax="8">
          <div className="cta__img pm-img" style={bg(image)} />
        </div>
      )}
      <div className="cta__scrim" style={image ? undefined : { background: "transparent" }} />
      <div className="cta__inner">
        <SectionHeading dark align="center" eyebrow="Jetzt starten" title={CTA.title} highlight={CTA.highlight} intro={CTA.intro} />
        <div className="cta__btns pm-reveal" data-reveal="stagger">
          <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt">Unverbindlich anfragen</Button>
          <Button variant="outline-light" size="lg" iconLeft="phone" href={CONTACT.phoneHref}>{CONTACT.phone}</Button>
        </div>
      </div>
    </section>
  );
}
