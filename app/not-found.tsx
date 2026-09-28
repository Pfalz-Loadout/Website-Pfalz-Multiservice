import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="section section--legal" style={{ minHeight: "70vh" }}>
      <div className="container stack" style={{ gap: 32 }}>
        <SectionHeading level={1} size="h1" eyebrow="Fehler 404" title="Seite nicht" highlight="gefunden"
          intro="Die aufgerufene Adresse existiert nicht oder wurde verschoben." />
        <div className="pm-reveal" data-reveal="up"><Button href="/" variant="accent">Zur Startseite</Button></div>
      </div>
    </section>
  );
}
