import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { About, CtaBand, Region, Services, TrustStrip } from "@/components/home/HomeSections";
import { IMG } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <About />
      <Process />
      <Region />
      <CtaBand image={IMG + "lagerraum-hoch.webp"} />
    </>
  );
}
