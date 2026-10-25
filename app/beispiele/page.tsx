import type { Metadata } from "next";
import { IMG } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { Examples } from "@/components/home/HomeSections";

const description =
  "Webdesign-Beispiele von Pfalz Multiservice: individuelle One-Page-Websites mit Animationen und 3D-Elementen für Weingut, Autovermietung, Restaurant und Elektrobetrieb. Live ansehen.";

export const metadata: Metadata = {
  title: "Webdesign-Beispiele",
  description,
  alternates: { canonical: "/beispiele" },
  openGraph: { type: "website", url: "/beispiele", title: "Webdesign-Beispiele · Pfalz Multiservice", description,
    images: [{ url: "/images/beispiele/weingut-mobile.png", alt: "Webdesign-Beispiel Weingut Hollerbach" }] },
};

export default function BeispielePage() {
  return (
    <>
      <PageHero
        eyebrow="Webdesign · Musterdesigns"
        title="Unsere"
        highlight="Beispiele"
        intro="Individuell gestaltete Websites für Betriebe aus Worms und der Pfalz. Hier sehen Sie vier Musterdesigns für fiktive Betriebe, live und zum Ausprobieren."
        image={IMG + "webseite-laptop.png"}
        crumbs={[{ label: "Beispiele" }]}
      />
      <Examples heading={false} />
    </>
  );
}
