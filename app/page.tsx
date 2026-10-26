import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { About, CtaBand, Region, Services, TrustStrip } from "@/components/home/HomeSections";
import { IMG } from "@/lib/data";
import { WebTeaser } from "@/components/web/WebSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <About />
      <Process />
      <WebTeaser alt />
      <Region />
      <CtaBand
        image={IMG + "lagerraum-hoch.png"}
        intro={<>Schildern Sie uns kurz Ihr Anliegen.<br />Wir melden uns zeitnah mit einem passenden Lösungsvorschlag.</>}
      />
    </>
  );
}
