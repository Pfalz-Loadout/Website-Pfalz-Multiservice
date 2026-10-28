import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, USPS, serviceHref } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckList } from "@/components/CheckList";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/home/HomeSections";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.filter((s) => !s.href).map((s) => ({ id: s.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = SERVICES.find((x) => x.id === id);
  if (!s) return {};
  const description = s.seo ?? s.short;
  const url = `/leistungen/${s.id}`;
  return {
    title: s.title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: `${s.title} · Pfalz Multiservice`, description, images: [{ url: s.image, alt: s.title }] },
    twitter: { card: "summary_large_image", title: `${s.title} · Pfalz Multiservice`, description, images: [s.image] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = SERVICES.find((x) => x.id === id);
  if (!s) notFound();
  const words = s.title.split(" ");
  const others = SERVICES.filter((x) => x.id !== s.id);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.seo ?? s.short,
    serviceType: s.title,
    url: `${SITE}/leistungen/${s.id}`,
    provider: { "@id": `${SITE}/#business` },
    areaServed: ["Worms", "Pfalz"],
  };

  return (
    <>
      <JsonLd data={[serviceLd, breadcrumb([{ name: s.title, path: `/leistungen/${s.id}` }])]} />
      <PageHero
        eyebrow="Unsere Leistungen"
        title={words.length > 1 ? words.slice(0, -1).join(" ") : ""}
        highlight={words.slice(-1)[0]}
        intro={s.short}
        image={s.image}
        crumbs={[{ label: "Leistungen", href: "/#leistungen" }, { label: s.title }]}
      />
      <section className="section">
        <div className="container split split--detail" style={{ gridTemplateColumns: "1.3fr 1fr", alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <SectionHeading eyebrow={s.short} title={s.title} />
            <p className="pm-reveal" data-reveal="up" style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>{s.text}</p>
            <div className="pm-reveal" data-reveal="checks"><CheckList items={USPS} /></div>
            <div className="pm-reveal" data-reveal="up">
              <Button href={`/kontakt?leistung=${s.id}`} icon="arrow-right">Anfrage zu {s.title}</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="Kombinierbar" title="Weitere" highlight="Leistungen" style={{ marginBottom: 48 }} />
          <div className="grid-3 pm-reveal" data-reveal="cards" style={{ gap: 20 }}>
            {others.map((o) => (
              <ServiceCard key={o.id} variant="overlay" href={serviceHref(o)} image={o.image} title={o.title} text={o.short} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
