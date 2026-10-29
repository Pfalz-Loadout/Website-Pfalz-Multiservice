import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // CSS direkt im HTML ausliefern: spart die blockierende Stylesheet-Anfrage (PageSpeed „Rendering blockiert“)
  experimental: { inlineCss: true },

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
      ...["pfalz-multiservice.de", "pfalz-loadout.de", "www.pfalz-loadout.de", "garage-pfalz.de", "www.garage-pfalz.de"].map((value) => ({
        source: "/:path*", has: [{ type: "host" as const, value }], destination: "https://www.pfalz-multiservice.de/:path*", permanent: true,
      })),
    ];
  },

  // Fiktive Betriebe sollen nicht als echte Firmen bei Google landen
  async headers() {
    const security = [
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
    ];
    return [
      { source: "/:path*", headers: security },
      { source: "/beispiele/:path+", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
    ];
  },
};

export default nextConfig;
