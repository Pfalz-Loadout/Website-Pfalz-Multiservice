import { SITE } from "./site";

/** Brotkrumen-Pfad für Google (Startseite wird automatisch vorangestellt) */
export function breadcrumb(items: { name: string; path: string }[]) {
  const all = [{ name: "Startseite", path: "" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE}${it.path}` })),
  };
}

/** FAQPage-Markup zu sichtbaren Fragen */
export function faqPage(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
