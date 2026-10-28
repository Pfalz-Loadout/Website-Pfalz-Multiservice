import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // PNG-Originale bleiben im Repo; ausgeliefert werden passende AVIF/WebP-Größen
  images: { formats: ["image/avif", "image/webp"], qualities: [75], minimumCacheTTL: 2678400 },

  // Musterdesigns liegen als statische Seiten unter public/beispiele/<slug>/index.html
  // und sind so unter /beispiele/<slug> erreichbar.
  async rewrites() {
    return [
      { source: "/beispiele/:slug((?!_assets)[a-z0-9-]+)", destination: "/beispiele/:slug/index.html" },
      // Unterseiten klassischer Musterdesigns, z. B. /beispiele/beratungsbuero/leistungen
      { source: "/beispiele/:slug((?!_assets)[a-z0-9-]+)/:page((?!img)[a-z0-9-]+)", destination: "/beispiele/:slug/:page/index.html" },
    ];
  },

  async redirects() {
    return [
      { source: "/beispiele", destination: "/webdesign#beispiele", permanent: true },
      { source: "/leistungen/web", destination: "/webdesign", permanent: true },
      // Alle Nebenadressen dauerhaft auf die Hauptadresse www.pfalz-multiservice.de
      ...["pfalz-multiservice.de", "pfalz-loadout.de", "www.pfalz-loadout.de"].map((value) => ({
        source: "/:path*", has: [{ type: "host" as const, value }], destination: "https://www.pfalz-multiservice.de/:path*", permanent: true,
      })),
    ];
  },

  // Fiktive Betriebe sollen nicht als echte Firmen bei Google landen
  async headers() {
    return [{ source: "/beispiele/:path+", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] }];
  },
};

export default nextConfig;
