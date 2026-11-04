import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data";
import { GUIDES, guideHref } from "@/lib/ratgeber";
import { SITE, UPDATED_ISO } from "@/lib/site";

const BUILD = new Date(UPDATED_ISO);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    ...SERVICES.filter((s) => !s.href).map((s) => ({ path: `/leistungen/${s.id}`, priority: 0.8 })),
    { path: "/webdesign", priority: 0.9 },
    { path: "/partner", priority: 0.6 },
    { path: "/kontakt", priority: 0.7 },
    { path: "/impressum", priority: 0.2 },
    { path: "/datenschutz", priority: 0.2 },
    { path: "/ratgeber", priority: 0.4 },
    { path: "/inhalte-melden", priority: 0.1 },
    ...GUIDES.map((g) => ({ path: guideHref(g.slug), priority: 0.4 })),
  ];
  return pages.map(({ path, priority }) => ({ url: SITE + path, lastModified: BUILD, changeFrequency: "monthly", priority }));
}
