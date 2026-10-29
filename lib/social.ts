import { OG_IMAGE, SITE_NAME } from "./site";

/**
 * Link-Vorschau für WhatsApp, Facebook, LinkedIn, X & Co.: Titel, Text und Bild (1200×630, unter 300 KB).
 * Jede Seite setzt alles vollständig, damit nichts von der Startseite „durchrutscht“.
 */
export function social({ path, title, description, image = OG_IMAGE.url, alt = SITE_NAME }: {
  path: string; title: string; description: string; image?: string; alt?: string;
}) {
  const images = [{ url: image, width: 1200, height: 630, alt, type: "image/jpeg" }];
  return {
    openGraph: { type: "website" as const, locale: "de_DE", siteName: SITE_NAME, url: path, title, description, images },
    twitter: { card: "summary_large_image" as const, title, description, images: [image] },
  };
}
