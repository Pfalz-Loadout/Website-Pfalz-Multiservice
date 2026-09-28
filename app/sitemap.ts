import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data";
import { SITE } from "@/lib/site";

const BUILD = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    ...SERVICES.map((s) => ({ path: `/leistungen/${s.id}`, priority: 0.8 })),
    { path: "/kontakt", priority: 0.7 },
    { path: "/impressum", priority: 0.2 },
    { path: "/datenschutz", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({ url: SITE + path, lastModified: BUILD, changeFrequency: "monthly", priority }));
}
