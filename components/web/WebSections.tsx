import { lines, tidyNode } from "@/lib/typo";
import Link from "next/link";
import Image from "next/image";
import { CLASSIC_EXAMPLES, CONTACT, EXAMPLES, WEB_ADDONS, WEB_FAQ, WEB_CARE, WEB_HANDOVER, WEB_INCLUDED, WEB_PACKAGES, WEB_PROBLEMS, type WebPackage } from "@/lib/data";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { ClassicList } from "../ClassicShowcase";
import { ShowcaseList } from "../Showcase";
import { Faq } from "../Faq";

const TOTAL = CLASSIC_EXAMPLES.length + EXAMPLES.length;
const CHECK_TEXT = "Hallo, bitte prüfen Sie kostenlos meine Website: ";
export const WHATSAPP_CHECK = `${CONTACT.whatsapp}?text=${encodeURIComponent(CHECK_TEXT)}`;

export function WebTrust() {
  const items: [string, string][] = [
    ["Festpreis ab 99 €", "Sie kennen den Preis,\nbevor wir beginnen."],
    ["Kein Abo, kein Zwang", "Die Website gehört Ihnen."],
    ["Freigabe vor Livegang", "Nichts geht ohne Ihr OK online."],
    ["Persönlich aus Worms", "Ein fester Ansprechpartner\nstatt Hotline."],
  ];
  return (
    <div className="trust">
      <div className="container trust__grid trust__grid--4 pm-reveal" data-reveal="stagger">
        {items.map(([t, x]) => (
          <div key={t} className="trust__item">
            <Icon name="check" size={24} className="trust__icon" />
            <div>
              <span className="trust__title">{t}</span>
              <span className="trust__text">{lines(x)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WebProblem() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Kennen Sie das?" title="Gute Arbeit," highlight="online unsichtbar?"
          intro="Die meisten Kunden suchen zuerst im Internet. Wenn Ihre Website dort nicht überzeugt, landen sie beim Mitbewerber." style={{ marginBottom: 48 }} />
        <div className="prob-grid pm-reveal" data-reveal="stagger">
          {WEB_PROBLEMS.map(([t, x], i) => (
            <div key={t} className="prob">
              <span className="prob__num" aria-hidden="true" data-n={String(i + 1).padStart(2, "0")} />
              <h3 className="prob__title">{t}</h3>
              <p className="prob__text">{x}</p>
            </div>
          ))}
        </div>
        <div className="prob-solve pm-reveal" data-reveal="up">
          <p><strong>Wir übernehmen das.</strong> Sie kümmern sich um Ihre Kunden.</p>
          <Button variant="outline" icon="arrow-right" href="#website-check">Kostenloser Website-Check</Button>
        </div>
      </div>
    </section>
  );
}

export function WebExamples() {
  return (
    <section className="section section--alt" id="beispiele">
      <div className="container">
        <SectionHeading eyebrow="Musterdesigns" title="Unsere" highlight="Beispiele"
          intro={`${TOTAL} Websites für erfundene Betriebe aus der Region.\nKlassisch mit Menü oder als One-Pager mit Animationen. Öffnen Sie die Beispiele live und klicken Sie sich durch.`} />

        <div className="sc-group">
          <h3 className="sc-group__title">Klassische Websites <span>mit Menü und Unterseiten</span></h3>
          <span className="sc-group__count" aria-hidden="true" data-n={String(CLASSIC_EXAMPLES.length).padStart(2, "0")} />
        </div>
        <ClassicList total={TOTAL} grid />

        <div className="sc-group sc-group--later">
          <h3 className="sc-group__title">One-Pager <span>alles auf einer Seite, mit Animationen</span></h3>
          <span className="sc-group__count" aria-hidden="true" data-n={String(EXAMPLES.length).padStart(2, "0")} />
        </div>
        <ShowcaseList offset={CLASSIC_EXAMPLES.length} total={TOTAL} grid />

        {tidyNode(<p className="showcase-note" style={{ margin: "72px auto 0", textAlign: "center" }}>
          Alle gezeigten Betriebe, Personen und Angebote sind frei erfunden. Die Seiten sind Musterdesigns von Pfalz Multiservice.
        </p>)}
      </div>
    </section>
  );
}

function PackageCard({ p }: { p: WebPackage }) {
  return (
    <div className={`pk ${p.badge ? "pk--hi" : ""}`}>
      {p.badge && <span className="pk__badge">{p.badge}</span>}
      <h3 className="pk__name">{p.name}</h3>
      <p className={`pk__price ${/\d/.test(p.price) ? "" : "pk__price--req"}`}>{p.price}{p.unit && <span className="pk__unit"> {p.unit}</span>}</p>
      <p className="pk__note">{p.note}</p>
      <ul className="pk__list">
        {p.items.map((it) => (
          <li key={it}><Icon name="check" size={16} />
            {it.replace(/\u00A0/g, " ") === "Alle Inklusivleistungen" ? <a href="#inklusive" className="pk__link">Alle Inklusivleistungen</a>
              : it === "Übergabe-Paket" ? <a href="#uebergabe" className="pk__link">Übergabe-Paket inklusive</a> : <span>{lines(it)}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WebPackages() {
  return tidyNode(
    <section className="section" id="pakete">
      <div className="container">
        <SectionHeading align="center" eyebrow="Pakete & Preise" title="Was kostet" highlight="eine Website?"
          intro={"Klare Festpreise, damit Sie von Anfang an wissen, woran Sie sind.\nEinmaliger Festpreis, von der kompakten Visitenkarte bis zum Online-Shop."} style={{ marginBottom: 56 }} />
        <div className="pk-grid pm-reveal" data-reveal="stagger">
          {WEB_PACKAGES.map((p) => <PackageCard key={p.name} p={p} />)}
        </div>

        <div className="pk-boxes">
          <div className="pk-box pk-box--incl pm-reveal" data-reveal="up" id="inklusive">
            <span className="pk-box__eyebrow">In allen Paketen inklusive</span>
            <h3 className="pk-box__title">Ohne Aufpreis</h3>
            <p className="pk-box__intro">Damit Ihre Website von Anfang an gefunden wird und Anfragen bringt.</p>
            <ul className="pk-box__list">
              {WEB_INCLUDED.map((x) => <li key={x}><Icon name="check" size={16} /><span>{lines(x)}</span></li>)}
            </ul>
          </div>
          <div className="pk-box pm-reveal" data-reveal="up" id="zusatzleistungen">
            <span className="pk-box__eyebrow">Zusatzleistungen</span>
            <h3 className="pk-box__title">Optional zu jedem Paket</h3>
            <p className="pk-box__intro">Für einen Auftritt, der heraussticht.</p>
            <ul className="addons">
              {WEB_ADDONS.map((a) => (
                <li key={a.title} className="addon">
                  <span className="addon__icon"><Icon name={a.icon} size={20} /></span>
                  <span><b className="addon__title">{a.title}</b><span className="addon__text">{lines(a.text)}</span></span>
                </li>
              ))}
            </ul>
            <p className="pk-box__foot">Die Preise für Zusatzleistungen nennen wir Ihnen in Ihrem Angebot.</p>
          </div>
        </div>

        <div className="pk-box pk-box--handover pm-reveal" data-reveal="up" id="uebergabe">
          <span className="pk-box__eyebrow">Übergabe-Paket · in jedem Paket enthalten</span>
          <h3 className="pk-box__title">Ihre Website gehört Ihnen</h3>
          <p className="pk-box__intro">Kein Lock-in, keine Abhängigkeit: Sie bekommen alles, um Ihre Website selbst zu besitzen und jederzeit frei zu entscheiden.</p>
          <div className="handover">
            {WEB_HANDOVER.map((g) => (
              <div key={g.group} className="handover__group">
                <h4 className="handover__h">{g.group}</h4>
                <ul className="addons">
                  {g.items.map((a) => (
                    <li key={a.title} className="addon">
                      <span className="addon__icon"><Icon name={a.icon} size={20} /></span>
                      <span><b className="addon__title">{a.title}</b><span className="addon__text">{lines(a.text)}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="care" id="wartung">
          <SectionHeading align="center" eyebrow="Betreuung nach dem Livegang" title="Ihre Website bleibt" highlight="aktuell"
            intro="Sie melden Ihre Änderungen, wir setzen sie um. Monatlich kündbar." style={{ marginBottom: 48 }} />
          <div className="pk-grid pm-reveal" data-reveal="stagger">
            {WEB_CARE.map((p) => <PackageCard key={p.name} p={p} />)}
          </div>
          <div className="care__single pm-reveal" data-reveal="up">
            <span><b>Änderungen ohne Paket</b> einmalig 1 Std., reicht in der Regel für die meisten Änderungen</span>
            <strong>29 €</strong>
          </div>
        </div>

        <div className="pk-free pm-reveal" data-reveal="up">
          <Icon name="file-check" size={26} />
          <p><strong>Kein Abo, kein Zwang.</strong> Einmaliger Festpreis, keine versteckten Kosten, die Website gehört Ihnen. Laufende Kosten für Hosting und Domain tragen Sie direkt beim Anbieter Ihrer Wahl. Die Einrichtung übernehmen wir in Wartung Pro und Premium.</p>
        </div>
        <div className="cta__btns pm-reveal" data-reveal="stagger" style={{ marginTop: 48 }}>
          <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot anfordern</Button>
        </div>
      </div>
    </section>
  );
}

/** Kompakter Hinweis aufs Website-Briefing (unter dem Website-Check, auf der Kontaktseite) */
export function BriefingStrip({ title = "Website geplant?", text = "Füllen Sie unser Website-Briefing aus – in 15–20 Minuten, ohne Zeitdruck, mit Upload für Logo und Fotos. Danach erhalten Sie ein unverbindliches Festpreis-Angebot." }: { title?: string; text?: string }) {
  return tidyNode(
    <div className="bstrip pm-reveal" data-reveal="up">
      <span className="bstrip__icon" aria-hidden="true"><Icon name="clipboard-list" size={26} /></span>
      <div className="bstrip__txt">
        <b>{title}</b>
        <span>{text}</span>
      </div>
      <Button variant="accent" icon="arrow-right" href="/briefing">Briefing starten</Button>
    </div>
  );
}

/** Hinführung zum Online-Briefing: Text links, kleine Formular-Vorschau rechts */
export function WebBriefingTeaser() {
  return tidyNode(
    <section className="section section--alt" id="briefing">
      <div className="container split bft">
        <div className="stack" style={{ gap: 24 }}>
          <SectionHeading eyebrow="Schon entschieden?" title="Starten Sie mit dem" highlight="Website-Briefing"
            intro="Elf kurze Abschnitte zu Ihrem Betrieb, Ihren Zielen und Ihrem Wunsch-Design. Daraus erstellen wir Ihr unverbindliches Festpreis-Angebot." />
          <ul className="bft__facts pm-reveal" data-reveal="stagger">
            <li><Icon name="check" size={16} />ca. 15–20 Minuten, am Handy oder PC</li>
            <li><Icon name="check" size={16} />Kein Zeitlimit: Eingaben bleiben auf Ihrem Gerät gespeichert</li>
            <li><Icon name="check" size={16} />Logo, Fotos und Unterlagen direkt hochladen</li>
            <li><Icon name="check" size={16} />Nur Firma, Ansprechpartner und Kontakt sind Pflicht</li>
          </ul>
          <div className="pm-reveal" data-reveal="up" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Button variant="accent" icon="arrow-right" href="/briefing">Briefing ausfüllen</Button>
            <Button variant="outline" href="/kontakt?leistung=web">Lieber erst sprechen</Button>
          </div>
        </div>
        <Link href="/briefing" className="bft__preview pm-reveal" data-reveal="up" aria-label="Zum Website-Briefing" data-cursor>
          <span className="bft__top" aria-hidden="true">
            <span className="bft__step">Schritt 2 von 11</span>
            <span className="bft__bar"><i /></span>
          </span>
          <span className="bft__head" aria-hidden="true"><b>02</b> Ihr Unternehmen &amp; Angebot</span>
          <span className="bft__label" aria-hidden="true">Was macht Ihr Unternehmen?</span>
          <span className="bft__input" aria-hidden="true">Wir sind ein Familienbetrieb aus Worms und …<i /></span>
          <span className="bft__label" aria-hidden="true">Was soll die Website erreichen?</span>
          <span className="bft__chips" aria-hidden="true">
            <span className="is-on">Mehr Anfragen</span><span>Online verkaufen</span><span className="is-on">Vertrauen &amp; Image</span>
          </span>
          <span className="bft__label" aria-hidden="true">Logo &amp; Fotos</span>
          <span className="bft__drop" aria-hidden="true">Dateien hierher ziehen · bis 25 MB</span>
          <span className="bft__cta" aria-hidden="true">Weiter →</span>
        </Link>
      </div>
    </section>
  );
}

export function WebCheck() {
  const points = ["Darstellung auf dem Smartphone", "Ladezeit", "Auffindbarkeit bei Google", "Impressum & Datenschutz", "Kontaktwege für Anfragen"];
  return tidyNode(
    <section className="section section--alt" id="website-check">
      <div className="container split">
        <div className="stack" style={{ gap: 24 }}>
          <SectionHeading eyebrow="Kostenlos & unverbindlich" title="Kostenloser" highlight="Website-Check"
            intro="Sie haben schon eine Website? Schicken Sie uns den Link. Wir schauen kostenlos drüber und sagen Ihnen ehrlich, was wir verbessern würden." />
          <ul className="checklist pm-reveal" data-reveal="checks">
            {points.map((p) => (
              <li key={p}><span className="checklist__box"><Icon name="check" size={16} /></span><span className="checklist__txt">{p}</span></li>
            ))}
          </ul>
        </div>
        <div className="check-card pm-reveal" data-reveal="up">
          <span className="check-card__eyebrow">So einfach geht’s</span>
          <ol className="check-card__steps">
            <li><b>1</b>Link Ihrer Website senden</li>
            <li><b>2</b>Wir prüfen die Seite</li>
            <li><b>3</b>Sie erhalten eine ehrliche Einschätzung</li>
          </ol>
          <div className="check-card__btns">
            <Button variant="accent" iconLeft="message-circle" href={WHATSAPP_CHECK} fullWidth>Link per WhatsApp senden</Button>
            <Button variant="outline" iconLeft="mail" href="/kontakt?leistung=web" fullWidth>Per Formular senden</Button>
          </div>
          <p className="check-card__note">Ohne Verpflichtung. Sie entscheiden danach in Ruhe.</p>
        </div>
      </div>
      <div className="container" style={{ marginTop: 32 }}>
        <BriefingStrip title="Noch keine Website – oder lieber neu starten?" />
      </div>
    </section>
  );
}

export function WebFaq() {
  return <Faq items={WEB_FAQ} />;
}

/** Kompakter Teaser für Startseite und Leistungsseite: Referenz-Wand mit allen Beispielen */
export function WebTeaser({ alt = false }: { alt?: boolean }) {
  const shots = [
    ...CLASSIC_EXAMPLES.map((e) => ({ name: e.name, branch: e.branch, href: `/beispiele/${e.slug}${e.pages[0].path}`, img: `/images/beispiele/${e.slug}-${e.pages[0].key}.png` })),
    ...EXAMPLES.map((e) => ({ name: e.name, branch: e.branch, href: `/beispiele/${e.slug}`, img: `/images/beispiele/${e.slug}-scroll.png` })),
  ];
  return (
    <section className={`section ${alt ? "section--alt" : ""}`} id="webdesign">
      <div className="container">
        <div className="teaser-head">
          <SectionHeading eyebrow="Webdesign · ab 99 €" title="Websites, die" highlight="wirken"
            intro="Individuell gestaltet, zum Festpreis, persönlich betreut. Kein Abo, kein Zwang. Hier eine Auswahl unserer Musterdesigns." />
          <div className="pm-reveal" data-reveal="up">
            <Button variant="accent" icon="arrow-right" href="/webdesign">Zur Webdesign-Seite</Button>
          </div>
        </div>
        <div className="wall pm-reveal" data-reveal="cards">
          {shots.map((s) => (
            <a key={s.href} className="wall__item pm-card" href={s.href} target="_blank" rel="noopener" data-cursor aria-label={`${s.name} live ansehen (öffnet in neuem Tab)`}>
              <div className="wall__frame">
                <div className="sc-browser__bar" aria-hidden="true"><span className="sc-browser__dots"><i /><i /><i /></span></div>
                <div className="wall__view"><div className="card__parallax"><Image src={s.img} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 400px" /></div></div>
              </div>
              <span className="wall__meta"><b>{s.name}</b>{s.branch}<Icon name="external-link" size={15} /></span>
            </a>
          ))}
        </div>
        <p className="showcase-note" style={{ marginTop: 28 }}>Musterdesigns für erfundene Betriebe. <Link href="/webdesign#beispiele" style={{ color: "var(--brand-accent)" }}>Alle{"\u00A0"}Beispiele im{"\u00A0"}Detail</Link></p>
      </div>
    </section>
  );
}
