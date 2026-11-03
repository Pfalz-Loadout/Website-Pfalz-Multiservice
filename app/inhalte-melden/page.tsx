import type { Metadata } from "next";
import { social } from "@/lib/social";
import { tidyNode } from "@/lib/typo";
import { SectionHeading } from "@/components/SectionHeading";
import { ReportForm } from "@/components/ReportForm";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { CONTACT } from "@/lib/data";

const DESC = "Rechtswidrige Inhalte auf Websites melden, die Pfalz Multiservice für Kunden hostet: Meldeverfahren nach Art. 16 Digital Services Act.";

export const metadata: Metadata = {
  title: "Rechtswidrige Inhalte melden",
  description: DESC,
  alternates: { canonical: "/inhalte-melden" },
  ...social({ path: "/inhalte-melden", title: "Rechtswidrige Inhalte melden · Pfalz Multiservice", description: DESC }),
  robots: { index: true, follow: true },
};

export default function InhalteMeldenPage() {
  return (
    <section className="section section--legal">
      <JsonLd data={breadcrumb([{ name: "Rechtswidrige Inhalte melden", path: "/inhalte-melden" }])} />
      <div className="container">
        <div className="legal">
          <div className="stack" style={{ gap: 12 }}>
            <SectionHeading level={1} size="h1" eyebrow="Rechtliches" title="Inhalte" highlight="melden" />
            <span className="legal__date">Meldeverfahren nach Art. 16 Digital Services Act (DSA)</span>
          </div>
          {tidyNode(<>
            <div className="legal__block">
              <h2>Wann Sie uns schreiben können</h2>
              <p>Im Wartungspaket Premium betreiben wir das Hosting für Websites unserer Kunden. Wenn Sie auf einer solchen Website einen Inhalt finden, den Sie für rechtswidrig halten, können Sie ihn hier melden. Für diese Website selbst genügt eine Nachricht über das <a href="/kontakt">Kontaktformular</a>.</p>
            </div>
            <div className="legal__block">
              <h2>Das sollte Ihre Meldung enthalten</h2>
              <ul>
                <li>Eine Begründung, warum Sie den Inhalt für rechtswidrig halten.</li>
                <li>Die genaue elektronische Adresse (URL) des Inhalts.</li>
                <li>Ihren Namen und Ihre E-Mail-Adresse. Bei Meldungen zu bestimmten Straftaten, etwa Kindesmissbrauch, ist die Angabe nicht erforderlich.</li>
                <li>Die Erklärung, dass Ihre Angaben nach Ihrer Überzeugung richtig und vollständig sind.</li>
              </ul>
            </div>
            <ReportForm />
            <div className="legal__block">
              <h2>Wie es danach weitergeht</h2>
              <p>Wir bestätigen den Eingang Ihrer Meldung per E-Mail, prüfen sie sorgfältig und objektiv und teilen Ihnen unsere Entscheidung mit Begründung mit. Dabei weisen wir Sie auf die möglichen Rechtsbehelfe hin. Wird ein Inhalt gesperrt oder entfernt, informieren wir auch den betroffenen Kunden mit Begründung.</p>
            </div>
            <div className="legal__block">
              <h2>Kontaktstelle</h2>
              <p>Behörden und Nutzer erreichen uns für Fragen zum Digital Services Act unter <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Wir antworten auf Deutsch und Englisch.</p>
            </div>
          </>)}
        </div>
      </div>
    </section>
  );
}
