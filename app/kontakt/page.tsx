import type { Metadata } from "next";
import { CONTACT, CTA, IMG, SERVICES } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Anfrage an Pfalz Multiservice in Worms: per Formular, Telefon oder WhatsApp. Wir melden uns zeitnah mit einem passenden Lösungsvorschlag.",
  alternates: { canonical: "/kontakt" },
};

function Row({ icon, label, value, href }: { icon: IconName; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="contact-row__icon"><Icon name={icon} size={20} /></span>
      <div>
        <div className="contact-row__label">{label}</div>
        <div className="contact-row__value">{value}</div>
      </div>
    </>
  );
  return href
    ? <a className="contact-row" href={href} data-cursor {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
    : <div className="contact-row">{inner}</div>;
}

export default async function KontaktPage({ searchParams }: { searchParams: Promise<{ leistung?: string }> }) {
  const { leistung } = await searchParams;
  const initial = SERVICES.find((s) => s.id === leistung)?.title;

  return (
    <>
      <PageHero eyebrow="Kontakt" title={CTA.title} highlight={CTA.highlight} intro={CTA.intro} image={IMG + "lagergang.png"} crumbs={[{ label: "Kontakt" }]} />
      <section className="section">
        <div className="container split split--contact" style={{ gridTemplateColumns: "1fr 1.5fr", alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <SectionHeading eyebrow="Schnell erreichbar" title="Direkter" highlight="Kontakt" />
            <div className="stack pm-reveal" data-reveal="stagger" style={{ gap: 28 }}>
              <Row icon="phone" label="Telefon" value={CONTACT.phone} href={CONTACT.phoneHref} />
              <Row icon="message-circle" label="WhatsApp" value="Nachricht schreiben" href={CONTACT.whatsapp} />
              <Row icon="mail" label="E-Mail" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <Row icon="map-pin" label="Standort" value={CONTACT.city} />
              <div><Button variant="outline-light" iconLeft="message-circle" href={CONTACT.whatsapp}>WhatsApp-Chat starten</Button></div>
            </div>
          </div>
          <ContactForm initial={initial} />
        </div>
      </section>
    </>
  );
}
