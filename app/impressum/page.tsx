import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Impressum", robots: { index: true, follow: true } };

export default function ImpressumPage() {
  return (
    <section className="section section--legal">
      <div className="container">
        <div className="legal">
          <SectionHeading level={1} size="h1" eyebrow="Rechtliches" title="" highlight="Impressum" />
          <div className="legal__stack stack pm-reveal" data-reveal="stagger" style={{ gap: 48 }}>
            <div>
              <h2>Angaben gemäß § 5 TMG</h2>
              <p>Pfalz Loadout<br />Wormser Landstraße 117, 67551 Worms, Deutschland</p>
            </div>
            <div>
              <h2>Vertreten durch:</h2>
              <p>Jasmin Beer</p>
            </div>
            <div>
              <h2>Kontakt:</h2>
              <p>Telefon: <a href="tel:+491605086983">+49 160 5086983</a><br />E-Mail: <a href="mailto:kontakt@pfalz-loadout.de">kontakt@pfalz-loadout.de</a></p>
            </div>
            <div>
              <h2>Umsatzsteuer-ID:</h2>
              <p>Umsatzsteuer-Identifikationsnummer(n): DE444410908</p>
            </div>
            <div><p>Kleinunternehmer gemäß § 19 UStG</p></div>
            <div><p>Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
