import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { About, CtaBand, Region, Services, TrustStrip } from "@/components/home/HomeSections";
import { HOME_FAQ, IMG } from "@/lib/data";
import { Faq } from "@/components/Faq";
import { JsonLd, faqPage } from "@/lib/schema";
import { WebTeaser } from "@/components/web/WebSections";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPage(HOME_FAQ)} />
      <Hero />
      <TrustStrip />
      <Services />
      <About />
      <Process />
      <WebTeaser alt />
      <Region />
      <Faq items={HOME_FAQ} alt />
      <CtaBand
        image={IMG + "lagerraum-hoch.png"}
        intro={<>Schildern Sie uns kurz Ihr Anliegen.<br />Wir melden uns zeitnah mit einem passenden Lösungsvorschlag.</>}
      />
    </>
  );
}
