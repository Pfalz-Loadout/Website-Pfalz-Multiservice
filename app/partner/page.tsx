import { social } from "@/lib/social";
import type { Metadata } from "next";
import { PARTNERS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { CtaBand } from "@/components/home/HomeSections";
import { PartnerSection } from "@/components/partner/Partners";

const description = "Partner von Pfalz Multiservice: Betriebe aus Worms, mit denen wir zusammenarbeiten.";

export const metadata: Metadata = {
  title: "Partner aus der Region",
  description,
  alternates: { canonical: "/partner" },
  ...social({ path: "/partner", title: "Partner aus der Region · Pfalz Multiservice", description, image: "/og/webdesign.jpg", alt: "Partner von Pfalz Multiservice" }),
};

export default function PartnerPage() {
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PARTNERS.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "LocalBusiness", name: p.name, url: `https://${p.host}`, image: `${SITE}${p.photo}` } })),
  };

  return (
    <>
      <JsonLd data={[list, breadcrumb([{ name: "Partner", path: "/partner" }])]} />
      {/* Kein Seitenkopf: jeder Partner bringt sein eigenes Kopfbild mit */}
      <h1 className="sr-only">Unsere Partner: Betriebe aus Worms, mit denen wir zusammenarbeiten</h1>
      {PARTNERS.map((p, i) => <PartnerSection key={p.slug} p={p} index={i} />)}
      <CtaBand />
    </>
  );
}
