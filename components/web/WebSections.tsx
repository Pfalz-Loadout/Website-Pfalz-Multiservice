import Link from "next/link";
import { CLASSIC_EXAMPLES, CONTACT, EXAMPLES, WEB_EXTRAS, WEB_FAQ, WEB_PACKAGES, WEB_PROBLEMS } from "@/lib/data";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { ClassicList } from "../ClassicShowcase";
import { ShowcaseList } from "../Showcase";

const TOTAL = CLASSIC_EXAMPLES.length + EXAMPLES.length;
const CHECK_TEXT = "Hallo, bitte prüfen Sie kostenlos meine Website: ";
export const WHATSAPP_CHECK = `${CONTACT.whatsapp}?text=${encodeURIComponent(CHECK_TEXT)}`;

export function WebTrust() {
  const items: [string, string][] = [
    ["Festpreis ab 99 €", "Sie kennen den Preis, bevor wir beginnen."],
    ["Kein Abo, kein Zwang", "Die Website gehört Ihnen."],
    ["Freigabe vor Livegang", "Nichts geht ohne Ihr OK online."],
    ["Persönlich aus Worms", "Ein fester Ansprechpartner statt Hotline."],
  ];
  return (
    <div className="trust">
      <div className="container trust__grid trust__grid--4 pm-reveal" data-reveal="stagger">
        {items.map(([t, x]) => (
          <div key={t} className="trust__item">
            <Icon name="check" size={24} className="trust__icon" />
            <div>
              <span className="trust__title">{t}</span>
              <span className="trust__text">{x}</span>
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
              <span className="prob__num">{String(i + 1).padStart(2, "0")}</span>
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
          intro={`${TOTAL} Websites für erfundene Betriebe aus der Region. Klassisch mit Menü oder als One-Pager mit Animationen. Öffnen Sie die Beispiele live und klicken Sie sich durch.`} />

        <div className="sc-group">
          <h3 className="sc-group__title">Klassische Websites <span>mit Menü und Unterseiten</span></h3>
          <span className="sc-group__count">{String(CLASSIC_EXAMPLES.length).padStart(2, "0")}</span>
        </div>
        <ClassicList total={TOTAL} />

        <div className="sc-group sc-group--later">
          <h3 className="sc-group__title">One-Pager <span>alles auf einer Seite, mit Animationen</span></h3>
          <span className="sc-group__count">{String(EXAMPLES.length).padStart(2, "0")}</span>
        </div>
        <ShowcaseList offset={CLASSIC_EXAMPLES.length} total={TOTAL} />

        <p className="showcase-note" style={{ margin: "72px auto 0", textAlign: "center" }}>
          Alle gezeigten Betriebe, Personen und Angebote sind frei erfunden. Die Seiten sind Musterdesigns von Pfalz Multiservice.
        </p>
      </div>
    </section>
  );
}

export function WebPackages() {
  return (
    <section className="section" id="pakete">
      <div className="container">
        <SectionHeading align="center" eyebrow="Pakete & Preise" title="Was kostet" highlight="eine Website?"
          intro="Sie zahlen nur für das, was Sie wirklich brauchen. Vorher besprechen wir gemeinsam den Umfang und nennen Ihnen einen Festpreis." style={{ marginBottom: 56 }} />
        <div className="pk-grid pm-reveal" data-reveal="stagger">
          {WEB_PACKAGES.map((p) => (
            <div key={p.name} className={`pk ${p.highlight ? "pk--hi" : ""}`}>
              {p.highlight && <span className="pk__badge">Festpreis</span>}
              <h3 className="pk__name">{p.name}</h3>
              <p className={`pk__price ${p.price.startsWith("ab") ? "" : "pk__price--req"}`}>{p.price}{p.unit && <span className="pk__unit"> {p.unit}</span>}</p>
              <p className="pk__note">{p.note}</p>
              <ul className="pk__list">
                {p.items.map((it) => <li key={it}><Icon name="check" size={16} />{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="pk-free pm-reveal" data-reveal="up">
          <Icon name="file-check" size={26} />
          <p><strong>Kein Abo, kein Zwang.</strong> Keine versteckten Kosten, keine Vertragsbindung. Die Website gehört Ihnen.</p>
        </div>
        <div className="pk-extras pm-reveal" data-reveal="pop">
          <span className="pk-extras__label">Auf Wunsch erweiterbar</span>
          {WEB_EXTRAS.map((x) => <span key={x} className="chip">{x}</span>)}
        </div>
        <div className="cta__btns pm-reveal" data-reveal="stagger" style={{ marginTop: 48 }}>
          <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot anfordern</Button>
        </div>
      </div>
    </section>
  );
}

export function WebCheck() {
  const points = ["Darstellung auf dem Smartphone", "Ladezeit", "Auffindbarkeit bei Google", "Impressum & Datenschutz", "Kontaktwege für Anfragen"];
  return (
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
    </section>
  );
}

export function WebFaq() {
  return (
    <section className="section" id="faq">
      <div className="container split split--faq" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 24 }}>
          <SectionHeading eyebrow="Häufige Fragen" title="Kurz" highlight="beantwortet" />
          <p className="pm-reveal" data-reveal="up" style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>
            Ihre Frage ist nicht dabei? Rufen Sie an oder schreiben Sie uns per WhatsApp.
          </p>
          <div className="pm-reveal" data-reveal="up" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Button variant="outline" iconLeft="phone" href={CONTACT.phoneHref}>{CONTACT.phone}</Button>
          </div>
        </div>
        <div className="faq pm-reveal" data-reveal="stagger">
          {WEB_FAQ.map(([q, a], i) => (
            <details key={q} className="faq__item" open={i === 0}>
              <summary className="faq__q" data-cursor>{q}<span className="faq__icon" aria-hidden="true" /></summary>
              <p className="faq__a">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
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
                <div className="wall__view"><div className="card__parallax"><img src={s.img} alt="" loading="lazy" decoding="async" /></div></div>
              </div>
              <span className="wall__meta"><b>{s.name}</b>{s.branch}<Icon name="external-link" size={15} /></span>
            </a>
          ))}
        </div>
        <p className="showcase-note" style={{ marginTop: 28 }}>Musterdesigns für erfundene Betriebe. <Link href="/webdesign#beispiele" style={{ color: "var(--brand-accent)" }}>Alle Beispiele im Detail</Link></p>
      </div>
    </section>
  );
}
