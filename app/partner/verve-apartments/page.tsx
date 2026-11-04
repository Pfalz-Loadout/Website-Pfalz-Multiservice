import { social } from "@/lib/social";
import type { Metadata } from "next";
import Image from "next/image";
import { PARTNER_VERVE as p } from "@/lib/data";
import { SITE } from "@/lib/site";
import { tidy } from "@/lib/typo";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { CtaBand } from "@/components/home/HomeSections";
import { VerveBrowser, VerveLogo } from "@/components/partner/Verve";

const PATH = `/partner/${p.slug}`;
const description = "Verve Apartments aus Worms: langjähriger Partner von Pfalz Multiservice. Webdesign, Unterstützung rund um die Immobilien und Lösungen für jedes Anliegen.";

export const metadata: Metadata = {
  title: "Partner: Verve Apartments Worms",
  description,
  alternates: { canonical: PATH },
  ...social({ path: PATH, title: "Partner: Verve Apartments Worms · Pfalz Multiservice", description, image: "/og/webdesign.jpg", alt: "Verve Apartments, Partner von Pfalz Multiservice" }),
};

const WEBSITE_POINTS = [
  "Direktbuchung mit Bestpreis, günstiger als auf den Portalen",
  "Eigene Seite für jede der vier Unterkünfte",
  "Bereiche für Familien, Gruppen, Geschäftsreisende und Projektteams",
  "Verifizierte Gästebewertungen direkt auf der Seite",
  "Tipps für den Aufenthalt und für Worms",
];

export default function VervePage() {
  const lodging = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: p.name,
    url: `https://${p.host}`,
    image: `${SITE}${p.hero}`,
    address: { "@type": "PostalAddress", addressLocality: "Worms", addressCountry: "DE" },
  };

  return (
    <>
      <JsonLd data={[lodging, breadcrumb([{ name: "Partner: Verve Apartments", path: PATH }])]} />
      <PageHero
        eyebrow="Partner aus der Region"
        title="Verve"
        highlight="Apartments"
        intro={p.short}
        image={p.hero}
      >
        <Button variant="accent" size="lg" icon="external-link" href={p.url}>{p.host} besuchen</Button>
        <Button variant="outline-light" size="lg" href="#website">Die Website ansehen</Button>
      </PageHero>

      <section className="section">
        <div className="container split" style={{ gridTemplateColumns: "1.1fr 1fr", alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <div className="pm-reveal" data-reveal="up"><VerveLogo width={220} /></div>
            <SectionHeading eyebrow="Seit vielen Jahren" title="Eng" highlight="verbunden" intro={p.text} />
          </div>
          <div className="stack" style={{ gap: 20 }}>
            <dl className="vv-facts pm-reveal" data-reveal="cards">
              {p.facts.map(([v, k]) => <div key={k} className="pm-card"><dt>{v}</dt><dd>{k}</dd></div>)}
            </dl>
            <ul className="vv-awards vv-awards--lg pm-reveal" data-reveal="up">
              {p.awards.map((a) => <li key={a}><Icon name="star" size={15} />{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="website">
        <div className="container">
          <div className="wall-feature vv-feature pm-reveal" data-reveal="up">
            <VerveBrowser />
            <div className="wall-feature__copy">
              <span className="wall-feature__badge vv-badge">Webdesign · echtes Kundenprojekt</span>
              <h2 className="wall-feature__title">{p.host}</h2>
              <ul className="vv-list">
                {WEBSITE_POINTS.map((t) => <li key={t}><Icon name="check" size={16} />{tidy(t)}</li>)}
              </ul>
              <div className="wall-feature__actions">
                <Button variant="accent" icon="arrow-right" href="/kontakt?leistung=web">Ähnliche Website anfragen</Button>
                <Button variant="outline-light" icon="external-link" href={p.url}>Live ansehen</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section vv-direct">
        <div className="container">
          <div className="vv-photos pm-reveal" data-reveal="cards">
            {p.photos.map((src, i) => (
              <a key={src} className="vv-photos__item pm-card" href={p.url} target="_blank" rel="noopener" data-cursor aria-label={`Unterkünfte von ${p.name} ansehen (öffnet in neuem Tab)`}>
                <Image src={src} alt={`Unterkunft von ${p.name} in Worms, Bild ${i + 1}`} fill sizes="(max-width: 640px) 50vw, 25vw" />
              </a>
            ))}
          </div>
          <div className="vv-direct__box">
            <SectionHeading eyebrow="Unterkunft in Worms" title="Direkt buchen," highlight="günstiger wohnen" intro={p.direct} />
            <div className="chips pm-reveal" data-reveal="pop">
              {p.audiences.map((a) => (
                <a key={a.label} className="chip" href={a.href} target="_blank" rel="noopener" data-cursor>{a.label}<Icon name="external-link" size={14} /></a>
              ))}
            </div>
            <div className="pm-reveal" data-reveal="up">
              <Button variant="accent" size="lg" icon="external-link" href={p.url}>Jetzt auf {p.host} buchen</Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        image={p.hero}
        intro={<>Sie vermieten selbst Ferien- oder Monteurwohnungen?<br />Website mit Direktbuchung, Betreuung und Lösungen aus einer Hand.</>}
      />
    </>
  );
}
