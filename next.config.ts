import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

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
    return [{ source: "/beispiele", destination: "/webdesign#beispiele", permanent: true }];
  },

  // Fiktive Betriebe sollen nicht als echte Firmen bei Google landen
  async headers() {
    return [{ source: "/beispiele/:path+", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] }];
  },
};

export default nextConfig;
