import type { Faq as FaqItem } from "@/lib/data";
import { CONTACT } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";

/** Aufklappbare FAQ-Liste (FAQPage-Markup setzt die jeweilige Seite) */
export function Faq({ items, alt = false, id = "faq" }: { items: FaqItem[]; alt?: boolean; id?: string }) {
  return (
    <section className={`section${alt ? " section--alt" : ""}`} id={id}>
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
          {items.map(([q, a], i) => (
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
