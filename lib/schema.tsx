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

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
