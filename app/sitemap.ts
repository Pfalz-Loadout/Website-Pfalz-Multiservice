import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pfalz-multiservice.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "", "/kontakt", "/impressum", "/datenschutz",
    ...SERVICES.map((s) => `/leistungen/${s.id}`),
  ].map((p) => ({ url: SITE + p, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
