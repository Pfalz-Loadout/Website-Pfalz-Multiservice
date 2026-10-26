import type { Metadata } from "next";
import { IMG, WEB_FAQ, WEB_STEPS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Process } from "@/components/home/Process";
import { CtaBand } from "@/components/home/HomeSections";
import { WebCheck, WebExamples, WebFaq, WebPackages, WebProblem, WebTrust } from "@/components/web/WebSections";

const description =
  "Website erstellen lassen in Worms und der Pfalz: individuelles Webdesign zum Festpreis ab 99 €, ohne Abo und Vertragsbindung. Beispiele ansehen, kostenloser Website-Check.";

export const metadata: Metadata = {
  title: "Webdesign Worms · Website erstellen lassen ab 99 €",
  description,
  alternates: { canonical: "/webdesign" },
  openGraph: { type: "website", url: "/webdesign", title: "Webdesign Worms · Pfalz Multiservice", description,
    images: [{ url: "/images/beispiele/seifenmanufaktur-start.png", alt: "Webdesign-Beispiel Honigstück" }] },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: WEB_FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webdesign & Website-Erstellung",
  serviceType: "Webdesign",
  provider: { "@id": `${SITE}/#business` },
  areaServed: ["Worms", "Pfalz"],
  offers: { "@type": "Offer", name: "One-Page-Website", price: "99", priceCurrency: "EUR", description: "Ab-Preis, Festpreis" },
};

export default function WebdesignPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, serviceLd]) }} />
      <PageHero
        eyebrow="Webdesign aus Worms"
        title="Websites, die"
        highlight="Anfragen bringen"
        intro="Individuell gestaltet, zum fairen Festpreis und persönlich betreut. Für Betriebe, Selbstständige und Vereine in Worms und der Pfalz."
        image={IMG + "webseite-laptop.png"}
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="#beispiele">Beispiele ansehen</Button>
      </PageHero>
      <WebTrust />
      <WebProblem />
      <WebExamples />
      <WebPackages />
      <Process steps={WEB_STEPS} eyebrow="So läuft’s ab" title="In 5 Schritten zur" highlight="Website" />
      <WebCheck />
      <WebFaq />
      <CtaBand
        image={IMG + "webseite-laptop.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
