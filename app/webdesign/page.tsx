import { social } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { IMG, WEB_FAQ, WEB_STEPS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { breadcrumb, faqPage } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Process } from "@/components/home/Process";
import { CtaBand } from "@/components/home/HomeSections";
import { WebBriefingTeaser, WebExamples, WebFaqCheck, WebPackages, WebProblem, WebTrust } from "@/components/web/WebSections";

const description =
  "Website erstellen lassen in Worms und der Pfalz: individuelles Webdesign zum Festpreis ab 99 €, ohne Abo. Beispiele ansehen, kostenloser Website-Check.";

export const metadata: Metadata = {
  title: "Webdesign Worms: Website ab 99 €",
  description,
  alternates: { canonical: "/webdesign" },
  ...social({ path: "/webdesign", title: "Webdesign Worms: Website ab 99 € · Pfalz Multiservice", description, image: "/og/webdesign.jpg", alt: "Webdesign von Pfalz Multiservice" }),
};

const faqLd = faqPage(WEB_FAQ);
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webdesign & Website-Erstellung",
  serviceType: "Webdesign",
  provider: { "@id": `${SITE}/#business` },
  areaServed: ["Worms", "Pfalz"],
  offers: [
    { "@type": "Offer", name: "Start: OnePager, bis 5 Abschnitte", price: "99", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    { "@type": "Offer", name: "Business: OnePager oder mehrseitige Website, bis 8 Seiten", price: "149", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    ...[["Wartung", "19", "Bis 1 Std. Änderungen pro Monat"], ["Wartung Pro", "29", "Bis 2 Std. Änderungen pro Monat"], ["Wartung Premium", "69", "Bis 6 Std. Änderungen pro Monat"]].map(([name, price, description]) => ({
      "@type": "Offer", name, priceCurrency: "EUR", description: `${description}, monatlich kündbar`,
      priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "EUR", unitText: "Monat" },
    })),
  ],
};

export default function WebdesignPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, serviceLd, breadcrumb([{ name: "Webdesign", path: "/webdesign" }])]) }} />
      <PageHero
        eyebrow="Webdesign aus Worms"
        title="Websites, die"
        highlight="Anfragen bringen"
        intro={"Individuell gestaltet, zum fairen Festpreis und persönlich betreut.\nFür Betriebe, Selbstständige und Vereine in Worms und der Pfalz."}
        image={IMG + "webseite-laptop.png"}
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="#beispiele">Beispiele ansehen</Button>
        <Link href="/briefing" className="hero-brief" data-cursor>
          <Icon name="clipboard-list" size={18} />
          <span>Schon entschieden? <b>Direkt zum Website-Briefing</b></span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </PageHero>
      <WebTrust />
      <WebProblem />
      <WebExamples />
      <WebPackages />
      <WebBriefingTeaser />
      <Process steps={WEB_STEPS} eyebrow="So läuft’s ab" title="In 5 Schritten zur" highlight="Website" />
      <WebFaqCheck />
      <CtaBand
        image={IMG + "webseite-laptop.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
