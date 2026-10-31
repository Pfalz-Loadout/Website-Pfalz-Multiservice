import type { MetadataRoute } from "next";
import { SITE_NAME, DESC } from "@/lib/site";

/** Web-App-Manifest: Name und Icons für Startbildschirm, Browser-Oberfläche und Suchmaschinen */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DESC,
    lang: "de-DE",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48 96x96 144x144", type: "image/x-icon" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
